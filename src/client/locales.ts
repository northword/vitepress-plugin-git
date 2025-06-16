import type { GitLocaleData, GitLocales } from '../shared'

export const defaultLocaleEn: GitLocaleData = {
  contributors: 'Contributors',
  changelog: 'Changelog',
  noContributors: 'No contributors',
  timeOn: 'on',
  viewChangelog: 'View All Changelog',
  latestUpdateAt: 'Last Updated:',
  noChangelog: 'No Changelog',
}

export const defaultLocaleZh: GitLocaleData = {
  contributors: '贡献者',
  changelog: '更新日志',
  noContributors: '暂无贡献者',
  timeOn: '于',
  viewChangelog: '查看所有更新日志',
  latestUpdateAt: '最近更新：',
  noChangelog: '暂无变更日志',
}

export const defaultLocaleZhHant: GitLocaleData = {
  contributors: '貢獻者',
  changelog: '更新日誌',
  noContributors: '暂无贡献者',
  timeOn: '於',
  viewChangelog: '查看所有更新日誌',
  latestUpdateAt: '最近更新：',
  noChangelog: '暂无更新日誌',
}

export const defaultLocaleInfo: GitLocales = {
  'en': defaultLocaleEn,
  'en-US': defaultLocaleEn,
  'zh': defaultLocaleZh,
  'zh-CN': defaultLocaleZh,
  'zh-Hans': defaultLocaleZh,
}
