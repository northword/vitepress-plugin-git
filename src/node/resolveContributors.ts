import type { GitContributorInfo } from '../shared'
import type { ContributorInfo, ContributorsOptions } from './options'
import type { MergedRawCommit } from './typings'
import { digestSHA256, getContributorInfo, getUserNameWithNoreplyEmail } from './utils'

interface RawContributor {
  name: string
  email: string
  commits: number
}

export function getContributorsFromCommit(commits: MergedRawCommit[]): RawContributor[] {
  return commits.flatMap(({ author, email, coAuthors }) => {
    return [
      {
        name: author,
        email,
      },
      ...coAuthors,
    ].map(c => ({ ...c, commits: 1 }))
  })
}

export function getAvatar(contributor: ContributorInfo, pattern?: string): string {
  if (contributor.avatar)
    return contributor.avatar

  if (contributor.username) {
    if (pattern)
      return pattern.replace(':username', contributor.username)
    return `https://github.com/${contributor.username}.png`
  }

  if (contributor.email)
    return `https://gravatar.com/avatar/${digestSHA256(contributor.email)}?d=retro`

  return ''
}

export function normalizeContributor(
  raw: RawContributor,
  options: ContributorsOptions,
): GitContributorInfo {
  const noreplyUsername = getUserNameWithNoreplyEmail(raw.email)

  const info = getContributorInfo({ ...raw, username: noreplyUsername }, options.info)

  const name = info?.name ?? raw.name
  const username = info?.username ?? noreplyUsername ?? name
  const email = info?.email ?? raw.email

  const avatar: string | undefined = options.avatar
    ? getAvatar({ ...info, username, name, email }, options.avatarPattern)
    : undefined

  const url
    = info?.url
      ?? (username ? `https://github.com/${username}` : undefined)

  return {
    name,
    username,
    email,
    avatar,
    url,
    commits: raw.commits,
  }
}

export function mergeContributors<T extends RawContributor>(list: T[]): T[] {
  const map = new Map<string, T>()

  for (const contributor of list) {
    const key = contributor.name
    const existing = map.get(key)

    if (existing)
      existing.commits += contributor.commits
    else
      map.set(key, { ...contributor })
  }

  return [...map.values()]
}

export function resolveContributors(
  commits: MergedRawCommit[],
  options: ContributorsOptions,
  extraContributors: string[] = [],
): GitContributorInfo[] {
  const extra: RawContributor[] = extraContributors.map(c => ({
    name: c,
    email: '',
    commits: 1,
  }))
  const normalized = mergeContributors([...getContributorsFromCommit(commits), ...extra])
    .map(identity => normalizeContributor(identity, options))
  const contributors = mergeContributors(normalized)

  return options.transform?.(contributors) ?? contributors
}
