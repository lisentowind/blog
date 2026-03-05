<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { theme, initTheme, toggleTheme } = useTheme()

const buttonLabel = computed(() => (theme.value === 'dark' ? 'Dark' : 'Light'))

onMounted(() => {
  initTheme()
})
</script>

<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    {{ buttonLabel }}
  </button>
</template>
