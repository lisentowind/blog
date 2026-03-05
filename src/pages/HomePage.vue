<script setup lang="ts">
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SignalPanel from '../components/common/SignalPanel.vue'
import PostCard from '../components/cards/PostCard.vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import ExternalLinkCard from '../components/cards/ExternalLinkCard.vue'
import {
  githubProfile,
  heroStats,
  languageSummary,
  pinnedRepos,
  posts,
  profileLinks,
  skillTags,
} from '../data/content'

const signalItems = [
  { label: 'Public Repos', value: String(githubProfile.publicRepos) },
  { label: 'Followers', value: String(githubProfile.followers), tone: 'good' as const },
  { label: 'Following', value: String(githubProfile.following) },
]

const featuredPosts = posts.slice(0, 3)
const featuredRepos = pinnedRepos.slice(0, 3)
const featuredLinks = profileLinks.slice(0, 2)
const featuredSkills = skillTags.slice(0, 10)
</script>

<template>
  <div class="page home-page">
    <section class="hero reveal" style="--delay: 120ms">
      <div class="hero-copy glass-panel">
        <p class="kicker">GitHub Profile / {{ githubProfile.location }}</p>
        <h1>
          {{ githubProfile.name }}
          <span>@{{ githubProfile.login }}</span>
        </h1>
        <p class="summary">
          这是基于你 GitHub 主页整理的个人站，集中展示置顶仓库、常用技术栈和关键链接。
        </p>
        <div class="hero-actions">
          <CyberButton :href="githubProfile.profileUrl">Open GitHub</CyberButton>
          <CyberButton variant="outline" to="/projects">Pinned Repos</CyberButton>
        </div>
        <ul class="stats">
          <li v-for="stat in heroStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <SignalPanel
        :items="signalItems"
        subtitle="Snapshot from GitHub profile"
        class="reveal"
        style="--delay: 220ms"
      />
    </section>

    <SectionTitle
      eyebrow="Pinned Repositories"
      title="置顶仓库"
      description="来自你的 GitHub 首页置顶仓库，保留仓库链接与关键信息。"
    />
    <section class="card-grid repo-grid">
      <PinnedRepoCard
        v-for="(repo, index) in featuredRepos"
        :key="repo.name"
        :repo="repo"
        class="reveal"
        :style="{ '--delay': `${260 + index * 100}ms` }"
      />
    </section>

    <SectionTitle
      eyebrow="Common Tech"
      title="常用技术"
      description="来自你的个人 README 技术标签和公开仓库语言统计。"
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

    <SectionTitle
      eyebrow="Profile Links"
      title="固定链接"
      description="个人主页和常用项目入口。"
    />
    <section class="card-grid links-grid">
      <ExternalLinkCard
        v-for="(link, index) in featuredLinks"
        :key="link.href"
        :link="link"
        class="reveal"
        :style="{ '--delay': `${740 + index * 90}ms` }"
      />
    </section>

    <SectionTitle
      eyebrow="Latest Logs"
      title="博客内容"
      description="保留博客模块用于后续持续写作。"
    />
    <section class="card-grid posts-grid">
      <PostCard
        v-for="(post, index) in featuredPosts"
        :key="post.title"
        :post="post"
        class="reveal"
        :style="{ '--delay': `${900 + index * 100}ms` }"
      />
    </section>
  </div>
</template>
