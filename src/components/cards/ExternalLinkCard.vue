<script setup lang="ts">
import type { ProfileLink } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  link: ProfileLink
}>()
</script>

<template>
  <GlassPanel class="external-link-card" :interactive="true">
    <h3>{{ link.label }}</h3>
    <p>{{ link.note }}</p>
    <a :href="link.href" target="_blank" rel="noreferrer">{{ link.href }}</a>
  </GlassPanel>
</template>

<style scoped>
.external-link-card {
  padding: 20px;
}

.external-link-card h3 {
  margin: 0;
  font-size: 20px;
}

.external-link-card p {
  margin: 10px 0;
  color: var(--muted);
}

.external-link-card a {
  color: var(--accent);
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  word-break: break-all;
}

@media (max-width: 760px) {
  .external-link-card {
    padding: 16px;
  }
}
</style>
