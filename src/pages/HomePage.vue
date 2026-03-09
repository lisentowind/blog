<script setup lang="ts">
import { computed, onMounted } from 'vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SignalPanel from '../components/common/SignalPanel.vue'
import { useGithubData } from '../composables/useGithubData'
import { blogPosts, labEntries } from '../data/content'

type OverviewCard = {
  key: string
  title: string
  meta: string
  description: string
  action: string
  to: string
}

const { profile, pinnedRepos, organizations, contributionHeatmaps, loading, error, loadGithubData } = useGithubData()

const featuredRepos = computed(() => pinnedRepos.value.slice(0, 3))

const heroStats = computed(() => [
  { value: String(profile.value.publicRepos), label: 'Public Repos' },
  { value: String(profile.value.followers), label: 'Followers' },
  { value: String(profile.value.following), label: 'Following' },
])

const signalItems = computed(() => [
  { label: 'Public Repos', value: String(profile.value.publicRepos) },
  { label: 'Followers', value: String(profile.value.followers), tone: 'good' as const },
  { label: 'Following', value: String(profile.value.following) },
])

const overviewCards = computed<OverviewCard[]>(() => [
  {
    key: 'blog',
    title: 'Blog',
    meta: `${blogPosts.length} 篇文章`,
    description: '把项目复盘、组件封装和工程化思考沉淀成更完整的技术内容。',
    action: '查看文章',
    to: '/blog',
  },
  {
    key: 'lab',
    title: 'Lab',
    meta: `${labEntries.length} 个实验方向`,
    description: '记录正在尝试的动效、内容系统和作品集叙事方案。',
    action: '打开实验室',
    to: '/lab',
  },
  {
    key: 'projects',
    title: 'Projects',
    meta: `${pinnedRepos.value.length} 个固定仓库`,
    description: '仓库列表集中到 Projects 分类页，只保留与仓库相关的内容。',
    action: '查看仓库',
    to: '/projects',
  },
  {
    key: 'about',
    title: 'About',
    meta: `${organizations.value.length} 个组织 · ${contributionHeatmaps.value.length} 年热力图`,
    description: '个人资料、技术标签、组织信息和贡献热力图统一收敛到 About 页面。',
    action: '查看资料',
    to: '/about',
  },
])

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="page home-page">
    <section class="hero reveal" style="--delay: 120ms">
      <div class="hero-copy glass-panel interactive">
        <p class="kicker">GitHub Profile / {{ profile.location }}</p>
        <h1>
          {{ profile.name }}
          <span>@{{ profile.login }}</span>
        </h1>
        <p class="summary">慢一点也没关系，重要的是你始终在向前走。</p>
        <div class="hero-actions">
          <CyberButton :href="profile.profileUrl">Open GitHub</CyberButton>
          <CyberButton variant="outline" to="/blog">Open Blog</CyberButton>
        </div>
        <ul class="stats">
          <li v-for="stat in heroStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <SignalPanel :items="signalItems" subtitle="Realtime data from GitHub API" class="reveal" style="--delay: 220ms" />
    </section>

    <section v-if="error" class="glass-panel status-card reveal" style="--delay: 240ms">
      <h3>GitHub API Error</h3>
      <p>{{ error }}</p>
    </section>

    <SectionTitle
      eyebrow="Pinned Repositories"
      title="固定仓库"
      description="仓库详情会在浏览者打开页面时实时请求 GitHub API。"
    />
    <section class="card-grid repo-grid">
      <PinnedRepoCard
        v-for="(repo, index) in featuredRepos"
        :key="repo.name"
        :repo="repo"
        class="reveal"
        :style="{ '--delay': `${260 + index * 100}ms` }"
      />
      <article v-if="loading && featuredRepos.length === 0" class="glass-panel status-card reveal" style="--delay: 260ms">
        <h3>Loading repositories...</h3>
      </article>
    </section>

    <SectionTitle
      eyebrow="Navigate"
      title="分类浏览"
      description="现在首页保留概览，内容沉淀到 Blog、Lab、Projects、About 四个分区。"
    />
    <section class="overview-grid">
      <article
        v-for="(card, index) in overviewCards"
        :key="card.key"
        class="glass-panel interactive overview-card reveal"
        :style="{ '--delay': `${520 + index * 100}ms` }"
      >
        <div class="overview-head">
          <p>{{ card.meta }}</p>
          <h3>{{ card.title }}</h3>
        </div>
        <p class="overview-desc">{{ card.description }}</p>
        <div class="overview-action">
          <CyberButton variant="outline" :to="card.to">{{ card.action }}</CyberButton>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  align-items: stretch;
}

.hero-copy {
  padding: clamp(22px, 4vw, 38px);
}

.kicker {
  margin: 0;
  color: var(--accent-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 16px 0 0;
  font-size: clamp(32px, 6vw, 62px);
  line-height: 1.05;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.02em;
}

h1 span {
  display: block;
  color: var(--accent);
  text-shadow: var(--hero-title-glow);
}

.summary {
  margin: 16px 0 0;
  max-width: 58ch;
  color: var(--muted);
}

.hero-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stats {
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stats li {
  padding: 10px;
  border: 1px solid rgba(var(--accent-rgb), 0.16);
  border-radius: 12px;
  background: var(--tile-bg);
}

.stats strong {
  display: block;
  font-size: 24px;
  font-family: 'Orbitron', sans-serif;
}

.stats span {
  font-size: 12px;
  color: var(--muted);
}

.repo-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.overview-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.overview-head p {
  margin: 0;
  color: var(--accent);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.overview-head h3 {
  margin: 8px 0 0;
  font-size: 22px;
}

.overview-desc {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.overview-action {
  margin-top: auto;
}

@media (max-width: 1080px) {
  .hero,
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .repo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .hero-copy,
  .overview-card {
    padding: 16px;
  }

  .repo-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
