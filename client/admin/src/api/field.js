import http from "../utils/http.js";
import API from "../config/index.js";

//文章列表
export let list = (mid, cur = 1) => {
  return http({
    url: `${API.BASE_API}/api/field/list?cur=${cur}&mid=${mid}`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/field/create`,
    method: "post",
    data: opt,
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/field/delete?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/field/update`,
    method: "post",
    data: opt,
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/field/detail?id=${id}`,
    method: "get",
  });
};
