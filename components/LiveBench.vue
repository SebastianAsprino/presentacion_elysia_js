<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ defaultBase?: string, defaultTotal?: number }>()

const FWS = [
  { key: 'express', label: 'Express', color: '#a1a1aa' },
  { key: 'fastify', label: 'Fastify', color: '#fbbf24' },
  { key: 'nest', label: 'NestJS', color: '#f43f5e' },
  { key: 'django', label: 'Django', color: '#4ade80' },
  { key: 'springboot', label: 'Spring Boot', color: '#2dd4bf' },
  { key: 'elysia', label: 'Elysia', color: '#60a5fa' },
  { key: 'quarkus', label: 'Quarkus', color: '#f97316' },
  { key: 'go', label: 'Gin', color: '#06b6d4' },
  { key: 'rocket', label: 'Rocket', color: '#a855f7' },
] as const

const STORAGE_KEY = 'elysia-bench-base'
const CONCURRENCY = 50

// localStorage puede lanzar (modo privado, almacenamiento bloqueado): recordar
// la URL es solo una comodidad, así que un fallo se ignora.
function readSavedBase(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  }
  catch {
    return null
  }
}

function saveBase(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  }
  catch {
    // Sin almacenamiento disponible: la URL simplemente no se recuerda.
  }
}

const base = ref(props.defaultBase ?? 'http://localhost:8080')
const total = ref(props.defaultTotal ?? 1000)
const running = ref(false)
const errorMsg = ref('')

interface FwState {
  count: number
  sum: number
  errors: number
  avg: number | null
  rps: number | null
  running: boolean
  done: boolean
  failed: boolean
}

function emptyState(): FwState {
  return { count: 0, sum: 0, errors: 0, avg: null, rps: null, running: false, done: false, failed: false }
}

const states = ref<FwState[]>(FWS.map(emptyState))
const winner = ref<number | null>(null)

const canvasEl = ref<HTMLCanvasElement>()
let samples: number[][] = FWS.map(() => [])

onMounted(() => {
  const saved = readSavedBase()
  if (saved && !props.defaultBase)
    base.value = saved
  redraw()
})

function percentile(sorted: number[], p: number) {
  if (!sorted.length)
    return 0
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))]
}

let rafPending = false
function scheduleRedraw() {
  if (rafPending)
    return
  rafPending = true
  requestAnimationFrame(() => {
    rafPending = false
    redraw()
  })
}

function redraw() {
  const canvas = canvasEl.value
  if (!canvas)
    return
  const dpr = window.devicePixelRatio || 1
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, w, h)

  const padL = 44
  const padB = 18
  const padT = 8
  const plotW = w - padL - 8
  const plotH = h - padT - padB

  const all = samples.flat().slice().sort((a, b) => a - b)
  const yMax = Math.max(5, percentile(all, 0.95) * 1.3)

  // ejes / grid
  ctx.strokeStyle = '#27272a'
  ctx.lineWidth = 1
  ctx.fillStyle = '#71717a'
  ctx.font = '10px ui-monospace, monospace'
  ctx.textAlign = 'right'
  for (const frac of [0, 0.5, 1]) {
    const y = padT + plotH - frac * plotH
    ctx.beginPath()
    ctx.moveTo(padL, y)
    ctx.lineTo(w - 8, y)
    ctx.stroke()
    ctx.fillText(`${(yMax * frac).toFixed(0)} ms`, padL - 6, y + 3)
  }

  const segW = plotW / FWS.length
  ctx.textAlign = 'center'
  for (let f = 0; f < FWS.length; f++) {
    const x0 = padL + f * segW
    // separador de segmento
    if (f > 0) {
      ctx.strokeStyle = '#3f3f46'
      ctx.beginPath()
      ctx.moveTo(x0, padT)
      ctx.lineTo(x0, padT + plotH)
      ctx.stroke()
    }
    ctx.fillStyle = '#71717a'
    ctx.fillText(FWS[f].label, x0 + segW / 2, h - 5)

    // muestras: una línea vertical por respuesta
    const arr = samples[f]
    const n = Math.max(arr.length, total.value)
    ctx.strokeStyle = FWS[f].color
    ctx.globalAlpha = 0.75
    ctx.lineWidth = Math.max(0.5, segW / n / 1.5)
    for (let i = 0; i < arr.length; i++) {
      const x = x0 + (i / n) * segW
      const bh = Math.min(1, arr[i] / yMax) * plotH
      ctx.beginPath()
      ctx.moveTo(x, padT + plotH)
      ctx.lineTo(x, padT + plotH - bh)
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // línea de promedio
    const st = states.value[f]
    if (st.avg != null && arr.length) {
      const y = padT + plotH - Math.min(1, st.avg / yMax) * plotH
      ctx.strokeStyle = FWS[f].color
      ctx.setLineDash([5, 4])
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x0 + 2, y)
      ctx.lineTo(x0 + segW - 2, y)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }
}

let aborter: AbortController | null = null

class CancelledError extends Error {}

let currentEs: EventSource | null = null

function parseEvent<T>(e: Event): T | null {
  try {
    return JSON.parse((e as MessageEvent).data) as T
  }
  catch {
    return null
  }
}

function cancel() {
  aborter?.abort()
  currentEs?.close()
  currentEs = null
}

/** El runner (colocado junto a los servicios) genera la carga estilo `oha`
 *  y nos transmite cada latencia por SSE — es un benchmark sintético
 *  servidor-a-servidor, sin la varianza de la red del navegador de quien
 *  esté viendo la presentación. */
function runFw(f: number): Promise<void> {
  const st = states.value[f]
  return new Promise<void>((resolve, reject) => {
    const url = `${base.value.replace(/\/$/, '')}/runner/run?fw=${FWS[f].key}&n=${total.value}&c=${CONCURRENCY}`
    const es = new EventSource(url)
    currentEs = es

    // Un payload malformado no debe dejar la promesa colgada para siempre.
    const fail = (error: Error) => {
      es.close()
      currentEs = null
      reject(error)
    }

    aborter?.signal.addEventListener('abort', () => fail(new CancelledError()), { once: true })

    es.addEventListener('batch', (e) => {
      const payload = parseEvent<{ dts: number[] }>(e)
      if (!payload)
        return fail(new Error('respuesta inválida del runner'))
      for (const dt of payload.dts) {
        samples[f].push(dt)
        st.count++
        st.sum += dt
      }
      scheduleRedraw()
    })

    es.addEventListener('done', (e) => {
      const d = parseEvent<{ errors: number, avg: number | null, rps: number | null }>(e)
      if (!d)
        return fail(new Error('respuesta inválida del runner'))
      st.errors = d.errors
      st.avg = d.avg
      st.rps = d.rps
      es.close()
      currentEs = null
      resolve()
    })

    es.onerror = () => {
      fail(aborter?.signal.aborted
        ? new CancelledError()
        : new Error('runner no disponible — ¿desplegaste la versión con el servicio runner?'))
    }
  })
}

async function run() {
  if (running.value)
    return
  running.value = true
  errorMsg.value = ''
  winner.value = null
  states.value = FWS.map(emptyState)
  samples = FWS.map(() => [])
  aborter = new AbortController()
  saveBase(base.value)
  redraw()

  try {
    for (let f = 0; f < FWS.length; f++) {
      const st = states.value[f]
      st.running = true
      try {
        await runFw(f)
      }
      catch (e: unknown) {
        // Un framework caído/lento no debe tumbar la demo entera: se marca
        // como no disponible y se sigue con el resto. Cancelar sí para todo.
        if (e instanceof CancelledError)
          throw e
        st.failed = true
      }
      st.running = false
      st.done = true
      scheduleRedraw()
    }

    const avgs = states.value.map(s => s.failed ? Number.POSITIVE_INFINITY : s.avg ?? Number.POSITIVE_INFINITY)
    if (Math.min(...avgs) < Number.POSITIVE_INFINITY)
      winner.value = avgs.indexOf(Math.min(...avgs))
  }
  catch (e: unknown) {
    if (e instanceof CancelledError)
      errorMsg.value = 'Cancelado.'
    else
      errorMsg.value = `No se pudo conectar con ${base.value} — ${e instanceof Error ? e.message : String(e)}`
  }
  finally {
    running.value = false
    aborter = null
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <!-- los frameworks -->
    <div class="grid grid-cols-3 gap-1.5">
      <div
        v-for="(fw, f) in FWS"
        :key="fw.key"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-500"
        :class="winner === f ? 'border-transparent bg-gradient-to-r from-[#60a5fa1a] to-[#e879f91a] ring-1 ring-[#60a5fa]' : 'border-zinc-800 bg-zinc-900/50'"
        :style="states[f].running ? { borderColor: fw.color } : {}"
      >
        <div v-if="fw.key === 'express'" class="i-simple-icons:express text-xl text-white shrink-0" />
        <div v-else-if="fw.key === 'fastify'" class="i-simple-icons:fastify text-xl text-white shrink-0" />
        <div v-else-if="fw.key === 'nest'" class="i-logos:nestjs text-xl shrink-0" />
        <div v-else-if="fw.key === 'django'" class="i-logos:django-icon text-xl shrink-0" />
        <div v-else-if="fw.key === 'springboot'" class="i-logos:spring-icon text-xl shrink-0" />
        <div v-else-if="fw.key === 'quarkus'" class="i-logos:quarkus text-xl shrink-0" />
        <div v-else-if="fw.key === 'go'" class="i-logos:gin text-xl shrink-0" />
        <div v-else-if="fw.key === 'rocket'" class="i-logos:rust text-xl shrink-0" />
        <img v-else src="/elysia.svg" class="h-5 shrink-0">
        <div class="flex flex-col leading-tight min-w-0 flex-1 justify-center min-h-[1.75rem]">
          <span class="font-semibold text-sm truncate" :style="{ color: fw.color }">{{ fw.label }}</span>
          <span v-if="states[f].running" class="text-[10px] font-mono opacity-70 animate-pulse truncate">
            {{ states[f].count + states[f].errors }} / {{ total }}…
            <span v-if="states[f].errors" class="text-red-400">({{ states[f].errors }} err)</span>
          </span>
          <span v-else-if="states[f].failed" class="text-xs font-mono text-red-400 truncate">
            no disponible
          </span>
          <span v-else-if="states[f].done" class="text-xs font-mono truncate block">
            <b>{{ states[f].avg?.toFixed(1) }} ms</b>
            <span class="opacity-60 text-[10px]"> prom · {{ states[f].rps }} req/s</span>
            <span v-if="states[f].errors" class="text-red-400 text-[10px]"> · {{ states[f].errors }} err</span>
          </span>
          <span v-else class="text-[10px] opacity-40 font-mono truncate">esperando…</span>
        </div>
        <div v-if="winner === f" class="i-carbon:trophy-filled ml-auto text-base text-yellow-300 shrink-0" />
      </div>
    </div>

    <!-- controles -->
    <div class="flex items-center gap-2">
      <input
        v-model="base"
        :disabled="running"
        class="flex-1 bg-zinc-900/80 border border-zinc-700 rounded-lg px-2.5 py-1 font-mono text-xs outline-none focus:border-sky-500"
        placeholder="https://bench.tudominio.com"
      >
      <input
        v-model.number="total"
        :disabled="running"
        type="number" min="10" step="10"
        class="w-20 bg-zinc-900/80 border border-zinc-700 rounded-lg px-2.5 py-1 font-mono text-xs outline-none focus:border-sky-500"
      >
      <button
        v-if="!running"
        class="px-3 py-1 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#60a5fa] to-[#e879f9] hover:brightness-110 transition"
        @click="run"
      >
        Ejecutar {{ FWS.length }} × {{ total }}
      </button>
      <button
        v-else
        class="px-3 py-1 rounded-lg font-semibold text-sm border border-red-400/60 text-red-300 hover:bg-red-500/10 transition"
        @click="cancel"
      >
        Cancelar
      </button>
    </div>

    <!-- línea de tiempo -->
    <canvas ref="canvasEl" class="w-full h-28 rounded-lg border border-zinc-800/80 bg-black/40" />

    <div v-if="errorMsg" class="text-xs text-red-400 font-mono">
      {{ errorMsg }}
    </div>
  </div>
</template>
