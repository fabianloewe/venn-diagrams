import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from "unplugin-yaml/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
})