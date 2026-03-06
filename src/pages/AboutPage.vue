<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ContributionHeatmapCard from '../components/cards/ContributionHeatmapCard.vue'
import OrganizationCard from '../components/cards/OrganizationCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SkillTagList from '../components/common/SkillTagList.vue'
import { useGithubData } from '../composables/useGithubData'
import { aboutBullets, profileLinks, skillTags } from '../data/content'

const { profile, languageSummary, organizations, contributionHeatmaps, error, loadGithubData } = useGithubData()

const selectedYear = ref('')

const yearOptions = computed(() => contributionHeatmaps.value.map((item) => item.year))
const selectedHeatmap = computed(
  () => contributionHeatmaps.value.find((item) => item.year === selectedYear.value) ?? null,
)

watch(
  yearOptions,
  (years) => {
    if (years.length === 0) {
      selectedYear.value = ''
      return
    }
    if (!years.includes(selectedYear.value)) {
      selectedYear.value = years[0] ?? ''
    }
  },
  { immediate: true },
)

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="page about-page">
    <SectionTitle eyebrow="About" title="关于我" description="信息在浏览者访问时从 GitHub API 实时获取。" />

    <section class="about-grid">
      <article class="glass-panel reveal" style="--delay: 120ms">
        <div class="profile-head">
          <img :src="profile.avatarUrl" :alt="profile.login" />
          <div>
            <h3>{{ profile.name }}</h3>
            <p>@{{ profile.login }}</p>
            <p>{{ profile.location }}</p>
          </div>
        </div>

        <ul class="about-list">
          <li v-for="item in aboutBullets" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="glass-panel reveal" style="--delay: 220ms">
        <h3>常用技术</h3>
        <SkillTagList :skills="skillTags" />
      </article>

      <article class="glass-panel reveal" style="--delay: 320ms">
        <h3>GitHub 快照</h3>
        <ul class="simple-stats">
          <li>
            <strong>{{ profile.publicRepos }}</strong>
            <span>Public Repos</span>
          </li>
          <li>
            <strong>{{ profile.followers }}</strong>
            <span>Followers</span>
          </li>
          <li>
            <strong>{{ profile.following }}</strong>
            <span>Following</span>
          </li>
          <li v-for="item in languageSummary" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <p class="snapshot-date">Snapshot: {{ profile.snapshotDate }}</p>
      </article>
    </section>

    <SectionTitle
      eyebrow="Organizations"
      title="加入的组织"
      description="优先展示 GitHub 公开组织，同时补充你置顶仓库关联的组织。"
    />
    <section class="card-grid org-grid">
      <OrganizationCard
        v-for="(org, index) in organizations"
        :key="org.login"
        :org="org"
        class="reveal"
        :style="{ '--delay': `${180 + index * 90}ms` }"
      />

      <article v-if="organizations.length === 0" class="glass-panel status-card reveal" style="--delay: 180ms">
        <h3>暂无公开组织</h3>
        <p>你的 GitHub 当前没有可公开读取的组织信息。</p>
      </article>
    </section>

    <SectionTitle
      eyebrow="Contribution Calendar"
      title="提交热力图"
      description="支持切换年份查看每日提交强度。"
    />

    <section class="heatmap-switcher glass-panel reveal" style="--delay: 220ms">
      <label class="year-picker">
        <span>年份</span>
        <select v-model="selectedYear">
          <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
        </select>
      </label>
    </section>

    <section class="card-grid heatmap-year-grid">
      <ContributionHeatmapCard v-if="selectedHeatmap" :heatmap="selectedHeatmap" class="reveal" style="--delay: 260ms" />

      <article
        v-if="!selectedHeatmap"
        class="glass-panel status-card reveal"
        style="--delay: 260ms"
      >
        <h3>热力图数据暂不可用</h3>
        <p>贡献日历 API 没有返回数据，请稍后刷新重试。</p>
      </article>
    </section>

    <section v-if="error" class="glass-panel status-card reveal" style="--delay: 380ms">
      <h3>GitHub API Notice</h3>
      <p>{{ error }}</p>
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
