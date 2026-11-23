import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deploys under subpath /logesh-os-portfolio/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/logesh-os-portfolio/' : './',
  plugins: [react()],
})
