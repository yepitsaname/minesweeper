import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: "./test-setup.js"
    }
})