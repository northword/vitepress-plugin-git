import type { Plugin } from 'vue'
import type { GitPluginForVueOptions } from './options'
import { gitInjectionKey } from './options'

export const GitPluginForVue: Plugin<GitPluginForVueOptions[]> = {
  install(app, options?) {
    app.provide(gitInjectionKey, options ?? {})

    // for (const key of Object.keys(components))
    //   app.component(key, components[key as keyof typeof components])
  },
}
