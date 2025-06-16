import type { InjectionKey } from 'vue'
import type { GitClientOptions } from '../shared'

export const gitInjectionKey: InjectionKey<GitClientOptions> = Symbol('vitepress-plugin-git')

declare const __GIT_OPTIONS__: GitClientOptions
export const gitClientOptions = __GIT_OPTIONS__
