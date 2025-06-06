import type { ExecSyncOptionsWithStringEncoding } from 'node:child_process' // Import native execSync
import type { KnownGitProvider } from '../../shared'
import { execSync } from 'node:child_process'

/**
 * Gets the URL of a Git remote.
 *
 * @param cwd The directory where the git commands should be executed.
 */
export function getRemoteUrl(cwd: string): string | null {
  const execOptions: ExecSyncOptionsWithStringEncoding = {
    cwd,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
    // prevent hanging
    timeout: 5000,
  }

  try {
    const originUrl = execSync('git remote get-url origin', execOptions)

    return originUrl.trim()
  }
  catch {
    try {
      const remotesOutput = execSync('git remote', execOptions)
      const firstRemote = remotesOutput.split('\n')[0]?.trim()

      if (firstRemote) {
        const remoteUrl = execSync(
          `git remote get-url ${firstRemote}`,
          execOptions,
        )

        return remoteUrl.trim()
      }

      return null
    }
    catch {
      return null
    }
  }
}

export function inferGitProvider(cwd: string): KnownGitProvider | null {
  const remoteUrl = getRemoteUrl(cwd)

  if (!remoteUrl)
    return null

  if (remoteUrl.includes('github.com')) {
    return 'github'
  }

  if (remoteUrl.includes('gitlab.com')) {
    return 'gitlab'
  }

  if (remoteUrl.includes('gitee.com')) {
    return 'gitee'
  }

  if (remoteUrl.includes('bitbucket.org')) {
    return 'bitbucket'
  }

  return null
}
