<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavLink } from '../../data/content'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{
  links: NavLink[]
  brandName: string
  brandAvatar?: string
}>()

const floating = ref(false)
const menuOpen = ref(false)
const route = useRoute()

const onScroll = () => {
  floating.value = window.scrollY > 24
}

const onResize = () => {
  if (window.innerWidth > 900) {
    menuOpen.value = false
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  onScroll()
  onResize()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <div class="nav-wrap">
    <header class="cyber-nav reveal" :class="{ floating, 'menu-open': menuOpen }" style="--delay: 0ms">
      <RouterLink class="brand" to="/">
        <img v-if="brandAvatar" class="brand-avatar" :src="brandAvatar" :alt="brandName" />
        <span v-else class="brand-mark" />
        <span class="brand-name">{{ brandName }}</span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-nav site-actions"
        @click="toggleMenu"
      >
        <span>{{ menuOpen ? 'Close' : 'Menu' }}</span>
      </button>

      <div class="menu-panel" :class="{ open: menuOpen }">
        <nav id="site-nav" class="nav-links">
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

        <div id="site-actions" class="nav-actions">
          <ThemeToggle />
          <RouterLink class="subscribe" to="/about">Contact</RouterLink>
        </div>
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
  min-width: 0;
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
  overflow-wrap: anywhere;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(var(--accent-rgb), 0.42);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.menu-toggle:hover {
  transform: translateY(var(--control-hover-translate-y));
  background: var(--control-hover-bg);
}

.menu-panel {
  display: contents;
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

@media (max-width: 900px) {
  .nav-wrap {
    padding: 8px 10px 0;
  }

  .cyber-nav {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 12px;
  }

  .brand {
    gap: 8px;
  }

  .brand-avatar {
    width: 28px;
    height: 28px;
  }

  .brand-name {
    font-size: 13px;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .menu-panel {
    grid-column: 1 / -1;
    display: grid;
    gap: 8px;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px) scaleY(0.96);
    transform-origin: top center;
    pointer-events: none;
    transition:
      max-height 0.4s cubic-bezier(0.22, 1.2, 0.36, 1),
      opacity 0.22s ease,
      transform 0.4s cubic-bezier(0.18, 1.24, 0.32, 1);
  }

  .menu-panel.open {
    max-height: 320px;
    opacity: 1;
    transform: translateY(0) scaleY(1);
    pointer-events: auto;
  }

  .nav-links,
  .nav-actions {
    width: 100%;
    opacity: 0;
    transform: translateY(-6px);
    transition:
      opacity 0.18s ease,
      transform 0.34s cubic-bezier(0.2, 1.1, 0.3, 1);
  }

  .menu-panel.open .nav-links,
  .menu-panel.open .nav-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-panel.open .nav-links {
    transition-delay: 0.04s;
  }

  .menu-panel.open .nav-actions {
    transition-delay: 0.08s;
  }

  .nav-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding-top: 4px;
  }

  .nav-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .nav-link,
  .subscribe,
  :deep(.theme-toggle) {
    width: 100%;
    min-height: 42px;
    justify-content: center;
    text-align: center;
  }

  .subscribe,
  :deep(.theme-toggle) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 760px) {
  .cyber-nav {
    border-radius: 14px;
  }

  .nav-links,
  .nav-actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .brand-name {
    max-width: 12ch;
    font-size: 12px;
  }

  .menu-toggle {
    padding-inline: 12px;
  }
}
</style>
