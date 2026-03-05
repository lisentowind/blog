<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { NavLink } from '../../data/content'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{
  links: NavLink[]
  brandName: string
}>()

const floating = ref(false)

const onScroll = () => {
  floating.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="nav-wrap">
    <header class="cyber-nav reveal" :class="{ floating }" style="--delay: 0ms">
      <RouterLink class="brand" to="/">
        <span class="brand-mark" />
        <span class="brand-name">{{ brandName }}</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="nav-actions">
        <ThemeToggle />
        <RouterLink class="subscribe" to="/about">Contact</RouterLink>
      </div>
    </header>
  </div>
</template>
