const Chanjs = require("chanjs");
const chan = new Chanjs();
const config = require("./app/middleware/config.js");
chan.beforeStart(async () => {
  await config(chan.app);
});
chan.start(() => {
  console.log("ChanCMS 启动成功");
});
chan.run();
