<script lang="ts" setup>
import Avatar from './Avatar.vue'

defineProps<{
  authors: { name: string, avatar?: string, url?: string }[]
  mode: 'grid' | 'inline'
}>()
</script>

<template>
  <div class="authors" :class="[mode]">
    <template v-if="mode === 'grid'">
      <template v-for="a in authors" :key="a.name">
        <component
          :is="a.url ? 'a' : 'span'"
          class="item"
          :href="a.url"
        >
          <Avatar :name="a.name" :src="a.avatar" />
          <span>{{ a.name }}</span>
        </component>
      </template>
    </template>

    <template v-else>
      <Avatar
        v-for="(a, i) in authors"
        :key="a.name"
        :name="a.name"
        :src="a.avatar"
        :style="{ zIndex: authors.length - i, marginLeft: i ? '-10px' : '0' }"
        class="item"
      />
    </template>
  </div>
</template>

<style scoped>
.grid  {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
}

.grid .item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.grid .item .avatar {
  width: 1.75rem;
  height: 1.75rem;
}

.inline {
  display: inline-flex;
}

.inline .avatar {
  border: 2px solid white;
  width: 1.15rem;
  height: 1.15rem;
}
</style>
