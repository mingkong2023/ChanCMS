export const app = {
  appName: "ChanCMS",
  version: "3.1.2",
  versionTime: "2025-07-02",
  authorEmail: "867528315@qq.com",
  authorWechat: "yanyutao2014",
};

export let port = process.env.PORT || "3000";
export let cors = {
  origin: process.env.CORS_ORIGIN || "*", //或者['http://localhost:8080', 'http://localhost:8081']
};

export let JSON_LIMIT = process.env.JSON_LIMIT || "100kb";
