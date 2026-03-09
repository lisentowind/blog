<script setup lang="ts">
import { computed } from 'vue'
import LabCard from '../components/cards/LabCard.vue'
import SectionTitle from '../components/common/SectionTitle.vue'
import { labEntries } from '../data/content'

const stageStats = computed(() => {
  const counter = new Map<string, number>()

  labEntries.forEach((entry) => {
    counter.set(entry.stage, (counter.get(entry.stage) ?? 0) + 1)
  })

  return Array.from(counter.entries()).map(([stage, total]) => ({ stage, total }))
})
</script>

<template>
  <div class="page lab-page">
    <SectionTitle
      eyebrow="Lab"
      title="实验室"
      description="这里放一些正在探索、还没完全收口、但值得公开记录的方向。"
    />

    <section class="lab-hero">
      <article class="glass-panel interactive lab-intro reveal" style="--delay: 120ms">
        <p class="kicker">Why Lab</p>
        <h2>把半成品、方向判断和试验过程也留下来。</h2>
        <p>
          博客适合写完整文章，Lab 更适合记录正在尝试的东西。它不要求每次都有结论，但能持续展示你的兴趣和判断路径。
        </p>
      </article>

      <article class="glass-panel interactive lab-stats reveal" style="--delay: 180ms">
        <h3>当前状态</h3>
        <ul>
          <li v-for="item in stageStats" :key="item.stage">
            <strong>{{ item.total }}</strong>
            <span>{{ item.stage }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="card-grid lab-grid">
      <LabCard
        v-for="(entry, index) in labEntries"
        :key="entry.name"
        :entry="entry"
        class="reveal"
        :style="{ '--delay': `${220 + index * 90}ms` }"
      />
    </section>
  </div>
</template>

<style scoped>
.lab-hero {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 16px;
}

.lab-intro,
.lab-stats {
  padding: 20px;
}

.kicker {
  margin: 0;
  color: var(--accent-2);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.lab-intro h2 {
  margin: 12px 0;
  font-size: clamp(28px, 4vw, 40px);
}

.lab-intro p:last-child {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.lab-stats h3 {
  margin: 0 0 14px;
}

.lab-stats ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.lab-stats li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(var(--accent-rgb), 0.18);
  background: var(--tile-bg);
}

.lab-stats strong {
  font-size: 20px;
  font-family: 'Orbitron', sans-serif;
}

.lab-stats span {
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
}

.lab-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 1080px) {
  .lab-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .lab-hero,
  .lab-grid {
    grid-template-columns: 1fr;
  }

  .lab-intro,
  .lab-stats {
    padding: 16px;
  }
}
</style>
