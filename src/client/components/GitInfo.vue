<script setup lang="ts">
import { useData } from 'vitepress'
import { defineAsyncComponent } from 'vue'

const { page } = useData()

const GitContributors = defineAsyncComponent(() =>
  import('./GitContributors.vue'),
)
const GitChangelog = defineAsyncComponent(() =>
  import('./GitChangelog.vue'),
)
</script>

<template>
  <div class="git-info">
    {{ page }}
    <div v-if="page.git" class="git-info-doc vp-doc">
      <GitContributors v-if="page.git.contributors" />
      <GitChangelog v-if="page.git.changelog" />
    </div>
  </div>
</template>
