<template>
  <div>
    <div ref="echart" id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      echart: null,
      axisOption: {},
      normalOption: {}
    };
  },
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          xData: [],
          series: []
        };
      }
    },
    isAxisChart: {
      // 有没有坐标轴
      type: Boolean,
      default: true
    }
  },
  computed: {
    option() {
      // 判断是否 有y坐标轴
      return this.isAxisChart ? this.axisOption : this.normalOption;
    }
  },
  // mounted() {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(this.$refs.echart);

  //   // 指定图表的配置项和数据
  //   var option = {
  //     title: {
  //       text: "ECharts"
  //     },
  //     tooltip: {},
  //     legend: {
  //       data: this.legend
  //     },
  //     xAxis: {
  //       data: this.xAxis
  //     },
  //     yAxis: { type: "value" },
  //     series: [
  //       {
  //         name: this.legend[0],
  //         type: "line",
  //         label: {
  //           show: true,
  //           position: "top"
  //         },
  //         smooth: true,
  //         data: this.series
  //       }
  //     ]
  //   };

  //   // 使用刚指定的配置项和数据显示图表。
  //   myChart.setOption(option);
  // },
  methods: {
    initChart() {
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.option);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
