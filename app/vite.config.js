import { defineConfig} from 'vite'
import { coverageConfigDefaults, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
    },
    test: {
        coverage: {
            exclude: [...coverageConfigDefaults.exclude, "src/main.jsx"],
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: "./test-setup.js"
    }
})