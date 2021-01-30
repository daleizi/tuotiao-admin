<template>
  <div ref="echart" style="width: 100%;height:100%;"></div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      echart: null
    };
  },
  props: {
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      if (this.echart) {
        this.echart.setOption(this.chartData.order);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.chartData.order);
      }
    },
    // 图标自适应
    resizeChart() {
      this.echarts ? this.echart.resize() : "";
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style lang="scss" scoped></style>
