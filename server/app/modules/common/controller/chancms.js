const dayjs = require("dayjs");
const {
  modules: {
    api: {
      service: { site, frag, tag, friendlink, article },
    },
    common: {
      service: { chancms },
    },
  },
  helper: {
    utils: { success, tree },
  },
} = Chan;

class ChancmsController {
  // 获取站点信息
  async site(req, res, next) {
    try {
      const data = await site.find();
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //碎片
  async frag(req, res, next) {
    try {
      const data = await frag.list();
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //Tag标签
  async tag(req, res, next) {
    try {
      const data = await tag.list();
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //友情链接
  async friendlink(req, res, next) {
    try {
      const data = await friendlink.list();
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //栏目
  async category(req, res, next) {
    try {
      const category = await chancms.category();
      const nav = tree(category);
      res.json({ ...success, data: nav });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @param {Object} attr 1头条 2推荐 3轮播 4热门
   * @param {Object} len 查询个数
   * @param {Object} start 开始
   * @returns
   */
  async getArticleList(req, res, next) {
    try {
      const { attr, len, start } = req.query;
      let params = { attr, len: +len, start: +start };
      const data = await chancms.getArticleList(params);
      res.json({ ...success, data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @param {Object} attr 1头条 2推荐 3轮播 4热门
   * @param {Object} len 查询个数
   * @param {Object} start 开始
   * @returns
   */
  async getArticleListByCid(req, res, next) {
    try {
      const { cid, attr, len } = req.query;
      let params = { cid, attr, len: +len };
      const data = await chancms.getArticleListByCid(params);
      res.json({ ...success, data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 通过文章id查找对应的tag标签
   * @param {Object} aid 文章id
   */
  async getArticleTag(req, res, next) {
    try {
      const { id } = req.query;
      const data = await chancms.getArticleTag(id);
      res.json({ ...success, data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 栏目列表
   * @param {Object} id 栏目id
   * @param {Object} current 当前页面
   * @param {Object} pageSize = 10 每页显示条数
   */
  async list(req, res, next) {
    try {
      const { id, current = 1, pageSize = 10 } = req.query;
      const data = await chancms.list({ id, current, pageSize });
      res.json({ ...success, data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 栏目列表
   * @param {Object} id 栏目id
   * @param {Object} current 当前页面
   * @param {Object} pageSize = 10 每页显示条数
   */
  async article(req, res, next) {
    try {
      const { id } = req.query;
      const data = await chancms.article(id);
      res.json({ ...success, data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //banner轮播
  async banner(req, res, next) {
    try {
      const { cur = 1, pageSize = 10 } = req.query;
      const data = await chancms.banner(cur, pageSize);
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //pv排行
  async pv(req, res, next) {
    try {
      const { id = 1, len = 10 } = req.query;
      const data = await chancms.pv(len, id);
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 图文（带图文）
   * @param {Number|String} id 栏目id
   * @param {Number} len 默认10条
   * @param {*} attr 1头条 2推荐 3轮播 4热门
   */
  async articleImg(req, res, next) {
    try {
      const { id = "", attr = "", len = 10 } = req.query;
      const data = await chancms.articleImg({ len, id, attr });
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //tag列表
  async tagList(req, res, next) {
    try {
      const { name = "", current = 1, pageSize = 10 } = req.query;
      const data = await chancms.tagList({ name, current, pageSize });
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //上一页
  async prev(req, res, next) {
    try {
      const { id, cid } = req.query;
      const data = await chancms.prev({ id, cid });
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  //下一页
  async next(req, res, next) {
    try {
      const { id, cid } = req.query;
      const data = await chancms.next({ id, cid });
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 当前文章tag
   * @param {Object} id 文章id
   */
  async getTagsById(req, res, next) {
    try {
      const { id } = req.query;
      const data = await chancms.getTagsById(id);
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 搜索
   * @param {Object} key 关键词
   * @param {Object} cur 当前页
   * @param {Object} pageSize 每页显示条数
   * @param {Object} cid 栏目id
   */
  async search(req, res, next) {
    try {
      const { key, cur, pageSize, cid } = req.query;
      const data = await chancms.search(key, cur, pageSize, cid);
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  /**
   * @description 浏览次数增加
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async pvadd(req, res, next) {
    try {
      const { id } = req.query;
      const data = await chancms.pvadd(id);
      res.json({ ...success, data: data });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = ChancmsController;
