import type { ContributorInfo } from '../options'

export function getContributorInfo(contributor: { name: string, email?: string, username?: string }, infos: ContributorInfo[] = []): ContributorInfo | undefined {
  return infos.find(
    ({ name, username, alias, email, emailAlias }) => {
      if (name === contributor.name)
        return true

      if (username === contributor.name)
        return true

      if (alias?.includes(contributor.name))
        return true

      if (contributor.username) {
        if (name === contributor.username)
          return true

        if (username === contributor.username)
          return true

        if (alias?.includes(contributor.username))
          return true
      }

      if (contributor.email) {
        if (email === contributor.email)
          return true

        if (emailAlias?.includes(contributor.email))
          return true
      }

      return false
    },
  )
}
