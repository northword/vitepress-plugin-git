import { defineConfig } from 'vitepress'
import { GitPageData } from 'vitepress-plugin-git'

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
        link: '/example',
      },
    ],

  },
  vite: {
    plugins: [
      // Inspect(),
    ],
  },

  async transformPageData(pageData, ctx) {
    await GitPageData(pageData, ctx, {})
  },
})
