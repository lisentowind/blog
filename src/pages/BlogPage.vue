<script setup lang="ts">
import PostCard from '../components/cards/PostCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { posts } from '../data/content'

const featured = posts[0] ?? null
const restPosts = posts.slice(1)
</script>

<template>
  <div class="page blog-page">
    <SectionTitle
      eyebrow="Blog Archive"
      title="技术博客"
      description="围绕前端工程、性能优化、AI 应用落地的实战记录。"
    />

    <article v-if="featured" class="featured-post glass-panel reveal" style="--delay: 140ms">
      <p class="chip">Featured</p>
      <h3>{{ featured.title }}</h3>
      <p>{{ featured.summary }}</p>
      <div class="featured-meta">
        <span>{{ featured.tag }}</span>
        <span>{{ featured.date }} · {{ featured.read }}</span>
      </div>
    </article>

    <section class="card-grid posts-grid">
      <PostCard
        v-for="(post, index) in restPosts"
        :key="post.title"
        :post="post"
        class="reveal"
        :style="{ '--delay': `${240 + index * 100}ms` }"
      />
    </section>
  </div>
</template>
