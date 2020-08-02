<template>
  <wl-container>
    <sui-segments horizontal style="margin-top:0">
      <sui-segment>
        <i class="icon iconFl dollar sign"></i>
        <div class="padleft">
          <div class="titleColor">资产数量</div>
          <div class="dataInt">
            {{getroomnu ? getroomnu : 0}}
            </div>
        </div>
      </sui-segment>
      <sui-segment>
        <i class="icon iconFl map outline"></i>
        <div class="padleft">
          <div class="titleColor">资产面积</div>
          <div class="dataInt">
            {{getroomspace ? getroomspace : 0}}
          </div>
        </div>
      </sui-segment>
      <sui-segment>
        <i class="icon iconFl building outline"></i>
        <div class="padleft">
          <div class="titleColor">单位数量</div>
          <div class="dataInt">
            {{getunitnum ? getunitnum : 0}}
          </div>
        </div>
      </sui-segment>
      <sui-segment>
        <i class="icon iconFl rss"></i>
        <div class="padleft">
          <div class="titleColor">维修请求</div>
          <div class="dataInt">{{getmrnum ? getmrnum : 0}}</div>
        </div>
      </sui-segment>
    </sui-segments>
    <div style="width:100%; height:600px;" id="main"></div>
  </wl-container>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons');


import {
    getroomnumApi,
    getroomspaceApi,
    getunitnumApi,
    getmrnumApi,
    // roomusagerate1Api,
    // roomusagerate2Api,
    // loanamtApi,
    // roomspagcerate1Api,
    // roomspagcerate2Api
} from "@/api/roomDataAPI";

export default {
  name: "visualization",
  components: {},
  data() {
    return {
      getroomnu:undefined,
      getroomspace:undefined,
      getunitnum:undefined,
      getmrnum:undefined,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getroomnumApiFn();
    this.getroomspaceApi();
    this.getunitnumApi();
    this.getmrnumApi();
  },
  methods: {

    

    getmrnumApi(){
      var payload={};
      getmrnumApi(payload).then((result) => {
        if (result.data.code == 0) {
          this.getmrnum=result.data.data
        }
      }).catch(() => {});
    },
    getunitnumApi(){
      var payload={};
      getunitnumApi(payload).then((result) => {
        if (result.data.code == 0) {
          this.getunitnum=result.data.data
        }
      }).catch(() => {});
    },
    getroomspaceApi(){
      var payload={};
      getroomspaceApi(payload).then((result) => {
        if (result.data.code == 0) {
          this.getroomspace=result.data.data
        }
      }).catch(() => {});
    },
    getroomnumApiFn(){
      var payload={};
      getroomnumApi(payload).then((result) => {
        if (result.data.code == 0) {
          this.getroomnu=result.data.data
        }
      }).catch(() => {});
    },
    initChart() {
      // var myChart = echarts.init(document.getElementById("main"));
      this.chart = echarts.init(document.getElementById("main"), 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style>
i.iconFl{
  float: left;
  font-size: 38px;
  font-family: Icons;
  width: 60px;
  text-align: center;
}
.titleColor{
  color: #409EFF;
  font-weight: bold;
}
.dataInt{
  color: #2a3f54;
  font-size: 24px;
  font-weight: bold;
}
.padleft{
  padding-left: 70px;
}
</style>
