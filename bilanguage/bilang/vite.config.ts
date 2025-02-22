import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // Ensures proper asset loading on Vercel
  server: {
    host: true, // Fixes "::" issue and makes it accessible on LAN
    port: 8080,
    open: true, // Auto-opens browser on local dev
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true, // Helps with debugging on Vercel
    target: "esnext",
    assetsDir: "assets", // Ensures static files are in the correct folder
  },
}));
