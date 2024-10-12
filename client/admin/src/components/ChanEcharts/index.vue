<template>
  <div class="echarts">
    <div ref="myEcharts" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ChanEcharts',
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      myEcharts: null,
      resizeObserver: null
    }
  },
  mounted () {
    this.initEcharts()
    this.addResizeListener()
  },
  methods: {
    initEcharts () {
      this.myEcharts = echarts.init(this.$refs.myEcharts)
      this.myEcharts.setOption(this.option)
    },
    addResizeListener () {
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.myEcharts.resize()
        })
      })
      this.resizeObserver.observe(this.$refs.myEcharts)
    }
  },
  watch: {
    option: {
      handler (val) {
        this.myEcharts.setOption(val)
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.myEcharts.dispose()
    this.resizeObserver.disconnect()
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}

.echarts :deep( div div) {
  margin: 0 auto !important;
}
</style>