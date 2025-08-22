# 2025未来计划

* 采集  √
* 资源管理 √
* 模板管理 √
* 会员功能 will doing
* rbac 接口权限控制
* 插件化开发思路
* 接口参数校验
* 初始化msyql数据
* 删除角色直接就删了，要提示一下
* 菜单优化
* 普通角色不可以查看其角色的权限 (用户 角色 权限 会员)
* 登录ip记录 geoip-lite  ip2region ip库
* 去axios

## 2026未来计划

* 模板
* 文库
* 会员
* 问答
* 自定义表单
* 问卷模块
* 投票
* 微信支持
* 付费阅读
* 证书查询
* pdf打印
* 合同打印
* 数字签名
* IM在线客服
* 视频播放器
* 音频播放器模块
* 3D预览
* 教程/学习资源
* 在线客服
* 定时任务
* 模板--> 音频播放  
* 模板--> 视频播放
* AI-->文章生成
* 接口文档生成
* 安全性：同一个角色可以删除只能删除自己发布的文章，超级管理员可以删除所有文章

## 常用第三方模块

sharp - 用于缩放 JPEG、PNG、WebP 和 TIFF 图像的 Node.js 模块。
xlsx - 用于处理 Microsoft Excel 文件的 Node.js 模块。
nodemailer - 用于发邮件的 Node.js 库。
bcryptjs - bcrypt 密码哈希函数
multer  - 允许在 Node.js 中将表单数据处理为上传文件的中间件。
jsonwebtoken - 用于创建和验证 JSON Web Tokens 的 Node.js 库。
mongoose - 用于 MongoDB 的 Node.js ODM 库。
express - 用于构建 web 应用程序的 Node.js 框架。
body-parser - 用于解析请求体的中间件。
cors - 用于处理跨源资源共享 (CORS) 的中间件。
dotenv - 用于加载环境变量的 Node.js 库。
nodemailer - 用于发送邮件的 Node.js 库。
winston - 用于在 Node.js 中管理日志的库。
morgan - 用于将 HTTP 请求的 Node.js 日志库。

## 日志切割

```javascript
pm2 install pm2-logrotate
pm2 conf pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
```
