import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    cssInjectedByJsPlugin(),
  ],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: "terser", // 混淆器,terser构建后文件体积更小
    chunkSizeWarningLimit: 200,
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/components/index.js"),
      name: "chan",
      fileName: (format) => `chan.${format}.js`,
    },
  },
});
