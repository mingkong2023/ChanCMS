<template>
  <div class="content-wrap">
    <!-- 搜索区域 -->
    <div
      class="search flex justify-between align-c pt-10 pl-20 pr-20 pb-20 mb-20"
    >
      <el-form :inline="true" :model="params" ref="form">
        <el-form-item class="mt-10" label="栏目筛选" prop="categorySelected">
          <el-cascader
            class="w-auto ml-5"
            :show-all-levels="false"
            v-model="params.categorySelected"
            :options="category"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item class="mt-10" label="标题" prop="keywords">
          <el-input
            class="mr-10 w-auto"
            placeholder="请输入文章标题"
            :suffix-icon="Search"
            v-model="params.keywords"
            clearable
            @clear="clearSearch"
          ></el-input>
        </el-form-item>
        <el-form-item class="mt-10">
          <el-button type="primary" @click="doSearch" round>搜索</el-button>
          <el-button @click="clearSearch('form')" round>清空</el-button>
        </el-form-item>
      </el-form>

      <router-link class="mt-10" to="/article/add">
        <el-button type="primary" round>新增</el-button>
      </router-link>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      row-key="id"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="120"
        fixed
      ></el-table-column>
      <el-table-column prop="title" label="标题">
        <template #default="scope">
          <a
            class="block"
            v-if="scope.row.status === 0"
            :href="
              scope.row.type == '0'
                ? `${domain}/article-${scope.row.id}.html`
                : `${domain}${scope.row.path}/page-${scope.row.id}.html`
            "
            target="_blank"
          >
            {{ scope.row.title }}
          </a>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="attr" label="属性">
        <template #default="scope">
          <p v-if="scope.row.attr.includes('1')">头条</p>
          <p v-if="scope.row.attr.includes('2')">推荐</p>
        </template>
      </el-table-column> -->
      <el-table-column prop="name" label="栏目" width="80"></el-table-column>
      <!-- <el-table-column prop="pv" label="浏览次数"></el-table-column> -->
      <el-table-column
        prop="createdAt"
        label="更新时间"
        width="170"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="60">
        <template #default="scope">{{
          scope.row.status == 0 ? "显示" : "隐藏"
        }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            :icon="View"
            circle
            @click="handleClick(scope.row)"
          ></el-button>
          <el-button :icon="Edit" circle @click="toEdit(scope.row)"></el-button>
          <el-button :icon="Delete" circle @click="handleDel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" class="mt-20" justify="space-between">
      <div style="margin-top: 20px">
        批量操作：

        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="此操作将永久删除, 是否继续?"
          @confirm="delSome"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button>删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="count"
        v-model:currentPage="cur"
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import {
  Delete,
  Edit,
  View,
  Search,
  InfoFilled,
} from "@element-plus/icons-vue";
import { search, del } from "@/api/article.js";
import { find } from "@/api/category.js";
import { addLabelValue, tree } from "@/utils/tool.js";
export default {
  name: "article-index",
  setup() {
    return {
      Edit,
      Delete,
      View,
      Search,
      InfoFilled,
    };
  },
  data: () => {
    return {
      domain: location.origin,
      keywords: "",
      cid: 0,
      cur: 1,
      category: [], //当前所有栏目
      tableData: [],
      multipleSelection: [],
      count: 0,
      loading: true,
      params: {
        keywords: "",
        categorySelected: [],
      },
    };
  },
  computed: {},
  created() {},

  mounted() {
    let { cur = 1, cid = 0, keywords = "" } = this.$route.query;
    this.cur = parseInt(cur);
    this.cid = parseInt(cid);
    this.params = {
      categorySelected: this.cid,
      keywords: keywords,
    };
    this.queryCategory();
    this.search();
  },

  methods: {
    //清空搜索
    clearSearch(str) {
      //清空表单
      if (str) {
        this.$refs.form.resetFields();
      }
      //清空路由
      this.$router.replace({
        name: "article-index",
        query: { cur: 1, cid: 0, keywords: "" },
      });
      //清空参数
      this.cur = 1;
      this.params.keywords = "";
      this.cid = 0;
      this.search();
    },

    doSearch() {
      this.$router.replace({
        name: "article-index",
        query: { cur: this.cur, cid: this.cid, keywords: this.params.keywords },
      });
      this.search();
    },

    //查询
    async search() {
      try {
        let res = await search(this.cur, this.params.keywords, this.cid);
        if (res.code === 200) {
          this.tableData = [...res.data.list];
          this.count = res.data.count;
          this.cur = res.data.current;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //翻页
    handleCurrentChange(e) {
      this.loading = true;
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

    //查询
    async queryCategory() {
      try {
        let res = await find();
        if (res.code === 200) {
          let dataTree = addLabelValue(tree(res.data));
          let data = addLabelValue(res.data);
          this.cateList = data;
          this.category = [...dataTree];
        }
      } catch (error) {
        console.log(error);
      }
    },

    //选择栏目
    handleChange(e) {
      this.cid = e[e.length - 1];
    },

    //跳转到编辑
    toEdit(e) {
      let id = e.id;
      this.$router.push({ name: "article-edit", params: { id: id } });
    },

    cancelEvent() {},

    async delSome() {
      let ids = this.multipleSelection.map((item) => {
        return item.id;
      });
      let res = await del(ids.join(","));
      if (res.code === 200) {
        this.$message({
          message: "删除成功 ^_^",
          type: "success",
        });
        this.search();
      }
    },

    handleClick(e) {
      let url =
        e.type == "0"
          ? `${location.origin}article-${e.id}.html`
          : `${location.origin}${e.path}/page-${e.id}.html`;
      window.open(url);
    },

    //删除文章
    async handleDel(e) {
      ElMessageBox.confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let id = e.id;
          try {
            let res = await del(id);
            if (res.code === 200) {
              this.$message({
                message: "文章删除成功 ^_^",
                type: "success",
              });
              this.search();
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  onBeforeUnmount() {},
};
</script>
<style scoped>
:deep(.el-form-item) {
  margin-bottom: 0px;
}

:deep(a) {
  color: #1f1f1f;
}

:deep(a:hover) {
  color: #165dff;
}
</style>
