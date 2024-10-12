const path = require("path");
const {
  modules: {
    api: {
      service: { site },
    },
  },
  helper: {
    api: { success },
  },
} = Chan;

class SiteController {
  // 查
  async find(req, res, next) {
    try {
      const data = await site.find();
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 增
  async create(req, res, next) {
    try {
      const body = req.body;
      const data = await site.create(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 删除
  async delete(req, res, next) {
    try {
      const { id } = req.query;
      const data = await site.delete(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  async update(req, res, next) {
    try {
      const body = req.body;
      const data = await site.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 查
  async findId(req, res, next) {
    try {
      const { id } = req.query;
      const data = await site.find(id);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 获取磁盘信息
  async runEnv(req, res, next) {
    try {
      const dirname = path.join(__dirname, "../../../../");
      res.json({ ...success, data: { dirname: dirname } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SiteController;
