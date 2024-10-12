const dev = require("./config.dev.js");
const prd = require("./config.prd.js");

const map = new Map();
map.set("dev", dev);
map.set("prd", prd);

const config = map.get(process.env.NODE_ENV || "dev");
module.exports = config;
