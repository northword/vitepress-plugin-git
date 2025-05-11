import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer } from 'vitepress-plugin-git'

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
  vite: {
    plugins: [
      // Inspect(),
      // GitPlugin(),
    ],
  },

  async transformPageData(pageData, ctx) {
    await GitPageDataTransfromer(pageData, ctx, {
      contributors: {
        avatar: true,
      },
      changelog: {
        repoUrl: 'https://github.com/northword/vitepress-plugin-git',
      },
    })
  },
})
