<template>
  <el-dialog v-model="dialogFormVisible" title="图片裁剪" width="50%">
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="" />
      </div>
    </div>
    <div
      class="cut pos-r"
      :style="{
        width: width,
        height: height,
      }"
    >
      <VueCropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :full="option.full"
        :auto-crop="true"
        :auto-crop-width="120"
        :auto-crop-height="120"
        @real-time="realTime"
        @img-load="imgLoad"
        mode="contain"
        @crop-moving="cropMoving"
      ></VueCropper>

      <div class="flex items-start scroper-aside pt-6">
        <el-button class="ml-6 mb-4">
          <el-upload :http-request="uploadImg" :show-file-list="false">
            <el-popover placement="top-start" title="上传">
              <template #reference>
                <el-icon><Upload /></el-icon>
              </template>
            </el-popover>
          </el-upload>
        </el-button>
        <el-button class="ml-6 mb-4" @click="changeScale(1)"
          ><el-icon><Plus /></el-icon
        ></el-button>
        <el-button class="ml-6 mb-4" @click="changeScale(-1)">
          <el-icon><Minus /></el-icon
        ></el-button>
        <el-button class="ml-6 mb-4" @click="refreshCrop">
          <el-icon><Refresh /></el-icon
        ></el-button>
        <el-button class="ml-6 mb-4" @click="rotateLeft">
          <el-icon><RefreshLeft /></el-icon
        ></el-button>
        <el-button class="ml-6 mb-4" @click="rotateRight">
          <el-icon><RefreshRight /></el-icon
        ></el-button>
        <el-button class="ml-6 mb-4" @click="() => (option.img = '')">
          <el-icon><Close /></el-icon
        ></el-button>

        <div class="flex items-center mb-6 pr-10">
          <el-input
            class="ml-6 w-full"
            v-model="width"
            placeholder="Please input"
          />
          <span class="ml-3 mr-3">W</span>
        </div>

        <div class="flex items-center pr-10">
          <el-input
            class="ml-6 w-full"
            v-model="height"
            placeholder="Please input"
          />
          <span class="ml-3 mr-3">H</span>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button class="mr-6" @click="handlerCancel">取消</el-button>
        <el-button type="primary" @click="handlerOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";

export default {
  name: "DialogCropper",
  components: {
    VueCropper,
  },
  props: {
    file: {
      type: Object,
      default: null,
    },
    img: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      dialogFormVisible: false,
      width: "100%",
      height: "350px",
      model: false,
      modelSrc: "",
      crap: false,
      previews: {},
      option: {
        img: this.img,
        size: 0.7,
        full: false,
        outputType: "png",
        centerBox: true,
        max: 99999,
      },
      show: true,
      fixed: false,
      fixedNumber: [75, 34],
    };
  },
  watch: {
    img: {
      handler(val) {
        this.option.img = val;
      },
      immediate: true,
    },
  },

  mounted: function () {},

  methods: {
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },

    // 实时预览函数
    realTime(data) {
      this.previews = data;
      console.log(data);
    },

    uploadImg(data) {
      let file = data.file;
      if (file.type.indexOf("image") === -1) {
        this.$message("上传文件只能是图片格式");
        return false;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
        this.dialogFormVisible = true;
      };
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log(msg);
    },
    cropMoving(data) {
      console.log(data, "截图框当前坐标");
    },
    handlerCancel() {
      this.$emit("crop");
      this.dialogFormVisible = false;
    },
    handlerOk() {
      this.$refs.cropper.getCropBlob((blob) => {
        let file = new File([blob], this.file.name, { type: this.file.type });
        this.$emit("crop", file);
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.ml-6 {
  margin-left: 6px !important;
}
.cut {
  min-width: 100px;
  min-height: 100px;
  margin: 0 auto;
  overflow: auto;
}

.scroper-aside {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  width: 92px;
  height: 100%;
  flex-direction: column;
}

.scroper-main {
  width: 90%;
  height: 100%;
  overflow: auto;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.des {
  line-height: 30px;
}

code.language-html {
  padding: 10px 20px;
  margin: 10px 0px;
  display: block;
  background-color: #333;
  color: #fff;
  overflow-x: auto;
  font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo,
    Lucida, Sans, Type, Writer, Ubuntu, Mono;
  border-radius: 5px;
  white-space: pre;
}

.show-info {
  margin-bottom: 50px;
}

.show-info h2 {
  line-height: 50px;
}

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position:
    0px 0px,
    10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

.c-item {
  display: block;
  user-select: none;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
