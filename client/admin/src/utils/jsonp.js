/**
 * @description 传入对象转换成url字符串
 * @param {*} param 参数对象
 * @returns 返回url字符串
 */
export const objToUrl = function (obj = {}) {
  const key = Object.keys(obj);
  const val = Object.values(obj);
  return key.map((v, i) => v + "=" + val[i]).join("&");
};

/**
 * @description jsonp 请求
 * @param {Object} url -请求地址
 * @param {Object} data - 请求参数
 * @returns Promise
 */
export const jsonp = function ({ url, data = {} }) {
  let time = +new Date();
  //解决针对cms请求处理，cms比较奇葩调用的是固定的cmsCallback
  const cbName = data.callback ? data.callback : `light_${time}`;
  //增加回调方法
  data.callback = cbName;

  // js加载不跨域
  const script = document.createElement("script");
  script.setAttribute("src", url + "?" + objToUrl(data));
  document.body.appendChild(script);
  return new Promise((resolve, reject) => {
    window[cbName] = (res) => {
      resolve(res);
      if (script) document.body.removeChild(script);
      delete window[cbName];
    };
    script.onerror = function (e) {
      reject(e);
    };
  });
};
