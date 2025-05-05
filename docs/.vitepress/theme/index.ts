import { GitInfo } from 'vitepress-plugin-git/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(GitInfo),
    })
  },
}
