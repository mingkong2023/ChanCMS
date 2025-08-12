// file: chunkUpload.js
import multer from "multer";
import crypto from "crypto";
import path from "path";
import { promisify } from "util";
import { pipeline } from "stream/promises";
import fs from "fs/promises";
import rimraf from "rimraf";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 基础配置
const config = {
  uploadRoot: path.join(__dirname, "../public/uploads"),
  tempLifetime: 3600 * 1000, // 1小时
};

// 分片专用配置
const chunkConfig = {
  tempDir: path.join(config.uploadRoot, "temp"),
  chunkSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["video/mp4", "application/octet-stream"],
  finalUploadDir: path.join(config.uploadRoot, "videos")
};

// 工具方法
const sanitizeFilename = (name) => 
  name.replace(/[^a-zA-Z0-9\-_.]/g, "_").replace(/(\.\.\/|\/)/g, "");

// 存储引擎配置
const chunkStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { fileHash, chunkIndex } = req.body;
      if (!fileHash || isNaN(chunkIndex)) {
        return cb(new Error("无效的分片参数"));
      }

      const chunkDir = path.join(chunkConfig.tempDir, fileHash);
      
      // 第一个分片上传时清理历史
      if (parseInt(chunkIndex) === 0) {
        await promisify(rimraf)(chunkDir).catch(console.error);
      }

      await fs.mkdir(chunkDir, { recursive: true });
      cb(null, chunkDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.chunkIndex}.part`);
  }
});

// 分片上传中间件
export const chunkUploadMiddleware = multer({
  storage: chunkStorage,
  limits: { fileSize: chunkConfig.chunkSize },
  fileFilter: (req, file, cb) => {
    chunkConfig.allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("不支持的分片文件类型"));
  }
}).single("chunk");

// 分片合并方法
export const mergeChunks = async ({
  fileHash,
  fileName,
  totalChunks,
  expectedHash
}) => {
  // 参数校验
  if (isNaN(totalChunks) || totalChunks <= 0) {
    throw new Error('无效的分片总数');
  }

  const chunkDir = path.join(chunkConfig.tempDir, fileHash);
  const chunks = await fs.readdir(chunkDir);
  
  // 验证分片数量
  if (chunks.length !== totalChunks) {
    throw new Error(`分片数量不符，预期: ${totalChunks}，实际: ${chunks.length}`);
  }

  // 生成最终路径
  const finalPath = path.join(
    chunkConfig.finalUploadDir,
    dayjs().format('YYYY/MM/DD'),
    `${fileHash}_${sanitizeFilename(fileName)}`
  );
  await fs.mkdir(path.dirname(finalPath), { recursive: true });

  // 哈希校验流程
  const hash = crypto.createHash('sha256');
  const writeStream = fs.createWriteStream(finalPath);

  try {
    // 按顺序合并分片
    for (const chunk of chunks.sort((a, b) => parseInt(a) - parseInt(b))) {
      const chunkPath = path.join(chunkDir, chunk);
      await pipeline(
        fs.createReadStream(chunkPath),
        // 更新哈希计算
        async function*(source) {
          for await (const chunk of source) {
            hash.update(chunk);
            yield chunk;
          }
        },
        writeStream, 
        { end: false }
      );
    }

    // 最终哈希校验
    const actualHash = hash.digest('hex');
    if (actualHash !== expectedHash) {
      throw new Error(`文件校验失败，预期: ${expectedHash}，实际: ${actualHash}`);
    }
  } finally {
    writeStream.end();
    await promisify(rimraf)(chunkDir);
  }

  return { 
    path: finalPath,
    size: (await fs.stat(finalPath)).size 
  };
};

// 临时文件清理
export const cleanTempFiles = async (excludeHash) => {
  try {
    const dirs = await fs.readdir(chunkConfig.tempDir);
    const now = Date.now();
    
    await Promise.all(dirs.map(async dir => {
      if (dir === excludeHash) return;
      
      const dirPath = path.join(chunkConfig.tempDir, dir);
      const stat = await fs.stat(dirPath);
      
      if (now - stat.birthtimeMs > config.tempLifetime) {
        await promisify(rimraf)(dirPath);
      }
    }));
    
    return { success: true };
  } catch (err) {
    console.error("临时文件清理失败:", err);
    return { success: false, error: err.message };
  }
};