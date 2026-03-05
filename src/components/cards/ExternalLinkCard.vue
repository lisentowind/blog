<script setup lang="ts">
import type { ProfileLink } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

defineProps<{
  link: ProfileLink
}>()
</script>

<template>
  <GlassPanel class="external-link-card" :interactive="true">
    <h3>{{ link.label }}</h3>
    <p>{{ link.note }}</p>
    <a :href="link.href" target="_blank" rel="noreferrer">{{ link.href }}</a>
  </GlassPanel>
</template>
