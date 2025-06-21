import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer, GitPluginForVite } from 'vitepress-plugin-git'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitepress Plugin Git',
  description: '.',
  base: '/vitepress-plugin-git/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/northword/vitepress-plugin-git' },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'Config', link: '/options' },
              { text: 'Secondary Development', link: '/secondary-development' },
            ],
          },
          // {
          //   text: 'Example',
          //   items: [
          //     { text: 'Default', link: '/example/index' },
          //     { text: 'Disable Contributors', link: '/example/disable-contributors' },
          //     { text: 'Disable Changelog', link: '/example/disable-changelog' },
          //     { text: 'Chinese', link: '/example/lang-zh' },
          //   ],
          // },
        ],
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: '快速上手', link: '/getting-started' },
              { text: '设置插件', link: '/options' },
              { text: '二次开发', link: '/secondary-development' },
            ],
          },
        ],
      },
    },
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
    codeTransformers: [
      transformerTwoslash(),
    ],
  },

  vite: {
    plugins: [
      // Inspect(),
      GitPluginForVite({
        contributors: {
          info: [
            {
              name: 'Northword',
              username: 'northword',
              // url: 'https://northword.cn',
            },
          ],
          avatar: true,
        },
        changelog: {
          // repoUrl: 'https://github.com/northword/vitepress-plugin-git',
          relativeTime: true,
          inlineAuthors: true,
        },
        locales: {},
      }),

      groupIconVitePlugin(),
    ],
  },

  async transformPageData(pageData, ctx) {
    await GitPageDataTransfromer(pageData, ctx)
  },
})
