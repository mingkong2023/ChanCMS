import BaseService from './base.js';
const { knex } = Chan;
let model = "sys_config";
let db = Chan.Service(knex, model);
const pageSize = 100;
let SysConfigService = {

  async find() {
    try {
      let res = await this.all(model);
      return res[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // async config() {
  //   try {
  //     let res = await knex
  //       .select(["template", "uploadWay"])
  //       .from(model)
  //       .limit(1);
  //     return res[0];
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async update(body) {
    const { id } = body;
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    try {
      const result = await knex(model).where("id", "=", id).update(body);
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default SysConfigService;
