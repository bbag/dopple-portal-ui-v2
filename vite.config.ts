import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import svgLoader from 'vite-svg-loader'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  // '/dopple-portal-ui/' = the repo name (ONLY IF DEPLOYING TO GITHUB PAGES)
  // base: process.env.NODE_ENV === 'development' ? '' : '/dopple-portal-ui/',
  base: '',
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat shoelace tags as custom elements
          isCustomElement: (tag) => tag.includes('sl-')
        }
      }
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
