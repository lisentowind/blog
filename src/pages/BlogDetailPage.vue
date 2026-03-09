<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { blogPosts } from '../data/content'

const route = useRoute()

const currentIndex = computed(() => blogPosts.findIndex((item) => item.slug === route.params.slug))
const post = computed(() => (currentIndex.value >= 0 ? blogPosts[currentIndex.value] : null))
const previousPost = computed(() => (currentIndex.value > 0 ? blogPosts[currentIndex.value - 1] : null))
const nextPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < blogPosts.length - 1 ? blogPosts[currentIndex.value + 1] : null,
)
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

      <section class="article-nav">
        <SectionTitle eyebrow="Navigate" title="继续阅读" description="现在这里会明确显示上一篇和下一篇。" />
        <div class="card-grid nav-grid">
          <component
            :is="previousPost ? 'RouterLink' : 'article'"
            :to="previousPost ? `/blog/${previousPost.slug}` : undefined"
            class="glass-panel"
            :class="['nav-card', { interactive: !!previousPost, empty: !previousPost, reveal: true }]"
            style="--delay: 220ms"
          >
            <p class="nav-label">上一篇</p>
            <template v-if="previousPost">
              <h3>{{ previousPost.title }}</h3>
              <p class="nav-meta">{{ previousPost.tag }} · {{ previousPost.date }}</p>
              <span>← Read</span>
            </template>
            <template v-else>
              <h3>已经是最新一篇</h3>
              <p class="nav-meta">当前文章前面没有更新的内容。</p>
              <span>—</span>
            </template>
          </component>

          <component
            :is="nextPost ? 'RouterLink' : 'article'"
            :to="nextPost ? `/blog/${nextPost.slug}` : undefined"
            class="glass-panel"
            :class="['nav-card', { interactive: !!nextPost, empty: !nextPost, reveal: true }]"
            style="--delay: 300ms"
          >
            <p class="nav-label">下一篇</p>
            <template v-if="nextPost">
              <h3>{{ nextPost.title }}</h3>
              <p class="nav-meta">{{ nextPost.tag }} · {{ nextPost.date }}</p>
              <span>Read →</span>
            </template>
            <template v-else>
              <h3>已经是最后一篇</h3>
              <p class="nav-meta">当前文章后面没有更早的内容。</p>
              <span>—</span>
            </template>
          </component>
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

.article-nav {
  display: grid;
  gap: 16px;
}

.nav-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.nav-card {
  min-height: 190px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.nav-card.empty {
  opacity: 0.72;
}

.nav-label,
.nav-meta,
.nav-card span {
  margin: 0;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.nav-label {
  color: var(--accent-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-card h3 {
  margin: 0;
  color: var(--text);
  line-height: 1.5;
}

.nav-meta {
  color: var(--muted);
}

.nav-card span {
  margin-top: auto;
  color: var(--accent);
}

@media (max-width: 760px) {
  .article-actions,
  .nav-card {
    padding: 16px;
  }

  .nav-grid {
    grid-template-columns: 1fr;
  }
}
</style>
