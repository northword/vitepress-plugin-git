<script setup lang="ts">
import { useContributors, useLocale } from '../composables'
import { gitClientOptions } from '../options'
import Authors from './Authors.vue'
import VPHeader from './VPHeader.vue'

const contributors = useContributors()
const locale = useLocale()
</script>

<template>
  <VPHeader
    v-if="!gitClientOptions.contributors?.hideHeader"
    anchor="git-contributors"
    :text="locale.contributors"
  />

  <template v-if="contributors.length">
    <div class="vp-contributors">
      <Authors :authors="contributors" mode="grid" />
    </div>
  </template>

  <template v-else-if="!gitClientOptions.contributors?.hideEmptyText">
    <p class="vp-contributors-empty">
      {{ locale.noContributors }}
    </p>
  </template>
</template>

<style scoped>
.vp-contributors {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
}
</style>
