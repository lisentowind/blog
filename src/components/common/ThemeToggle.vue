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

<style scoped>
.theme-toggle {
  border: 1px solid rgba(var(--accent-rgb), 0.5);
  border-radius: 999px;
  padding: 7px 14px;
  color: var(--text);
  background: transparent;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(var(--control-hover-translate-y));
  background: var(--control-hover-bg);
}
</style>
