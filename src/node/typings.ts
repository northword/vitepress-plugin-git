import type { GitCoAuthorData } from '../shared'

export interface RawCommit {
  /**
   * File path
   */
  filepath: string
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
   * Commit message body
   */
  body: string
  /**
   * Commit refs
   */
  refs: string
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
  coAuthors: GitCoAuthorData[]
}

export interface MergedRawCommit extends Omit<RawCommit, 'filepath'> {
  filepaths: string[]
}

/**
 * Git provider
 */
export type KnownGitProvider = 'bitbucket' | 'gitee' | 'github' | 'gitlab'
