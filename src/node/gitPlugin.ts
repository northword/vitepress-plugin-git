import type { Plugin } from 'vite'
import type { GitPluginOptions } from './options'

// Vite 插件，负责处理依赖和 Markdown Transfrom
export function GitPlugin(_options: GitPluginOptions = {}): Plugin {
  return {
    name: 'vitepress-plugin-git',
    // May set to 'pre' since end user may use vitepress wrapped vite plugin to
    // specify the plugins, which may cause this plugin to be executed after
    // vitepress or the other markdown processing plugins.
    enforce: 'pre',

    config: () => ({
      // define: {
      //   __GIT_OPTIONS__: options,
      // },
      // _git_options: options,
      optimizeDeps: {
        exclude: [
          '@nolebase/vitepress-plugin-git-changelog/client',
        ],
      },
      ssr: {
        noExternal: [],
      },
      environments: {},
    }
    ),

    configResolved(_config) {
      // console.log(JSON.stringify(config, null, 2))
    },

    // transform(code, id) {
    //   if (!id.endsWith('.md'))
    //     return null

    //   code = [
    //     code,
    //     '',
    //     '<NolebaseGitContributors />',
    //     '',
    //     '<NolebaseGitChangelog />',
    //     '',
    //   ].join('\n')

    //   return code
    // },
  }
}
