import Chan from "chanjs";
const chan = new Chan();
await chan.start();
chan.run((port) => {
  console.log(`ChanCMS is running on ${port}`);
});