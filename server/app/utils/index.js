const fs = require("fs");
const path = require("path");

/**
 * @description 是否存在
 * @param {*} dir 目录
 * @returns {Boolean} 返回true false
 */
function isExist(dir) {
  let formatDir = path.normalize(dir);
  try {
    fs.accessSync(formatDir, fs.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

exports.isExist = isExist;

/**
 * @description 是否是文件
 * @param {*} filePath
 * @returns {Boolean} true 是文件 false 不是文件
 */
function isFile(filePath) {
  if (!isExist(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}
exports.isFile = isFile;

/**
 * @description 是否是目录
 * @param {*} filePath
 * @returns {Boolean} 返回true false
 */
function isDirectory(filePath) {
  if (!isExist(filePath)) return false;
  try {
    const stat = fs.statSync(filePath);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
}
exports.isDirectory = isDirectory;

/**
 * @description 修改指定路径 `p` 的权限模式为给定的 `mode`。这是一个同步版本的文件权限更改方法
 * 如果成功修改权限，则返回 `true`，否则在发生错误时捕获异常并返回 `false`。
 * @param  {String} p  - 要更改权限的文件或目录的绝对路径。
 * @param  {String|Number} mode - 指定的新权限模式，可以是八进制数字表示（如0o755）或字符串形式（如"755"）
 * @return {Boolean}  - 根据操作是否成功，返回 `true` 表示成功，`false` 表示失败。
 */
function chmod(p, mode) {
  try {
    fs.chmodSync(p, mode);
    return true;
  } catch (e) {
    return false;
  }
}
exports.chmod = chmod;

/**
 * @function mkdir
 * @description 递归创建目录
 * @param {string} dir - 要创建的目录路径。
 * @param {string|number}  -  默认为 0o777。可以是八进制数字表示或字符串形式。
 * @returns {boolean} -  返回 `true` 表示成功，`false` 表示失败。
 */
function mkdir(dir, mode) {
  if (isExist(dir)) {
    if (mode) return chmod(dir, mode);
    return true;
  }
  const pp = path.dirname(dir);
  if (isExist(pp)) {
    try {
      fs.mkdirSync(dir, mode);
      return true;
    } catch (e) {
      return false;
    }
  }
  if (mkdir(pp, mode)) return mkdir(dir, mode);
  return false;
}
exports.mkdir = mkdir;

function getdirFiles(dir, prefix = "") {
  dir = path.normalize(dir);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  let result = [];
  files.forEach((item) => {
    const currentDir = path.join(dir, item);
    const stat = fs.statSync(currentDir);
    if (stat.isFile()) {
      result.push(path.join(prefix, item));
    } else if (stat.isDirectory()) {
      const cFiles = getdirFiles(currentDir, path.join(prefix, item));
      result = result.concat(cFiles);
    }
  });
  return result;
}

exports.getdirFiles = getdirFiles;

/**
 * remove dir aync
 * @param  {String} p       [path]
 * @param  {Boolean} reserve []
 * @return {Promise}         []
 */
function rmdir(p, reserve) {
  if (!isDirectory(p)) return Promise.resolve();
  return fsReaddir(p).then((files) => {
    const promises = files.map((item) => {
      const filepath = path.join(p, item);
      if (isDirectory(filepath)) return rmdir(filepath, false);
      return fsUnlink(filepath);
    });
    return Promise.all(promises).then(() => {
      if (!reserve) return fsRmdir(p);
    });
  });
}
exports.rmdir = rmdir;