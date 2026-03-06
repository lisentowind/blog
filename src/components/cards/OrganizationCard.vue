<script setup lang="ts">
import type { GitHubOrg } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  org: GitHubOrg
}>()
</script>

<template>
  <GlassPanel class="org-card" :interactive="true">
    <div class="org-head">
      <img :src="org.avatarUrl" :alt="org.login" />
      <div>
        <h3>
          <a :href="org.profileUrl" target="_blank" rel="noreferrer">{{ org.login }}</a>
        </h3>
        <p>{{ org.description }}</p>
      </div>
    </div>
  </GlassPanel>
</template>

<style scoped>
.org-card {
  padding: 20px;
}

.org-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.org-head img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.32);
}

.org-head h3 {
  margin: 0;
  font-size: 18px;
}

.org-head h3 a:hover {
  color: var(--accent);
}

.org-head p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 760px) {
  .org-card {
    padding: 16px;
  }
}
</style>
