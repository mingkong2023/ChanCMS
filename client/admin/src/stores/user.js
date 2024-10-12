import { defineStore } from "pinia";
import Login from "@/api/Login";
import { find } from "@/api/menu.js";
const modules = import.meta.glob("@/views/*/*.vue");
import { setCookie, getCookie } from "@/utils/tool.js";
export const userStore = defineStore("user", {
  state: () => ({
    token: getCookie("token") || "",
    userInfo: null,
    menuList: [], //左侧菜单
  }),
  actions: {
    async login(params) {
      try {
        const res = await Login.toLogin(params);
        if (res.code == 200) {
          this.token = res.data.token;
          setCookie("token", res.data.token);
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    async getUserInfo() {
      try {
        const res = await Login.userInfo();
        if (res.code == 200 && res.data) {
          let role = res.data.value;
          this.userInfo = { role, ...res.data };
          return role;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getMenuList() {
      try {
        let res = await find();
        if (res.code == 200) {
          let menu = res.data.content;
          let router = dealRoute(JSON.parse(menu).route);
          this.menuList = router;
        }
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      this.userInfo = null;
      this.token = "";
      localStorage.removeItem("token");
    },
    //根据角色进行过滤 superadmin admin editor
    getAccessRoutes(role) {
      let asyncRoutes = this.menuList;
      const accessRoutes = filterRoutes(asyncRoutes, role);
      //将path路径改为  绝对路径
      //const fullPathRoutes = getFullPathRoutes(accessRoutes, "");
      //将redirect改为children的第一个
      // updateRoutesRedirect(fullPathRoutes);
      // console.log("fullPathRoutes-->", accessRoutes);
      this.menuList = accessRoutes;
      return accessRoutes;
    },
  },
  persist: {
    enabled: true, //开启
    strategies: [
      {
        key: "user",
        paths: ["token"], //指定字段
      },
    ],
  },
});

function filterRoutes(routes, role) {
  const res = [];

  routes.forEach((route) => {
    //解构出来，防止修改源
    const tmp = { ...route };
    if (tmp?.children?.length > 0) {
      tmp.children = filterRoutes(tmp.children, role);
    }
    //判断是否有权限，有权限则push
    if (hasPermission(tmp, role)) {
      res.push(tmp);
    }
  });

  return res;
}

function hasPermission(route, role) {
  if (route?.meta?.role) {
    return route.meta.role.includes(role);
  } else {
    return true;
  }
}

//生成完整路径 讲path路径改成绝对路径
function getFullPathRoutes(routes, parentPath) {
  const res = [];

  routes.forEach((route) => {
    const temp = { ...route };
    temp.path = parentPath + temp.path;
    res.push(temp);

    if (temp?.children?.length > 0) {
      temp.children = getFullPathRoutes(
        temp.children,
        temp.path + (temp.path === "/" ? "" : "/"),
      );
    }
  });

  return res;
}

//讲完整路由重定向改为children第一项
function updateRoutesRedirect(routes) {
  routes.forEach((route) => {
    if (route.children) {
      route.redirect = route.children[0].path;
      updateRoutesRedirect(route.children);
    }
  });
}

//更具接口返回的路由，动态加载组件
function dealRoute(routes) {
  let res = []; //递归的适合函数内部形成作用域，不影响这个
  routes.forEach((item) => {
    if (item.component) {
      item.component = item.component.replace("@/", "/src/");
      item.component = modules[`${item.component}`];
    }
    res.push(item);
    if (item.children) {
      dealRoute(item.children);
    }
  });

  return res;
}
