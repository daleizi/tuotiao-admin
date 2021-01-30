<template>
  <div class="home-container">
    <el-button @click="addTab">添加</el-button>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      addable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
      </el-tab-pane>
    </el-tabs>
    <div v-show="editableTabsValue == 1">
      <el-row>
        <el-col :span="12" style="height:400px;">
          <Echart :chartData="chartData"></Echart>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Echart from "@/components/Echart";
export default {
  name: "Home",
  components: {
    Echart
  },
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "echart",
          name: "1"
        },
        {
          title: "统计",
          name: "2",
          closable: true
        }
      ],
      chartData: {
        order: {
          tooltip: {
            // 提示
            show: true,
            trigger: "axis"
          },
          legend: {
            data: ["销量"]
          },
          xAxis: {
            // x轴 文字颜色
            axisLabel: {
              color: "#5470c6"
            },
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              label: {
                // 是否显示数字
                show: true,
                position: "top"
              },
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
      }
    };
  },
  methods: {
    addTab(targetName) {
      let data = {
        title: "统计" + (this.editableTabs.length + 1),
        name: this.editableTabs.length + 1 + "",
        closable: true
      };
      this.editableTabs = [...this.editableTabs, data];
    },
    removeTab(targetName) {
      this.editableTabs = this.editableTabs.filter(v => v.name != targetName);
    }
  }
};
</script>

<style lang="scss" scoped></style>
