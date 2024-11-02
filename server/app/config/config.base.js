const path = require("path");

const ROOT_PATH = process.cwd();
const APP_PATH = path.join(ROOT_PATH, "app");
const config = {};
config.appRoot = APP_PATH;
config.version = "v3.0.9";
config.appName = "ChanCMS";
config.port = "81";
config.versionTime = "2024-10-01";
config.author = "yanyutao";
config.authorEmail = "867528315@qq.com";
config.authorWechat = "yanyutao2014";
config.JSON_LIMIT = "100kb";

config.static = [{
  prefix: "/public/",
  dir: ["app/public"],
  maxAge: 0,
}];

module.exports = config;
