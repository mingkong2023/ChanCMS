<template>
  <div class="pd-20 bg-fff content-wrap">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link to="/slide/add">
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
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="imgUrl" label="图片链接">
        <template #default="scope">
          <el-popover
            v-if="scope.row.imgUrl"
            placement="right"
            :width="600"
            trigger="hover"
          >
            <template #reference>
              <el-image
                class="avatar-uploader-icon pointer ml-10"
                :src="scope.row.imgUrl"
              />
            </template>
            <el-image style="width: 100%" :src="scope.row.imgUrl" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl" label="跳转链接"> </el-table-column>

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
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { Delete, Edit, View, Search } from "@element-plus/icons-vue";
import { list, del } from "@/api/slide.js";

export default {
  name: "slide-index",
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
      this.$router.push({ name: "slide-edit", params: { id: id } });
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
