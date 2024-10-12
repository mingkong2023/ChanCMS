import http from "../utils/http.js";
import API from "../config/index.js";

//文章列表
export let list = (cur) => {
  return http({
    url: `${API.BASE_API}/api/sysRole/list?cur=${cur}&pageSize=20`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/sysRole/create`,
    method: "post",
    data: opt,
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/sysRole/delete?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/sysRole/update`,
    method: "post",
    data: opt,
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/sysRole/detail?id=${id}`,
    method: "get",
  });
};
