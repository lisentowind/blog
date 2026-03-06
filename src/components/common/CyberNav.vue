<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { NavLink } from '../../data/content'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{
  links: NavLink[]
  brandName: string
  brandAvatar?: string
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
        <img v-if="brandAvatar" class="brand-avatar" :src="brandAvatar" :alt="brandName" />
        <span v-else class="brand-mark" />
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

<style scoped>
.nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 12px clamp(12px, 3vw, 44px) 0;
  pointer-events: none;
}

.cyber-nav {
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid rgba(var(--accent-rgb), 0.24);
  background: var(--nav-bg);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: var(--nav-edge-glow);
  pointer-events: auto;
  transition: max-width 0.32s ease, background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.cyber-nav.floating {
  max-width: 1280px;
  background: var(--nav-bg-floating);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-color: var(--line-strong);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: var(--brand-mark-glow);
}

.brand-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(var(--accent-rgb), 0.45);
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.35);
}

.brand-name {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
  font-size: 14px;
}

.nav-links {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-link {
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--muted);
  transition: color 0.25s ease, background 0.25s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.12);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subscribe {
  border: 1px solid rgba(var(--accent-rgb), 0.5);
  border-radius: 999px;
  padding: 7px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.subscribe:hover {
  transform: translateY(var(--control-hover-translate-y));
  background: var(--control-hover-bg);
}

@media (max-width: 760px) {
  .nav-wrap {
    padding: 8px 10px 0;
  }

  .cyber-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding: 12px;
  }

  .nav-links,
  .nav-actions {
    width: 100%;
  }

  .nav-links {
    gap: 8px;
  }

  .nav-actions {
    justify-content: center;
  }
}
</style>
