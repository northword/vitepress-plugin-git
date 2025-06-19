import type { ContributorInfo, GitChangelogNodeOptions, MergedRawCommit } from '../src'
import type { GitChangelogData } from '../src/shared'
import { describe, expect, it } from 'vitest'
import { resolveChangelog } from '../src/node/resolveChangelog'

export const baseCommit: MergedRawCommit = {
  filepaths: ['file/to/path1'],
  hash: 'abcdefghigklmnopqrst',
  message: 'feat: init commit',
  body: '',
  time: 1700000000000,
  author: 'Alice',
  email: 'alice@example.com',
  refs: '',
  coAuthors: [],
}

export const baseContributors: ContributorInfo[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    username: 'aliceGH',
  },
]

export const baseOptions: GitChangelogNodeOptions = {
  repoUrl: 'https://github.com/my/repo',
  commitUrlPattern: ':repo/commit/:hash',
  issueUrlPattern: ':repo/issues/:issue',
  tagUrlPattern: ':repo/releases/tag/:tag',
}

describe('resolveChangelog', () => {
  it('generates full changelog info with URLs and tag', () => {
    const fullCommit: MergedRawCommit = {
      ...baseCommit,
      message: 'feat: init commit (#123)',
      refs: 'tag: v1.0.0',
    }
    const result = resolveChangelog([fullCommit], baseOptions, baseContributors)

    const expected: GitChangelogData = {
      hash: 'abcdefghigklmnopqrst',
      time: 1700000000000,
      email: 'alice@example.com',
      author: 'Alice',
      message: 'feat: init commit (<a href="https://github.com/my/repo/issues/123" target="_blank" rel="noopener noreferrer">#123</a>)',
      tag: 'v1.0.0',
      commitUrl: 'https://github.com/my/repo/commit/abcdefghigklmnopqrst',
      tagUrl: 'https://github.com/my/repo/releases/tag/v1.0.0',
    }

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expected)
  })

  it('handles commit with no tag', () => {
    const commit = { ...baseCommit, refs: '' }
    const result = resolveChangelog([commit], baseOptions, baseContributors)
    expect(result[0].tag).toBeUndefined()
    expect(result[0].tagUrl).toBeUndefined()
  })

  it('handles commit with coAuthors', () => {
    const coAuthors = [{ name: 'Bob <bob@example.com>', email: 'Carol <carol@example.com>' }]
    const commit = {
      ...baseCommit,
      coAuthors,
    }
    const result = resolveChangelog([commit], baseOptions, baseContributors)
    expect(result[0].coAuthors).toEqual(coAuthors)
  })

  it('uses fallback author and email if no contributor matched', () => {
    const commit = { ...baseCommit, email: 'unknown@example.com' }
    const result = resolveChangelog([commit], baseOptions, [])
    expect(result[0].author).toBe('Alice') // fallback to commit.author
    expect(result[0].email).toBe('unknown@example.com')
  })

  it('handles without repo', () => {
    const fullCommit: MergedRawCommit = {
      ...baseCommit,
      message: 'feat: init commit (#123)',
      refs: 'tag: v1.0.0',
    }
    const options = {}
    const result = resolveChangelog([fullCommit], options, baseContributors)
    const expected: GitChangelogData = {
      hash: 'abcdefghigklmnopqrst',
      time: 1700000000000,
      email: 'alice@example.com',
      author: 'Alice',
      message: 'feat: init commit (#123)',
      tag: 'v1.0.0',
    }
    expect(result[0]).toEqual(expected)
  })

  it('supports functional repoUrl', () => {
    const options = {
      ...baseOptions,
      repoUrl: (commit: any) => `https://gitlab.com/myproj/${commit.hash}`,
    }
    const result = resolveChangelog([baseCommit], options, baseContributors)
    expect(result[0].commitUrl).toBe('https://gitlab.com/myproj/abcdefghigklmnopqrst/commit/abcdefghigklmnopqrst')
  })

  it('respects maxCount', () => {
    const commits = [
      { ...baseCommit, hash: '1' },
      { ...baseCommit, hash: '2' },
      { ...baseCommit, hash: '3' },
    ]

    const result = resolveChangelog(commits, { ...baseOptions, maxCount: 2 }, baseContributors)
    expect(result).toHaveLength(2)
    expect(result.map(c => c.hash)).toEqual(['1', '2'])
  })
})
