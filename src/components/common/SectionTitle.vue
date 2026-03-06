<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="section-title glass-panel reveal">
    <p>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="desc">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-title {
  padding: 16px 20px;
}

.section-title p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.section-title h2 {
  margin: 6px 0 0;
  font-size: clamp(24px, 3.4vw, 34px);
}

.section-title .desc {
  margin-top: 8px;
  max-width: 66ch;
  line-height: 1.6;
  text-transform: none;
  letter-spacing: 0;
}

@media (max-width: 760px) {
  .section-title {
    padding: 16px;
  }
}
</style>
