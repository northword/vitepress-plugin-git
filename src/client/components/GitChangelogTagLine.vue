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

<style>
.vp-changelog-item-tag::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  background-color: currentcolor;
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
