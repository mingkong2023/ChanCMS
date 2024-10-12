<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form ref="params" :model="params" label-width="84px" class="mt-20">
      <el-form-item
        label="轮播标题"
        :rules="[
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ]"
        prop="title"
      >
        <el-input v-model="params.title"></el-input>
      </el-form-item>

      <el-form-item class="flex" label="轮播图">
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
          v-if="params.imgUrl"
          placement="right"
          :width="600"
          trigger="hover"
        >
          <template #reference>
            <el-image
              class="avatar-uploader-icon pointer ml-10"
              :src="params.imgUrl"
            />
          </template>
          <el-image style="width: 100%" :src="params.imgUrl" />
        </el-popover>

        <el-input class="ml-10 flex-1" v-model="params.imgUrl"></el-input>
      </el-form-item>

      <el-form-item label="轮播链接">
        <el-input v-model="params.linkUrl"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, detail } from "@/api/slide.js";
import { upload } from "@/api/upload.js";
export default {
  name: "slide-edit",

  data: () => {
    return {
      params: {
        id: 0,
        title: "",
        imgUrl: "",
        linkUrl: "",
      },
    };
  },
  computed: {},
  mounted() {},
  async created() {
    this.params.id = this.$route.params.id;
    await this.detail();
  },
  methods: {
    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          const { id, title, imgUrl, linkUrl } = res.data;
          this.params = { id, title, imgUrl, linkUrl };
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      } catch (error) {
        console.error(error);
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
      if (rawFile.size / 1024 / 1024 > 0.2) {
        this.$message("上传图片必须小于200k");
        return false;
      }
    },
    //上传缩略图
    async upload(file) {
      let fd = new FormData();
      //把上传文件的添加到 ForDate对象中
      fd.append("file", file.file);
      let res = await upload(fd);
      if (res.code === 200) {
        this.params.imgUrl = res.data.path;
      }
    },

    //更新
    async update() {
      try {
        let res = await update(this.params);
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.update();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style></style>
