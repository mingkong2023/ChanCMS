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
        <el-input v-model="params.name"></el-input>
      </el-form-item>

      <el-form-item label="标签标识">
        <el-input v-model="params.path"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, detail, has } from "@/api/tag.js";
import { pinyin } from "pinyin-pro";
export default {
  name: "tag-edit",

  data: () => {
    return {
      params: {
        //接口入参
        id: 0,
        name: 0,
        path: "",
      },

      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "名称长度在 2 到 8 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  async mounted() {},
  watch: {
    "params.name": function (newv, oldv) {
      this.params.path = pinyin(newv, { toneType: "none" }).replace(/\s+/g, "");
    },
  },
  async created() {
    this.params.id = this.$route.params.id;
    await this.detail();
  },
  unmounted() {},
  methods: {
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code == 200) {
          this.params = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    //新增
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
    async has() {
      try {
        let res = await has(this.params.path);
        if (res.code == 200) {
          if (res.data) {
            this.$message({
              message: "标签已存在，修改无效",
              type: "success",
            });
          } else {
            this.update();
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
