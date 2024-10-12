const { config } = Chan;

class PdfController {
  // 登录
  async pdf(req, res, next) {
    try {
      let file = req.query.file || "";
      const pdfPath = path.join(__dirname, `../../../${file}`);
      // 检查文件是否存在
      fs.access(pdfPath, fs.constants.R_OK, (err) => {
        if (err) {
          console.error("文件不存在或无法访问:", err);
          res.status(404).send("File not found");
          return;
        }

        // 获取文件大小
        fs.stat(pdfPath, (err, stats) => {
          if (err) {
            console.error("获取文件大小时出错:", err);
            res.status(500).send("Internal Server Error");
            return;
          }

          const totalByte = stats.size;
          let { startByte = 0, endByte = totalByte - 1 } = req.headers.range
            ? parseRange(req.headers.range, totalByte)
            : {};

          // 设置响应头
          res.writeHead(206, {
            "Content-Type": "application/octet-stream",
            "Content-Length": endByte - startByte + 1,
            "Content-Range": `bytes ${startByte}-${endByte}/${totalByte}`,
            "Accept-Ranges": "bytes",
            "Access-Control-Expose-Headers": "Accept-Ranges,Content-Range",
          });

          // 创建可读流并发送数据
          const stream = fs.createReadStream(pdfPath, {
            start: startByte,
            end: endByte,
          });
          stream.pipe(res);
          stream.on("error", (err) => {
            console.error("读取文件时出错:", err);
            res.status(500).send("Internal Server Error");
          });
        });
      });
    } catch (error) {
      // 关闭文件流
      next(error);
    }
  }
}

module.exports = PdfController;
