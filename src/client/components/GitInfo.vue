<script setup lang="ts">
import { useData } from 'vitepress'
import GitChangelog from './GitChangelog.vue'
import GitContributors from './GitContributors.vue'

const { page } = useData()
</script>

<template>
  <div class="git-info">
    <div v-if="page.git" class="git-info-doc vp-doc">
      <GitContributors v-if="page.git.contributors" />
      <GitChangelog v-if="page.git.changelog" />
    </div>
  </div>
</template>
