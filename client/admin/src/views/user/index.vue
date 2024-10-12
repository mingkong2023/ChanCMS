<template>
  <div class="pd-20 content-wrap">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link to="/user/add">
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </el-row>

    <div class="mr-10 ml-10">
      <el-row>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" width="100" label="编号"></el-table-column>
          <el-table-column prop="username" label="管理员"></el-table-column>
          <el-table-column prop="value" label="角色"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              {{ scope.row.status == 1 ? "启用" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="发布时间">
            <template #default="scope">{{ scope.row.createdAt }}</template>
          </el-table-column>
          <el-table-column fixed="right" width="200" label="操作">
            <template #default="scope">
              <el-button
                :icon="Edit"
                circle
                @click="toEdit(scope.row)"
              ></el-button>

              <el-popconfirm
                width="220"
                @confirm="handleDel(scope.row)"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="你确定吗？要删管理员？"
              >
                <template #reference>
                  <el-button
                    :icon="Delete"
                    :disabled="username == scope.row.username"
                    circle
                  ></el-button>
                </template>
              </el-popconfirm>
              <el-tooltip
                v-if="username == scope.row.username"
                content="当前登录用户不可删除"
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
        <!-- <div style="margin-top: 20px">
          批量操作：
          <el-button @click="toggleSelection()">删除</el-button>
        </div> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { list, del } from "@/api/sys_user.js";
import { getCookie } from "@/utils/tool";
export default {
  name: "sysUser-index",
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
      username: "",
    };
  },
  computed: {},
  created() {
    this.username = getCookie("username");
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
      this.$router.push({ name: "user-edit", params: { id: id } });
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
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
