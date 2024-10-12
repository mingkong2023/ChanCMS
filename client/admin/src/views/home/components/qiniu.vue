<template>
  <div class="mr-10 ml-10">
    <!-- 基本设置 -->
    <el-tab-pane label="七牛云配置" class="mt-20" name="qiniu">
      <el-form ref="set" :model="set" label-width="120px">
        <el-form-item prop="accessKey" label="accessKey(AK)">
          <el-input v-model="set.accessKey"></el-input>
        </el-form-item>

        <el-form-item prop="secretKey" label="secretKey(SK)">
          <el-input v-model="set.secretKey"></el-input>
        </el-form-item>

        <el-form-item prop="domain" label="域名">
          <el-input v-model="set.domain"></el-input>
        </el-form-item>

        <el-form-item prop="bucket" label="空间">
          <el-input v-model="set.bucket"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit('set')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </div>
</template>

<script>
import { find, update } from "@/api/sys_config.js";

export default {
  name: "QiNiu",
  data: () => {
    return {
      loading: true,
      set: {
        template: "default",
        appid: "",
        secret: "",
        accessKey: "", //ak
        secretKey: "", //sk
        domain: "", //域名
        bucket: "", //空间名称
        uploadWay: "1", //1->普通 2->七牛云
      },
    };
  },
  computed: {},
  created() {
    this.query();
  },
  methods: {
    //查询
    async query() {
      try {
        let res = await find();
        if (res.code === 200) {
          this.loading = false;
          this.set = res.data;
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

    //更新SEO信息
    async update() {
      try {
        let res = await update(this.set);
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
