import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
console.log('Ruta raiz es', import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  // define: {
  // 	'process.env': {
  // 		"BASE_URL": "http://localhost",
  // 		"PORT": 3030 // puerto de lista-compra-server env\dev.js
  // 	}
  // },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },

  build: {
    reportCompressedSize: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) return 'vuetify'
            if (id.includes('vue')) return 'vue'
            return 'vendor'
          }
        }
      }
    }
  }

})
