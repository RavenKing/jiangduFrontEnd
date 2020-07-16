<template lang="html">
<div>
    <sui-segment style="margin-top:15px;">
    <sui-form>
        <sui-form-fields inline>
            <label>领导级别</label>
            <sui-form-field>
                <sui-dropdown placeholder="选择领导级别" selection :options="leaderLevel" v-model="singleRoom.leader" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
    </sui-segment>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'form-fenpei',
    components: {
    },
    data() {
        return {
            leaderLevel: [{
                text: "正科",
                value: "正科"
            }, {
                text: "副处",
                value: "副处"
            }],
            disabled: false,
            zoomlevel: 14,
            item: "",
            itemrent: "",
            floorLoading: false,
            louLoading: false,
            louOptions: [],
            floorOptions: [],
            roomoptions: [{
                    text: 'Male',
                    value: 1,
                },
                {
                    text: 'Female',
                    value: 2,
                },
            ],
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
        handleOnInputRent(props) {
            console.log(props);
        },
        handleOnInput(props) {
            console.log(this.singleRoom);
            this.singleRoom.room_id = props;
            this.setFang();
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
        rightCheckChange(nodeObj, treeObj, checkAll) {
            console.log(nodeObj);
            console.log(treeObj);
            console.log(checkAll);
        },
        // 自定义节点 仅树形结构支持
        // 标题自定义区点击事件
        handleTitleRight() {
            alert("标题自定义区点击事件");
        }
    },
    mounted() {
        console.log(this.singleRoom);
        if (this.singleRoom.roomname == undefined) {
            this.singleRoom.roomname = ""
        }
    }
};
</script>

<style>
.width300 {
    width: 300px !important
}
</style>
