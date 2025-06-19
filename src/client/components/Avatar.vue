<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  name?: string
  src?: string
}>()

const hasError = ref(false)

const fallbackText = computed(() => {
  return props.name ? props.name[0] : '?'
})

// need reset hasLoadError to false if src changed
watch(
  () => props.src,
  () => hasError.value = false,
)

function handleError() {
  hasError.value = true
}
</script>

<template>
  <span class="avatar">
    <img
      v-if="src && !hasError"
      :src
      :alt="`The avatar of contributor named as ${name}`"
      :title="name"
      class="avatar-img"
      @error="handleError"
    >
    <span v-else class="avatar-fallback">{{ fallbackText }}</span>
  </span>
</template>

<style scoped>
.avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc;
  text-align: center;
  vertical-align: middle;
  color: #fff;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
