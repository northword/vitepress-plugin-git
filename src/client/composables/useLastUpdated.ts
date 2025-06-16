import type { ComputedRef } from 'vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

export interface LastUpdated {
  /**
   * The date object of the last updated time
   */
  date: Date
  /**
   * The ISO string of the last updated time
   */
  iso: string
  /**
   * The formatted text of the last updated time
   */
  text: string
  /**
   * The locale of the last updated time
   */
  locale: string
}

export function useLastUpdated(): ComputedRef<LastUpdated> {
  const { lang, page } = useData()

  return computed(() => {
    const timeStamp = page.value.git.updatedTime
      ?? page.value.git.changelog?.[0].time
      ?? new Date()

    const date = new Date(timeStamp)

    const text = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(timeStamp)

    return {
      date,
      text,
      iso: date.toISOString(),
      locale: 'locale.value.latestUpdateAt',
    }
  })
}
