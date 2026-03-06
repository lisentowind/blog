<script setup lang="ts">
import { onMounted } from 'vue'
import PinnedRepoCard from '../components/cards/PinnedRepoCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { useGithubData } from '../composables/useGithubData'

const { pinnedRepos, loading, error, loadGithubData } = useGithubData()

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="page projects-page">
    <SectionTitle
      eyebrow="GitHub Repositories"
      title="固定仓库"
      description="该分类页仅保留仓库列表，避免和其它页面重复展示。"
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
      <article v-else-if="!loading && pinnedRepos.length === 0" class="glass-panel status-card reveal" style="--delay: 120ms">
        <h3>No repositories yet</h3>
        <p>当前没有可展示的固定仓库。</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
.repo-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1080px) {
  .repo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .repo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
