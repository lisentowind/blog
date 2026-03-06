<script setup lang="ts">
import type { Post } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <GlassPanel class="post-card" :interactive="true">
    <div class="post-meta">
      <span>{{ post.tag }}</span>
      <time>{{ post.date }}</time>
    </div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.summary }}</p>
    <div class="post-foot">
      <small>{{ post.read }}</small>
      <a href="#">Read →</a>
    </div>
  </GlassPanel>
</template>

<style scoped>
.post-card {
  padding: 20px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
}

.post-meta span {
  color: var(--accent-2);
}

.post-card h3 {
  margin: 12px 0 10px;
  line-height: 1.35;
  font-size: 20px;
}

.post-card p {
  margin: 0;
  color: var(--muted);
}

.post-foot {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-foot a {
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
}

@media (max-width: 760px) {
  .post-card {
    padding: 16px;
  }
}
</style>
