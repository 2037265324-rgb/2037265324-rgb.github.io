import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "github-pages",
  publicDir: "../public",
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../pages-dist",
  },
});
