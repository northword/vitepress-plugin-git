import type { ContributorInfo } from '../options'
import { describe, expect, it } from 'vitest'
import { getContributorInfo } from './getContributorInfo'

describe('getContributorInfo', () => {
  const infos: ContributorInfo[] = [
    { name: 'Alice', username: 'aliceGH', email: 'alice@example.com' },
    { name: 'Bob', alias: ['Bobby'], emailAlias: ['bob+alias@example.com'] },
  ]

  it('should match by name', () => {
    const contributor = { name: 'Alice' }
    const info = getContributorInfo(contributor, infos)
    expect(info?.username).toBe('aliceGH')
  })

  it('should match by alias', () => {
    const contributor = { name: 'Bobby' }
    const info = getContributorInfo(contributor, infos)
    expect(info?.name).toBe('Bob')
  })

  it('should match by emailAlias', () => {
    const contributor = { name: 'Unknown', email: 'bob+alias@example.com' }
    const info = getContributorInfo(contributor, infos)
    expect(info?.name).toBe('Bob')
  })

  it('should return undefined if no match', () => {
    const contributor = { name: 'Charlie' }
    const info = getContributorInfo(contributor, infos)
    expect(info).toBeUndefined()
  })
})
