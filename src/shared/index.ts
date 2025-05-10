/**
 * Git provider
 */
export type KnownGitProvider = 'bitbucket' | 'gitee' | 'github' | 'gitlab'

/**
 * Co-author information
 */
export interface CoAuthorInfo {
  name: string
  email: string
}

export interface GitContributorInfo {
  /**
   * Contributor display name
   */
  name: string
  /**
   * Contributor email
   */
  email: string

  /**
   * Contributor username on the git hosting service
   */
  username?: string
  /**
   * Number of commits
   */
  commits: number
  /**
   * Contributor avatar
   */
  avatar?: string
  /**
   * The url of the contributor
   */
  url?: string
}

export interface GitChangelogInfo {
  /**
   * Commit hash
   */
  hash: string
  /**
   * Unix timestamp in milliseconds
   */
  time: number
  /**
   * Commit message
   */
  message: string
  /**
   * The url of the commit
   */
  commitUrl?: string
  /**
   * release tag
   */
  tag?: string
  /**
   * The url of the release tag
   */
  tagUrl?: string
  /**
   * Commit author name
   */
  author: string
  /**
   * Commit author email
   */
  email: string

  /**
   * The co-authors of the commit
   */
  coAuthors?: CoAuthorInfo[]
}

export interface GitPageData {
  git: GitData
  frontmatter: GitFrontmatter
}

export interface GitData {
  /**
   * Unix timestamp in milliseconds of the first commit
   */
  createdTime?: number

  /**
   * Unix timestamp in milliseconds of the last commit
   */
  updatedTime?: number

  /**
   * Contributors of all commits
   */
  contributors?: GitContributorInfo[]

  /**
   * Changelog of a page
   */
  changelog?: GitChangelogInfo[]
}

export interface GitFrontmatter {
  contributors: boolean
  changelog: boolean
  gitInclude: string[]
}

export interface GitUrlPattern {
  issue?: string
  tag?: string
  commit?: string
}

export interface GitInjectOptions {
  provider?: KnownGitProvider | null
  repo?: string
  pattern?: GitUrlPattern
}
