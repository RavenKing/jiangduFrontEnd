<template lang="html">
<div>
    <sui-segment style="width:800px">
        <sui-form v-if="mode1=='room'">
            <sui-form-fields inline>
                <label for="roomtype">请选择房屋用途</label>
            </sui-form-fields>
            <sui-form-fields>
                <sui-form-field>
                    <sui-dropdown placeholder="房屋类型" selection :options="fangwuoptions" v-model="filterString.kind" />
                </sui-form-field>
                <sui-form-field>
                    <sui-input placeholder="房屋名字" v-model="filterString.name" />
                </sui-form-field>
                <sui-button basic color="blue" content="查询" @click.prevent="searchit" />
            </sui-form-fields>
        </sui-form>
        <sui-form v-if="mode1=='rentroom'">
            <sui-form-fields inline>
                <sui-form-field>
                    <sui-dropdown placeholder="出租方性质" selection :options="ownerOptions" v-model="filterString.owner" />
                </sui-form-field>
                <sui-form-field>
                    <input type="text" placeholder="房屋名字" v-model="filterString.name" />
                </sui-form-field>
                <sui-button basic color="blue" content="搜索" @click.prevent="searchit" />
            </sui-form-fields>
        </sui-form>
        <sui-form v-if="mode1=='unit'">
            <sui-form-fields inline>
                <sui-form-field>
                    <input type="text" placeholder="单位名字" v-model="filterString.name" />
                </sui-form-field>
                <sui-form-field>
                    <sui-dropdown placeholder="单位类别" selection :options="leaderLevel" v-model="filterString.kind" />
                </sui-form-field>
                <sui-form-field>
                    <sui-dropdown placeholder="单位级别" selection :options="leveloptions" v-model="filterString.level" />
                </sui-form-field>
                <sui-button basic color="blue" content="搜索" @click.prevent="searchit" />
            </sui-form-fields>
        </sui-form>
    </sui-segment>
    <div class="transfet-box">
        <wl-tree-transfer :key="transferKey" ref="wl-tree-transfer" filter high-light default-transfer :mode="mode" :title="title" :to_data="toData" :from_data="fromData" :filterNode="filterNode" :defaultProps="defaultProps" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="[2,3]" @right-check-change="rightCheckChange" @left-check-change="leftCheckChange" @removeBtn="remove" @addBtn="add" height="400px" node_key="id">
            <span slot="title-right" class="my-title-right" @click="handleTitleRight" v-if="mode1!='unit'">房屋</span>
            <span slot="title-right" class="my-title-right" @click="handleTitleRight" v-if="mode1=='unit'">单位</span>

        </wl-tree-transfer>
    </div>
    <!-- <sui-form-fields v-if="checked_node == true && singleRoom.roomtype == '1'" >
            <sui-form-field v-for="fenpei in fenpei_data"  :key="fenpei[0]" inline>
                <label>   {{fenpei.name}} (m²) </label>
                <sui-input  placeholder="面积(m²)" v-model="fenpei.space" width="800px" type="number" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields v-if="singleRoom.roomtype == '2'">
            <sui-input  placeholder="面积(m²)" v-model="rentspace" width="800px" type="number" />
        </sui-form-fields>     -->
</div>
</template>

<script>
import constants from "@/util/constants";
import {
    notifySomething,
} from "@/util/utils";
import {
    getRoomDataApi,
    getRentRoomDataApi,
    searchunitApi
} from "@/api/roomDataAPI";
export default {
    props: ['singleRoom', 'filterString', 'mode1'],
    name: 'form-fenpei',

    data() {
        return {
            leaderLevel: [{
                text: "机关单位",
                value: "1"
            }, {
                text: "事业单位",
                value: "2"
            }, {
                text: "参公单位",
                value: "3"
            }],
            leveloptions: [{
                    'text': '局级',
                    'value': '局级'
                },
                {
                    'text': '副局级',
                    'value': '副局级'
                },
                {
                    'text': '处级',
                    'value': '处级'
                },
                {
                    'text': '副处级',
                    'value': '副处级'
                },
                {
                    'text': '科级',
                    'value': '科级'
                }
            ],
            ownerOptions: [{
                text: "国企",
                value: "国企"
            }, {
                text: "国企控股",
                value: "国企控股"
            }, {
                text: "村委会",
                value: "村委会"
            }, {
                text: "私企",
                value: "私企"
            }],
            loading: false,
            toDataList: [],
            fangwuoptions: [{
                text: "办公性",
                value: 1
            }, {
                text: "经营性",
                value: 2
            }],
            checked_node: false,
            fenpei_data: [],
            mode: "transfer", // transfer addressList
            defaultProps: {
                label: "name",
                children: "children"
            },
            transferKey: 0,
            fromData: [], // 穿梭框 - 源数据 - 树形
            toData: [], // 穿梭框 - 目标数据 - 树形
            defaultCheckedKeys: [] // 左侧默认选中数据
        };
    },
    methods: {
        searchit() {
            var that = this;
            var payload = {};
            this.fromData = [];
            if (this.mode1 == "room") {
                payload = {
                    name: this.filterString.name,
                    kind: this.filterString.kind
                }
                getRoomDataApi(payload).then((data) => {
                    this.fromData = [];
                    //this.localData = data.data.data;
                    if (data.data.code == 0) {
                        that.loading = false;
                        data.data.data.map((one) => {
                            var newOne = {
                                id: one.id,
                                pid: one.id,
                                name: one.roomname,
                                children: []
                            }
                            that.fromData.push(newOne);
                        })

                    } else if (data.data.code == 2) {
                        notifySomething("重复登陆 请重新登陆", constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    that.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.mode1 == "rentroom") {
                payload = {
                    owner: this.filterString.owner,
                    name: this.filterString.name
                }
                getRentRoomDataApi(payload).then((data) => {
                    this.fromData = [];
                    //this.localData = data.data.data;
                    if (data.data.code == 0) {
                        that.loading = false;
                        data.data.data.map((one) => {
                            var newOne = {
                                id: one.id,
                                pid: one.id,
                                name: one.roomname,
                                children: []
                            }
                            that.fromData.push(newOne);
                        })

                    } else if (data.data.code == 2) {
                        notifySomething("重复登陆 请重新登陆", constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    that.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.mode1 == "unit") {
                payload = {
                    name: this.filterString.name,
                    kind: this.filterString.kind,
                    level: this.filterString.level
                }
                if (payload.kind == null) {
                    delete payload.kind;
                }
                if (payload.level == null) {
                    delete payload.level;
                }
                searchunitApi(payload).then((data) => {
                    this.fromData = [];
                    //this.localData = data.data.data;
                    if (data.data.code == 0) {
                        that.loading = false;
                        data.data.data.map((one) => {
                            var newOne = {
                                id: one.id,
                                pid: one.id,
                                name: one.name,
                                children: []
                            }
                            that.fromData.push(newOne);
                        })

                    } else if (data.data.code == 2) {
                        notifySomething("重复登陆 请重新登陆", constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    that.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        // 清除选中
        clearChecked() {
            this.$refs["wl-tree-transfer"].clearChecked();
        },
        // 自定义筛选函数
        filterNode(value, data, where) {
            console.log(value, data, where);
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
        },
        // 懒加载回调
        lazyFn(node, resolve) {
            setTimeout(() => {
                resolve([{
                        id: 71272,
                        pid: 7127,
                        name: "debug22",
                        // disabled: true,
                        children: []
                    },
                    {
                        id: 71273,
                        pid: 7127,
                        name: "debug11",
                        children: []
                    }
                ]);
            }, 500);
        },
        // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
        changeMode() {
            if (this.mode == "transfer") {
                this.mode = "addressList";
            } else {
                this.mode = "transfer";
            }
        },
        // 添加按钮
        add(fromData, toData, obj) {
            // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
            // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
            console.log("fromData:", fromData);
            console.log("toData:", toData);
            console.log("obj:", obj);
        },
        // 移除按钮
        remove(fromData, toData, obj) {
            // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
            // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
            console.log("fromData:", fromData);
            console.log("toData:", toData);
            console.log("obj:", obj);
        },
        // 左侧源数据选中事件
        leftCheckChange(nodeObj, treeObj, checkAll) {
            console.log(nodeObj);
            console.log(treeObj);
            console.log(checkAll);
        },
        // 右侧目标数据选中事件
        rightCheckChange(nodeObj, treeObj) {
            console.log(nodeObj);
            console.log(treeObj);
            console.log('clicked')
            var fenpei_data = []
            for (var i = treeObj.checkedNodes.length - 1; i >= 0; i--) {
                if (treeObj.checkedNodes[i].id) {
                    fenpei_data.push(treeObj.checkedNodes[i])
                }
            }
            for (i = treeObj.halfCheckedNodes.length - 1; i >= 0; i--) {
                if (treeObj.checkedNodes[i].id) {
                    fenpei_data.push(treeObj.checkedNodes[i])
                }
            }
            // this.toData = fenpei_data
            this.toDataList = [];
            fenpei_data.map((one) => {
                this.toDataList.push(one.id);
            })
            this.checked_node = true
        },
        // 自定义节点 仅树形结构支持
        // 标题自定义区点击事件
        handleTitleRight() {
            alert("标题自定义区点击事件");
        }
    },
    created() {
        console.log("shitform")
    }
};
</script>

<style>
.width300 {
    width: 300px !important
}
</style>
