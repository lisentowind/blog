<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
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

const { profile, displayName, loadGithubData } = useGithubData()
const brandLabel = computed(() => `${displayName.value} 博客`)

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

watch(
  [brandLabel, () => profile.value.avatarUrl],
  ([label, avatarUrl]) => {
    document.title = label

    const icon =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    icon.href = avatarUrl

    if (!icon.parentNode) {
      document.head.appendChild(icon)
    }
  },
  { immediate: true },
)
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

    <CyberNav :links="navLinks" :brand-name="brandLabel" :brand-avatar="profile.avatarUrl" />

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

<style scoped>
.cyber-shell {
  position: relative;
  min-height: 100vh;
  padding: 6px clamp(12px, 3vw, 44px) 32px;
  background: var(--shell-bg);
}

.ambient {
  position: absolute;
  border-radius: 50%;
  filter: blur(58px);
  opacity: 0.45;
  pointer-events: none;
}

.ambient-a {
  width: 500px;
  height: 500px;
  top: -180px;
  right: -120px;
  background: var(--ambient-a-color);
  animation: drift 12s ease-in-out infinite;
}

.ambient-b {
  width: 420px;
  height: 420px;
  left: -120px;
  bottom: -200px;
  background: var(--ambient-b-color);
  animation: drift 16s ease-in-out infinite reverse;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at center, #000 12%, transparent 84%);
  opacity: var(--grid-opacity);
  pointer-events: none;
}

.circuit-overlay {
  position: absolute;
  inset: 0;
  opacity: var(--circuit-opacity);
  pointer-events: none;
  background-image:
    radial-gradient(circle at 16% 22%, var(--circuit-node) 0 2px, transparent 2.4px),
    radial-gradient(circle at 74% 18%, var(--circuit-node) 0 2px, transparent 2.4px),
    radial-gradient(circle at 64% 72%, var(--circuit-node) 0 2px, transparent 2.4px),
    radial-gradient(circle at 24% 76%, var(--circuit-node) 0 2px, transparent 2.4px),
    linear-gradient(90deg, transparent 0 7%, var(--circuit-trace) 7% 7.2%, transparent 7.2% 100%),
    linear-gradient(0deg, transparent 0 14%, var(--circuit-trace) 14% 14.2%, transparent 14.2% 100%),
    linear-gradient(90deg, transparent 0 78%, var(--circuit-trace) 78% 78.2%, transparent 78.2% 100%),
    linear-gradient(0deg, transparent 0 68%, var(--circuit-trace) 68% 68.2%, transparent 68.2% 100%),
    repeating-linear-gradient(
      115deg,
      transparent 0 22px,
      rgba(63, 164, 220, 0.14) 22px 23px,
      transparent 23px 46px
    );
  background-size:
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    240px 180px,
    220px 220px,
    260px 200px,
    300px 260px,
    420px 320px;
  mix-blend-mode: var(--circuit-blend);
  animation: circuit-shift var(--circuit-speed) linear infinite;
}

.dot-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dot {
  position: absolute;
  border-radius: 999px;
  background: var(--dot-color);
  box-shadow: var(--dot-shadow);
  opacity: 0.35;
  animation-name: twinkle;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.site-footer {
  position: relative;
  z-index: 5;
  max-width: var(--max);
  margin: 20px auto 0;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: var(--muted);
}

.site-footer a {
  color: var(--accent);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}

@media (max-width: 760px) {
  .cyber-shell {
    padding: 6px 10px 24px;
  }

  .site-footer {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
