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
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="theme-icon"
                shape-rendering="geometricPrecision"
                aria-hidden="true"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
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
                viewBox="0 0 496 512"
                fill="currentColor"
                class="globe-icon"
                style="width: 18px; height: 18px;"
                shape-rendering="geometricPrecision"
                aria-hidden="true"
              >
                <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/>
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
