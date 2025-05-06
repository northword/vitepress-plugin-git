import type { Buffer } from 'node:buffer'
import type { GitContributorInfo } from '../../shared'
import type { MergedRawCommit, RawCommit } from '../typings'
import { spawn } from 'node:child_process'
import { logger } from './logger'

const INFO_SPLITTER = '[|]'
const COMMIT_SPLITTER = '\\|/'
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
 * Helper function to run git command using spawn and return stdout as a promise.
 * Rejects if the git command exits with a non-zero code.
 */
function runGitLog(args: string[], cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const gitProcess = spawn('git', ['log', ...args], {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdoutData = ''
    let stderrData = ''

    gitProcess.stdout.on('data', (chunk: Buffer) => {
      stdoutData += chunk.toString('utf8')
    })

    gitProcess.stderr.on('data', (chunk: Buffer) => {
      stderrData += chunk.toString('utf8')
    })

    gitProcess.on('error', (error) => {
      reject(new Error(`Failed to spawn 'git log': ${error.message}`))
    })

    gitProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData)
      }
      else {
        reject(
          new Error(
            `'git log' failed with exit code ${code}: ${stderrData.trim()}`,
          ),
        )
      }
    })
  })
}

/**
 * Get raw commits for a specific file
 *
 * ${commit_hash} ${author_name} ${author_email} ${author_date} ${subject} ${ref} ${body}
 *
 * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
 */
export async function getRawCommits(filepath: string, cwd: string): Promise<RawCommit[]> {
  const format = ['%H', '%ad', '%an', '%ae', '%b', '%s', '%d'].join(INFO_SPLITTER)

  try {
    const stdout = await runGitLog(
      [
        '--max-count=-1',
        `--format=${format}${COMMIT_SPLITTER}`,
        '--date=unix',
        '--follow',
        '--',
        filepath,
      ],
      cwd,
    )

    return stdout
      .substring(0, stdout.length - COMMIT_SPLITTER.length - 1)
      .split(`${COMMIT_SPLITTER}\n`)
      .filter(Boolean)
      .map((rawString) => {
        const [
          hash,
          time,
          author = '',
          email = '',
          body = '',
          message = '',
          refs = '',
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
  }
  catch (error) {
    logger.error(`Failed to get commits for ${filepath} in ${cwd}: ${error}`)

    return []
  }
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

export async function getCommits(filepaths: string[], cwd: string): Promise<MergedRawCommit[]> {
  const rawCommits = (
    await Promise.all(
      filepaths.map(filepath => getRawCommits(filepath, cwd)),
    )
  ).flat()

  return mergeRawCommits(rawCommits).sort((a, b) => b.time - a.time)
}
