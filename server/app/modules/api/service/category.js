const { knex } = Chan;
const BaseService = require("./base");

class CategoryService extends BaseService {
  model = "cms_category";
  // 增
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

  // 改
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

  // 查全部栏目
  async find() {
    try {
      const result = await this.all(this.model).orderBy("orderBy", "asc");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 查栏目
  async findId(id) {
    try {
      const data = await knex(this.model)
        .where("id", "=", id)
        .select([
          "id",
          "pid",
          "seoTitle",
          "seoKeywords",
          "seoDescription",
          "name",
          "pinyin",
          "path",
          "description",
          "type",
          "url",
          "orderBy",
          "target",
          "status",
          "mid",
          "listView",
          "articleView",
        ]);
      return data[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 查子栏目
  async findSubId(id) {
    try {
      const result = await knex(this.model).where("pid", "=", id).select();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // 搜索栏目
  async search(key) {
    try {
      const result = key
        ? await knex(this.model)
            .whereRaw("name COLLATE utf8mb4_general_ci LIKE ?", [`%${key}%`])
            .orderBy("orderBy", "asc")
        : await knex(this.model).orderBy("orderBy", "asc");
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = CategoryService;
