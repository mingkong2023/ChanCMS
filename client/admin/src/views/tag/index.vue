<template>
  <div class="content-wrap">
    <!-- 搜索区域 -->
    <div
      class="search flex justify-between align-c pt-10 pl-20 pr-20 pb-20 mb-20"
    >
      <el-form :inline="true" :model="params" ref="form">
        <el-form-item class="mt-10" label="标题" prop="keywords">
          <el-input
            class="mr-10 w-auto"
            placeholder="请输入内容"
            :suffix-icon="Search"
            clearable
            @clear="clearSearch"
            v-model="params.keywords"
          ></el-input>
        </el-form-item>
        <el-form-item class="mt-10">
          <el-button type="primary" @click="search" round>搜索</el-button>
          <el-button @click="clearSearch('form')" round>清空</el-button>
        </el-form-item>
      </el-form>
      <router-link class="mt-10" to="/tag/add">
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="path" label="标识"></el-table-column>

      <el-table-column fixed="right" width="100" label="操作">
        <template #default="scope">
          <el-button :icon="Edit" circle @click="toEdit(scope.row)"></el-button>
          <el-button
            :icon="Delete"
            circle
            @click="handleDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" class="mt-20 align-c" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="count"
        v-model:currentPage="cur"
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { search, del } from "@/api/tag.js";

export default {
  name: "tag-index",
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
      tableData: [],
      multipleSelection: [],
      count: 0,
      cur: 1,
      params: {
        keywords: "",
      },
    };
  },
  computed: {},
  created() {
    let { cur = 1, keywords = "" } = this.$route.query;

    this.cur = +cur;
    this.keywords = keywords;

    this.search();
  },
  watch: {
    $route(to, from) {
      if (to.name == "tag-index") {
        let { cur, keywords } = to.query;
        this.cur = +cur;
        this.keywords = keywords;
        this.search();
      }
    },
  },
  methods: {
    //清空搜索
    clearSearch(str) {
      if (str) {
        this.$refs.form.resetFields();
      }
      this.$router.replace({
        name: "tag-index",
        query: { cur: 1, cid: 0, keywords: "" },
      });
      this.search();
    },

    doSearch() {
      this.$router.replace({
        name: "tag-index",
        query: { cur: this.cur, keywords: this.params.keywords },
      });

      this.search();
    },
    //查询
    async search() {
      try {
        let res = await search(this.cur, this.params.keywords);
        if (res.code === 200) {
          this.tableData = [...res.data.list];
          this.count = res.data.count;
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

    //翻页
    handleCurrentChange(e) {
      this.cur = +e;
      this.doSearch();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "tag-edit", params: { id: id } });
    },

    //删除
    async handleDel(e) {
      let id = e.id;
      try {
        let res = await del(id);
        if (res.code == 200) {
          this.$message({
            message: "删除成功 ^_^",
            type: "success",
          });
          this.search();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      } catch (error) {
        console.log(error);
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
