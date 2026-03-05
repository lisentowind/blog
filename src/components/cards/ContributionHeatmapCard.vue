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
