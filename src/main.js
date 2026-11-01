import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './styles/main.css'

// Pre-decode footer icons into GPU texture cache immediately on load
if (typeof window !== 'undefined') {
  const footerIcons = ['/email.png', '/linkedin.png', '/github.png', '/leetcode.png', '/bugcrowd.png', '/linkedin-hover.png', '/bugcrowd-hover.png']
  footerIcons.forEach((src) => {
    const img = new Image()
    img.src = src
    if (img.decode) {
      img.decode().catch(() => {})
    }
  })
}

createApp(App).use(i18n).mount('#app')
