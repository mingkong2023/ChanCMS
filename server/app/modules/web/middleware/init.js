const {
  web: {
    service: { common },
  },
  api: {
    service: { site, frag, tag, friendlink, sysApp },
  },
} = Chan.modules;
const config = Chan.config;
const { utils } = Chan.helper;

module.exports = () => {
  return async (req, res, next) => {
    try {
      let { template, env, appName, version } = config;
      if ("site" in req.app.locals) {
        await next();
        return;
      }
      let sysconfig = await sysApp.find();
      const { domain } = sysconfig;
      let _template = sysconfig.template || template;

      // 站点
      const _site = await site.find();
      // 分类
      const _category = await common.category();
      //导航
      const nav = utils.tree(_category);
      // 友情链接
      const _friendlink = await friendlink.list();
      //样式路径
      const base_url = `/public/template/${_template}`;
      //获取碎片 默认100条
      const _frag = await frag.list();
      //获取热门标签 默认20条
      const _tag = await tag.hot();
      req.app.locals = {
        template: _template,
        domain,
        appName,
        version,
        site: _site,
        nav,
        category: _category,
        friendlink: _friendlink,
        base_url,
        frag: _frag,
        tag: _tag,
      };
      Chan.config.template = _template;
      // env === "dev" && console.log("locals-config", req.app.locals);
      await next();
    } catch (error) {
      next(error);
    }
  };
};
