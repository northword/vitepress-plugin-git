import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import { GitInfo } from 'vitepress-plugin-git/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import 'virtual:group-icons.css'
import '@shikijs/vitepress-twoslash/style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(GitInfo),
    })
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
  },
}
