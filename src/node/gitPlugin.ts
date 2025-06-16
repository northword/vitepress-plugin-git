import type { Plugin } from 'vite'
import type { GitOptions } from './options'
import { resolveClientOptions, setGitOptions } from './options'

// Vite 插件，负责处理依赖和 Markdown Transfrom
export function GitPluginForVite(options: GitOptions = {}): Plugin {
  return {
    name: 'vitepress-plugin-git',
    // May set to 'pre' since end user may use vitepress wrapped vite plugin to
    // specify the plugins, which may cause this plugin to be executed after
    // vitepress or the other markdown processing plugins.
    enforce: 'pre',

    buildStart() {
      // resolve config

      // check if the current directory is a git repository
    },

    config: () => ({
      define: {
        __GIT_OPTIONS__: resolveClientOptions(options),
      },
      optimizeDeps: {
        include: ['@vueuse/core'],
        exclude: [],
      },
      ssr: {
        noExternal: [],
      },
      environments: {},
    }
    ),

    configResolved(_config) {
      setGitOptions(options)
    },
  }
}
