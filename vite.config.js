import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Preserve authored CSS declarations to avoid backdrop-filter regressions in prod.
    cssMinify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into separate chunks
          if (id.includes("node_modules/recharts")) {
            return "recharts";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "radixui";
          }
          if (
            id.includes("node_modules/@hookform") ||
            id.includes("node_modules/react-hook-form")
          ) {
            return "hooks";
          }
          if (id.includes("node_modules/@supabase")) {
            return "supabase";
          }
          if (
            id.includes("node_modules/gsap") ||
            id.includes("node_modules/embla-carousel")
          ) {
            return "animations";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
