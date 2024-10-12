/**
 * 后台配置路由和路由对比，生成用户角色路由
 */

/**
 *
 * @param {*} userRouter 后台路由返回的权限json
 * @param {*} allRouter 前端配置好的路由数据
 * @returns {Array} realRoutes过滤后返回条件的路由
 */
// export const recursionRouter = (userRouter = [], allRouter = []) => {
//   let realRoutes = [];
//   allRouter.forEach((v, i) => {
//     userRouter.forEach((item, index) => {
//       if (item.name === v.name) {
//         if (item.children && item.children.length > 0) {
//           v.children = recursionRouter(item.children, v.children);
//         }
//         realRoutes.push(v);
//       }
//     });
//   });
//   return realRoutes;
// };

//判断路由是否有角色
function hasPermission(route, role) {
  if (route.meta && route.meta.role) {
    return route.meta.role.includes(role);
  } else {
    return true;
  }
}

/**
 * @routes 动态路由  通过接口来查询用户角色，然后通过角色来和前端路由进行匹配
 * @role 角色
 */
function filterRoutes(routes, role) {
  const res = [];
  routes.forEach((route) => {
    const temp = { ...route }; //解构防止修改源
    if (temp.children) {
      temp.children = filterRoutes(temp.children, role);
    }

    if (hasPermission(tmp, role)) {
      res.push(temp);
    }
  });
}

//生成完整路径 讲path路径改成绝对路径
function getFullPathRoutes(routes, parentPath) {
  const res = [];

  routes.forEach((route) => {
    const temp = { ...route };
    temp.path = parentPath + temp.path;
    res.push(temp);

    if (temp.children) {
      temp.children = getFullPathRoutes(
        temp.children,
        temp.path + (temp.path === "/" ? "" : "/")
      );
    }
  });
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
