# Presentación · ElysiaJS

Keynote (20–30 min) sobre backend TypeScript con [Elysia.js](https://elysiajs.com), construida con
[Slidev](https://sli.dev), más un **benchmark en vivo** de nueve frameworks backend que se ejecuta
desde la propia slide.

El efecto de fondo (polígonos difuminados animados entre slides) está adaptado de
[nekomeowww/talks](https://github.com/nekomeowww/talks) (charla de AIRI, créditos @pi0 @Atinux),
recoloreado con la paleta de [elysiajs.com](https://elysiajs.com).

## Qué contiene

- **La charla** — contexto de runtimes (Node, Deno, Bun), tres filosofías de backend (Express, NestJS,
  Elysia) con el mismo endpoint escrito en cada uno, el ciclo de vida de un request en Elysia,
  rendimiento (TechEmpower), validación con un único schema, plugins y Eden (tipos compartidos
  cliente/servidor). Las notas del orador van embebidas en cada slide.
- **Benchmark en vivo** — el componente `LiveBench.vue` lanza carga real contra Express, Fastify,
  NestJS, Django, Spring Boot, Elysia, Quarkus, Gin y Rocket desplegados con Docker Compose, y dibuja
  la latencia de cada respuesta en tiempo real (Server-Sent Events).

## Stack

| Parte | Tecnologías |
|---|---|
| Slides | Slidev 52, Vue 3, UnoCSS, Shiki, `seedrandom` (fondo determinista por slide) |
| Benchmark | Bun (runner + Elysia), Node 22 (Express, Fastify, NestJS), Python 3.11 (Django + gunicorn), Java 8/17 (Spring Boot, Quarkus), Go (Gin), Rust (Rocket), nginx (gateway) |
| Infraestructura | Docker Compose, despliegue en Dokploy |

## Estructura

```
slides.md               Diapositivas + notas del orador
global-bottom.vue       Fondo animado (se controla por frontmatter: glow, glowSeed, glowOpacity, glowHue)
components/
  LiveBench.vue         Slide "Benchmark en vivo": consume el runner por SSE y pinta la línea de tiempo
setup/shiki.ts          Temas de resaltado de código
uno.config.ts           Fuentes y safelist de UnoCSS
style.css               Estilos globales (gradientes de marca)
public/                 Imágenes, logos y QRs usados en las slides
bench/                  Microservicios del benchmark (ver bench/README.md)
  docker-compose.yml    9 frameworks + runner + gateway, con el mismo límite de CPU/RAM para todos
  runner/               Generador de carga (Bun) que transmite latencias por SSE
  gateway/              nginx: expone todo bajo una sola URL
  <framework>/          Un "hello world" idéntico por framework, cada uno con su Dockerfile
```

### Cómo se conecta el benchmark

```
navegador (LiveBench.vue) ──EventSource──▶ gateway (nginx) ──▶ runner (Bun)
                                                                  │  carga por red interna de Docker
                                                                  ▼
                               express · fastify · nest · django · spring-boot · elysia · quarkus · go · rocket
```

La carga la genera el `runner` junto a los servicios, así que el resultado no depende del wifi de la
sala; el navegador solo recibe las latencias.

## Uso

Requisitos: [Bun](https://bun.sh) 1.x.

```bash
bun install
bun run dev      # http://localhost:3030 — tecla `p` para vista presenter
bun run build    # sitio estático en dist/
bun run export   # PDF de respaldo (con clicks)
```

> Nota: los scripts usan `env -u VSCODE_CWD` porque UnoCSS desactiva el loader de
> iconos del filesystem cuando detecta esa variable (terminal integrada de VSCode).

### Benchmark local

Requisitos: Docker con Compose v2.

```bash
cd bench
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

El gateway queda en `http://localhost:8080`, que es la URL por defecto de la slide "Benchmark en
vivo". Despliegue en un servidor (Dokploy) y detalles de la metodología en
[bench/README.md](bench/README.md).

## CI

`.github/workflows/ci.yml` compila las slides (`bun run build`) y hace `go vet` + build del servicio Gin en cada push y pull request.

## Seguridad

- Ningún servicio guarda secretos: la `SECRET_KEY` de Django se lee de `DJANGO_SECRET_KEY` o se
  genera aleatoria al arrancar (el bench no usa sesiones ni firmas).
- Los contenedores de los frameworks y del runner corren con un usuario sin privilegios.
- El runner acota los parámetros de la query (`n` ≤ 20 000, `c` ≤ 200) e ignora valores no numéricos.
