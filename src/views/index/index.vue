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

    <sui-segments style="padding:20px;" horizontal>
        <div class="w20bf" id="roomusagerate1"></div>
        <div class="w20bf" id="roomusagerate2"></div>
        <div class="w20bf" id="loanamt"></div>
        <div class="w20bf" id="roomspagcerate1"></div>
        <div class="w20bf" id="roomspagcerate2"></div>
    </sui-segments>
    <div style="padding-bottom:10px;">
        <sui-segments>
            <todo-list />
        </sui-segments>
    </div>
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
    roomusagerate1Api,
    roomusagerate2Api,
    loanamtApi,
    roomspagcerate1Api,
    roomspagcerate2Api
} from "@/api/roomDataAPI";

export default {
    name: "visualization",
    data() {
        return {
            getroomnu: undefined,
            getroomspace: undefined,
            getunitnum: undefined,
            getmrnum: undefined,
            roomusagerate1: undefined,
            roomusagerate2: undefined,
            loanamt: undefined,
            roomspagcerate1: undefined,
            roomspagcerate2: undefined
        };
    },
    mounted() {

        this.getroomnumApiFn();
        this.getroomspaceApi();
        this.getunitnumApi();
        this.getmrnumApi();
        this.roomusagerate1Api();
        this.roomusagerate2Api();
        this.loanamtApi();
        this.roomspagcerate1Api();
        this.roomspagcerate2Api();
    },
    methods: {

        roomusagerate1Api() { //办公使用率 资产空置率
            var payload = {};
            roomusagerate1Api(payload).then((result) => {
                if (result.data.code == 0) {
                    this.roomusagerate1 = result.data.data
                    var listTitle = ['使用面积', '空置面积'];
                    var listData = [{
                            value: this.roomusagerate1['assigned'],
                            name: '使用面积'
                        },
                        {
                            value: this.roomusagerate1['all'] - this.roomusagerate1['assigned'],
                            name: '空置面积'
                        }
                    ]
                    var listInfo = {
                        title: listTitle,
                        list: listData,
                        color: ['#008acd', '#bbbbbb']
                    }
                    this.initChart("roomusagerate1", listInfo, "资产空置率")
                }
            }).catch(() => {});
        },
        roomusagerate2Api() { //经营使用率 出租房空置率
            var payload = {};
            roomusagerate2Api(payload).then((result) => {
                if (result.data.code == 0) {
                    this.roomusagerate2 = result.data.data
                    var listTitle = ['使用面积', '空置面积'];
                    var listData = [{
                            value: this.roomusagerate2['assigned'],
                            name: '使用面积'
                        },
                        {
                            value: this.roomusagerate2['all'] - this.roomusagerate2['assigned'],
                            name: '空置面积'
                        }
                    ]
                    var listInfo = {
                        title: listTitle,
                        list: listData,
                        color: ['#008acd', '#bbbbbb']
                    }
                    this.initChart("roomusagerate2", listInfo, "出租房空置率")
                }
            }).catch(() => {});
        },
        loanamtApi() { //出租/租金 总额  收入/支出
            var payload = {};
            loanamtApi(payload).then((result) => {
                if (result.data.code == 0) {
                    this.loanamt = result.data.data
                    var listTitle = ['租赁金额', '出租金额'];
                    var listData = [{
                            value: this.loanamt['loan_amt'],
                            name: '租赁金额'
                        },
                        {
                            value: this.loanamt['rent_amt'],
                            name: '出租金额'
                        }
                    ]
                    var listInfo = {
                        title: listTitle,
                        list: listData,
                        color: ['#008acd', '#bbbbbb']
                    }
                    this.initChart("loanamt", listInfo, "收入支出占比")
                }
            }).catch(() => {});
        },
        roomspagcerate1Api() { //土地面积（有证/无证） 有证/全部 数量 
            var payload = {};
            roomspagcerate1Api(payload).then((result) => {
                if (result.data.code == 0) {
                    this.roomspagcerate1 = result.data.data
                    var listTitle = ['有证土地', '无证土地'];
                    var listData = [{
                            value: this.roomspagcerate1['youzheng'],
                            name: '有证土地'
                        },
                        {
                            value: this.roomspagcerate1['all'] - this.roomspagcerate1['youzheng'],
                            name: '无证土地'
                        }
                    ]
                    var listInfo = {
                        title: listTitle,
                        list: listData,
                        color: ['#008acd', '#bbbbbb']
                    }
                    this.initChart("roomspagcerate1", listInfo, "土地面积（有证/无证）")
                }
            }).catch(() => {});
        },
        roomspagcerate2Api() { //建筑面积（有证/无证） 有证/全部 数量
            var payload = {};
            roomspagcerate2Api(payload).then((result) => {
                if (result.data.code == 0) {
                    this.roomspagcerate2 = result.data.data;
                    var listTitle = ['有证建筑', '无证建筑'];
                    var listData = [{
                            value: this.roomspagcerate2['youzheng'],
                            name: '有证建筑'
                        },
                        {
                            value: this.roomspagcerate2['all'] - this.roomspagcerate2['youzheng'],
                            name: '无证建筑'
                        }
                    ]
                    var listInfo = {
                        title: listTitle,
                        list: listData,
                        color: ['#008acd', '#bbbbbb']
                    }
                    this.initChart("roomspagcerate2", listInfo, "建筑面积（有证/无证）")
                }
            }).catch(() => {});
        },
        getmrnumApi() { //资产数量
            var payload = {};
            getmrnumApi(payload).then((result) => {
                if (result.data.code == 0) {
                    this.getmrnum = result.data.data
                }
            }).catch(() => {});
        },
        getunitnumApi() { //资产面积
            var payload = {};
            getunitnumApi(payload).then((result) => {
                if (result.data.code == 0) {
                    this.getunitnum = result.data.data
                }
            }).catch(() => {});
        },
        getroomspaceApi() { //单位数量
            var payload = {};
            getroomspaceApi(payload).then((result) => {
                if (result.data.code == 0) {
                    this.getroomspace = result.data.data
                }
            }).catch(() => {});
        },
        getroomnumApiFn() { //维修请求
            var payload = {};
            getroomnumApi(payload).then((result) => {
                if (result.data.code == 0) {
                    this.getroomnu = result.data.data
                }
            }).catch(() => {});
        },
        initChart(row, data, title) {
            // var myChart = echarts.init(document.getElementById("main"));
            this.chart = echarts.init(document.getElementById(row), 'macarons')
            this.chart.setOption({
                title: {
                    text: title,
                    left: 'left'
                },
                color: data.color,
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: data.title
                },
                series: [{
                    name: title,
                    type: "pie",
                    radius: ["45%", "65%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: '{b}\n{c}',
                            align: 'center',
                            verticalAlign: 'middle',
                            textStyle: {
                                fontSize: '0'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            },
                            formatter: function (params) {
                                return `{tTitle|${params.name}}\n{tSubTitle|${params.percent}%}`
                            },
                            rich: {
                                tTitle: {
                                    fontSize: '14',
                                    fontWeight: 'bold',
                                    lineHeight: '25'
                                },
                                tSubTitle: {
                                    fontSize: '20',
                                    fontWeight: 'bold',
                                    lineHeight: '25'
                                }
                            }
                        }
                    },
                    data: data.list
                }]
            });
        }
    }
};
</script>

<style>
i.iconFl {
    float: left;
    font-size: 38px;
    font-family: Icons;
    width: 60px;
    text-align: center;
}

.titleColor {
    color: #409EFF;
    font-weight: bold;
}

.dataInt {
    color: #2a3f54;
    font-size: 24px;
    font-weight: bold;
}

.padleft {
    padding-left: 70px;
}

.w20bf {
    height: 360px;
    width: 20%;
    float: left;
}
</style>
