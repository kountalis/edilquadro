import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false, filename: 'bundle-report.html' })
  ],
  build: {
    sourcemap: false, // Disable sourcemaps in production
    chunkSizeWarningLimit: 1000
  },
  appType: 'custom',
  ssr: {
    // Add problematic dependencies to noExternal to ensure they are processed by Vite
    noExternal: ['react-helmet-async']
  }
});