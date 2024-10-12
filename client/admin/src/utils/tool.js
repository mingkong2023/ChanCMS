import Cookies from "js-cookie";

export const setTitle = (title) => {
  window.document.title = `${title}-chancms管理系统` || "chancms管理系统";
};

export const setCookie = (tokenName = "token", token) => {
  Cookies.set(tokenName, token);
};

export const getCookie = (tokenName = "token") => {
  return Cookies.get(tokenName);
};

//无限极分类 适配 element-ui组件
export let addLabelValue = (arr) => {
  for (let item of arr) {
    item["label"] = item["name"];
    item["value"] = item["id"];
    if (item.children) {
      addLabelValue(item.children);
    }
  }
  return arr;
};

// 无限极分类tree
export let tree = (arr, pid = 0) => {
  let result = [];
  arr.forEach((item, index) => {
    if (item.pid === pid) {
      let children = tree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      item.level = 1; // 或者这里使用 leval，取决于你希望如何命名层级变量
      result.push(item);
    }
  });
  return result;
};

//返回id父级所有栏目
export let treeById = (id, source) => {
  const arr = [];
  let findId = (id, source) => {
    for (let i = 0, item; i < source.length; i++) {
      item = source[i];
      if (item.id == id) {
        arr.unshift(item.id);
        if (item.pid != 0) {
          findId(item.pid, source);
        }
      }
    }
  };
  findId(id, source);
  return arr;
};

// html过滤出图片
export let getImgUrlFromStr = (str) => {
  let imgReg = /<img.*?(?:>|\/>)/gi; //匹配出图片img标签
  // eslint-disable-next-line no-useless-escape
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //匹配出图片src属性
  let arr = str.match(imgReg);
  let imgArr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg);
      if (src[1]) {
        imgArr.push(src[1]);
      }
    }
  }
  return imgArr;
};

export let filterAndReplaceImgSrc = (html) => {
  var regex = /<img[^>]+src="([^">]+)"/g;
  var result = html.replace(regex, function (match, src) {
    if (src.startsWith("public")) {
      src = src.replace("public", "/public");
    }
    return '<img src="' + src + '"';
  });
  return result;
};

// 过滤 html标签
export let filterHtml = (str) => {
  // 查找第一个段落的结束位置
  let endIndex = str.indexOf("</p>");
  // 如果找到第一个段落的结束位置
  if (endIndex !== -1) {
    // 将字符串截断到第一个段落的结束位置加上"</p>"的长度
    str = str.substring(0, endIndex + 4);
  }
  // 创建一个临时元素，用于处理字符串中的HTML内容
  let tempElement = document.createElement("div");
  tempElement.innerHTML = str;
  // 获取处理后的文本内容，包括实体字符
  let filteredText = tempElement.textContent;
  // 如果文本内容超过255个字符
  if (filteredText.length > 225) {
    // 向前查找中文句号进行分割
    let splitIndex = filteredText.lastIndexOf("。", 255);
    // 如果找到分割点，则将字符串分割成两个部分
    if (splitIndex !== -1) {
      filteredText = filteredText.slice(0, splitIndex + 1);
    }
  }
  // 销毁临时元素，释放内存
  tempElement.remove();
  return filteredText;
};

// 过滤 body标签
export let filterBody = (str) => {
  var result = /<body[^>]*>([\s\S]*)<\/body>/.exec(str);
  if (result && result.length === 2) return result[1];
  return str;
};

/*html加码*/
export let htmlEncode = (str) => {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");
  return s;
};
/*html解码*/
export let htmlDecode = (str) => {
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


export let showErrors = (invalidFields) => {
  Object.keys(invalidFields).forEach((field) => {
    const errors = invalidFields[field].map((err) => err.message);
    ElMessage.success({
      message: `${errors.join(', ')}`,
      type: 'success',
      duration: 2000
    });
  });
};


