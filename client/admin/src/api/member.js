import http from "../utils/http.js";
import API from "../config/index.js";

//查 所有栏目
export let find = () => {
  return http({
    url: `${API.BASE_API}/api/member/find`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/member/create`,
    method: "post",
    data: opt,
  });
};

//栏目详情
export let findId = (id) => {
  return http({
    url: `${API.BASE_API}/api/member/findId?id=${id}`,
    method: "get",
  });
};

//判断是否有子栏目
export let findSubId = (id) => {
  return http({
    url: `${API.BASE_API}/api/member/findSubId?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/member/update`,
    method: "post",
    data: opt,
  });
};

export let destory = (id) => {
  return http({
    url: `${API.BASE_API}/api/member/delete?id=${id}`,
    method: "get",
  });
};

export let search = (key) => {
  return http({
    url: `${API.BASE_API}/api/member/search?q=${key}`,
    method: "get",
  });
};
