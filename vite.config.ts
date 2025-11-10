import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root base path for custom domains, otherwise use repo name for GitHub Pages subdomain
  base: process.env.CUSTOM_DOMAIN === 'true' 
    ? '/' 
    : process.env.GITHUB_PAGES === 'true' 
      ? '/brince-solution-landing/' 
      : '/',
})
