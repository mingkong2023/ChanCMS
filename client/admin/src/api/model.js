import http from "../utils/http.js";
import API from "../config/index.js";

//文章列表
export let list = (cur = 1) => {
  return http({
    url: `${API.BASE_API}/api/model/list?cur=${cur}`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/model/create`,
    method: "post",
    data: opt,
  });
};

//删
export let del = (id, table) => {
  return http({
    url: `${API.BASE_API}/api/model/delete`,
    method: "post",
    data: {
      id,
      table,
    },
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/model/update`,
    method: "post",
    data: opt,
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/model/detail?id=${id}`,
    method: "get",
  });
};

//判断模型是否被使用
export let hasUse = (id) => {
  return http({
    url: `${API.BASE_API}/api/model/hasUse?id=${id}`,
    method: "get",
  });
};
