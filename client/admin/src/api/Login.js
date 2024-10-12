import http from "../utils/http.js";
import Base from "./Base";
import { asyncRoutes } from "@/router/index.js";
import { setCookie, getCookie } from "@/utils/tool.js";
import API from "../config/index.js";
export default class Login extends Base {
  constructor(props) {
    super(props);
  }

  static toLogin(data) {
    return http({
      url: `${API.BASE_API}/api/sysUser/login`,
      method: "post",
      data: data,
    });

    // return new Promise((resovle, reject) => {
    //   setTimeout(() => {
    //     let res = {
    //       code: 200,
    //       data: {
    //         token: "asdfawerxxxa",
    //       },
    //     };
    //     resovle(res);
    //   }, 300);
    // });
  }
  //改成真实的就就支持了角色权限控制
  static userInfo() {
    return http({
      url: `${API.BASE_API}/api/sysUser/detail`,
      method: "get",
    });
    // return new Promise((resovle, reject) => {
    //   setTimeout(() => {
    //     let res = {
    //       code: 200,
    //       data: {
    //         userId: "123456",
    //         userName: "mingkong",
    //         nickName: "明空",
    //         role: "admin",
    //       },
    //     };
    //     resovle(res);
    //   }, 300);
    // });
  }

  static menuList() {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        let res = asyncRoutes;
        resovle({ code: 200, data: res });
      }, 300);
    });
  }
}
