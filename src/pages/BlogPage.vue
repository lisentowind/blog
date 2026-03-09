<script setup lang="ts">
import { computed, ref } from 'vue'
import PostCard from '../components/cards/PostCard.vue'
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { blogPosts } from '../data/content'

const activeTag = ref('全部')
const keyword = ref('')

const tags = computed(() => ['全部', ...new Set(blogPosts.map((post) => post.tag))])

const filteredPosts = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return blogPosts.filter((post) => {
    const byTag = activeTag.value === '全部' || post.tag === activeTag.value
    const byKeyword =
      normalizedKeyword.length === 0 ||
      [post.title, post.summary, post.headline].some((field) => field.toLowerCase().includes(normalizedKeyword))

    return byTag && byKeyword
  })
})

const featuredPost = computed(() => filteredPosts.value[0] ?? null)
</script>

<template>
  <div class="page blog-page">
    <SectionTitle
      eyebrow="Blog"
      title="技术文章"
      description="把项目复盘、工程化思考和 UI 组件经验沉淀成可持续更新的内容。"
    />

    <section v-if="featuredPost" class="glass-panel interactive featured-post reveal" style="--delay: 120ms">
      <div>
        <p class="featured-kicker">Featured Post · {{ featuredPost.tag }}</p>
        <h2>{{ featuredPost.title }}</h2>
        <p class="featured-headline">{{ featuredPost.headline }}</p>
        <p class="featured-summary">{{ featuredPost.summary }}</p>
      </div>
      <div class="featured-actions">
        <span>{{ featuredPost.date }} · {{ featuredPost.read }}</span>
        <CyberButton :to="`/blog/${featuredPost.slug}`">阅读全文</CyberButton>
      </div>
    </section>

    <section class="glass-panel filter-panel reveal" style="--delay: 180ms">
      <div class="filter-group tag-group">
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="filter-chip"
          :class="{ active: tag === activeTag }"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
      <label class="search-box">
        <span>Search</span>
        <input v-model="keyword" type="search" placeholder="搜索标题、摘要或关键句" />
      </label>
    </section>

    <section class="card-grid post-grid">
      <PostCard
        v-for="(post, index) in filteredPosts"
        :key="post.slug"
        :post="post"
        class="reveal"
        :style="{ '--delay': `${220 + index * 80}ms` }"
      />

      <article v-if="filteredPosts.length === 0" class="glass-panel status-card reveal" style="--delay: 220ms">
        <h3>没有匹配的文章</h3>
        <p>可以试试切换标签或清空搜索词。</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
.featured-post {
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  align-items: end;
}

.featured-kicker,
.search-box span {
  margin: 0;
  color: var(--accent-2);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.featured-post h2 {
  margin: 10px 0 12px;
  font-size: clamp(26px, 4vw, 40px);
}

.featured-headline {
  margin: 0;
  font-size: 16px;
}

.featured-summary {
  margin: 12px 0 0;
  color: var(--muted);
  max-width: 72ch;
}

.featured-actions {
  display: grid;
  gap: 12px;
  justify-items: end;
}

.featured-actions span {
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.filter-panel {
  padding: 16px 20px;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  border: 1px solid var(--tag-border);
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
}

.filter-chip.active {
  border-color: rgba(var(--accent-rgb), 0.72);
  color: var(--accent);
  box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.18);
}

.search-box {
  display: grid;
  gap: 8px;
  min-width: min(100%, 320px);
}

.search-box input {
  min-width: 280px;
  max-width: 360px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--line-strong);
  background: var(--tile-bg);
  color: var(--text);
}

.search-box input:focus {
  outline: 2px solid rgba(var(--accent-rgb), 0.24);
}

.post-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 900px) {
  .featured-post,
  .filter-panel {
    grid-template-columns: 1fr;
  }

  .featured-actions {
    justify-items: start;
  }
}

@media (max-width: 760px) {
  .featured-post,
  .filter-panel {
    padding: 16px;
  }

  .post-grid {
    grid-template-columns: 1fr;
  }

  .search-box,
  .search-box input {
    min-width: 100%;
    max-width: none;
  }
}
</style>
