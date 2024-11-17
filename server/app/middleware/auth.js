const {
  config: {
    token: { KEY, TIME,REFRESH },
  },
  helper: {
    utils: { setToken, getToken },
  },
} = Chan;

module.exports = () => {
  return async (req, res, next) => {
    const token = req.cookies.token || req.headers.auth || "";
    if (token) {
      try {
        const {username, uid,exp} =  getToken(token, KEY);
        if (username && uid && REFRESH) {
          // 计算token剩余有效时间
           const currentTime = Math.floor(Date.now() / 1000);
           const remainingTime = exp - currentTime; 
           const refreshThreshold = 30 * 60; 
           if (remainingTime < refreshThreshold) {
             const newToken = setToken({ username, uid }, KEY, TIME);
             res.cookie("token", newToken, {httpOnly: true });
           }
        }
        await next();
      } catch (error) {
        console.error("token-->", error);
        res.json({
          code: 401,
          msg: error,
        });
      }
    } else {
      res.json({
        code: 401,
        msg: "token缺失",
      });
    }
  };
};
