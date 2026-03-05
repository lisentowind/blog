<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ExternalLinkCard from '../components/cards/ExternalLinkCard.vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SignalPanel from '../components/common/SignalPanel.vue'
import { useGithubData } from '../composables/useGithubData'
import { profileLinks, skillTags } from '../data/content'

const { profile, pinnedRepos, languageSummary, loading, error, loadGithubData } = useGithubData()

const featuredRepos = computed(() => pinnedRepos.value.slice(0, 3))
const featuredLinks = profileLinks.slice(0, 2)
const featuredSkills = skillTags.slice(0, 10)

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

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="page home-page">
    <section class="hero reveal" style="--delay: 120ms">
      <div class="hero-copy glass-panel">
        <p class="kicker">GitHub Profile / {{ profile.location }}</p>
        <h1>
          {{ profile.name }}
          <span>@{{ profile.login }}</span>
        </h1>
        <p class="summary">进入页面后实时从 GitHub API 拉取你的最新资料、仓库和语言统计。</p>
        <div class="hero-actions">
          <CyberButton :href="profile.profileUrl">Open GitHub</CyberButton>
          <CyberButton variant="outline" to="/projects">Open Repositories</CyberButton>
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
      eyebrow="Common Tech"
      title="常用技术"
      description="技能标签来自个人介绍，语言分布来自实时仓库统计。"
    />
    <section class="skill-summary-grid">
      <article class="glass-panel reveal" style="--delay: 520ms">
        <h3>Stack Tags</h3>
        <div class="skill-tags">
          <span v-for="skill in featuredSkills" :key="skill">{{ skill }}</span>
        </div>
      </article>

      <article class="glass-panel reveal" style="--delay: 620ms">
        <h3>Language Snapshot</h3>
        <ul class="simple-stats">
          <li v-for="item in languageSummary" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </article>
    </section>

    <SectionTitle eyebrow="Profile Links" title="固定链接" description="个人主页和常用项目入口。" />
    <section class="card-grid links-grid">
      <ExternalLinkCard
        v-for="(link, index) in featuredLinks"
        :key="link.href"
        :link="link"
        class="reveal"
        :style="{ '--delay': `${740 + index * 90}ms` }"
      />
    </section>
  </div>
</template>
