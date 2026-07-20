// Slidev ya aporta presetWind3, presetAttributify y presetIcons (con las
// colecciones @iconify-json instaladas); aquí solo se añade lo extra.
import { defineConfig, presetWebFonts } from 'unocss'

export default defineConfig({
  safelist: [
    ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
  ],
  presets: [
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'JetBrains Mono',
      },
      timeouts: {
        failure: 30000,
        warning: 30000,
      },
    }),
  ],
})
