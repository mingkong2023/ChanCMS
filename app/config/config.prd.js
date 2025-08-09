import base from "./config.base.js";
const config = { ...base };

//mysql配置
config.db = [
  {
    client: "mysql2",
    host: "localhost",
    user: "root",
    password: "123456",
    database: "chancms",
    debug: false,
  },
];

//web端口
config.port = "3000";

//静态资源
config.statics = [...base.statics];

// 缓存
config.cache = false;

// jwt 配置
config.token = {
  KEY: "ChanCMS",
  TIME: "1d",
  REFRESH: false, //是否开启刷新token
};

// bcrypt 加盐
config.secretcms = {
  key: 10,
};

//cors
config.cors = {
  origin: "*", //或者['http://localhost:8080', 'http://localhost:8081']
};

//多个views
config.views = []; //path.join(config.appRoot, `modules/web/view`)

// 模板缓存 dev 环境不缓存 prod 环境缓存
config.env = "prd";

config.logger = {
  level: "tiny",
};

export default config;

