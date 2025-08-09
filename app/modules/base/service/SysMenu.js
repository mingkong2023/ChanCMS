
const {
  knex
} = Chan;

let db = Chan.Service(knex, "sys_menu");
const pageSize = 100;

let SysMenuService = {

  async allRouter(userId) {
    try {
      // Step 1: 根据 user_id 查找 role_id
      const roles = await knex('sys_user_role')
        .select('role_id')
        .where('user_id', userId);

      const roleId = roles.map(role => role.role_id);

      if (roleId.length === 0) {
        return [];
      }

      // Step 2: 根据 role_id 查找 menu_id
      const menus = await knex('sys_role_menu')
        .select('menu_id')
        .whereIn('role_id', roleId);

      const menuIds = menus.map(menu => menu.menu_id);

      if (menuIds.length === 0) {
        return [];
      }

      // Step 3: 根据 menu_id 查找具体的菜单信息
      let menuDetails = await knex('sys_menu')
        .whereIn('id', menuIds)
        .select(['id', 'pid', 'title', 'name', 'path', 'component', 'icon', 'perms', 'type', 'is_show'])
        .whereNot('type', 'F');
      // 提取 perms 到单独的数组
    const perms = menuDetails
    .filter(menu => menu.perms)
    .map(menu => menu.perms);

      // Step 4: 获取所有 pid 不为 0 的记录，并提取唯一的父级 id
      const parentIds = [
        ...new Set(
          menuDetails
            .filter(menu => menu.pid !== 0)
            .map(menu => menu.pid)
        )
      ];

      // 过滤掉已经在 menuDetails 中的父级菜单
      const missingParentIds = parentIds.filter(pid =>
        !menuDetails.some(menu => menu.id === pid)
      );

      // Step 5: 查询缺失的父级菜单
      let parentMenus = [];
      if (missingParentIds.length > 0) {
        parentMenus = await knex('sys_menu')
          .whereIn('id', missingParentIds)
          .select(['id', 'pid', 'title', 'name', 'path', 'component', 'icon', 'perms', 'type', 'is_show'])
          .whereNot('type', 'F');
      }

      // Step 6: 合并子菜单和父菜单
      const finalMenuList = [...menuDetails, ...parentMenus];

      return {perms,routers:finalMenuList};
    } catch (error) {
      console.error('Error fetching user menus:', error);
      throw error;
    }
  },


  async allPerms(userId){
    try {
      //Step 1: 根据 user_id 查找 role_id
      const roles = await knex('sys_user_role')
        .select('role_id')
        .where('user_id', userId);
  
      const roleId = roles.map(role => role.role_id);
  
      if (roleId.length === 0) {
        return [];
      }
  
      // Step 2: 根据 role_id 查找 menu_id
      const menus = await knex('sys_role_menu')
        .select('menu_id')
        .whereIn('role_id', [roleId]);
  
      const menuIds = menus.map(menu => menu.menu_id);
  
      if (menuIds.length === 0) {
        return [];
      }
  
      // Step 3: 根据 menu_id 查找具体的菜单perms信息
      const res = await knex('sys_menu')
        .whereIn('id', menuIds)
        .select(['perms']);
      return res;
    } catch (error) {
      console.error('Error fetching user menus:', error);
      throw error;
    }
  },

  /**
   * @description 根据菜单ID查找菜单信息
   * @param {number} id - 菜单ID
   * @returns {Promise<Object|null>} 返回找到的菜单对象或null
   */
  async detail(id) {
    const res = await db.findById({query:{id}});
    return res;
  },


  /**
   * @description 删除菜单
   * @param {number} id - 要删除的菜单ID
   * @returns {Promise<boolean>} 操作是否成功
   */
  async delete(id) {
    let res = await db.delete({id});
    return res;
  },

  /**
   * @description 获取分页菜单列表
   * @param {Object} options - 分页查询参数
   * @returns {Promise<Object>} 包含菜单列表、总数等信息的对象
   */
  async list(query) {
     let res =  await db.query({
      current: 1,
      pageSize: pageSize,
      query,
      field: [
        "id",
        "name",
        "pid",
        "order_num",
        "path",
        "component",
        "title",
        "is_frame",
        "is_show",
        "perms",
        "icon",
        "type"
      ],
    });
    return res;
  },

  // 增
  async create(body) {
    try {
      const result = await db.insert(body);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  //改
  async update(body) {
    const { id, ...params } = body;
    try {
      const result = await db.update({query:{id:id}, params});
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

 
}

export default SysMenuService;
