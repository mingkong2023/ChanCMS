import http from "../utils/http";
import API from "../config/index";

//页面集合
export let getPages = (opt) => {
  return http({
    url: `${API.BASE_API}/api/collect/getPages`,
    method: "post",
    data: opt,
  });
};

//文章内容
export let getArticle = (opt) => {
  return http({
    url: `${API.BASE_API}/api/collect/getArticle`,
    method: "post",
    data: opt,
  });
};

//查 所有栏目
export let find = () => {
  return http({
    url: `${API.BASE_API}/api/collect/find`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/collect/create`,
    method: "post",
    data: opt,
  });
};

//栏目详情
export let findId = (id) => {
  return http({
    url: `${API.BASE_API}/api/collect/findId?id=${id}`,
    method: "get",
  });
};

//判断是否有子栏目
export let findSubId = (id) => {
  return http({
    url: `${API.BASE_API}/api/collect/findSubId?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/collect/update`,
    method: "post",
    data: opt,
  });
};

export let destory = (id) => {
  return http({
    url: `${API.BASE_API}/api/collect/delete?id=${id}`,
    method: "get",
  });
};

export let search = (key) => {
  return http({
    url: `${API.BASE_API}/api/collect/search?q=${key}`,
    method: "get",
  });
};

//文章列表
export let list = (cur) => {
  return http({
    url: `${API.BASE_API}/api/collect/list?cur=${cur}&pageSize=20`,
    method: "get",
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/collect/delete?id=${id}`,
    method: "get",
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/collect/detail?id=${id}`,
    method: "get",
  });
};
