<template>
  <el-form :model="form" label-width="70px" ref="form" @keyup.enter="onSubmit">
    <el-form-item prop="type" label="类型">
      <el-select v-model="form.type" placeholder="please select your zone">
        <el-option label="咨询" value="1" />
        <el-option label="投诉" value="2" />
        <el-option label="建议" value="3" />
        <el-option label="其它" value="4" />
      </el-select>
    </el-form-item>

    <el-form-item prop="title" label="标题" :rules="[
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
  ]">
      <el-input v-model="form.title" />
    </el-form-item>

    <el-form-item prop="name" label="姓名" :rules="[
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  ]">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item prop="tel" label="电话" :rules="[
    {
      required: true,
      message: '请输入电话',
      trigger: 'blur',
    },
    {
      required: true,
      pattern: /^\d{11}$/,
      message: '请输入11位数字的电话号码',
      trigger: ['blur', 'change'],
    },
  ]">
      <el-input v-model="form.tel" />
    </el-form-item>

    <el-form-item prop="wechat" label="微信">
      <el-input v-model="form.wechat" />
    </el-form-item>

    <el-form-item prop="company" label="公司">
      <el-input v-model="form.company" />
    </el-form-item>

    <el-form-item prop="content" label="描述" :rules="[
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur',
    },
  ]">
      <el-input v-model="form.content" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
  <Vcode :imgs="imgs" :show="isShow" @success="onSuccess" @fail="onFail" />
</template>

<script>
import Vcode from "vue3-puzzle-vcode";
export default {
  name: "Message",
  components: { Vcode },
  props: {
    message: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isShow: false,
      imgs: [
        "/public/cover/sea/01.png",
        "/public/cover/sea/02.png",
        "/public/cover/sea/03.png",
        "/public/cover/sea/04.png",
        "/public/cover/sea/05.png",
        "/public/cover/sea/06.png",
        "/public/cover/sea/07.png",
      ],
      form: {
        type: "1",
        title: "",
        name: "",
        tel: "",
        wechat: "",
        company: "",
        content: "",
      },
    }
  },
  methods: {

    onSuccess() {
      this.sendMessage();
    },
    onFail(e) {
      console.log(e);
    },

    sendMessage() {
      fetch("/api/message/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      })
        .then((response) => response.json())
        .then((data) => {
          ElMessage({
            message: "提交成功！",
            type: "success",
          });
          this.isShow = false;
          this.resetForm();
        })
        .catch((error) => {
          ElMessage({
            message: "提交失败，请稍后重试！",
            type: "success",
          });
          this.isShow = false;
          this.resetForm();
        });
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isShow = true;
        } else {
          return false;
        }
      });

    },

    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped></style>
