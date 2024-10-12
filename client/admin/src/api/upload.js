import http from "../utils/http.js";
import API from "../config/index.js";
import { find } from "./sys_config.js";
//上传
// let formData = new FormData();
// formData.append('file', file);
// formData.append('fileName', file.name);

export let upload = (data) => {
  return find()
    .then((res) => {
      if (res.code === 200) {
        let { uploadWay } = res.data;
        let api = {
          1: `${API.BASE_API}/api/upload`,
          2: `${API.BASE_API}/api/qiniu/upload`,
        };

        return http({
          url: api[uploadWay],
          method: "post",
          headers: {
            "Content-type": "multipart/form-data",
          },
          data: data,
        });
      } else {
        console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
      // 返回错误以便调用者能捕获处理
      return Promise.reject(error);
    });
};

export let uploadUrl = () => {
  return find()
    .then((res) => {
      if (res.code === 200) {
        let { uploadWay } = res.data;
        let api = {
          1: `${API.BASE_API}/api/upload`,
          2: `${API.BASE_API}/api/qiniu/upload`,
        };
        return api[uploadWay];
      } else {
        console.log(res);
      }
    })
    .catch((error) => {
      console.log(error);
      // 返回错误以便调用者能捕获处理
      return Promise.reject(error);
    });
};
