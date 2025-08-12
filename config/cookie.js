// jwt 配置
export let token = {
  KEY: process.env.TOKEN_KEY || "ChanCMS",
  TIME: process.env.TOKEN_TIME || "1d",
  REFRESH: process.env.TOKEN_REFRESH || false, //是否开启刷新token
};

// bcrypt 加盐
export let secretcms = {
  key: process.env.SECRET_CMS_KEY || 10,
};
