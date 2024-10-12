<template>
  <div class="content-wrap">
    <div class="mr-10 ml-10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="SEO设置" name="second"></el-tab-pane>
        <el-tab-pane label="扩展信息" name="third"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="mr-10 ml-10 mb-20">
      <el-form ref="params" :model="params" label-width="84px" class="w640">
        <div v-show="activeIndex == 0">
          <el-form-item label="上级栏目" v-if="params.pid != 0">
            <el-cascader
              :props="categoryProps"
              :show-all-levels="false"
              v-model="categorySelected"
              :options="category"
              @change="handleChange"
              placeholder="不选择为顶级栏目"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item
            label="栏目名称"
            prop="name"
            :rules="[
              {
                required: true,
                message: '请输入栏目名称',
                trigger: 'blur',
              },
              {
                min: 1,
                max: 50,
                message: '栏目不能超过50个字',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="params.name" @change="createPinyin"></el-input>
          </el-form-item>

          <el-form-item label="栏目标识">
            <el-input
              v-model="params.pinyin"
              @change="changePath"
              placeholder="注：首页请填写home"
            ></el-input>
          </el-form-item>

          <el-form-item label="栏目路径">
            <el-input v-model="params.path" disabled></el-input>
          </el-form-item>

          <el-form-item label="列表模板">
            <el-select v-model="params.listView" placeholder="Select">
              <el-option
                v-for="item in views"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="内容模板">
            <el-select v-model="params.articleView" placeholder="Select">
              <el-option
                v-for="item in views"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="栏目类型">
            <el-radio v-model="params.type" value="0">栏目</el-radio>
            <el-radio v-model="params.type" value="1">单页</el-radio>
          </el-form-item>

          <el-form-item label="是否显示">
            <el-radio v-model="params.status" value="0">显示</el-radio>
            <el-radio v-model="params.status" value="1">隐藏</el-radio>
          </el-form-item>
        </div>

        <div v-show="activeIndex == 1">
          <el-form-item label="seo标题">
            <el-input v-model="params.seoTitle"></el-input>
          </el-form-item>

          <el-form-item label="seo关键词">
            <el-input v-model="params.seoKeywords"></el-input>
          </el-form-item>

          <el-form-item label="seo描述">
            <el-input
              type="textarea"
              prop="textarea"
              :rows="2"
              v-model="params.seoDescription"
            ></el-input>
          </el-form-item>
        </div>

        <div v-show="activeIndex == 2">
          <el-form-item label="栏目链接">
            <el-input v-model="params.url"></el-input>
          </el-form-item>

          <el-form-item label="扩展模型">
            <el-radio-group v-model="params.mid">
              <el-radio value="0">基本模型</el-radio>
              <template v-if="modList.length > 0">
               
                <el-radio
                :disabled="modelFlag"
                  v-for="(item, index) of modList"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.model }}模型
                </el-radio>
              </template>
            </el-radio-group>
            <el-tooltip
              content="如果栏目已经存在文章，则不能更换模型"
              effect="light"
              placement="top-start"
            >
              <el-icon class="ml-20 pointer"
                ><QuestionFilled class="c-165dff"
              /></el-icon>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="打开方式">
            <el-radio v-model="params.target" value="0">当前页面</el-radio>
            <el-radio v-model="params.target" value="1">新页面</el-radio>
          </el-form-item>

          <el-form-item label="栏目排序">
            <el-input v-model="params.orderBy"></el-input>
          </el-form-item>

          <el-form-item label="栏目描述">
            <el-input
              type="textarea"
              prop="textarea"
              :rows="2"
              v-model="params.description"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit('params')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { views } from "@/api/sys_config.js";

import { find, findId, update } from "@/api/category.js";
import { search } from "@/api/article.js";
import { addLabelValue, treeById, tree, showErrors } from "@/utils/tool.js";
import { list } from "@/api/model.js";
import { pinyin } from "pinyin-pro";
export default {
  name: "category-edit",
  data: () => {
    return {
      id: 0, //栏目
      categorySelected: [], //-1默认选中顶级栏目
      categorySelectedPath: "",
      categoryProps: { checkStrictly: true },

      activeName: "first", //tab 默认显示第一个
      activeIndex: "0", //tab 内容默认显示第一个

      cate: [],
      category: [], //当前所有栏目
      modList: [], //模型列表
      modelFlag: false,
      views: [], //模板
      params: {
        //接口入参
        pid: 0,
        seoTitle: "",
        seoKeywords: "",
        seoDescription: "",
        name: "",
        path: "",
        pinyin: "",
        mid: "0",
        description: "",
        url: "",
        orderBy: 0,
        type: "0",
        target: "0",
        status: "0",
        articleView: "",
        listView: "",
      },
    };
  },

  computed: {},

  created() {
    this.id = this.$route.params.id;
    this.modelList();
    this.query();
    this.findById();
    this.hasArticle();
    this.getviews();
  },

  methods: {
    createPinyin(v) {
      this.params.pinyin = pinyin(v, { toneType: "none" }).replace(/\s+/g, "");
      this.params.path = this.categorySelectedPath
        ? this.categorySelectedPath + this.params.pinyin
        : "/" + this.categorySelectedPath + this.params.pinyin;
    },

    changePath(v) {
      this.params.path = this.categorySelectedPath
        ? this.categorySelectedPath + v
        : "/" + this.categorySelectedPath + v;
    },

    handleClick(tab) {
      this.activeIndex = tab.index;
    },

    async hasArticle() {
      try {
        let res = await search(1, "", this.id);
        if (res.code == 200) {
          this.modelFlag = res.data.count > 0 ? true : false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //查询
    async query() {
      try {
        let res = await find();
        if (res.code === 200) {
          let data = res.data;
          this.cate = res.data;
          let ids = treeById(this.id, data);
          if (ids.length > 1) {
            ids.length = ids.length - 1;
          }
          console.log(ids);
          this.categorySelected = ids;
          let end = addLabelValue(tree(data));
          this.category = [...end];
        }
      } catch (error) {
        console.log(error);
      }
    },
    //查询模板
    async getviews() {
      try {
        let res = await views();
        if (res.code === 200) {
          this.views = res.data
            .filter((item) => {
              if (item !== "404.html" && item !== "500.html") {
                return true;
              }
            })
            .map((item) => {
              return {
                label: item,
                value: item,
              };
            });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //模型列表
    async modelList() {
      try {
        let res = await list(this.cur);
        if (res.code === 200) {
          this.modList = res.data.list.map((item) => {
            item.id = item.id.toString();
            return item;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //查
    async findById() {
      try {
        let res = await findId(this.id);
        if (res.code === 200) {
          this.params = res.data;
          let path = [];
          this.cate.forEach((sub) => {
            if (sub.id == res.data.pid) {
              path.push("/" + sub.pinyin);
            }
          });

          this.categorySelectedPath = path.join("") + "/";
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleChange(e) {
      //获取路径
      let path = [];
      let ids = Object.values(e);
      ids.forEach((item) => {
        this.cate.forEach((sub) => {
          if (sub.id == item) {
            path.push("/" + sub.pinyin);
          }
        });
      });

      this.categorySelectedPath = path.join("") + "/";

      this.params.path = this.categorySelectedPath + this.params.pinyin;

      if (e[0] != -1) {
        this.params.pid = e[e.length - 1];
      }
    },

    checkStrictly() {
      if (this.params.pinyin == "article") {
        this.$message({
          message: "不能使用article作为拼音",
          type: "success",
        });
        return false;
      }

      // 正则表达式：首字符必须是字母，后续可以是字母或数字
      const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
      // 检查是否符合正则表达式
      if (!regex.test(this.params.pinyin)) {
        this.$message({
          message: "拼音只能包含26个字母和数字，且首字母不能是数字",
          type: "success",
        });
        return false;
      }
      return true;
    },

    //更新基本信息
    async update() {
      try {
        let res = await update(this.params);
        if (res.code) {
          this.$message({
            message: "更新成功^_^",
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
      this.$refs[formName].validate((valid, invalidFields) => {
        if (valid) {
          this.checkStrictly() && this.update();
        } else {
          showErrors(invalidFields);
          return false;
        }
      });
    },
  },
};
</script>
<style scoped></style>
