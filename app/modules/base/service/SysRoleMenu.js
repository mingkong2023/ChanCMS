const {
  knex
} = Chan;

let model = "sys_role_menu";
let db = Chan.Service(knex,model);
const pageSize = 100;
let SysRoleMenuService = {

  /**
   * @description 获取分页菜单列表
   * @param {Object} options - 分页查询参数
   * @returns {Promise<Object>} 包含菜单列表、总数等信息的对象
   */
  async list(query) {
    let res = await db.query({
      current: 1,
      pageSize: pageSize,
      query,
      field: ["role_id", "menu_id"],
    });
    return res;
  }

}

export default SysRoleMenuService;
