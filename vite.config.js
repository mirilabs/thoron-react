import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  loader: {
    ".js": "jsx",
    ".ts": "tsx"
  }
});