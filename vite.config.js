import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure it's accessible from outside localhost
    port: 4173,       // You can specify the port you want Vite to use
  }
})
