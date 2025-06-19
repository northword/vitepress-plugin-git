import type { Plugin } from 'vite'
import type { GitOptions } from './options'
import process from 'node:process'
import { resolveChangelogClientOptions, resolveContributorsClientOptions, setGitOptions } from './options'
import { checkGitRepo, inferGitInfo } from './utils'

export function GitPluginForVite(_options: GitOptions = {}): Plugin {
  const options: GitOptions = _options

  return {
    name: 'vitepress-plugin-git',
    // May set to 'pre' since end user may use vitepress wrapped vite plugin to
    // specify the plugins, which may cause this plugin to be executed after
    // vitepress or the other markdown processing plugins.
    enforce: 'pre',

    buildStart() {
      const cwd = process.cwd()
      const isGitRepoValid = checkGitRepo(cwd)
      if (isGitRepoValid) {
        const info = inferGitInfo(cwd)
        options.changelog ??= {}
        options.changelog.repoUrl ??= info.repoUrl ?? ''
      }
    },

    config: () => ({
      define: {
        __GIT_FEATURES__: {},
        __GIT_CONTRIBUTORS_OPTIONS__: resolveContributorsClientOptions(options),
        __GIT_CHANGELOG_OPTIONS__: resolveChangelogClientOptions(options),
        __GIT_LOCALES__: options.locales || {},
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
