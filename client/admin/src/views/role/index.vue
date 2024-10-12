<template>
  <div class="pd-20 content-wrap bg-fff">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link to="/role/add">
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" width="100" label="编号"></el-table-column>
      <el-table-column prop="name" width="300" label="名称"></el-table-column>
      <el-table-column prop="value" label="角色"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template #default="scope">{{
          scope.row.status == "1" ? "正常" : "停用"
        }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="150" label="操作">
        <template #default="scope">
          <el-button
            :icon="Edit"
            :disabled="scope.row.id < 4"
            circle
            @click="toEdit(scope.row)"
          ></el-button>
          <el-button
            :icon="Delete"
            :disabled="scope.row.id < 4"
            circle
            @click="handleDel(scope.row)"
          ></el-button>

          <el-tooltip
            v-if="scope.row.id < 4"
            content="系统默认角色，禁止删除"
            effect="light"
            placement="top-start"
          >
            <el-icon class="ml-10 t-4 pointer">
              <QuestionFilled class="c-165dff" />
            </el-icon>
          </el-tooltip>
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
import { list, del } from "@/api/sys_role.js";

export default {
  name: "role-index",
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
      keywords: "",
      tableData: [],
      multipleSelection: [],
      count: 0,
      cur: 1,
    };
  },
  computed: {},
  created() {
    this.list();
  },
  methods: {
    //查询
    async list() {
      try {
        let res = await list(this.cur);
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
      this.cur = e;
      this.list();
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

    //编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "role-edit", params: { id: id } });
    },

    //删除
    async handleDel(e) {
      let id = e.id;
      try {
        let res = await del(id);
        if (res.code === 200) {
          this.$message({
            message: "删除成功 ^_^",
            type: "success",
          });
          this.list();
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
  },
};
</script>
<style scoped></style>
