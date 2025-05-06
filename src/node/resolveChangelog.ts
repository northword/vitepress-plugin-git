import type { GitChangelogInfo } from '../shared'
import type { ChangelogOptions, ContributorInfo } from './options'
import type { MergedRawCommit } from './typings'
import { getContributorInfo, getUserNameWithNoreplyEmail } from './utils'

const RE_CLEAN_REFS = /[()]/g
const RE_ISSUE = /#(\d+)/g

function parseTagName(refs: string): string | undefined {
  if (!refs)
    return

  const tags = refs
    .replace(RE_CLEAN_REFS, '')
    .split(',')
    .map(tag => tag.trim())

  return tags[0]?.includes('tag:') ? tags[0].replace('tag:', '').trim() : ''
}

export function resolveChangelog(commits: MergedRawCommit[], options: ChangelogOptions, contributors: ContributorInfo[]): GitChangelogInfo[] {
  const result: GitChangelogInfo[] = []

  const {
    maxCount = 100,
    repoUrl,
    commitUrlPattern = ':repo/commit/:hash',
    issueUrlPattern = ':repo/issues/:issue',
    tagUrlPattern = ':repo/releases/tag/:tag',
  } = options

  const sliceCommits = commits.slice(0, maxCount)

  for (const commit of sliceCommits) {
    const { hash, message, time, author, email, refs, coAuthors } = commit
    const tag = parseTagName(refs)
    const contributor = getContributorInfo(
      { name: getUserNameWithNoreplyEmail(email) ?? author, email },
      contributors,
    )

    const resolved: GitChangelogInfo = {
      hash,
      time,
      email: contributor?.email || email,
      author: contributor?.name ?? contributor?.username ?? author,
      message,
    }

    if (coAuthors.length)
      resolved.coAuthors = coAuthors

    if (tag)
      resolved.tag = tag

    const repo: string | undefined = typeof repoUrl === 'function'
      ? repoUrl(commit) ?? undefined
      : typeof repoUrl === 'string'
        ? repoUrl
        : undefined

    if (repo) {
      if (issueUrlPattern) {
        resolved.message = resolved.message.replace(
          RE_ISSUE,
          (matched, issue: string) => {
            const url = issueUrlPattern
              .replace(':issue', issue)
              .replace(':repo', repo)
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`
          },
        )
      }

      if (commitUrlPattern) {
        resolved.commitUrl = commitUrlPattern
          .replace(':hash', hash)
          .replace(':repo', repo)
      }

      if (tagUrlPattern && tag) {
        resolved.tagUrl = tagUrlPattern
          .replace(':tag', tag)
          .replace(':repo', repo)
      }
    }

    result.push(resolved)
  }

  return result
}
