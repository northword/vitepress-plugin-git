// export interface GitPageData {
//   git: GitData
//   frontmatter: GitFrontmatter
// }

// ==============================================================
// GitData
// ==============================================================
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
  contributors?: GitContributorData[]

  /**
   * Changelog of a page
   */
  changelog?: GitChangelogData[]
}

export interface GitContributorData {
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

export interface GitChangelogData {
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
  coAuthors?: GitCoAuthorData[]
}

/**
 * Co-author information
 */
export interface GitCoAuthorData {
  name: string
  email: string
}

// ==============================================================
// GitFrontmatter
// ==============================================================
export interface GitFrontmatter {
  contributors?: boolean | string[]
  changelog?: boolean
  gitInclude?: string[]
}
