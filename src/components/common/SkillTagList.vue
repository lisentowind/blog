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
