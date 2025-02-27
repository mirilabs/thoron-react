import { defineConfig } from 'vite'
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
  },
  plugins: [
    nodePolyfills({
      include: [
        "crypto",
        "buffer",
        "util",
        "events",
        "stream",
        "string_decoder",
        
      ]
    })
  ]
});