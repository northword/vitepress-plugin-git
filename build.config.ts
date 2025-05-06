import { builtinModules } from 'node:module'
import { defineBuildConfig } from 'unbuild'

const allExternal = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
]

export default defineBuildConfig({
  entries: [
    // bundless for client, because Vue SFC needs file structure
    // { input: './src/client/', outDir: './dist/client' },
    { builder: 'mkdist', input: './src/client', outDir: './dist/client', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src/client', outDir: './dist/client', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'], ext: 'js' },
    // mkdist for shared, because we have some .d.ts files cannot be bundle
    // { input: './src/shared/', outDir: './dist/shared' },
    { builder: 'mkdist', input: './src/shared', outDir: './dist/shared', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'], ext: 'js' },
    // bundle for node
    { builder: 'rollup', input: './src/index', outDir: './dist' },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    // inlineDependencies: true,
  },
  externals: [
    'vite',
    'vitepress',
    ...allExternal,
  ],
})
