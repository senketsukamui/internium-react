import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      models: path.resolve(__dirname, "./src/models"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      store: path.resolve(__dirname, "./src/store"),
      assets: path.resolve(__dirname, "./src/assets"),
      styles: path.resolve(__dirname, "./src/styles"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      api: path.resolve(__dirname, "./src/api"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
