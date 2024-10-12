<!-- eslint-disable no-useless-escape -->
<template>
  <div class="mb-20 bg-fff pd-20">
    <el-form ref="params" :model="params" label-width="84px">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="列表测试" name="list">
          <el-form-item
            label="任务名称"
            prop="taskName"
            :rules="[
              {
                required: true,
                message: '请输入任务名称',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="params.taskName"
              placeholder="例：前端库-chat问答"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="列表网址"
            prop="targetUrl"
            :rules="[
              {
                required: true,
                message: '请输入匹配网址',
                trigger: 'blur',
              },
            ]"
          >
            <div class="flex w-full">
              <el-input
                class="flex-1"
                v-model="params.targetUrl"
                placeholder="/SEO/1_${page}.html"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item
            label="字符集"
            prop="charset"
            :rules="[
              {
                required: true,
                message: '请选择字符集',
                trigger: 'blur',
              },
            ]"
          >
            <el-radio-group v-model="params.charset" class="ml-4">
              <el-radio value="1" size="large">uft-8</el-radio>
              <el-radio value="2" size="large">gb2312</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="列表链接"
            prop="listTag"
            :rules="[
              {
                required: true,
                message: '请输入文章列表标签',
                trigger: 'blur',
              },
            ]"
          >
            <div class="flex w-full">
              <el-input
                class="flex-1"
                v-model="params.listTag"
                placeholder="例：.content h4 a"
              ></el-input>
              <el-button class="ml-5" type="primary" @click="getPages">
                测试
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="开始页面">
            <div class="flex w-full">
              <el-input class="flex-1" v-model="params.startNum"></el-input>
              <span class="ml-5 mr-5">至</span>
              <el-input class="flex-1" v-model="params.endNum"></el-input>
              <span class="ml-5 mr-5">每页递增</span>
              <el-input
                class="flex-1 mr-5"
                v-model="params.increment"
              ></el-input>
              <el-button type="primary" @click="getListPages">测试</el-button>
            </div>
          </el-form-item>

          <el-form-item label="列表地址" v-if="listPages.length > 0">
            <p class="mr-30" v-for="(item, index) of listPages" :key="index">
              {{ item }}
            </p>
          </el-form-item>

          <el-form-item label="文章地址" v-if="params.pages.length > 0">
            <p class="mr-30" v-for="(item, index) of params.pages" :key="index">
              {{ item }}
            </p>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="内容测试" name="article">
          <el-form-item label="目标地址">
            <a class="mr-10" :href="params.pages[0]" target="_blank">{{
              params.pages[0]
            }}</a
            >（默认第一个作为测试）
          </el-form-item>

          <el-form-item
            label="文章标题"
            prop="titleTag"
            :rules="[
              {
                required: true,
                message: '请输入文章标题',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              class="flex-1"
              placeholder="例：.title"
              v-model="params.titleTag"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="文章内容"
            prop="articleTag"
            :rules="[
              {
                required: true,
                message: '请输入文章内容',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              placeholder="例：.article"
              v-model="params.articleTag"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="处理函数"
            prop="parseData"
            :rules="[
              {
                required: true,
                message: '如果无特殊处理，请直接填写  return data;',
                trigger: 'blur',
              },
            ]"
          >
            <div class="flex w-full">
              <el-input
                class="flex-1"
                type="textarea"
                :rows="13"
                v-model="params.parseData"
                placeholder="如果不做任何处理，直接返回data。拿到的文本是变量是data,可以直接js函数可以处理成需要的数据，最终需要返回data。例：
            data = data.replaceAll('<BR>','<br/>');
            return data;
            //或
            return data;
            "
              ></el-input>
              <el-button class="ml-5" type="primary" @click="getArticle">
                测试
              </el-button>
            </div>
          </el-form-item>

          <el-form-item v-if="article.title" label="采集结果">
            <el-card class="w-full" shadow="never">
              <template #header>
                <p class="f-15">
                  <span class="c-999">标题：</span>{{ article.title }}
                </p>
              </template>
              <p class="f-15"><span class="c-999">内容：</span></p>
              <div class="f-15 article" v-html="article.article"></div>
            </el-card>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="保存配置" name="save">
          <el-form-item
            label="保存栏目"
            prop="articleTag"
            :rules="[
              {
                required: true,
                message: '请输入保存栏目',
                trigger: 'blur',
              },
            ]"
          >
            <el-cascader
              :props="categoryProps"
              :show-all-levels="false"
              v-model="categorySelected"
              :options="category"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item
            label="发布状态"
            prop="status"
            :rules="[
              {
                required: true,
                message: '请选择字符集',
                trigger: 'blur',
              },
            ]"
          >
            <el-radio-group v-model="params.status" class="ml-4">
              <el-radio value="1" size="large">草稿</el-radio>
              <el-radio value="2" size="large">发布</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit('params')">保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { find } from "@/api/category.js";
import { getPages, getArticle, detail, update } from "@/api/collect.js";
import {
  getImgUrlFromStr,
  filterHtml,
  filterAndReplaceImgSrc,
  addLabelValue,
  treeById,
  tree,
  showErrors
} from "@/utils/tool.js";
export default {
  name: "collect-edit",
  data: () => {
    return {
      activeName: "list",

      categorySelected: [], //-1默认选中顶级栏目
      categoryProps: { checkStrictly: true },
      category: [], //当前所有栏目

      params: {
        taskName: "",
        targetUrl: "",
        listTag: "",
        startNum: 1,
        endNum: 1,
        increment: 1,
        pages: [], //详情页面地址
        titleTag: "",
        articleTag: "",
        charset: "1", //utf-8
        parseData: "return data;",
        status: "1", //是否限制
        cid: 0,
      },
      listPages: [],
      article: {},
    };
  },
  computed: {},
  mounted() {},
  async created() {
    this.params.id = this.$route.params.id;
    await this.detail();
    await this.query();
  },
  methods: {
    //查询
    async query() {
      try {
        let res = await find();
        if (res.code === 200) {
          let data = res.data;
          let ids = treeById(this.params.cid, data);
          this.categorySelected = ids;
          let end = addLabelValue(tree(data));
          this.cateList = addLabelValue(data);
          this.category = [...end];
        }
      } catch (error) {
        console.log(error);
      }
    },
    //选择栏目
    handleChange(e) {
      if (e[0] != -1) {
        this.params.cid = e[e.length - 1];
      }
    },
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let data = res.data;
          data.pages = data.pages.split(",");
          this.params = data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    async getPages() {
      try {
        let { targetUrl, listTag, charset } = this.params;
        let res = await getPages({ targetUrl, listTag, charset });
        if (res.code == 200) {
          let data = res.data;

          // eslint-disable-next-line no-useless-escape
          const regex = /^(.*:\/\/[^\/]+).*$/;
          const matches = targetUrl.match(regex);
          const fullUrl = matches[1];
          if (!data[0].includes("http")) {
            data = data.map((item) => {
              return fullUrl + item;
            });
          }
          this.params.pages = data;
          this.$message({
            message: "列表地址获取成功^_^",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getListPages() {
      try {
        let { targetUrl, startNum, endNum, increment } = this.params;
        let pages = [];
        for (let i = startNum; i <= endNum; i += increment) {
          let url = targetUrl.replace("${page}", i);
          pages.push(url);
        }
        this.listPages = pages;

        this.listPages.map(async (item, index) => {
          let { listTag, charset } = this.params;
          if (index > 0) {
            let res = await getPages({ targetUrl: item, listTag, charset });
            if (res.code == 200) {
              this.params.pages = [...this.params.pages, ...res.data];
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getArticle() {
      try {
        let { taskUrl, titleTag, articleTag, parseData, charset } = this.params;

        taskUrl = this.params.pages[0] || "";
        let res = await getArticle({
          taskUrl,
          titleTag,
          articleTag,
          parseData,
          charset,
        });
        if (res.code == 200) {
          this.article = res.data;
          this.$message({
            message: "内功获取成功^_^",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //新增
    async update() {
      try {
        let params = this.params;
        params.pages = this.params.pages.toString();
        let res = await update(this.params);
        if (res.code == 200) {
          this.$message({
            message: "新增成功^_^",
            type: "success",
          });
          this.$router.go(-1);
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    submit(formName) {
      this.$refs[formName].validate((valid,invalidFields) => {
        if (valid) {
          this.update();
        } else {
          showErrors(invalidFields);
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
:deep(.show .el-form-item__content) {
  flex-direction: column;
  align-items: start;
}
.article p {
  margin-bottom: 10px;
}
</style>
