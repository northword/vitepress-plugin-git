# 配置插件

## `features`

启用或关闭某些功能。

```typescript twoslash
import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer, GitPluginForVite } from 'vitepress-plugin-git'
// ---cut-before---
export default defineConfig({
  vite: {
    plugins: [
      GitPluginForVite({
        features: { // [!code ++]
          createdTime: false, // [!code ++]
          updatedTime: false, // [!code ++]
          contributors: true, // [!code ++]
          changelog: true // [!code ++]
        }, // [!code ++]
      }),
    ],
  },
})
```

## `filter`

决定哪些页面要附加 Git 信息。

## `include`

将其他文件的 Git 信息附加到此页面。返回其他文件的相对此文件的路径数组。

## `contributors`

### `contributirs.info` - 为贡献者添加数据映射

配置选项中的 `contributirs.info` 字段用于映射贡献者信息，可以用来将获取到的 Git 的日志信息中的包括名称和邮箱的贡献者信息映射为另一个贡献者。

如果我们假设有如下的 Git 日志：

```plaintext
commit 1
Author: John Doe <john.doe@example.com>
Date:   Fri Oct 1 12:00:00 2021 +0800

    Add a new feature

commit 2
Author: John Doe <john.doe@anothersite.com>

    Fix a bug
```

现在我们有两个来自同一个人的提交，只有电子邮件地址不同。在不进行任何配置的默认情况下，插件会将它们视为两个不同的贡献者。
这种情况通常是因为你或者其他贡献者更改了自己的电子邮件地址。

要解决这个问题，我们可以使用 `contributirs.info` 选项：

```typescript twoslash
import { defineConfig } from 'vitepress'
import { GitPageDataTransfromer, GitPluginForVite } from 'vitepress-plugin-git'
// ---cut-before---
export default defineConfig({
  vite: {
    plugins: [
      GitPluginForVite({
        contributors: { // [!code ++]
          info: [ // [!code ++]
            { // [!code ++]
              name: 'Northword', // [!code ++]
              username: 'northword', // [!code ++]
              // url: 'https://northword.cn', // [!code ++]
            }, // [!code ++]
          ], // [!code ++]
        } // [!code ++]
      }),
    ],
  },
})
```

这个选项支持以下类型：

```typescript
export interface ContributorInfo {
  /**
   * Contributor's username on the git hosting service
   *
   * 贡献者在 Git 托管服务中的用户名
   */
  username?: string

  /**
   * Contributor name displayed on the page, default is `username`
   *
   * 贡献者显示在页面上的名字，默认为 `username`
   */
  name?: string

  /**
   * The alias of the contributor,
   * Since contributors may have different usernames saved in their local git configuration
   * compared to their usernames on the hosting service, In this case, aliases can be used to
   * map to the actual usernames.
   *
   * 贡献者别名，由于贡献者可能在本地 git 配置中保存的 用户名与 托管服务 用户名不一致，
   * 这时候可以通过别名映射到真实的用户名
   */
  alias?: string[]

  /**
   * The primary email of the contributor
   *
   * 贡献者在 Git 托管服务中的主邮箱
   */
  email?: string

  /**
   * The alternative emails of the contributor on the Git hosting service,
   * or emails they have used in the past.
   *
   * 贡献者在 Git 托管服务中的备用邮箱，或者曾经使用过的邮箱
   */
  emailAlias?: string[]

  /**
   * The avatar url of the contributor.
   *
   * If the git hosting service is `github`, it can be ignored and left blank, as the plugin will automatically fill it in.
   *
   * 贡献者头像地址
   *
   * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
   */
  avatar?: string

  /**
   * The url of the contributor
   *
   * If the git hosting service is `github`, it can be ignored and left blank, as the plugin will automatically fill it in.
   *
   * 贡献者访问地址
   *
   * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
   */
  url?: string
}
```

## `changelog`

### `changelog.repoUrl`

Git 仓库的地址，默认地，插件将从主 Git 仓库的 `origin` 远程源解析仓库地址，如果你需要改变 Git 仓库的地址，如子模块里的文件等，此选项可能会有用。

## 全部选项

前文列出了一些常用的选项，插件还有一些其他选项，以满足你的需求。
