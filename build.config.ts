import { builtinModules } from 'node:module'
import { defineBuildConfig } from 'unbuild'

const allExternal = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
]

export default defineBuildConfig({
  // entries: ['./src/'],
  entries: [
    { builder: 'mkdist', input: './src/client', outDir: './dist/client', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src/client', outDir: './dist/client', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'], ext: 'js' },
    { builder: 'mkdist', input: './src/shared', outDir: './dist/shared', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'], ext: 'js' },
    { builder: 'rollup', input: './src/index', outDir: './dist' },
  ],
  clean: true,
  sourcemap: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  externals: [
    'fs',
    'path',
    'os',
    'child_process',
    'events',
    'stream',
    'fsevents',
    'vite',
    'vitepress',
    'vite-plugin-git',
    ...allExternal,
  ],
})
