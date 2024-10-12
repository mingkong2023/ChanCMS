import axios from "axios";
import { jsonp } from "./jsonp";
import { getCookie } from "./tool.js";
import { userStore } from "@/stores/user";

//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]

axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true; //设置cross跨域 并设置访问权限
axios.defaults.withCredentials = true; //允许跨域携带cookie信息
axios.defaults.timeout = 10000; //请求超时
// 创建axios实例
let http = axios.create({
  baseURL: "", // api的base_url   import.meta.env.VITE_APP_BASE_API,
});

// request拦截器
http.interceptors.request.use(
  (config) => {
    // 是否需要设置 token 请根据实际情况自行修改
    const { token } = userStore();
    token && (config.headers.auth = token);

    //拦截放行
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error || "网络异常");
  },
);

// respone拦截器
http.interceptors.response.use(
  (response) => {
    // const data = response.data;
    const { code, data, message } = response;
    // if (code === 200) {
    //   return data;
    // } else {
    //   if (code === 401) {
    //     //无权限
    //     const userInfo = userStore();
    //     userInfo.logout();
    //     location.reload();
    //   }
    // }

    if (data.code === 501) {
      if (data.msg.name == "TokenExpiredError") {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "登录失效，请重新登录",
          type: "warning",
        });
      } else {
        // eslint-disable-next-line no-undef
        ElMessage.success(data.msg);
      }
      const userInfo = userStore();
      userInfo.logout();
      location.reload();
    }

    //拦截放行
    return Promise.resolve(data);
  },
  (error) => {
    console.warn(error);
    const { response } = error;
    if (response && response.status) {
      const { status, statusText } = response;
      const codeMessage = {
        400: "请求错误",
        401: "用户没有权限。",
        403: "用户得到授权，但是访问是被禁止的。",
        404: "发出的请求是不存在的记录",
        406: "请求的格式不可得。",
        410: "请求的资源被永久删除",
        422: "验证错误",
        500: "服务器发生错误",
        502: "网关错误。",
        503: "服务不可用，服务器暂时过载或维护。",
        504: "网关超时。",
        505: "http版本不支持该请求",
      };
      const errorText = codeMessage[status] || statusText;
      // showToast(errorText);
    } else if (!response) {
      // showToast("您的网络发生异常，无法连接服务器");
    }
    return Promise.reject(error);
  },
);

http.jsonp = jsonp;
export default http;
