import type { GitChangelogData } from '../shared'
import type { ContributorInfo, GitChangelogNodeOptions } from './options'
import type { MergedRawCommit } from './typings'
import { getContributorInfo, getUserNameWithNoreplyEmail } from './utils'

const RE_CLEAN_REFS = /[()]/g
const RE_ISSUE = /#(\d+)/g

function parseTagName(refs: string): string | undefined {
  if (!refs)
    return

  const tag = refs
    .replace(RE_CLEAN_REFS, '')
    .split(',')
    .map(tag => tag.trim())
    .find(tag => tag.includes('tag:'))

  return tag?.replace('tag:', '').trim() || ''
}

function resolveRepoUrl(repoUrl: GitChangelogNodeOptions['repoUrl'], commit: MergedRawCommit): string | undefined {
  if (typeof repoUrl === 'function')
    return repoUrl(commit) ?? undefined
  if (typeof repoUrl === 'string')
    return repoUrl
  return undefined
}

function replaceIssueLinks(message: string, repo: string, issueUrlPattern: string): string {
  return message.replace(RE_ISSUE, (matched, issue: string) => {
    const url = issueUrlPattern
      .replace(':issue', issue)
      .replace(':repo', repo)
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`
  })
}

function resolveCommitUrl(repo: string, hash: string, pattern: string): string {
  return pattern.replace(':hash', hash).replace(':repo', repo)
}

function resolveTagUrl(repo: string, tag: string, pattern: string): string {
  return pattern.replace(':tag', tag).replace(':repo', repo)
}

export function resolveChangelog(
  commits: MergedRawCommit[],
  options: GitChangelogNodeOptions,
  contributors: ContributorInfo[],
): GitChangelogData[] {
  const {
    maxCount = 100,
    repoUrl,
    commitUrlPattern = ':repo/commit/:hash',
    issueUrlPattern = ':repo/issues/:issue',
    tagUrlPattern = ':repo/releases/tag/:tag',
  } = options

  return commits.slice(0, maxCount).map((commit) => {
    const { hash, message, time, author, email, refs, coAuthors } = commit
    const tag = parseTagName(refs)
    const contributor = getContributorInfo(
      { name: getUserNameWithNoreplyEmail(email) ?? author, email },
      contributors,
    )

    const resolved: GitChangelogData = {
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

    const repo = resolveRepoUrl(repoUrl, commit)

    if (repo) {
      resolved.message = replaceIssueLinks(resolved.message, repo, issueUrlPattern)
      resolved.commitUrl = resolveCommitUrl(repo, hash, commitUrlPattern)
      if (tag)
        resolved.tagUrl = resolveTagUrl(repo, tag, tagUrlPattern)
    }

    return resolved
  })
}
