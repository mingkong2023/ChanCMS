import http from "../utils/http";
import API from "../config/index";

export let find = () => {
  return http({
    url: `${API.BASE_API}/api/sysApp/find`,
    method: "get",
  });
};

export let views = () => {
  return http({
    url: `${API.BASE_API}/api/sysApp/views`,
    method: "get",
  });
};

export let config = () => {
  return http({
    url: `${API.BASE_API}/api/sysApp/config`,
    method: "get",
  });
};

export let update = (data) => {
  return http({
    url: `${API.BASE_API}/api/sysApp/update`,
    method: "post",
    data,
  });
};
