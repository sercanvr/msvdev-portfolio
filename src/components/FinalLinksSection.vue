<script setup>
import { computed } from 'vue'
import { safeExternalUrl } from '../utils/security'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
})

const { t } = useI18n()

// Use the exact filenames found in public/
const svgMap = {
  'links.mail': 'email.png',
  'links.linkedin': 'linkedin.png',
  'links.github': 'github.png',
  'links.leetcode': 'leetcode.png',
  'links.bugcrowd': 'bugcrowd.png'
}

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer-wrap">
    <div class="hidden-preload" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden; opacity: 0; pointer-events: none;">
      <img src="/email.png" alt="" loading="eager" decoding="sync" />
      <img src="/linkedin.png" alt="" loading="eager" decoding="sync" />
      <img src="/github.png" alt="" loading="eager" decoding="sync" />
      <img src="/leetcode.png" alt="" loading="eager" decoding="sync" />
      <img src="/bugcrowd.png" alt="" loading="eager" decoding="sync" />
      <img src="/linkedin-hover.png" alt="" loading="eager" decoding="sync" />
      <img src="/bugcrowd-hover.png" alt="" loading="eager" decoding="sync" />
    </div>
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
        <div class="social-icon"></div>
      </a>
    </div>
    <div class="copyright">
      &copy; {{ year }} msvdev
    </div>
  </footer>
</template>
