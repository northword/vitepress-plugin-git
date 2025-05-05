<script setup lang="ts">
const props = defineProps<{
  text: string
  anchor: string
  level?: number
}>()
</script>

<template>
  <component :is="`h${props.level ?? 2}`" :id="anchor" tabindex="-1">
    {{ text }}
    <a :href="`#${anchor}`" class="header-anchor" :aria-label="`Permalink to '${anchor}'`" />
  </component>
</template>
