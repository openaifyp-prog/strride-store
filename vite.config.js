
import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Use relative paths for assets
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        shop: 'shop.html',
        about: 'about.html',
        contact: 'contact.html',
        admin_login: 'admin/index.html',
        admin_dashboard: 'admin/dashboard.html'
      }
    }
  }
})
