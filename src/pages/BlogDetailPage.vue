<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { blogPosts } from '../data/content'

const route = useRoute()

const post = computed(() => blogPosts.find((item) => item.slug === route.params.slug) ?? null)
const relatedPosts = computed(() => blogPosts.filter((item) => item.slug !== route.params.slug).slice(0, 2))
</script>

<template>
  <div class="page blog-detail-page">
    <template v-if="post">
      <SectionTitle :eyebrow="post.tag" :title="post.title" :description="post.headline" />

      <article class="glass-panel article-shell reveal" style="--delay: 120ms">
        <header class="article-meta">
          <span>{{ post.date }}</span>
          <span>{{ post.read }}</span>
        </header>

        <p class="article-summary">{{ post.summary }}</p>

        <section v-for="section in post.sections" :key="section.title" class="article-section">
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets?.length">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <pre v-if="section.code"><code>{{ section.code }}</code></pre>
        </section>
      </article>

      <section class="glass-panel article-actions reveal" style="--delay: 180ms">
        <CyberButton variant="outline" to="/blog">返回文章列表</CyberButton>
        <CyberButton to="/lab">去看实验室</CyberButton>
      </section>

      <section class="related-posts">
        <SectionTitle eyebrow="More" title="继续阅读" description="再看两篇相关内容，保持这个节奏继续写下去。" />
        <div class="card-grid related-grid">
          <RouterLink
            v-for="(item, index) in relatedPosts"
            :key="item.slug"
            :to="`/blog/${item.slug}`"
            class="glass-panel interactive related-card reveal"
            :style="{ '--delay': `${220 + index * 80}ms` }"
          >
            <p class="meta">{{ item.tag }} · {{ item.date }}</p>
            <h3>{{ item.title }}</h3>
            <p class="summary">{{ item.summary }}</p>
            <span>Read →</span>
          </RouterLink>
        </div>
      </section>
    </template>

    <template v-else>
      <SectionTitle eyebrow="404" title="文章不存在" description="这个 slug 暂时没有匹配到内容。" />
      <article class="glass-panel status-card reveal" style="--delay: 120ms">
        <h3>Not Found</h3>
        <p>你可以先回到文章列表，或者去 Lab 看看最近在做什么。</p>
      </article>
      <section class="glass-panel article-actions reveal" style="--delay: 160ms">
        <CyberButton variant="outline" to="/blog">返回 Blog</CyberButton>
        <CyberButton to="/lab">打开 Lab</CyberButton>
      </section>
    </template>
  </div>
</template>

<style scoped>
.article-shell {
  padding: clamp(20px, 4vw, 32px);
}

.article-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.article-summary {
  margin: 18px 0 0;
  font-size: 17px;
  line-height: 1.8;
}

.article-section + .article-section {
  margin-top: 28px;
}

.article-section h2 {
  margin: 26px 0 12px;
  font-size: 24px;
}

.article-section p,
.article-section li {
  color: var(--muted);
  line-height: 1.8;
}

.article-section ul {
  margin: 12px 0 0;
  padding-left: 18px;
}

.article-section pre {
  overflow-x: auto;
  padding: 16px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(var(--accent-rgb), 0.16);
}

.article-section code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}

.article-actions {
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.related-posts {
  display: grid;
  gap: 16px;
}

.related-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.related-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px 20px;
}

.related-card p,
.related-card span {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.related-card .summary {
  color: var(--muted);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.7;
}

.related-card h3 {
  margin: 0;
  color: var(--text);
}

.related-card span {
  margin-top: auto;
  color: var(--accent);
}

@media (max-width: 760px) {
  .article-actions,
  .related-card {
    padding: 16px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
