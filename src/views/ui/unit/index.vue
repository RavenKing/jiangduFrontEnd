<template lang="html">
<wl-container>
    <div>
        <div>

            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>

        </div>  
        <div class="filterBiaoDan">
            <sui-button content="添加" @click.native="createRoomModel" icon="add green" />
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>

        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="3">
                    <div class="filterBiaoDan">
                        <vue-tree-list :key="componentKey" @click="onClick" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                            <span class="icon" slot="addTreeNodeIcon"></span>
                            <span class="icon" slot="addLeafNodeIcon"></span>
                            <span class="icon" slot="leafNodeIcon">
                                <sui-icon name="home" /></span>
                            <span class="icon" slot="treeNodeIcon">
                                <sui-icon name="building outline" /></span>
                        </vue-tree-list>
                    </div>
                </sui-grid-column>
                <sui-grid-column :width="13">
                    <sui-tab :menu="{ text: true }">
                        <sui-tab-pane title="基本信息" :attached="false">
                            <div>
                                <form-create ref='FormCreate' :singleRoom="selectedRoom"></form-create>
                            </div>
                            <sui-modal-actions>
                                <sui-button positive @click.native="updateUnit">
                                    保存
                                </sui-button>
                            </sui-modal-actions>
                        </sui-tab-pane>
                        <sui-tab-pane title="分配列表" :attached="false">
                            <div>
                                <sui-button content="新增" @click.native="createRoomModel" icon="add green" />
                            </div>
                            <div>
                                <vuetable ref="vuetable" :api-mode="false" :data="fenpeilocalData" :fields="fenpeifields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div>
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                        <sui-button negative content="删除" v-on:click="deletefenpei(props.rowData)" />
                                    </div>
                                </vuetable>
                            </div>
                            <div>
                                <sui-modal class="modal2" v-model="fenpeiopen">
                                    <sui-modal-header>{{modelTitle}}</sui-modal-header>
                                    <sui-modal-content scrolling>
                                        <div>
                                            <form-fenpei :singleRoom="selectedfenpei"></form-fenpei>
                                        </div>
                                    </sui-modal-content>
                                    <sui-modal-actions>
                                        <sui-button negative @click.native="closeModal">
                                            取消
                                        </sui-button>
                                        <sui-button v-if="modalMode !== 'check'" positive @click.native="newfenpei">
                                            提交
                                        </sui-button>
                                    </sui-modal-actions>
                                </sui-modal>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="领导办公" :attached="false">
                            <div>
                                <vuetable ref="vuetable" :api-mode="false" :data="lingdaoData" :fields="lingdaofields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div :class="props.rowData.status!=99?'center aligned':'' ">
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                        <sui-button negative content="删除" v-on:click="deleteleader(props.rowData)" />
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="地图定位" :attached="false">
                            <div class="imageForm" :key="ComponentKey">
                                <sui-form>
                                    <sui-form-fields inline>
                                        <label> 经度
                                        </label>
                                        <sui-form-field>
                                            <sui-input type="text" placeholder="请选择" v-model="selectedRoom.lon" />
                                        </sui-form-field>
                                        <label> 维度</label>
                                        <sui-form-field>
                                            <sui-input type="text" placeholder="请选择" v-model="selectedRoom.lat" />
                                        </sui-form-field>
                                    </sui-form-fields>
                                </sui-form>
                            </div>

                            <baidu-map class="map" :center="point" :zoom="15">
                                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                <bm-marker v-for="(item,i) in points" :position="{lng: item.lng, lat: item.lat}" :key="i">
                                </bm-marker>
                            </baidu-map>
                        </sui-tab-pane>

                    </sui-tab>

                </sui-grid-column>

            </sui-grid-row>
        </sui-grid>

        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header>{{modelTitle}}</sui-modal-header>
                <sui-modal-content scrolling>
                    <div>
                        <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
                    </div>

                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" positive @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="buildingForm.open">
                <sui-modal-content scrolling>
                    <building-form ref='formComponentBuilding'></building-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createBuilding">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header>{{modelTitle}}</sui-modal-header>
                <sui-modal-content image>
                    <unit-form ref='formComponent'></unit-form>
                </sui-modal-content>
                <sui-modal-actions>

                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" positive @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>

</wl-container>
</template>

<script>
import FormCreate from "@/components/unit_basic_info";
import FormFenpei from "@/components/unit_fenpei_new";
import dialogBar from '@/components/MDialog'
import UnitForm from "@/components/unitForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FenpeiDef from "./FenpeiDef.js";
import LingdaoDef from "./LingdaoDef.js";
import FieldsDefList from "./FieldsDefList.js";
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import chanZhengForm from "@/components/chanZhengForm";
import ziChanForm from "@/components/ziChanForm";
import mianjiForm from "@/components/mianjiForm";
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list'
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getUnitApi,
    createUnitApi,
    updateUnitApi,
    deleteUnitApi,
    getlistleaderroomApi,
    getUnitApiByid,
    getRentRoomDataApi,
    roomGetAPI,
    getRoomDataApi,
    createAssignmentApi,
    deleteBuildingFloorAssignmentApi,
    delleaderroomApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        VueTreeList,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        UnitForm,
        FormFenpei,
        FormCreate,
        'zichan-form': ziChanForm,
        'chanzheng-form': chanZhengForm,
        'building-form': BuildingForm,
        'assign-form': AssignForm,
        'mianji-form': mianjiForm
    },
    data() {
        return {
            source: [{
                    title: 'Andorra'
                },
                {
                    title: 'United Arab Emirates'
                },
                {
                    title: 'Afghanistan'
                },
                {
                    title: 'Antigua'
                },
                {
                    title: 'Anguilla'
                },
            ],
            tree: new Tree([{
                    name: 'Node 1',
                    id: 1,
                    pid: 0,
                    dragDisabled: true,
                    addTreeNodeDisabled: true,
                    addLeafNodeDisabled: true,
                    editNodeDisabled: true,
                    delNodeDisabled: true,
                    children: [{
                            name: 'Node 1-2',
                            id: 1,
                            isLeaf: true,
                            pid: 1
                        },
                        {
                            name: 'Node 1-1',
                            id: 2,
                            isLeaf: true,
                            pid: 1
                        }
                    ]
                },
                {
                    name: 'Node 3',
                    id: 4,
                    pid: 0
                }
            ]),
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            fenpeiopen: false,
            deleteTarget: "",
            loading: true,
            localData: [],
            rent_room_list: [],
            fenpeilocalData: [],
            lingdaoData: [],
            deletetype: '',
            ComponentKey: 1,
            fields: FieldsDef,
            fenpeifields: FenpeiDef,
            lingdaofields: LingdaoDef,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
            data: [{
                id: "2",
                name: "租房子"
            }],

            // copied

            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            showMap: false,
            point: {lng: 116.404, lat: 39.915},
            points:[{lng: 116.404, lat: 39.915}, {lng: 113.404, lat: 39.915}, {lng: 112.404, lat: 39.915}],
            buildingFloorForm: {
                open: false
            },
            singleBuilding: {},
            buildingImage: {
                open: false
            },
            assignForm: {
                open: false,
                room_id: "",
                roomname: "",
                building_id: null
            },
            selectedBuildingID: null,
            deleteTarget: "",
            loading: true,
            localData: [],
            selectedRoom: {
                roomname: ""
            },
            selectedfenpei: {
                unit: '',
                room: '',
                roomtype: '',
                roomname: ''
            },
            listField: FieldsDefList,
            fields: FieldsDef,
            assignList: {
                open: false,
                buildings: [],
                selectedBuilding: {},
                selectedFloor: {}
            },
            buildingForm: {
                open: false
            }
        };
    },

    methods: {

        //tree
        onDel(node) {
            console.log(node)
            this.deleteBuilding(node);
        },

        onChangeName(params) {
            console.log(params)
        },

        onAddNode(params) {
            console.log(params)
        },

        onClick(params) {

            this.selectedRoom = params
            var building_info = params['building_info']
            var temp_points = []
            var temp_x = 0
            var temp_y = 0
            var counter = 0
            for (var i = building_info.length - 1; i >= 0; i--) {
                if(building_info[i]['lat'] && building_info[i]['lon']){
                    temp_x += building_info[i]['lat']
                    temp_y += building_info[i]['lon']
                    counter += 1
                    temp_points.push({
                    lat:building_info[i]['lat'],
                    lon:building_info[i]['lon']
                })    
                }
            }
            this.point = {lat: temp_x/counter, lon: temp_y/counter}
            this.points = temp_points


            getUnitApiByid(params.id).then((data) => {
                var res_data = data.data.data['building_info']
                this.fenpeilocalData = {
                    total: 16,
                    per_page: 5,
                    current_page: 1,
                    last_page: 4,
                    next_page_url: "data.data.data?page=2",
                    prev_page_url: null,
                    from: 1,
                    to: 5,
                    data: res_data
                }
            })
            getlistleaderroomApi(params.id).then((data) => {
                var res_data = data.data.data
                console.log('leader room')
                this.lingdaoData = {
                    total: 16,
                    per_page: 5,
                    current_page: 1,
                    last_page: 4,
                    next_page_url: "data.data.data?page=2",
                    prev_page_url: null,
                    from: 1,
                    to: 5,
                    data: res_data
                }
            })
        },

        addNode() {
            var node = new TreeNode({
                name: 'new node',
                isLeaf: false
            })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    //  return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        clickConfirmDelete() {
            this.loading = true;
            console.log('delete')
            console.log(this.deleteTarget)
            if (this.deletetype == 'fenpei') {
                deleteBuildingFloorAssignmentApi(this.deleteTarget).then((result) => {
                    this.refreshUnits();
                });
            }
            if (this.deletetype == 'leader') {
                delleaderroomApi(this.deleteTarget).then((result) => {
                    this.refreshUnits();
                });
            }
        },
        viewSomeThing(data, type) {
            this.$refs.formComponent.singleUnit = data;
            //修改
            if (type == "modify") {
                //查看
                this.$refs.formComponent.disabled = false;
                this.modelTitle = "修改单位";
                this.modalMode = "edit";
                this.open = !this.open;
            } else if (type == "check") {
                this.$refs.formComponent.disabled = true;
                this.modalMode = "check";
                this.modelTitle = "查看单位";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
        },
        exportToExcel() {
            let headers = ['id', 'name', 'enumber', 'level', 'level_num'];
            const filtedData = this.formatJson(headers, this.localData.data);
            export_json_to_excel({
                header: headers,
                data: filtedData,
                filename: 'excel-list', //Optional
                autoWidth: true, //Optional
                bookType: 'xlsx' //Optional
            });

        },
        deleteRoom(data) {
            this.sendVal = true;
            console.log(data)
            this.deleteTarget = {
                text: "是否要删除" + data.name + "(" + data.enumber + ")?",
                id: data.id
            };
            this.loading = true;
            deleteRoomApi(data).then((result) => {
                this.refreshUnits();
                console.log(result)
            });
        },
        deletefenpei(data) {
            this.sendVal = true;
            this.deleteTarget = data
            this.deletetype = 'fenpei'

        },
        deleteleader(data) {
            this.sendVal = true;
            this.deleteTarget = data
            this.deletetype = 'leader'
        },
        refreshUnits() {
            this.loading = true;

            getUnitApi().then((data) => {
                console.log(data);

                var res_data = data.data.data
                var parent_data = []
                var son_data = []
                var filtered_data = []
                for (var i = res_data.length - 1; i >= 0; i--) {
                    if (res_data[i]["parent_id"] == 0)
                        parent_data.push(res_data[i])
                    else
                        son_data.push(res_data[i])
                }
                for (var i = parent_data.length - 1; i >= 0; i--) {
                    var abstract_parent = JSON.parse(JSON.stringify(parent_data[i]))
                    for (var j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == abstract_parent["id"])
                            abstract_parent["enumber"] = parseInt(abstract_parent["enumber"]) + parseInt(son_data[j]["enumber"])
                        abstract_parent["zhengting"] = parseInt(abstract_parent["zhengting"]) + parseInt(son_data[j]["zhengting"])
                        abstract_parent["futing"] = parseInt(abstract_parent["futing"]) + parseInt(son_data[j]["futing"])
                        abstract_parent["zhengchu"] = parseInt(abstract_parent["zhengchu"]) + parseInt(son_data[j]["zhengchu"])
                        abstract_parent["fuchu"] = parseInt(abstract_parent["fuchu"]) + parseInt(son_data[j]["fuchu"])
                        abstract_parent["zhengke"] = parseInt(abstract_parent["zhengke"]) + parseInt(son_data[j]["zhengke"])
                        abstract_parent["fuke"] = parseInt(abstract_parent["fuke"]) + parseInt(son_data[j]["fuke"])
                        abstract_parent["keji"] = parseInt(abstract_parent["keji"]) + parseInt(son_data[j]["keji"])
                    }
                    filtered_data.push(abstract_parent)
                    filtered_data.push(parent_data[i])
                    for (var j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == parent_data[i]["id"])
                            filtered_data.push(son_data[j])
                    }
                }

                this.loading = false;
                this.localData = {
                    total: 16,
                    per_page: 5,
                    current_page: 1,
                    last_page: 4,
                    next_page_url: "data.data.data?page=2",
                    prev_page_url: null,
                    from: 1,
                    to: 5,
                    data: filtered_data
                }
            });
        },
        createRoomModel() {
            // show create Model
            this.modelTitle = "单位新增房屋"
            this.modalMode = "create";
            this.fenpeiopen = true;
            console.log('create form')
            // this.$refs.formComponent.singleUnit = {
            //     name: "",
            //     enumber: "",
            //     level: "",
            //     level_num: ""
            // };
        },

        updateUnit() {
            let formdata = this.$refs.FormCreate.singleRoom;
            console.log(this.$refs)
            updateUnitApi(formdata).then((result) => {
                this.loading = false;
            });
        },

        openRoom(value) {
            console.log(value);
        },
        submit() {
            console.log(this.filterString);
        },
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.open = false;
            this.fenpeiopen = false
        },
        newfenpei() {
            console.log('提交')
            console.log(this.selectedfenpei)
            if(this.selectedfenpei.roomtype == '1'){
                var input = {}
                input['room_id'] = this.selectedfenpei.room_id
                input['building_id'] = this.selectedfenpei.building_id
                input['floor_id'] = this.selectedfenpei.floor_id
                input['unit_id'] = this.selectedfenpei.unit_id

                createAssignmentApi(input).then((data) => {
                    console.log(data)
            })    
            }
            if(this.selectedfenpei.roomtype == '2'){
                var input = {}
                input['room_id'] = this.selectedfenpei.room_id
                input['building_id'] = this.selectedfenpei.building_id
                input['floor_id'] = this.selectedfenpei.floor_id
                input['unit_id'] = this.selectedfenpei.unit_id

                assignRentRoomApi(input).then((data) => {
                    console.log(data)
            })    
            }
            
        }

    },
    created() {
        var fenpei_options = []
        getRentRoomDataApi().then((data) => {
            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                fenpei_options.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['room_id']
                })
            }
            this.selectedfenpei = {
                'rentroomoptions': fenpei_options
            };
        })

        var rent_options = []
        var ziyou_source = []
        getRoomDataApi().then((data) => {

            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                rent_options.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['id']
                })
                ziyou_source.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['id']
                })
            }
            this.selectedfenpei['ziyousource'] = ziyou_source
            this.selectedfenpei['ziyouroomoptions'] = rent_options
        })

        getUnitApi().then((data) => {
            var res_data = data.data.data
            var parent_data = []
            var son_data = []
            var filtered_data = []
            console.log('getUnitApi')
            console.log(res_data)
            this.selectedfenpei['unitoptions'] = []
            for (var i = res_data.length - 1; i >= 0; i--) {
                if (res_data[i]["parent_id"] == 0)
                    parent_data.push(res_data[i])
                else
                    son_data.push(res_data[i])
                this.selectedfenpei['unitoptions'].push({
                    'text': res_data[i]['name'],
                    'value': res_data[i]['id']
                })
            }
            for (var i = parent_data.length - 1; i >= 0; i--) {
                var abstract_parent = JSON.parse(JSON.stringify(parent_data[i]))
                abstract_parent["status"] = 99
                for (var j = son_data.length - 1; j >= 0; j--) {
                    if (son_data[j]["parent_id"] == abstract_parent["id"])
                        abstract_parent["enumber"] = parseInt(abstract_parent["enumber"]) + parseInt(son_data[j]["enumber"])
                    abstract_parent["zhengting"] = parseInt(abstract_parent["zhengting"]) + parseInt(son_data[j]["zhengting"])
                    abstract_parent["futing"] = parseInt(abstract_parent["futing"]) + parseInt(son_data[j]["futing"])
                    abstract_parent["zhengchu"] = parseInt(abstract_parent["zhengchu"]) + parseInt(son_data[j]["zhengchu"])
                    abstract_parent["fuchu"] = parseInt(abstract_parent["fuchu"]) + parseInt(son_data[j]["fuchu"])
                    abstract_parent["zhengke"] = parseInt(abstract_parent["zhengke"]) + parseInt(son_data[j]["zhengke"])
                    abstract_parent["fuke"] = parseInt(abstract_parent["fuke"]) + parseInt(son_data[j]["fuke"])
                    abstract_parent["keji"] = parseInt(abstract_parent["keji"]) + parseInt(son_data[j]["keji"])
                }
                filtered_data.push(abstract_parent)
                filtered_data.push(parent_data[i])
                for (var j = son_data.length - 1; j >= 0; j--) {
                    if (son_data[j]["parent_id"] == parent_data[i]["id"])
                        filtered_data.push(son_data[j])
                }
            }
            console.log(filtered_data)
            var tree_list = []
            for (var i = 0; i < filtered_data.length; i++) {
                if (filtered_data[i]["status"] == 99) {
                    var paraent_node = {}
                    paraent_node["name"] = filtered_data[i]["name"]
                    paraent_node["id"] = filtered_data[i]["id"]
                    paraent_node["children"] = []
                    paraent_node.dragDisabled = true;
                    paraent_node.addTreeNodeDisabled = true;
                    paraent_node.addLeafNodeDisabled = true;
                    paraent_node.editLeafNodeDisabled = true;
                    paraent_node.delLeafNodeDisabled = true;
                    paraent_node.editNodeDisabled = true;
                    paraent_node.delNodeDisabled = true;
                    tree_list.push(paraent_node)
                } else {
                    var children_node = {}
                    children_node = filtered_data[i]
                    children_node["isLeaf"] = true
                    children_node.dragDisabled = true;
                    children_node.addTreeNodeDisabled = true;
                    children_node.addLeafNodeDisabled = true;
                    children_node.editLeafNodeDisabled = true;
                    children_node.delLeafNodeDisabled = true;
                    children_node.editNodeDisabled = true;
                    children_node.delNodeDisabled = true;
                    tree_list[tree_list.length - 1]["children"].push(children_node)
                }
            }
            this.tree = new Tree(tree_list)
            this.loading = false;
            this.localData = {
                total: 16,
                per_page: 5,
                current_page: 1,
                last_page: 4,
                next_page_url: "data.data.data?page=2",
                prev_page_url: null,
                from: 1,
                to: 5,
                data: filtered_data
            }
        });
    }
};
</script>

<style>
.ui.positive.button {
    background-color: #75ADBF !important;
}

.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
}

.ui.table thead th {
    padding: 2px !important;
    background-color: #75ADBF !important;
    color: white !important;
    font-size: 15px;
    height: 80px !important
}

.map {
    width: 100%;
    height: 400px;
}

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 20px
}

.vue2Table {
    margin: 20px;
}

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}
</style>
