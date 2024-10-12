<template>
  <!-- 无子目录 -->
  <template v-for="(item, index) of data" :key="item.path">
    <!-- 有子目录 -->

    <el-sub-menu
      v-if="item?.children?.length > 0 && item.meta.isShow"
      :index="item.path"
    >
      <template #title>
        <el-icon v-if="item?.meta?.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <SidebarItem :data="item.children"></SidebarItem>
    </el-sub-menu>

    <!-- 无子目录 -->
    <el-menu-item v-else-if="item.meta.isShow" :index="item.path">
      <el-icon v-if="item?.meta?.icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>{{ item?.meta?.title }}</template>
    </el-menu-item>
  </template>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    goto(item) {
      // 跳转到指定路由
      if (item?.children?.length > 0) {
        return false;
      } else {
        this.$router.push({
          path: item.path,
          query: item.query,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.ico-nav {
  width: 40px;
  height: 40px;
  border-radius: 15px;
  box-shadow: inset 0px 0px 5px #f2f2f2;
  padding: 4px;
  display: inline-block;
  margin-right: 5px;
  img {
    width: 100%;
  }
}

.el-sub-menu .el-menu-item {
  margin-left: 10px;
}

.el-sub-menu.is-active {
  :deep(.el-icon) {
    color: #165dff;
  }

  :deep(.el-sub-menu__title) {
    color: #165dff;
  }

  :deep(.el-sub-menu__icon-arrow) {
    color: #165dff;
  }
}

:deep(.is-active) {
  color: #165dff;
}
</style>
