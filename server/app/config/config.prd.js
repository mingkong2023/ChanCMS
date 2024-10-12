const base = require("./config.base.js");
const config = { ...base };

//mysql配置
config.database = {
  // client: "mysql2", 默认mysql
  host: "localhost",
  // port: "3306",默认3306
  user: "root",
  password: "123456",
  database: "chanyue",
  // charset: "utf8mb4",
};

//sql debug
config.debug = false;

// jwt 配置
config.token = {
  KEY: "ChanCMS",
  TIME: "1d",
};

// md5 加盐
config.secretcms = {
  key: "chanyue-cms",
};

config.env = "prd";

config.logger = {
  level: "tiny",
};

module.exports = config;
