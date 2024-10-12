const { knex } = Chan;
class FriendlinkService {
  model = "cms_friendlink";

  // 新增
  async create(body) {
    try {
      const result = await knex(this.model).insert(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 删
  async delete(id) {
    try {
      const res = await knex(this.model).where("id", "=", id).del();
      return res ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 修改
  async update(body) {
    const { id } = body;
    delete body.id;
    try {
      const result = await knex(this.model).where("id", "=", id).update(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 列表
  async list(cur = 1, pageSize = 10) {
    try {
      // 查询个数
      const total = await knex(this.model).count("id", {
        as: "count",
      });
      const offset = parseInt((cur - 1) * pageSize);
      const list = await knex
        .select("*")
        .from(this.model)
        .limit(pageSize)
        .offset(offset)
        .orderBy("id", "desc");
      const count = total[0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 查
  async detail(id) {
    try {
      const data = await knex
        .select(["id", "link", "orderBy", "title"])
        .from(this.model)
        .where("id", "=", id);
      return data[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 搜索
  async search(key = "", cur = 1, pageSize = 10) {
    try {
      // 查询个数
      const total = key
        ? await knex(this.model).count("id", { as: "count" })
        : await knex(this.model)
            .whereRaw("name COLLATE utf8mb4_general_ci LIKE ?", [`%${key}%`])
            .count("id", { as: "count" });
      const offset = parseInt((cur - 1) * pageSize);
      const list = key
        ? await knex
            .select(["id", "name", "mark"])
            .from(this.model)
            .whereRaw("name COLLATE utf8mb4_general_ci LIKE ?", [`%${key}%`])
            .limit(pageSize)
            .offset(offset)
            .orderBy("id", "desc")
        : await knex
            .select(["id", "name", "mark"])
            .from(this.model)
            .limit(pageSize)
            .offset(offset)
            .orderBy("id", "desc");
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
}

module.exports = FriendlinkService;
