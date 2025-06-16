export interface GitLocaleData {
  /**
   * Contributors title
   */
  contributors: string

  /**
   * Changelog title
   */
  changelog: string

  noContributors: string

  /**
   * Word to represent a commit "on" a time
   */
  timeOn: string

  /**
   * Changelog button
   */
  viewChangelog: string

  /**
   * Latest updated
   */
  latestUpdateAt: string

  noChangelog: string
}

export type GitLocales = Record<string, GitLocaleData>
export type GitLocalesOptions = Record<string, Partial<GitLocaleData>>
