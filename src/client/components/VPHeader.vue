<script setup lang="ts">
defineProps<{
  text: string
  anchor: string
  level?: number
}>()
</script>

<template>
  <component :is="`h${level ?? 2}`" :id="anchor" tabindex="-1">
    {{ text }}
    <a :href="`#${anchor}`" class="header-anchor" :aria-label="`Permalink to '${anchor}'`" />
  </component>
</template>
