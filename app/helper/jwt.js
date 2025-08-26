import jwt from "jsonwebtoken";
// 设置token
export function setToken(data, key, time) {
  const token = jwt.sign(data, key, {
    expiresIn: time,
  });
  return token;
}

// 获取token
export async function getToken(token, key) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, async (err, decode) => {
      if (err) {
        reject(err);
        console.error(err);
      } else {
        resolve(decode);
      }
    });
  });
}