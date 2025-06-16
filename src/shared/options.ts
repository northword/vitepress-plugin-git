// ==============================================================
// Configs in Client side
// ==============================================================

import type { GitLocalesOptions } from './locale'

export interface GitClientOptions {
  changelog?: GitChangelogClientOptions
  contributors?: GitContributorsClientOptions
  locales?: GitLocalesOptions
}

export interface GitChangelogClientOptions {
  relativeTime?: boolean
}

export interface GitContributorsClientOptions {
  avatar?: boolean
}
