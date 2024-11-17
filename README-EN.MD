
# [English](https://github.com/mingkong2023/ChanCMS/blob/main/README-EN.MD)| [简体中文](https://github.com/mingkong2023/ChanCMS/blob/main/README.MD)

# ChanCMS Content Management System

ChanCMS is a high-quality, practical CMS system developed based on Node, Express, MySQL, and Vue3. It's lightweight, flexible, stable, high-performing, and easily extensible, making development simpler.

## 🌈 System Features

* Self-developed. Built upon the self-developed chanjs lightweight MVC framework, it's lightweight, flexible, stable, high-performing, and sustainable.
* SEO. Focused on `SEO`, pseudo-static `HTML`, and pinyin navigation, with flexible keyword and description settings.
* Security. Based on `knex`, it has high defense against `SQL` injection, API permission checks, ensuring security.
* Flexibility. Fragment functionality supports fragmented text configuration for versatile text configuration.
* High Extensibility. Supports extended models, field configurations, dynamic table generation, and strong extensibility.
* Modular. All modules are independent and do not interfere with each other.
* Plugin-based. Supports flexible development and complete functional modules.
* Headless CMS, providing API support for multiple terminals.

## 🚧 Functionality Overview

* Website Information
* Site Management
* Category Management
* Article Module
* Tag Management
* Fragment Management (advertisements, fragment texts, company address, phone, name, WeChat, etc., universal module)
* Extended Models
* Article Collection
* User Management
* Menu Management
* Login Logs
* Online Messages
* Chinese-English Switching
* Text-to-Speech
* PDF Preview (on-demand loading)
* Local Upload & Qiniu Cloud Upload
* Logging Functionality

## ⛱️ Software Architecture

**Client-side Tech Stack**

Admin Interface

* vue3
* vue-router
* pina
* element-plus
* vite4
* tinymce

**Server-side Tech Stack**

* nodejs v20.16.0+
* express 4.18+
* mysql v5.7.26
* knex (for SQL operations)
* art-template v4.13.2+
* pm2 v5.2.2
* jwt
* pm2 (for production)
* nodemon (for development)

### Project Structure

```
server deployment code
|- app
    |- config
    |- extend 
    |- middleware 
    |- modules
      |- api Backend APIs
        |-- controller
        |-- service
        |-- middleware (optional)
        |-- router.js
      |- home Template rendering
        |-- controller
        |-- middleware (optional)
        |-- service
        |-- view
        |-- router.js
      |- common General APIs, available for H5, apps, mini-programs, etc.
        |-- controller
        |-- middleware (optional)
        |-- service
        |-- view
        |-- router.js
    |- plugins 
        |- plus-pdf Plugin – on-demand PDF loading
          |-- controller
          |-- service (optional)
          |-- middleware (optional)
          |-- router.js
        |- plus-wechat Plugin – WeChat Mini Program login
          |-- controller
          |-- service (optional)
          |-- middleware (optional)
          |-- router.js
        ***
    |- public
    |- utils
    |- router.js
  app.js
  ```

### 🍅 Cases

* Case 1 [Hong Kong Daily](http://www.hongkongdaily.net/)
* Case 2 [International Health, Fitness, and Longevity Forum](http://www.internationjms.cn/)
* Case 3 [World Health Games Alliance](http://www.worldhealthgames.com/)
* Case 4 [World Qigong Network](http://www.shijieqigong.com/)
* Case 5 [NuoDe Real Estate](https://www.nuodefangchan.com/)
* Case 6 [Kedou Cloud](https://kd-yun.top/)
* Case 7 [AngYi Information](http://www.angyi-iot.com/)
* Case 8 [MengShi Battery Swap](http://www.51mshd.com/)
* Case 9 [7Yi Chess](https://doc.7yi.link/)
* Case 10 [Beijing Huida Environmental Technology Co., Ltd.](http://www.huidaep.com/)
* Demo Site 1 [Elegance and Vulgarity Enjoy Together](http://www.cqsmservices.cn/)
* Demo Site 2 [JianYou News](http://118.89.190.101:81/)

## 👵 Development Documentation

* **Official Website: <https://www.chancms.top>**
* **Documentation: <https://www.chancms.top/docs/index.html>**
* **Video Tutorials: <https://space.bilibili.com/1885628820>**

## ❤️ Project Engagement

* **Gitee: <https://gitee.com/yanyutao0402/chanyue-cms>**

## 👴 Project Communication

If you like our project, please give it a Star.
For WeChat group communication, please contact via WeChat: `yanyutao2014` 🧒 👧 👱  🧔 👴

## License

This project is licensed under the [Apache License 2.0](LICENSE). For more details, see the [LICENSE](LICENSE) file.

## Warning

* Prohibited from being used for any illegal commercial purposes or any unlawful or unethical behavior.
* The maintainers and contributors of the project are not responsible for any direct or indirect losses caused by improper use of the code or resources in this project.
* Please respect laws and ethical norms and use the resources of this project legally and reasonably.
* Any violation of the above regulations will be subject to legal pursuit.

## Some Screenshots of the Admin Panel

[Admin Panel Display](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/info.png)

[Admin Panel Display](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/category.png)

[Admin Panel Display](https://gitee.com/yanyutao0402/chanyue-cms/raw/master/server/app/public/template/default/img/article.png)
