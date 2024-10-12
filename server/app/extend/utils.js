const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// 无限极分类tree
exports.tree = function tree(arr, pid = 0) {
  let result = [];
  arr.forEach((item, index) => {
    if (item.pid === pid) {
      let children = tree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      item.level = 1;
      result.push(item);
    }
  });
  return result;
};

// 返回id父级所有栏目 位置
exports.treeById = (id, source) => {
  const arr = [];
  const findId = (id, source) => {
    for (let i = 0, item; i < source.length; i++) {
      item = source[i];
      if (item.id == id) {
        arr.unshift(item);
        if (item.pid != 0) {
          findId(item.pid, source);
        }
      }
    }
  };
  findId(id, source);
  const _path = [];
  arr.forEach((item) => {
    _path.push("/" + item.pinyin);
    item.path = _path.join("");
  });
  return arr;
};

// 获取子栏目
exports.getChildrenId = (py, source) => {
  let cate = {};
  let id = "";
  source.forEach((item) => {
    if (item.pinyin == py || item.id == py) {
      cate = item;
      id = item.id;
    }
  });
  return { cate, id };
};

// 设置token
exports.setToken = (data, key, time) => {
  const token = jwt.sign(data, key, {
    expiresIn: time,
  });
  return token;
};

// 获取token
exports.getToken = (token, key) => {
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
};

// md5加密
exports.md5 = (str) => {
  return require("crypto").createHash("md5").update(str).digest("hex");
};

//过滤body标签
exports.filterBody = (str) => {
  const result = /<body[^>]*>([\s\S]*)<\/body>/.exec(str);
  if (result && result.length === 2) return result[1];
  return str;
};

exports.pc = (str) => {
  if (
    str.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return false;
  }
  return true;
};

// 获取图片
exports.filterImgFromStr = (str) => {
  if (!str) {
    return [];
  }
  const imgReg = /<img.*?(?:>|\/>)/gi;
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  const arr = str.match(imgReg);
  const imgArr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      const src = arr[i].match(srcReg);
      if (src[1]) {
        imgArr.push(src[1]);
      }
    }
  }
  return imgArr;
};

/**
 * @description 删除上传的图片
 * @param {*} link 字符串
 */
exports.delImg = (link) => {
  try {
    fs.accessSync(link);
    fs.unlinkSync(link);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

//生成目录，异步改同步
exports.mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};

/**
 * @example [{name:'yanyutao',age:33}] => {yanyutao:33}
 * @description 数组变对象：将数组中的key作为对象的key，其余作为value
 */
exports.convertArrayToObject = (array, key) => {
  if (!Array.isArray(array) || array.length === 0) {
    return {};
  }
  const result = {};
  for (const item of array) {
    const { [key]: mark, content } = item;
    if (mark) {
      result[mark] = content;
    }
  }
  return result;
};

/**
 * @description 过滤非必要字段
 * @param {Array} data 原始数组数据
 * @param {Array} fields  需要的字段
 * @returns {Array} 返回最终的数组
 */
const dayjs = require("dayjs");
require("dayjs/locale/zh-cn");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

exports.filterFields = (data, fields, isTime = true) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data.map((item) => {
    if (isTime) {
      item.createdAt = dayjs(item.createdAt).format("MM-DD");
    } else {
      item.createdAt = dayjs(item.createdAt).fromNow().replace(" ", "");
    }
    // item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
    const filteredItem = {};
    for (const field of fields) {
      if (item.hasOwnProperty(field)) {
        filteredItem[field] = item[field];
      }
    }
    return filteredItem;
  });
};

/**
 * @description 格式化时间
 * @param {Array} data 数组
 * @param {Boolean} time 是否开启具体时间
 * @param {String} format YYYY-MM-DD HH:mm:ss
 * @returns 返回处理过的数组
 */
exports.formatDay = (data, time = true, format = "YYYY-MM-DD") => {
  data.forEach((item) => {
    if (item.createdAt) {
      item.createdAt = time
        ? dayjs(item.createdAt).format(format)
        : dayjs(item.createdAt).fromNow().replace(" ", "");
    }
  });
  return data;
};

/**
 * @description 输出分页标签
 * @param {*} current 当前页面
 * @param {*} total 总条数
 * @param {*} pageSize 每页数量
 * @param {*} href 跳转路由
 * @returns 返回分页html
 */
exports.pages = function (current, total, pageSize, href) {
  let pageTemp = [];
  let totalPage = Math.ceil(total / pageSize);
  if(totalPage<=1){
    return '';
  }
  let pageStr = `<p>共${total}条记录，共${totalPage},当前${current}</p>`;
  //上一页
  if (current == 1) {
    pageTemp.push(`<li class="disabled">上一页</li>`);
  } else {
    pageTemp.push(`<li><a href='${href}${current - 1}.html'>上一页</a></li>`);
  }
  //中间的 小于8页面
  if (totalPage <= 8) {
    for (let i = 0; i < totalPage; i++) {
      if (current == i + 1) {
        pageTemp.push(
          `<li class="current"><a href='${href}${i + 1}.html'>${i + 1}</a></li>`
        );
      } else {
        pageTemp.push(`<li><a href='${href}${i + 1}.html'>${i + 1}</a></li>`);
      }
    }
  } else {
    //获取前3
    for (let i = 0; i < 3; i++) {
      if (current == i + 1) {
        pageTemp.push(
          `<li class="current"><a href='${href}${i + 1}.html'>${i + 1}</a></li>`
        );
      } else {
        pageTemp.push(`<li><a href='${href}${i + 1}.html'>${i + 1}</a></li>`);
      }
    }
    pageTemp.push(`<li><a href='${href}${3 + 1}.html'>...</a></li>`);
    for (let i = totalPage - 3; i < totalPage; i++) {
      if (current == i + 1) {
        pageTemp.push(
          `<li class="current"><a href='${href}${i + 1}.html'>${i + 1}</a></li>`
        );
      } else {
        pageTemp.push(`<li><a href='${href}${i + 1}.html'>${i + 1}</a></li>`);
      }
    }
  }
  //下一页
  if (current == totalPage) {
    pageTemp.push(`<li class="disabled">下一页</li>`);
  } else {
    pageTemp.push(`<li><a href='${href}${current + 1}.html'>下一页</a></li>`);
  }
  return pageTemp.join("");
};


/**
 * @description 获取模板文件
 * @param {*} folderPath
 * @returns 获取模板文件
 */
exports.getHtmlFilesSync = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const htmlFiles = [];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && path.extname(file) === ".html") {
      htmlFiles.push(file);
    }
  });
  return htmlFiles;
};

/**
 * @description 获取用户登录ip
 * @param {*} req
 * @returns 返回ip地址
 */
exports.getIp = (req) => {
  let ip = 
  req.headers['x-forwarded-for'] ||
	req.ip ||
	req?.connection?.remoteAddress ||
	req?.socket?.remoteAddress ||
	req?.connection?.socket?.remoteAddress ||
	'';

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
};


exports.htmlDecode = (str) => {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&quot;/g, '"');
  return s;
};
