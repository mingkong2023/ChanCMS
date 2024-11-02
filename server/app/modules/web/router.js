const init = require("./middleware/init.js");
const adapter = require("./middleware/adapter.js");

module.exports = (opt) => {
  const {
    router,
    modules: {
      web: { controller },
    },
    app,
  } = opt;

  router.use(adapter());
  router.use(init());

  // 首页模板
  router.get("/",controller.home.index);

  // 分类
  router.get(
    [
      "/list/:cid", //兼容old
      "/:cate/index.html",
      "/:cate/index:current.html",
      "/:cate1/:cate/index.html",
      "/:cate1/:cate/index:current.html",
      "/:cate2/:cate1/:cate/index.html",
      "/:cate2/:cate1/:cate/index:current.html",
      "/:cate3/:cate2/:cate1/:cate/index.html",
      "/:cate3/:cate2/:cate1/:cate/index:current.html",
    ],
    controller.home.list
  );

  // 文章页
  router.get(
    [
      "/article/:id", //兼容old
      "/article/:id.html", //兼容old
      "/article-:id.html",
      "/:cate/article-:id.html",
      "/:cate1/:cate/article-:id.html",
      "/:cate2/:cate1/:cate/article-:id.html",
      "/:cate2/:cate1/:cate/article-:id.html",
      "/:cate3/:cate2/:cate1/:cate/article-:id.html",
    ],
    controller.home.article
  );

  // 单页栏目
  router.get(
    [
      "/page/:id", //兼容old
      "/page/:id.html", //兼容old
      "/page-:id.html",
      "/:cate/page.html",
      "/:cate/page-:id.html",
      "/:cate1/:cate/page-:id.html",
      "/:cate2/:cate1/:cate/page-:id.html",
      "/:cate2/:cate1/:cate/page-:id.html",
      "/:cate3/:cate2/:cate1/:cate/page-:id.html",
    ],
    controller.home.page
  );

  // 搜索页
  router.get(
    ["/search/:keywords.html", "/search/:keywords/:id.html"],
    controller.home.search
  );

  // tag列表页
  router.get(
    ["/tags/:path.html", "/tags/:path/:id.html"],
    controller.home.tag
  );

  //使用路由
  app.use(router);
};
