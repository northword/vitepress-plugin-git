import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer, GitPluginForVite } from 'vitepress-plugin-git'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitepress Plugin Git',
  description: '.',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/northword/vitepress-plugin-git' },
    ],
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Example', link: '/example' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Features', link: '/features' },
        ],
      },
      {
        text: 'Example',
        items: [
          { text: 'Default', link: '/example/index' },
          { text: 'Disable Contributors', link: '/example/disable-contributors' },
          { text: 'Disable Changelog', link: '/example/disable-changelog' },
          { text: 'Chinese', link: '/example/lang-zh' },
        ],
      },
    ],

  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
    },
  },

  vite: {
    plugins: [
      // Inspect(),
      GitPluginForVite({
        contributors: {
          info: [],
          avatar: true,
        },
        changelog: {
          repoUrl: 'https://github.com/northword/vitepress-plugin-git',
          relativeTime: true,
          inlineAuthors: true,
        },
        locales: {},
      }),
    ],
  },

  async transformPageData(pageData, ctx) {
    await GitPageDataTransfromer(pageData, ctx)
  },
})
