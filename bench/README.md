# Bench en vivo — Express vs NestJS vs Elysia

Tres microservicios idénticos (un `GET` que devuelve `hello world` en texto plano)
más un gateway nginx que los expone bajo una sola URL:

| Ruta | Servicio | Stack |
|---|---|---|
| `/express` | express:3000 | Node 22 + Express 4 |
| `/nest` | nest:3000 | Node 22 + NestJS 11 (adapter Express) |
| `/elysia` | elysia:3000 | Bun 1 + Elysia 1 |
| `/runner/run?fw=elysia&n=1000&c=50` | runner:3000 | Generador de carga estilo `oha` (Bun): mide por red interna con `c` conexiones concurrentes y transmite cada latencia por SSE — es el modo "servidor" de la slide |

Todas las respuestas llevan `Access-Control-Allow-Origin: *` (la slide del
benchmark hace fetch desde el navegador) y `Cache-Control: no-store` (para que
el navegador no cachee y el benchmark sea real).

## Deploy en Dokploy

1. Crear un servicio de tipo **Docker Compose** apuntando a esta carpeta (`bench/`).
2. Asignar el dominio al servicio **gateway**, puerto **80**.
3. Verificar: `https://tu-dominio/express`, `/nest` y `/elysia` deben responder `hello world`.

> ⚠️ Usa un dominio **https**: la presentación (si la sirves desde Cloudflare u
> otra web https) no puede hacer fetch a un backend http (mixed content).
> Presentando en local (`bun run dev`) también funciona contra http.

## Prueba local (opcional)

```bash
docker compose up --build
curl localhost:8080/express localhost:8080/nest localhost:8080/elysia
```

## La slide

El componente [`components/LiveBench.vue`](../components/LiveBench.vue) (slide
"Benchmark en vivo") pide la URL base, hace un warm-up y luego 1000 peticiones
por framework en orden Express → Nest → Elysia, dibuja la línea de tiempo con
la latencia de cada respuesta y muestra el promedio por framework al terminar.
