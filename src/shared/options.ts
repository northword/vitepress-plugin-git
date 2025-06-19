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
  hideHeader?: boolean
  relativeTime?: boolean
  inlineAuthors?: boolean
  hideEmptyText?: boolean
}

export interface GitContributorsClientOptions {
  hideHeader?: boolean
  avatar?: boolean
  hideEmptyText?: boolean
}
