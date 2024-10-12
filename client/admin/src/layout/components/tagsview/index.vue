<template>
  <el-scrollbar>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
  </el-scrollbar>
</template>

<script setup name="TagView">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
watch(
  () => router.currentRoute.value,
  (newValue) => {
    console.log("newValue", newValue);
    //addTags();
    //   moveToCurrentTag()
  },
  { immediate: true },
);
</script>

<style scoped></style>
