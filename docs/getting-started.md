# 快速开始

`vitepress-plugin-git` 插件可以为 VitePress 页面自动添加 Git 信息，例如贡献者、更新时间和变更记录。这对于文档协作编辑非常实用。

本页将指导你如何在项目中集成该插件。

## 安装插件

你可以通过以下任意一种包管理工具将插件添加到项目依赖中：

::: code-group

```sh [npm]
npm install vitepress-plugin-git
````

```sh [yarn]
yarn add vitepress-plugin-git
```

```sh [pnpm]
pnpm add vitepress-plugin-git
```

```sh [bun]
bun add vitepress-plugin-git
```

:::

## 集成插件

插件的集成分为三个部分：

1. **添加 Vite 插件**（用于收集配置信息）
2. **添加 `transformPageData`**（将 Git 数据注入页面）
3. **添加 UI 组件**（展示贡献者和更新时间等信息）

### 步骤 1 & 2：添加 Vite 插件和 `transformPageData`

在你的 VitePress 配置文件（`.vitepress/config.ts`）中，添加以下内容：

```typescript twoslash
import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer, GitPluginForVite } from 'vitepress-plugin-git' // [!code ++]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { // [!code ++]
    plugins: [ // [!code ++]
      GitPluginForVite(), // [!code ++]
    ], // [!code ++]
  }, // [!code ++]
  async transformPageData(pageData, ctx) { // [!code ++]
    await GitPageDataTransfromer(pageData, ctx)// [!code ++]
  }, // [!code ++]
  // rest of the options...
})
```

### 步骤3. 添加 UI 组件

为了在页面中显示 Git 信息，你需要将插件提供的 `GitInfo` 组件插入到页面底部。

在 VitePress 主题配置文件（`.vitepress/theme/index.ts`）中，添加以下内容：

```typescript twoslash
import { GitInfo } from 'vitepress-plugin-git/client' // [!code ++]
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(GitInfo), // [!code ++]
    })
  },
}
```

至此，你已经完成插件的基本集成。接下来你可以：

- 配置更多选项（筛选页面、去除重复贡献者信息、设置组件样式等） -> 详见 [插件配置指南](./options.md)
- 二次开发（自定义 UI、使用自己的组件替代默认组件、在自定义主题中集成本插件等）-> 详见 [二次开发](./secondary-development.md)
