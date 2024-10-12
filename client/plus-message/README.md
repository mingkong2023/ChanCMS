# ChanCMS在线留言

基于vite+vue3+element-plus实现在线留言模块，打包成独立js文件，方便在项目中使用。

## 项目启动

```bash
# 安装依赖
npm install

# 启动项目
npm run dev
```

## 项目打包

```bash
# 打包项目
npm run build
```

## 项目结构

```
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── components
|       ├── Message
        ├── index.js 组件入口
│   ├── App.vue
│   ├── main.ts
│   └── shims-vue.d.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 项目功能

在项目中引入chancms留言模块的js文件

为了解决vue文件无法直接引入的问题，本项目将组件打包成独立js文件，方便在项目中使用。

chancms留言模块，可以很好地基于vue和element-ui中的form表单进行校验和样式定制，并且可以方便地集成到其他项目中。

## 使用方法

在项目中引入chancms留言模块的js文件，然后在需要使用的地方调用`CHAN.message('#message',null)`即可。

```html
<script src="chan.umd.js"></script>
<script>
  CHAN.message('#message',null);
</script>
```
