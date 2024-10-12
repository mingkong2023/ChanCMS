import http from "../utils/http";
import API from "../config/index";

//文章列表
export let list = (cur) => {
  return http({
    url: `${API.BASE_API}/api/loginLog/list?cur=${cur}&pageSize=20`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/loginLog/create`,
    method: "post",
    data: opt,
  });
};

//超过100条自动删除
export let del = () => {
  return http({
    url: `${API.BASE_API}/api/loginLog/delete`,
    method: "get",
  });
};

//获取ip
export let getIp = () => {
  return http({
    url: `https://qifu-api.baidubce.com/ip/local/geo/v1/district`,
    method: "get",
    withCredentials: false, // 添加这一行
    headers: {
      Origin:false,
      Referer: false,
    },
  });
};
