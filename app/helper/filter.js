
//过滤body标签
export function filterBody(str) {
  const result = /<body[^>]*>([\s\S]*)<\/body>/.exec(str);
  if (result && result.length === 2) return result[1];
  return str;
}


// 获取图片
export function filterImgFromStr(str) {
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
}


/**
 * @example [{name:'yanyutao',age:33}] => {yanyutao:33}
 * @description 数组变对象：将数组中的key作为对象的key，其余作为value
 */
export function convertArrayToObject(array, key) {
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
}

/**
 * @description 过滤非必要字段
 * @param {Array} data 原始数组数据
 * @param {Array} fields  需要的字段
 * @returns {Array} 返回最终的数组
 */
export function filterFields(data, fields) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data.map((item) => {
    const filteredItem = {};
    for (const field of fields) {
      if (item.hasOwnProperty(field)) {
        filteredItem[field] = item[field];
      }
    }
    return filteredItem;
  });
}