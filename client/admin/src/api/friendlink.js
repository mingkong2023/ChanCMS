import http from "../utils/http.js";
import API from "../config/index.js";

//文章列表
export let list = (cur) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/list?cur=${cur}&pageSize=20`,
    method: "get",
  });
};

//增
export let create = (opt) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/create`,
    method: "post",
    data: opt,
  });
};

//删
export let del = (id) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/delete?id=${id}`,
    method: "get",
  });
};

//改
export let update = (opt) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/update`,
    method: "post",
    data: opt,
  });
};

// 更新便签引用次数 type=1 add type=2 remove
export let countUpdate = (id, type = 1) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/countUpdate`,
    method: "post",
    data: {
      id,
      type,
    },
  });
};

//文章详情
export let detail = (id) => {
  return http({
    url: `${API.BASE_API}/api/friendlink/detail?id=${id}`,
    method: "get",
  });
};
