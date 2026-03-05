<script setup lang="ts">
import type { PinnedRepo } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  repo: PinnedRepo
}>()
</script>

<template>
  <GlassPanel class="repo-card" :interactive="true">
    <div class="repo-header">
      <h3>
        <a :href="repo.htmlUrl" target="_blank" rel="noreferrer">{{ repo.name }}</a>
      </h3>
      <span class="chip">{{ repo.language }}</span>
    </div>

    <p>{{ repo.description }}</p>

    <p v-if="repo.fork && repo.parent" class="fork-note">Forked from {{ repo.parent }}</p>

    <div class="repo-meta">
      <span>★ {{ repo.stars }}</span>
      <span>⑂ {{ repo.forks }}</span>
      <span>{{ repo.updatedAt }}</span>
    </div>

    <a v-if="repo.homepage" class="repo-link" :href="repo.homepage" target="_blank" rel="noreferrer">
      Open Demo ↗
    </a>
  </GlassPanel>
</template>
