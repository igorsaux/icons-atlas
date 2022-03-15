import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      srcDir: 'src',
      filename: 'serviceWorker.ts',
      strategies: 'injectManifest',
      includeAssets: '*',
      registerType: 'autoUpdate',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 10_000_000,
        globPatterns: [
          '**/*.{js,css,html,png,wasm}',
          '**/{ru,us,plus,grid}*.svg'
        ]
      },
      manifest: {
        name: 'Icons Atlas',
        short_name: 'Icons Atlas',
        description: 'Search engine for BYOND icons.',
        theme_color: '#1d1d1d',
        background_color: '#1d1d1d',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@icons': path.resolve(__dirname, './src/icons')
    }
  }
})
