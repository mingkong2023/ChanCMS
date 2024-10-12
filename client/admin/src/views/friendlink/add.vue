<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class="mt-20"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="params.title"></el-input>
      </el-form-item>

      <el-form-item label="链接">
        <el-input v-model="params.link"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="params.orderBy"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/friendlink.js";

export default {
  name: "friendlink-add",
  data: () => {
    return {
      params: {
        title: "",
        link: "",
        orderBy: 0,
      },

      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "名称长度在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {},
  async created() {},
  methods: {
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
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
