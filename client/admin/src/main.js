import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import App from "./App.vue";
import router from "./router";
//加载element-ui框架
import installElementPlus from "@/plugins/element";
//轻量原子类样式库
import "saduocss/src/all.css";
import "./assets/css/main.css";
const app = createApp(App);
// store持久化，缓存到session中
const store = createPinia();
store.use(piniaPluginPersist);
app.use(store);
app.use(router);
app.use(installElementPlus);
app.mount("#app");
