<script setup lang="ts">
import ExternalLinkCard from '../components/cards/ExternalLinkCard.vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { pinnedRepos, profileLinks, skillTags } from '../data/content'

const highlightedSkills = skillTags.slice(0, 12)
</script>

<template>
  <div class="page projects-page">
    <SectionTitle
      eyebrow="GitHub Pinned"
      title="置顶仓库与链接"
      description="完整展示你的 6 个置顶仓库，以及常用外链入口。"
    />

    <section class="card-grid repo-grid">
      <PinnedRepoCard
        v-for="(repo, index) in pinnedRepos"
        :key="repo.name"
        :repo="repo"
        class="reveal"
        :style="{ '--delay': `${120 + index * 80}ms` }"
      />
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
