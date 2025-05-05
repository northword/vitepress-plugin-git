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

      // if (pattern.issue && repo) {
      //   res.message = res.message.replace(
      //     RE_ISSUE,
      //     (matched, issue: string) => {
      //       const url = pattern
      //         .issue!.replace(':issue', issue)
      //         .replace(':repo', repo)
      //       return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`
      //     },
      //   )
      // }

      // if (pattern.commit && repo) {
      //   res.commitUrl = pattern.commit
      //     .replace(':hash', res.hash)
      //     .replace(':repo', repo)
      // }

      // if (pattern.tag && repo && res.tag)
      //   res.tagUrl = pattern.tag
      //     .replace(':tag', res.tag)
      //     .replace(':repo', repo)

      return res
    })
  })
}
