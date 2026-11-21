// Build só da página "Estudos do 5º ano", sem os plugins do app de Matemática.
// Uso: pnpm build:5ano  →  gera dist-5ano/ (index.html + assets/), pronto para hospedar em qualquer lugar.
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client", "5ano"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-5ano"),
    emptyOutDir: true,
  },
  worker: { format: "es" },
  optimizeDeps: { exclude: ["@mintplex-labs/piper-tts-web", "onnxruntime-web"] },
});
