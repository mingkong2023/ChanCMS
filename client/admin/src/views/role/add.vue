<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form ref="params" :model="params" label-width="84px" class="mt-20">
      <el-form-item
        label="角色名称"
        :rules="[
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ]"
        prop="name"
      >
        <el-input v-model="params.name"></el-input>
      </el-form-item>

      <el-form-item label="角色值">
        <el-input v-model="params.value"></el-input>
      </el-form-item>

      <el-form-item label="是否显示">
        <el-radio v-model="params.status" value="1">启用</el-radio>
        <el-radio v-model="params.status" value="2">关闭</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/sys_role.js";

export default {
  name: "role-add",
  data: () => {
    return {
      params: {
        name: "",
        value: "",
        status: "1",
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
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
