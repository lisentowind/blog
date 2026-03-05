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
