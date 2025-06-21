import type { ComputedRef } from 'vue'
import type { GitContributorData } from '../../shared'
import { useData } from 'vitepress'
import { computed } from 'vue'

interface ReturnType {
  contributors: ComputedRef<GitContributorData[]>
  getContributor: (name: string) => GitContributorData
  getContributors: (names: string[]) => GitContributorData[]
}

export function useContributors(): ReturnType {
  const { page } = useData()

  const contributors = computed(() => {
    return (page.value.git.contributors ?? []).toSorted((a, b) => b.commits - a.commits)
  })

  function getContributor(name: string): GitContributorData {
    return contributors.value.find(c => c.name === name) ?? { name, email: '', commits: 1 }
  }

  function getContributors(names: string[]): GitContributorData[] {
    return names.map(getContributor)
  }

  return { contributors, getContributor, getContributors }
}
