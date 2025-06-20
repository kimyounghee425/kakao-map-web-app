import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
    plugins: [react(), tsconfigPaths()],
    base: '/',
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
})
