import type { PageData, TransformPageContext } from 'vitepress'
import type { GitTransfomerOptions } from './options'
import fs from 'node:fs'
import path from 'node:path'
import { getGitOptions } from './options'
import { resolveChangelog } from './resolveChangelog'
import { resolveContributors } from './resolveContributors'
import { getCommits } from './utils'

export async function GitPageDataTransfromer(
  page: PageData,
  context: TransformPageContext,
  options: GitTransfomerOptions = getGitOptions(),
) {
  // Init the page.git as an empty object,
  // if one feature is enabled, we add the property to the page.git,
  // else it's undefined
  page.git = {}

  // check if the page should be filtered
  const { filter } = options
  if (filter && !filter(page))
    return

  // check if the page enabled features
  const { contributors = true, changelog = true, createdTime = true, updatedTime = true } = options.features ?? {}
  const { frontmatter } = page
  const isEnableChangelog = frontmatter.changelog ?? changelog
  const isEnableContributors = frontmatter.contributors ?? contributors
  const isEnableCreatedTime = createdTime
  const isEnableUpdatedTime = updatedTime
  if (!(isEnableChangelog || isEnableContributors || isEnableCreatedTime || isEnableUpdatedTime))
    return

  // process the extra included files
  const srcDir = context.siteConfig.srcDir
  const filepath = path.join(srcDir, page.filePath)
  const pageDir = path.dirname(filepath)

  const extraPaths: string[] = [
    ...page.frontmatter.gitInclude as string[] ?? [],
    ...(options.include ? options.include(page) : []),
  ]
    .flatMap((p) => {
      if (p === '$DIR/*') {
        return fs.readdirSync(pageDir)
          .filter(name => name !== path.basename(filepath))
          .map(name => path.join(pageDir, name))
          .filter(fullPath => fs.statSync(fullPath).isFile())
      }
      return path.join(pageDir, p)
    })

  // Collect the raw commits for this page
  const commits = await getCommits([filepath, ...extraPaths])

  if (commits.length === 0) {
    page.git = {
      createdTime: -1,
      updatedTime: -1,
      contributors: [],
      changelog: [],
    }
    return
  }

  if (isEnableCreatedTime) {
    page.git.createdTime = commits[commits.length - 1]?.time ?? -1
  }

  if (isEnableUpdatedTime) {
    page.git.updatedTime = commits[0]?.time ?? -1
  }

  const contributorsOptions = options.contributors ?? {}
  const changelogOptions = options.changelog ?? {}

  if (isEnableContributors) {
    page.git.contributors = resolveContributors(
      commits,
      contributorsOptions,
      Array.isArray(frontmatter.contributors)
        ? frontmatter.contributors
        : [],
    )
  }

  if (isEnableChangelog) {
    page.git.changelog = resolveChangelog(
      commits,
      changelogOptions,
      contributorsOptions.info ?? [],
    )
  }

  return page
}
