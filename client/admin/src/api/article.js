import http from "../utils/http.js";
import API from "../config/index.js";

//文章列表
export let search = (cur = 1, keyword = "", cid = 0) => {
  return http({
    url: `${API.BASE_API}/api/article/search?cur=${cur}&pageSize=20&keyword=${keyword}&cid=${cid}`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/article/create`,
    method: "post",
    data: opt,
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/article/delete?id=${id}`,
    method: "get",
  });
};

export let delfile = (url) =>{
  return http({
    url: `${API.BASE_API}/api/article/delfile?url=${url}`,
    method: "get",
  });
}
//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/article/update`,
    method: "post",
    data: opt,
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/article/detail?id=${id}`,
    method: "get",
  });
};

export let findField = (cid) => {
  return http({
    url: `${API.BASE_API}/api/article/findField?cid=${cid}`,
    method: "get",
  });
};

export let tongji = () => {
  return http({
    url: `${API.BASE_API}/api/article/tongji`,
    method: "get",
  });
};
