const { knex } = Chan;

class ChancmsService {
  constructor() {}

  // 网站栏目
  async category() {
    try {
      let res = await knex("cms_category")
        .select([
          "id",
          "pid",
          "name",
          "pinyin",
          "path",
          "orderBy",
          "target",
          "status",
          "listView",
          "articleView",
          "seoTitle",
          "seoKeywords",
          "seoDescription",
          "type",
        ])
        .orderBy("orderBy", "ASC");
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * @description 获取文章(头条、推荐、轮播、热门)
   * @param {Object} attr 1头条 2推荐 3轮播 4热门
   * @param {Object} len 查询个数
   * @param {Object} start 开始
   * @returns
   */
  async getArticleList({ start, len, attr }) {
    try {
      const columns = [
        "a.id",
        "a.title",
        "a.shortTitle",
        "a.img",
        "a.createdAt",
        "a.description",
        "a.link",
        "c.pinyin",
        "c.name",
        "c.path",
      ];

      const query = knex
        .select(columns)
        .from("cms_article AS a")
        .leftJoin("cms_category AS c", "a.cid", "c.id")
        .where("a.status", 0)
        .orderBy("a.createdAt", "DESC")
        .limit(len)
        .offset(start);

      if (attr) {
        query.where("a.attr", "LIKE", `%${attr}%`);
      }

      const result = await query;
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * @description 获取栏目文章（头条、推荐、轮播、热门）
   * @param {*} cid 栏目id
   * @param {*} len 查询个数
   * @param {*} attr 1头条 2推荐 3轮播 4热门
   * @returns {Array}
   */
  async getArticleListByCid(cid, len = 5, attr = "") {
    try {
      // 获取所有id
      const res = await knex
        .select("id")
        .from("cms_category")
        .where("pid", cid);

      const ids = [cid, ...res.map((item) => item.id)];
      // 构建查询条件
      let queryBuilder = knex
        .select(
          "a.id",
          "a.title",
          "a.shortTitle",
          "a.img",
          "a.createdAt",
          "a.description",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .from("cms_article AS a")
        .leftJoin("cms_category AS c", "a.cid", "c.id")
        .whereIn("a.cid", ids)
        .where("a.status", 0)
        .orderBy("createdAt", "DESC")
        .limit(len);

      if (attr) {
        queryBuilder = queryBuilder.andWhere("a.attr", "LIKE", `%${attr}%`);
      }

      // 执行查询
      const result = await queryBuilder;
      return result;
    } catch (err) {
      console.error(`cid->${cid} attr-> ${attr} len->${len}`, err);
      throw err;
    }
  }

  /**
   * @description 通过文章id查找对应的tag标签
   * @param {Number} aid 文章id
   * @returns {Array} 返回数组
   */
  async getArticleTag(id) {
    try {
      // 执行查询
      const result = await knex("cms_article AS a")
        .select("a.cid", "t.id", "t.name", "t.path")
        .rightJoin("cms_tag AS t", "t.id", "=", "a.tagId")
        .where("a.id", id)
        .where("a.status", 0)
        .limit(10)
        .offset(0);
      return result;
    } catch (err) {
      console.error(`aid->${id}`, err);
      throw err;
    }
  }
  /**
   * @param [1,2,3] 栏目id，指定栏目id进行返回
   * @description 返回所有的根栏目
   * @returns {Array}
   */
  async getAllParentCategory(idArray = []) {
    try {
      const result = await knex("cms_category")
        .select([
          "id",
          "pid",
          "name",
          "pinyin",
          "path",
          "orderBy",
          "target",
          "status",
          "type",
        ])
        .where("pid", 0)
        .where("type", 0)
        .where((builder) => !idArray.length || builder.whereIn("id", idArray))
        .orderBy("orderBy", "ASC");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * @description 通过文章id查找对应的tag标签
   * @param {Number} id 文章id
   * @returns {Array} 返回数组
   */
  async getTagsById(id) {
    try {
      // 执行查询
      const result = await knex("cms_article AS a")
        .select("a.cid", "t.id", "t.name", "t.path")
        .rightJoin("cms_tag AS t", "t.id", "=", "a.tagId")
        .where("a.id", id)
        .where("a.status", 0)
        .limit(10)
        .offset(0);
      return result;
    } catch (err) {
      console.error(`aid->${id}`, err);
      throw err;
    }
  }

  /**
   * @description 浏览pv排行(全局|指定栏目)
   * @param {Number|String} id 栏目id
   * @param {Number} len 默认10条
   * @returns
   */
  async pv(len = 10, id = "") {
    try {
      let query = knex
        .select(
          "a.id",
          "a.title",
          "a.shortTitle",
          "a.img",
          "a.createdAt",
          "a.description",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .from("cms_article AS a")
        .leftJoin("cms_category AS c", "a.cid", "c.id")
        .where("a.status", 0);

      if (id) {
        const ids = await knex("cms_category")
          .select("id")
          .where("pid", id)

          .pluck("id");

        ids.push(id);
        query.whereIn("cid", ids);
      }

      query.orderBy("pv", "DESC").limit(len);
      let result = await query;
      return result;
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      throw err;
    }
  }

  /**
   * @description 图文(全局|指定栏目)
   * @param {Number|String} id 栏目id
   * @param {Number} len 默认10条
   * @param {*} attr 1头条 2推荐 3轮播 4热门
   * @returns
   */
  async articleImg({ len, id, attr }) {
    try {
      let query = knex
        .select(
          "a.id",
          "a.title",
          "a.shortTitle",
          "a.img",
          "a.createdAt",
          "a.description",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .from("cms_article AS a")
        .leftJoin("cms_category AS c", "a.cid", "c.id")
        .where("a.img", "!=", "")
        .where("a.status", 0);

      if (id) {
        const ids = await knex("cms_category")
          .select("id")
          .where("pid", id)
          .pluck("id");

        ids.push(id);
        query.whereIn("a.cid", ids);
      }

      if (attr) {
        query.where("a.attr", "LIKE", `%${attr}%`);
      }
      query.orderBy("a.createdAt", "DESC").limit(len);

      let result = await query;
      return result;
    } catch (err) {
      console.error(`id->${id} len->${len}`, err);
      throw err;
    }
  }

  /**
   * @description 文章列表
   * @param {Number} id 栏目id
   * @param {Number|String} current 当前页面
   * @param {Number} pageSize 默认10条
   * @returns {Array}
   */
  async list({ id, current, pageSize }) {
    try {
      const start = (current - 1) * pageSize;

      // 获取所有id
      let ids = [id];
      const res = await knex("cms_category").select("id").where("pid", id);

      res.forEach((item) => {
        ids.push(item.id);
      });

      // 查询个数
      const total = await knex("cms_article")
        .count("id as count")
        .whereIn("cid", ids)
        .where("status", 0)
        .first();

      const count = total.count || 1;

      // 查询文章列表
      const result = await knex
        .select(
          "a.id",
          "a.title",
          "a.shortTitle",
          "a.img",
          "a.description",
          "a.createdAt",
          "a.author",
          "a.pv",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .from("cms_article AS a")
        .leftJoin("cms_category AS c", "a.cid", "c.id")
        .whereIn("a.cid", ids)
        .where("a.status", 0)
        .orderBy("a.createdAt", "DESC")
        .offset(start)
        .limit(pageSize);

      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result,
      };
    } catch (err) {
      console.error(`id->${id} current->${current} pageSize->${pageSize}`, err);
      throw err;
    }
  }

  /**
   * @description tag搜索
   * @param {Number} tag tagpath
   * @param {Number|String} current 当前页面
   * @param {Number} pageSize 默认10条
   */
  async tagList({ name, current, pageSize }) {
    try {
      const start = (current - 1) * pageSize;

      // 查询个数
      const total = await knex("cms_article as a")
        .join("cms_category as c", "a.cid", "c.id")
        .whereExists(function () {
          this.select(1)
            .from("cms_tag as t")
            .whereRaw("FIND_IN_SET(t.id, a.tagId) > 0")
            .andWhere("t.name", name);
        })
        .count("* as total");

      // 查询文章列表
      const result = await knex("cms_article as a")
        .select(
          "a.id",
          "a.title",
          "a.shortTitle",
          "a.img",
          "a.description",
          "a.createdAt",
          "a.author",
          "a.pv",
          "c.pinyin",
          "c.name",
          "c.path"
        )
        .join("cms_category as c", "a.cid", "c.id")
        .whereExists(function () {
          this.select(1)
            .from("cms_tag as t")
            .whereRaw("FIND_IN_SET(t.id, a.tagId) > 0")
            .andWhere("t.name", name);
        })
        .where("a.status", 0)
        .orderBy("a.createdAt", "DESC")
        .offset(start)
        .limit(pageSize);

      const count = total.total || 1;

      return {
        count,
        total: Math.ceil(count / pageSize),
        current: +current,
        list: result,
      };
    } catch (err) {
      console.error(
        `id->${path} current->${current} pageSize->${pageSize}`,
        err
      );
      throw err;
    }
  }

  // banner轮播图
  async banner(cur = 1, pageSize = 10) {
    try {
      const offset = parseInt((cur - 1) * pageSize);
      const list = await knex
        .select(["id", "title", "imgUrl", "linkUrl"])
        .from("cms_slide")
        .limit(pageSize)
        .offset(offset)
        .orderBy("id", "desc");
      return list;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 查
  async article(id) {
    try {
      // 查询文章
      const data = await knex("cms_article").where("id", "=", id).select();
      //兼容mysql错误
      if (!data[0] || !data[0].cid) {
        return false;
      }
      // 通过栏目id查找模型id
      const modId = await knex.raw(
        `SELECT mid FROM cms_category WHERE id=? LIMIT 0,1`,
        [data[0].cid]
      );

      let field = [];
      if (modId[0].length > 0 && modId[0][0].mid !== "0") {
        // 通过模型查找表名
        const tableName = await knex.raw(
          `SELECT tableName FROM cms_model WHERE id=?`,
          [modId[0][0].mid]
        );
        // 通过表名查找文章
        field = await knex.raw(`SELECT * FROM ? WHERE aid=? LIMIT 0,1`, [
          tableName[0][0].tableName,
          id,
        ]);
      }
      return { ...data[0], field: field[0] || {} };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 上一篇文章
  async prev({ id, cid }) {
    try {
      const result = await knex.raw(
        `SELECT a.id,a.title,c.name,c.path FROM cms_article a LEFT JOIN cms_category c ON a.cid=c.id  WHERE a.id<? AND a.cid=? ORDER BY id DESC LIMIT 1`,
        [id, cid]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 下一篇文章
  async next({ id, cid }) {
    try {
      const result = await knex.raw(
        `SELECT a.id,a.title,c.name,c.path FROM cms_article a LEFT JOIN cms_category c ON a.cid=c.id WHERE a.id>? AND a.cid=? LIMIT 1`,
        [id, cid]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 搜索
  async search(key = "", cur = 1, pageSize = 10, cid = 0) {
    try {
      // 查询个数
      let sql;
      const countSql = `SELECT COUNT(*) as count FROM  cms_article a LEFT JOIN cms_category c ON a.cid=c.id`;
      const keyStr = ` WHERE a.title LIKE \'%${key}%\'`;
      const cidStr = `  AND c.id=?`;

      if (cid === 0) {
        sql = countSql + keyStr;
      } else {
        sql = countSql + keyStr + cidStr;
      }
      const total = cid ? await knex.raw(sql, [cid]) : await knex.raw(sql, []);
      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      let sql_list = "";
      const listStart = `SELECT a.id,a.title,a.attr,a.tagId,a.description,a.cid,a.pv,a.createdAt,a.status,c.name,c.path FROM cms_article a LEFT JOIN cms_category c ON a.cid=c.id WHERE a.title LIKE  \'%${key}%\' `;
      const listEnd = `ORDER BY a.id desc LIMIT ${offset},${parseInt(
        pageSize
      )}`;
      if (cid === 0) {
        sql_list = listStart + listEnd;
      } else {
        sql_list = listStart + `AND c.id=? ` + listEnd;
      }
      const list = cid
        ? await knex.raw(sql_list, [cid])
        : await knex.raw(sql_list, []);
      const count = total[0][0].count;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list[0],
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 浏览pv增加
  async pvadd(id) {
    try {
      const result = await knex.raw(
        `UPDATE cms_article SET pv=pv+1 WHERE id=? LIMIT 1`,
        [id]
      );
      return result[0].affectedRows ? "更新成功" : "更新失败或id不存在";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ChancmsService;
