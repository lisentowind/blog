<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import GlassPanel from './GlassPanel.vue'

type SignalItem = {
  label: string
  value: string
  tone?: 'normal' | 'good' | 'warn'
}

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    items: SignalItem[]
  }>(),
  {
    title: 'LIVE SYSTEM FEED',
    subtitle: 'UTC+8',
  },
)

const now = ref('')
let timer: ReturnType<typeof setInterval> | undefined

const updateNow = () => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  now.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

onMounted(() => {
  updateNow()
  timer = setInterval(updateNow, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <GlassPanel class="signal-card">
    <div class="scanline" />
    <p class="panel-title">{{ title }}</p>
    <p class="now-time">{{ now }}</p>
    <p class="panel-sub">{{ subtitle }}</p>
    <div class="signal-list">
      <div v-for="item in items" :key="item.label">
        <span>{{ item.label }}</span>
        <b :class="item.tone">{{ item.value }}</b>
      </div>
    </div>
    <div class="ring" />
  </GlassPanel>
</template>

<style scoped>
.signal-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--signal-bg);
}

.scanline {
  position: absolute;
  left: 0;
  width: 100%;
  height: 72px;
  background: linear-gradient(to bottom, transparent, rgba(var(--accent-rgb), 0.16), transparent);
  animation: sweep 5s linear infinite;
}

.panel-title {
  margin: 0;
  color: var(--accent-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
}

.now-time {
  margin: 2px 0 0;
  font-size: 17px;
  font-family: 'JetBrains Mono', monospace;
}

.panel-sub {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.signal-list {
  display: grid;
  gap: 10px;
  margin-top: 4px;
}

.signal-list div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(var(--accent-rgb), 0.18);
  background: var(--tile-bg);
}

.signal-list span {
  font-size: 13px;
  color: var(--muted);
}

.signal-list b {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}

.signal-list b.good {
  color: var(--accent-2);
}

.signal-list b.warn {
  color: var(--warn);
}

.ring {
  position: absolute;
  right: -88px;
  bottom: -96px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.24);
  animation: spin 18s linear infinite;
}

@media (max-width: 760px) {
  .signal-card {
    padding: 16px;
  }
}
</style>
