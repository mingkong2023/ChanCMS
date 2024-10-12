<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
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
import { update, detail } from "@/api/field.js";
import { hasUse } from "@/api/model.js";
export default {
  name: "field-edit",
  data: () => {
    return {
      params: {
        //接口入参
        id: "",
        mid: "",
        tableName: "",
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
      disable: true,
      value: "",
     
    };
  },
  computed: {},
  async mounted() {},
  async created() {
    const { model, fid, mid, tableName } = this.$route.query;
    this.params.id = fid;
    this.params.mid = mid;
    this.params.tableName = tableName;
    this.model = model;
    await this.detail(); // 文章详情
  },
  methods: {
    async hasUse(id) {
      try {
        let res = await hasUse(id);
        if (res?.data?.has?.length > 0) {
          this.disable = true;
        } else {
          this.disable = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let data = res.data;
          //记老的表名，改新表名称
          this.params = data;
          this.hasUse(data.mid);
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
