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
              <div class="icon-svg" style="mask-image: url(/theme.png); -webkit-mask-image: url(/theme.png);"></div>
            </button>
            <div class="tooltip">
              <div class="triangle"></div>
              {{ t('controls.switchTheme') }}
            </div>
          </div>

          <div class="tooltip-box lang-wrapper" :class="{ 'is-open': isLangDropdownOpen }">
            <button class="icon-btn" @click="toggleLangDropdown">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="globe-icon" style="width: 18px; height: 18px;" aria-hidden="true">
                <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8l57.9 16.5c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5.3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zm48 0c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z"/>
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
