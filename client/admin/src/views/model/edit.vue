<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form
      ref="params"
      :model="params"
      label-width="100px"
      class="mt-20"
    >
    <el-form-item label="模型名称" prop="model">
        <el-input v-model="params.model" placeholder="请输入模型名称" :rules="[
                {
                  required: true,
                  message: '请输入模型名称',
                  trigger: 'blur'
                }
              ]"></el-input>
      </el-form-item>
      <el-form-item label="新增表名" prop="tableName">
        <el-input v-model="params.tableName"  placeholder="表名称必须ext_开头" :rules="[
                {
                  required: true,
                  message: '请输入表名',
                  trigger: 'blur'
                },
                {
                  validator: validateTableName,
                  trigger: 'blur'
                }
              ]"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio v-model="params.status" value="1">开启</el-radio>
        <el-radio v-model="params.status" :disabled="disable" value="0"
          >禁用</el-radio
        >
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
import { update, hasUse, detail } from "@/api/model.js";
export default {
  name: "model-edit",
  data: () => {
    return {
      params: {
        //接口入参
        id: 0,
        old_table: "", //未修改之前的表名称
        model: "",
        table: "",
        remark: "",
        status: "1",
      },
      disable: false,

    };
  },
  computed: {},
  async mounted() {},
  async created() {
    let id = this.$route.params.id;
    this.params.id = id;
    await this.detail(); // 文章详情
    await this.hasUse(id);
  },
  methods: {
    validateTableName(rule, value, callback) {
      if (!value.startsWith('ext_')) {
        callback(new Error('表名必须以 ext_ 开头'));
      } else {
        callback();
      }
    },
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let data = res.data;
          //记老的表名，改新表名称
          this.params = { ...data, old_table: data.table };
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

    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    handletag(e) {
      console.log("e-->", e);
    },
    handleBox(e) {
      console.log("e-->", e);
    },

    async hasUse(id) {
      try {
        let res = await hasUse(id);
        if (res.code == 200) {
          if (res.data.count) {
            this.disable = true;
          } else {
            this.disable = false;
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

    //新增
    async update() {
      try {
        let res = await update(this.params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
        this.$router.go(-1);
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
