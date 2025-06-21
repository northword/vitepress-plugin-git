import type { ComputedRef } from 'vue'
import type { GitChangelogData } from '../../shared'
import { useData } from 'vitepress'
import { computed } from 'vue'

export interface GitChangelogItem extends GitChangelogData {
  date: string
}

export function useChangelog(): ComputedRef<GitChangelogItem[]> {
  const { lang, page } = useData()

  return computed(() => {
    const changelog = page.value.git.changelog ?? []

    const formatter = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
    })

    return changelog
      .map((item) => {
        return {
          ...item,
          message: renderMarkdown(item.message),
          date: formatter.format(item.time),
        }
      })
      .filter((item, index) => {
        if (item.tag && (!changelog[index + 1] || changelog[index + 1]?.tag))
          return false
        return true
      })
  })
}

export function renderMarkdown(markdownText = '') {
  const htmlText = markdownText
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*)\*/g, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt=\'$1\' src=\'$2\' />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a class="no-icon" href=\'$2\'>$1</a>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n$/gm, '<br />')

  return htmlText.trim()
}
