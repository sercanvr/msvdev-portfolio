<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProfileHero from './components/ProfileHero.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import FinalLinksSection from './components/FinalLinksSection.vue'
import ScrollTopButton from './components/ScrollTopButton.vue'
import { profile, projectGroups, finalLinks } from './content/portfolioData'
import { useTheme } from './composables/useTheme'

const { t, locale } = useI18n()
const { theme, setTheme } = useTheme()

const localeOptions = [
  { label: 'TR', value: 'tr', full: 'Turkish' },
  { label: 'EN', value: 'en', full: 'English' },
  { label: 'DE', value: 'de', full: 'Deutsch' },
]

const isLangDropdownOpen = ref(false)

function toggleLangDropdown() {
  isLangDropdownOpen.value = !isLangDropdownOpen.value
}

function closeLangDropdown(e) {
  if (!e.target.closest('.lang-wrapper')) {
    isLangDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeLangDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeLangDropdown)
})

function setLanguage(nextLocale) {
  locale.value = nextLocale
  document.documentElement.setAttribute('lang', nextLocale)
  isLangDropdownOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleThemeToggle() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

function reloadPage() {
  localStorage.removeItem('portfolio-theme')
  localStorage.removeItem('vue-locale')
  localStorage.clear() // Reset site settings
  window.location.reload()
}

const summaryParagraphs = computed(() => {
  return profile.bio[locale.value] || profile.bio['tr']
})
const currentLangLabel = computed(() => localeOptions.find(o => o.value === locale.value)?.label || 'TR')
</script>

<template>
  <div class="app-wrapper">
    <header class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <span class="logo oleo-script-regular" @click="reloadPage">msvdev</span>
        </div>
        <div class="nav-right">
          <div class="tooltip-box theme-btn">
            <button
              class="icon-btn"
              @click="handleThemeToggle"
              :aria-label="t('controls.switchTheme')"
            >
              <svg
                width="18"
                height="18"
                viewBox="2 2 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="theme-icon"
                shape-rendering="geometricPrecision"
                aria-hidden="true"
              >
                <path
                  d="M12 6C10.7785 6 9.64223 6.36502 8.69435 6.99194H12V7.99194H7.53501C7.00911 8.57742 6.59669 9.26689 6.33237 10.0258H12V11.0258H6.07869C6.02692 11.3428 6 11.6683 6 12C6 12.3379 6.02793 12.6693 6.08161 12.9919H12V13.9919H6.33857C6.60189 14.7404 7.00941 15.4208 7.52779 16H12V17H8.68221C9.63251 17.6318 10.7733 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div class="tooltip">
              <div class="triangle"></div>
              {{ t('controls.switchTheme') }}
            </div>
          </div>

          <div class="tooltip-box lang-wrapper" :class="{ 'is-open': isLangDropdownOpen }">
            <button class="icon-btn" @click="toggleLangDropdown">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="globe-icon"
                style="width: 18px; height: 18px;"
                shape-rendering="geometricPrecision"
                aria-hidden="true"
              >
                <path d="M266.3 48.3L232.5 73.6c-5.4 4-8.5 10.4-8.5 17.1l0 9.1c0 6.8 5.5 12.3 12.3 12.3c2.4 0 4.8-.7 6.8-2.1l41.8-27.9c2-1.3 4.4-2.1 6.8-2.1l1 0c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8l-19.9 19.9c-5.8 5.8-12.9 10.2-20.7 12.8l-26.5 8.8c-5.8 1.9-9.6 7.3-9.6 13.4c0 3.7-1.5 7.3-4.1 10l-17.9 17.9c-6.4 6.4-9.9 15-9.9 24l0 4.3c0 16.4 13.6 29.7 29.9 29.7c11 0 21.2-6.2 26.1-16l4-8.1c2.4-4.8 7.4-7.9 12.8-7.9c4.5 0 8.7 2.1 11.4 5.7l16.3 21.7c2.1 2.9 5.5 4.5 9.1 4.5c8.4 0 13.9-8.9 10.1-16.4l-1.1-2.3c-3.5-7 0-15.5 7.5-18l21.2-7.1c7.6-2.5 12.7-9.6 12.7-17.6c0-10.3 8.3-18.6 18.6-18.6l29.4 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-20.7 0c-7.2 0-14.2 2.9-19.3 8l-4.7 4.7c-2.1 2.1-3.3 5-3.3 8c0 6.2 5.1 11.3 11.3 11.3l11.3 0c6 0 11.8 2.4 16 6.6l6.5 6.5c1.8 1.8 2.8 4.3 2.8 6.8s-1 5-2.8 6.8l-7.5 7.5C386 262 384 266.9 384 272s2 10 5.7 13.7L408 304c10.2 10.2 24.1 16 38.6 16l7.3 0c6.5-20.2 10-41.7 10-64c0-111.4-87.6-202.4-197.7-207.7zm172 307.9c-3.7-2.6-8.2-4.1-13-4.1c-6 0-11.8-2.4-16-6.6L396 332c-7.7-7.7-18-12-28.9-12c-9.7 0-19.2-3.5-26.6-9.8L314 287.4c-11.6-9.9-26.4-15.4-41.7-15.4l-20.9 0c-12.6 0-25 3.7-35.5 10.7L188.5 301c-17.8 11.9-28.5 31.9-28.5 53.3l0 3.2c0 17 6.7 33.3 18.7 45.3l16 16c8.5 8.5 20 13.3 32 13.3l21.3 0c13.3 0 24 10.7 24 24c0 2.5 .4 5 1.1 7.3c71.3-5.8 132.5-47.6 165.2-107.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM187.3 100.7c-6.2-6.2-16.4-6.2-22.6 0l-32 32c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l32-32c6.2-6.2 6.2-16.4 0-22.6z"/>
              </svg>
              <span class="lang-text">{{ currentLangLabel }}</span>
            </button>
            <div class="tooltip">
              <div class="triangle"></div>
              {{ t('controls.switchLanguage') }}
            </div>

            <div class="lang-dropdown" :class="{ 'is-open': isLangDropdownOpen }">
              <button
                v-for="option in localeOptions"
                :key="option.value"
                :class="{ active: locale === option.value }"
                @click="setLanguage(option.value)"
              >
                {{ option.full }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <ProfileHero
        :profile="profile"
        :summary-paragraphs="summaryParagraphs"
      />

      <div class="projects-container">
        <h2 class="main-section-title">{{ t('sections.projects') }}</h2>
        <div class="group-section" v-for="group in projectGroups" :key="group.id">
           <h3 class="group-title">{{ t(group.titleKey) }}</h3>
           <ProjectsSection
             :items="group.projects"
           />
        </div>
      </div>

      <FinalLinksSection :links="finalLinks" />
    </main>

    <ScrollTopButton />
  </div>
</template>
