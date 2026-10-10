import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true, // Mobil erişim için şart
    open: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // Mobilde anlık yenileme için şart
    },
    watch: {
      usePolling: true,
    },
  },
  // TEST CONFIGURATION
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
  // PERFORMANCE OPTIMIZATIONS
  build: {
    target: 'esnext', // Modern tarayıcılar için optimize et
    minify: 'esbuild', // En hızlı sıkıştırma
    cssCodeSplit: true, // CSS'i parçalara böl
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vendor-vue'
            }
            if (id.includes('vue-i18n') || id.includes('i18next')) {
              return 'vendor-i18n'
            }
            return 'vendor-utils'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
