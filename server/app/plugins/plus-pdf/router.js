
module.exports = (opt) => {
  const {
    router,
    modules: { 'plus-pdf':{controller}},
    app
  } = opt;

  router.get("/pdf", controller.pdf.pdf);
  //配置前缀
  app.use('/plus-pdf',router)
};

