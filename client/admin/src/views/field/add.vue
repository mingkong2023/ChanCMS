<template>
  <div class="mr-10 ml-10 mb-20 bg-fff pd-20">
    <el-form
      ref="params"
      :model="params"
      label-width="100px"
      class="mt-20"
    >
      <el-form-item label="中文名称" prop="cname" :rules="[{
            required: true,
            message: '请输入中文名称',
            trigger: 'blur',
          }]">
        <el-input v-model="params.cname" placeholder="请输入字段中文名称"></el-input>
      </el-form-item>

      <el-form-item label="字段名称" prop="ename" :rules="[{
            required: true,
            message: '请输入英文名称',
            trigger: 'blur',
          }]">
        <el-input v-model="params.ename" placeholder="请输入英文小驼峰方式，例：bookName"></el-input>
      </el-form-item>

      <el-form-item label="字段类型" :rules="[{
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          }]">
        <el-select v-model="params.type" placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="字段选项">
        <el-input
          v-model="params.defaultVal"
          :rows="2"
          type="textarea"
           placeholder="单选、多选、下拉框，请填写json格式。"
        ></el-input>
        <p class="f-12 c-999">例如：{"options":[{"label":"本地下载","value":"1"},{"label":"电信下载","value":"2"}]}</p>
      </el-form-item>

      <el-form-item label="默认值">
        <el-input v-model="params.val"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="params.orderBy"></el-input>
      </el-form-item>

      <el-form-item label="字段长度">
        <el-input v-model="params.length"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/field.js";
export default {
  name: "field-add",
  components: {},
  data: () => {
    return {
      params: {
        //接口入参
        mid: "",
        cname: "",
        ename: "",
        type: "",
        val: "",
        defaultVal: "",
        length: "",
        orderBy: "0",
      },
      type: [
        {
          value: "1",
          label: "单行文本",
        },
        {
          value: "2",
          label: "多行文本 ",
        },
        {
          value: "3",
          label: "下拉菜单",
        },
        {
          value: "4",
          label: "单选",
        },
        {
          value: "5",
          label: "多选 ",
        },
        {
          value: "6",
          label: "时间和日期 ",
        },
        {
          value: "7",
          label: "数字 ",
        },

        {
          value: "8",
          label: "多图上传 ",
        },

        {
          value: "9",
          label: "富文本 ",
        },
      ],
      value: "",
     
    };
  },
  computed: {},
  mounted() {},
  async created() {
    const { model, mid, tableName } = this.$route.query;
    this.params.mid = mid;
    this.params.tableName = tableName;
    this.model = model;
  },
  methods: {
    handleAttr(e) {
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
<style scoped></style>
