import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
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
