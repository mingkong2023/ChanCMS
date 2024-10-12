<template>
  <div class="content-wrap">
    <el-form
      ref="params"
      :model="params"
      :rules="paramsRules"
      label-width="84px"
      class
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="params.username" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="params.password"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-radio-group v-model="params.role_id">
          <el-radio :value="item.id" v-for="item in role" :key="item.id">
            {{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio v-model="params.status" value="1">启用</el-radio>
        <el-radio v-model="params.status" value="2">关闭</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('params')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { update, detail } from "@/api/sys_user.js";
import { getCookie, setCookie } from "@/utils/tool";
import { list, del } from "@/api/sys_role.js";
import { userStore } from "@/stores/user";
export default {
  name: "admin-edit",
  data: () => {
    return {
      params: {
        id: "",
        username: "",
        password: "",
        status: "1",
        role_id: 0,
      },
      cur: 1,
      role: [],
      paramsRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "2到20个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "6到20个字符",
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
    await this.list();
    await this.detail();
  },
  methods: {
    //查询
    async list() {
      try {
        let res = await list(this.cur);
        if (res.code === 200) {
          this.role = res.data.list;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 文章详情
    async detail() {
      try {
        let res = await detail(this.params.id);
        if (res.code === 200) {
          let params = res.data;
          params.role_id = parseInt(params.role_id);
          params.status = params.status.toString();
          this.params = params;
        }
      } catch (error) {
        console.error(error);
      }
    },

    //更新
    async update() {
      try {
        delete this.params.name;
        delete this.params.value;
        let res = await update(this.params);
        if (res.code == 200) {
          this.$message({
            message: "更新成功,请重新登录^_^",
            type: "success",
          });
          const userInfo = userStore();
          userInfo.logout();
          location.reload();
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
@/api/sys_user.js
