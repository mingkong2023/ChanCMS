module.exports = (opt) => {
  const {
    router,
    modules: { 'plus-wechat':{controller}},
    app
  } = opt;

  router.get("/login", controller.wechat.login);
  //配置前缀
  app.use('/plus-wechat',router)
};

