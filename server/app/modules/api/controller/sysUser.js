const dayjs = require("dayjs");
const {
  config,
  modules: {
    api: {
      service: { sysUser },
    },
  },
  helper: {
    utils: { setToken, getToken, bcrypt },
    api: { success, fail },
  },
} = Chan;

class SysUserController {
  // 登录
  async login(req, res, next) {
    try {
      let { username, password } = req.body;
      const user = await sysUser.find(username);
      const match = await bcrypt.compare(password, user.password);
      if (user && match) {
        const { id, status } = user;
        // 设置token
        const token = setToken(
          { uid: id, username },
          config.token.KEY,
          config.token.TIME
        );
        const data = { status, username, token };
        res.json({ ...success, data: data });
      } else {
        res.json({ ...fail, msg: "用户名或密码错误！" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // 增
  async create(req, res, next) {
    try {
      const body = req.body;
      body.password = await bcrypt.hash(body.password, config.secretcms.key);
      const data = await sysUser.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  async delete(req, res, next) {
    try {
      const { id } = req.query;
      const data = await sysUser.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  async update(req, res, next) {
    try {
      const body = req.body;
      body.password = await bcrypt.hash(body.password, config.secretcms.key);
      const data = await sysUser.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  async detail(req, res, next) {
    try {
      let uid = req.query.id;
      if (!uid) {
        const token = req.cookies.token;
        if (!token) {
          return res.json({ ...fail, msg: "请先登录" });
        }
        const user = await getToken(token, config.token.KEY);
        uid = user.uid;
      }
      const data = await sysUser.detail(uid);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 搜索
  async search(req, res, next) {
    try {
      const { cur, keyword, pageSize = 10 } = req.query;
      const data = await sysUser.search(keyword, cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:mm");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 列表
  async list(req, res, next) {
    try {
      const { cur, pageSize = 10 } = req.query;
      let data = await sysUser.list(cur, pageSize);
      data.list.forEach((ele) => {
        ele.createdAt = dayjs(ele.createdAt).format("YYYY-MM-DD HH:mm");
      });
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SysUserController;
