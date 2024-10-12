const { knex } = Chan;

class SysRoleService {
  model = "sys_role";

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
      const result = await knex(this.model).where("id", "=", id).del();
      return result ? "success" : "fail";
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

  // 文章列表
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
        .orderBy("id", "asc");
      return {
        count: total[0].count,
        total: Math.ceil(total[0].count / pageSize),
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
      const data = await knex(this.model)
        .where("id", "=", id)
        .select(["name", "value", "status"]);
      return data[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = SysRoleService;
