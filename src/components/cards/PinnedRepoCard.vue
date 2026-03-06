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

<style scoped>
.repo-card {
  padding: 20px;
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.repo-header h3 {
  margin: 0;
  font-size: 20px;
}

.repo-header h3 a {
  color: var(--text);
}

.repo-header h3 a:hover {
  color: var(--accent);
}

.chip {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(var(--accent-rgb), 0.24);
  color: var(--accent);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.repo-card p {
  margin: 12px 0 0;
  color: var(--muted);
}

.fork-note {
  font-size: 12px;
}

.repo-meta {
  margin-top: 14px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
}

.repo-link {
  margin-top: 12px;
  display: inline-flex;
  color: var(--accent);
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 760px) {
  .repo-card {
    padding: 16px;
  }
}
</style>
