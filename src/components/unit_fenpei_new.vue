<template lang="html">
<div>
    <sui-segment>
    <sui-form>
        <sui-form-fields inline>
            <label for="roomtype">请选择房屋类型</label>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <sui-checkbox radio name="type" label="自有房屋" value="1" v-model="singleRoom.roomtype" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox radio name="type" label="租赁房屋" value="2" v-model="singleRoom.roomtype" />
            </sui-form-field>
        </sui-form-fields>


            <sui-form-fields v-if="singleRoom.roomtype == '1'">
                <sui-form-field class="width300" style="margin-bottom:0px;">
                    <label>选择房屋</label>
                    <model-select :options="singleRoom.ziyousource" v-model="item" placeholder="" width="300px" @input="handleOnInput">
                    </model-select>
                </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-if="singleRoom.roomtype == '2'">
            <sui-form-field class="width300" style="margin-bottom:0px;">
                <label>选择租赁房屋</label>
                <model-select :options="singleRoom.rentroomoptions" v-model="item" placeholder="" width="300px" @input="handleOnInputRent">
                </model-select>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
    </sui-segment>
    <div class="transfet-box" style="margin-top:15px;" v-if="singleRoom.roomtype == '1'">
        <wl-tree-transfer :key="transferKey" ref="wl-tree-transfer" filter high-light default-transfer :mode="mode" :title="title" :to_data="toData" :from_data="fromData" :filterNode="filterNode" :defaultProps="defaultProps" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="[2,3]" @right-check-change="rightCheckChange" @left-check-change="leftCheckChange" @removeBtn="remove" @addBtn="add" height="400px" node_key="id">
            <span slot="title-right" class="my-title-right" @click="handleTitleRight">楼</span>
        </wl-tree-transfer>
        
        
    </div>
    <sui-form-fields v-if="checked_node == true && singleRoom.roomtype == '1'" style="margin-top:15px;">
            <sui-form-field v-for="fenpei in fenpei_data" inline>
                <label>   {{fenpei.name}}    </label>
                <sui-input  placeholder="面积" v-model="fenpei.space" width="800px"/>
            </sui-form-field inline>
            
        </sui-form-fields>
        <sui-form-fields v-if="singleRoom.roomtype == '2'">
            <sui-input  placeholder="面积" v-model="rentspace" width="800px"/>
        </sui-form-fields>    
</div>
</template>

    
<script>
import {
    ModelSelect
} from 'vue-search-select'
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
export default {
    props: ['singleRoom'],
    name: 'form-fenpei',
    components: {
        'model-select': ModelSelect
    },
    data() {
        return {
            disabled: false,
            zoomlevel: 14,
            item: "",
            itemrent: "",
            rentspace: '',
            floorLoading: false,
            louLoading: false,
            louOptions: [],
            checked_node: false,
            floorOptions: [],
            fenpei_data: [],
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
            this.singleRoom.room_id = props;
            console.log(props);
        },
        handleOnInput(props) {
            console.log(this.singleRoom);
            this.singleRoom.room_id = props;
            this.setFang();
        },
        setFloor() {
            console.log(this.singleRoom.building_id);
            this.floorOptions = [];
            this.floorLoading = true;
            if (this.singleRoom.building_id != null) {
                getBuildingFloorApi(this.singleRoom).then((result) => {
                    var floors = result.data.data;
                    floors.map((floor) => {
                        this.floorOptions.push({
                            text: floor.name,
                            value: floor.id,
                        })
                    });
                    this.floorLoading = false;
                })
            }
            this.louLoading = false;
        },
        setFang() {
            console.log(this.singleRoom.room_id);
            this.louOptions = [];
            this.louLoading = true;
            if (this.singleRoom.room_id != null) {
                getBuildingListApi(this.singleRoom).then((data) => {
                    this.fromData = [];
                    data.data.data.map((one, index) => {
                        var newFather = {
                            id: one.id,
                            pid: one.id,
                            name: one.name,
                            children: []
                        }
                        getBuildingFloorApi({
                            building_id: one.id
                        }).then((result) => {
                            var floors = result.data.data;
                            floors.map((floor) => {
                                newFather.children.push({
                                    id: floor.id,
                                    pid: newFather.id,
                                    name: floor.name
                                });

                            });
                            this.fromData.push(newFather);
                            this.floorLoading = false;
                            this.louLoading = false;

                        })

                        this.louOptions.push({
                            text: one.name,
                            value: one.id,
                        })
                    });
                    console.log(this.fromData)
                    this.louLoading = false;

                })
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
        rightCheckChange(nodeObj, treeObj, checkAll) {
            console.log(nodeObj);
            console.log(treeObj);
            console.log('clicked')
            treeObj.checkedNodes
            var fenpei_data = []
            for (var i = treeObj.checkedNodes.length - 1; i >= 0; i--) {
                if(treeObj.checkedNodes[i].children){
                    var building_id = treeObj.checkedNodes[i].id
                    var children_list = treeObj.checkedNodes[i].children
                    for (var i = children_list.length - 1; i >= 0; i--) {
                        var floor_id = children_list[i].id
                        fenpei_data.push({
                            'building_id': building_id,
                            'floor_id': floor_id,
                            'name': children_list[i].name,
                            'space': ''
                        })
                    }
                }
            }
            for (var i = treeObj.halfCheckedNodes.length - 1; i >= 0; i--) {
                if(treeObj.halfCheckedNodes[i].children){
                    var building_id = treeObj.halfCheckedNodes[i].id
                    var children_list = treeObj.halfCheckedNodes[i].children

                    for (var j = children_list.length - 1; j >= 0; j--) {
                        var floor_id = children_list[j].id
                        for (var k = treeObj.checkedNodes.length - 1; k >= 0; k--) {
                            if(children_list[j].id == treeObj.checkedNodes[k].id){
                                fenpei_data.push({
                                'building_id': building_id,
                                'floor_id': floor_id,
                                'name': children_list[j].name,
                                'space': ''
                                })    
                            }  
                        }
                    }
                }
            }
            this.fenpei_data = fenpei_data
            this.checked_node = true
        },
        // 自定义节点 仅树形结构支持
        // 标题自定义区点击事件
        handleTitleRight() {
            alert("标题自定义区点击事件");
        }
    },
    created() {
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
