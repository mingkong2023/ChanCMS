const {
  knex
} = Chan;

let model = "sys_user";
let db = Chan.Service(knex,model);
const pageSize = 100;
let SysUserRoleService  = {

  /**
   * @description 根据菜单ID查找菜单信息
   * @param {number} id - 菜单ID
   * @returns {Promise<Object|null>} 返回找到的菜单对象或null
   */
  async detail(id) {
    const res = await db.findById({ query:{user_id:id}});
    return res;
  }

}

export default SysUserRoleService;
