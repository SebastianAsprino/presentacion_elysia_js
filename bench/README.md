# Bench en vivo — Express vs Fastify vs NestJS vs Django vs Spring Boot vs Elysia vs Quarkus vs Gin vs Rocket

Nueve microservicios idénticos (un `GET` que devuelve `hello world` en texto plano)
más un gateway nginx que los expone bajo una sola URL:

| Ruta | Servicio | Stack |
|---|---|---|
| `/express` | express:3000 | Node 22 + Express 4 |
| `/fastify` | fastify:3000 | Node 22 + Fastify 5 |
| `/nest` | nest:3000 | Node 22 + NestJS 11 (adapter Express) |
| `/django` | django:3000 | Python 3.11 + Django 4.2 LTS (versión "empresarial", no la más reciente — gunicorn, 4 workers) |
| `/springboot` | spring-boot:3000 | Java 8 + Spring Boot 2.7 (versión "empresarial": última minor con soporte JDK 8, no la más reciente) |
| `/elysia` | elysia:3000 | Bun 1 + Elysia 1 |
| `/quarkus` | quarkus:3000 | Java 17 + Quarkus 3 (Vert.x/Netty, no bloqueante) — el framework Java rápido/cloud-native, contraste frente al Spring Boot "empresarial" en el mismo lenguaje |
| `/go` | go:3000 | Go 1.23 + Gin 1.12 |
| `/rocket` | rocket:3000 | Rust (stable) + Rocket 0.5 |
| `/runner/run?fw=elysia&n=1000&c=50` | runner:3000 | Generador de carga estilo `oha` (Bun): mide por red interna con `c` conexiones concurrentes y transmite cada latencia por SSE |

La slide solo consume `/runner/run` (vía `EventSource` desde el navegador): la
carga real es servidor-a-servidor por red interna de Docker, no depende del
wifi de la sala donde se presenta. Se quitó a propósito el modo alternativo
que medía fetch directo desde el navegador — el resultado variaba demasiado
según la red del momento y hacía perder el punto de la demo.

Todas las respuestas llevan `Access-Control-Allow-Origin: *` y `Cache-Control:
no-store` (para permitir probarlas sueltas con fetch/curl sin cachear).

## Deploy en Dokploy

1. Crear un servicio de tipo **Docker Compose** apuntando a esta carpeta (`bench/`).
2. Asignar el dominio al servicio **gateway**, puerto **80**.
3. Verificar: `https://tu-dominio/express`, `/fastify`, `/nest`, `/django`,
   `/springboot`, `/elysia`, `/quarkus`, `/go` y `/rocket` deben responder
   `hello world`.

> ⚠️ Usa un dominio **https**: la presentación (si la sirves desde Cloudflare u
> otra web https) no puede hacer fetch a un backend http (mixed content).
> Presentando en local (`bun run dev`) también funciona contra http.

> ⚠️ El build de `spring-boot` y `quarkus` compila con Maven dentro de Docker
> (imágenes `maven:3.9-eclipse-temurin-8` y `-17`) y tarda más que el resto
> en el primer build. `rocket` compila con `cargo build --release` dentro de
> Docker, así que su primer build también es lento (compila todas las
> dependencias de Rust desde cero).

## Prueba local (opcional)

```bash
docker compose up --build
curl localhost:8080/express localhost:8080/fastify localhost:8080/nest \
     localhost:8080/django localhost:8080/springboot localhost:8080/elysia \
     localhost:8080/quarkus localhost:8080/go localhost:8080/rocket
```

## Por qué el resultado local no es el 6× / 21× de TechEmpower

Los números de la slide anterior (`# Rendimiento`) son de TechEmpower Round 22:
throughput puro, con pipelining agresivo, en hardware dedicado y — lo más
importante — sin red real de por medio. Este bench en vivo mide otra cosa a
propósito (latencia real, servidor-a-servidor, por Docker), así que:

- **La distancia se reduce mucho, y puede no ser la misma clasificación.**
  Con solo 50 conexiones concurrentes y sin pipelining, el cuello de botella
  deja de ser "cuántas requests por segundo parsea el framework" y pasa a ser
  la red interna de Docker y el scheduler del SO — ahí Fastify (Node, muy
  maduro) y Elysia (Bun) quedan mucho más cerca, y en una corrida puntual
  Fastify puede incluso ganar. **Eso no contradice la slide de TechEmpower**:
  son dos experimentos distintos, no el mismo experimento con "el número
  real". Dilo así en la presentación si pasa, en vez de que parezca un error.
- **Contención de CPU entre los 9 servicios.** Django corre 4 workers
  gunicorn, Spring Boot y Quarkus una JVM (GC + JIT en background); todos son
  mucho más pesados en reposo que un solo proceso Bun/Node/Go/Rust. Sin
  límites, pueden robarle CPU del host a Elysia/Fastify justo cuando les toca
  su turno (van después en el orden secuencial). Por eso `docker-compose.yml`
  fija el mismo límite de CPU/memoria (1 core, 512 MB) a los 9 — así el
  resultado depende del framework, no de quién tenía más núcleos libres en
  ese momento.
- **Orden fijo + JIT en frío.** El runner prueba siempre en el mismo orden
  (Express → Fastify → Nest → Django → Spring Boot → Elysia → Quarkus → Gin →
  Rocket); el warm-up antes de cada framework ahora escala con la concurrencia
  (`c*2` requests +
  200 ms de respiro) para no arrancar el cronómetro con menos conexiones
  calientes que en el test anterior.

Si en una corrida en vivo Fastify queda cerca o por delante de Elysia, es
esperable y explicable con lo de arriba — no es necesario (ni honesto)
forzar que Elysia "gane siempre". Mejor preparar la frase de antemano que
prometer un resultado.

## La slide

El componente [`components/LiveBench.vue`](../components/LiveBench.vue) (slide
"Benchmark en vivo") pide la URL base y lanza contra el `runner` 1000
peticiones por framework en orden Express → Fastify → Nest → Django → Spring
Boot → Elysia → Quarkus → Gin → Rocket, dibuja la línea de tiempo con la
latencia de cada respuesta y muestra el promedio por framework al terminar.
