import type { InjectionKey } from 'vue'
import type { GitLocales } from './locales'

export const gitInjectionKey: InjectionKey<GitPluginForVueOptions> = Symbol('vitepress-plugin-git')

export interface GitPluginForVueOptions {
  /**
   * Localization config
   *
   * 本地化配置
   */
  locales?: GitLocales
}
