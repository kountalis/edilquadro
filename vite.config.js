import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'build' ? [visualizer({ open: false, filename: 'bundle-report.html' })] : [])
  ],
  build: {
    sourcemap: false, // Disable sourcemaps in production for better performance
    chunkSizeWarningLimit: 1000,
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'react-helmet': ['react-helmet-async'],
          'i18n': ['i18next', 'react-i18next', 'i18next-http-backend'],
        },
        // Optimize asset file names for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(woff|woff2|ttf|otf|eot)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
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