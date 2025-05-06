import { builtinModules } from 'node:module'
import { defineBuildConfig } from 'unbuild'

const allExternal = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
]

export default defineBuildConfig({
  entries: [
    // bundless for client, because Vue SFC needs file structure
    { input: './src/client/', outDir: './dist/client' },
    // mkdist for shared, because we have some .d.ts files cannot be bundle
    { input: './src/shared/', outDir: './dist/shared' },
    // bundle for node
    { builder: 'rollup', input: './src/index', outDir: './dist' },
  ],
  clean: true,
  declaration: true,
  rollup: {
    // inlineDependencies: true,
  },
  externals: [
    'vite',
    'vitepress',
    ...allExternal,
  ],
})
