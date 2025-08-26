import fs from 'fs/promises';
import path from 'path';

/**
 * 获取文件树
 * @param {string} basePath 
 * @returns {Promise<Array>}
 */
export const getFileTree = async (basePath,deep = true) => {
  try {
    const stats = await fs.stat(basePath);
    if (!stats.isDirectory()) {
      return [];
    }

    const items = await fs.readdir(basePath);
    const tree = [];

    for (const item of items) {
      const itemPath = path.join(basePath, item);
      const itemStats = await fs.stat(itemPath);

      const treeItem = {
        name: item,
        path: itemPath,
        relativePath: path.relative(APP_PATH, itemPath),
        type: itemStats.isDirectory() ? 'directory' : 'file',
        size: itemStats.size,
        modified: itemStats.mtime,
        depth: itemPath.split(path.sep).length - 1
      };

      if (treeItem.type === 'directory' && deep) {
        treeItem.children = await getFileTree(itemPath);
      }

      tree.push(treeItem);
    }

    // 排序：文件夹在前，文件在后
    return tree.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });
  } catch (error) {
    console.error(`获取文件树失败: ${basePath}`, error);
    throw error;
  }
};

/**
 * 读取文件内容
 * @param {string} filePath 
 * @returns {Promise<string>}
 */
export const readFileContent = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error);
    throw error;
  }
};

/**
 * 保存文件内容
 * @param {string} filePath 
 * @param {string} content 
 * @returns {Promise<void>}
 */
export const saveFileContent = async (filePath, content) => {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    console.error(`保存文件失败: ${filePath}`, error);
    throw error;
  }
};

/**
 * 路径安全验证
 * @param {string} requestedPath 
 * @param {string} basePath 
 * @returns {boolean}
 */
export const isPathSafe = (requestedPath, basePath) => {
  const resolvedPath = path.resolve(requestedPath);
  return resolvedPath.startsWith(path.resolve(basePath));
};



/**
 * @description 删除上传的图片
 * @param {*} link 字符串
 */
export function delImg(link) {
  try {
    fs.accessSync(link);
    fs.unlinkSync(link);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

//生成目录，异步改同步
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}