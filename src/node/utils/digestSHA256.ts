import { createHash } from 'node:crypto'

export function digestSHA256(message: string): string {
  const hash = createHash('sha256')
  hash.update(message)

  return hash.digest('hex')
}
