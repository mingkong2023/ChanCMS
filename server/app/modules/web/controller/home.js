const {
  modules: {
    web: {
      service: { common, home },
    },
    api: {
      service: { article },
    },
  },
  helper: {
    utils: { pages,getChildrenId, treeById, filterFields,  htmlDecode  },
  },

} = Chan;

const ArticleService = article;

class HomeController {
  // 首页
  async index(req, res, next) {
    try {
      const {
        nav,template
      } = req.app.locals;

      let result = {};

      if (!("banner" in res.locals)) {
        result = await home.home();
        res.locals = { ...res.locals, ...result };
      }

      // 指定多栏目栏目获取文章列表
      // await common.getArticleListByCids([59,1,29,]) 不传入默认所有栏目
      let article = await common.getArticleListByCids();

      //获取首页
      let defaultView = "index.html";
      if (nav.length > 0 && nav[0].pinyin == "home" && nav[0].listView) {
        defaultView = nav[0].listView;
      }
      res.render(`${template}/${defaultView}`, { ...result, article });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 列表页
  async list(req, res, next) {
    try {
      const {
        template
      } = req.app.locals;
      const { cate, current, cid } = req.params;
      const currentPage = parseInt(current) || 1;
      const pageSize = 10;
      const { category } = req.app.locals;

      // 当前栏目和当前栏目下所有子导航
      let navSub = getChildrenId(cate || cid, category);
      // const navSubField = ["id", "name", "path"];
      // navSub.cate.children = filterFields(navSub.cate.children, navSubField);

      //获取栏目id
      const id = cid || navSub.cate.id || "";
      if (!id) {
        await res.render(`${template}/404.html`);
        return;
      }

      // 当前位置
      let position = treeById(id, category);
      const positionField = ["id", "name", "path"];
      position = filterFields(position, positionField);

      //列表页全量数据
      const data = await home.list(id, currentPage, pageSize);

      //分页
      let { count } = data.data;
      let href = "";
      let pageHtml = "";
      if (position.length > 0) {
        href = position.slice(-1)[0].path + "/index";
        pageHtml = pages(currentPage, count, pageSize, href);
      }

      //获取模板
      let view = navSub.cate.listView || "list.html";
      await res.render(`${template}/${view}`, {
        position,
        cate: navSub.cate,
        navSub,
        pageHtml,
        ...data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 详情页
  async article(req, res, next) {
    try {
      const {
        template
      } = req.app.locals;
      let { id } = req.params;
      const { category } = req.app.locals;

      if (id.includes(".html")) {
        id = id.replace(".html", "");
      }

      if (!id) {
        await res.render(`${template}/404.html`);
        return;
      }

      // 文章列表
      const article = await ArticleService.detail(id);

      if (!article) {
        await res.render(`${template}/404.html`);
        return;
      }

      // 栏目id
      const cid = article.cid || "";
      // 内容标签
      article.tags = await common.fetchTagsByArticleId(id);
    
      article.content = htmlDecode(article.content);
      // 扩展字段
      Object.getOwnPropertyNames(article.field).forEach(function (key) {
        if (
          typeof article.field[key] == "string" &&
          article.field[key].includes("{")
        ) {
          article.field[key] = JSON.parse(article.field[key]);
        }
      });
      // 当前栏目和当前栏目下所有子导航
      const navSub = getChildrenId(cid, category);
      // 当前位置
      const position = treeById(cid, category);
      // 增加数量
      await ArticleService.count(id);
      //上一页
      const pre = await ArticleService.pre(id, cid);
      //下一页
      const next = await ArticleService.next(id, cid);
      //热门 推荐 图文
      const data = await home.article(cid);
      //获取模板
      let view = article.articleView || navSub.cate.articleView;
      await res.render(`${template}/${view}`, {
        ...data,
        cate: navSub.cate,
        article,
        navSub,
        position,
        pre,
        next,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 单页
  async page(req, res, next) {
    try {

      const { cate, id } = req.params;
      const { category,template } = req.app.locals;

      // 当前栏目和当前栏目下所有子导航
      let cid = "";
      let navSub = {};
      let article = {};
      let position = {};

      if (!id && !cate) {
        await res.render(`${template}/404.html`);
        return;
      }

      //通过拼音找到对应的栏目
      if (cate) {
        navSub = getChildrenId(cate, category);
        //获取栏目id
        cid = navSub.cate.id || "";
      }

      //文章id查找栏目id
      if (id) {
        // 文章列表
        article = await ArticleService.detail(id);
        // 栏目id
        cid = article.cid || "";
      }

      //没找到栏目 去404
      if (!cid) {
        await res.render(`${template}/404.html`);
        return;
      }

      //获取单页列表
      const data = await home.page(cid, 1, 20);

      if (data.list.length > 0 && !id) {
        article = await ArticleService.detail(data.list[0].id);
      }

      //没找到文章 去404
      if (Object.keys(article).length > 0) {
      
        // 当前位置
        position = treeById(article.cid, category);
        // 增加数量
        await ArticleService.count(article.id);
      }

      //获取模板
      let view = navSub?.cate?.articleView || "page.html";
      await res.render(`${template}/${view}`, {
        data: data.list,
        cate: navSub.cate,
        navSub,
        position,
        article,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // 搜索页
  async search(req, res, next) {
    try {
      const {template } = req.app.locals;
      const { keywords, id } = req.params;
      const page = id || 1;
      const pageSize = 10;
      // 文章列表
      const data = await ArticleService.search(keywords, page, pageSize);
      //分页
      let { count } = data;
      let href = "/search/" + keywords;
      let pageHtml = pages(page, count, pageSize, href);
      data.list.forEach((ele) => {
        ele.titles = ele.title.replace(
          new RegExp(keywords, "gi"),
          `<span class='c-red'>${keywords}</span>`
        );
      });
      await res.render(`${template}/search.html`, {
        keywords,
        data,
        pageHtml,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // tag
  async tag(req, res, next) {
    try {
      const {template } = req.app.locals;
      const { path, id } = req.params;
      const page = id || 1;
      const pageSize = 10;
      // 文章列表
      const data = await common.tags(path, page, pageSize);
      //分页
      let { count } = data;
      let href = "/tag/" + path;
      let pageHtml = pages(page, count, pageSize, href);
     
      await res.render(`${template}/tag.html`, { data, path, pageHtml });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = HomeController;
