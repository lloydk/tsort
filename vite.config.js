import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/tsort.ts'),
      name: '@lloydk/tsort',
      fileName: 'tsort',
    },
  },
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    }
  },

  plugins: [
    dts()
  ],
})
