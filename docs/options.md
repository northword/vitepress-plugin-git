# 配置插件

## Contributors

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

//
