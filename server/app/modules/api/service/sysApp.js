const BaseService = require("./base");
const { knex } = Chan;

class SysConfigService extends BaseService {
  model = "sys_config";

  async find() {
    try {
      let res = await this.all(this.model);
      return res[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async config() {
    try {
      let res = await knex
        .select(["template", "uploadWay", "maxAge", "dataCache"])
        .from(this.model)
        .limit(1);
      return res[0];
    } catch (err) {
      throw err;
    }
  }

  async update(body) {
    const { id } = body;
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    try {
      const result = await knex(this.model).where("id", "=", id).update(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = SysConfigService;
