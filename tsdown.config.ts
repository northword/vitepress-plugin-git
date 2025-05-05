import { builtinModules } from 'node:module'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

const allExternal = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
]

export default defineConfig([
  {
    entry: ['./src/index.ts', './src/client/index.ts'],
    target: 'node20.18',
    platform: 'neutral',
    dts: true,
    clean: true,
    // clean: ['dist'],
    plugins: [
      Vue({ isProduction: true, style: {
        trim: true,

      } }),
    ],
    external: [
      'vue',
      'vite',
      'vitepress',
      ...allExternal,
    ],
  },
])
