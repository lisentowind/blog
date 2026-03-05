<script setup lang="ts">
import SectionTitle from '../components/common/SectionTitle.vue'
import { aboutBullets, skillTags } from '../data/content'
</script>

<template>
  <div class="page about-page">
    <SectionTitle
      eyebrow="About"
      title="关于我"
      description="偏工程和设计交叉的开发者，喜欢做高信息密度但可读性强的产品界面。"
    />

    <section class="about-grid">
      <article class="glass-panel reveal" style="--delay: 120ms">
        <h3>Profile</h3>
        <ul class="about-list">
          <li v-for="item in aboutBullets" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="glass-panel reveal" style="--delay: 220ms">
        <h3>Skills</h3>
        <div class="skill-tags">
          <span v-for="skill in skillTags" :key="skill">{{ skill }}</span>
        </div>
      </article>

      <article class="glass-panel reveal" style="--delay: 320ms">
        <h3>Contact</h3>
        <p>欢迎交流项目合作、前端架构与 AI 工作流实践。</p>
        <p>Email: hello@tfnexus.dev</p>
        <p>GitHub: github.com/tf-nexus</p>
      </article>
    </section>
  </div>
</template>
