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
                <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 290.4 56.34 322.9 71.07 351.6L143.5 279.2C149.8 272.9 158.3 269.4 167.2 269.4H192C209.7 269.4 224 255.1 224 237.4V205.4C224 196.6 220.5 188.1 214.2 181.8L169.5 137.1C164.7 132.3 162.1 125.8 162.1 118.9V112C162.1 94.33 176.3 80 194.1 80H221.7C230.2 80 238.3 83.38 244.3 89.37L285.3 130.3C297.8 142.8 316.8 142.8 329.4 130.3C332.9 126.8 337.6 124.8 342.6 124.8H352C369.7 124.8 384 139.1 384 156.8V174.6C384 187.3 391.6 198.8 403.4 203.5L425.8 212.5C434.5 215.9 443.8 214.3 451.1 208.3C460.7 223.1 464 239.3 464 256C464 278.4 457.9 299.5 447.3 317.7L414.6 285C408.4 278.7 399.9 275.2 391 275.2H368C359.2 275.2 350.7 278.7 344.4 285L304.4 325C298.1 331.3 294.6 339.8 294.6 348.6V384C294.6 401.7 308.9 416 326.6 416H338.7C343.8 416 348.7 413.9 352.3 410.3L387.7 374.9C394.3 368.3 404.9 366.9 413.1 371.3L427.6 379C384.5 431.1 324.5 464 256 464C236.4 464 217.4 461.3 199.3 456.2L199.4 445.4C199.4 429.7 186.7 417.1 171.1 417.1C165.7 417.1 160.5 419.2 156.7 423.1L135.4 444.4C108.4 425.2 86.83 398.8 73.65 367.8L121.9 319.6C124.8 316.7 128.7 315.1 132.8 315.1H160C168.8 315.1 176 307.9 176 299.1C176 290.3 168.8 283.1 160 283.1H132.8C120.5 283.1 108.8 288 100.2 296.6L63.53 333.3C53.47 309.4 48 283.2 48 256C48 141.1 141.1 48 256 48z"/>
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
