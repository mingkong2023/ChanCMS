import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import legacy from "@vitejs/plugin-legacy";

//组件扩展名称
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite"; //自动导入
import Components from "unplugin-vue-components/vite"; //自动注册
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import copy from "rollup-plugin-copy";

export default ({ mode }) => {
  console.log("mode--->", mode);

  return defineConfig({
    plugins: [
      vue(),

      legacy({
        targets: ["defaults", "not IE 11"],
        // targets: ["> 1%, last 1 version, ie >= 11"], // 需要兼容的目标列表，可以设置多个
        // additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
      }),
      copy({
        targets: [{ src: "dist/*", dest: "../../server/app/public/admin" }],
      }),
      VueSetupExtend(),
      AutoImport({
        resolvers: [
          //自动导入Element plus
          ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
          //自动导入Element plus组件
          ElementPlusResolver(),
        ],
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/variables.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "dist", //输出路径
      assetsDir: "assets", //静态资源的存放路径
      manifest: false,
      sourcemap: mode == "dev" ? true : false,
      minify: "terser", // 混淆器,terser构建后文件体积更小
      chunkSizeWarningLimit: 200, // chunk 大小警告的限制
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      target: "es2015", // 默认 "modules"
      rollupOptions: {
        // input: {
        //   1: path.resolve(__dirname, "./src/index.html"),
        // },
        output: {
          // 最小化拆分包
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          entryFileNames: `assets/js/[name].js`,
          chunkFileNames: `assets/js/[name].js`,
          assetFileNames: `assets/[ext]/[name].[ext]`,
          // chunkFileNames: (chunkInfo) => {
          //   const facadeModuleId = chunkInfo.facadeModuleId
          //     ? chunkInfo.facadeModuleId.split("/")
          //     : [];
          //   const fileName =
          //     facadeModuleId[facadeModuleId.length - 2] || "[name]";
          //   return `js/${fileName}/[name].[hash].js`;
          // },
        },
        minify: "esbuild",
        terserOptions: {
          compress: {
            drop_console: false, // 去掉console
            drop_debugger: true, // 去掉debugger
          },
        },
      },
    },

    base: "./", // 生产环境下的公共路径
    filenameHashing: true, //文件名哈希
    lintOnSave: true,

    //服务器配置
    server: {
      host: "0.0.0.0",
      port: "3001",
      open: false, // 浏览器自动打开 关闭false
      https: false, // 是否开启 https
      ssr: false, // 服务端渲染
      strictPort: true, //端口占用，自动尝试下一个端口
      //代理配置
      proxy: {
        "/api": {
          target: "http://localhost:81/api", // api接口代理,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/public": {
          target: "http://localhost:81/public", // 上传图片代理,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/public/, ""),
        },
      },
      hmr: {
        overlay: false, //报错不显示在页面上
      },
    },
  });
};
