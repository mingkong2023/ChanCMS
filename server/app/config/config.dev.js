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

//cors
config.cors = {
  origin: "*", //或者['http://localhost:8080', 'http://localhost:8081']
};

//多个views
config.views = []; //path.join(config.appRoot, `modules/web/view`)

config.env = "dev";

config.logger = {
  level: "dev",
};

module.exports = config;
