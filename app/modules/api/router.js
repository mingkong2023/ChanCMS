const { loadController } = Chan.helper;
let controller = await loadController("api");
export default (app, router, config) => {
  router.get("/site", controller.Api.site);
  router.get("/frag", controller.Api.fragList);
  router.get("/tag", controller.Api.getTag);
  router.get("/friendlink", controller.Api.getFriendlink);
  router.get("/category", controller.Api.category);
  router.get("/getArticleList", controller.Api.getArticleList);
  router.get("/getArticleListByCid", controller.Api.getArticleListByCid);
  router.get("/getArticleTag", controller.Api.getArticleTag);
  router.get(["/list", "/page"], controller.Api.list);
  router.get("/article", controller.Api.getArticle);
  router.get("/banner", controller.Api.banner);
  router.get("/pv", controller.Api.pv);
  router.get("/articleImg", controller.Api.articleImg);
  router.get("/tagList", controller.Api.tagList);
  router.get("/prev", controller.Api.prev);
  router.get("/next", controller.Api.next);

  router.get("/getTagsById", controller.Api.getTagsById);
  router.get("/search", controller.Api.search);
  router.get("/pvadd", controller.Api.pvadd);

  //配置前缀
  app.use("/api/v1", router);
};
