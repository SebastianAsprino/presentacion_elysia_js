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
] as const

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
}

function emptyState(): FwState {
  return { count: 0, sum: 0, errors: 0, avg: null, rps: null, running: false, done: false }
}

const states = ref<FwState[]>(FWS.map(emptyState))
const winner = ref<number | null>(null)

const canvasEl = ref<HTMLCanvasElement>()
let samples: number[][] = FWS.map(() => [])

onMounted(() => {
  const saved = localStorage.getItem('elysia-bench-base')
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
    const url = `${base.value.replace(/\/$/, '')}/runner/run?fw=${FWS[f].key}&n=${total.value}&c=50`
    const es = new EventSource(url)
    currentEs = es

    aborter!.signal.addEventListener('abort', () => {
      es.close()
      currentEs = null
      reject(new CancelledError())
    }, { once: true })

    es.addEventListener('batch', (e) => {
      const { dts } = JSON.parse((e as MessageEvent).data)
      for (const dt of dts) {
        samples[f].push(dt)
        st.count++
        st.sum += dt
      }
      scheduleRedraw()
    })

    es.addEventListener('done', (e) => {
      const d = JSON.parse((e as MessageEvent).data)
      st.errors = d.errors
      st.avg = d.avg
      st.rps = d.rps
      es.close()
      currentEs = null
      resolve()
    })

    es.onerror = () => {
      const cancelled = aborter?.signal.aborted
      es.close()
      currentEs = null
      reject(cancelled
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
  localStorage.setItem('elysia-bench-base', base.value)
  redraw()

  try {
    for (let f = 0; f < FWS.length; f++) {
      const st = states.value[f]
      st.running = true
      await runFw(f)
      st.running = false
      st.done = true
      scheduleRedraw()
    }

    const avgs = states.value.map(s => s.avg ?? Number.POSITIVE_INFINITY)
    if (Math.min(...avgs) < Number.POSITIVE_INFINITY)
      winner.value = avgs.indexOf(Math.min(...avgs))
  }
  catch (e: any) {
    if (e instanceof CancelledError)
      errorMsg.value = 'Cancelado.'
    else
      errorMsg.value = `No se pudo conectar con ${base.value} — ${e?.message ?? e}`
  }
  finally {
    running.value = false
    aborter = null
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- los frameworks -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(fw, f) in FWS"
        :key="fw.key"
        class="flex items-center gap-3 p-4 rounded-xl border transition-all duration-500"
        :class="winner === f ? 'border-transparent bg-gradient-to-r from-[#60a5fa1a] to-[#e879f91a] ring-1 ring-[#60a5fa]' : 'border-zinc-800 bg-zinc-900/50'"
        :style="states[f].running ? { borderColor: fw.color } : {}"
      >
        <div v-if="fw.key === 'express'" class="i-simple-icons:express text-3xl text-white" />
        <div v-else-if="fw.key === 'fastify'" class="i-simple-icons:fastify text-3xl text-white" />
        <div v-else-if="fw.key === 'nest'" class="i-logos:nestjs text-3xl" />
        <div v-else-if="fw.key === 'django'" class="i-logos:django-icon text-3xl" />
        <div v-else-if="fw.key === 'springboot'" class="i-logos:spring-icon text-3xl" />
        <img v-else src="/elysia.svg" class="h-8">
        <div class="flex flex-col leading-tight">
          <span class="font-semibold" :style="{ color: fw.color }">{{ fw.label }}</span>
          <span v-if="states[f].running" class="text-xs font-mono opacity-70 animate-pulse">
            {{ states[f].count + states[f].errors }} / {{ total }}…
            <span v-if="states[f].errors" class="text-red-400">({{ states[f].errors }} err)</span>
          </span>
          <span v-else-if="states[f].done" class="text-sm font-mono">
            <b>{{ states[f].avg?.toFixed(1) }} ms</b>
            <span class="opacity-60 text-xs"> prom · {{ states[f].rps }} req/s</span>
            <span v-if="states[f].errors" class="text-red-400 text-xs"> · {{ states[f].errors }} err</span>
          </span>
          <span v-else class="text-xs opacity-40 font-mono">esperando…</span>
        </div>
        <div v-if="winner === f" class="i-carbon:trophy-filled ml-auto text-xl text-yellow-300" />
      </div>
    </div>

    <!-- controles -->
    <div class="flex items-center gap-3">
      <input
        v-model="base"
        :disabled="running"
        class="flex-1 bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-1.5 font-mono text-xs outline-none focus:border-sky-500"
        placeholder="https://bench.tudominio.com"
      >
      <input
        v-model.number="total"
        :disabled="running"
        type="number" min="10" step="10"
        class="w-24 bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-1.5 font-mono text-xs outline-none focus:border-sky-500"
      >
      <button
        v-if="!running"
        class="px-4 py-1.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#60a5fa] to-[#e879f9] hover:brightness-110 transition"
        @click="run"
      >
        Ejecutar {{ FWS.length }} × {{ total }}
      </button>
      <button
        v-else
        class="px-4 py-1.5 rounded-lg font-semibold text-sm border border-red-400/60 text-red-300 hover:bg-red-500/10 transition"
        @click="cancel"
      >
        Cancelar
      </button>
    </div>

    <!-- línea de tiempo -->
    <canvas ref="canvasEl" class="w-full h-42 rounded-lg border border-zinc-800/80 bg-black/40" />

    <div v-if="errorMsg" class="text-sm text-red-400 font-mono">
      {{ errorMsg }}
    </div>
  </div>
</template>
