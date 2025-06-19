<script setup lang="ts">
import type { GitChangelogItem } from '../composables/useChangelog'
import { useLocale } from '../composables'

defineProps<{
  item: GitChangelogItem
}>()

const locale = useLocale()
</script>

<template>
  <div class="vp-changelog-item-tag">
    <span class="vp-changelog-icon" />
    <a v-if="item.tagUrl" :href="item.tagUrl" class="vp-changelog-tag">
      <code>{{ item.tag }}</code>
    </a>
    <span v-else class="vp-changelog-tag">
      <code>{{ item.tag }}</code>
    </span>
    <span class="vp-changelog-date" data-allow-mismatch>
      {{ locale.timeOn }}
      <time :datetime="new Date(item.time).toISOString()">{{ item.date }}</time>
    </span>
  </div>
</template>

<style scoped>
.vp-changelog-icon {
  content: '';
  top: 3px;
  left: 0;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  background-color: currentcolor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0'/%3E%3Cpath d='M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3'/%3E%3C/g%3E%3C/svg%3E") no-repeat;
  mask-size: 100% 100%;
}

.vp-changelog-tag {
  margin-inline-end: 4px;
  text-decoration: none;
}

.vp-changelog-tag code {
  font-weight: 500;
  font-size: 14px;
}

.vp-changelog-date {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}
</style>
