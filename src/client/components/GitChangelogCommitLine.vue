<script setup lang="ts">
import type { GitChangelogItem } from '../composables/useChangelog'
import { useLocale } from '../composables'

defineProps<{
  item: GitChangelogItem
}>()

const locale = useLocale()
</script>

<template>
  <div class="vp-changelog-item-commit">
    <component
      :is="item.commitUrl ? 'a' : 'span'"
      class="vp-changelog-hash"
      :href="item.commitUrl"
      target="_blank"
      rel="noreferrer"
    >
      <code>{{ item.hash.slice(0, 7) }}</code>
    </component>
    <span class="vp-changelog-divider">-</span>
    <span class="vp-changelog-message" v-html="item.message" />
    <span class="vp-changelog-date" data-allow-mismatch>
      {{ locale.timeOn }}
      <time :datetime="new Date(item.time).toISOString()">{{ item.date }}</time>
    </span>
  </div>
</template>

<style>
.vp-changelog-item-commit::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  background-color: currentcolor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m3-9v6m0 6v6'/%3E%3C/svg%3E") no-repeat;
  mask-size: 100% 100%;
}

.vp-changelog-hash {
  margin-inline-end: 4px;
}

.vp-changelog-divider {
  margin-inline-end: 8px;
}

.vp-changelog-message {
  margin-inline-end: 8px;
  line-height: 1.7;
}

.vp-changelog-date {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}
</style>
