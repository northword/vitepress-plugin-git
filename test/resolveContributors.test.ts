import type { GitContributorsNodeOptions, MergedRawCommit } from '../src'
import { describe, expect, it } from 'vitest'
import {
  getAvatar,
  getContributorsFromCommit,
  mergeContributors,
  normalizeContributor,
  resolveContributors,
} from '../src/node/resolveContributors'

describe('getContributorsFromCommit', () => {
  it('should extract authors and co-authors as contributors with commits = 1', () => {
    const commits: MergedRawCommit[] = [
      {
        filepaths: ['path/to/a'],
        hash: 'abcdefg',
        time: 1000,
        message: 'init',
        body: '',
        refs: '',
        author: 'Alice',
        email: 'alice@example.com',
        coAuthors: [{ name: 'Bob', email: 'bob@example.com' }],
      },
      {
        filepaths: ['path/to/a'],
        hash: 'abcdefg',
        time: 1000,
        message: 'init',
        body: '',
        refs: '',
        author: 'author3',
        email: 'author3@example.com',
        coAuthors: [],
      },
    ]
    const contributors = getContributorsFromCommit(commits)
    expect(contributors).toEqual([
      { name: 'Alice', email: 'alice@example.com', commits: 1 },
      { name: 'Bob', email: 'bob@example.com', commits: 1 },
      { name: 'author3', email: 'author3@example.com', commits: 1 },
    ])
  })
})

describe('getAvatar', () => {
  it('should return explicit avatar if present', () => {
    const contributor = { name: 'Alice', avatar: 'http://avatar.com/a.png' }
    expect(getAvatar(contributor)).toBe('http://avatar.com/a.png')
  })

  it('should return GitHub avatar if username present', () => {
    const contributor = { name: 'Bob', username: 'bobGH' }
    expect(getAvatar(contributor)).toBe('https://github.com/bobGH.png')
  })

  it('should return GitHub avatar with pattern if specified', () => {
    const contributor = { name: 'Bob', username: 'bobGH' }
    expect(getAvatar(contributor, 'https://cdn.avatar.com/:username.jpg'))
      .toBe('https://cdn.avatar.com/bobGH.jpg')
  })

  it('should return gravatar if email is available', () => {
    const contributor = { name: 'EmailUser', email: 'e@example.com' }
    expect(getAvatar(contributor)).toBe('https://gravatar.com/avatar/2457bafa74fb237eccdbaab2629da522182eee979409ff6568f27baa77ed5c10?d=retro')
  })

  it('should return empty string if no data is available', () => {
    expect(getAvatar({ name: 'Anonymous' })).toBe('')
  })
})

describe('normalizeContributor', () => {
  const fakeOptions = {
    info: [
      {
        name: 'Alice Real',
        username: 'aliceGH',
        email: 'alice@domain.com',
        avatar: 'http://avatar.com/alice.png',
        url: 'https://github.com/aliceGH',
      },
    ],
    avatar: true,
    avatarPattern: 'https://cdn.avatar.com/:username.png',
  }

  it('should match contributor with info and build full contributor object', () => {
    const raw = { name: 'Alice', email: 'alice@domain.com', commits: 2 }
    const result = normalizeContributor(raw, fakeOptions)

    expect(result).toEqual({
      name: 'Alice Real',
      username: 'aliceGH',
      email: 'alice@domain.com',
      avatar: 'http://avatar.com/alice.png',
      url: 'https://github.com/aliceGH',
      commits: 2,
    })
  })

  it('should fallback to noreply username and gravatar', () => {
    const raw = { name: 'NoReply', email: '1000+anon@users.noreply.github.com', commits: 1 }
    const result = normalizeContributor(raw, fakeOptions)

    expect(result).toEqual({
      name: 'NoReply',
      username: 'anon',
      email: '1000+anon@users.noreply.github.com',
      avatar: 'https://cdn.avatar.com/anon.png',
      url: 'https://github.com/anon',
      commits: 1,
    })
  })

  it('should handle empty info and fallback properly', () => {
    const raw = { name: 'Unknown', email: 'unknown@example.com', commits: 1 }
    const options = { info: [], avatar: true }
    const result = normalizeContributor(raw, options)

    expect(result).toEqual({
      name: 'Unknown',
      username: undefined,
      email: 'unknown@example.com',
      commits: 1,
      avatar: 'https://gravatar.com/avatar/1a4725f081613ebf8731b9dd1f089b50496ee6a8981a9f456121e4a802812ec9?d=retro',
      url: undefined,
    })
  })
})

describe('mergeContributors', () => {
  it('should merge contributors with the same name', () => {
    const list = [
      { name: 'Alice', email: 'a@example.com', commits: 1 },
      { name: 'Bob', email: 'b@example.com', commits: 2 },
      { name: 'Alice', email: 'a@example.com', commits: 3 },
    ]
    const result = mergeContributors(list)

    expect(result).toHaveLength(2)

    const alice = result.find(c => c.name === 'Alice')
    expect(alice?.commits).toBe(4)
  })

  it('should keep unique contributors if names differ', () => {
    const list = [
      { name: 'Alice', email: 'a@example.com', commits: 1 },
      { name: 'ALICE', email: 'a2@example.com', commits: 2 },
    ]
    const result = mergeContributors(list)
    expect(result).toHaveLength(2)
  })

  it('should return empty array if input is empty', () => {
    expect(mergeContributors([])).toEqual([])
  })
})

describe('resolveContributors', () => {
  it('should resolve contributors from commits and extra', () => {
    const commits: MergedRawCommit[] = [
      {
        filepaths: ['path/to/a'],
        hash: 'abcdefg',
        time: 1000,
        message: 'init',
        body: '',
        refs: '',
        author: 'Alice',
        email: 'alice@example.com',
        coAuthors: [{ name: 'Bob', email: 'bob@example.com' }],
      },
      {
        filepaths: ['path/to/a'],
        hash: 'abcdefg',
        time: 1000,
        message: 'init',
        body: '',
        refs: '',
        author: 'author3',
        email: 'author3@example.com',
        coAuthors: [],
      },
    ]
    const options: GitContributorsNodeOptions = {
      info: [],
      avatar: true,
      avatarPattern: 'https://cdn.avatar.com/:username.jpg',
    }

    const contributors = resolveContributors(commits, options, ['Bob'])

    expect(contributors).toEqual([
      {
        avatar: 'https://gravatar.com/avatar/ff8d9819fc0e12bf0d24892e45987e249a28dce836a85cad60e28eaaa8c6d976?d=retro',
        commits: 1,
        email: 'alice@example.com',
        name: 'Alice',
        url: undefined,
        username: undefined,
      },
      {
        avatar: 'https://gravatar.com/avatar/5ff860bf1190596c7188ab851db691f0f3169c453936e9e1eba2f9a47f7a0018?d=retro',
        commits: 2,
        email: 'bob@example.com',
        name: 'Bob',
        url: undefined,
        username: undefined,
      },
      {
        avatar: 'https://gravatar.com/avatar/20830c6b9067698f81d5e16ef8bcf2569db3c7674e1f4558d56cf93612c73b04?d=retro',
        commits: 1,
        email: 'author3@example.com',
        name: 'author3',
        url: undefined,
        username: undefined,
      },
    ])
  })
})
