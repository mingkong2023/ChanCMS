const { knex } = Chan;

class LoginLogService {
  model = "sys_loginlog";
  // 增加
  async create(body) {
    try {
      const result = await knex(this.model).insert(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 删除100条之外的数据
  async delete() {
    try {
      // 获取最新的100条记录的ID
      const recentLogIds = await knex(this.model)
        .select("id")
        .orderBy("createdAt", "desc")
        .limit(100);

      // 将ID数组转换为可以用于IN子句的格式
      const idsToKeep = recentLogIds.map((row) => row.id);

      // 删除不在这些ID中的所有记录
      const result = await knex(this.model).whereNotIn("id", idsToKeep).del();

      return result >= 0 ? "success" : "fail";
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
      const list = await knex(this.model)
        .leftJoin("sys_user", "sys_loginlog.uid", "sys_user.id")
        .select("sys_loginlog.*", "sys_user.username")
        .offset(offset)
        .limit(pageSize)
        .orderBy("createdAt", "desc");

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
}

module.exports = LoginLogService;
