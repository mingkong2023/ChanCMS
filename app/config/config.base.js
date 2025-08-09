const config = {};
config.appName = "ChanCMS";
config.port = "3000";
config.version = "v3.3.0";
config.versionTime = "2025-08-01";
config.authorEmail = "867528315@qq.com";
config.authorWechat = "yanyutao2014";
config.JSON_LIMIT = "100kb";
config.upload = {
  logoSize: 50 * 1024, // 50kb
  imgSize: 200 * 1024, // 100kb
}
//默认静态资源目录和请求地址配置
config.statics = [
  {
    prefix: "/public/",
    dir: "app/public",
    maxAge: 0,
  },
];

config.modules = [
  "base",
  "cms",
  "api",
  "vip",
  "web",
];

//后台操作接口权限控制，不配置则不开启权限控制
config.perms = [
  "category",
  "article",
  "slide",
  "tag",
  "collect",
  "gather",
  "model",
  "field",
  "friendlink",
  "message",
  "user",
  "role",
  "menu",
];

config.plugins = ["plus-wechat"];

export default config;
