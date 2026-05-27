import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined
          }

          if (id.includes("mapbox-gl")) {
            return "mapbox"
          }

          if (id.includes("@tanstack/react-query")) {
            return "query"
          }

          if (id.includes("zustand")) {
            return "state"
          }

          if (id.includes("lucide-react")) {
            return "icons"
          }

          return "vendor"
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
