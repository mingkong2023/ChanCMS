import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404",
    },
  },
];

// 看作是异步获取路由 通过路由拦截来动态吧这块追加进去
export const asyncRoutes = [
  {
    path: "/home",
    name: "home-info",
    component: "@/views/home/info.vue",
    meta: {
      title: "网站信息",
      icon: "DataLine",
      isShow: true,
      role: ["admin", "super", "editor"],
    },
  },
  {
    path: "/site",
    name: "site",
    meta: {
      title: "站点管理",
      icon: "Monitor",
      isShow: true,
      role: ["admin", "super", "editor"],
    },
    redirect: "/site",
    children: [
      {
        path: "/site",
        name: "site-index",
        component: "@/views/home/site.vue",
        meta: {
          title: "站点设置",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
    ],
  },
  {
    path: "/content",
    name: "content",
    meta: {
      title: "内容管理",
      isShow: true,
      icon: "Grid",
      role: ["admin", "super", "editor"],
    },
    redirect: "/category",
    children: [
      {
        path: "/category",
        name: "category-index",
        component: "@/views/category/index.vue",
        meta: {
          title: "栏目管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/category/add",
        name: "category-add",
        component: "@/views/category/add.vue",
        meta: {
          title: "栏目管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/category/edit/:id",
        name: "category-edit",
        component: "@/views/category/edit.vue",
        meta: {
          title: "页面管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/article",
        name: "article-index",
        component: "@/views/article/index.vue",
        meta: {
          title: "文章管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/article/add",
        name: "article-add",
        component: "@/views/article/add.vue",
        meta: {
          title: "文章管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/article/edit/:id",
        name: "article-edit",
        component: "@/views/article/edit.vue",
        meta: {
          title: "文章管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/slide",
        name: "slide-index",
        component: "@/views/slide/index.vue",
        meta: {
          title: "轮播管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/slide/add",
        name: "slide-add",
        component: "@/views/slide/add.vue",
        meta: {
          title: "轮播管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/slide/edit/:id",
        name: "slide-edit",
        component: "@/views/slide/edit.vue",
        meta: {
          title: "轮播管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },

      {
        path: "/tag",
        name: "tag-index",
        component: "@/views/tag/index.vue",
        meta: {
          title: "标签管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/tag/add",
        name: "tag-add",
        component: "@/views/tag/add.vue",
        meta: {
          title: "标签管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/tag/edit/:id",
        name: "tag-edit",
        component: "@/views/tag/edit.vue",
        meta: {
          title: "标签管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/frag",
        name: "frag-index",
        component: "@/views/frag/index.vue",
        meta: {
          title: "碎片管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/frag/add",
        name: "frag-add",
        component: "@/views/frag/add.vue",
        meta: {
          title: "碎片管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/frag/edit/:id",
        name: "frag-edit",
        component: "@/views/frag/edit.vue",
        meta: {
          title: "碎片管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
    ],
  },
  {
    path: "/glean",
    name: "gather",
    meta: {
      title: "采集功能",
      icon: "MagicStick",
      isShow: true,
      role: ["super"],
    },
    redirect: "/collect",
    children: [
      {
        path: "/collect",
        name: "collect-index",
        component: "@/views/collect/index.vue",
        meta: {
          title: "采集配置",
          isShow: true,
          role: ["super"],
        },
      },
      {
        path: "/collect/add",
        name: "collect-add",
        component: "@/views/collect/add.vue",
        meta: {
          title: "采集配置-新增",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/collect/:id",
        name: "collect-edit",
        component: "@/views/collect/edit.vue",
        meta: {
          title: "采集配置-更新",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/gather",
        name: "gather-index",
        component: "@/views/gather/index.vue",
        meta: {
          title: "接口采集",
          isShow: true,
          role: ["super"],
        },
      },
      {
        path: "/gather/add",
        name: "gather-add",
        component: "@/views/gather/add.vue",
        meta: {
          title: "接口采集-新增",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/gather/edit/:id",
        name: "gather-edit",
        component: "@/views/gather/edit.vue",
        meta: {
          title: "接口采集-更新",
          isShow: false,
          role: ["super"],
        },
      },
    ],
  },
  {
    path: "/extend",
    name: "extend",
    meta: {
      title: "功能管理",
      icon: "Operation",
      isShow: true,
      role: ["super"],
    },
    children: [
      {
        path: "/model",
        name: "model-index",
        component: "@/views/model/index.vue",
        meta: {
          title: "模型管理",
          isShow: true,
          role: ["super"],
        },
      },
      {
        path: "/model/add",
        name: "model-add",
        component: "@/views/model/add.vue",
        meta: {
          title: "模型管理-新增",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/model/edit/:id",
        name: "model-edit",
        component: "@/views/model/edit.vue",
        meta: {
          title: "模型管理-更新",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/model/field",
        name: "field-index",
        component: "@/views/field/index.vue",
        meta: {
          title: "字段管理",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/model/field/add",
        name: "field-add",
        component: "@/views/field/add.vue",
        meta: {
          title: "字段管理-新增",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/model/field/edit",
        name: "field-edit",
        component: "@/views/field/edit.vue",
        meta: {
          title: "字段管理-更新",
          isShow: false,
          role: ["super"],
        },
      },
      {
        path: "/friendlink",
        name: "friendlink-index",
        component: "@/views/friendlink/index.vue",
        meta: {
          title: "友情链接",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/friendlink/add",
        name: "friendlink-add",
        component: "@/views/friendlink/add.vue",
        meta: {
          title: "友情链接-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/friendlink/edit/:id",
        name: "friendlink-edit",
        component: "@/views/friendlink/edit.vue",
        meta: {
          title: "友情链接-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/message",
        name: "message-index",
        component: "@/views/message/index.vue",
        meta: {
          title: "消息管理",
          isShow: true,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/message/add",
        name: "message-add",
        component: "@/views/message/add.vue",
        meta: {
          title: "消息管理-新增",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
      {
        path: "/message/edit/:id",
        name: "message-edit",
        component: "@/views/message/edit.vue",
        meta: {
          title: "消息管理-更新",
          isShow: false,
          role: ["admin", "super", "editor"],
        },
      },
    ],
  },
  {
    path: "/sys",
    name: "sys",
    meta: {
      title: "系统管理",
      isShow: true,
      icon: "Setting",
      role: ["admin", "super"],
    },
    redirect: "/user",
    children: [
      {
        path: "/user",
        name: "user-index",
        component: "@/views/user/index.vue",
        meta: {
          title: "用户管理",
          isShow: true,
          role: ["admin", "super"],
        },
      },
      {
        path: "/user/add",
        name: "user-add",
        component: "@/views/user/add.vue",
        meta: {
          title: "用户列表-新增",
          isShow: false,
          role: ["admin", "super"],
        },
      },
      {
        path: "/user/edit/:id",
        name: "user-edit",
        component: "@/views/user/edit.vue",
        meta: {
          title: "用户列表-更新",
          isShow: false,
          role: ["admin", "super"],
        },
      },
      {
        path: "/role",
        name: "role-index",
        component: "@/views/role/index.vue",
        meta: {
          title: "角色管理",
          isShow: true,
          role: ["admin", "super"],
        },
      },
      {
        path: "/role/add",
        name: "role-add",
        component: "@/views/role/add.vue",
        meta: {
          title: "角色列表-新增",
          isShow: false,
          role: ["admin", "super"],
        },
      },
      {
        path: "/role/edit/:id",
        name: "role-edit",
        component: "@/views/role/edit.vue",
        meta: {
          title: "角色列表-更新",
          isShow: false,
          role: ["admin", "super"],
        },
      },
      {
        path: "/menu",
        name: "menu-index",
        component: "@/views/menu/index.vue",
        meta: {
          title: "菜单管理",
          isShow: true,
          role: ["admin", "super"],
        },
      },
      {
        path: "/loginlog",
        name: "loginLog-index",
        component: "@/views/loginlog/index.vue",
        meta: {
          title: "登录日志",
          isShow: true,
          role: ["admin", "super"],
        },
      },
    ],
  },
];

//导出最终路由
export var routes = constantRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

/**
 * 路由拦截
 * 1.用户登录之后，通过pinia在存储用户角色和token
 * 2.通过路由和角色过滤出对应角色的路由，然后动态添加到路由上面
 * router.beforeEach(async (to, from, next)
 */
import { userStore } from "@/stores/user";
router.beforeEach(async (to, from) => {
  const user = userStore();

  if (user.token) {
    //已登录
    if (to.path === "/login") {
      //已登录直接进入首页
      return { path: "/" };
    } else {
      //校验token是否正确或者过期
      if (user.userInfo) {
        //刷新页面后，这个就没有了，然后动态添加路由，刷新重定向路由
        return true;
      } else {
        //然后动态添加路由，刷新重定向路由
        const role = await user.getUserInfo();
        //根据获取菜单
        await user.getMenuList();
        //根据用户角色role，和菜单生成路由
        const accessRoutes = user.getAccessRoutes(role); //添加路由
        accessRoutes.forEach((route) => {
          router.addRoute("Layout", route);
        });
        //触发重定向
        return to.fullPath;
      }
    }
  } else {
    //没登录
    if (to.path === "/login") {
      return true; //放行
    } else {
      return { path: "/login", query: { redirect: to.fullPath } };
    }
  }
});
export default router;
