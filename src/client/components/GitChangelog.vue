<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useChangelog, useLastUpdated, useLocale } from '../composables'
import { useTimeAgoIntl } from '../composables/useTimeAgoIntl'
import { gitClientOptions } from '../options'
import GitChangelogCommitLine from './GitChangelogCommitLine.vue'
import GitChangelogTagLine from './GitChangelogTagLine.vue'
import VerticalTransition from './VerticalTransition.vue'
import VPHeader from './VPHeader.vue'

const changelog = useChangelog()
const lastUpdated = useLastUpdated()
const timeAgo = useTimeAgoIntl(lastUpdated.value.date, { insertSpace: true })
const locale = useLocale()
const [active, toggleActive] = useToggle()
</script>

<template>
  <VPHeader
    v-if="!gitClientOptions.changelog?.hideHeader"
    anchor="doc-changelog"
    :text="locale.changelog"
  />

  <div v-if="changelog.length" class="vp-changelog-wrapper" :class="{ active }">
    <div class="vp-changelog-header" @click="toggleActive()">
      <div class="vp-latest-updated">
        <span class="vp-changelog-icon" />
        <span data-allow-mismatch>{{ locale.latestUpdateAt }} {{ gitClientOptions.changelog?.relativeTime ? timeAgo : lastUpdated?.text }}</span>
      </div>
      <div class="vp-changelog-show-more">
        <span class="vp-changelog-menu-icon" />
        <span>{{ locale.viewChangelog }}</span>
      </div>
    </div>

    <VerticalTransition name="changelog-expand">
      <div v-show="active" class="vp-changelog-list">
        <template v-for="item in changelog" :key="item.hash">
          <GitChangelogTagLine v-if="item.tag" :item="item" />
          <GitChangelogCommitLine v-else :item="item" />
        </template>
      </div>
    </VerticalTransition>
  </div>

  <div v-else-if="!gitClientOptions.changelog?.hideEmptyText" class="vp-changelog-empty">
    <p>{{ locale.noChangelog }}</p>
  </div>
</template>

<style>
.vp-changelog-wrapper {
  margin-block: 1rem;
  padding-inline: 1rem;
  border-radius: 8px;
  background-color: var(--vp-custom-block-details-bg);
  font-size: 0.875rem;
  line-height: 1.7;
}

.vp-changelog-wrapper.active {
  padding-block: 0 0.5rem;
}

.vp-changelog-wrapper a {
  text-decoration: none !important;
}

.vp-changelog-wrapper a::after {
  display: none !important;
}

.vp-changelog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--vp-custom-block-details-text);
  font-size: var(--vp-custom-block-font-size);
}

.vp-changelog-header:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 419px) {
  .vp-changelog-show-more {
    display: none;
  }
}

.vp-changelog-icon,
.vp-changelog-menu-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
  margin-inline-end: 0.5rem;
  background-color: currentcolor;
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  transform: translateY(-1px);
}

.vp-changelog-icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' d='M2.71 10.96a6.5 6.5 0 1 0-.69-3.53M2 8l1.5-1.5M2 8L.5 6.5m8 2v-4m0 4h3'/%3E%3C/svg%3E");
}

.vp-changelog-menu-icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M4 5h0.01'/%3E%3Cpath d='M8 5h12'/%3E%3Cpath d='M4 10h0.01'/%3E%3Cpath d='M8 10h12'/%3E%3Cpath d='M4 15h0.01'/%3E%3Cpath d='M8 15h12'/%3E%3Cpath d='M4 20h0.01'/%3E%3Cpath d='M8 20h12'/%3E%3C/g%3E%3C/svg%3E");
}

.vp-changelog-list {
  list-style: none;
  margin-block: 0.5rem;
  padding-inline-start: 0;
  overflow: hidden;
}
</style>
