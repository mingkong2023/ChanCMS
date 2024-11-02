const Chanjs = require("chanjs");
const chan = new Chanjs();
chan.start();
chan.run((port) => {
  console.log(`ChanCMS is running on ${port}`);
});
