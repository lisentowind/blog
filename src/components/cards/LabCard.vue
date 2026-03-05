<script setup lang="ts">
import type { LabEntry } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  entry: LabEntry
}>()
</script>

<template>
  <GlassPanel class="lab-card" :interactive="true">
    <div class="lab-top">
      <h3>{{ entry.name }}</h3>
      <span>{{ entry.stage }}</span>
    </div>
    <h4>{{ entry.headline }}</h4>
    <p>{{ entry.details }}</p>
  </GlassPanel>
</template>
