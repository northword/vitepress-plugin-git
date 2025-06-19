// ==============================================================
// Configs in Client side
// ==============================================================

import type { GitLocalesOptions } from './locale'

export interface GitClientOptions {
  contributors?: GitContributorsClientOptions
  changelog?: GitChangelogClientOptions
  /**
   * Locales options
   *
   * 本地化配置
   */
  locales?: GitLocalesOptions
}

export interface GitChangelogClientOptions {
  relativeTime?: boolean
  inlineAuthors?: boolean
}

export interface GitContributorsClientOptions {
  avatar?: boolean
}
