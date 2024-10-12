<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form ref="params" :model="params" label-width="100px" class="mt-20">
      <el-form-item
        label="模型名称"
        prop="model"
        :rules="[{
            required: true,
            message: '请输入模型名称',
            trigger: 'blur',
          }]"
      >
        <el-input
          v-model="params.model"
          placeholder="请输入模型名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新增表名"
        prop="tableName"
        :rules="[
          {
            required: true,
            message: '请输入表名',
            trigger: 'blur',
          },
          {
            validator: validateTableName,
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="params.tableName"
          placeholder="表名称必须ext_开头"
        ></el-input>
      </el-form-item>

      <el-form-item label="是否启用">
        <el-radio v-model="params.status" value="1">开启</el-radio>
        <el-radio v-model="params.status" value="0">禁用</el-radio>
      </el-form-item>

      <el-form-item
        label="备注"
        prop="remark"
        :rules="[{
            required: true,
            message: '请输入备注',
            trigger: 'blur',
          }]"
      >
        <el-input
          v-model="params.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/model.js";
export default {
  name: "model-add",
  components: {},
  data: () => {
    return {
      params: {
        //接口入参
        model: "", //
        tableName: "",
        status: "1",
        remark: "",
      },
    };
  },
  computed: {},
  mounted() {
    //tinymce.init({});
  },
  created() {},
  methods: {
    validateTableName(rule, value, callback) {
      if (!value.startsWith("ext_")) {
        callback(new Error("表名必须以 ext_ 开头"));
      } else {
        callback();
      }
    },
    handleAttr(e) {
      console.log("e-->", e);
    },

    //新增
    async create() {
      try {
        let params = { ...this.params };
        let res = await create(params);
        if (res.code == 200) {
          this.$message({
            message: "创建表成功^_^",
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
<style scoped></style>
