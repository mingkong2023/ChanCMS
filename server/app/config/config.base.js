const path = require("path");

const ROOT_PATH = process.cwd();
const APP_PATH = path.join(ROOT_PATH, "app");
const config = {};
config.appRoot = APP_PATH;
config.version = "v3.0.8";
config.appName = "ChanCMS";
config.port = "81";
config.versionTime = "2024-10-01";
config.author = "明空";
config.authorEmail = "867528315@qq.com";
config.authorWechat = "yanyutao2014";
config.JSON_LIMIT = "100kb";

config.static = {
  prefix: "/public/",
  dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
  dir: ["app/public"],
  maxAge: 0, // in prod env, 0 in other envs
  buffer: false, // in prod env, false in other envs
  preload: false,
};

module.exports = config;
