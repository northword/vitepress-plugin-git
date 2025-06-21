<script setup lang="ts">
import type { GitChangelogItem } from '../composables/useChangelog'
import { useContributors, useLocale } from '../composables'
import Authors from './Authors.vue'

const props = defineProps<{
  item: GitChangelogItem
  inlineAuthors?: boolean
  numCommitHashLetters?: number
}>()

const locale = useLocale()
const { getContributors } = useContributors()

const authors = [props.item.author, ...props.item.coAuthors?.map(c => c.name) ?? []]
</script>

<template>
  <span class="vp-changelog-icon" />
  <div class="vp-changelog-item-commit">
    <component
      :is="item.commitUrl ? 'a' : 'span'"
      class="vp-changelog-hash"
      :href="item.commitUrl"
      target="_blank"
      rel="noreferrer"
    >
      <code>{{ item.hash.slice(0, numCommitHashLetters) }}</code>
    </component>
    <span class="vp-changelog-divider">-</span>
    <span class="vp-changelog-details">
      <span class="vp-changelog-message" v-html="item.message" />
      <Authors v-if="inlineAuthors" class="vp-changelog-inline-contributors" :authors="getContributors(authors)" mode="inline" />
      <span class="vp-changelog-date" data-allow-mismatch>
        {{ locale.timeOn }}
        <time :datetime="new Date(item.time).toISOString()">{{ item.date }}</time>
      </span>
    </span>
  </div>
</template>

<style scoped>
.vp-changelog-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1.75rem;
  height: 1.25rem;
  flex-shrink: 0;
  background-color: currentcolor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m3-9v6m0 6v6'/%3E%3C/svg%3E") no-repeat;
  mask-size: 100% 100%;
  opacity: 30%;
}

.vp-changelog-item-commit {
  display: flex;
  gap: 0.25rem;
}

.vp-changelog-details > * {
  margin-inline-end: 0.5rem;
}
.vp-changelog-details {

  align-items: center;
  vertical-align: baseline;
}

.vp-changelog-date {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}
</style>
