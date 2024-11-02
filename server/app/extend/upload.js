const multer = require("multer");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const {
  config: { template },
} = Chan;
const storage = multer.diskStorage({
  //目的地
  destination: async function (req, file, cb) {
    let date = dayjs(Date.now()).format("YYYY/MM/DD");
    let dir = path.join(`app/public/uploads/${template}`, date);
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }
    mkdirsSync(dir);
    cb(null, dir);
  },
  //文件名
  filename: (req, file, cb) => {
    //1、获取后缀名
    // let extname = path.extname(file.originalname);
    //2、根据时间戳生成文件名
    cb(null, Date.now() + `_source_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
