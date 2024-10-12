import { ElMessage } from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { userStore } from "@/stores/user.js";
export default {
  install: (app, options) => {
    app.config.globalProperties.$message = ElMessage;
    //注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    //定义指令
    app.directive("permission", {
      mounted(el, binding, vnode) {
        // 获取用户角色
        const {
          userInfo: { role },
        } = userStore();
        // 获取指令的参数，即需要的权限
        const permission = binding.value;
        // 判断用户是否拥有该权限
        if (role !== permission) {
          // 如果用户没有该权限，从 DOM 中移除该元素
          el.parentNode.removeChild(el);
        }
      },
    });

    // 定义组件
    // app.component('my-banner', MyBanner);
    //定义插件
    //app.directive("font-size", (el, binding, vnode) => {})
    // 提供全局是方法
    // const clickMe = () => {
    //     console.log("==========clickMe=========")
    // }
    // app.provide('clickMe', clickMe);

    // 使用 import {inject} from "vue";

    // export default {
    //     name: "MyBanner",
    //     mounted() {
    //         const clickMe = inject('clickMe');
    //         clickMe();
    //     }
    // }
  },
};
