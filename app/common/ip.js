/**
 * @description 获取用户登录ip
 * @param {*} req
 * @returns 返回ip地址
 */
export function getIp(req) {
  let ip =
    req.headers["x-forwarded-for"] ||
    req.ip ||
    req.headers["x-real-ip"] ||
    req?.connection?.remoteAddress ||
    req?.socket?.remoteAddress ||
    req?.connection?.socket?.remoteAddress ||
    "";

  // 如果是字符串且包含逗号，取第一个IP
  if (typeof ip === "string") {
    ip = ip.split(",").shift().trim();
  }
  // 处理IPv6环回地址转换为IPv4
  if (ip === "::1") {
    ip = "127.0.0.1";
  }
  // 如果remoteAddress是以::ffff:开头，去除前缀
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }
  return ip;
}
