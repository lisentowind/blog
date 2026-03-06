<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ContributionHeatmapCard from '../components/cards/ContributionHeatmapCard.vue'
import OrganizationCard from '../components/cards/OrganizationCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SkillTagList from '../components/common/SkillTagList.vue'
import { useGithubData } from '../composables/useGithubData'
import { aboutBullets, skillTags } from '../data/content'

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
    <SectionTitle eyebrow="About" title="关于我" description="个人资料、组织信息与贡献热力图集中在这个分类页。" />

    <section class="about-grid">
      <article class="glass-panel interactive profile-card reveal" style="--delay: 120ms">
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

      <article class="glass-panel interactive skills-card reveal" style="--delay: 220ms">
        <h3>常用技术</h3>
        <SkillTagList :skills="skillTags" />
      </article>

      <article class="glass-panel interactive snapshot-card reveal" style="--delay: 320ms">
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
  </div>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.profile-card,
.skills-card,
.snapshot-card {
  padding: 20px;
}

.profile-card h3,
.skills-card h3,
.snapshot-card h3 {
  margin: 0 0 12px;
  font-size: 22px;
}

.profile-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.profile-head img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.42);
}

.profile-head h3 {
  margin: 0;
}

.profile-head p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.about-list {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  line-height: 1.7;
}

.simple-stats {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.simple-stats li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  border-radius: 12px;
  background: var(--tile-bg);
}

.simple-stats strong {
  font-size: 18px;
  font-family: 'Orbitron', sans-serif;
}

.simple-stats span {
  font-size: 12px;
  color: var(--muted);
}

.snapshot-date {
  margin-top: 12px;
  color: var(--muted);
  font-size: 12px;
}

.org-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.heatmap-switcher {
  padding: 14px 16px;
}

.year-picker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.year-picker span {
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
}

.year-picker select {
  padding: 7px 10px;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  background: var(--tile-bg);
  color: var(--text);
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
}

.year-picker select:focus {
  outline: 2px solid var(--line-strong);
  outline-offset: 1px;
}

.heatmap-year-grid {
  grid-template-columns: 1fr;
}

@media (max-width: 1080px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .org-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .profile-card,
  .skills-card,
  .snapshot-card,
  .heatmap-switcher {
    padding: 16px;
  }

  .org-grid {
    grid-template-columns: 1fr;
  }
}
</style>
