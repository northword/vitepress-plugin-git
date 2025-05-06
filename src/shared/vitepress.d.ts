import type { GitPageData } from './index'

declare module 'vitepress' {
  interface PageData extends GitPageData {}
}

export {}
