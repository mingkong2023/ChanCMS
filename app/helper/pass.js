import bcrypt from 'bcryptjs';
import crypto from "crypto";

// md5加密
export function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

export { bcrypt };