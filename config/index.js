import { app, port, cors, JSON_LIMIT } from "./app.js";
import { cache } from "./cache.js";
import { secretcms, token } from "./cookie.js";
import { db } from "./database.js";
import { logger } from "./log.js";
import { modules } from "./modules.js";
import { perms } from "./perm.js";
import { plugins } from "./plugins.js";
import { statics } from "./static.js";
import { upload } from "./upload.js";
import { views } from "./view.js";

let config = {
  ...app,
  port,
  cors,
  JSON_LIMIT,
  cache,
  secretcms,
  token,
  db,
  logger,
  modules,
  perms,
  plugins,
  statics,
  upload,
  views,
};

export default config;
