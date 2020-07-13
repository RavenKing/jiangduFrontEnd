<template lang="html">
<wl-container>
    <div>
        <div>

            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>

        </div>
        <div class="filterBiaoDan">
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>

        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="3">
                    <div class="filterBiaoDan">
                        <vue-tree-list class="addListIcon" :key="componentKey" @click="onClick" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                            <span class="icon" slot="addTreeNodeIcon"></span>
                            <span class="icon" slot="addLeafNodeIcon"></span>
                            <span class="icon" slot="leafNodeIcon">
                                <sui-icon name="home" />
                                </span>
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
                                <div style="background: #f9fafb; border-bottom-left-radius: .28571429rem; border-bottom-right-radius: .28571429rem; margin:0 -14px -14px -14px;   padding: 1rem 1rem;    border-top: 1px solid rgba(34,36,38,.15);    text-align: left;">
                                <sui-button basic color="blue" @click.native="updateUnit">
                                    保存
                                </sui-button>
                                </div>
                            </sui-modal-actions>
                        </sui-tab-pane>
                        <sui-tab-pane title="分配列表" :disabled="selectedRoom.name==''">
                            <div>
                                <sui-button content="新增" @click.native="createRoomModel" icon="add green" />
                            </div>
                            <div style="margin-top:15px;">
                                <form-weixiu ref='WeixiuForm' :singleRoom="selectedRoom"></form-weixiu>
                            </div>
                            <div>
                                <vuetable ref="vuetable" :api-mode="false" :data="fenpeilocalData" :fields="fenpeifields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div>
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                        <span v-show="role!==1">
                                            <sui-button basic color="blue" content="申请维修" v-on:click="applyRepair(props.rowData)" />
                                        </span>
                                        <sui-button basic color="red" content="删除" v-on:click="deletefenpei(props.rowData)" />
                                        
                                    </div>
                                </vuetable>
                            </div>

                            <div>
                                <sui-modal class="modal2" v-model="weixiuopen">
                                    <sui-modal-header style="border-bottom:0;">申请维修</sui-modal-header>
                                    <sui-modal-content scrolling>
                                        <div>
                                        <form-weixiu ref='FormWeixiu' :singleEntry="selectedWeixiu"></form-weixiu>
                                    </div>
                                    </sui-modal-content>
                                    <sui-modal-actions>
                                    <sui-button basic color="red" @click.native="closeWeiXiuForm">
                                        取消
                                    </sui-button>
                                    <sui-button basic color="blue" @click.native="createShenbao">
                                        保存
                                    </sui-button>
                                </sui-modal-actions>
                                    
                                </sui-modal>
                            </div>



                            <div>
                                <sui-modal class="modal2" v-model="fenpeiopen">
                                    <sui-modal-header style="border-bottom:0;">{{modelTitle}}</sui-modal-header>
                                    <sui-modal-content scrolling>
                                        <div>
                                            <form-fenpei :singleRoom="selectedfenpei"></form-fenpei>
                                        </div>
                                    </sui-modal-content>
                                    <sui-modal-actions>
                                        <sui-button basic color="red" @click.native="closeModal">
                                            取消
                                        </sui-button>
                                        <sui-button v-if="modalMode !== 'check'" basic color="blue" @click.native="newfenpei">
                                            提交
                                        </sui-button>
                                    </sui-modal-actions>
                                </sui-modal>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="领导办公" :attached="false" :disabled="selectedRoom.name==''">
                            <div>
                                <sui-button basic color="blue" @click.native="assignLeader">
                                    新增
                                </sui-button>
                                <vuetable style="margin-top:15px;" ref="vuetable" :api-mode="false" :data="lingdaoData" :fields="lingdaofields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div :class="props.rowData.status!=99?'center aligned':'' ">
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                        <sui-button basic color="red" content="删除" v-on:click="deleteleader(props.rowData)" />
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="地图定位" :attached="false" :disabled="selectedRoom.name==''">
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
                <sui-modal-header style="border-bottom:0;">{{modelTitle}}</sui-modal-header>
                <sui-modal-content scrolling>
                    <div>
                        <form-create ref='formComponent' :singleRoom="selectedfenpei"></form-create>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" basic color="blue" @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="leader.open">
                <sui-modal-content scrolling>
                    <leader-form :singleRoom="selectedfenpei"></leader-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeLeaderModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="createLeaderAssign">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0;">{{modelTitle}}</sui-modal-header>
                <sui-modal-content image>
                    <unit-form ref='formComponent'></unit-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" basic color="blue" @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>

</wl-container>
</template>

<script>
import {
    notifySomething
} from "@/util/utils";
import constants from "@/util/constants";
import FormCreate from "@/components/unit_basic_info";
import FormFenpei from "@/components/unit_fenpei_new";
import LeaderForm from "@/components/unit_leader_form";
import FormWeixiu from "@/components/weixiuForm";
import dialogBar from '@/components/MDialog'
import UnitForm from "@/components/unitForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FenpeiDef from "./FenpeiDef.js";
import LingdaoDef from "./LingdaoDef.js";
import FieldsDefList from "./FieldsDefList.js";
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list';
import {
    localGet
} from "@/util/storage";
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
    getBuildingFloorApi,
    createLeaderAssignApi,
    assignRentRoomApi
} from "@/api/roomDataAPI";
import {
    getMRApi,
    createMRApi,
    editMRApi,
    getroombyid,
    createMCApi,
    getMCApi,
    approveMRApi,
    rejectMRApi
} from "@/api/weixiuAPI";
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
        FormWeixiu,
        "leader-form": LeaderForm
    },
    data() {
        return {
            role: 0,
            source: [],
            tree: new Tree([]),
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            fenpeiopen: false,
            weixiuopen: false,
            deleteTarget: "",
            loading: true,
            localData: [],
            rent_room_list: [],
            fenpeilocalData: [],
            lingdaoData: [],
            selectedWeixiu: {},
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
            leader: {
                open: false
            },
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
            point: {
                lng: 116.404,
                lat: 39.915
            },
            points: [{
                lng: 116.404,
                lat: 39.915
            }, {
                lng: 113.404,
                lat: 39.915
            }, {
                lng: 112.404,
                lat: 39.915
            }],
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
                name: ""
            },
            selectedfenpei: {
                unit: '',
                room: '',
                roomtype: '',
                roomname: ''
            },
            listField: FieldsDefList,
            fields: FieldsDef
        };
    },

    methods: {
        closeLeaderModal() {
            this.leader.open = false;
        },
        createLeaderAssign() {
            console.log(this.selectedRoom);
            console.log(this.selectedfenpei);
            var payload = {
                room_id: this.selectedfenpei.room_id,
                building_id: this.selectedfenpei.building_id,
                floor_id: this.selectedfenpei.floor_id,
                space: this.selectedfenpei.space,
                unit_id: this.selectedRoom.id,
                leader: this.selectedfenpei.leader
            }
            this.loading = true;
            createLeaderAssignApi(payload).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.leader.open = false;
                    notifySomething("创建成功", "创建领导分配成功", "success");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                }
            }).catch((exception) => {
                this.loading = false;
                notifySomething("创建失败", "创建失败", "Error")
            });
        },
        createShenbao() {
            this.loading = true;
            console.log(this.selectedWeixiu)
                createMRApi(this.selectedWeixiu).then((result) => {
                    this.loading = false;
                    this.closeWeiXiuForm();
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                }).catch(function (error) {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });

        },
        assignLeader() {
            this.leader.open = true;
        },
        //tree
        onDel(node) {
            console.log(node)
            this.deleteBuilding(node);
        },

        onChangeName(params) {
            console.log(params)
        },
        closeWeiXiuForm(){
            this.weixiuopen = false
        },

        onAddNode(params) {
            console.log(params)
        },

        onClick(params) {
            this.selectedRoom = params;
            var building_info = params['building_info']
            var temp_points = []
            var temp_x = 0
            var temp_y = 0
            var counter = 0
            if (building_info != undefined) {
                for (var i = building_info.length - 1; i >= 0; i--) {
                    if (building_info[i]['lat'] && building_info[i]['lon']) {
                        temp_x += building_info[i]['lat']
                        temp_y += building_info[i]['lon']
                        counter += 1
                        temp_points.push({
                            lat: building_info[i]['lat'],
                            lon: building_info[i]['lon']
                        })
                    }
                }
                this.point = {
                    lat: temp_x / counter,
                    lon: temp_y / counter
                }
                this.points = temp_points
            }

            getUnitApiByid(params.id).then((data) => {
                var res_data = data.data.data['building_info']
                var ziyou_source = []    
                for (var i = res_data.length - 1; i >= 0; i--) {
                    if(res_data[i]['type1'] == 'self')
                        res_data[i]['type1'] = '自有房屋'
                    else
                        res_data[i]['type1'] = '租赁房屋'
                }
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
            this.refreshLeaderAssignment(params.id);
        },

        refreshLeaderAssignment(data) {
            getlistleaderroomApi(data).then((data) => {
                this.loading = false;
                var res_data = data.data.data
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
            if (this.deletetype == 'fenpei') {
                var input = {}
                input['room_id'] = this.deleteTarget.room_id
                input['building_id'] = this.deleteTarget.building_id
                input['floor_id'] = this.deleteTarget.floor_id
                input['unit_id'] = this.selectedRoom.id


                deleteBuildingFloorAssignmentApi(input).then((result) => {
                    getUnitApiByid(this.selectedRoom.id).then((data) => {
                    var res_data = data.data.data['building_info']
                    var ziyou_source = []    
                    for (var i = res_data.length - 1; i >= 0; i--) {
                        if(res_data[i]['type1'] == 'self')
                            res_data[i]['type1'] = '自有房屋'
                        else
                            res_data[i]['type1'] = '租赁房屋'
                    }
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
                    this.loading = false
                });
            }
            if (this.deletetype == 'leader') {
                delleaderroomApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        notifySomething("删除成功", "删除成功", constants.typeSuccess);
                    }
                    this.refreshLeaderAssignment(this.selectedRoom.id);
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
            this.deleteTarget.text = "是否要删除";
            this.deleteTarget
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
            this.modelTitle = "单位新增房屋"
            this.modalMode = "create";
            this.fenpeiopen = true;
        },

        applyRepair(data){
            this.weixiuopen = true
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
            if (this.selectedfenpei.roomtype == '1') {
                var input = {}
                input['room_id'] = this.selectedfenpei.room_id
                input['building_id'] = this.selectedfenpei.building_id
                input['floor_id'] = this.selectedfenpei.floor_id
                input['unit_id'] = this.selectedRoom.id
                input['space'] = parseInt(this.selectedfenpei.space)
                console.log(input)
                createAssignmentApi(input).then((data) => {
                    if (data.data.code == 0) {
                    notifySomething("分配成功", "创建领导分配成功", "success");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                    this.fenpeiopen = false;    
                }else{
                    notifySomething("分配失败", "创建领导分配失败", "fail");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                    this.fenpeiopen = false;    
                }


                })
            }
            if (this.selectedfenpei.roomtype == '2') {
                var input = {}
                console.log(this.selectedfenpei)
                input['room_id'] = this.selectedfenpei.room_id
                input['unit_id'] = this.selectedRoom.id
                input['space'] = parseInt(this.selectedfenpei.space)

                console.log(input)
                assignRentRoomApi(input).then((data) => {
                    if (data.data.code == 0) {
                    notifySomething("分配成功", "创建领导分配成功", "success");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                    this.fenpeiopen = false;    
                }else{
                    notifySomething("分配失败", "创建领导分配失败", "fail");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                    this.fenpeiopen = false;    
                }
                    console.log(data)
                })
            }

        }

    },
    mounted() {
        this.role = localGet("role");
        var fenpei_options = []
        getRentRoomDataApi().then((data) => {
            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                fenpei_options.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['id']
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
                // rent_options.push({
                //     text: res_data[i]['roomname'],
                //     value: res_data[i]['id']
                // })
                ziyou_source.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['id']
                })
            }
            this.selectedfenpei['ziyousource'] = ziyou_source
            // this.selectedfenpei['ziyouroomoptions'] = rent_options
        })

        getUnitApi().then((data) => {
            var res_data = data.data.data
            var parent_data = []
            var son_data = []
            var filtered_data = []
            this.selectedfenpei['unitoptions'] = []

            for (var i = res_data.length - 1; i >= 0; i--) {
                res_data[i]['bianzhi_num'] = 0
                res_data[i]['shiji_num'] = 0
                if (parseInt(res_data[i]['zhengju'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['zhengju'])
                }
                if (parseInt(res_data[i]['fuju'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['fuju'])
                }
                if (parseInt(res_data[i]['zhengchu'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['zhengchu'])
                }
                if (parseInt(res_data[i]['fuchu'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['fuchu'])
                }
                if (parseInt(res_data[i]['zhengke'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['zhengke'])
                }
                if (parseInt(res_data[i]['fuke'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['fuke'])
                }
                if (parseInt(res_data[i]['other'])) {
                    res_data[i]['bianzhi_num'] = res_data[i]['bianzhi_num'] + parseInt(res_data[i]['other'])
                }
                if (parseInt(res_data[i]['zhengju_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['zhengju_r'])
                }
                if (parseInt(res_data[i]['fuju_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['fuju_r'])
                }
                if (parseInt(res_data[i]['zhengchu_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['zhengchu_r'])
                }
                if (parseInt(res_data[i]['fuchu_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['fuchu_r'])
                }
                if (parseInt(res_data[i]['zhengke_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['zhengke_r'])
                }
                if (parseInt(res_data[i]['fuke_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['fuke_r'])
                }
                if (parseInt(res_data[i]['other_r'])) {
                    res_data[i]['shiji_num'] = res_data[i]['shiji_num'] + parseInt(res_data[i]['other_r'])
                }

                if (res_data[i]["parent_id"] == 0) {
                    parent_data.push(res_data[i])
                } else {
                    // res_data[i]['bianzhi_num'] = parseInt(res_data[i]['zhengju']) + parseInt(res_data[i]['fuju']) + parseInt(res_data[i]['zhengchu']) + parseInt(res_data[i]['fuchu']) + parseInt(res_data[i]['zhengke'])+parseInt(res_data[i]['fuke'])+parseInt(res_data[i]['other'])
                    // res_data[i]['shiji_num'] = parseInt(res_data[i]['zhengju_r']) + parseInt(res_data[i]['fuju_r']) + parseInt(res_data[i]['zhengchu_r']) + parseInt(res_data[i]['fuchu_r']) + parseInt(res_data[i]['zhengke_r'])+parseInt(res_data[i]['fuke_r'])+parseInt(res_data[i]['other_r'])
                    son_data.push(res_data[i])
                }
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
.ui.modal>.content{
    padding: 0 15px 15px 15px;
}
.ui.table {
    font-size: 13px;
}

.ui.table thead th {
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0, 0, 0, .87);
    padding: .92857143em .78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 500;
    text-transform: none;
    border-bottom: 1px solid rgba(34, 36, 38, .1);
    border-left: none;
}

.map {
    width: 100%;
    height: 400px;
}

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 15px 0
}

.vue2Table {
    /* margin: 20px; */
}

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}
.addListIcon .vtl{
    position: relative;
    /* padding-left: 26px; */
    cursor: pointer;
}
.addListIcon .vtl span{
    position: absolute;
    top: 5px;
    left: 10px;
}
.addListIcon .vtl-node-main{
    display: block;
}
.addListIcon .vtl-node-content{
    padding-left: 26px;
}
</style>
