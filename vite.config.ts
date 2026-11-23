import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use relative base so assets load correctly on custom domain (logesh.is-a.dev) and github.io subpath
export default defineConfig({
  base: './',
  plugins: [react()],
})
