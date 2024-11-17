const BaseService = require("./base");
const { knex } = Chan;

class SysUserService extends BaseService {
  model = "sys_user";

  // 登录
  async find(username ) {
    try {
      const res = await knex(`${this.model}`)
        .where({
          username: `${username}`,
        })
        .select(["id", "username","password", "status"]);
      return res[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 增加
  async create(body) {
    try {
      const result = await this.insert(this.model, body);
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

  // 列表
  async list(cur = 1, pageSize = 10) {
    try {
      // 查询个数
      const total = await knex(this.model).count("id", { as: "count" });
      const offset = parseInt((cur - 1) * pageSize);
      const list = await knex("sys_user as u")
        .select(
          "u.id",
          "u.username",
          "u.role_id",
          "u.status",
          "r.name",
          "r.value"
        )
        .leftJoin("sys_role as r", "u.role_id", "r.id")
        .limit(pageSize)
        .offset(offset)
        .orderBy("u.id", "asc");
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
      const data = await knex("sys_user as u")
        .select(
          "u.username",
          "u.role_id",
          "u.status",
          "u.id",
          "r.name",
          "r.value"
        )
        .leftJoin("sys_role as r", "u.role_id", "r.id")
        .where("u.id", id);
      return data[0];
    } catch (err) {
      throw err;
    }
  }

  // 搜索
  async search(key = "", cur = 1, pageSize = 10) {
    try {
      // 查询个数
      const sql = `SELECT COUNT(id) as count FROM ? p  WHERE p.name LIKE '%${key}%'`;
      const total = await knex.raw(sql, [this.model]);
      // 翻页
      const offset = parseInt((cur - 1) * pageSize);
      const sql_list = `SELECT p.id,p.name,p.mark FROM ? p WHERE p.name LIKE '%${key}%' ORDER BY id DESC LIMIT ?,?`;
      const list = await knex.raw(sql_list, [
        this.model,
        offset,
        parseInt(pageSize),
      ]);
      const count = total[0].count || 1;
      return {
        count: count,
        total: Math.ceil(count / pageSize),
        current: +cur,
        list: list[0],
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SysUserService;
