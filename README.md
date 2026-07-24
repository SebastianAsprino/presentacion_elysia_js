# Presentación · ElysiaJS

Keynote (20–30 min) sobre backend TypeScript con Elysia.js, construida con [Slidev](https://sli.dev).
El efecto de fondo (polígonos difuminados animados entre slides) está adaptado de
[nekomeowww/talks](https://github.com/nekomeowww/talks) (charla de AIRI, créditos @pi0 @Atinux),
recoloreado con la paleta de [elysiajs.com](https://elysiajs.com).

## Uso

```bash
bun install
bun run dev      # http://localhost:3030 — tecla `p` para vista presenter
bun run export   # PDF de respaldo
```

- **`slides.md`** — las diapositivas (las notas del orador van embebidas en cada slide).
- **`global-bottom.vue`** — el efecto de fondo; se controla por frontmatter (`glow`, `glowSeed`, `glowOpacity`).

> Nota: los scripts usan `env -u VSCODE_CWD` porque UnoCSS desactiva el loader de
> iconos del filesystem cuando detecta esa variable (terminal integrada de VSCode).
