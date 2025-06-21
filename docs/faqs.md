# 常见问题

## 何时生成 Git 页面历史信息？配置部署工具与 CI/CD

::: tip 什么是 CI/CD？

通常使用基于 Git 的页面历史插件的文档都会使用 [GitHub Actions](https://github.com/features/actions) 或者 [GitLab 的 CI/CD Pipelines](https://docs.gitlab.com/ee/ci/yaml/) 在推送文档变更提交之后自动化在云端构建文档，而不是在需要构建的时候指引用户手动执行命令并且进行复杂的构建流程。你可以在 VitePress 官方的 [Platform Guides - VitePress](https://vitepress.dev/guide/deploy#platform-guides) 文档中阅读有关的更多信息。

像是 [GitHub Actions](https://github.com/features/actions) 和 [GitLab 的 CI/CD Pipelines](https://docs.gitlab.com/ee/ci/yaml/) 这样的与提交相关且具备自动化构建的工具，就是「[CI/CD（持续集成/持续部署](https://zh.wikipedia.org/wiki/CI/CD)）」中的 [CD（Continuous Deployment）](https://zh.wikipedia.org/wiki/%E6%8C%81%E7%BA%8C%E9%83%A8%E7%BD%B2)的一环。

当然上面列举的两大 Git 代码托管平台所自带的 CI/CD 能力只是冰山一角，事实上市面上也有其他的工具可以参考：

- [Netlify 的构建 hook](https://docs.netlify.com/configure-builds/build-hooks/)
- [Cloudflare Pages 的 Git 集成](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Vercel 的 GitHub 集成](https://vercel.com/docs/deployments/git/vercel-for-github)
- [CircleCI](https://circleci.com/)

上述平台和能力都是 CI/CD 的体现，他们允许用户在推送文档之后自动根据预先配置的命令和文档处理流水线进行静态网站的生成。

CI/CD 会运行在一个独立的服务器环境中，所有的构建流程，构建命令，还有环境都是在独立的、可复现的环境中进行的。

每当我们通过 `git` 命令或者 Git 客户端提交文档更新，或者提交的文档修改的 Pull Request 合并的时候，将会产生一个「commit（提交）」事件，一般 CI/CD 会根据这样的「commit」事件生成一个与所触发构建的「commit」相关的构建环境。

:::

CI/CD 与 Git 提交相关，而基于 Git 的页面历史又依赖于 Git 提交，所以在使用 CI/CD 这样的工具的时候，我们需要在使用之前进行检查和配置以确保 Git 日志的获取是全量或者定量的，否则将会出现没有办法正确获取 Git 日志的情况。

### 在 [GitHub Actions](https://github.com/features/actions) 上进行构建

在与 Github Actions 一同使用的时候，我们只需要在 `actions/checkout` 的 `with` 参数中添加 `fetch-depth: 0` 的配置就可以确保在 CI/CD 环境中获取的 Git 日志是包含全部信息的了：

```yaml
name: Build Docs

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: 拉取代码 # [!code focus]
        uses: actions/checkout@v4 # [!code focus]
        with: # [!code focus]
          fetch-depth: 0 # [!code focus]

      # ... 其他的步骤
```

### 在 Netlify 上进行构建

Netlify 默认情况在 CI/CD 构建期间是能获取到全部 Git 日志的。

### 在 Cloudflare Pages 上进行构建

Cloudflare Pages 自带的 CI/CD 流水线功能内部是不包含全部 Git 日志信息的，唯一的解决办法是先在 GitHub Actions 或者 GitLab CI/CD Pipelines 的受控环境中进行构建，然后再通过 Cloudflare 官方的 [`wrangler`](https://developers.cloudflare.com/workers/wrangler/install-and-update/) 工具部署构建产物。

比如参考使用 Cloudflare 官方维护的 GitHub Actions 插件 [`pages-action`](https://github.com/cloudflare/pages-action) 搭配在[在 GitHub Actions 上进行构建](#在-github-actions-上进行构建) 所介绍的 `fetch-depth: 0` 参数配置即可实现获取 Git 日志的能力。

### 在 Vercel 上进行构建

在 Vercel 自带的 CI/CD 环境中，默认情况下是无法获取到全部 Git 日志信息的[^1]，通过设置环境变量 `VERCEL_DEEP_CLONE=true` 可以获取完整的 Git 提交信息。*需要注意的是这个环境变量不是稳定的公开 API，将在未来某个时间删除[^2]。*

还有一个更稳定但是稍复杂的解决的办法是先在 GitHub Actions 或者 GitLab CI/CD Pipelines 的受控环境中进行构建，然后再通过 Vercel 官方的 [`vercel` CLI 工具](https://vercel.com/docs/cli)进行部署。

## 错误排查

### 遭遇了 `Cannot find module ... or its corresponding type declarations` 错误？

<!--@include: @/pages/zh-CN/snippets/troubleshooting-cannot-find-module.md-->

[^1]: [Access git logs in build process · vercel/vercel · Discussion #4101](https://github.com/vercel/vercel/discussions/4101)

[^2]: [To tell Vercel to deep clone by setting an env var to VERCEL_DEEP_CLONE=1 · vercel/turborepo · Discussion #800](https://github.com/vercel/turborepo/discussions/800#discussioncomment-2730849)
