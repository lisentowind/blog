import { ref } from 'vue'

export type ThemeMode = 'dark' | 'light'

const THEME_KEY = 'blog-theme-mode'
const theme = ref<ThemeMode>('dark')
let initialized = false

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(THEME_KEY)
  if (saved === 'dark' || saved === 'light') return saved

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const applyTheme = (mode: ThemeMode) => {
  theme.value = mode
  document.documentElement.setAttribute('data-theme', mode)
  window.localStorage.setItem(THEME_KEY, mode)
}

const initTheme = () => {
  if (initialized || typeof window === 'undefined') return
  applyTheme(getPreferredTheme())
  initialized = true
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

export const useTheme = () => ({
  theme,
  initTheme,
  toggleTheme,
})
