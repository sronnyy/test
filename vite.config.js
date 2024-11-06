import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: {},
    'process.env.NODE_ENV': JSON.stringify('development'),

  },
  plugins: [react()],
})
