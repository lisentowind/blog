<script setup lang="ts">
withDefaults(
  defineProps<{
    interactive?: boolean
    as?: string
  }>(),
  {
    interactive: false,
    as: 'div',
  },
)
</script>

<template>
  <component :is="as" class="glass-panel" :class="{ interactive }">
    <slot />
  </component>
</template>
