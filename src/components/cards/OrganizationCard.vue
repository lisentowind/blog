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
