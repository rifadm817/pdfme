import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: { 
    target: 'esnext',
    sourcemap: true // Enable source maps for production builds
  },
  plugins: [react()],
});
