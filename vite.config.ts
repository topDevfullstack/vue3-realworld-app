import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/views'
    }),
    Vue(),
    Layouts({
      defaultLayout: 'index'
    }),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        'pinia',
        VueRouterAutoImports,
        {
          axios: [['default', 'axios']]
        }
      ]
    })
  ],
  server: {
    host: true,
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://api.realworld.io/api',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
