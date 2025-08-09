const {
  knex,
  config: { template, env, cache },
} = Chan;

let Site = Chan.Service(knex, "cms_site");
let Config = Chan.Service(knex, "sys_config");

const pageSize = 100;
export default () => {
  return async (req, res, next) => {
    try {
      if ("domain" in req.app.locals && env === "prd" && cache) {
        await next();
        return;
      }
      //模板数据
      let obj = {};
      let configData = await knex("sys_config").where({
        "type_code":"cms_data"
      }).select();
      configData.forEach(v => {
        obj[v.config_key] = JSON.parse(v.config_value);
      })
      Chan.config.data = obj;
      //站点
      let result = await knex("cms_site").select([
        "name",
        "logo",
        "domain",
        "email",
        "wx",
        "icp",
        "code",
        "json",
        "title",
        "keywords",
        "description",
        "template",
        "uploadWay"
      ]).first();

      if (result) {
        let data = result;
        const { domain = "" } = data;
        let _template = data.template || template;
        Chan.config.template = _template;
        req.app.locals = {
          template: _template,
          domain,
          static_url: `/public/template/${_template}/`,
        };
        await next();
      } else {
        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  };
};
