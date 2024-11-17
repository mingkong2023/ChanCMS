const path = require("path");

const ROOT_PATH = process.cwd();
const APP_PATH = path.join(ROOT_PATH, "app");
const config = {};
config.appRoot = APP_PATH;
config.appName = "ChanCMS";
config.port = "81";
config.versionTime = "2024-11-15";
config.authorEmail = "867528315@qq.com";
config.authorWechat = "yanyutao2014";
config.JSON_LIMIT = "100kb";

config.static = [{
  prefix: "/public/",
  dir: ["app/public"],
  maxAge: 0,
}];

config.modules = ['api','common','web'];
config.plugins = ['plus-wechat'];

module.exports = config;
