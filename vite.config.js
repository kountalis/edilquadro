import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'build' ? [visualizer({ open: false, filename: 'bundle-report.html' })] : [])
    // PWA plugin would be added here after installing vite-plugin-pwa
    // Compression plugin would be added here after installing vite-plugin-compression2
  ],
  build: {
    sourcemap: false, // Disable sourcemaps in production for better performance
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    setupMiddlewares: (middlewares, server) => {
      middlewares.use((req, res, next) => {
        // Remove any existing CSP headers
        res.removeHeader('Content-Security-Policy');
        res.removeHeader('X-Content-Security-Policy');
        res.removeHeader('X-WebKit-CSP');
        
        if (req.url.endsWith('.xml')) {
          res.setHeader('Content-Type', 'application/xml');
        }
        next();
      });
      return middlewares;
    }
  }
  // If you want to add CSP headers for production, use a plugin or your hosting config (e.g., Netlify, Vercel, nginx, etc.)
}));