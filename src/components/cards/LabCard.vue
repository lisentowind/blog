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

@media (max-width: 760px) {
  .lab-card {
    padding: 16px;
  }
}
</style>
