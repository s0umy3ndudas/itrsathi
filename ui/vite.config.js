// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'   // ✅ Import path

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Make sure it's listening on all network interfaces
  },
  resolve: {           // ✅ alias must be under resolve
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})