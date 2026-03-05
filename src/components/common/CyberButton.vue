<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline'
    as?: string
    to?: string
    href?: string
  }>(),
  {
    variant: 'primary',
    as: 'button',
    to: '',
    href: '',
  },
)
</script>

<template>
  <RouterLink v-if="to" :to="to" class="cyber-btn" :class="variant">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" class="cyber-btn" :class="variant">
    <slot />
  </a>
  <component v-else :is="as" class="cyber-btn" :class="variant">
    <slot />
  </component>
</template>
