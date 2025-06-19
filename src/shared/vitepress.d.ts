import type { PageData as _PageData } from 'vitepress/client'
import type { GitData, GitFrontmatter } from './data'

// import 'vitepress'

declare module 'vitepress' {
  // interface PageData extends GitPageData, _PageData {}
  interface PageData extends Omit<_PageData, 'frontmatter'> {
    git: GitData
    frontmatter: GitFrontmatter
  }
}

export {}
