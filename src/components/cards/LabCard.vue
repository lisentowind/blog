<script setup lang="ts">
import type { LabEntry } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  entry: LabEntry
}>()
</script>

<template>
  <GlassPanel class="lab-card" :interactive="true">
    <div class="lab-top">
      <h3>{{ entry.name }}</h3>
      <span>{{ entry.stage }}</span>
    </div>
    <h4>{{ entry.headline }}</h4>
    <p>{{ entry.details }}</p>
    <p class="focus">{{ entry.focus }}</p>
    <ul class="stack-list">
      <li v-for="item in entry.stack" :key="item">{{ item }}</li>
    </ul>
    <div v-if="entry.links?.length" class="lab-links">
      <RouterLink v-for="link in entry.links.filter((item) => item.to)" :key="`${entry.name}-${link.label}`" :to="link.to!">
        {{ link.label }}
      </RouterLink>
      <a v-for="link in entry.links.filter((item) => item.href)" :key="`${entry.name}-${link.label}`" :href="link.href">
        {{ link.label }}
      </a>
    </div>
  </GlassPanel>
</template>

<style scoped>
.lab-card {
  padding: 20px;
}

.lab-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.lab-card h3 {
  margin: 12px 0 10px;
  line-height: 1.35;
  font-size: 20px;
}

.lab-top span {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(var(--accent-2-rgb), 0.42);
  color: var(--accent-2);
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
}

.lab-card h4 {
  margin: 8px 0;
  font-size: 18px;
}

.lab-card p {
  margin: 0;
  color: var(--muted);
}

.focus {
  margin-top: 14px;
  color: var(--text) !important;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
}

.stack-list li {
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  color: var(--tag-text);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.lab-links {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.lab-links a {
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 760px) {
  .lab-card {
    padding: 16px;
  }
}
</style>
