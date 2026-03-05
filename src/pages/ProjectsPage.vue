<script setup lang="ts">
import ProjectCard from '../components/cards/ProjectCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { projects } from '../data/content'

const milestones = [
  'Q1: 重构内容后台，统一项目发布流程。',
  'Q2: 增加实验数据看板和自动周报。',
  'Q3: 开放部分组件库与模板。',
]
</script>

<template>
  <div class="page projects-page">
    <SectionTitle
      eyebrow="Projects"
      title="项目与作品"
      description="把文章中的思路变成可运行项目，持续迭代。"
    />

    <section class="card-grid projects-grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.name"
        :project="project"
        class="reveal"
        :style="{ '--delay': `${120 + index * 90}ms` }"
      />
    </section>

    <section class="roadmap glass-panel reveal" style="--delay: 560ms">
      <h3>Roadmap</h3>
      <ul>
        <li v-for="item in milestones" :key="item">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>
