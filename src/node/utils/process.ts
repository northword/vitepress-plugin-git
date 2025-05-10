import type { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'

/**
 * Helper function to run git command using spawn and return stdout as a promise.
 * Rejects if the git command exits with a non-zero code.
 */
export function run(cmd: string, args: string[], cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const gitProcess = spawn(cmd, args, {
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
      reject(new Error(`Failed to spawn '${cmd}': ${error.message}`))
    })

    gitProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData)
      }
      else {
        reject(
          new Error(
            `Run '${cmd}' failed with exit code ${code}: ${stderrData.trim()}`,
          ),
        )
      }
    })
  })
}
