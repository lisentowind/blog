<script setup lang="ts">
import { computed } from 'vue'
import type { ContributionYearHeatmap } from '../../data/content'
import GlassPanel from '../common/GlassPanel.vue'

type HeatCell = {
  key: string
  date: string
  count: number
  level: number
  empty: boolean
}

const props = defineProps<{
  heatmap: ContributionYearHeatmap
}>()

const cells = computed<HeatCell[]>(() => {
  const year = Number(props.heatmap.year)
  const firstWeekday = new Date(Date.UTC(year, 0, 1)).getUTCDay()

  const placeholders: HeatCell[] = Array.from({ length: firstWeekday }, (_, index) => ({
    key: `p-${index}`,
    date: '',
    count: 0,
    level: 0,
    empty: true,
  }))

  const dayCells: HeatCell[] = props.heatmap.days.map((day) => ({
    key: day.date,
    date: day.date,
    count: day.count,
    level: day.level,
    empty: false,
  }))

  return [...placeholders, ...dayCells]
})

const weekColumns = computed(() => Math.max(1, Math.ceil(cells.value.length / 7)))

const formatTitle = (cell: HeatCell) => {
  if (cell.empty) return ''
  return `${cell.date}: ${cell.count} contributions`
}
</script>

<template>
  <GlassPanel class="heatmap-card" :interactive="true">
    <div class="heatmap-head">
      <h3>{{ heatmap.year }}</h3>
      <span>{{ heatmap.total }} contributions</span>
    </div>

    <div class="heatmap-scroll">
      <div class="heatmap-grid" :style="{ '--weeks': String(weekColumns) }">
        <span
          v-for="cell in cells"
          :key="cell.key"
          class="heat-cell"
          :class="[
            cell.empty ? 'is-empty' : '',
            !cell.empty ? `level-${cell.level}` : '',
          ]"
          :title="formatTitle(cell)"
        />
      </div>
    </div>

    <p class="heatmap-meta">每个方块代表一天，颜色越深表示提交越多。</p>
  </GlassPanel>
</template>

<style scoped>
.heatmap-card {
  min-width: 0;
  padding: 20px;
}

.heatmap-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.heatmap-head h3 {
  margin: 0;
  font-size: 20px;
}

.heatmap-head span {
  color: var(--muted);
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  overflow-wrap: anywhere;
}

.heatmap-scroll {
  margin-top: 12px;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px;
}

.heatmap-grid {
  --weeks: 53;
  --cell-size: 11px;
  --cell-gap: 3px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, var(--cell-size));
  grid-template-columns: repeat(var(--weeks), var(--cell-size));
  gap: var(--cell-gap);
  min-width: max-content;
}

.heat-cell {
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: 2px;
  background: var(--heat-0);
}

.heat-cell.level-0 {
  background: var(--heat-0);
}

.heat-cell.level-1 {
  background: var(--heat-1);
}

.heat-cell.level-2 {
  background: var(--heat-2);
}

.heat-cell.level-3 {
  background: var(--heat-3);
}

.heat-cell.level-4 {
  background: var(--heat-4);
}

.heat-cell.is-empty {
  background: transparent;
}

.heatmap-meta {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 760px) {
  .heatmap-card {
    padding: 16px;
  }

  .heatmap-grid {
    --cell-size: 10px;
    --cell-gap: 2px;
  }
}

@media (max-width: 520px) {
  .heatmap-grid {
    --cell-size: 8px;
    --cell-gap: 2px;
  }
}
</style>
