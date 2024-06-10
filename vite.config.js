import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default {
  plugins: [react()],
  server: {
    host: '0.0.0.0', // or your machine's IP address
    port: 3000, // default port
    
  }
}
