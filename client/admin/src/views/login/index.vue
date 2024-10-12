<template>
  <div class="page">
    <div class="login">
      <h1 class="title flex align-c">
        <IconLogo class="icon"></IconLogo>
        ChanCMS后台管理系统
      </h1>
      <div class="login-cont">
        <el-form
          class="mt-20"
          ref="loginForm"
          :model="loginForm"
          label-width="70px"
          @keyup.enter="login"
        >
          <el-form-item
            label="用户名"
            prop="username"
            :rules="[
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
              },
            ]"
          >
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <footer class="login-footer overflow-h">
      <p class="f-13 text-c mt-10 c-fff">
        Copyright &copy; 2016-2024
        <a
          href="https://www.chancms.top"
          class="mr-5 c-fff"
          target="_blank"
          title="chanyue"
          >ChanCMS</a
        >
        ● 位于南京 服务全国
      </p>
    </footer>

    <Vcode :imgs="imgs" :show="isShow" @success="onSuccess" @fail="onFail" />
  </div>
</template>

<script>
import Vcode from "vue3-puzzle-vcode";
import { defineComponent } from "vue";
import { userStore } from "@/stores/user";
import { setCookie } from "@/utils/tool.js";
import IconLogo from "@/components/icons/IconLogo.vue";
import { create ,getIp,del} from "@/api/login_log.js";
export default defineComponent({
  components: { IconLogo, Vcode },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      isShow: false,
      position:{
        ip: '',
        country: '',
        prov:"",
        city: '',
        district: '',
        isp:'',
        lat:'',
        lng:''
      },
      imgs: [
        "/public/cover/sea/01.png",
        "/public/cover/sea/02.png",
        "/public/cover/sea/03.png",
        "/public/cover/sea/04.png",
        "/public/cover/sea/05.png",
        "/public/cover/sea/06.png",
        "/public/cover/sea/07.png",
      ],
    };
  },
  created() {
    this.getIp()
  },
  methods: {
    onSuccess() {
      this.toLogin();
    },
    onFail(e) {
      console.log(e);
    },

    async getIp() {
     try {
      let res = await getIp();
      if(res.code == 'Success'){
        const {country,prov,district,city,isp,lat,lng} = res.data;
        this.position = {
          ip: res.ip || 'localhost',
          country,
          prov,
          city,
          district,
          isp,
          lat,
          lng
        }
      }
     } catch (error) {
        console.log(error)
     }
    },

    //登录日志
    async login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.isShow = true;
        } else {
          return false;
        }
      });
    },

    toLogin() {
      const users = userStore();
      // 登录逻辑 当需要返回用await 不需要返回值，可以用then
      const { username, password } = this.loginForm;
      users.login({ username, password }).then(async (res) => {
        if (res.code == 201) {
          // eslint-disable-next-line no-undef
          ElNotification({
            title: "提示",
            message: "登录失败",
            type: "error",
          });
          this.isShow = false;
          return false;
        }
        //清理超过100条登录日志
        await del();
        //添加登录日志
        await create(this.position);
        // eslint-disable-next-line no-undef
        ElNotification({
          title: "提示",
          message: "登录成功",
          duration: 800,
          type: "success",
        });

        setCookie("username", username);
        this.$router.push({
          path: this.$route.query.redirect || "/",
        });
      });
    },
  },
});
</script>
<style lang="less" scoped>
.page {
  background-image: linear-gradient(300deg, #778cca, #65de83);
  min-height: 100vh;
}

.icon {
  width: 42px;
  height: 42px;
  background: #f6f6f6;
  border-radius: 50%;
  padding: 4px;
  margin-right: 5px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 50px);
  .title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
    font-weight: lighter;
    font-family: "chanyue";
  }
  .login-cont {
    width: 410px;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    margin: 20px;
  }
}
.login-phone {
  display: flex;
}

.captcha {
  height: 32px;
  width: 100px;
  svg {
    width: 100%;
  }
}

// .login-wrap {
//   min-height: 540px;
// }

.login-footer {
  height: 50px;
}

.pointer {
  cursor: pointer;
}
.mt-20 {
  margin-top: 20px;
}
</style>
