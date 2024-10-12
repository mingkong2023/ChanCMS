<template>
  <div class="content-wrap">
    <div class="mr-10 ml-10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="扩展信息" name="second"></el-tab-pane>
        <el-tab-pane
          label="模型信息"
          name="three"
          v-if="field.length > 0"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <div class="mr-10 ml-10 mb-20">
      <el-form ref="params" :model="params" label-width="90px">
        <div v-show="activeIndex == 0" v-loading="loading">
          <el-row :gutter="20">
            <el-col :sm="24" :md="12">
              <el-form-item label="文章栏目">
                <el-cascader
                  :props="categoryProps"
                  :show-all-levels="false"
                  v-model="categorySelected"
                  :options="category"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item
                label="文章标题"
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: '请输入文章标题',
                    trigger: 'blur',
                  },
                  {
                    min: 1,
                    max: 100,
                    message: '标题不能超过100个字',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="params.title"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="tag标签">
                <el-select-v2
                  v-model="params.tagId"
                  :options="taglist"
                  placeholder="请选择标签"
                  style="width: 240px"
                  multiple
                  filterable
                  remote
                  :remote-method="searchTag"
                />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="内容属性">
                <el-checkbox-group v-model="params.attr" @change="handleAttr">
                  <el-checkbox label="1" value="1">头条</el-checkbox>
                  <el-checkbox label="2" value="2">推荐</el-checkbox>
                  <el-checkbox label="3" value="3">轮播</el-checkbox>
                  <el-checkbox label="4" value="4">热门</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="发布时间">
                <el-date-picker
                  v-model="params.createdAt"
                  :default-value="new Date()"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item class="flex" label="缩略图">
                <el-upload
                  class="avatar-uploader"
                  :http-request="upload"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                >
                  <el-popover
                    placement="top-start"
                    title="上传"
                    :width="200"
                    trigger="hover"
                    content="上传图片作为封面图，大小200k内"
                  >
                    <template #reference>
                      <el-icon class="avatar-uploader-icon">
                        <MostlyCloudy />
                      </el-icon>
                    </template>
                  </el-popover>
                </el-upload>

                <el-popover
                  v-if="params.img"
                  placement="right"
                  :width="400"
                  trigger="hover"
                >
                  <template #reference>
                    <el-image
                      class="avatar-uploader-icon pointer ml-10"
                      :src="params.img"
                    />
                  </template>
                  <el-image style="width: 100%" :src="params.img" />
                </el-popover>

                <el-button type="primary" class="ml-10" @click="drawer = true">
                  默认封面图
                </el-button>

                <el-drawer
                  v-model="drawer"
                  title="默认封面图"
                  class="w-300"
                  :with-header="false"
                >
                  <div class="cover row">
                    <el-image
                      v-for="(item, index) of drawerList"
                      :key="index"
                      :src="item"
                      @click="selectCover(item)"
                      fit="cover"
                    />
                  </div>
                </el-drawer>

                <el-input class="ml-10 flex-1" v-model="params.img"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--
          cname   中文名称 varchar 60
          ename   英文名称 varchar 60
          type
          from表单类型
          1单行文本（varchar）
          2.多行文本
          text 3.下拉菜单
          text 4.单选
          text 5.多选
          6.时间和日期
          default  字段配置 男 女
          values   默认值可选 255
          orderBy     字段顺序
          -->
          <el-form-item label="内容摘要">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="params.description"
            ></el-input>
          </el-form-item>

          <el-form-item label="文章内容">
            <vue3-tinymce
              v-model="params.content"
              :setting="setting"
              @init="tinymce"
              script-src="/public/admin/tinymce/tinymce.min.js"
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :sm="24" :md="12" :lg="8">
              <el-form-item label="自动封面">
                <el-checkbox v-model="autoImg">
                  文章第
                  <el-input
                    v-model="picNum"
                    class="w-80 mr-8 ml-8"
                    placeholder="请输入内容"
                  ></el-input
                  >张图
                </el-checkbox>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
              <el-form-item label="提取描述">
                <el-checkbox v-model="autoDes">提取文章描述</el-checkbox>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
              <el-form-item label="是否显示">
                <el-radio v-model="params.status" value="0">发布</el-radio>
                <el-radio v-model="params.status" value="1">不发布</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div v-show="activeIndex == 1">
          <el-row :gutter="20">
            <el-col :sm="24" :md="12">
              <el-form-item label="短标题" prop="name">
                <el-input v-model="params.shortTitle"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="内容模板">
                <el-select v-model="params.articleView" placeholder="请选择模板">
                    <el-option
                      v-for="item in views"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="来源">
                <el-input v-model="params.source"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="作者">
                <el-input v-model="params.author"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12">
              <el-form-item label="外链跳转">
                <el-input v-model="params.link" max="120"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="浏览数">
                <el-input v-model="params.pv"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div v-show="(activeIndex == 2) & (field.length > 0)">
          <el-row :gutter="20">
            <!--
            cname   中文名称 varchar 60
            ename   英文名称 varchar 60
            type
            from表单类型 1单行文本（varchar）
            2.多行文本
            text 3.下拉菜单
            text 4.单选
            text 5.多选
            6.时间和日期
            values  默认值可选 255
            default   字段配置 男 女
            orderBy     字段顺序
            -->
            <el-col
              v-for="(item, index) of field"
              :key="index"
              :sm="24"
              :md="24"
              :lg="24"
            >
              <!-- 单行文本 -->
              <el-form-item
                :label="item.cname"
                v-if="['1','7'].includes(item.type)"
              >
                <el-input v-model="item.values" max="120"></el-input>
              </el-form-item>

              <!-- 多行文本 -->
              <el-form-item
                :label="item.cname"
                v-else-if="['2','9'].includes(item.type)"
              >
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="item.values"
                ></el-input>
              </el-form-item>

              <!-- 下拉菜单 -->
              <el-form-item
                :label="item.cname"
                v-else-if="['3','4','5'].includes(item.type)"
              >
                <el-select
                  v-model="item.values"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in item.default"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <!-- 时间日期 -->
              <el-form-item   :label="item.cname" v-else-if="item.type === '6'">
                <el-date-picker
                v-model="item.values"
                  :default-value="new Date()"
                  type="datetime"
                  placeholder="请选择"
                >
                </el-date-picker>
              </el-form-item>

              <!-- 多图上传 -->
              <el-form-item
                :label="item.cname"
                class="flex align-c justify-center"
                v-else-if="item.type === '8'"
              >
                <!-- 图片显示 -->
                <div class="cover flex align-center">
                  <div
                    class="pos-r img-item"
                    v-for="(item, index) of item.values"
                  >
                    <el-image :key="index" :src="item.url" fit="cover" />
                    <div class="imgs-btn">
                      <el-icon @click="toPreview(item)"><ZoomIn /></el-icon>
                      <el-icon @click="handleRemove(item)"><Delete /></el-icon>
                    </div>
                  </div>
                </div>
                <!-- 放大 -->
                <el-dialog v-model="dialogVisible">
                  <el-image w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
                <!-- 上传 -->
                <el-upload
                  multiple
                  :http-request="uploadPics"
                  :data="{ ...item, index: index }"
                  :before-upload="beforeUploadPics"
                  :limit="10"
                  :show-file-list="false"
                >
                  <el-icon class="upload-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit('params')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


  <DialogCroper ref="dialogCrop" :img="img" :file="file" @crop="upload"/>
</template>

<script>
import { find } from "@/api/category.js";
import { create, findField, delfile } from "@/api/article.js";
import { search } from "@/api/tag.js";
import { views } from "@/api/sys_config.js";

import Vue3Tinymce from "@/components/Vue3Tinymce/src/Main.vue";
import DialogCroper from "@/components/ChanDialogCrop/DialogCroper.vue"
import { tinymceSet } from "@/config/tinymce.js";
import { upload,uploadUrl } from "@/api/upload.js";
import {
  addLabelValue,
  getImgUrlFromStr,
  filterHtml,
  tree,
  showErrors
} from "@/utils/tool.js";

export default {
  name: "article-add",
  components: {
    Vue3Tinymce,
    DialogCroper
  },
  data: () => {
    return {
      setting: tinymceSet,
      loading: true,
      categorySelected: [], //-1默认选中顶级栏目
      categoryProps: { checkStrictly: true },

      activeName: "first", //tab 默认显示第一个
      activeIndex: "0", //tab 内容默认显示第一个
      category: [], //当前所有栏目
      cateList: [], //所有栏目
      views: [],
      autoImg: false,
      autoDes: false,
      picNum: 1,
      taglist: [],

      file: null,
      img: '',
      params: {
        //接口入参
        cid: 0,
        title: "",
        shortTitle: "",
        tagId: "",
        attr: [],

        articleView:'',

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
      field: [], //字段列表
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      cur: 1,
      keywords: "",
      drawer: false,
      drawerList: [
        "/public/cover/01.jpg",
        "/public/cover/02.jpg",
        "/public/cover/03.jpg",
        "/public/cover/04.jpg",
        "/public/cover/05.jpg",
        "/public/cover/06.jpg",
        "/public/cover/07.jpg",
        "/public/cover/08.jpg",
        "/public/cover/09.jpg",
        "/public/cover/10.jpg",
      ],
    };
  },
  computed: {},
  async mounted() {
    this.setting.images_upload_url = await uploadUrl();
  },
  created() {
    this.query();
    this.searchTag();
    this.getviews();
  },
  unmounted() {},
  methods: {

    //查询模板
    async getviews() {
      try {
        let res = await views();
        if (res.code === 200) {
          this.views = res.data
            .filter((item) => {
              if (item !== "404.html" && item !== "500.html") {
                return true;
              }
            })
            .map((item) => {
              return {
                label: item,
                value: item,
              };
            });
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleClick(tab) {
      this.activeIndex = tab.index;
    },

    setContent(article) {
      this.params.content = article;
    },

    tinymce() {
      this.loading = false;
    },

    selectCover(v) {
      this.params.img = v;
    },

    //查询标签
    async searchTag(keywords) {
      try {
        let res = await search(this.cur, keywords);
        if (res.code === 200 && res.data) {
          let arr = [];
          res.data.list.forEach((item) => {
            arr.push({
              label: item.name,
              value: item.id,
            });
          });
          this.taglist = arr;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //查询
    async query() {
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
      if (e[0] != -1) {
        this.params.cid = e[e.length - 1];
        this.findField(this.params.cid);
      } else {
        this.field = [];
      }
    },

    handleAttr(e) {
      console.log("e-->", e);
    },

    handleSubCid(e) {
      console.log("e-->", e);
    },

    beforeUpload(rawFile) {
      if (rawFile.type.indexOf("image") === -1) {
        this.$message("上传文件只能是图片格式");
        return false;
      }
      this.file = rawFile;
      const reader = new FileReader();
      reader.onload = async (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.img = data;
        this.$refs.dialogCrop.dialogFormVisible = true;
      };
       // 转化为blob
       reader.readAsArrayBuffer(rawFile);
      return false;
    },
    //上传缩略图
    async upload(file = this.file) {
      if (file.size / 1024 / 1024 > 0.2) {
        this.$message("上传图片必须小于200k");
        return false;
      }
      let fd = new FormData();
      //把上传文件的添加到 ForDate对象中
      fd.append("file", file || this.file);
      let res = await upload(fd);
      if (res.code === 200) {
        this.params.img = res.data.path;
      }
    },
    beforeUploadPics(rawFile) {
      if (rawFile.type.indexOf("image") === -1) {
        this.$message("上传文件只能是图片格式");
        return false;
      }
      if (rawFile.size / 1024 / 1024 > 0.2) {
        this.$message("上传图片必须小于200k");
        return false;
      }
    },
    //上传缩略图
    async uploadPics(files) {
      const {
        data: { index },
        file,
      } = files;
      let fd = new FormData();
      fd.append("file", file);
      let res = await upload(fd);
      if (res.code === 200) {
        const { filename, path } = res.data;

        if (Array.isArray(this.field[index].values)) {
          this.field[index].values.push({
            name: filename,
            url: path,
          });
        } else {
          this.field[index].values = [
            {
              name: filename,
              url: path,
            },
          ];
        }
      }
    },

    //预览
    async toPreview(item) {
      this.dialogImageUrl = item.url;
      this.dialogVisible = true;
    },

    //删除
    async handleRemove(items) {
      this.field.forEach((item, index) => {
        if (Array.isArray(item.values)) {
          item.values.forEach((item2, index2) => {
            if (item2.url == items.url) {
              this.delfile(items.url);
              item.values.splice(index2, 1);
            }
          });
        }
      });
    },

    async delfile(url) {
      try {
        let res = await delfile(url);
      } catch (error) {
        console.log(error);
      }
    },
    //查询
    async findField(cid) {
      try {
        let res = await findField(cid);
        if (res.code === 200) {
          res.data.fields.forEach((item) => {
            //单选 多选
            if (
              item.default &&
              item.default.includes("[{") &&
              item.default.includes("options")
            ) {
              let field = item.default;
              let s = JSON.parse(item.default);
              item.default = s.options || [];
            }
            // 图片
            if (item.type == "8") {
              item.values = [];
            }
          });
          this.field = res.data.fields;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //新增
    async create() {
      try {
        let params = { ...this.params };
        params.attr = params.attr.toString();
        params.tagId = params.tagId.toString();

        //判断是否有缩略图
        if (!params.img && this.autoImg) {
          params.img = getImgUrlFromStr(params.content)[0];
        }

        if (!params.description && this.autoDes) {
          params.description = filterHtml(params.content).substr(0, 255);
        }
        //处理模型字段信息
        let fieldParams = {};
        this.field.map((item) => {
          fieldParams[item.ename] =
            typeof item.values == "object"
              ? JSON.stringify(item.values)
              : item.values;
        });

        let res = await create({
          defaultParams: params,
          fieldParams: fieldParams,
        });
        if (res.code == 200) {
          this.$message({
            message: "更新成功^_^",
            type: "success",
          });
          this.$router.go(-1);
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

    submit(formName) {
      this.$refs[formName].validate((valid,invalidFields) => {
        if (valid) {
          if (this.params.cid == 0) {
            this.$message({
              message: "请选择栏目",
              type: "success",
            });
            return;
          }
          this.create();
        } else {
          showErrors(invalidFields);
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
:deep(.tiny-textarea) {
  height: 436px;
}

.cover {
  div {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
}

.w-300 {
  width: 300px !important;
}

:deep(.el-drawer) {
  width: 280px !important;
}
:deep(.el-drawer__body) {
  padding: 0;
}

.imgs-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 30px;
  display: none;
  transition: all 0.3s;
}

.img-item {
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #f2f2f2;
}

.img-item:hover .imgs-btn {
  display: flex;
}

.upload-icon {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
