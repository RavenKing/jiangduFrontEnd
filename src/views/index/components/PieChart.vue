<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}家 ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['104板块', '198板块', '195板块', '村镇用地', '其他']
        },
        calculable: true,
        series: [
          {
            name: '公司分块占比',
            type: 'pie',
            roseType: 'radius',
            radius: [10, 110],
            center: ['50%', '45%'],
            data: [
              { value: 320, name: '104板块' },
              { value: 240, name: '198板块' },
              { value: 149, name: '195板块' },
              { value: 100, name: '村镇用地' },
              { value: 59, name: '其他' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
