<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form ref="params" :model="params" label-width="84px">
      <el-form-item label="菜单配置">
        <JsonEditorVue
          :debounce="100"
          class="w-full vjs-tree"
          :show-btns="false"
          lang="zh"
          :mode="'text'"
          :expandedOnStart="false"
          v-model="params.content"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import JsonEditorVue from "json-editor-vue";

import { find, update } from "@/api/menu.js";
export default {
  name: "menu-index",
  components: { JsonEditorVue },
  // 注册组件
  data: () => {
    return {
      hasJsonFlag: true,
      val: {},
      params: {
        //接口入参
        id: 0,
        content: {},
      },
    };
  },

  computed: {},
  async mounted() {},

  async created() {
    await this.find();
  },
  unmounted() {},
  methods: {
    changeJson(val) {
      console.log(val);
      console.log(this.params);
    },
    // 文章详情
    async find() {
      try {
        let res = await find();
        if (res.code == 200) {
          const { id, content } = res.data;
          this.params = {
            id,
            content: JSON.parse(content),
          };
        }
      } catch (error) {
        console.error(error);
      }
    },
    //新增
    async update() {
      try {
        const { id, content } = this.params;
        let params = {
          id,
          content: content,
        };
        let res = await update(params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
          location.reload();
        }
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
<style scoped>
.vjs-tree {
  height: calc(100vh - 200px);
  overflow: auto;
  width: 100%;
}
::v-deep(.jse-menu) {
  display: none !important;
}
::v-deep(.cm-gutters, .cm-gutter-lint) {
  border: none !important;
}

::v-deep(.jse-main) {
  /* border-top: 1px solid #f2f2f2; */
}
::v-deep(.jse-outer.has-main-menu-bar) {
  margin-top: 0;
  padding-top: 0;
}
::v-deep(.cm-editor .cm-gutters) {
  background-color: #f2f2f2 !important;
}
::v-deep(.jse-text-mode.svelte-a0poeb .jse-contents.svelte-a0poeb) {
  border: none !important;
}
::v-deep(
    .jse-text-mode.svelte-a0poeb
      .jse-contents.svelte-a0poeb
      .cm-editor
      .cm-activeLine,
    .jse-text-mode.svelte-a0poeb
      .jse-contents.svelte-a0poeb
      .cm-editor
      .cm-activeLineGutter
  ) {
  background-color: #f6f6f6 !important;
}
::v-deep(.ͼ1 .cm-gutter-lint) {
  width: auto;
}
::v-deep(.ͼr) {
  color: #000;
  font-size: 15px;
  font-family: "microsoft yahei";
}
::v-deep(.ͼq) {
  color: #1a85f8;
}
::v-deep(.ͼo) {
  font-size: 15px;
  color: #999;
  font-family: "microsoft yahei";
}

::v-deep(.jse-status-bar.svelte-hhcn0f.svelte-hhcn0f) {
  border: none;
  background-color: #fafafa;
}
::v-deep(.jse-status-bar.svelte-hhcn0f.svelte-hhcn0f:last-child) {
  border: none;
}
</style>
