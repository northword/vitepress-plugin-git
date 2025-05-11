<script setup lang="ts">
defineProps<{
  name: string
  url?: string
  avatar?: string
}>()
</script>

<template>
  <component
    :is="url ? 'a' : 'span'"
    class="vp-contributor"
    :href="url"
    target="_blank"
    rel="noreferrer"
  >
    <img v-if="avatar" :src="avatar" :alt="`The avatar of contributor named as ${name}`" class="vp-contributor-avatar">
    <span class="vp-contributor-name">{{ name }}</span>
  </component>
</template>

<style scoped>
.vp-contributor {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  color: inherit;
  font-size: 1.125rem;
}

.vp-contributor::after {
  display: none !important;
}

.vp-contributor-avatar {
  object-fit: contain;
  width: 1.75rem;
  height: 1.75rem;
  margin-inline-end: 0.25rem;
  border-radius: 50%;
}

a.vp-contributor {
  text-decoration: none !important;
}
</style>
