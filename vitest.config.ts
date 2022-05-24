/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~/': '/',
    },
  },
  test: {
    coverage: {
      enabled: true,
      reporter: ['json', 'lcov', 'text'],
      reportsDirectory: '.nyc/coverage',
    },
    environment: 'jsdom',
    exclude: ['**/cypress/**', '**/node_modules/**', '**/*.spec.tsx'],
  },
})
