const {
  web: {
    service: { common },
  },
  api: {
    service: { site, frag, tag, friendlink },
  },
} = Chan.modules;

module.exports = () => {
  return async (req, res, next) => {
    try {
      let { utils } = Chan.helper;
      let {
        config: { template, dataCache },
      } = req.app.locals;
      if ("site" in req.app.locals && dataCache == "1") {
        await next();
        return;
      }
      // 站点
      const siteData = await site.find();
      // 分类
      const categoryData = await common.category();
      //导航
      const nav = utils.tree(categoryData);
      // 友情链接
      let friendlinkData = await friendlink.list();
      //样式路径
      const base_url = `/public/template/${template}`;
      //获取碎片 默认100条
      const fragData = await frag.list();
      //获取热门标签 默认20条
      const tagData = await tag.hot();
      req.app.locals = {
        ...req.app.locals,
        site: siteData,
        nav,
        category: categoryData,
        friendlink: friendlinkData,
        base_url,
        frag: fragData,
        tag: tagData,
      };
      await next();
    } catch (error) {
      next(error);
    }
  };
};
