<template>
  <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup name="BreadCrumb">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
// 生成数组数据
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
  // const list = route.matched.filter((item) => item.name !== "index");

  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title,
  );
};
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  {
    immediate: true,
  },
);

// 处理点击事件
const router = useRouter();
const onLinkClick = (item) => {
  console.log(item);
  router.push(item.path);
};
</script>

<style lang="less" scoped>
// .breadcrumb-enter-active,
// .breadcrumb-leave-active {
//   transition: all 0.5s;
// }

// .breadcrumb-enter-from,
// .breadcrumb-leave-active {
//   opacity: 0;
//   transform: translateX(20px);
// }

.breadcrumb-leave-active {
  position: absolute;
}
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    cursor: text;
  }

  .redirect {
    font-weight: bolder;
  }
}
</style>
