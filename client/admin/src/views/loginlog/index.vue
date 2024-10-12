<template>
  <div class="pd-20 bg-fff content-wrap">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" width="100" label="编号"></el-table-column>
      <el-table-column prop="username" label="登录用户"></el-table-column>
      <el-table-column prop="ip" label="登录IP"></el-table-column>
      <el-table-column prop="isp" label="网络"></el-table-column>
      <el-table-column prop="country" label="地理位置">
        <template #default="scope">
          {{ scope.row.lat }}
          {{ scope.row.lng }}
        </template>
      </el-table-column>
      <el-table-column prop="country" label="登录地点">
        <template #default="scope">
          {{ scope.row.prov }}
          {{ scope.row.city }}
          {{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="登录日期">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" class="mt-20 align-c" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="count"
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { list, del } from "@/api/login_log.js";

export default {
  name: "loginlog-index",
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
          if (res.data.total > 100) {
            this.handleDel();
          }
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

    //删除
    async handleDel() {
      try {
        let res = await del();
        if (res.code === 200) {
          this.list();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
