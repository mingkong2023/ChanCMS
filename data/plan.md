<!--
 * @Author: 明空
 * @Date: 2024-07-16 10:45:11
 * @LastEditors: your name
 * @LastEditTime: 2024-07-16 10:54:23
 * @Description: 
-->

/* 当屏幕宽度小于或等于1380px时 */
@media (max-width: 1380px) {
  :root {
    --font: 12px;
  }
}

/* 当屏幕宽度大于1380px时 */
@media (min-width: 1381px) and (max-width: 1920px) {
  :root {
    --font: 13px; /* 或者根据需要调整 */
  }
}


p{
 font-size:var(--font)
}

### plan 

* 文件夹名称读取 √
* 新增文章切换了tab 没有提示，添加具体弹窗提示 √
* 图片上传裁剪和压缩 √
* 错误加提示 √
* tag热门度统计 √
* 文章发布也可以选择模板，提高灵活性。√
* 父栏目有子栏目不跳转√
* 文章有第三方链接，直接跳转链接。改成原文点击跳转√
* 新增模型的时候，表名必须ext_开头，否则报错√
* Chan 全局√
* 先加载service 后加载controller ,这样可以解决service没有加载的问题  
* 最新7日文章数据 √
* tag 标签热门  √


推荐 头条 热门 最新不需要
删除角色直接就删了，要提示一下


### 未来计划

* 插件
* 模板
* 资源管理
* 模板管理
* 采集
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
* SEO转向ping 
* 视频播放器
* 音频播放器模块
* 3D预览
* 教程/学习资源
* 在线客服
* 定时任务
* 在线资源管理
* 在线编辑模板
* 模板--> 音频播放  
* 模板--> 视频播放 
* AI-->文章生成
 --- 图片生成
 --- 文字生成
 --- 文字转语音
 --- 生成视频
 在线图片设计

* 接口文档生成
* 接口参数安全校验 express-validator
* knex查询优化
* 代码高亮 换成highlight.js
* 安全性：同一个角色可以删除只能删除自己发布的文章，超级管理员可以删除所有文章

Memcache
Redis
MongoDB
MySQL
PostgreSQL
SQLite
CouchDB
Cassandra
Elasticsearch
Solr
Neo4j
RabbitMQ
Kafka
ActiveMQ
AWS SQS
Google Cloud Pub/Sub
Azure Service Bus
IBM MQ
NATS
ZeroMQ
Apache Kafka
Apache Pulsar
Apache RocketMQ
Apache ActiveMQ
RabbitMQ
Amazon SQS
Google Cloud Pub/Sub
Microsoft Azure Service Bus
IBM MQ
NATS
ZeroMQ
Redis
Memcached
MongoDB
CouchDB
Cassandra
Elasticsearch
Solr

### 
compression
dotenv 
validator 
geoip-lite   - 从 IP 地址获取地理位置坐标
ip2region ip库
Numeral.js  - 用于格式化和操作数字的库。
sharp - 用于缩放 JPEG、PNG、WebP 和 TIFF 图像的 Node.js 模块。
Filesize.js - 漂亮的文件大小，例如：filesize(265318); // "265.32 kB"。
chardet 

file-saver
marked
nprogress
vuedraggable
xlsx

"animate.css": "^4.1.1",
    "axios": "^1.7.2",
    "cropperjs": "^1.6.2",
    "dayjs": "^1.11.11",
    "driver.js": "^1.3.1",
    "echarts": "^5.5.1",
    "echarts-wordcloud": "^2.1.0",
    "element-plus": "2.7.7",
    "lodash-es": "^4.17.21",
    "mitt": "^3.0.1",
    "monaco-editor": "^0.50.0",
    "nprogress": "^0.2.0",
    "pinia": "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "qrcode": "^1.5.3",
    "qs": "^6.12.3",
    "url": "^0.11.3",
    "vue": "3.4.32",
    "vue-draggable-plus": "^0.5.2",
    "vue-i18n": "9.13.1",
    "vue-json-pretty": "^2.4.0",
    "vue-router": "^4.4.0",
    "vue-types": "^5.1.3",
    "xgplayer": "^3.0.18"
    nodemailer
