import { ref, watch } from 'vue'
import { THEME_STORAGE_KEY, resolveInitialTheme } from './theme'

export function useTheme() {
  const initialTheme = typeof window !== 'undefined'
    ? resolveInitialTheme(localStorage.getItem(THEME_STORAGE_KEY))
    : 'dark'
  const theme = ref(initialTheme)

  document.documentElement.setAttribute('data-theme', theme.value)

  watch(theme, (nextTheme) => {
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  })

  function setTheme(nextTheme) {
    theme.value = nextTheme
  }

  return {
    theme,
    setTheme,
  }
}
