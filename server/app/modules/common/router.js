module.exports = (opt) => {
  const {
    router,
    modules: {
      common: { controller },
    },
    app,
  } = opt;

  router.get("/site", controller.chancms.site);
  router.get("/frag", controller.chancms.frag);
  router.get("/tag", controller.chancms.tag);
  router.get("/friendlink", controller.chancms.friendlink);
  router.get("/category", controller.chancms.category);
  router.get("/getArticleList", controller.chancms.getArticleList);
  router.get("/getArticleListByCid", controller.chancms.getArticleListByCid);
  router.get("/getArticleTag", controller.chancms.getArticleTag);
  router.get(["/list", "/page"], controller.chancms.list);
  router.get("/article", controller.chancms.article);
  router.get("/banner", controller.chancms.banner);
  router.get("/pv", controller.chancms.pv);
  router.get("/articleImg", controller.chancms.articleImg);
  router.get("/tagList", controller.chancms.tagList);
  router.get("/prev", controller.chancms.prev);
  router.get("/next", controller.chancms.next);

  router.get("/getTagsById", controller.chancms.getTagsById);
  router.get("/search", controller.chancms.search);
  router.get("/pvadd", controller.chancms.pvadd);

  //配置前缀
  app.use("/api-chancms/v1", router);

};
