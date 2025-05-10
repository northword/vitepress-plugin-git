import type { GitContributorInfo } from '../../shared'
import type { MergedRawCommit, RawCommit } from '../typings'
import { basename, dirname } from 'node:path'
import { logger } from './logger'
import { run } from './process'

/**
 * This regular expression is used to match and parse commit messages that contain multiple author information.
 *
 * @see {@link https://regex101.com/r/q5YB8m/1 | Regexp demo}
 * @see {@link https://en.wikipedia.org/wiki/Email_address#Local-part | Email address}
 * @see {@link https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors | Creating a commit with multiple authors in GitHub}
 */
const RE_CO_AUTHOR = /^ *Co-authored-by: ?([^<]*)<([^>]*)> */gim

function getCoAuthorsFromCommitBody(body: string): Pick<GitContributorInfo, 'email' | 'name'>[] {
  return body
    ? Array.from(body.matchAll(RE_CO_AUTHOR)).map(([, name, email]) => ({
        name: name.trim(),
        email: email.trim(),
      }))
    : []
}

/**
 * Get raw commits for a specific file
 *
 */
export async function getRawCommits(filepath: string): Promise<RawCommit[]> {
  const fileDir = dirname(filepath)
  const fileName = basename(filepath)

  const INFO_SPLITTER = '[|]'
  const COMMIT_SPLITTER = '[GIT_LOG_COMMIT_END]'

  /**
   * The format of git log.
   *
   * ${commit_hash} ${author_name} ${author_email} ${author_date} ${subject} ${ref} ${body}
   *
   * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
   *
   * Note: Make sure that `body` is in last position, as `\n` or `|` in body may breaks subsequent processing.
   *
   * @example stdout
   *
   * ```bash
   * $ git log --format="%H|%an|%ae|%ad|%s|%d|%b[GIT_LOG_COMMIT_END]" --follow docs/pages/en/integrations/index.md
   * 62ef7ed8f54ea1faeacf6f6c574df491814ec1b1|Neko Ayaka|neko@ayaka.moe|Wed Apr 24 14:24:44 2024 +0800|docs: fix english integrations list||Signed-off-by: Neko Ayaka <neko@ayaka.moe>
   * [GIT_LOG_COMMIT_END]
   * 34357cc0956db77d1fc597327ba880d7eebf67ce|Rizumu Ayaka|rizumu@ayaka.moe|Mon Apr 22 22:51:24 2024 +0800|release: pre-release v2.0.0-rc10| (tag: v2.0.0-rc10)|Signed-off-by: Rizumu Ayaka <rizumu@ayaka.moe>
   * [GIT_LOG_COMMIT_END]
   * (END)
   * ```
   */
  const format = ['%H', '%ad', '%an', '%ae', '%s', '%d', '%b'].join(INFO_SPLITTER)

  return await run(
    'git',
    [
      'log',
      '--max-count=-1',
      `--format=${format}${COMMIT_SPLITTER}`,
      '--date=unix',
      '--follow',
      '--',
      fileName,
    ],
    fileDir,
  )
    .then((stdout) => {
      return stdout
      // remove "[GIT_LOG_COMMIT_END]" in last line: split stdout into lines and avoid empty strings
        .substring(0, stdout.length - COMMIT_SPLITTER.length - 1)
        .split(`${COMMIT_SPLITTER}\n`)
        .filter(Boolean)
        .map((rawString) => {
          const [
            hash,
            time,
            author = '',
            email = '',
            message = '',
            refs = '',
            body = '',
          ] = rawString.split(INFO_SPLITTER).map(v => v.trim())

          return {
            filepath,
            hash,
            time: Number.parseInt(time, 10) * 1000,
            message,
            body,
            refs,
            author,
            email,
            coAuthors: getCoAuthorsFromCommitBody(body),
          }
        })
    })
    .catch((error) => {
      logger.error(`Failed to get commits for ${fileName} in ${fileDir}: ${error}`)
      return []
    })
}

export function mergeRawCommits(commits: RawCommit[]): MergedRawCommit[] {
  const commitMap = new Map<string, MergedRawCommit>()

  commits.forEach(({ filepath, ...commit }) => {
    const _commit = commitMap.get(commit.hash)

    if (_commit)
      _commit.filepaths.push(filepath)
    else commitMap.set(commit.hash, { ...commit, filepaths: [filepath] })
  })

  const result = Array.from(commitMap.values())
  return result
}

export async function getCommits(filepaths: string[]): Promise<MergedRawCommit[]> {
  const rawCommits = (
    await Promise.all(
      filepaths.map(filepath => getRawCommits(filepath)),
    )
  ).flat()

  return mergeRawCommits(rawCommits).sort((a, b) => b.time - a.time)
}
