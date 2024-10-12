<template>
  <div class="pd-20 content-wrap">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link to="/model/add">
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="id"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" width="60" label="编号"></el-table-column>
      <el-table-column prop="model" label="模型名称"></el-table-column>
      <el-table-column prop="tableName" label="模型对应的表"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">{{
          scope.row.status == 1 ? "启用" : "禁用"
        }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="150" label="操作">
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

    <!-- 分页 -->
    <el-row type="flex" class="mt-20 align-c" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="count"
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { list, hasUse, del } from "@/api/model.js";
export default {
  name: "model-index",
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
      multipleSelection: [],
      tableData: [],
      count: 0,
      cur: 1,
      loading: true,
    };
  },
  computed: {},
  created() {
    this.list();
  },
  update() {},
  methods: {
    //查询
    async list() {
      try {
        let res = await list(this.cur);
        if (res.code == 200) {
          this.tableData = [...res.data.list];
          this.count = res.data.count;
          this.loading = false;
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

    //翻页
    handleCurrentChange(e) {
      this.cur = Number(e);
      sessionStorage.setItem("cur", Number(e));
      this.list();
    },

    async hasUse(id) {
      return await hasUse(id);
    },

    //跳转到编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "model-edit", params: { id: id } });
    },

    // 查看字段
    handleClick(e) {
      const { id } = e;
      this.$router.push({ name: "field-index", query: { mid: id } });
    },

    //删除文章
    async handleDel(e) {
      const { id, table } = e;
      try {
        let res = await this.hasUse(id);
        if (res.code == 200) {
          if (res.data.count == 0) {
            let res = await del(id, table);
            if (res.code === 200) {
              this.$message({
                message: "删除成功 ^_^",
                type: "error",
              });
              this.list();
            } else {
              this.$message({
                message: res.msg,
                type: "success",
              });
            }
          } else {
            this.$message({
              message: "当前模型已经使用，不能删除！",
              type: "error",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 200px !important;
}
</style>
