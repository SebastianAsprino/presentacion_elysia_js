/**
 * Runner: generador de carga colocado junto a los servicios (emula a `oha`).
 * Mide por red interna de Docker con C conexiones concurrentes y transmite
 * cada latencia a la slide por Server-Sent Events.
 *
 *   GET /run?fw=express|nest|elysia&n=1000&c=50   → SSE: batch{dts[]} … done{avg,rps,errors}
 */

const TARGETS: Record<string, string> = {
  express: process.env.TARGET_EXPRESS ?? 'http://express:3000/express',
  nest: process.env.TARGET_NEST ?? 'http://nest:3000/nest',
  elysia: process.env.TARGET_ELYSIA ?? 'http://elysia:3000/elysia',
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store',
}

Bun.serve({
  port: 3000,
  idleTimeout: 120,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname !== '/run')
      return new Response('runner ok — usa /run?fw=express|nest|elysia&n=1000&c=50', { headers: CORS })

    const fw = url.searchParams.get('fw') ?? ''
    const target = TARGETS[fw]
    if (!target)
      return new Response('fw desconocido', { status: 400, headers: CORS })

    const n = Math.min(20000, Math.max(1, Number(url.searchParams.get('n') ?? 1000)))
    const c = Math.min(200, Math.max(1, Number(url.searchParams.get('c') ?? 50)))

    const stream = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder()
        const send = (event: string, data: unknown) => {
          try {
            controller.enqueue(enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
          }
          catch {} // cliente desconectado
        }

        // warm-up (no cuenta): conexiones + JIT del servidor medido
        await Promise.all(Array.from({ length: 30 }, () =>
          fetch(target).then(r => r.text()).catch(() => {})))

        let next = 0
        let count = 0
        let errors = 0
        let sum = 0
        let batch: number[] = []

        const t0 = performance.now()
        await Promise.all(Array.from({ length: c }, async () => {
          while (true) {
            const i = next++
            if (i >= n)
              break
            const s = performance.now()
            try {
              const res = await fetch(target, { signal: AbortSignal.timeout(5000) })
              await res.text()
              if (!res.ok)
                throw new Error(`HTTP ${res.status}`)
              const dt = performance.now() - s
              sum += dt
              count++
              batch.push(Math.round(dt * 1000) / 1000)
              if (batch.length >= 20) {
                send('batch', { dts: batch })
                batch = []
              }
            }
            catch {
              errors++
            }
          }
        }))

        if (batch.length)
          send('batch', { dts: batch })

        const wall = (performance.now() - t0) / 1000
        send('done', {
          count,
          errors,
          avg: count ? sum / count : null,
          rps: wall > 0 ? Math.round(count / wall) : null,
        })
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        ...CORS,
        'Content-Type': 'text/event-stream',
        'X-Accel-Buffering': 'no', // nginx: no bufferizar el SSE
      },
    })
  },
})

console.log('runner listening on :3000')
