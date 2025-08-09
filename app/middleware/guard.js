const {helper:{ z}} = Chan;
import path from 'path';

// 安全路径验证规则
export const safePathSchema = z.string()
  .min(1, "路径不能为空")
  .refine((value) => {
    // 解析绝对路径并检查是否在基础目录内
    const resolvedPath = path.join(APP_PATH, value);
    return resolvedPath.startsWith(APP_PATH);
  }, "非法路径：禁止访问系统目录")
  .refine((value) => {
    // 白名单字符验证
    return /^[\w\-\.\/]+$/.test(value);
  }, "文件名包含非法字符");


export const isValidTargetUrl =(urlString)=>{
  try {
    const allowedHosts = [];

    const url = new URL(urlString);

    // 检查是否为私有地址（禁止访问）
    const privateIpRegex = /^(127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-2])\.)/;
    if (privateIpRegex.test(url.hostname)) {
        console.log('禁止访问私有地址：', url.hostname);
      return false;
    }

    // IPv6 私有地址检查
    if (url.hostname.startsWith('fc00:') || url.hostname === '::1' || url.hostname === 'localhost') {
      return false;
    }

    // 检查是否在允许的域名范围内
    return true
    // return allowedHosts.some(host => url.hostname.endsWith(host));
  } catch (e) {
    // URL 不合法也视为不安全
    console.error(e);
    return false;
  }
}


export const safeExecuteUserFunction = (userCode)=>{
    // 1. 移除 require 和 process 调用
    let sanitizedCode = userCode
        .replace(/\brequire\s*$$/gi, '')                // 移除 require(...)
        .replace(/\bprocess\./gi, '')                   // 移除 process.xxx
        .replace(/\bchild_process\.exec/gi, '');        // 移除 child_process.exec

    // 2. 移除 import 语句（包括：import xxx from '...' 和 import '...'）
    sanitizedCode = sanitizedCode.replace(/^\s*import\s+[\s\S]*?from\s*[\s\S]*?;?$/gm, '');

    // 3. 移除动态 import(...) 表达式（例如：import('malicious.js')）
    sanitizedCode = sanitizedCode.replace(/import\s*$$[^)]+$$/g, '');

    // 4. 检测并移除 Base64 字符串：连续字母数字 + base64 特殊字符（+/=）
    sanitizedCode = sanitizedCode.replace(/(['"])(?:[A-Za-z0-9+\/=]{12,})\1/gi, (match) => {
        console.warn("发现疑似 Base64 编码内容，已移除:", match);
        return '';
    });

    // 5. 移除 Buffer.from('...', 'base64')
    sanitizedCode = sanitizedCode.replace(/Buffer\.from\s*$$[^,]+,\s*['"]base64['"]$$/gi, '');

    // 6. 移除 atob 解码函数调用
    sanitizedCode = sanitizedCode.replace(/atob\s*$$[^)]+$$/gi, '');

    return sanitizedCode;
}