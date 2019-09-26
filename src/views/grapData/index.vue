<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">图文数据</template>
      </bread-crumb>
      <!-- 工作图表 -->
      <div class="echarts" ref="workChart"></div>
      <!-- 生活图表 -->
      <div class="echarts" ref="lifeChart"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      workData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  methods: {
    updateData () {
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.7)
      })
    },
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.workData,
          type: 'line'
        }]
      })
    }
  },
  watch: {
    workData (newValue) {
      this.setWorkOption()
    }
  },
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  mounted () {
    //   图表的初始化
    this.workChart = echarts.init(this.$refs.workChart)
    this.setWorkOption()
  }
}
</script>

<style>
.echarts{
    width: 600px;
    height: 400px;
}
</style>
