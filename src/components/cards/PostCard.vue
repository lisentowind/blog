<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

const props = defineProps<{
  post: Post
  index?: number
}>()

const displayIndex = computed(() => String((props.index ?? 0) + 1).padStart(2, '0'))
</script>

<template>
  <GlassPanel class="post-card" :interactive="true" :class="{ shifted: ((index ?? 0) + 1) % 2 === 0 }">
    <span class="post-index" aria-hidden="true">{{ displayIndex }}</span>
    <div class="post-meta">
      <span>{{ post.tag }}</span>
      <time>{{ post.date }}</time>
    </div>
    <h3>{{ post.title }}</h3>
    <p class="headline">{{ post.headline }}</p>
    <p class="summary">{{ post.summary }}</p>
    <div class="post-foot">
      <small>{{ post.read }}</small>
      <RouterLink :to="`/blog/${post.slug}`">
        Read Signal
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </GlassPanel>
</template>

<style scoped>
.post-card {
  --post-focus-ring: 0 0 0 2px rgba(var(--accent-rgb), 0.32), 0 0 0 4px var(--post-card-focus-backdrop, rgba(4, 10, 18, 0.92));

  position: relative;
  min-height: 280px;
  padding: 22px 22px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
  background:
    var(--post-card-overlay, linear-gradient(160deg, rgba(var(--accent-rgb), 0.06), rgba(255, 255, 255, 0) 56%)),
    var(--panel-sheen),
    var(--panel);
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 68%;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb), 0.12));
}

.post-card.shifted::before {
  left: auto;
  right: 0;
}

.post-index {
  position: absolute;
  right: 18px;
  bottom: 12px;
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  font-size: 76px;
  line-height: 1;
  color: rgba(var(--accent-rgb), 0.08);
  pointer-events: none;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  z-index: 1;
}

.post-meta span {
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.post-card h3 {
  position: relative;
  z-index: 1;
  margin: 16px 0 12px;
  line-height: 1.35;
  font-size: 24px;
}

.headline {
  position: relative;
  z-index: 1;
  margin: 0 0 12px;
  color: var(--text);
  line-height: 1.6;
}

.summary {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.post-foot {
  position: relative;
  z-index: 1;
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.post-foot small {
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.post-foot a {
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 0.22s ease, color 0.22s ease;
}

.post-foot a span {
  transition: transform 0.22s ease;
}

.post-card:hover .post-foot a span {
  transform: translateX(4px);
}

.post-foot a:focus-visible {
  outline: 0;
  box-shadow: var(--post-focus-ring);
  border-radius: 999px;
  padding-inline: 4px;
}

@media (max-width: 760px) {
  .post-card {
    min-height: 260px;
    padding: 18px;
  }

  .post-card h3 {
    font-size: 21px;
  }

  .post-index {
    font-size: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .post-foot a,
  .post-foot a span {
    transition: none;
  }
}
</style>
