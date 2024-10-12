import http from "../utils/http.js";
import API from "../config/index.js";

/**
 * @description 网站基本信息
 */
export let siteInfo = () => {
  return http({
    url: `${API.BASE_API}/api/site/find`,
    method: "get",
  });
};

//更新基本信息
export let update = (data) => {
  return http({
    url: `${API.BASE_API}/api/site/update`,
    method: "post",
    data,
  });
};

/**
 * @description 运行环境
 */
export let runEnv = () => {
  return http({
    url: `${API.BASE_API}/api/site/runEnv`,
    method: "get",
  });
};
