<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import CyberNav from '../components/common/CyberNav.vue'
import { useGithubData } from '../composables/useGithubData'
import { navLinks } from '../data/content'

type Dot = {
  top: string
  left: string
  size: string
  delay: string
  duration: string
}

const { displayName, loadGithubData } = useGithubData()

const dots: Dot[] = Array.from({ length: 30 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 1}px`,
  delay: `${Math.random() * 6}s`,
  duration: `${Math.random() * 4 + 4}s`,
}))

onMounted(() => {
  void loadGithubData()
})
</script>

<template>
  <div class="cyber-shell">
    <div class="ambient ambient-a" />
    <div class="ambient ambient-b" />
    <div class="grid-overlay" />
    <div class="circuit-overlay" />

    <div class="dot-layer" aria-hidden="true">
      <span
        v-for="(dot, index) in dots"
        :key="`dot-${index}`"
        class="dot"
        :style="{
          top: dot.top,
          left: dot.left,
          width: dot.size,
          height: dot.size,
          animationDelay: dot.delay,
          animationDuration: dot.duration,
        }"
      />
    </div>

    <CyberNav :links="navLinks" :brand-name="displayName" />

    <main class="page-main">
      <RouterView v-slot="{ Component, route }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <footer class="site-footer glass-panel reveal">
      <p>© 2026 {{ displayName }} / GitHub Portfolio</p>
      <RouterLink to="/about">Back to profile</RouterLink>
    </footer>
  </div>
</template>
