import dev from "./config.dev.js";
import prd from "./config.prd.js";

const map = new Map();
map.set("dev", dev);
map.set("prd", prd);

const config = map.get(process.env.NODE_ENV || "dev");
export default config;
