const dayjs = require("dayjs");
const {
  modules: {
    api: {
      service: { loginLog },
    },
  },
  helper: {
    utils: { getToken },
    api: { success },
  },
} = Chan;

class LoginLogController {
  // 增
  async create(req, res, next) {
    try {
      const { config } = req.app.locals;
      const token = req.cookies.token;
      const user = await getToken(token, config.token.KEY);
      let body = {
        uid: user.uid,
        ...req.body,
      };
      const data = await loginLog.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  async delete(req, res, next) {
    try {
      const data = await loginLog.delete();
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 列表
  async list(req, res, next) {
    try {
      const { pageSize, cur } = req.query;
      let data = await loginLog.list(cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:mm:ss");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginLogController;
