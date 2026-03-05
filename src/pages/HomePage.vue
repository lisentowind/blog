<script setup lang="ts">
import CyberButton from '../components/common/CyberButton.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SignalPanel from '../components/common/SignalPanel.vue'
import PostCard from '../components/cards/PostCard.vue'
import ProjectCard from '../components/cards/ProjectCard.vue'
import { heroStats, posts, projects } from '../data/content'

const signalItems = [
  { label: 'Writing Queue', value: '04 ACTIVE' },
  { label: 'Build Health', value: '99.98%', tone: 'good' as const },
  { label: 'AI Runs Today', value: '27' },
]

const featuredPosts = posts.slice(0, 3)
const featuredProjects = projects.slice(0, 3)
</script>

<template>
  <div class="page home-page">
    <section class="hero reveal" style="--delay: 120ms">
      <div class="hero-copy glass-panel">
        <p class="kicker">Personal Tech Journal / Shanghai</p>
        <h1>
          构建、拆解、重组
          <span>下一代 Web 体验</span>
        </h1>
        <p class="summary">
          这里记录前端工程、AI 工具链和产品实验。每篇内容尽量包含可复现方案、性能数据和失败复盘。
        </p>
        <div class="hero-actions">
          <CyberButton to="/blog">Read Latest</CyberButton>
          <CyberButton variant="outline" to="/lab">Open Lab Notes</CyberButton>
        </div>
        <ul class="stats">
          <li v-for="stat in heroStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <SignalPanel :items="signalItems" subtitle="Realtime status / UTC+8" class="reveal" style="--delay: 220ms" />
    </section>

    <SectionTitle
      eyebrow="Latest Logs"
      title="最新博客"
      description="精选最近更新的文章，偏工程实践和交互体验。"
    />
    <section class="card-grid posts-grid">
      <PostCard
        v-for="(post, index) in featuredPosts"
        :key="post.title"
        :post="post"
        class="reveal"
        :style="{ '--delay': `${260 + index * 100}ms` }"
      />
    </section>

    <SectionTitle
      eyebrow="Builds & Experiments"
      title="项目档案"
      description="持续维护的项目与近期正在优化的系统。"
    />
    <section class="card-grid projects-grid">
      <ProjectCard
        v-for="(project, index) in featuredProjects"
        :key="project.name"
        :project="project"
        class="reveal"
        :style="{ '--delay': `${560 + index * 100}ms` }"
      />
    </section>

    <section class="ticker-wrap glass-panel reveal" style="--delay: 860ms">
      <div class="ticker-track">
        <span>TypeScript Strict Mode</span>
        <span>Motion Design</span>
        <span>WebGPU Exploration</span>
        <span>AI Workflow</span>
        <span>Edge Runtime</span>
        <span>DX Automation</span>
        <span>TypeScript Strict Mode</span>
        <span>Motion Design</span>
      </div>
    </section>
  </div>
</template>
