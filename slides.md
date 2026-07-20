---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 'ElysiaJS: backend TypeScript ergonómico, rápido y tipado de punta a punta'
exportFilename: elysiajs-backend-typescript
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 233
routerMode: hash
---

<div flex flex-col items-center gap-6>
  <img src="/elysia.svg" class="w-36 drop-shadow-[0_0_35px_#e879f955]">
  <h1 class="text-gradient-elysia" text-6xl font-bold tracking-tight>
    ElysiaJS
  </h1>
  <p text-xl opacity-80>
    Backend TypeScript <b>ergonómico</b>, <b>rápido</b> y <b>tipado de punta a punta</b>
  </p>
  <p opacity-50 text-sm>Sebastián Asprino</p>
</div>

<!--
Bienvenida. Presentar el título y la promesa de la charla: por qué Elysia
merece un hueco en tu stack backend de TypeScript.
-->

---
layout: intro
class: px-24
glowSeed: 128
---

<div flex items-center gap-3 h-full>
  <div
    v-click="1"
    :class="$clicks < 1 ? 'translate-x--5 opacity-0' : 'translate-x-0 opacity-100'"
    flex flex-col items-start transition duration-500 ease-in-out min-w-70
  >
    <div w-32 h-32 rounded-full mb-5 flex items-center justify-center text-6xl bg-gradient-to-br from="[#60a5fa30]" to="[#e879f930]">👨‍💻</div>
    <span font-semibold text-3xl>Sebastián Asprino</span>
    <div>
      <div mt-1>
        <span class="opacity-70">Backend / Full-stack TypeScript</span>
      </div>
      <div text-sm flex items-center gap-2 mt-4>
        <div i-carbon:logo-github /><span underline decoration-dashed font-mono decoration-zinc-300>saao</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div flex flex-col gap-8>
    <div v-click="2">
      <div mb-4 text-zinc-400>Trabajo con</div>
      <div
        flex flex-wrap items-start content-start gap-4 max-w-90 transition duration-500 ease-in-out
        :class="$clicks < 2 ? 'translate-y-5' : 'translate-y-0'"
      >
        <div flex items-center gap-2 text-xl><div i-logos:typescript-icon /> TypeScript</div>
        <div flex items-center gap-2 text-xl><div i-logos:bun /> Bun</div>
        <div flex items-center gap-2 text-xl><div i-logos:nodejs-icon /> Node.js</div>
        <div flex items-center gap-2 text-xl><div i-logos:aws text-white /> AWS</div>
        <div flex items-center gap-2 text-xl><div i-logos:svelte-icon /> Svelte</div>
        <div flex items-center gap-2 text-xl><div i-logos:terraform-icon /> Terraform</div>
      </div>
    </div>
  </div>
</div>

<!--
Presentación personal breve: quién soy, a qué me dedico, con qué stack trabajo
a diario. Ajusta la foto, el handle de GitHub y los iconos a tu gusto.
-->

---
layout: center
glow: bottom
glowSeed: 41
---

<div text-center>
  <div text-sm tracking-widest opacity-50 mb-4>PARTE 1</div>
  <h1 text-5xl font-bold>¿Dónde corre nuestro código?</h1>
  <p text-xl opacity-60 mt-4>Entornos de ejecución de JavaScript / TypeScript</p>
</div>

---
glow: top
glowSeed: 77
---

# Tres runtimes, tres épocas

<div grid grid-cols-3 gap-6 mt-12>
  <div v-click="1" flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-logos:nodejs-icon text-6xl />
    <div text-2xl font-semibold>Node.js</div>
    <div text-sm opacity-60 text-center>
      <div font-mono mb-2>2009</div>
      <div>V8 + libuv (C++)</div>
      <div mt-2>El estándar de facto.<br>Ecosistema npm gigante.</div>
    </div>
  </div>
  <div v-click="2" flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-logos:deno text-6xl bg-white rounded-full />
    <div text-2xl font-semibold>Deno</div>
    <div text-sm opacity-60 text-center>
      <div font-mono mb-2>2018</div>
      <div>V8 + Tokio (Rust)</div>
      <div mt-2>Seguridad por defecto.<br>TypeScript nativo.</div>
    </div>
  </div>
  <div v-click="3" flex flex-col items-center gap-4 p-6 rounded-xl border border-fuchsia-900 bg="fuchsia-950/20">
    <div i-logos:bun text-6xl />
    <div text-2xl font-semibold>Bun</div>
    <div text-sm opacity-60 text-center>
      <div font-mono mb-2>2022</div>
      <div>JavaScriptCore (Zig)</div>
      <div mt-2>Velocidad extrema.<br>Todo-en-uno.</div>
    </div>
  </div>
</div>

<!--
Mismo lenguaje, tres motores distintos. Node popularizó JS en el servidor;
Deno repensó la seguridad y el tooling; Bun apostó por rendimiento puro
y por unificar la toolchain.
-->

---
glow: right
glowSeed: 90
---

# Bun no es solo un runtime

<div grid grid-cols-4 gap-4 mt-10>
  <div v-click="1" flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-carbon:play-filled text-4xl text-sky-400 />
    <div font-semibold>Runtime</div>
    <div text-xs opacity-60 text-center>TS y JSX nativos, sin transpilar</div>
  </div>
  <div v-click="2" flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-carbon:package text-4xl text-fuchsia-400 />
    <div font-semibold>Package manager</div>
    <div text-xs opacity-60 text-center><code>bun install</code>, compatible con npm</div>
  </div>
  <div v-click="3" flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-carbon:chemistry text-4xl text-teal-400 />
    <div font-semibold>Test runner</div>
    <div text-xs opacity-60 text-center><code>bun test</code>, API estilo Jest</div>
  </div>
  <div v-click="4" flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-carbon:cube text-4xl text-pink-400 />
    <div font-semibold>Bundler</div>
    <div text-xs opacity-60 text-center><code>bun build</code>, para server y browser</div>
  </div>
</div>

<div v-click="5" mt-10 flex items-center justify-center gap-3 text-lg opacity-80>
  <div i-carbon:flash-filled text-yellow-300 />
  Un solo binario reemplaza a <code>node</code> + <code>npm</code> + <code>jest</code> + <code>webpack</code> + <code>tsc --watch</code>
</div>

<!--
La propuesta de Bun: menos piezas móviles, menos configuración, arranque
y throughput muy superiores gracias a JavaScriptCore y Zig.
Elysia nace aquí: diseñado para exprimir Bun, aunque hoy corre en más runtimes.
-->

---
layout: center
glow: bottom
glowSeed: 55
---

<div text-center>
  <div text-sm tracking-widest opacity-50 mb-4>PARTE 2</div>
  <h1 text-5xl font-bold>¿Qué framework elijo?</h1>
  <div flex items-center justify-center gap-10 mt-10 text-6xl>
    <div v-click="1" i-simple-icons:express text-white />
    <div v-click="2" i-logos:nestjs />
    <div v-click="3"><img src="/elysia.svg" class="h-16"></div>
  </div>
</div>

<!--
No hay framework "mejor": hay contextos. Vamos a comparar los tres con el
mismo endpoint y con números.
-->

---
glow: top
glowSeed: 12
---

# Tres filosofías

<div grid grid-cols-3 gap-6 mt-12>
  <div v-click="1" flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-simple-icons:express text-5xl text-white />
    <div text-2xl font-semibold>Express</div>
    <div font-mono text-xs opacity-50>2010</div>
    <div text-sm opacity-70 text-center>Minimalista.<br>Sin opiniones.<br>Tú decides todo.</div>
  </div>
  <div v-click="2" flex flex-col items-center gap-4 p-6 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div i-logos:nestjs text-5xl />
    <div text-2xl font-semibold>NestJS</div>
    <div font-mono text-xs opacity-50>2017</div>
    <div text-sm opacity-70 text-center>Arquitectura enterprise.<br>DI, decoradores, módulos.<br>Todo tiene su sitio.</div>
  </div>
  <div v-click="3" flex flex-col items-center gap-4 p-6 rounded-xl border border-sky-900 bg="sky-950/20">
    <img src="/elysia.svg" class="h-12">
    <div text-2xl font-semibold>Elysia</div>
    <div font-mono text-xs opacity-50>2022</div>
    <div text-sm opacity-70 text-center>Ergonomía + performance.<br>El tipo <i>es</i> el contrato.<br>"Framework for Humans".</div>
  </div>
</div>

<!--
Express: una caja de herramientas mínima. Nest: un marco arquitectónico
completo inspirado en Angular. Elysia: DX primero, con el sistema de tipos
de TypeScript como columna vertebral.
-->

---
glow: left
glowSeed: 8
---

# El mismo endpoint · Express

```js {all|7|8|9-10|all}
import express from 'express'

const app = express()
app.use(express.json())

app.put('/user/:id', (req, res) => {
  const id = Number(req.params.id)      // params siempre es string
  const name = req.body?.name           // body es `any`
  if (!name || typeof name !== 'string')
    return res.status(400).json({ error: 'name requerido' })

  res.json({ id, name })
})

app.listen(3000)
```

<div mt-6 flex gap-8 text-sm opacity-70>
  <div v-click flex items-center gap-2><div i-carbon:warning-alt text-yellow-400 /> Sin tipos: <code>req.body</code> es <code>any</code></div>
  <div v-click flex items-center gap-2><div i-carbon:warning-alt text-yellow-400 /> Validación manual en cada ruta</div>
  <div v-click flex items-center gap-2><div i-carbon:warning-alt text-yellow-400 /> Documentación aparte (si existe)</div>
</div>

<!--
Express funciona, pero todo lo importante (tipos, validación, docs) queda
a cargo del desarrollador y se repite en cada endpoint.
-->

---
layout: two-cols
glow: right
glowSeed: 19
class: gap-4
---

# El mismo endpoint · NestJS

```ts
// update-user.dto.ts
import { IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  name: string
}
```

```ts
// main.ts
app.useGlobalPipes(new ValidationPipe())
```

::right::

<div mt-13 />

```ts
// user.controller.ts
@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.users.update(id, dto)
  }
}
```

<div mt-4 text-sm opacity-70>
  <div v-click flex items-center gap-2><div i-carbon:checkmark text-green-400 /> Validación declarativa</div>
  <div v-click flex items-center gap-2 mt-1><div i-carbon:warning-alt text-yellow-400 /> + module + service + pipe global</div>
  <div v-click flex items-center gap-2 mt-1><div i-carbon:warning-alt text-yellow-400 /> El DTO valida en runtime, pero el contrato no llega al cliente</div>
</div>

<!--
Nest resuelve validación y estructura, a cambio de ceremonia: decoradores,
DTOs, módulos, providers. Escala muy bien en equipos grandes que aceptan
sus convenciones.
-->

---
glow: left
glowSeed: 27
---

# El mismo endpoint · Elysia

```ts {all|4|5-8|all}
import { Elysia, t } from 'elysia'

new Elysia()
  .put('/user/:id', ({ params: { id }, body }) => update(id, body), {
    params: t.Object({ id: t.Number() }),
    body: t.Object({
      name: t.String({ minLength: 1 }),
    }),
  })
  .listen(3000)
```

<div mt-8 flex gap-8 text-sm opacity-80>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> <code>id</code> ya es <code>number</code> (coerción del schema)</div>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> <code>body</code> validado <b>y</b> tipado a la vez</div>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> 400 automático si no cumple</div>
</div>

<!--
Un solo schema hace tres trabajos: valida en runtime, tipa el handler en
compile-time y (lo veremos) documenta en OpenAPI. Cero duplicación.
-->

---
glow: bottom
glowSeed: 36
---

# Anatomía de un request

<div flex flex-col gap-7 mt-8>

<div v-click="1">
  <div flex items-center gap-2 mb-3 opacity-90>
    <div i-simple-icons:express text-white /><span font-semibold>Express</span>
    <span text-xs opacity-50 ml-2>todo es un middleware opaco</span>
  </div>
  <div flex items-center gap-1 flex-wrap>
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">Request</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">middleware</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">middleware</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">router</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">handler</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-700 bg="zinc-900/70">Response</div>
    <div text-xs opacity-40 ml-3 font-mono>error → (err, req, res, next)</div>
  </div>
</div>

<div v-click="2">
  <div flex items-center gap-2 mb-3 opacity-90>
    <div i-logos:nestjs /><span font-semibold>NestJS</span>
    <span text-xs opacity-50 ml-2>cada preocupación, una clase</span>
  </div>
  <div flex items-center gap-1 flex-wrap>
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Request</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Middleware</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Guards</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Interceptors</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Pipes</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Controller</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Interceptors</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Filters</div>
    <div i-carbon:arrow-right opacity-30 text-xs />
    <div class="px-2 py-1 rounded-full text-[11px] font-mono border border-zinc-700 bg-zinc-900/70">Response</div>
  </div>
</div>

<div v-click="3" flex items-center gap-3 mt-6>
  <img src="/elysia.svg" class="h-7" />
  <span text-lg>¿Y Elysia? No encadena funciones — <b class="text-gradient-elysia">emite eventos</b></span>
  <div i-carbon:arrow-right text-xl opacity-70 />
</div>

</div>

<!--
Express: una cadena de funciones donde todo es un middleware sin tipos; el orden
lo garantizas tú. Nest: el request atraviesa clases especializadas (guards,
interceptors, pipes, filters). Elysia no encaja en una fila: su ciclo de vida
es un grafo de eventos — siguiente slide.
-->

---
glow: right
glowSeed: 58
---

# El ciclo de vida de Elysia

<div text-sm opacity-60 mb-1>
  Cada caja es un <b>evento</b> del ciclo · tu código se <b>suscribe</b> con un hook: <code>.onTransform(fn)</code>, <code>.onError(fn)</code>…
</div>

<svg viewBox="0 0 1240 560" class="w-full max-h-95" fill="none" font-family="'JetBrains Mono', ui-monospace, monospace">
  <defs>
    <marker id="ag" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#a1a1aa" />
    </marker>
    <marker id="ar" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#f06292" />
    </marker>
  </defs>

  <!-- happy path: arrows -->
  <g stroke="#a1a1aa" stroke-width="2.5">
    <path d="M15 75 H100" marker-end="url(#ag)" />
    <path d="M315 75 H425" marker-end="url(#ag)" />
    <path d="M635 75 H745" marker-end="url(#ag)" />
    <path d="M955 75 H1120 V218" marker-end="url(#ag)" />
    <path d="M1120 320 V465 H960" marker-end="url(#ag)" />
    <path d="M745 465 H635" marker-end="url(#ag)" />
    <path d="M425 465 H315" marker-end="url(#ag)" />
    <path d="M105 465 H20" marker-end="url(#ag)" />
  </g>
  <g fill="#71717a" style="font-size:17px" text-anchor="middle">
    <text x="60" y="58">Request</text>
    <text x="370" y="58">Routing</text>
    <text x="690" y="58">Validation</text>
    <text x="60" y="448">Response</text>
  </g>

  <!-- happy path: event boxes -->
  <g>
    <rect x="110" y="30" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="210" y="83" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">onRequest</text>
    <rect x="430" y="30" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="530" y="83" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">transform</text>
    <rect x="750" y="30" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="850" y="83" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">beforeHandle</text>
    <rect x="1020" y="225" width="200" height="90" rx="14" fill="#0ea5e91a" stroke="#38bdf8" stroke-width="1.5" />
    <text x="1120" y="278" text-anchor="middle" style="font-size:25px" fill="#7dd3fc">Handler</text>
    <rect x="750" y="420" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="850" y="473" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">afterHandle</text>
    <rect x="430" y="420" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="530" y="473" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">mapResponse</text>
    <rect x="110" y="420" width="200" height="90" rx="14" fill="#18181bee" stroke="#3f3f46" stroke-width="1.5" />
    <text x="210" y="466" text-anchor="middle" style="font-size:25px" fill="#e4e4e7">afterResponse</text>
    <text x="210" y="494" text-anchor="middle" style="font-size:15px" fill="#71717a">(deferred)</text>
  </g>

  <!-- error flow -->
  <g v-click="1">
    <g stroke="#f06292" stroke-width="2.5" opacity="0.85">
      <path d="M310 128 L525 232" marker-end="url(#ar)" />
      <path d="M545 128 L602 216" marker-end="url(#ar)" />
      <path d="M770 128 L682 216" marker-end="url(#ar)" />
      <path d="M1015 270 L728 270" marker-end="url(#ar)" />
      <path d="M800 415 L688 324" marker-end="url(#ar)" />
      <path d="M545 415 L602 324" marker-end="url(#ar)" />
    </g>
    <text x="392" y="158" fill="#f06292" style="font-size:15px" text-anchor="middle" transform="rotate(25 392 158)">Route not found</text>
    <text x="620" y="207" fill="#f06292" style="font-size:17px" text-anchor="middle">Error is thrown</text>
    <rect x="520" y="225" width="200" height="90" rx="14" fill="#f0629215" stroke="#f06292" stroke-width="1.5" />
    <text x="620" y="278" text-anchor="middle" style="font-size:25px" fill="#fb7185">onError</text>
    <path d="M513 312 L332 418" stroke="#a1a1aa" stroke-width="2.5" marker-end="url(#ag)" />
  </g>
</svg>

<div v-click="2" mt-1 flex justify-center gap-10 text-xs font-mono opacity-85>
  <div flex items-center gap-2><div i-carbon:event-schedule text-sky-400 /> evento = punto del ciclo</div>
  <div flex items-center gap-2><div i-carbon:code text-fuchsia-400 /> hook = tu función suscrita a ese evento</div>
  <div flex items-center gap-2><div i-carbon:chart-line text-teal-300 /> <code>trace</code> mide cada evento</div>
</div>

<!--
Réplica del "Life Cycle Graph" oficial (elysiajs.com/essential/life-cycle).
El request entra, se enruta, se valida, y cada punto del recorrido es un EVENTO
al que te suscribes con un hook: .onRequest, .onTransform, .beforeHandle,
.afterHandle, .mapResponse, .afterResponse (deferred: corre tras enviar la respuesta).
Click 1: los errores NO cortan el flujo con un try/catch gigante — cualquier etapa
que lance va al evento onError (incluido "route not found"), y desde ahí se
construye la respuesta de error.
Click 2: vocabulario — evento vs hook. "Por hook" y "por eventos" son la misma idea:
el evento es el punto; el hook es tu función registrada en él.
-->

---
glow: bottom
glowSeed: 64
---

# Rendimiento

<div text-sm opacity-50 mb-8>HTTP req/s · TechEmpower Round 22 (composite) · vía elysiajs.com</div>

<div flex flex-col gap-7 mt-4>
  <div v-click="1" flex items-center gap-4>
    <div w-34 flex items-center gap-2 justify-end shrink-0>
      <div i-simple-icons:express text-xl text-white /><span>Express</span>
    </div>
    <div flex-1 h-9 flex items-center>
      <div class="bench-bar" h-9 rounded-r bg-zinc-600 :style="{ width: $clicks >= 1 ? '4.6%' : '0%' }" />
      <span font-mono text-sm ml-3 opacity-80>113 117</span>
    </div>
  </div>
  <div v-click="2" flex items-center gap-4>
    <div w-34 flex items-center gap-2 justify-end shrink-0>
      <div i-simple-icons:fastify text-xl text-white /><span>Fastify</span>
    </div>
    <div flex-1 h-9 flex items-center>
      <div class="bench-bar" h-9 rounded-r bg-zinc-600 :style="{ width: $clicks >= 2 ? '16.9%' : '0%' }" />
      <span font-mono text-sm ml-3 opacity-80>415 600</span>
    </div>
  </div>
  <div v-click="3" flex items-center gap-4>
    <div w-34 flex items-center gap-2 justify-end shrink-0>
      <img src="/elysia.svg" class="h-6"><span>Elysia <span text-xs opacity-50>(Bun)</span></span>
    </div>
    <div flex-1 h-9 flex items-center>
      <div class="bench-bar" h-9 rounded-r bg-gradient-to-r from="[#60a5fa]" via="[#e879f9]" to="[#f06292]" :style="{ width: $clicks >= 3 ? '78%' : '0%' }" />
      <span font-mono text-sm ml-3 font-bold>2 454 631</span>
    </div>
  </div>
</div>

<div v-click="4" mt-10 flex justify-center gap-12 text-2xl>
  <div><span class="text-gradient-elysia" font-bold>21×</span> <span text-base opacity-60>vs Express</span></div>
  <div><span class="text-gradient-elysia" font-bold>6×</span> <span text-base opacity-60>vs Fastify</span></div>
</div>

<!--
Números del benchmark que publica la propia web de Elysia (TechEmpower R22).
Matiz honesto: gran parte de la diferencia la pone Bun como runtime, y ningún
benchmark sintético equivale a tu carga real. Pero el orden de magnitud importa.
-->

---
glow: bottom
glowSeed: 21
zoom: 0.95
---

# Benchmark en vivo

<div text-sm opacity-50 mb-4>1000 peticiones reales por framework, en orden y contra el mismo servidor · Express → Fastify → NestJS → Django → Spring Boot → Elysia</div>

<LiveBench default-base="https://prueba.asprino.dev" />

<!--
Nada de números de terceros: lo medimos aquí y ahora. Los seis servicios
devuelven el mismo "hello world", corren en el mismo host (bench/ del repo,
desplegado con docker compose) y las peticiones salen de este navegador.
Se suman Fastify (Node), Django (Python) y Spring Boot (Java 8 — la versión
"empresarial", no la última) para tener representación fuera del mundo
Node.js y JS/TS.
Advertir el matiz: medimos latencia HTTP end-to-end desde el navegador (incluye
red), no throughput puro de servidor — por eso el diferencial es menor que el
21× de TechEmpower, pero el orden se mantiene.
Si no hay red / el server no responde: el input permite cambiar la URL en vivo
(p. ej. localhost:8080 con docker compose up local) y la slide anterior ya
mostró el benchmark de referencia.
-->

---
glow: top
glowSeed: 31
---

# Cara a cara

<div mt-8 grid grid-cols-7 gap-y-4 gap-x-1 text-center items-center text-sm>
  <div />
  <div flex flex-col items-center justify-center gap-1 text-xs><div i-simple-icons:express text-lg text-white /> Express</div>
  <div flex flex-col items-center justify-center gap-1 text-xs><div i-simple-icons:fastify text-lg text-white /> Fastify</div>
  <div flex flex-col items-center justify-center gap-1 text-xs><div i-logos:nestjs text-lg /> NestJS</div>
  <div flex flex-col items-center justify-center gap-1 text-xs><div i-logos:django-icon text-lg /> Django</div>
  <div flex flex-col items-center justify-center gap-1 text-xs><div i-logos:spring-icon text-lg /> Spring Boot</div>
  <div flex flex-col items-center justify-center gap-1 text-xs><img src="/elysia.svg" class="h-4"> Elysia</div>

  <div v-click="1" text-left text-xs opacity-80>Tipado end-to-end</div>
  <div v-click="1"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="1"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="1"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="1"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="1"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="1"><div i-carbon:checkmark-filled text-green-400 ma /></div>

  <div v-click="2" text-left text-xs opacity-80>Validación integrada</div>
  <div v-click="2"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="2"><div i-carbon:checkmark-filled text-green-400 ma /></div>
  <div v-click="2"><div i-carbon:checkmark-filled text-green-400 ma /></div>
  <div v-click="2"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="2"><div i-carbon:checkmark-filled text-green-400 ma /></div>
  <div v-click="2"><div i-carbon:checkmark-filled text-green-400 ma /></div>

  <div v-click="3" text-left text-xs opacity-80>OpenAPI automático</div>
  <div v-click="3"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="3"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="3"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="3"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="3"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="3"><div i-carbon:checkmark-filled text-green-400 ma /></div>

  <div v-click="4" text-left text-xs opacity-80>Performance</div>
  <div v-click="4" font-mono text-xs opacity-60>1×</div>
  <div v-click="4" font-mono text-xs opacity-60>~1.5×</div>
  <div v-click="4" font-mono text-xs opacity-60>~1–2×</div>
  <div v-click="4" font-mono text-xs opacity-60>~0.5×</div>
  <div v-click="4" font-mono text-xs opacity-60>~3–5×</div>
  <div v-click="4" font-mono text-xs class="text-gradient-elysia" font-bold>~21×</div>

  <div v-click="5" text-left text-xs opacity-80>Madurez / ecosistema</div>
  <div v-click="5"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="5"><div i-carbon:checkmark-filled text-green-400 ma /></div>
  <div v-click="5"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="5"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="5"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="5"><div i-carbon:in-progress text-sky-400 ma /></div>

  <div v-click="6" text-left text-xs opacity-80>Estructura para equipos grandes</div>
  <div v-click="6"><div i-carbon:close-filled text-red-400 opacity-60 ma /></div>
  <div v-click="6"><div i-carbon:warning-alt-filled text-yellow-400 opacity-80 ma /></div>
  <div v-click="6"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="6"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="6"><div flex justify-center gap-1><div i-carbon:checkmark-filled text-green-400 /><div i-carbon:checkmark-filled text-green-400 /></div></div>
  <div v-click="6"><div i-carbon:checkmark-filled text-green-400 ma /></div>
</div>

<!--
El "warning" de Nest en tipado E2E: se puede lograr con OpenAPI codegen o
librerías extra, pero no viene de serie ni es instantáneo como Eden.
La performance de Nest depende del adapter (Express por defecto, Fastify opcional).
Fastify: valida con JSON Schema de serie (por eso el check en "validación"),
pero no comparte tipos con el cliente sin trabajo extra.
Django: sin Django REST Framework la validación/OpenAPI son manuales — con
DRF sube a nivel Nest, pero no viene de fábrica.
Spring Boot: Bean Validation y springdoc-openapi son estándar de facto en el
ecosistema, aunque piden dependencias y configuración explícitas.
Los multiplicadores de performance son órdenes de magnitud ilustrativos (JVM
calentada y Node suelen moverse en ligas distintas a CPython síncrono), no
una medición equivalente a la del benchmark en vivo de la slide anterior.
-->

---
layout: center
glow: bottom
glowSeed: 99
---

<div text-center>
  <div text-sm tracking-widest opacity-50 mb-4>PARTE 3</div>
  <h1 text-5xl font-bold>¿Y para mi proyecto?</h1>
  <p text-xl opacity-60 mt-4>A qué mercado se ajusta cada uno</p>
</div>

---
glow: top
glowSeed: 45
---

# Cada uno tiene su sitio

<div grid grid-cols-3 gap-4 mt-6 text-sm>
  <div v-click="1" flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div flex items-center gap-3><div i-simple-icons:express text-2xl text-white /><span text-lg font-semibold>Express</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Mantener sistemas existentes</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Equipos que ya lo dominan</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Middleware para todo lo imaginable</div>
    </div>
  </div>
  <div v-click="2" flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div flex items-center gap-3><div i-simple-icons:fastify text-2xl text-white /><span text-lg font-semibold>Fastify</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Node "sin sorpresas", cerca del metal</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Validación por JSON Schema de serie</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> APIs internas de alto throughput</div>
    </div>
  </div>
  <div v-click="3" flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div flex items-center gap-3><div i-logos:nestjs text-2xl /><span text-lg font-semibold>NestJS</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Corporativo / enterprise</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Equipos grandes con rotación</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Microservicios, colas, gRPC de serie</div>
    </div>
  </div>
  <div v-click="4" flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div flex items-center gap-3><div i-logos:django-icon text-2xl /><span text-lg font-semibold>Django</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Backends con mucho CRUD/admin</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> ORM + panel admin de fábrica</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Equipos Python / data-heavy</div>
    </div>
  </div>
  <div v-click="5" flex flex-col gap-3 p-5 rounded-xl border border-zinc-800 bg="zinc-900/50">
    <div flex items-center gap-3><div i-logos:spring-icon text-2xl /><span text-lg font-semibold>Spring Boot</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Legado empresarial en JVM (aquí, Java 8)</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Bancos, seguros, gran escala regulada</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 /> Equipos Java con ciclos de vida largos</div>
    </div>
  </div>
  <div v-click="6" flex flex-col gap-3 p-5 rounded-xl border border-sky-900 bg="sky-950/20">
    <div flex items-center gap-3><img src="/elysia.svg" class="h-6"><span text-lg font-semibold>Elysia</span></div>
    <div text-xs opacity-70 flex flex-col gap-1.5 mt-1>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 text-sky-400 /> Startups y productos nuevos</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 text-sky-400 /> APIs donde el rendimiento es dinero</div>
      <div flex items-start gap-2><div i-carbon:arrow-right mt-0.5 shrink-0 text-sky-400 /> Full-stack TS: contrato compartido sin codegen</div>
    </div>
  </div>
</div>

<!--
La decisión no es religiosa, es de contexto: código legado y conocimiento del
equipo pesan más que cualquier benchmark. Fastify cubre el hueco "Node rápido
sin el peso de Nest". Django sigue siendo el rey cuando el admin/ORM de
fábrica ahorra semanas. Spring Boot, con Java 8, representa el escenario real
de muchas empresas: no es el Java más nuevo, pero es el que corre en producción.
Elysia brilla cuando empiezas de cero con TypeScript en todo el stack y el
time-to-market importa.
-->

---
layout: center
glow: bottom
glowSeed: 150
---

<div text-center>
  <div text-sm tracking-widest opacity-50 mb-4>PARTE 4</div>
  <div flex items-center justify-center gap-5>
    <img src="/elysia.svg" class="h-14">
    <h1 text-5xl font-bold>Elysia a fondo</h1>
  </div>
</div>

---
glow: left
glowSeed: 70
---

# Hola, Elysia

```ts {all|3|4|5-8|9|all}
import { Elysia } from 'elysia'

new Elysia()
  .get('/', () => 'Hola 👋')
  .get('/json', () => ({
    framework: 'elysia',
    runtime: 'bun',
  }))
  .listen(3000)
```

<div mt-8 flex gap-10 text-sm opacity-80>
  <div v-click flex items-center gap-2><div i-carbon:flash-filled text-yellow-300 /> Devuelve valores: Elysia infiere el <code>Content-Type</code></div>
  <div v-click flex items-center gap-2><div i-logos:bun /> Bun, Node, y edge (Cloudflare, etc.)</div>
</div>

<!--
API encadenable, cero configuración, cero decoradores. El handler devuelve
un valor y Elysia se encarga del resto. Aunque nació para Bun, hoy es
agnóstico del runtime.
-->

---
glow: right
glowSeed: 83
---

# Un schema, tres trabajos

<div grid grid-cols-2 gap-8 items-center>

```ts
.post('/campaign', ({ body }) => create(body), {
  body: t.Object({
    title: t.String({ minLength: 3 }),
    budget: t.Number({ minimum: 0 }),
    tags: t.Array(t.String()),
  }),
})
```

<div flex flex-col gap-5>
  <div v-click="1" flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg="zinc-900/60">
    <div i-carbon:security text-3xl text-sky-400 />
    <div>
      <div font-semibold>Valida en runtime</div>
      <div text-sm opacity-60>400 automático con detalle del error</div>
    </div>
  </div>
  <div v-click="2" flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg="zinc-900/60">
    <div i-logos:typescript-icon text-3xl />
    <div>
      <div font-semibold>Tipa en compile-time</div>
      <div text-sm opacity-60><code>body</code> inferido, sin <code>as</code> ni casts</div>
    </div>
  </div>
  <div v-click="3" flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg="zinc-900/60">
    <div i-carbon:document text-3xl text-fuchsia-400 />
    <div>
      <div font-semibold>Documenta en OpenAPI</div>
      <div text-sm opacity-60>Swagger / Scalar UI sin escribir YAML</div>
    </div>
  </div>
</div>

</div>

<div v-click="4" mt-8 text-center text-lg>
  <span class="text-gradient-elysia" font-semibold>Single Source of Truth</span>
  <span opacity-60> — el schema es el contrato</span>
</div>

<!--
Esta es LA idea de Elysia. En Express estos tres trabajos son tres piezas
de código distintas que hay que mantener sincronizadas a mano. Aquí es una.
-->

---
glow: left
glowSeed: 111
zoom: 0.9
---

# Plugins y ciclo de vida

```ts {all|2|3|4|5|6|all}
new Elysia()
  .use(cors())                                           // un plugin = hooks ya suscritos
  .derive(({ headers }) => ({ user: jwt(headers) }))     // evento: transform
  .guard({ headers: t.Object({ auth: t.String() }) })    // evento: beforeHandle
  .onError(({ code, status }) => status(500, { code }))  // evento: onError
  .get('/me', ({ user }) => user)                        // handler
```

<div mt-4 flex justify-center>
  <img src="/elysia-lifecycle-dark.svg" class="w-4/5 rounded-lg border border-zinc-800/80 bg-black/40 px-3 py-2" />
</div>

<!--
Los plugins son instancias de Elysia que se componen, y encapsulan también
sus tipos: al hacer .use() el compilador sabe qué añade cada plugin — un plugin
no es más que un paquete de hooks/rutas ya suscritos al ciclo.
derive corre en la etapa transform; guard valida en beforeHandle; onError es
el evento transversal de errores. Último click: el Life Cycle Graph oficial
(adaptado a oscuro) — cada línea del código de arriba es una suscripción a una
caja del diagrama. Ecosistema para mencionar de palabra: CORS, OpenAPI, JWT,
cron, GraphQL, static, WebSocket nativo.
-->

---
layout: two-cols
glow: right
glowSeed: 142
class: gap-4
---

# Eden · el contrato viaja al cliente

```ts
// server.ts
const app = new Elysia()
  .put('/user/:id', ({ params, body }) =>
    update(params.id, body), {
    body: t.Object({ name: t.String() }),
  })
  .listen(3000)

export type App = typeof app
```

<div text-sm opacity-60 mt-4>
  Solo se exporta el <b>tipo</b> — nada de runtime compartido
</div>

::right::

<div mt-13 />

```ts
// client.ts (front, monorepo, otro repo…)
import { treaty } from '@elysiajs/eden'
import type { App } from './server'

const api = treaty<App>('localhost:3000')

const { data, error } = await api
  .user({ id: 1 })
  .put({ name: 'saao' })
//  ^? data: { id: number; name: string }
```

<div mt-4 text-sm opacity-80 flex flex-col gap-2>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> Autocompletado de rutas y payloads</div>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> Rompes el contrato → error de compilación</div>
  <div v-click flex items-center gap-2><div i-carbon:checkmark-filled text-green-400 /> Sin codegen, sin OpenAPI intermedio</div>
</div>

<!--
Esto es lo que promete "end-to-end type safety": el frontend consume la API
con tipos exactos derivados del servidor. Cambias el schema en el server y
el front deja de compilar hasta que te adaptes. Como tRPC, pero sobre una
API REST normal que también sirve a terceros.
-->

---
glow: top
glowSeed: 173
---

# En resumen

<div flex flex-col gap-6 mt-14 text-2xl>
  <div v-click="1" flex items-center gap-4>
    <div i-carbon:rocket text-3xl text-sky-400 />
    <div>El <b>runtime</b> ya no es una decisión por defecto: Bun cambia las reglas</div>
  </div>
  <div v-click="2" flex items-center gap-4>
    <div i-carbon:choices text-3xl text-fuchsia-400 />
    <div>El framework se elige por <b>contexto</b>, no por hype</div>
  </div>
  <div v-click="3" flex items-center gap-4>
    <div i-carbon:idea text-3xl text-teal-400 />
    <div>Elysia: <b>un schema</b> = validación + tipos + docs, y el contrato llega al cliente con <b>Eden</b></div>
  </div>
</div>

<!--
Tres ideas para llevarse a casa. Si mañana arrancas una API TypeScript
desde cero, Elysia merece estar en la shortlist.
-->

---
layout: center
glowSeed: 233
---

<div flex flex-col items-center gap-8>
  <img src="/elysia_v.webp" class="max-h-56 drop-shadow-[0_0_35px_#60a5fa55]">
  <h1 class="text-gradient-elysia" text-5xl font-bold>¡Gracias!</h1>
  <div flex flex-col items-center gap-3 text-lg opacity-80>
    <div flex items-center gap-2><div i-carbon:link /> elysiajs.com</div>
    <div flex items-center gap-2><div i-carbon:logo-github /> github.com/elysiajs/elysia</div>
  </div>
  <p text-sm opacity-40>¿Preguntas?</p>
</div>

<!--
Cierre y turno de preguntas. Añade aquí tu QR de contacto / repo de la charla.
-->
