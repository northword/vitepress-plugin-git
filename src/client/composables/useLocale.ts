import type { ComputedRef } from 'vue'
import type { GitLocaleData } from '../../shared'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { defaultLocaleInfo } from '../locales'
import { localesOptions as overrides } from '../options'

export function useLocale(): ComputedRef<GitLocaleData> {
  const { lang } = useData()

  return computed(() => {
    const fallbackLang = lang.value.split('-')[0]
    const defaultLocale = defaultLocaleInfo[lang.value]
      || defaultLocaleInfo[fallbackLang]
      || defaultLocaleInfo.en

    const overrideLocale = overrides[lang.value] ?? overrides[lang.value.split('-')[0]] ?? {}

    return { ...defaultLocale, ...overrideLocale }
  })
}
