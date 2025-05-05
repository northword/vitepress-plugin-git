import type { ContributorInfo } from '../options'

function toArray<T = unknown>(value?: T | T[]): T[] {
  return Array.isArray(value) ? value : value ? [value] : []
}

export function getContributorInfo(contributor: { name: string, email?: string }, infos: ContributorInfo[] = []): ContributorInfo | null {
  return infos.find(
    ({ username, alias, email, emailAlias }) =>
      username === contributor.name
      || toArray(alias).includes(contributor.name)
      || (contributor.email
        && (contributor.email === email
          || toArray(emailAlias).includes(contributor.email))),
  ) ?? null
}
