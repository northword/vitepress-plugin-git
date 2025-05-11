export interface GitLocaleData {
  /**
   * Contributors title
   */
  contributors: string

  /**
   * Changelog title
   */
  changelog: string

  noContributors: string

  /**
   * Word to represent a commit "on" a time
   */
  timeOn: string

  /**
   * Changelog button
   */
  viewChangelog: string

  /**
   * Latest updated
   */
  latestUpdateAt: string
}

export type GitLocales = Record<string, GitLocaleData>

export const defaultLocaleEn: GitLocaleData = {
  contributors: 'Contributors',
  changelog: 'Changelog',
  noContributors: 'No contributors',
  timeOn: 'on',
  viewChangelog: 'View All Changelog',
  latestUpdateAt: 'Last Updated:',
}

export const defaultLocaleZh: GitLocaleData = {
  contributors: '贡献者',
  changelog: '更新日志',
  noContributors: '暂无贡献者',
  timeOn: '于',
  viewChangelog: '查看所有更新日志',
  latestUpdateAt: '最近更新：',
}

export const defaultLocaleZhHant: GitLocaleData = {
  contributors: '貢獻者',
  changelog: '更新日誌',
  noContributors: '暂无贡献者',
  timeOn: '於',
  viewChangelog: '查看所有更新日誌',
  latestUpdateAt: '最近更新：',
}

export const defaultLocaleInfo: GitLocales = {
  'en': defaultLocaleEn,
  'en-US': defaultLocaleEn,
  'zh': defaultLocaleZh,
  'zh-CN': defaultLocaleZh,
  'zh-Hans': defaultLocaleZh,
}
