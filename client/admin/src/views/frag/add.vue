<template>
  <div class="mr-10 ml-10 mb-20 pd-10 bg-fff">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class="mt-20"
      v-loading="loading"
    >
      <div>
        <el-form-item label="碎片名称" prop="name">
          <el-input v-model="params.name" placeholder="请输入汉字"></el-input>
        </el-form-item>

        <el-form-item label="碎片标识" prop="mark">
          <el-input v-model="params.mark" placeholder="模板使用标识"></el-input>
        </el-form-item>

        <el-form-item label="碎片类型" prop="type">
          <el-radio-group v-model="params.type" class="ml-4">
            <el-radio value="1">富文本</el-radio>
            <el-radio value="2">文本框</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="碎片内容" v-if="params.type == '1'">
          <vue3-tinymce
            v-model="params.content"
            :setting="setting"
            @init="tinymce"
            script-src="/public/admin/tinymce/tinymce.min.js"
          />
        </el-form-item>

        <el-form-item label="碎片内容" v-if="params.type == '2'">
          <el-input
            type="textarea"
            prop="textarea"
            class="textarea"
            :rows="3"
            v-model="params.content"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/frag.js";
import Vue3Tinymce from "@/components/Vue3Tinymce/src/Main.vue";
import { tinymceSet } from "@/config/tinymce.js";
import { pinyin } from "pinyin-pro";
import { uploadUrl } from "@/api/upload.js";
export default {
  name: "frag-add",
  components: {
    Vue3Tinymce,
  },
  data: () => {
    return {
      setting: tinymceSet,
      loading: true,
      params: {
        //接口入参
        type: "1",
        name: "",
        mark: "",
        content: "欢迎使用ChanCMS系统",
      },
      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "名称长度在 2 到 50 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  async mounted() {
    this.setting.images_upload_url = await uploadUrl();
  },

  created() {},
  unmounted() {},
  watch: {
    "params.name": function (newv, oldv) {
      this.params.mark = pinyin(newv, { toneType: "none" }).replace(/\s+/g, "");
    },
  },
  methods: {
    tinymce() {
      this.loading = false;
    },

    setContent(article) {
      this.params.content = article;
    },
    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    //新增
    async create() {
      try {
        let res = await create(this.params);
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.create();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
:deep(.tiny-textarea) {
  height: 436px;
}
</style>
