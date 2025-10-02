import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
