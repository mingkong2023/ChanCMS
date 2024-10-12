<template>
  <div class="content-wrap">
    <el-row type="flex" class="mt-10 mb-10" justify="end">
      <router-link to="/collect/add">
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
      <el-table-column prop="id" width="60" label="编号"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"> </el-table-column>
      <el-table-column prop="category" label="所属栏目"> </el-table-column>
      <el-table-column prop="charset" label="编码">
        <template #default="scope">{{
          scope.row.charset == 1 ? "UTF-8" : "GB2312"
        }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">{{
          scope.row.status == 1 ? "草稿" : "发布"
        }}</template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="发布时间">
        <template #default="scope">{{ scope.row.updatedAt }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="222" label="操作">
        <template #default="scope">
          <el-button :icon="Edit" circle @click="toEdit(scope.row)"></el-button>

          <el-button
            :icon="Delete"
            circle
            @click="handleDel(scope.row)"
          ></el-button>

          <el-button type="primary" round :icon="Cpu" @click="toRun(scope.row)"
            >执行</el-button
          >
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
import { Delete, Edit, View, Search, Cpu } from "@element-plus/icons-vue";
import { list, del, getArticle } from "@/api/collect.js";
import { create } from "@/api/article.js";
import { filterHtml } from "@/utils/tool.js";

export default {
  name: "collect-index",
  setup() {
    return {
      Edit,
      Delete,
      View,
      Search,
      Cpu,
    };
  },
  data: () => {
    return {
      keywords: "",
      tableData: [],
      multipleSelection: [],
      count: 0,
      cur: 1,
      step: 0,
      params: {
        //接口入参
        cid: 0,
        title: "",
        shortTitle: "",
        tagId: "",
        attr: [],
     
        source: "",
        author: "",
        description: "",
        img: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        content: "欢迎使用ChanCMS系统",
        status: "0",
        pv: 1,
        link: "",
      },
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

    async toRun(params) {
      try {
        let {
          pages,
          titleTag,
          articleTag,
          parseData,
          charset,
          cid,
          status,
        } = params;
        pages = pages.split(",");

        let res = await getArticle({
          taskUrl: pages[this.step],
          titleTag,
          articleTag,
          parseData,
          charset,
        });
        if (res.code == 200) {
          this.article = res.data;
          const { title, article } = res.data;
          this.params.title = title;
          this.params.content = article;
          this.params.cid = cid;
          this.params.status = status == 1 ? 1 : 0;
          this.create(params);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //新增
    async create(scope) {
      try {
        let params = { ...this.params };
        params.attr = params.attr.toString();
        params.tagId = params.tagId.toString();
        console.log(params);
        //提取255字符作为文章描述
        if (!params.description && params.content) {
          params.description = filterHtml(params.content).substr(0, 255);
        }
        let res = await create({
          defaultParams: params,
          fieldParams: {},
        });

        if (res.code == 200) {
          this.$message({
            message: `第一${this.step + 1}条数据完成^_^`,
            type: "success",
          });

          setTimeout(() => {
            let { pages } = scope;
            pages = pages.split(",");
            console.log(pages.length, this.step);
            if (this.step <= pages.length - 1) {
              this.toRun(scope);
              this.step = this.step + 1;
            }
          }, 3000);
        } else {
          this.$message({
            message: res.msg || `第一${this.step + 1}条数据失败^_^`,
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "collect-edit", params: { id: id } });
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
