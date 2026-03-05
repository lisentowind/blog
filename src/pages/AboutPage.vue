<script setup lang="ts">
import SectionTitle from '../components/common/SectionTitle.vue'
import { aboutBullets, githubProfile, languageSummary, profileLinks, skillTags } from '../data/content'
</script>

<template>
  <div class="page about-page">
    <SectionTitle
      eyebrow="About"
      title="关于我"
      description="信息来自 GitHub 主页与个人 README。"
    />

    <section class="about-grid">
      <article class="glass-panel reveal" style="--delay: 120ms">
        <div class="profile-head">
          <img :src="githubProfile.avatarUrl" :alt="githubProfile.login" />
          <div>
            <h3>{{ githubProfile.name }}</h3>
            <p>@{{ githubProfile.login }}</p>
            <p>{{ githubProfile.location }}</p>
          </div>
        </div>

        <ul class="about-list">
          <li v-for="item in aboutBullets" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="glass-panel reveal" style="--delay: 220ms">
        <h3>常用技术</h3>
        <div class="skill-tags">
          <span v-for="skill in skillTags" :key="skill">{{ skill }}</span>
        </div>
      </article>

      <article class="glass-panel reveal" style="--delay: 320ms">
        <h3>GitHub 快照</h3>
        <ul class="simple-stats">
          <li>
            <strong>{{ githubProfile.publicRepos }}</strong>
            <span>Public Repos</span>
          </li>
          <li>
            <strong>{{ githubProfile.followers }}</strong>
            <span>Followers</span>
          </li>
          <li>
            <strong>{{ githubProfile.following }}</strong>
            <span>Following</span>
          </li>
          <li v-for="item in languageSummary" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <p class="snapshot-date">Snapshot: {{ githubProfile.snapshotDate }}</p>
      </article>
    </section>

    <section class="about-links glass-panel reveal" style="--delay: 420ms">
      <h3>固定链接</h3>
      <div class="inline-links">
        <a v-for="link in profileLinks" :key="link.href" :href="link.href" target="_blank" rel="noreferrer">
          <span>{{ link.label }}</span>
          <small>{{ link.note }}</small>
        </a>
      </div>
    </section>
  </div>
</template>
