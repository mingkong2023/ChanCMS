import API from "../config/index.js";
import http from "../utils/http.js";

export default class Base {
  static API = API.BASE_API;

  version() {
    return "v.1.0";
  }

  // 从服务器获取数据
  static get(params = {}) {
    return http({
      url: `${Base.API}/api/get`,
      method: "GET",
      params: params,
      withCredentials: false, // 添加这一行
    });
  }

  // 向服务器新增数据
  static post(data = {}) {
    return http({
      url: `${Base.API}/api/post`,
      method: "POST",
      data,
    });
  }
  //完整更新服务器上的数据
  static put(data = {}) {
    return http({
      url: `${Base.API}/api/put`,
      method: "PUT",
      data,
    });
  }
  //部分更新服务器上的数据
  static patch(data = {}) {
    return http({
      url: `${Base.API}/api/patch`,
      method: "PATCH",
      data,
    });
  }

  //删除服务器上的数据
  static delete() {
    return http({
      url: `${Base.API}/api/delete?id=1`,
      method: "Delete",
    });
  }

  //上传
  // let formData = new FormData();
  // formData.append('file', file);
  // formData.append('fileName', file.name);

  static upload = (data) => {
    return http({
      url: `${Base.API}/api/delete?id=1`,
      method: "post",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data,
    });
  };
}
