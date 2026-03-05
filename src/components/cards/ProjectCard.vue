<script setup lang="ts">
import type { Project } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <GlassPanel class="project-card" :interactive="true">
    <div class="project-top">
      <h3>{{ project.name }}</h3>
      <span class="status">{{ project.status }}</span>
    </div>
    <p class="role">{{ project.role }}</p>
    <p>{{ project.desc }}</p>
    <ul>
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
  </GlassPanel>
</template>
