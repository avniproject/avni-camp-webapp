import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://prerelease.avniproject.org/', // Your Spring Boot backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})