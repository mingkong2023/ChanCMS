<template>
  <h1 class="logo">
    <IconLogo class="icon mr-5"></IconLogo>
    <span class="f-20" v-show="!flag">ChanCMS</span>
  </h1>
</template>

<script name="Logo">
import { defineComponent } from "vue";
import IconLogo from "@/components/icons/IconLogo.vue";
export default defineComponent({
  components: { IconLogo },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isCollapse(v, o) {
      this.flag = v;
    },
  },
  data() {
    return {
      flag: false,
    };
  },
  created() {},
  methods: {},
});
</script>

<style scoped>
.icon {
  width: 32px;
  height: 32px;
}
.logo {
  padding: 9px;
  font-size: 20px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: width 0.3s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 10px;
}
</style>
