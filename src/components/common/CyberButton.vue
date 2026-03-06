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

<style scoped>
.cyber-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 10px 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.cyber-btn.primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--btn-primary-text);
  box-shadow: var(--btn-primary-shadow);
}

.cyber-btn.outline {
  border-color: rgba(var(--accent-rgb), 0.54);
  color: var(--text);
  background: rgba(var(--accent-rgb), 0.06);
}

.cyber-btn:hover {
  transform: translateY(var(--control-hover-translate-y));
}
</style>
