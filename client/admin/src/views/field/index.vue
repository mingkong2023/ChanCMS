<template>
  <div class="content-wrap">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link
        :to="{
          name: 'field-add',
          query: {
            mid: query.mid,
            table: tableName,
            model: model,
          },
        }"
      >
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="cname" label="中文名称"></el-table-column>
      <el-table-column prop="ename" label="字段名称"></el-table-column>
      <el-table-column prop="orderBy" label="排序"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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

    <el-row type="flex" class="mt-20" justify="space-between">
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
import { list, del } from "@/api/field.js";
import { hasUse } from "@/api/model.js";
export default {
  name: "field-index",
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
      query: {
        mid: "",
      },
      model: "",
      tableName: "",
      multipleSelection: [],
      tableData: [],
      count: 0,
      cur: 1,
      loading: true,
    };
  },
  computed: {},
  created() {
    this.query = this.$route.query;
    this.list();
  },
  update() {},
  methods: {
    //查询
    async list() {
      try {
        let res = await list(this.query.mid, this.cur);
        if (res.code === 200) {
          const data = res.data;
          this.tableData = [...data.list];
          this.model = data.model.model;
          this.tableName = data.model.tableName;
          this.count = data.count;
          this.loading = false;
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

    //跳转到编辑
    toEdit(e) {
      console.log(e);
      // model 创建模型 （添加栏目选择模型）->创建对应的表book（）->增加字段field

      const { id, ename } = e;
      this.$router.push({
        name: "field-edit",
        query: {
          fid: id,
          mid: this.query.mid,
          table: ename,
          model: this.model,
        },
      });
    },
    delSome() {},
    async hasUse(id) {
      return await hasUse(id);
    },
    //删除文章
    async handleDel(e) {
      let { id } = e;
      try {
        let _res = await this.hasUse(this.query.mid);
        if (_res.data.count === 0) {
          let res = await del(id);
          if (res.code === 200) {
            this.$message({
              message: "删除成功 ^_^",
              type: "success",
            });
            this.list();
          }
        } else {
          this.$message({
            message: "当前模型正在使用，字段不能删除 ^_^",
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
