import type { ComputedRef } from 'vue'
import type { GitChangelogInfo } from '../../shared'
import { useData } from 'vitepress'
import { computed } from 'vue'

export interface GitChangelogItem extends GitChangelogInfo {
  date: string
}

// const RE_ISSUE = /#(\d+)/g

export function useChangelog(): ComputedRef<GitChangelogItem[]> {
  const { lang, page } = useData()

  return computed(() => {
    if (!page.value.git.changelog)
      return []

    const formatter = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
    })

    return (page.value.git?.changelog ?? []).map((item) => {
      const res: GitChangelogItem = {
        date: formatter.format(item.time),
        ...item,
      }

      return res
    })
  })
}
