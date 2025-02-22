import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Fix for proper asset loading on Vercel
  server: {
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
    sourcemap: true, // Helps debugging on Vercel
    target: "esnext",
    assetsDir: "", // Let Vite handle assets properly
    minify: "esbuild", // Optimize JS bundle size
  },
}));
