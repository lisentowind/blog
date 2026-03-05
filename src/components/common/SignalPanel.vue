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
