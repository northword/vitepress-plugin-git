<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useChangelog, useLastUpdated } from '../composables'
import VPHeader from './VPHeader.vue'

const changelog = useChangelog()
const lastUpdated = useLastUpdated()
const [active, toggleActive] = useToggle()
</script>

<template>
  <VPHeader
    anchor="doc-changelog"
    text="Changelog"
  />
  <template v-if="changelog.length">
    <div class="vp-changelog-wrapper" :class="{ active }">
      <div class="vp-changelog-header" @click="toggleActive()">
        <div class="vp-latest-updated">
          <span class="vp-changelog-icon" />
          <span data-allow-mismatch>{{ lastUpdated?.text }}</span>
        </div>
        <div>
          <span class="vp-changelog-menu-icon" />
          <span>{{ "viewChangelog" }}</span>
        </div>
      </div>

      <ul class="vp-changelog-list">
        <template v-for="item in changelog" :key="item.tag ? item.tag : item.hash">
          <li
            v-if="item.tag"
            class="vp-changelog-item-tag"
          >
            <div>
              <a v-if="item.tagUrl" :href="item.tagUrl" class="vp-changelog-tag">
                <code>{{ item.tag }}</code>
              </a>
              <span v-else class="vp-changelog-tag">
                <code>{{ item.tag }}</code>
              </span>
              <span class="vp-changelog-date" data-allow-mismatch>
                {{ "locale.timeOn" }}
                <time :datetime="new Date(item.time).toISOString()">{{ item.date }}</time>
              </span>
            </div>
          </li>

          <li v-else class="vp-changelog-item-commit">
            <component
              :is="item.commitUrl ? 'a' : 'span'"
              class="vp-changelog-hash"
              :href="item.commitUrl"
              target="_blank"
              rel="noreferrer"
            >
              <code>{{ item.hash.slice(0, 5) }}</code>
            </component>
            <span class="vp-changelog-divider">-</span>
            <span class="vp-changelog-message" v-html="item.message" />
            <span class="vp-changelog-date" data-allow-mismatch>
              {{ 'on' }}
              <time :datetime="new Date(item.time).toISOString()">{{ item.date }}</time>
            </span>
          </li>
        </template>
      </ul>
    </div>
  </template>
</template>

<style>
:root {
  --changelog-bg: var(--vp-c-bg-alt);
  --changelog-font-size: 0.875rem;
  --changelog-c-text: var(--vp-c-text);
}

.vp-changelog-wrapper {
  margin-block: 1rem;
  padding-inline: 1rem;
  border-radius: 8px;
  background-color: var(--changelog-bg);
  color: var(--changelog-c-text);
  font-size: var(--changelog-font-size);
  line-height: 1.7;
  transition: background-color var(--vp-t-color);
}

.vp-changelog-wrapper.active {
  padding-block: 0 0.5rem;
}

.vp-changelog-wrapper a {
  text-decoration: none !important;
}

.vp-changelog-wrapper a::after {
  display: none !important;
}

.vp-changelog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 419px) {
  .vp-changelog-header {
    flex-wrap: wrap;
  }
}

.vp-changelog-wrapper.active .vp-changelog-header {
  padding-block-end: 0.5rem;
}

.vp-changelog-icon,
.vp-changelog-menu-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
  margin-inline-end: 4px;
  background-color: currentcolor;
  color: var(--vp-c-text-mute);
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  transition: color var(--vp-t-color);
  transform: translateY(-1px);
}

.vp-changelog-icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' d='M2.71 10.96a6.5 6.5 0 1 0-.69-3.53M2 8l1.5-1.5M2 8L.5 6.5m8 2v-4m0 4h3'/%3E%3C/svg%3E");
}

.vp-changelog-menu-icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M4 5h0.01'/%3E%3Cpath d='M8 5h12'/%3E%3Cpath d='M4 10h0.01'/%3E%3Cpath d='M8 10h12'/%3E%3Cpath d='M4 15h0.01'/%3E%3Cpath d='M8 15h12'/%3E%3Cpath d='M4 20h0.01'/%3E%3Cpath d='M8 20h12'/%3E%3C/g%3E%3C/svg%3E");
}

.vp-changelog-list {
  display: none;
  margin-block: 0.5rem;
  padding-inline-start: 0;
  list-style: none;
}

.vp-changelog-wrapper.active .vp-changelog-list {
  display: block;
}

.vp-changelog-item-tag,
.vp-changelog-item-commit {
  position: relative;
  margin-block-start: 8px;
  padding-inline-start: 20px;
}

.vp-changelog-item-tag:first-child,
.vp-changelog-item-commit:first-child {
  margin-block-start: 0;
}

.vp-changelog-item-tag::before,
.vp-changelog-item-commit::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  background-color: currentcolor;
  color: var(--vp-c-text-subtle);
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  transition: color var(--vp-t-color);
}

.vp-changelog-item-commit::before {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m3-9v6m0 6v6'/%3E%3C/svg%3E");
}

.vp-changelog-item-tag::before {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0'/%3E%3Cpath d='M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3'/%3E%3C/g%3E%3C/svg%3E");
}

.vp-changelog-tag {
  margin-inline-end: 4px;
  text-decoration: none;
}

.vp-changelog-tag code {
  font-weight: 500;
  font-size: 14px;
}

.vp-changelog-hash {
  margin-inline-end: 4px;
  text-decoration: none;
}

.vp-changelog-divider {
  margin-inline-end: 8px;
}

.vp-changelog-message {
  margin-inline-end: 8px;
  line-height: 1.7;
}

.vp-changelog-date {
  color: var(--vp-c-text-subtle);
  font-size: 0.75rem;
  transition: color var(--vp-t-color);
}
</style>
