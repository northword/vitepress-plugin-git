// vitepress-extension.d.ts

interface GitData {
  changelog?: Commit[]
  contributors?: Author[]
  createdTime?: number
  updatedTime?: number
  locale?: GitLocaleData
}

declare module 'vitepress' {
  interface PageData {
    git: GitData
    frontmatter: {
      contributors: boolean
      changelog: boolean
      gitInclude: string[]
    }

  }
}

export {}
