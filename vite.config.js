import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api' : 'https://leo-estate-backend.onrender.com'
    }
  },
  plugins: [react()],
})
