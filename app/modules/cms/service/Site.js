// import BaseService from './base.js';
const { knex } = Chan;
let model = "cms_site";
let db = Chan.Service(knex, model);
const pageSize = 100;
let SiteService = {

  // 基本信息
  async info() {
    try {
      let res = await db.all();
      res.data = res.data[0];
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
// 更新基本信息
  async updateInfo(body) {
    const { id, ...params } = body;
    try {
      const result = await db.update({query:{id:id}, params});
      return result ? "success" : "fail";
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
}

export default SiteService;
