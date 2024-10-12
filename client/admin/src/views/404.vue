<template>
  <div class="fourZeroFour">
    <h1>找不到了页面或者权限不足😭</h1>
    <br />
    <el-button size="mini" @click="goHome" type="primary">去首页</el-button>
    <el-button size="mini" @click="logout" type="primary">退出登录</el-button>
  </div>
</template>

<script>
import { userStore } from "@/stores/user";
export default {
  methods: {
    logout() {
      const user = userStore();
      user.logout();
      location.reload();
    },
    goHome() {
      this.$router.replace({ path: "/home" });
    },
  },
};
</script>

<style>
.fourZeroFour {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
