import { useNow } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed } from 'vue'

export interface UseTimeAgoIntlOptions {
  /**
   * The options for the formatter
   * @default { numeric: 'auto' }
   */
  formatOptions?: Intl.RelativeTimeFormatOptions

  insertSpace?: boolean

  /**
   * Update interval in milliseconds
   * @default 30_000
   */
  updateInterval?: number
}

export interface TimeAgoUnit {
  name: Intl.RelativeTimeFormatUnit
  ms: number
}

const UNITS: TimeAgoUnit[] = [
  { name: 'year', ms: 31536000000 },
  { name: 'month', ms: 2592000000 },
  { name: 'week', ms: 604800000 },
  { name: 'day', ms: 86400000 },
  { name: 'hour', ms: 3600000 },
  { name: 'minute', ms: 60000 },
  { name: 'second', ms: 1000 },
]

/**
 * A reactive wrapper for `Intl.RelativeTimeFormat`.
 */
export function useTimeAgoIntl(
  time: Date | number | string,
  options: UseTimeAgoIntlOptions = {},
) {
  const {
    formatOptions = { numeric: 'auto' },
    insertSpace = false,
    updateInterval = 30_000,
  } = options

  const { lang } = useData()
  const rtf = new Intl.RelativeTimeFormat(lang.value, formatOptions)
  const now = useNow({ interval: updateInterval, controls: false })

  return computed(() => {
    const from = new Date(time).getTime()
    const to = now.value.getTime()
    const diff = from - to
    const absDiff = Math.abs(diff)

    for (const { name, ms } of UNITS) {
      if (absDiff >= ms) {
        const parts = rtf.formatToParts(Math.round(diff / ms), name)
        return formateParts(parts, insertSpace)
      }
    }
    return rtf.format(0, 'second')
  })
}

export function formateParts(parts: Intl.RelativeTimeFormatPart[], insertSpace = false) {
  if (!insertSpace)
    return parts.map(part => part.value).join('')

  return parts
    .map(part => part.value.trim())
    .join(' ')
}
