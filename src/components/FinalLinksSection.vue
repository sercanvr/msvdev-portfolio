<script setup>
import { computed } from 'vue'
import { safeExternalUrl } from '../utils/security'
import { useI18n } from 'vue-i18n'

defineProps({
  links: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer-wrap">
    <div class="links-section">
      <a
        v-for="link in links"
        :key="link.labelKey"
        :href="safeExternalUrl(link.url)"
        :class="['link-item', 'icon-' + link.labelKey.split('.')[1]]"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t(link.labelKey)"
      >
        <div class="social-icon" />
      </a>
    </div>
    <div class="copyright">
      &copy; {{ year }} msvdev
    </div>
  </footer>
</template>
