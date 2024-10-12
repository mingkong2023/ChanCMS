<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class="mt-20"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="params.name" placeholder="请输入汉字"></el-input>
      </el-form-item>

      <el-form-item label="标签标识">
        <el-input v-model="params.path" placeholder="模板使用标识"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create, has } from "@/api/tag.js";
import { pinyin } from "pinyin-pro";
export default {
  name: "tag-add",
  components: {},
  data: () => {
    return {
      params: {
        //接口入参
        name: "",
        path: "",
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
  async mounted() {},

  created() {},
  unmounted() {},
  watch: {
    "params.name": function (newv, oldv) {
      this.params.path = pinyin(newv, { toneType: "none" }).replace(/\s+/g, "");
    },
  },
  methods: {
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

    async has() {
      try {
        let res = await has(this.params.path);
        if (res.code == 200) {
          if (res.data) {
            this.$message({
              message: "标签已存在，请不要再添加了",
              type: "success",
            });
          } else {
            this.create();
          }
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
          this.has();
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
