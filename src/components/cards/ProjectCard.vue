<script setup lang="ts">
import type { Project } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <GlassPanel class="project-card" :interactive="true">
    <div class="project-top">
      <h3>{{ project.name }}</h3>
      <span class="status">{{ project.status }}</span>
    </div>
    <p class="role">{{ project.role }}</p>
    <p>{{ project.desc }}</p>
    <ul>
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
  </GlassPanel>
</template>

<style scoped>
.project-card {
  padding: 20px;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.project-card h3 {
  margin: 12px 0 10px;
  line-height: 1.35;
  font-size: 20px;
}

.status {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(var(--accent-2-rgb), 0.42);
  color: var(--accent-2);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
}

.project-card p {
  margin: 0;
  color: var(--muted);
}

.role {
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--accent);
}

.project-card ul {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-card li {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(var(--accent-rgb), 0.24);
  font-size: 12px;
  color: var(--chip-color);
}

@media (max-width: 760px) {
  .project-card {
    padding: 16px;
  }
}
</style>
