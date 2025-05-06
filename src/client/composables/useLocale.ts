import type { ComputedRef } from 'vue'
import type { GitLocaleData, GitLocales } from '../locales'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { defaultLocaleInfo } from '../locales'

export function useLocale(): ComputedRef<GitLocaleData> {
  const { lang } = useData()

  return computed(() => {
    const fallbackLang = lang.value.split('-')[0]
    const defaultLocale = defaultLocaleInfo[lang.value]
      || defaultLocaleInfo[fallbackLang]
      || defaultLocaleInfo.en

    // todo: get override from vue inject options
    const overrides: GitLocales = {}
    const overrideLocale = overrides[lang.value] || {}

    return { ...defaultLocale, ...overrideLocale }
  })
}
