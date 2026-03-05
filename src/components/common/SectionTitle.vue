<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="section-title reveal">
    <p>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="desc">{{ description }}</p>
  </header>
</template>
