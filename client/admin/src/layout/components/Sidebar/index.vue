<template>
  <el-menu
    active-text-color=""
    background-color=""
    class="el-menu-vertical-demo"
    text-color=""
    :default-active="activeIndex"
    :router="true"
    :unique-opened="false"
    :collapse-transition="true"
    :collapse="isCollapse"
    popper-effect="light"
    @open="handleOpen"
    @close="handleClose"
  >
    <SidebarItem :data="menuList"></SidebarItem>
  </el-menu>
</template>

<script name="SideBar">
import { defineComponent } from "vue";
import SidebarItem from "./side-bar-item.vue";
import { useRoute } from "vue-router";
import { userStore } from "@/stores/user";
export default defineComponent({
  props: {
    isCollapse: Boolean,
  },
  components: { SidebarItem },
  data() {
    return {
      activeIndex: "",
      menuList: [],
    };
  },
  watch: {
    $route(to, from) {
      this.activeIndex = "/" + to.path.split("/")[1] || to.path;
    },
  },
  created() {
    const route = useRoute();
    const { menuList } = userStore();
    this.menuList = menuList;
    this.activeIndex = "/" + route.path.split("/")[1] || route.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: 0px;
}
</style>
