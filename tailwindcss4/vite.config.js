import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
            eslint({
      // This disables linting during build
      failOnWarning: false,
      failOnError: false,
      emitWarning: false,
      emitError: false,
      include: [],
      exclude: ['node_modules']
                  })],
  base: process.env.VITE_BASE_PATH || "/Small-Business-Website",
});
