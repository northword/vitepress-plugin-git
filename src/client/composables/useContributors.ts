import type { ComputedRef } from 'vue'
import type { GitContributorInfo } from '../../shared'
import { useData } from 'vitepress'
import { computed } from 'vue'

export function useContributors(): ComputedRef<GitContributorInfo[]> {
  const { page } = useData()

  return computed(() => {
    if (!page.value.git.contributors)
      return []

    return page.value.git.contributors
  })
}
