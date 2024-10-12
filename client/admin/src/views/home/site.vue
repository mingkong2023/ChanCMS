<template>
  <div class="pd-20 content-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 基本设置 -->
      <el-tab-pane label="基本设置" class="mt-20" name="first">
        <el-form ref="info" :model="info" label-width="84px">
          <el-form-item label="网站名称" prop="name" :rules="[
            {
              required: true,
              message: '请输入网站名称',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ]">
            <el-input v-model="info.name"></el-input>
          </el-form-item>

          <el-form-item prop="domain" label="网站域名">
            <el-input v-model="info.domain"></el-input>
          </el-form-item>

          <el-form-item prop="email" label="站长邮箱">
            <el-input v-model="info.email" :rules="[
                {
                  type: 'email',
                  message: '请输入正确的邮箱',
                  trigger: ['blur', 'change'],
                },
              ]"></el-input>
          </el-form-item>

          <el-form-item prop="icp" label="ICP备案号">
            <el-input v-model="info.icp"></el-input>
          </el-form-item>

          <el-form-item prop="code" label="统计代码">
            <el-input type="textarea" prop="textarea" class="textarea" :rows="3" v-model="info.code"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit('info')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- seo设置 -->
      <el-tab-pane label="SEO设置" class="mt-20" name="second">
        <el-form ref="seo" :model="seo" label-width="84px">
          <el-form-item label="标题" prop="title" :rules="[
      {
        required: true,
        message: '请输入网站标题',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 20,
        message: '长度在 2 到 20 个字符',
        trigger: 'blur',
      },
    ]">
            <el-input v-model="seo.title"></el-input>
          </el-form-item>

          <el-form-item label="关键词" prop="keywords">
            <el-input v-model="seo.keywords"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description" :rules="[
      {
        min: 2,
        max: 255,
        message: '字数限制255',
        trigger: 'blur',
      },
    ]">
            <el-input type="textarea" :rows="3" class="textarea" v-model="seo.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit('seo')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <ConfigSet></ConfigSet>
      <QiNiu></QiNiu>
      <WeChat></WeChat>
    </el-tabs>
  </div>
</template>

<script>
import { siteInfo, update } from "@/api/site.js";
import ConfigSet from "./components/config.vue";
import QiNiu from "./components/qiniu.vue";
import WeChat from "./components/wechat.vue";
export default {
  name: "sys-index",
  components: { ConfigSet, QiNiu, WeChat },
  data: () => {
    return {
      loading: true,
      activeName: "first",
      activeIndex: "0",
      info: {
        id: "",
        name: "",
        domain: "",
        email: "",
        icp: "",
        code: "",
      },
      seo: {
        id: "",
        title: "",
        keywords: "",
        description: "",
      },
      infoRules: {
        name: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      seoRules: {
        title: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.query();
  },
  methods: {
    handleClick(tab) {
      this.activeIndex = tab.index;
    },

    //查询
    async query() {
      try {
        let res = await siteInfo();
        if (res.code === 200) {
          this.loading = false;
          let {
            id,
            name,
            domain,
            email,
            icp,
            police,
            copyright,
            code,
            title,
            keywords,
            description,
          } = res.data;
          this.info = {
            id,
            name,
            domain,
            email,
            icp,
            police,
            copyright,
            code,

          };
          this.seo = { id, title, keywords, description };
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

    //更新基本信息
    async update(data) {
      try {
        let res = await update(data);
        if (res.code === 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
          this.query();
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            'info': this.info,
            'seo': this.seo
          }
          this.update(data[formName]);

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
