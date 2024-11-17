[English](https://github.com/mingkong2023/ChanCMS/blob/main/README-EN.MD)| [简体中文](https://github.com/mingkong2023/ChanCMS/blob/main/README.MD)

# ChanCMS内容管理系统

ChanCMS是一款基于Node、Express、MySQL、Vue3研发的高质量实用型CMS系统。轻量、灵活、稳定、高性能、易扩展，让开发更简单。

## 🌈系统特色

* 自研。基于自研chanjs轻量级mvc框架实现，轻量、灵活、稳定、高性能、可持续。
* SEO。专注于`seo`,伪静态`html`和拼音导航，灵活设置关键词和描述。
* 安全。基于`knex`,高防`sql`注入，接口权限校验，为安全提供保障。
* 灵活。碎片功能，支持零碎文案配置，方便各类灵活文案配置。
* 高扩展。支持扩展模型，字段配置，可动态生成表，超强扩展。
* 模块化。一切模块相互独立，互不干扰。
* 插件化。灵活开发，支持完整功能模块。
* 无头cms，为多端提供接口支持。

## 🚧功能介绍

* 网站信息
* 站点管理
* 栏目管理
* 文章模块
* 标签管理
* 碎片管理 (广告，碎片文案，公司地址、电话、名称，微信等万能模块)
* 扩展模型
* 文章采集
* 用户管理
* 菜单管理
* 登录日志
* 在线留言
* 中英切换
* 语音播报
* pdf预览（按需加载）
* 本地上传&七牛云上传
* 日志功能

## ⛱️软件架构

**client技术栈**

后台管理界面admin

* vue3
* vue-router
* pina
* element-plus
* vite4
* tinymce
  
**服务端技术栈**

* nodejs v20.16.0+
* express 4.18+
* mysql v5.7.26
* knex (sql操作)
* art-tempate v4.13.2+
* pm2   v5.2.2
* jwt  
* pm2 (prd)
* nodemon (dev)
  
### 项目架构

```
server 部署代码
|- app
    |- config
    |- extend 
    |- middleware 
    |- modules
      |-api 后台api
        |-- controller
        |-- service
        |-- middleware(可选)
        |-- router.js
      |-home 模板渲染
        |-- controller
        |-- middleware(可选)
        |-- service
        |-- view
        |-- router.js
      |-common 通用api，提供给h5 app 小程序等调用
        |-- controller
        |-- middleware(可选)
        |-- service
        |-- view
        |-- router.js
    |- plugins 
        |- plus-pdf 插件——pdf按需加载
          |-- controller
          |-- service(可选)
          |-- middleware(可选)
          |-- router.js
        |- plus-wechat 插件——微信小程序登录
          |-- controller
          |-- service(可选)
          |-- middleware(可选)
          |-- router.js
        ***  
    |- public
    |- utils
    |- router.js
  app.js
  ```

### 🍅️案例

* 案例一   [香港日报](http://www.hongkongdaily.net/)
* 案例二   [国际健康健美长寿论坛](http://www.internationjms.cn/)
* 案例三   [世界大健康运动联盟](http://www.worldhealthgames.com/)
* 案例四   [世界气功网](http://www.shijieqigong.com/)
* 案例五   [诺德房产](https://www.nuodefangchan.com/)
* 案例六   [蝌蚪云](https://kd-yun.top/)
* 案例七   [昂翊信息](http://www.angyi-iot.com/)
* 案例八   [萌狮换电](http://www.51mshd.com/)
* 案例九   [七弈国象](https://doc.7yi.link/)
* 案例十   [北京辉达环保科技有限公司](http://www.huidaep.com/)
<!-- * 案例十   [超前端](https://zoye.top/) -->
* 演示站1  [雅俗共赏](http://www.cqsmservices.cn/)
* 演示站2 [简游资讯](http://118.89.190.101:81/)
* 演示站3  [前端小栈• 禅悦](http://122.112.172.87:81/)
* 演示站4  [ChanCMS](http://140.246.2.93:81/)

## 👵开发文档

* **官网:<https://www.chancms.top>**
* **官网文档 <https://www.chancms.top/docs/index.html>**
* **视频教程：<https://space.bilibili.com/1885628820>**

## ❤️项目关注

* **码云：<https://gitee.com/yanyutao0402/chanyue-cms>**
* **GitHub(备份)：<https://github.com/mingkong2023/ChanCMS>**

## 👴项目交流

 如果喜欢我们的项目，请点个 Star。
 微信群交流请联系微信: `yanyutao2014` 🧒 👧 👱  🧔 👴

## 许可证

本项目采用 [Apache License 2.0](LICENSE) 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 警告

* 禁止用于任何非法商业用途或其他任何违法或不道德的行为。
* 不当使用本项目中的代码或资源而导致的任何直接或间接损失，项目维护者及贡献者概不负责。
* 请尊重法律和道德规范，合理合法地使用本项目的资源。
* 任何违反上述规定的行为都将受到法律追究。

## 管理后台部分截图

![后台展示](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/info.png)

![后台展示](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/category.png)

![后台展示](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/article.png)
