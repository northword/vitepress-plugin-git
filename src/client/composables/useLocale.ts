import type { ComputedRef } from 'vue'
import type { GitLocaleData, GitLocales } from '../locales'
import { useData } from 'vitepress'
import { computed, inject } from 'vue'
import { defaultLocaleInfo } from '../locales'
import { gitInjectionKey } from '../options'

export function useLocale(): ComputedRef<GitLocaleData> {
  const options = inject(gitInjectionKey)
  const { lang } = useData()

  return computed(() => {
    const fallbackLang = lang.value.split('-')[0]
    const defaultLocale = defaultLocaleInfo[lang.value]
      || defaultLocaleInfo[fallbackLang]
      || defaultLocaleInfo.en

    const overrides: GitLocales = options?.locales ?? {}
    const overrideLocale = overrides[lang.value] ?? {}

    return { ...defaultLocale, ...overrideLocale }
  })
}
