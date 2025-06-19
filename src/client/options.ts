import type { GitChangelogClientOptions, GitContributorsClientOptions, GitLocalesOptions } from '../shared'

declare const __GIT_CONTRIBUTORS_OPTIONS__: GitContributorsClientOptions
export const contributorsOptions = __GIT_CONTRIBUTORS_OPTIONS__

declare const __GIT_CHANGELOG_OPTIONS__: GitChangelogClientOptions
export const changelogOptions = __GIT_CHANGELOG_OPTIONS__

declare const __GIT_LOCALES__: GitLocalesOptions
export const localesOptions = __GIT_LOCALES__ ?? {}
