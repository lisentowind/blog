<script setup lang="ts">
import LabCard from '../components/cards/LabCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import SignalPanel from '../components/common/SignalPanel.vue'
import { labEntries } from '../data/content'

const signalItems = [
  { label: 'Running Experiments', value: '03' },
  { label: 'Avg. Build Time', value: '1.8s', tone: 'good' as const },
  { label: 'Last Deploy', value: '12 mins ago' },
]
</script>

<template>
  <div class="page lab-page">
    <SectionTitle
      eyebrow="Lab"
      title="实验场"
      description="记录正在探索的交互、渲染和 AI 工具链实验。"
    />

    <div class="lab-top-grid">
      <section class="card-grid lab-grid">
        <LabCard
          v-for="(entry, index) in labEntries"
          :key="entry.name"
          :entry="entry"
          class="reveal"
          :style="{ '--delay': `${140 + index * 110}ms` }"
        />
      </section>

      <SignalPanel :items="signalItems" subtitle="Lab metrics / updated each second" class="reveal" style="--delay: 360ms" />
    </div>

    <section class="ticker-wrap glass-panel reveal" style="--delay: 620ms">
      <div class="ticker-track">
        <span>Shader Tuning</span>
        <span>Agent Replay</span>
        <span>Stream Parser</span>
        <span>State Snapshot</span>
        <span>Render Budget</span>
        <span>Typed Prompting</span>
        <span>Shader Tuning</span>
        <span>Agent Replay</span>
      </div>
    </section>
  </div>
</template>
