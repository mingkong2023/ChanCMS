import app from "./app.js";
import { cache } from "./cache.js";
import { PASSWORD_SALT } from "./salt.js";
import { db } from "./database.js";
import { jwt } from "./jwt.js";
import { logger } from "./log.js";
import { modules } from "./modules.js";
import { perms } from "./perm.js";
import { plugins } from "./plugins.js";
import { statics } from "./static.js";
import { upload } from "./upload.js";
import { views } from "./view.js";

export default {
  ...app,
  cache,
  PASSWORD_SALT,
  ...jwt,
  db,
  logger,
  modules,
  perms,
  plugins,
  statics,
  upload,
  views,
};
