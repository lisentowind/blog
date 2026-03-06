<script setup lang="ts">
import { Icon } from '@iconify/vue'
import iconAtom2 from '@iconify-icons/tabler/atom-2'
import iconBrandCss3 from '@iconify-icons/tabler/brand-css3'
import iconBrandGolang from '@iconify-icons/tabler/brand-golang'
import iconBrandHtml5 from '@iconify-icons/tabler/brand-html5'
import iconBrandJavascript from '@iconify-icons/tabler/brand-javascript'
import iconBrandNodejs from '@iconify-icons/tabler/brand-nodejs'
import iconBrandReact from '@iconify-icons/tabler/brand-react'
import iconBrandSass from '@iconify-icons/tabler/brand-sass'
import iconBrandTypescript from '@iconify-icons/tabler/brand-typescript'
import iconBrandVite from '@iconify-icons/tabler/brand-vite'
import iconBrandVue from '@iconify-icons/tabler/brand-vue'
import iconCode from '@iconify-icons/tabler/code'
import iconFileTypeCss from '@iconify-icons/tabler/file-type-css'
import iconFlame from '@iconify-icons/tabler/flame'
import iconRoute2 from '@iconify-icons/tabler/route-2'
import iconSailboat2 from '@iconify-icons/tabler/sailboat-2'
import type { SkillTag } from '../../data/content'

defineProps<{
  skills: SkillTag[]
}>()

const iconMap = {
  'tabler:brand-vue': iconBrandVue,
  'tabler:brand-react': iconBrandReact,
  'tabler:brand-vite': iconBrandVite,
  'tabler:brand-typescript': iconBrandTypescript,
  'tabler:brand-javascript': iconBrandJavascript,
  'tabler:brand-golang': iconBrandGolang,
  'tabler:brand-html5': iconBrandHtml5,
  'tabler:brand-css3': iconBrandCss3,
  'tabler:brand-sass': iconBrandSass,
  'tabler:file-type-css': iconFileTypeCss,
  'tabler:atom-2': iconAtom2,
  'tabler:sailboat-2': iconSailboat2,
  'tabler:brand-nodejs': iconBrandNodejs,
  'tabler:route-2': iconRoute2,
  'tabler:flame': iconFlame,
}

const resolveIcon = (iconName: string) => iconMap[iconName as keyof typeof iconMap] ?? iconCode
</script>

<template>
  <div class="skill-tags">
    <span
      v-for="skill in skills"
      :key="skill.name"
      class="skill-tag"
      :style="{ '--skill-color': skill.color }"
    >
      <span class="skill-icon-wrap" aria-hidden="true">
        <Icon :icon="resolveIcon(skill.icon)" class="skill-icon skill-icon-line" />
        <Icon :icon="resolveIcon(skill.icon)" class="skill-icon skill-icon-color" />
      </span>
      <span class="skill-name">{{ skill.name }}</span>
    </span>
  </div>
</template>

<style scoped>
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  --skill-color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--tag-border);
  background: var(--tag-bg);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.skill-tag:hover {
  transform: translateY(-1px);
  border-color: var(--skill-color);
  background: color-mix(in srgb, var(--tag-bg) 72%, var(--skill-color));
  box-shadow: 0 8px 18px rgba(var(--accent-rgb), 0.16);
}

.skill-icon-wrap {
  position: relative;
  width: 16px;
  height: 16px;
  display: inline-grid;
  place-items: center;
}

.skill-icon {
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
}

.skill-icon-line {
  color: var(--tag-text);
  opacity: 0.95;
}

.skill-icon-color {
  color: var(--skill-color);
  opacity: 0;
  transform: scale(0.82);
}

.skill-tag:hover .skill-icon-line {
  opacity: 0;
  transform: scale(0.92);
}

.skill-tag:hover .skill-icon-color {
  opacity: 1;
  transform: scale(1);
}

.skill-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--tag-text);
  line-height: 1;
  transition: color 0.2s ease;
}

.skill-tag:hover .skill-name {
  color: var(--text);
}
</style>
