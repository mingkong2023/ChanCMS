<template>
  <div class="content-wrap">
    <!-- 搜索区域 -->
    <div
      class="search flex justify-between align-c pt-10 pl-20 pr-20 pb-20 mb-20"
    >
      <el-form :inline="true" :model="params">
        <el-form-item class="mt-10" label="名称" prop="keywords">
          <el-input
            placeholder="请输入栏目名称"
            :suffix-icon="Search"
            v-model="params.keywords"
            clearable
          />
        </el-form-item>
        <el-form-item class="mt-10">
          <el-button type="primary" @click="search" round>搜索</el-button>
          <el-button @click="clearSearch" round>清空</el-button>
        </el-form-item>
      </el-form>
      <router-link class="mt-10" to="/category/add">
        <el-button type="primary" @click="search" round>新增</el-button>
      </router-link>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="name"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column
        prop="name"
        label="栏目名称"
        width="140"
      ></el-table-column>

      <el-table-column prop="id" align="center" label="编号"></el-table-column>

      <el-table-column prop="type" label="类型" width="80">
        <template #default="scope">
          <p v-if="scope.row.type == 0">栏目</p>
          <p v-else>单页</p>
        </template>
      </el-table-column>

      <el-table-column prop="orderBy" align="center" label="排序">
        <template #default="scope">{{ scope.row.orderBy }}</template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <p v-if="scope.row.status == 0">显示</p>
          <p v-else>隐藏</p>
        </template>
      </el-table-column>
      
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            :icon="View"
            circle
            @click="handleClick(scope.row)"
          ></el-button>
          <el-button :icon="Edit" circle @click="toEdit(scope.row)"></el-button>
          <el-button
            :icon="Delete"
            circle
            @click="handleDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { findSubId, destory, search } from "@/api/category.js";
import { tree, addLabelValue } from "@/utils/tool.js";

export default {
  name: "category-index",
  setup() {
    return {
      Edit,
      Delete,
      View,
      Search,
    };
  },
  data: () => {
    return {
      params: {
        keywords: "",
      },
      loading: true,
      tableData: [],
      multipleSelection: [],
    };
  },
  computed: {},
  created() {
    this.search();
  },
  methods: {
    //清空
    clearSearch() {
      this.params.keywords = "";
      this.tableData = [];
      this.multipleSelection = [];
      this.search();
    },

    //查询
    async search() {
      try {
        const q = this.params.keywords;
        let res = await search(q);
        if (res.code === 200) {
          let data = tree(res.data);
          this.tableData = addLabelValue(data);
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //全选和反选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "category-edit", params: { id: id } });
    },

    //查询是否有子栏目
    async hasChild(id) {
      try {
        let res = await findSubId(id);
        if (res.code === 200) {
          if (res.data.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //删除
    async del(id) {
      try {
        let res = await destory(id);
        if (res.code === 200) {
          this.$message({
            message: "删除成功 ^_^",
            type: "success",
          });
          this.clearSearch();
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

    //跳转到首页
    handleClick(e) {
      let url;
      if (e.type == "0") {
        url = location.origin + e.path + "/index.html";
      } else {
        url = location.origin + e.path + "/page.html";
      }
      window.open(url);
    },

    delSome() {},

    //删除栏目  还需要判断是否当前栏目下面有文章？
    handleDel(e) {
      let id = e.id;
      let has = this.hasChild(id);
      //判断是否有子栏目
      if (has.length > 0) {
        this.$message({
          message: "我下面还有栏目啊 ^_^",
          type: "success",
        });
        return false;
      } else {
        this.del(id);
      }
    },
  },
};
</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 0px;
}
</style>
