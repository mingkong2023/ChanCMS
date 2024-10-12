const BaseService = require("./base");
const { knex } = Chan;

class MenuService extends BaseService {
  model = "sys_menu";

  // 基本信息
  async find() {
    try {
      let res = await this.all(this.model);
      return res[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 更新基本信息
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
}

module.exports = MenuService;
