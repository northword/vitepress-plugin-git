import type { PageData, TransformPageContext } from 'vitepress'
import type { GitPluginOptions } from './options'
import path from 'node:path'
import process from 'node:process'
import { resolveChangelog } from './resolveChangelog'
import { resolveContributors } from './resolveContributors'
import { checkGitRepo, getCommits } from './utils'

export async function GitPageDataTransfromer(
  page: PageData,
  context: TransformPageContext,
  options: GitPluginOptions = {},
) {
  // Init the page.git as an empty object,
  // if one feature is enabled, we add the property to the page.git,
  // else it's undefined
  page.git = {}

  // check if the current directory is a git repository
  const cwd = process.cwd()
  const isGitRepoValid = checkGitRepo(cwd)
  // const gitProvider = isGitRepoValid ? inferGitProvider(cwd) : null
  if (!isGitRepoValid || page.filePath === null) {
    return
  }

  // check if the page should be filtered
  const { filter } = options
  if (filter && !filter(page))
    return

  // check if the page enabled features
  const { contributors = {}, changelog = {}, createdTime = true, updatedTime = true } = options
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
  const filePaths = [
    filepath,
    ...(page.frontmatter.gitInclude as string[] ?? []).map(item =>
      path.join(filepath, '..', item),
    ),
  ]

  // Collect the raw commits for this page
  const commits = await getCommits(filePaths, cwd)

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

  const contributorsOptions = typeof contributors === 'object' ? contributors : {}
  const changelogOptions = typeof changelog === 'object' ? changelog : {}

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
