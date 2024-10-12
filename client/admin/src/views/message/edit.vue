<template>
  <div class="mr-10 ml-10 mb-20 pd-20 content-wrap">
    <el-form ref="params" :model="params" label-width="84px" class="mt-20">
      <el-form-item label="留言类型" :rules="[{
        required: true,
        message: '请选择类型',
        trigger: 'blur',
      }]" prop="type">
        <el-select v-model="params.type" placeholder="请选择类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="留言标题" :rules="[
      {
        required: true,
        message: '请输入标题',
        trigger: 'blur',
      },
    ]" prop="title">
        <el-input v-model="params.title"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" :rules="[
      {
        required: true,
        message: '请输入内容',
        trigger: 'blur',
      },
    ]">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel" :rules="[
      {
        required: true,
        message: '请输入内容',
        trigger: 'blur',
      },
    ]">
        <el-input v-model="params.tel"></el-input>
      </el-form-item>

      <el-form-item label="公司单位">
        <el-input v-model="params.company"></el-input>
      </el-form-item>

      <el-form-item label="微信">
        <el-input v-model="params.wechat"></el-input>
      </el-form-item>

      <el-form-item label="留言内容" prop="content" :rules="[
      {
        required: true,
        message: '请输入内容',
        trigger: 'blur',
      },
    ]">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="params.content">
        </el-input>
      </el-form-item>

      <el-form-item class="flex">
        <el-button type="primary" @click="submit('params')">保存</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- <h3 class="mb-25 mt-10"># 留言内容</h3>

    <div class="pd-10">
      <p class="f-14 mb-15">
        <span class="bold f-13 w-90 text-r">联系姓名：</span>{{ params.name }}
      </p>
      <p class="f-14 mb-15">
        <span class="bold f-13 w-90 text-r">联系电话：</span>{{ params.tel }}
      </p>
      <p class="f-14 mb-15">
        <span class="bold f-13 w-90 text-r">公司单位：</span
        >{{ params.company }}
      </p>

      <p class="f-14 mb-15">
        <span class="bold f-13 w-90 text-r">留言内容：</span
        >{{ params.content }}
      </p>

      <p class="f-14 mb-15">
        <span class="bold f-13 w-90 text-r">留言时间：</span
        >{{ params.createdAt }}
      </p>

      <el-button class="ml-25 mt-35" type="primary" @click="goBack"
        >返回</el-button
      >
    </div> -->
  </div>
</template>

<script>
import { update, detail } from "@/api/message.js";

export default {
  name: "message-edit",

  data: () => {
    return {
      options: [
        {
          label: "咨询",
          value: "1",
        },
        {
          label: "建议",
          value: "2",
        },
        {
          label: "投诉",
          value: "3",
        },
        {
          label: "其他",
          value: "4",
        }
      ],

      params: {
        id: 0,
      },

      paramsRules: {
        //校验规则
        name: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "名称长度在 2 到 50 个字符之间",
            trigger: "blur",
          },
        ],
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
          this.params = res.data;
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

    goBack() {
      this.$router.go(-1);
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
<style scoped>
.w-90 {
  width: 90px;
  display: inline-block;
}
</style>
