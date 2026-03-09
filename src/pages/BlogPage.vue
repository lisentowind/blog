<script setup lang="ts">
import { computed, ref } from 'vue'
import PostCard from '../components/cards/PostCard.vue'
import CyberButton from '../components/common/CyberButton.vue'
import type { Post } from '../data/content'
import { blogPosts } from '../data/content'
import { useTheme } from '../composables/useTheme'

type PathKey = 'all' | 'latest' | 'ui-system' | 'build-logs'

const { theme } = useTheme()

const activeTag = ref('全部')
const activePath = ref<PathKey>('all')
const keyword = ref('')

const tags = computed(() => ['全部', ...new Set(blogPosts.map((post) => post.tag))])

const sortedPosts = computed(() => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)))

const latestSlugSet = computed(() => new Set(sortedPosts.value.slice(0, 3).map((post) => post.slug)))

const includesTerms = (post: Post, terms: string[]) => {
  const haystack = [post.tag, post.title, post.summary, post.headline].join(' ').toLowerCase()
  return terms.some((term) => haystack.includes(term.toLowerCase()))
}

const matchesPath = (post: Post, path: PathKey) => {
  if (path === 'all') {
    return true
  }

  if (path === 'latest') {
    return latestSlugSet.value.has(post.slug)
  }

  if (path === 'ui-system') {
    return post.tag === 'UI' || includesTerms(post, ['ui', '组件', '设计', '界面', 'system', '视觉'])
  }

  return ['工程化', '写作'].includes(post.tag) || includesTerms(post, ['工程', '构建', '复盘', '日志', '架构', '迭代'])
}

const filteredPosts = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return sortedPosts.value.filter((post) => {
    const byTag = activeTag.value === '全部' || post.tag === activeTag.value
    const byPath = matchesPath(post, activePath.value)
    const byKeyword =
      normalizedKeyword.length === 0 ||
      [post.title, post.summary, post.headline].some((field) => field.toLowerCase().includes(normalizedKeyword))

    return byTag && byPath && byKeyword
  })
})

const featuredPost = computed(() => filteredPosts.value[0] ?? sortedPosts.value[0] ?? null)

const parseReadMinutes = (value: string) => Number.parseInt(value, 10) || 0

const formatDisplayDate = (value: string) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value))

const topTags = computed(() => {
  const counts = new Map<string, number>()

  sortedPosts.value.forEach((post) => {
    counts.set(post.tag, (counts.get(post.tag) ?? 0) + 1)
  })

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag)
})

const heroStats = computed(() => {
  const totalMinutes = sortedPosts.value.reduce((sum, post) => sum + parseReadMinutes(post.read), 0)
  const averageMinutes = sortedPosts.value.length === 0 ? 0 : totalMinutes / sortedPosts.value.length
  const latestDate = sortedPosts.value[0]?.date ?? new Date().toISOString().slice(0, 10)

  return [
    {
      label: 'Archive Count',
      value: String(sortedPosts.value.length).padStart(2, '0'),
      meta: 'signals live',
      compact: false,
    },
    {
      label: 'Primary Topics',
      value: topTags.value.join(' / '),
      meta: 'top 3 tags',
      compact: true,
    },
    {
      label: 'Reading Tempo',
      value: `${averageMinutes.toFixed(1)} min`,
      meta: 'avg / article',
      compact: false,
    },
    {
      label: 'Last Sync',
      value: formatDisplayDate(latestDate),
      meta: 'latest publish',
      compact: true,
    },
  ]
})

const readingPaths = computed(() => [
  {
    key: 'latest' as const,
    label: 'Latest Signals',
    summary: '最近更新的文章与阶段性复盘',
    count: sortedPosts.value.filter((post) => matchesPath(post, 'latest')).length,
    cta: '进入最新信号',
    tone: 'cyan',
  },
  {
    key: 'ui-system' as const,
    label: 'UI / System Thinking',
    summary: '组件语言、界面结构与设计工程笔记',
    count: sortedPosts.value.filter((post) => matchesPath(post, 'ui-system')).length,
    cta: '切换到界面频道',
    tone: 'green',
  },
  {
    key: 'build-logs' as const,
    label: 'Build Logs',
    summary: '工程实践、内容架构与项目迭代日志',
    count: sortedPosts.value.filter((post) => matchesPath(post, 'build-logs')).length,
    cta: '查看构建日志',
    tone: 'amber',
  },
])

const activePathLabel = computed(() => {
  const current = readingPaths.value.find((path) => path.key === activePath.value)
  return current?.label ?? 'All Signals'
})

const transmissionCount = computed(() => String(filteredPosts.value.length).padStart(2, '0'))

const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') {
    return
  }

  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const activatePath = (key: Exclude<PathKey, 'all'>) => {
  activePath.value = key
  keyword.value = ''
  activeTag.value = key === 'ui-system' ? 'UI' : '全部'
  scrollToSection('archive-grid')
}

const resetFilters = () => {
  activeTag.value = '全部'
  activePath.value = 'all'
  keyword.value = ''
}
</script>

<template>
  <div class="page blog-page" :class="{ 'is-light': theme === 'light' }">
    <section class="glass-panel signal-deck reveal" style="--delay: 80ms">
      <div class="signal-copy">
        <p class="signal-eyebrow">Blog Signal / Technical Archive</p>
        <h1>构建中的思想，发布中的系统。</h1>
        <p class="signal-description">
          这里收录我对工程化、UI 组件、交互实验与产品细节的长期记录，让博客像持续运行的技术工作台，而不是一次性展示页。
        </p>
        <div class="signal-actions">
          <CyberButton v-if="featuredPost" :to="`/blog/${featuredPost.slug}`">进入最新文章</CyberButton>
          <CyberButton variant="outline" as="button" @click="scrollToSection('reading-paths')">浏览专题路径</CyberButton>
        </div>
      </div>
      <div class="status-module" aria-label="Archive metrics">
        <article v-for="stat in heroStats" :key="stat.label" class="status-tile">
          <p class="status-label">{{ stat.label }}</p>
          <strong class="status-value" :class="{ compact: stat.compact }">{{ stat.value }}</strong>
          <small class="status-meta">{{ stat.meta }}</small>
        </article>
      </div>
    </section>

    <section v-if="featuredPost" class="glass-panel interactive featured-transmission reveal" style="--delay: 140ms">
      <div class="featured-copy">
        <span class="priority-badge">PRIORITY 01</span>
        <p class="section-kicker">Main Transmission · {{ activePathLabel }}</p>
        <div class="featured-body">
          <span class="featured-tag">{{ featuredPost.tag }}</span>
          <h2>{{ featuredPost.title }}</h2>
          <p class="featured-headline">{{ featuredPost.headline }}</p>
          <p class="featured-summary">{{ featuredPost.summary }}</p>
        </div>
      </div>
      <div class="featured-meta">
        <div class="signal-index">
          <span>Signal Index</span>
          <strong>01</strong>
        </div>
        <dl class="featured-facts">
          <div>
            <dt>Published</dt>
            <dd>{{ formatDisplayDate(featuredPost.date) }}</dd>
          </div>
          <div>
            <dt>Read Time</dt>
            <dd>{{ featuredPost.read }}</dd>
          </div>
          <div>
            <dt>Channel</dt>
            <dd>{{ featuredPost.tag }}</dd>
          </div>
        </dl>
        <CyberButton :to="`/blog/${featuredPost.slug}`">阅读全文</CyberButton>
      </div>
    </section>

    <section class="glass-panel frequency-router reveal" style="--delay: 180ms">
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
        <span class="search-label">Signal Query</span>
        <span class="search-field">
          <span class="search-prefix" aria-hidden="true">&gt;_</span>
          <input v-model="keyword" type="search" placeholder="搜索标题、摘要或关键句" />
        </span>
      </label>
      <p class="router-count">Showing {{ transmissionCount }} transmissions</p>
    </section>

    <section id="reading-paths" class="reading-zone reveal" style="--delay: 220ms">
      <header class="zone-header">
        <p class="section-kicker">Curated Navigation Grid</p>
        <h2>专题路径</h2>
        <p>让读者按更新节奏、界面系统和构建记录三种方式进入内容，而不是只从列表里被动查找。</p>
      </header>
      <div class="paths-grid">
        <article
          v-for="(path, index) in readingPaths"
          :key="path.key"
          class="glass-panel interactive path-card"
          :class="[`path-card--${path.tone}`, { active: activePath === path.key, tall: index !== 1 }]"
        >
          <p class="path-label">{{ path.label }}</p>
          <h3>{{ path.summary }}</h3>
          <div class="path-meta">
            <strong>{{ String(path.count).padStart(2, '0') }}</strong>
            <span>articles archived</span>
          </div>
          <button type="button" class="path-cta" @click="activatePath(path.key)">
            {{ activePath === path.key ? '当前频道已激活' : path.cta }}
          </button>
        </article>
      </div>
    </section>

    <section id="archive-grid" class="archive-zone">
      <header class="zone-header reveal" style="--delay: 260ms">
        <p class="section-kicker">Archive Grid</p>
        <h2>信号矩阵</h2>
        <p>
          当前频段：<span class="highlight-copy">{{ activePathLabel }}</span>
          <span v-if="activeTag !== '全部'"> · 标签 {{ activeTag }}</span>
        </p>
      </header>

      <div v-if="filteredPosts.length" class="card-grid post-grid">
        <PostCard
          v-for="(post, index) in filteredPosts"
          :key="post.slug"
          :post="post"
          :index="index"
          class="reveal"
          :style="{ '--delay': `${300 + index * 70}ms` }"
        />
      </div>

      <article v-else class="glass-panel status-card archive-empty reveal" style="--delay: 300ms">
        <p class="section-kicker">No Matching Signal</p>
        <h3>当前频段没有匹配内容，请切换标签或重置检索。</h3>
        <p>可以回到默认频道，或者直接输入新的关键词继续扫描。</p>
        <CyberButton variant="outline" as="button" @click="resetFilters">重置检索</CyberButton>
      </article>
    </section>

    <section class="glass-panel open-channel reveal" style="--delay: 360ms">
      <div>
        <p class="section-kicker">Open Channel</p>
        <h2>想继续追踪我的实验与写作信号？</h2>
        <p class="open-copy">
          如果你想看半成品实验、项目故事或更完整的个人资料，可以继续进入 Lab 与 About。
        </p>
      </div>
      <div class="open-actions">
        <CyberButton to="/lab">前往 Lab</CyberButton>
        <CyberButton variant="outline" to="/about">返回 About</CyberButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-page {
  --panel: rgba(7, 18, 34, 0.78);
  --tile-bg: rgba(9, 21, 39, 0.9);
  --line: rgba(120, 232, 255, 0.18);
  --line-strong: rgba(120, 232, 255, 0.42);
  --text: #e8f7ff;
  --muted: #87a6bb;
  --accent: #78f4ff;
  --accent-2: #4dffb8;
  --accent-rgb: 120, 244, 255;
  --accent-2-rgb: 77, 255, 184;
  --tag-text: #d7f6ff;
  --tag-bg: rgba(8, 18, 34, 0.52);
  --tag-border: rgba(120, 232, 255, 0.24);
  --shadow: 0 24px 60px rgba(2, 8, 20, 0.42);
  --panel-hover-border: rgba(120, 232, 255, 0.52);
  --panel-hover-shadow:
    0 24px 64px rgba(2, 8, 20, 0.6),
    inset 0 1px 0 rgba(162, 245, 255, 0.12);
  --panel-hover-sheen: linear-gradient(155deg, rgba(122, 244, 255, 0.1), rgba(255, 255, 255, 0));
  --btn-primary-text: #03141a;
  --btn-primary-shadow: 0 14px 30px rgba(120, 244, 255, 0.22);
  --focus-ring: 0 0 0 2px rgba(120, 244, 255, 0.34), 0 0 0 4px rgba(3, 9, 20, 0.92);
  --hero-shell-bg:
    linear-gradient(145deg, rgba(4, 11, 22, 0.98), rgba(7, 17, 31, 0.9)),
    radial-gradient(circle at 16% 22%, rgba(var(--accent-rgb), 0.16), transparent 34%);
  --hero-scan-line: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.78), transparent);
  --hero-scan-shadow: 0 0 14px rgba(var(--accent-rgb), 0.44);
  --hero-copy-glow: radial-gradient(circle, rgba(var(--accent-rgb), 0.2), transparent 70%);
  --hero-title-shadow: 0 0 24px rgba(var(--accent-rgb), 0.18);
  --hero-ambient-a: radial-gradient(circle, rgba(var(--accent-rgb), 0.24), transparent 72%);
  --hero-ambient-b: radial-gradient(circle, rgba(var(--accent-2-rgb), 0.2), transparent 74%);
  --status-border: 1px solid rgba(var(--accent-rgb), 0.14);
  --status-bg:
    linear-gradient(180deg, rgba(12, 24, 42, 0.88), rgba(7, 17, 31, 0.76)),
    linear-gradient(135deg, rgba(var(--accent-rgb), 0.08), transparent 50%);
  --featured-premium-bg:
    linear-gradient(160deg, rgba(8, 19, 35, 0.96), rgba(6, 15, 27, 0.88)),
    radial-gradient(circle at 78% 22%, rgba(var(--accent-rgb), 0.14), transparent 28%),
    linear-gradient(rgba(var(--accent-rgb), 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--accent-rgb), 0.06) 1px, transparent 1px);
  --featured-border: rgba(var(--accent-rgb), 0.28);
  --featured-overlay: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.06), transparent);
  --featured-divider: 1px solid rgba(var(--accent-rgb), 0.16);
  --badge-border: 1px solid rgba(var(--accent-rgb), 0.3);
  --badge-bg: rgba(var(--accent-rgb), 0.08);
  --featured-tag-bg: rgba(var(--accent-rgb), 0.1);
  --signal-index-border: 1px solid rgba(var(--accent-rgb), 0.24);
  --signal-index-bg:
    linear-gradient(160deg, rgba(8, 20, 36, 0.92), rgba(8, 18, 30, 0.78)),
    radial-gradient(circle at 22% 28%, rgba(var(--accent-rgb), 0.16), transparent 48%);
  --signal-index-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 16px 34px rgba(3, 10, 24, 0.2);
  --signal-index-overlay: linear-gradient(135deg, rgba(var(--accent-rgb), 0.12), rgba(255, 255, 255, 0));
  --signal-index-orbit: rgba(var(--accent-rgb), 0.16);
  --signal-index-value-shadow: 0 0 18px rgba(var(--accent-rgb), 0.14);
  --filter-active-bg: linear-gradient(135deg, rgba(var(--accent-rgb), 0.2), rgba(var(--accent-2-rgb), 0.16));
  --filter-active-shadow: 0 0 18px rgba(var(--accent-rgb), 0.14);
  --path-cyan: linear-gradient(90deg, rgba(var(--accent-rgb), 1), rgba(var(--accent-rgb), 0.18));
  --path-green: linear-gradient(90deg, rgba(var(--accent-2-rgb), 1), rgba(var(--accent-2-rgb), 0.18));
  --path-amber: linear-gradient(90deg, #ffd166, rgba(255, 209, 102, 0.14));
  --path-active-shadow: 0 18px 38px rgba(2, 8, 20, 0.28), 0 0 24px rgba(var(--accent-rgb), 0.12);
  --path-cta-bg: rgba(var(--accent-rgb), 0.04);
  --open-channel-bg:
    linear-gradient(145deg, rgba(11, 24, 31, 0.96), rgba(8, 17, 32, 0.88)),
    radial-gradient(circle at 70% 50%, rgba(var(--accent-2-rgb), 0.16), transparent 38%);
  --open-channel-glow: radial-gradient(circle, rgba(var(--accent-2-rgb), 0.2), transparent 70%);
  --responsive-divider: 1px solid rgba(var(--accent-rgb), 0.16);
  --post-card-overlay: linear-gradient(160deg, rgba(var(--accent-rgb), 0.06), rgba(255, 255, 255, 0) 56%);
  --post-card-focus-backdrop: rgba(4, 10, 18, 0.92);

  position: relative;
  isolation: isolate;
  gap: 24px;
  padding-bottom: 18px;
}

.blog-page::before,
.blog-page::after {
  content: '';
  position: absolute;
  inset: auto;
  pointer-events: none;
  border-radius: 999px;
  filter: blur(72px);
  opacity: 0.88;
  z-index: -1;
}

.blog-page::before {
  top: 30px;
  left: 5%;
  width: 280px;
  height: 220px;
  background: var(--hero-ambient-a);
}

.blog-page::after {
  right: 3%;
  bottom: 36px;
  width: 240px;
  height: 180px;
  background: var(--hero-ambient-b);
}

.blog-page.is-light {
  --panel: rgba(243, 250, 255, 0.9);
  --tile-bg: rgba(232, 243, 250, 0.94);
  --line: rgba(49, 116, 156, 0.24);
  --line-strong: rgba(28, 116, 169, 0.45);
  --text: #102638;
  --muted: #476178;
  --accent: #1081bb;
  --accent-2: #119374;
  --accent-rgb: 16, 129, 187;
  --accent-2-rgb: 17, 147, 116;
  --tag-text: #17374f;
  --tag-bg: rgba(224, 238, 248, 0.96);
  --tag-border: rgba(22, 117, 171, 0.26);
  --shadow: 0 18px 40px rgba(21, 69, 102, 0.18);
  --panel-hover-border: rgba(18, 123, 178, 0.48);
  --panel-hover-shadow:
    0 18px 38px rgba(19, 73, 108, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
  --panel-hover-sheen: linear-gradient(155deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0));
  --btn-primary-text: #f4fbff;
  --btn-primary-shadow: 0 12px 24px rgba(16, 129, 187, 0.18);
  --focus-ring: 0 0 0 2px rgba(16, 129, 187, 0.28), 0 0 0 4px rgba(255, 255, 255, 0.92);
  --hero-shell-bg:
    linear-gradient(145deg, rgba(246, 251, 255, 0.98), rgba(224, 238, 248, 0.94)),
    radial-gradient(circle at 16% 22%, rgba(var(--accent-rgb), 0.14), transparent 36%);
  --hero-scan-line: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.58), transparent);
  --hero-scan-shadow: 0 0 12px rgba(var(--accent-rgb), 0.24);
  --hero-copy-glow: radial-gradient(circle, rgba(var(--accent-rgb), 0.12), transparent 72%);
  --hero-title-shadow: 0 0 18px rgba(var(--accent-rgb), 0.12);
  --hero-ambient-a: radial-gradient(circle, rgba(var(--accent-rgb), 0.18), transparent 72%);
  --hero-ambient-b: radial-gradient(circle, rgba(var(--accent-2-rgb), 0.16), transparent 74%);
  --status-border: 1px solid rgba(var(--accent-rgb), 0.16);
  --status-bg:
    linear-gradient(180deg, rgba(247, 251, 255, 0.96), rgba(229, 240, 248, 0.92)),
    linear-gradient(135deg, rgba(var(--accent-rgb), 0.08), transparent 58%);
  --featured-premium-bg:
    linear-gradient(160deg, rgba(245, 251, 255, 0.98), rgba(226, 239, 248, 0.94)),
    radial-gradient(circle at 78% 22%, rgba(var(--accent-rgb), 0.12), transparent 30%),
    linear-gradient(rgba(var(--accent-rgb), 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--accent-rgb), 0.08) 1px, transparent 1px);
  --featured-border: rgba(var(--accent-rgb), 0.24);
  --featured-overlay: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.05), transparent);
  --featured-divider: 1px solid rgba(var(--accent-rgb), 0.18);
  --badge-border: 1px solid rgba(var(--accent-rgb), 0.24);
  --badge-bg: rgba(var(--accent-rgb), 0.08);
  --featured-tag-bg: rgba(var(--accent-rgb), 0.12);
  --signal-index-border: 1px solid rgba(var(--accent-rgb), 0.22);
  --signal-index-bg:
    linear-gradient(160deg, rgba(248, 252, 255, 0.98), rgba(231, 241, 248, 0.94)),
    radial-gradient(circle at 22% 28%, rgba(var(--accent-rgb), 0.14), transparent 52%);
  --signal-index-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    0 14px 30px rgba(28, 78, 113, 0.12);
  --signal-index-overlay: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(var(--accent-rgb), 0.03));
  --signal-index-orbit: rgba(var(--accent-rgb), 0.14);
  --signal-index-value-shadow: 0 6px 14px rgba(var(--accent-rgb), 0.08);
  --filter-active-bg: linear-gradient(135deg, rgba(var(--accent-rgb), 0.16), rgba(var(--accent-2-rgb), 0.14));
  --filter-active-shadow: 0 0 16px rgba(var(--accent-rgb), 0.1);
  --path-amber: linear-gradient(90deg, #c6921e, rgba(198, 146, 30, 0.14));
  --path-active-shadow: 0 16px 32px rgba(32, 80, 118, 0.16), 0 0 18px rgba(var(--accent-rgb), 0.12);
  --path-cta-bg: rgba(var(--accent-rgb), 0.06);
  --open-channel-bg:
    linear-gradient(145deg, rgba(245, 251, 253, 0.98), rgba(224, 239, 246, 0.94)),
    radial-gradient(circle at 70% 50%, rgba(var(--accent-2-rgb), 0.14), transparent 42%);
  --open-channel-glow: radial-gradient(circle, rgba(var(--accent-2-rgb), 0.14), transparent 70%);
  --responsive-divider: 1px solid rgba(var(--accent-rgb), 0.18);
  --post-card-overlay: linear-gradient(160deg, rgba(255, 255, 255, 0.76), rgba(var(--accent-rgb), 0.06) 62%);
  --post-card-focus-backdrop: rgba(255, 255, 255, 0.96);
}

.signal-deck,
.featured-transmission,
.frequency-router,
.path-card,
.open-channel {
  position: relative;
  overflow: hidden;
}

.signal-deck {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.95fr);
  gap: 28px;
  padding: 30px;
  background: var(--hero-shell-bg);
}

.signal-deck::after {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  top: -18%;
  height: 1px;
  background: var(--hero-scan-line);
  box-shadow: var(--hero-scan-shadow);
  animation: blog-scan 9s linear infinite;
}

.signal-copy {
  position: relative;
  display: grid;
  gap: 16px;
  align-content: center;
}

.signal-copy::before {
  content: '';
  position: absolute;
  inset: 16px auto auto -24px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: var(--hero-copy-glow);
  filter: blur(16px);
  pointer-events: none;
}

.signal-eyebrow,
.section-kicker,
.status-label,
.path-label,
.search-label {
  margin: 0;
  color: var(--accent-2);
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.signal-deck h1,
.featured-transmission h2,
.zone-header h2,
.open-channel h2 {
  margin: 0;
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  line-height: 1.08;
}

.signal-deck h1 {
  max-width: 12ch;
  font-size: clamp(34px, 5vw, 58px);
  text-shadow: var(--hero-title-shadow);
}

.signal-description,
.zone-header p,
.featured-summary,
.open-copy,
.archive-empty p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}

.signal-description {
  max-width: 64ch;
}

.signal-actions,
.open-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.status-module {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-self: stretch;
}

.status-tile {
  min-height: 126px;
  padding: 18px;
  border: var(--status-border);
  border-radius: 18px;
  background: var(--status-bg);
  display: grid;
  gap: 10px;
  align-content: start;
}

.status-value {
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  font-size: clamp(22px, 2.6vw, 30px);
  line-height: 1.15;
  color: var(--text);
  word-break: break-word;
}

.status-value.compact {
  font-size: clamp(18px, 2vw, 24px);
}

.status-meta {
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.featured-transmission {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.82fr);
  gap: 24px;
  padding: 28px;
  border-radius: 22px;
  border-color: var(--featured-border);
  background: var(--featured-premium-bg);
  background-size: auto, auto, 24px 24px, 24px 24px;
}

.featured-transmission::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--featured-overlay);
  opacity: 0.75;
  pointer-events: none;
}

.featured-copy {
  position: relative;
  display: grid;
  gap: 16px;
}

.priority-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px 10px;
  border-radius: 999px;
  border: var(--badge-border);
  background: var(--badge-bg);
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.featured-body {
  display: grid;
  gap: 12px;
  padding-top: 12px;
}

.featured-tag {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--featured-tag-bg);
  color: var(--accent);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.featured-transmission h2 {
  max-width: 16ch;
  font-size: clamp(28px, 4vw, 42px);
}

.featured-headline {
  margin: 0;
  color: var(--text);
  font-size: 18px;
  line-height: 1.6;
}

.featured-meta {
  display: grid;
  gap: 18px;
  align-content: center;
  padding-left: 24px;
  border-left: var(--featured-divider);
}

.signal-index {
  position: relative;
  width: min(100%, 176px);
  min-height: 132px;
  padding: 16px 18px 18px;
  border-radius: 22px;
  border: var(--signal-index-border);
  background: var(--signal-index-bg);
  box-shadow: var(--signal-index-shadow);
  display: grid;
  justify-items: start;
  align-content: space-between;
  gap: 16px;
  overflow: hidden;
}

.signal-index::before,
.signal-index::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.signal-index::before {
  inset: 0;
  background: var(--signal-index-overlay);
}

.signal-index::after {
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--signal-index-orbit);
  box-shadow: inset 0 0 0 6px rgba(var(--accent-rgb), 0.03);
}

.signal-index span,
.featured-facts dt,
.router-count {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.signal-index span {
  position: relative;
  z-index: 1;
  color: var(--accent);
  font-size: 10px;
  letter-spacing: 0.18em;
}

.signal-index strong {
  position: relative;
  z-index: 1;
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  font-size: 52px;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--text);
  text-shadow: var(--signal-index-value-shadow);
}

.featured-facts {
  margin: 0;
  display: grid;
  gap: 12px;
}

.featured-facts div {
  display: grid;
  gap: 4px;
}

.featured-facts dd {
  margin: 0;
  color: var(--text);
  font-size: 15px;
  line-height: 1.6;
}

.frequency-router {
  padding: 18px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px) auto;
  gap: 16px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-chip,
.path-cta {
  min-height: 40px;
  border: 1px solid var(--tag-border);
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease,
    color 0.22s ease;
}

.filter-chip:hover,
.path-cta:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--accent-rgb), 0.44);
}

.filter-chip.active {
  border-color: rgba(var(--accent-rgb), 0.72);
  background: var(--filter-active-bg);
  color: var(--text);
  box-shadow: var(--filter-active-shadow);
}

.search-box {
  display: grid;
  gap: 8px;
}

.search-field {
  min-height: 48px;
  border-radius: 14px;
  border: 1px solid var(--line-strong);
  background: var(--tile-bg);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.search-field:focus-within {
  border-color: rgba(var(--accent-rgb), 0.72);
  box-shadow: var(--focus-ring);
}

.search-prefix {
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.08em;
  font-family: 'JetBrains Mono', monospace;
}

.search-field input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
}

.search-field input::placeholder {
  color: color-mix(in srgb, var(--muted) 80%, transparent);
  font-family: 'JetBrains Mono', monospace;
}

.router-count {
  margin: 0 0 2px;
  text-align: right;
}

.reading-zone,
.archive-zone {
  display: grid;
  gap: 18px;
}

.zone-header {
  display: grid;
  gap: 8px;
}

.zone-header h2 {
  font-size: clamp(24px, 3vw, 34px);
}

.highlight-copy {
  color: var(--accent);
}

.paths-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr 1fr;
  gap: 16px;
  align-items: stretch;
}

.path-card {
  min-height: 220px;
  padding: 22px;
  display: grid;
  gap: 14px;
  align-content: start;
}

.path-card.tall {
  min-height: 256px;
}

.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--path-accent, var(--accent));
  opacity: 0.9;
}

.path-card--cyan {
  --path-accent: var(--path-cyan);
}

.path-card--green {
  --path-accent: var(--path-green);
}

.path-card--amber {
  --path-accent: var(--path-amber);
}

.path-card h3 {
  margin: 0;
  font-size: 20px;
  line-height: 1.55;
}

.path-meta {
  margin-top: auto;
  display: flex;
  align-items: end;
  gap: 8px;
}

.path-meta strong {
  font-family: 'Orbitron', 'Space Grotesk', sans-serif;
  font-size: 28px;
}

.path-meta span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
  font-family: 'JetBrains Mono', monospace;
}

.path-card.active {
  border-color: rgba(var(--accent-rgb), 0.58);
  box-shadow: var(--path-active-shadow);
}

.path-cta {
  width: fit-content;
  background: var(--path-cta-bg);
}

.post-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.archive-empty {
  padding: 24px;
  display: grid;
  gap: 12px;
  justify-items: start;
}

.archive-empty h3 {
  margin: 0;
  max-width: 28ch;
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.3;
}

.open-channel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 26px 28px;
  background: var(--open-channel-bg);
}

.open-channel::before {
  content: '';
  position: absolute;
  inset: auto 12% -40px auto;
  width: 220px;
  height: 140px;
  background: var(--open-channel-glow);
  filter: blur(28px);
  pointer-events: none;
}

.open-channel h2 {
  font-size: clamp(26px, 3.6vw, 40px);
  margin-bottom: 10px;
}

.filter-chip:focus-visible,
.path-cta:focus-visible,
.signal-actions :deep(a:focus-visible),
.signal-actions :deep(button:focus-visible),
.open-actions :deep(a:focus-visible),
.open-actions :deep(button:focus-visible) {
  outline: 0;
  box-shadow: var(--focus-ring);
}

@keyframes blog-scan {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  10% {
    opacity: 0.85;
  }

  60% {
    opacity: 0.4;
  }

  100% {
    transform: translateY(340px);
    opacity: 0;
  }
}

@media (max-width: 980px) {
  .signal-deck,
  .featured-transmission,
  .open-channel,
  .frequency-router {
    grid-template-columns: 1fr;
  }

  .featured-meta {
    padding-left: 0;
    border-left: 0;
    border-top: var(--responsive-divider);
    padding-top: 20px;
  }

  .status-module {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .paths-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .router-count {
    text-align: left;
  }
}

@media (max-width: 760px) {
  .blog-page {
    gap: 20px;
  }

  .signal-deck,
  .featured-transmission,
  .frequency-router,
  .path-card,
  .archive-empty,
  .open-channel {
    padding: 18px;
  }

  .signal-deck h1 {
    max-width: none;
  }

  .status-module {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-tile {
    min-height: 114px;
    padding: 16px;
  }

  .paths-grid,
  .post-grid {
    grid-template-columns: 1fr;
  }

  .search-box,
  .search-field {
    width: 100%;
  }

  .signal-index {
    width: min(100%, 160px);
    min-height: 120px;
    padding: 14px 16px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-deck::after {
    animation: none;
    opacity: 0.24;
  }

  .filter-chip,
  .path-cta,
  .search-field,
  .signal-actions :deep(a),
  .signal-actions :deep(button),
  .open-actions :deep(a),
  .open-actions :deep(button) {
    transition: none;
  }
}
</style>
