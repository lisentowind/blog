<script setup lang="ts">
import { onMounted } from 'vue'
import ExternalLinkCard from '../components/cards/ExternalLinkCard.vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { useGithubData } from '../composables/useGithubData'
import { profileLinks, skillTags } from '../data/content'

const { pinnedRepos, loading, error, loadGithubData } = useGithubData()
const highlightedSkills = skillTags.slice(0, 12)

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="page projects-page">
    <SectionTitle
      eyebrow="GitHub Repositories"
      title="固定仓库与链接"
      description="仓库卡片信息由 GitHub API 动态返回。"
    />

    <section v-if="error" class="glass-panel status-card reveal" style="--delay: 120ms">
      <h3>GitHub API Error</h3>
      <p>{{ error }}</p>
    </section>

    <section class="card-grid repo-grid">
      <PinnedRepoCard
        v-for="(repo, index) in pinnedRepos"
        :key="repo.name"
        :repo="repo"
        class="reveal"
        :style="{ '--delay': `${120 + index * 80}ms` }"
      />
      <article v-if="loading && pinnedRepos.length === 0" class="glass-panel status-card reveal" style="--delay: 120ms">
        <h3>Loading repositories...</h3>
      </article>
    </section>

    <section class="tech-wall glass-panel reveal" style="--delay: 620ms">
      <h3>常用技术栈</h3>
      <div class="skill-tags">
        <span v-for="tag in highlightedSkills" :key="tag">{{ tag }}</span>
      </div>
    </section>

    <SectionTitle eyebrow="Links" title="固定链接" description="主页、个人仓库与项目演示入口。" />
    <section class="card-grid links-grid">
      <ExternalLinkCard
        v-for="(link, index) in profileLinks"
        :key="link.href"
        :link="link"
        class="reveal"
        :style="{ '--delay': `${760 + index * 80}ms` }"
      />
    </section>
  </div>
</template>
