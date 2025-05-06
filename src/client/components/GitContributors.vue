<script setup lang="ts">
import { useContributors, useLocale } from '../composables'
import GitContributor from './GitContributor.vue'
import VPHeader from './VPHeader.vue'

const contributors = useContributors()
const locale = useLocale()
</script>

<template>
  <VPHeader anchor="git-contributors" :text="locale.contributors" />
  <template v-if="contributors.length">
    <div class="vp-contributors">
      <GitContributor
        v-for="contributor in contributors"
        :key="contributor.name"
        v-bind="contributor"
      />
    </div>
  </template>
  <template v-else>
    <p class="vp-contributors-empty">
      No contributors found.
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
