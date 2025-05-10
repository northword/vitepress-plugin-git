export function getUserNameWithNoreplyEmail(email: string): string | undefined {
  return email.endsWith('@users.noreply.github.com')
    ? email.replace('@users.noreply.github.com', '').split('+')[1]
    : undefined
}
