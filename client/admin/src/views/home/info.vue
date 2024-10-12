<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
      <div class="bg-fff pd-20 radius-6 flex justify-around mb-20">
        <router-link class="c-1d2129" to="/article">
          <div class="flex flex-col align-c">
            <div class="tj-img">
              <img src="@/assets/img/ico-article.svg" />
            </div>
            <p class="f-12 text-c mt-5">文章内容</p>
            <p class="f-20 text-c">
              {{ data.article }} <sub class="pos-r t-0 f-12">篇</sub>
            </p>
          </div>
        </router-link>

        <router-link class="c-1d2129" to="/tag">
          <div class="flex flex-col align-c">
            <div class="tj-img">
              <img src="@/assets/img/ico-will.svg" />
            </div>
            <p class="f-12 text-c mt-5">文章标签</p>
            <p class="f-20 text-c">
              {{ data.tag }} <sub class="pos-r t-0 f-12">个</sub>
            </p>
          </div>
        </router-link>

        <router-link class="c-1d2129" to="/message">
          <div>
            <div class="tj-img">
              <img src="@/assets/img/ico-message.svg" />
            </div>
            <p class="f-12 text-c mt-5">留言信息</p>
            <p class="f-20 text-c">
              {{ data.message }} <sub class="pos-r t-0 f-12">条</sub>
            </p>
          </div>
        </router-link>
        <div>
          <div class="tj-img">
            <img src="@/assets/img/ico-up.svg" />
          </div>
          <p class="f-12 text-c mt-5">七日更新</p>
          <p class="f-20 text-c">
            {{ data.week }} <sub class="pos-r t-0 f-12">条</sub>
          </p>
        </div>
      </div>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="bg-fff pt-20 radius-6 w-full h-230">
            <ChanEcharts :option="option" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="bg-fff pd-20 radius-6 mb-20">
            <div class="mb-12 f-16 c-000 fw-500">系统特色</div>
            <p class="f-15 c-4e5969 mb-16">
              ChanCMS基于Node、Express、MySQL、Vue3研发的高质量实用型CMS系统。轻量、灵活、易用、安全。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">自研</strong
              >自研chanjs轻量级mvc框架实现，长久可持续。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">模块</strong>支持模块化、插件化、扩展模型、前后端分离架构。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">API</strong> 支持wap、微信小程序、app等多端提供接口支持。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">SEO</strong
              >专注于seo，灵活设置路由、关键词和描述。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">安全</strong
              >基于knex防注入，接口权限校验，为安全提供保障。
            </p>
            <p class="f-13 mb-7 c-4e5969">
              <strong class="mr-10">灵活</strong
              >碎片功能，是全局变量，灵活配置使用。
            </p>
            
          </div>
        </el-col>
      </el-row>
    </el-col>

    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="bg-fff pd-20 radius-6 mb-20">
        <div class="mb-12 f-16 c-000 bold">技术架构</div>
        <p class="f-13 mb-6 c-4e5969">
          <span class="c-333">服务架构：</span>nodejs express mysql
        </p>
        <p class="f-13 mb-6"><span>前端架构：</span>vite vue3 element-plus</p>
        <p class="f-13 mb-6"><span>程序路径：</span>{{ dirname }}</p>
        <p class="f-13 mb-6"><span>程序版本：</span>{{ data.version }}</p>
        <p class="f-13 mb-6"><span>发布时间：</span>{{ data.versionTime }}</p>
        <p class="f-13 mb-6"><span>技术开发：</span>{{ data.author }}</p>
        <p class="f-13 mb-6 row"><span>联系微信：</span>yanyutao2014</p>
        <p class="f-13 mb-6 row"><span>联系邮箱：</span>867528315@qq.com</p>
      </div>

      <div class="bg-fff pd-20 radius-6 mb-20">
        <div class="mb-12 f-16 c-1d2129 bold">技术服务</div>
        <p class="f-13 mb-6 c-4e5969 flex-wrap flex justify-around">
          <span class="c-1d2129 col-12 mb-10">企业建站</span>
          <span class="c-1d2129 col-12 mb-10">模板开发</span>
          <span class="c-1d2129 col-12 mb-10">模板仿站</span>
          <span class="c-1d2129 col-12 mb-10">模板定制</span>
          <span class="c-1d2129 col-12">小程序开发</span>
          <span class="c-1d2129 col-12">前端开发</span>
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { tongji } from "@/api/article.js";
import { runEnv } from "@/api/site.js";
import ChanEcharts from "@/components/ChanEcharts/index.vue";
import { setCookie } from "@/utils/tool";

export default {
  name: "home-info",
  components: {
    ChanEcharts,
  },
  data: () => {
    return {
      data: {
        week: 0,
        message: 0,
        tag: 0,
        article: 0,
        version: "",
        appName: "ChanCMS",
        port: "",
        versionTime: "",
        author: "",
      },
      dirname: "",
      loading: true,
      chartData: {},

      option: {
        title: {
          text: "ChanCMS架构",
          left: "20",
          textStyle: { // 这里是文本样式的配置
            fontSize: 16, // 字体大小
            fontWeight: "normal", // 字体粗细
            color: "#000" // 字体颜色
          }
        },
        tooltip: {
          trigger: "item",
          borderWidth: 0,
          backgroundColor: "#fff",
          textStyle: {
            color: "#000",
          },
        },
        legend: {
          orient:"vertical",
          right: "20",
          icon: "circle",
          top: 'middle', 
        },
        toolbox: {
          x: "right",
          y: "bottom",
        },
        series: [
          {
            name: "技术占比",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            color: [
              "#FADC19",
              "#9FDB1D",
              "#00B42A",
              "#3491FA",
              "#165DFF",
              "#722ED1",
            ],
            itemStyle: {
              borderRadius: 10,
              borderWidth: 0,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 10,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 40, name: "nodejs" },
              { value: 10, name: "mysql" },
              { value: 40, name: "vue3" },
              { value: 90, name: "javascript" },
              { value: 10, name: "css3" },
              { value: 10, name: "html5" },
            ],
          },
        ],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.tongji();
    this.runEnv();
  },

  methods: {
    async tongji() {
      try {
        let res = await tongji();
        if (res.code === 200) {
          this.data = res.data;
          this.loading = false;
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

    async runEnv() {
      try {
        let res = await runEnv();
        const { code, data } = res;
        if (code === 200) {
          this.dirname = data.dirname;
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
<style scoped>

.h-230{
  height: 310px;
}

.radius-6 {
  border-radius: 6px;
}

.c-9ca4bf {
  color: #9ca4bf;
}

.chanyue-title,
.chanyue-author,
.chanyue-txt {
  font-family: "chanyue";
}

.tj-img {
  width: 54px;
  height: 54px;
  background-color: #f2f3f5;
  border-radius: 50%;
}

.chart {
  max-width: calc(50vw - 45px);
  height: 300px;
}

@media only screen and (max-width: 992px) {
  .chart {
    max-width: calc(100vw - 45px);
    height: 300px;
  }
}
</style>
