<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="80px"
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
import { update, detail } from "@/api/friendlink.js";

export default {
  name: "friendlink-edit",

  data: () => {
    return {
      params: {
        id: 0,
        title: "",
        link: "",
        orderBy: 0,
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
  mounted() {},
  async created() {
    this.params.id = this.$route.params.id;
    await this.detail();
  },
  methods: {
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          this.params = res.data;
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

    //更新
    async update() {
      try {
        let res = await update(this.params);
        if (res.code == 200) {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update();
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
