
let {
  utils: { getToken },
} = Chan.helper;

module.exports = () => {
  return async (req, res, next) => {
    const token = req.cookies.token || req.headers.auth || "";
    if (token) {
      let { config } = req.app.locals;
      try {
        await getToken(token, config.token.KEY);
        await next();
      } catch (error) {
        console.error("token-->", error);
        res.json({
          code: 501,
          msg: error,
        });
      }
    } else {
      res.json({
        code: 501,
        msg: "token缺失",
      });
    }
  };
};
