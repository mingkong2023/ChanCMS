import http from "../utils/http";
import API from "../config/index";

//文章内容
export let getArticle = (opt) => {
  return http({
    url: `${API.BASE_API}/api/gather/getArticle`,
    method: "get",
    params: opt,
  });
};

//查 所有栏目
export let find = () => {
  return http({
    url: `${API.BASE_API}/api/gather/find`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/gather/create`,
    method: "post",
    data: opt,
  });
};

//栏目详情
export let findId = (id) => {
  return http({
    url: `${API.BASE_API}/api/gather/findId?id=${id}`,
    method: "get",
  });
};

//判断是否有子栏目
export let findSubId = (id) => {
  return http({
    url: `${API.BASE_API}/api/gather/findSubId?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/gather/update`,
    method: "post",
    data: opt,
  });
};

export let destory = (id) => {
  return http({
    url: `${API.BASE_API}/api/gather/delete?id=${id}`,
    method: "get",
  });
};

export let search = (key) => {
  return http({
    url: `${API.BASE_API}/api/gather/search?q=${key}`,
    method: "get",
  });
};

//文章列表
export let list = (cur) => {
  return http({
    url: `${API.BASE_API}/api/gather/list?cur=${cur}&pageSize=20`,
    method: "get",
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/gather/delete?id=${id}`,
    method: "get",
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/gather/detail?id=${id}`,
    method: "get",
  });
};
