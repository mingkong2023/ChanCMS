const {
  modules: {
    api: {
      service: { menu },
    },
  },
  helper: {
    api: { success },
  },
} = Chan;

class MenuController {
  // 查
  async find(req, res, next) {
    try {
      const data = await menu.find();
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }

  // 改
  async update(req, res, next) {
    try {
      const body = req.body;
      const data = await menu.update(body);
      res.json({ ...success, data: data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MenuController;
