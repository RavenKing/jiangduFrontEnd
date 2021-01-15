<template lang="html">
<wl-container>
    <div>
        <div>

            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>

        </div>
        <div class="filterBiaoDan">
            <sui-button basic color="green" content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>

        <sui-grid class="margin20">
            <sui-grid-row>
                <sui-grid-column :width="3" v-show="role==1">
                    <div class="filterBiaoDan">
                        <sui-input style="width:100%;padding-left:15px; margin-bottom:15px;" placeholder="搜索..." v-model="search" icon="search" v-on:change="search_unit_list()" />
                        <vue-tree-list class="addListIcon" :key="componentKey" @click="onClick" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                            <span class="icon" slot="addTreeNodeIcon"></span>
                            <span class="icon" slot="addLeafNodeIcon"></span>
                            <span class="icon" style="display:none" slot="leafNodeIcon">
                                <sui-icon name="home" />
                            </span>
                            <span class="icon" style="display:none" slot="treeNodeIcon">
                                <sui-icon name="building outline" /></span>
                        </vue-tree-list>
                    </div>
                </sui-grid-column>
                <sui-grid-column :width="13" v-show="clickColumn==true">
                    <sui-tab :menu="{ attached: false }">
                        <sui-tab-pane title="基本信息" :attached="false" :key="componentKey">
                            <div>
                                <form-create ref='FormCreate' :singleRoom="selectedRoom"></form-create>
                            </div>
                            <sui-modal-actions>
                                <div style="background: #F5F7FA; border-bottom-left-radius: .28571429rem; border-bottom-right-radius: .28571429rem; margin:0 -14px -14px -14px;   padding: 1rem 1rem;    border-top: 1px solid rgba(34,36,38,.15);    text-align: left;">
                                    <div v-show="selectedRoom.edit==true">
                                        <sui-button basic color="blue" @click="updateUnit" v-show="selectedRoom.edit == true">
                                            保存
                                        </sui-button>
                                    </div>
                                    <div v-show="selectedRoom.edit == false">
                                        <sui-button basic color="blue" @click="enableUpdateUnit" v-show="selectedRoom.edit == false">
                                            修改
                                        </sui-button>
                                    </div>
                                </div>
                            </sui-modal-actions>
                        </sui-tab-pane>
                        <sui-tab-pane title="办公用房信息">
                            <div>
                                <sui-button basic color="blue" content="新增" @click.native="createRoomModel" icon="add blue" v-show="role==1" />
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
                                        <span v-show="role!==1 && props.rowData.type1!=='租赁房屋'">
                                            <sui-button basic color="blue" content="维修" v-on:click="applyRepair(props.rowData)" />
                                        </span>
                                        <sui-button v-show="role==1" basic color="red" content="删除" v-on:click="deletefenpei(props.rowData)" />
                                        <sui-button basic color="blue" content="分配" v-on:click="assignLeader(props.rowData)" />

                                    </div>
                                </vuetable>
                            </div>

                            <div>
                                <sui-modal class="modal2" v-model="weixiuopen">
                                    <!-- <sui-modal-header style="border-bottom:0;">申请维修</sui-modal-header> -->
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
                                    <sui-modal-header>{{modelTitle}}</sui-modal-header>
                                    <sui-modal-content scrolling>
                                        <div>
                                            <form-fenpei ref='FormFenpei' :singleRoom="selectedfenpei"></form-fenpei>
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
                        <sui-tab-pane title="房间列表" :attached="false">
                            <div>
                                <!-- <sui-button basic color="blue" @click.native="assignLeader">
                                    新增
                                </sui-button> -->
                                <vuetable ref="vuetable" :api-mode="false" :data="lingdaoData" :fields="lingdaofields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div :class="props.rowData.status!=99?'center aligned':'' ">
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                        <sui-button basic color="red" content="删除" v-on:click="deleteleader(props.rowData)" v-if="props.rowData.room_rent_type" />
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                    </sui-tab>

                </sui-grid-column>

            </sui-grid-row>
        </sui-grid>

        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">{{modelTitle}}</sui-modal-header>
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
            <sui-modal class="modal2" v-model="leader.open" :componentKey="componentKey">
                <sui-modal-content scrolling>

                    <sui-grid :columns="2" relaxed="very">

                        <sui-grid-column :width="11">
                            <sui-statistic horizontal size="big">
                                <sui-statistic-value>
                                    {{assignList.selectedBuilding.name}}
                                </sui-statistic-value>
                            </sui-statistic>
                            <sui-statistic horizontal size="big">
                                <sui-statistic-value>
                                    {{assignList.selectedFloor.name}}
                                </sui-statistic-value>
                            </sui-statistic>
                            <img :src="assignList.selectedFloor.url" ref="backImage" v-show="false" />
                            <canvas ref="canvas" id="myCanvas" width="500" height="350" />

                        </sui-grid-column>
                        <sui-grid-column :width="4">
                            <div v-show="assignList.selectedRoom.type1 != '租赁房屋'">
                                <sui-list>
                                    <sui-list v-show="roomAssignmentTotal.length>0">
                                        <sui-list-item v-for="unit in roomAssignmentTotal" :key="unit[0]" v-show="unit.space>0">
                                            <div class="displayInline">
                                                <div class="yello" v-show="unit.type=='bangong'"></div>
                                                <div class="purple" v-show="unit.type=='fushu'"></div>
                                                <div class="redBand" v-show="unit.type=='leader'"></div>
                                                <div class="lvse" v-show="unit.type=='shebei'"></div>
                                                {{unit.text}} {{unit.space}}(m²)
                                            </div>
                                        </sui-list-item>
                                    </sui-list>
                                </sui-list>
                            </div>
                        </sui-grid-column>
                    </sui-grid>
                    <assign-keji :index="selectedRoomInFloorIndex" :singleEntry="selectedRoomInFloor" :assignEntry="selectedRoomInFloor.assign">
                    </assign-keji>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeLeaderModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="assignFloorDetail">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">{{modelTitle}}</sui-modal-header>
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
import store from "@/store";

import constants from "@/util/constants";
import FormCreate from "@/components/unit_basic_info";
import FormFenpei from "@/components/unit_fenpei_new";
import FormWeixiu from "@/components/unitweixiuForm";
import dialogBar from '@/components/MDialog'
import UnitForm from "@/components/unitForm";
import AssignKejiForm from "@/components/assignKejiForm"
import Vuetable from "vuetable-2/src/components/Vuetable";
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
    deleteRoomApi,
    getUnitApi,
    updateUnitApi,
    getUnitApiByid,
    getRentRoomDataApi,
    getRoomDataApi,
    createAssignmentApi,
    deleteBuildingFloorAssignmentApi,
    delleaderroomApi,
    createLeaderAssignApi,
    deleteRentRoomAssignmentApi,
    getBuildingFloorApi,
    getBuildingListApi,
    getFloorById,
    assignroomApi,
    assignRentRoomApi,
    getleaderroombyunitApi,
    getlistleaderroomApi,
    assignRoomDetailApi
} from "@/api/roomDataAPI";

import {
    createMRApi
} from "@/api/weixiuAPI";
export default {
    name: "MyVuetable",
    components: {
        VueTreeList,
        'dialog-bar': dialogBar,
        Vuetable,
        UnitForm,
        FormFenpei,
        FormCreate,
        FormWeixiu,
        'assign-keji': AssignKejiForm

    },
    data() {
        return {
            role: 0,
            source: [],
            loutree: new Tree([]),
            tree: new Tree([]),
            origin_tree_list: [],
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            fenpeiopen: false,
            unitid: 0,
            weixiuopen: false,
            deleteTarget: "",
            selectedRoomInFloorIndex: 0,
            loading: true,
            localData: [],
            rent_room_list: [],
            fenpeilocalData: [],
            lingdaoData: [],
            selectedWeixiu: {},
            deletetype: '',
            componentKey: 1,
            fields: FieldsDef,
            fenpeifields: FenpeiDef,
            lingdaofields: LingdaoDef,
            roomAssignment: [],
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
            clickColumn: false,
            data: [{
                id: "2",
                name: "租房子"
            }],
            leader: {
                open: false
            },
            // copied
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
                building_id: null,
                space: null
            },
            selectedBuildingID: null,
            selectedRoom: {
                name: "",
                edit: false
            },
            selectedfenpei: {
                unit: '',
                room: '',
                roomtype: '',
                roomname: '',
                ziyousource: [],
                rentroomoptions: []
            },
            leaderfenpei: {},
            assignList: {
                buildings: [],
                selectedBuilding: {},
                selectedFloor: {},
                selectedRoom: {}
            },
            listField: FieldsDefList,
            search: '',
            treeData: [],
            selectedRoomInFloor: {},
            roomAssignmentTotal: []

        };
    },

    methods: {

        // assignfloordetail
        assignFloorDetail() {
            this.loading = true;
            let data = this.selectedRoomInFloor;
            data.room_id = this.selectedRoomInFloor.id;
            data.building_id = this.assignForm.building_id;
            data.floor_id = this.leaderfenpei.floor_id;
            var dict = {};
            if (data.type != "领导办公室") {
                if (data.assign) {
                    dict = {
                        keji: data.assign.keji,
                        fukeji: data.assign.fukeji,
                        keyuan: data.assign.keyuan,
                        qita: data.assign.qita,
                        juji: data.assign.juji,
                        fujuji: data.assign.fujuji,
                        chuji: data.assign.chuji,
                        fuchuji: data.assign.fuchuji,
                        roomname: data.assign.roomname,
                        beizhu: data.assign.beizhu
                    }
                }
                data.detail = JSON.stringify(dict);
            } else if (data.type == "领导办公室") {
                if (data.assign) {
                    dict = {
                        keji: data.assign.keji,
                        fukeji: data.assign.fukeji,
                        keyuan: data.assign.keyuan,
                        qita: data.assign.qita,
                        roomname: data.assign.roomname,
                        beizhu: data.assign.beizhu

                    }
                }
                data.detail = JSON.stringify(dict);

            }
            assignRoomDetailApi(data).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    //contextF.drawRect(this.select);
                    notifySomething("分配成功", "分配成功", constants.typeSuccess);
                } else {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                }
            })
        },

        // kevin assgin rrom

        createAssignment() {
            this.loading = true;
            let data = this.selectedRoomInFloor;
            data.room_id = this.assignForm.room_id;
            data.building_id = this.assignForm.building_id;
            data.floor_id = this.assignForm.floor_id;
            data.id = "room" + this.selectedRoomInFloorIndex;
            console.log(JSON.stringify(data));
            if (this.roomAssignment == null || this.roomAssignment == {}) {
                this.roomAssignment = [];
            }
            var found = 0;
            this.roomAssignment.map((one) => {
                if (one.id == data.id) { //已经有了的话 直接更新
                    one = data;
                    found = 1;
                }
            })
            if (found == 0) {
                this.roomAssignment.push(data);
            }
            if (this.roomAssignment.length == 0) {
                this.roomAssignment.push(data); //没有塞进去

            }
            var contextF = this;

            if (this.assignList.selectedRoom.type1 == '租赁房屋') {
                console.log(this.selectedRoomInFloor)
                console.log(this.selectedRoom)
                var payload = {
                    room_id: this.selectedRoomInFloor.data.room_id,
                    room: this.selectedRoomInFloor.roomnumber,
                    unit_id: this.selectedRoom.id,
                    leader: this.selectedRoomInFloor.leader,
                    space: this.selectedRoomInFloor.space,
                    room_type: 2

                }
                this.loading = true;
                createLeaderAssignApi(payload).then((result) => {
                    this.loading = false;
                    this.selectedRoomInFloor = {}
                    if (result.data.code == 0) {
                        this.leader.open = false;
                        notifySomething("创建成功", "创建领导分配成功", "success");
                        this.refreshLeaderAssignment(this.selectedRoom.id);

                    }
                }).catch(() => {
                    this.loading = false;
                    notifySomething("创建失败", "创建失败", "Error")
                });
            } else {
                createAssignmentApi({
                    assignment: JSON.stringify(this.roomAssignment),
                    id: this.assignList.selectedFloor.floor_id
                }).then((result) => {
                    this.loading = false;
                    if (result.data.code == 0) {
                        //contextF.drawRect(this.select);
                        notifySomething("分配成功", "分配成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    contextF.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        onClickLou(params) {
            this.tabChange();
            if (params.floor_id == undefined) {
                this.assignList.selectedBuilding = params;
                this.assignList.selectedFloor = {
                    url: ""
                };
                this.roomAssignment = [];
            } else {
                this.assignList.selectedFloor = params;
                getFloorById({
                    floor_id: params.floor_id
                }).then((result) => {
                    if (result.data.code == 0) {
                        this.assignList.selectedFloor.url = constants.fileURL + result.data.data.cadfile;
                        if (this.context) {
                            this.context.clearRect(0, 0, 500, 350);
                        }
                        this.drawRect(result.data.data);
                    }
                })
                this.treeData.map((building) => {
                    if (building.id == params.pid) {
                        this.assignList.selectedBuilding = building;
                    }
                })
            }
        },
        openAssignSection(rowData) {
            this.assignList.selectedRoom = rowData;
            this.modalMode = "edit";
            // point 
            this.loading = true;
            // this.tree = new Tree([]);
            this.assignList.selectedBuilding = false;
            this.assignList.selectedFloor = {
                url: ""
            };

            this.loading = false;
            if (rowData.type1 == '自有房屋') {
                this.onClickLou(rowData);
            }
            //this.getBuildingSection();

        },
        getBuildingSection() {
            let data = {};
            data.room_id = this.assignList.selectedRoom.room_id;
            var context = this;
            // get room
            getBuildingListApi(data).then((result) => {
                this.loading = false;
                this.assignList.selectedFloor = {
                    url: ""
                };
                this.assignList.selectedBuilding = {
                    name: ""
                };
                //get floor
                this.assignList.buildings = [];
                this.assignList.buildings = result.data.data;
                let root = [];
                this.assignList.buildings.map((building) => {
                    building.building_id = building.id;
                    building.pid = 0;
                    building.dragDisabled = true;
                    building.addTreeNodeDisabled = true;
                    building.addLeafNodeDisabled = true;
                    building.editLeafNodeDisabled = true;
                    building.delLeafNodeDisabled = true;
                    building.editNodeDisabled = true;
                    building.delNodeDisabled = false;
                    building.children = [];
                    root.push(building);
                    this.getBuildingFloorSection(building);
                })
                if (this.assignList.buildings.length > 0) {
                    this.selectedBuildingID = this.assignList.buildings[0].id;
                }
                this.treeData = root;
                this.assignList.open = true;
                // this.ComponentKey++;
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        getBuildingFloorSection(building) {
            var data = {
                building_id: building.id
            }
            var context = this;
            //console.log(data);
            getBuildingFloorApi(data).then((result) => {
                building.floors = result.data.data;
                building.floors.map((floor) => {
                    floor.pid = building.id;
                    floor.isLeaf = true;
                    floor.floor_id = floor.id;
                    floor.disabled = true;
                    building.children.push(floor)
                })
                this.loutree = new Tree(this.treeData);
                // this.drawRect()
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        tabChange() {
            this.context = this.$refs.canvas.getContext("2d");
            if (this.context == undefined) {
                setTimeout(this.tabChange, 1000)
            }

        },
        drawRect(info) {
            var tmpSum = {
                bangong: 0,
                fushu: 0,
                leader: 0,
                shebei: 0,
                qita: 0
            }
            if (this.context == null || this.context == undefined) {
                this.context = this.$refs.convas.getContext("2d");
            }
            this.roomAssignment = [];
            if (info.room_detail != null) {
                var zuobiao = JSON.parse(info.room_detail);
                this.roomInFloor = zuobiao;
                if (info.room_detail != null) {
                    this.roomAssignment = JSON.parse(info.room_detail);
                    if (Object.keys(this.roomAssignment).length === 0 && this.roomAssignment.constructor === Object) {
                        this.roomAssignment = [];
                    }
                    var spaceObject = JSON.parse(info.room_space);
                    var spaceArray = [];
                    for (var name in spaceObject) {
                        console.log(name);
                        spaceArray.push({
                            room: name,
                            space: spaceObject[name]
                        });
                    }
                    //get assign info  
                    var assignObject = JSON.parse(info.room_assign);
                    var assignArray = [];
                    if (assignObject != null) {
                        for (var roomNew in assignObject) {
                            console.log(roomNew);
                            assignArray.push({
                                room: roomNew,
                                assign: JSON.parse(assignObject[roomNew])
                            });
                        }
                    }
                    this.roomAssignment.map((one, index) => {
                        //assign info 
                        for (var ij = 0; ij < assignArray.length; ij++) {
                            one.id = "room" + index;
                            if (assignArray[ij].room == "room" + index) {
                                one.assign = assignArray[ij].assign;
                            }
                        }
                        //space info
                        for (var i = 0; i < spaceArray.length; i++) {
                            one.id = "room" + index;
                            if (spaceArray[i].room == "room" + index) {
                                one.space = spaceArray[i].space;
                                switch (one.type) {
                                    case "bangong":
                                        tmpSum.bangong += parseInt(one.space);
                                        break;
                                    case "fushu":
                                        tmpSum.fushu += parseInt(one.space);
                                        break;
                                    case "leader":
                                        tmpSum.leader += parseInt(one.space);
                                        break;
                                    case "shebei":
                                        tmpSum.shebei += parseInt(one.space);
                                        break;
                                    case "qita":
                                        tmpSum.qita += parseInt(one.space);
                                        break;
                                }
                            }
                        }
                    });
                }
            }
            this.roomAssignment.map((one, index) => {
                one.id = "room" + index;
                one.roomnumber = "房间" + index;
            })
            console.log(this.roomAssignment);
            this.roomAssignmentTotal = [{
                    type: "bangong",
                    space: tmpSum.bangong,
                    text: "办公"
                },
                {
                    type: "fushu",
                    space: tmpSum.fushu,
                    text: "附属"
                },
                {
                    type: "leader",
                    space: tmpSum.leader,
                    text: "领导"
                },
                {
                    type: "shebei",
                    space: tmpSum.shebei,
                    text: "设备"
                },
                {
                    type: "qita",
                    space: tmpSum.qita,
                    text: "qita"
                }
            ]
            this.context.strokeStyle = "#FFFFFF";
            if (zuobiao != null) {
                var img = this.$refs.backImage;
                img = new Image();
                img.src = this.assignList.selectedFloor.url;
                // var that =this;
                img.onload = () => {
                    this.context.globalAlpha = 1;
                    this.context.drawImage(img, 0, 0, 500, 350)
                    zuobiao.map((room, index) => {
                        // console.log(room)
                        // this.context.beginPath();
                        // this.context.moveTo(
                        //     room["room" + index][0], room["room" + index][1]);
                        // this.context.lineTo(room["room" + index][2], room["room" + index][3]);
                        var textDraw = true;
                        if (this.roomAssignment.length != null) {
                            this.roomAssignment.map((one) => {
                                if (one.id == "room" + index) {
                                    this.roomAssignment.roomnumber = "房间" + index;
                                    this.context.globalAlpha = 1;
                                    this.context.strokeText(one.roomnumber, room["room" + index][0] + (room["room" + index][2] / 3), room["room" + index][1] + (room["room" + index][3] / 2));
                                    textDraw = false;
                                }
                            })
                        }
                        if (textDraw) {
                            this.context.globalAlpha = 1;
                            this.context.strokeText("房间" + index, room["room" + index][0] + (room["room" + index][2] / 2), room["room" + index][1] + (room["room" + index][3] / 2));
                        }
                        this.context.globalAlpha = 0;
                        this.context.strokeRect(room["room" + index][0], room["room" + index][1], room["room" + index][2], room["room" + index][3])
                    });
                }

            } else {
                this.context.clearRect(0, 0, 500, 350);
            }

            var canvas = this.$refs.canvas;
            var contextThis = this;
            this.$refs.canvas.addEventListener('click', function (event) {
                var rect = canvas.getBoundingClientRect();
                //2
                //contextThis.context.drawImage(contextThis.$refs.backImage, 0, 0, 500, 350)
                var x = event.clientX - rect.left * (500 / rect.width);
                var y = event.clientY - rect.top * (350 / rect.height);
                console.log("x:" + x + ",y:" + y);
                contextThis.whereIsTheRoom(x, y, contextThis)
                // contextThis.context.clearRect(0, 0, 500, 350);

                contextThis.openAssignModalNew(contextThis.assignList.selectedBuilding, contextThis.assignList.selectedFloor, contextThis)
            }, false);

        },
        openAssignModalNew(building, floor, context) {

            context.assignForm.room_id = building.room_id;
            context.assignForm.building_id = building.id;
            context.assignForm.floor_id = floor.id;
            //TODO floor_id
            context.assignForm.open = true;
            context.assignList.open = false;
        },
        whereIsTheRoom(x, y, context) {
            const checkZuoBiao = {
                x: x,
                y: y
            };
            context.roomInFloor.map((room, index) => {
                var leftCornor = {
                    x: room["room" + index][0],
                    y: room["room" + index][1]
                }; //左上坐标
                var rightCornor = {
                    x: room["room" + index][0] + room["room" + index][2],
                    y: room["room" + index][1]
                };
                var leftDown = {
                    x: room["room" + index][0],
                    y: room["room" + index][1] + room["room" + index][3]
                }
                var rightDown = {
                    x: room["room" + index][0] + room["room" + index][2],
                    y: room["room" + index][1] + room["room" + index][3]
                }
                if (context.withinZuobiao(checkZuoBiao, leftCornor, rightCornor, leftDown, rightDown)) {
                    context.selectedRoomInFloor = {};
                    context.selectedRoomInFloorIndex = index;
                    context.roomAssignment.map((one) => {
                        if (one.id == "room" + index) {
                            context.selectedRoomInFloorIndex = index;
                            context.selectedRoomInFloor = one;
                        }
                    });
                    switch (room.type) {
                        case "bangong":
                            context.selectedRoomInFloor.type = "办公"
                            break;
                        case "yewu":
                            context.selectedRoomInFloor.type = "业务"
                            break;
                        case "fushu":
                            context.selectedRoomInFloor.type = "附属"
                            break;
                        case "leader":
                            context.selectedRoomInFloor.type = "领导办公室"
                            break;
                        default:
                            break;
                    }
                }
                if (context.selectedRoomInFloor.assign == undefined) {
                    context.selectedRoomInFloor.assign = {};
                }
            });
        },
        withinZuobiao(checkZuoBiao, leftCornor, rightCornor, leftDown, rightDown) {

            if (checkZuoBiao.x >= leftCornor.x && checkZuoBiao.y <= rightDown.y) {
                if (checkZuoBiao.x <= rightCornor.x && checkZuoBiao.y >= rightCornor.y) {
                    return true;
                }
                return false;
            }
            return false;
        },
        //end of assign room

        search_unit_list() {
            console.log(this.search)
            var keyword = this.search
            var filtered_tree_list = []
            console.log(this.origin_tree_list)
            this.tree = new Tree(this.origin_tree_list)
            for (var i = this.tree.children.length - 1; i >= 0; i--) {
                var name = this.tree.children[i]['name']
                console.log(name)
                if (name.indexOf(keyword) != -1) {
                    filtered_tree_list.push(this.tree.children[i])
                    continue
                }
                var children_list = this.tree.children[i]['children']
                for (var j = children_list.length - 1; j >= 0; j--) {
                    var children_name = children_list[j]['name']
                    if (children_name.indexOf(keyword) != -1) {
                        filtered_tree_list.push(this.tree.children[i])
                        break
                    }
                }
            }
            filtered_tree_list = filtered_tree_list.reverse()
            this.tree = new Tree(filtered_tree_list)
        },
        closeLeaderModal() {
            if (this.context) {
                // this.context.clearRect(0, 0, 500, 350);
            }
            this.leader.open = false;
        },
        createLeaderAssign() {
            var room_type = 1
            if (this.leaderfenpei.type1 == '租赁房屋') {
                room_type = 2
            }

            var payload = {
                room_id: this.leaderfenpei.room_id,
                building_id: this.leaderfenpei.building_id,
                floor_id: this.leaderfenpei.floor_id,
                unit_id: this.selectedRoom.id,
                leader: this.selectedfenpei.leader,
                room: this.$refs.LeaderForm.singleRoom.room,
                space: this.$refs.LeaderForm.singleRoom.space,
                room_type: room_type
            }
            console.log(payload)
            this.loading = true;
            createLeaderAssignApi(payload).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.leader.open = false;
                    notifySomething("创建成功", "创建领导分配成功", "success");
                    this.refreshLeaderAssignment(this.selectedRoom.id);
                }
            }).catch(() => {
                this.loading = false;
                notifySomething("创建失败", "创建失败", "Error")
            });
        },
        createShenbao() {
            this.loading = true;
            console.log(this.selectedWeixiu)
            createMRApi(this.selectedWeixiu).then(() => {
                this.loading = false;
                this.closeWeiXiuForm();
                notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });

        },
        assignLeader(data) {
            this.leaderfenpei = data
            this.selectedRoomInFloor['data'] = data
            this.leader.open = true;
            this.openAssignSection(data);
        },
        //tree
        onDel(node) {
            console.log(node)
            this.deleteBuilding(node);
        },

        onChangeName(params) {
            console.log(params)
        },
        closeWeiXiuForm() {
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
            if (params.isLeaf == true) {
                this.clickColumn = true;
                getUnitApiByid(params.id).then((data) => {
                    var res_data = data.data.data['building_info']
                    for (var i = res_data.length - 1; i >= 0; i--) {
                        if (res_data[i]['type1'] == 'self')
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
            } else {
                this.clickColumn = false;
                this.fenpeilocalData = [];
                this.lingdaoData = [];

            }

        },

        refreshLeaderAssignment(id) {
            var input = {}
            input['unit_id'] = id
            getleaderroombyunitApi(input).then((data) => {
                console.log(input)
                this.loading = false;
                var res_data = data.data.data
                console.log(res_data)
                var lingdao_list = []
                for (var i = res_data.length - 1; i >= 0; i--) {
                    var out_room_name = res_data[i]['room_name']
                    var room_assign = res_data[i]['room_assign']
                    var building_name = res_data[i]['building_name']
                    var floor_name = res_data[i]['floor_name']
                    var room_details = res_data[i]['room_detail']
                    for (var j = room_assign.length - 1; j >= 0; j--) {
                        room_assign[j]['building_name'] = building_name
                        room_assign[j]['floor_name'] = floor_name

                        var room_id = room_assign[j]['id']
                        var room_type = ''
                        for (var k = room_details.length - 1; k >= 0; k--) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (room_details[k].hasOwnProperty(room_id)) {
                                room_type = room_details[k]['type']
                            }
                        }
                        if (room_type == 'yewu') {
                            room_type = '业务'
                        }
                        if (room_type == 'bangong') {
                            room_type = '办公'
                        }
                        if (room_type == 'shebei') {
                            room_type = '设备'
                        }
                        if (room_type == 'fushu') {
                            room_type = '附属'
                        }
                        room_assign[j]['room_type'] = room_type
                        room_assign[j]['out_room_name'] = out_room_name
                        lingdao_list.push(room_assign[j])

                    }

                }

                getlistleaderroomApi(this.selectedRoom.id).then((data) => {
                    this.loading = false;
                    var rent_room = data.data.data
                    console.log('leader room')
                    for (var k = rent_room.length - 1; k >= 0; k--) {
                        rent_room[k]['out_room_name'] = rent_room[k]['room_name']
                        rent_room[k]['roomnumber'] = rent_room[k]['room']
                        rent_room[k]['room_rent_type'] = true
                    }

                    lingdao_list = lingdao_list.concat(rent_room)
                    console.log(lingdao_list)
                    this.lingdaoData = {
                        total: 16,
                        per_page: 5,
                        current_page: 1,
                        last_page: 4,
                        next_page_url: "data.data.data?page=2",
                        prev_page_url: null,
                        from: 1,
                        to: 5,
                        data: lingdao_list
                    }

                })

            })

        },
        refreshFenpei(id) {
            console.log('refresh fenpei')
            getUnitApiByid(id).then((data) => {
                var res_data = data.data.data['building_info']
                for (var i = res_data.length - 1; i >= 0; i--) {
                    if (res_data[i]['type1'] == 'self')
                        res_data[i]['type1'] = '自有房屋'
                    else
                        res_data[i]['type1'] = '租赁房屋'
                }
                console.log(res_data)
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
                console.log(this.deleteTarget)
                if (this.deleteTarget.type1 == '租赁房屋') {
                    console.log('租赁房屋')
                    deleteRentRoomAssignmentApi(input).then(() => {
                        getUnitApiByid(this.selectedRoom.id).then((data) => {
                            var res_data = data.data.data['building_info']
                            for (var i = res_data.length - 1; i >= 0; i--) {
                                if (res_data[i]['type1'] == 'self')
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

                } else {
                    deleteBuildingFloorAssignmentApi(input).then(() => {
                        getUnitApiByid(this.selectedRoom.id).then((data) => {
                            var res_data = data.data.data['building_info']
                            for (var i = res_data.length - 1; i >= 0; i--) {
                                if (res_data[i]['type1'] == 'self')
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
            console.log(this.deleteTarget)
            this.deleteTarget.text = "是否要删除";
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
                for (i = parent_data.length - 1; i >= 0; i--) {
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
                    for (j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == parent_data[i]["id"])
                            filtered_data.push(son_data[j])
                    }
                }
                for (i = 0; i < filtered_data.length; i++) {
                    if (filtered_data[i]['kind'] == '1') {
                        filtered_data[i]['kind'] = '机关单位'
                    }
                    if (filtered_data[i]['kind'] == '2') {
                        filtered_data[i]['kind'] = '事业单位'
                    }
                    if (filtered_data[i]['kind'] == '3') {
                        filtered_data[i]['kind'] = '参公单位'
                    }
                }

                this.loading = false;
                this.localData = {
                    data: filtered_data
                }
            });
        },
        createRoomModel() {
            this.modelTitle = "单位新增房屋"
            this.modalMode = "create";
            this.fenpeiopen = true;
        },

        applyRepair(data) {
            console.log(data)
            this.selectedWeixiu = data
            this.weixiuopen = true
        },

        updateUnit() {
            let formdata = this.$refs.FormCreate.singleRoom;
            console.log(this.$refs.FormCreate.singleRoom)
            delete formdata.parent
            delete formdata.building_info
            delete formdata.pid
            var short_name = formdata['name']
            formdata['name'] = formdata['realname']

            updateUnitApi(formdata).then((result) => {
                if (result.data.code == 0) {
                    notifySomething("保存成功", "基本信息保存成功", "success");
                    formdata['name'] = short_name

                } else {
                    notifySomething("保存失败", "基本信息保存失败", "Error")
                    formdata['name'] = short_name
                }

                this.loading = true;
                this.selectedRoom.edit = false
                this.loading = false;
            });

        },

        enableUpdateUnit() {
            this.loading = true;
            this.selectedRoom.edit = true;
            this.loading = false;

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
            var fenpei_data = this.$refs.FormFenpei.fenpei_data
            console.log('newfenpei')
            var value_list = []
            for (var i = fenpei_data.length - 1; i >= 0; i--) {
                value_list.push({
                    'building_id': fenpei_data[i].building_id,
                    'floor_id': fenpei_data[i].floor_id,
                    'space': parseInt(fenpei_data[i].space)
                })
            }

            if (this.selectedfenpei.roomtype == '1') {
                var input = {}
                input['room_id'] = this.selectedfenpei.room_id
                input['unit_id'] = this.selectedRoom.id
                input['valuelist'] = JSON.stringify(value_list)

                console.log(input)
                assignroomApi(input).then((data) => {
                    if (data.data.code == 0) {
                        notifySomething("分配成功", "创建领导分配成功", "success");
                        this.refreshFenpei(this.selectedRoom.id);
                        this.fenpeiopen = false;
                    } else {
                        notifySomething("分配失败", "创建领导分配失败", "fail");
                        this.refreshFenpei(this.selectedRoom.id);
                        this.fenpeiopen = false;
                    }

                })
            }
            if (this.selectedfenpei.roomtype == '2') {
                input = {}
                // console.log(this.selectedfenpei)
                input['room_id'] = this.selectedfenpei.room_id
                input['unit_id'] = this.selectedRoom.id
                input['type'] = 2
                input['space'] = parseInt(this.$refs.FormFenpei.rentspace)
                // var rent_list = [{
                //     'space': parseInt(this.$refs.FormFenpei.rentspace),
                //     'building_id': 0,
                //     'floor_id': 0,
                // }]
                // input['valuelist'] = JSON.stringify(rent_list)
                console.log(input)
                assignRentRoomApi(input).then((data) => {
                    if (data.data.code == 0) {
                        notifySomething("分配成功", "创建领导分配成功", "success");
                        this.refreshFenpei(this.selectedRoom.id);
                        this.fenpeiopen = false;
                    } else {
                        notifySomething("分配失败", "创建领导分配失败", "fail");
                        this.refreshFenpei(this.selectedRoom.id);
                        this.fenpeiopen = false;
                    }
                    // console.log(data)
                })
            }

        }

    },
    created() {
        this.role = localGet("role");
        this.unitid = localGet('unit_id')

        var fenpei_options = []

        getRentRoomDataApi({}).then((data) => {
            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                fenpei_options.push({
                    text: res_data[i]['roomname'],
                    value: res_data[i]['id']
                })
            }
            this.selectedfenpei['rentroomoptions'] = fenpei_options
            console.log('selectedfenpei')
            console.log(fenpei_options)
        })

        var ziyou_source = []
        getRoomDataApi({}).then((data) => {
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
            console.log('ziyou_source')
            console.log(ziyou_source)
            // this.selectedfenpei['ziyouroomoptions'] = rent_options
        })

        var tree_list = [];
        if (store.getters.unit.unit.length > 0) {
            this.loading = false;
            this.tree = new Tree(store.getters.unit.unit);
            return;

        }
        //store.getters.unit.unit=[];
        //tree_list=;
        //console.log(tree_list.length);

        if (this.role == 2) {
            getUnitApiByid(this.unitid).then((data) => {
                this.selectedRoom = data.data.data
                this.selectedRoom['realname'] = this.selectedRoom['name']
                this.selectedRoom['edit'] = false
                this.selectedRoom['bianzhi_num'] = parseInt(this.selectedRoom['zhengju']) + parseInt(this.selectedRoom['fuju']) + parseInt(this.selectedRoom['zhengchu']) + parseInt(this.selectedRoom['fuchu']) +
                    parseInt(this.selectedRoom['zhengke']) + parseInt(this.selectedRoom['fuke']) + parseInt(this.selectedRoom['other'])
                this.selectedRoom['shiji_num'] = parseInt(this.selectedRoom['zhengju_r']) + parseInt(this.selectedRoom['fuju_r']) + parseInt(this.selectedRoom['zhengchu_r']) + parseInt(this.selectedRoom['fuchu_r']) +
                    parseInt(this.selectedRoom['zhengke_r']) + parseInt(this.selectedRoom['fuke_r']) + parseInt(this.selectedRoom['other_r'])
                var res_data = data.data.data['building_info']
                for (var i = res_data.length - 1; i >= 0; i--) {
                    if (res_data[i]['type1'] == 'self')
                        res_data[i]['type1'] = '自有房屋'
                    else
                        res_data[i]['type1'] = '租赁房屋'
                }
                this.fenpeilocalData = {
                    data: res_data
                }
            })
            this.refreshLeaderAssignment(this.unitid);
        }

        if (this.role == 1) {
            getUnitApi().then((data) => {
                var res_data = data.data.data
                console.log(res_data)
                var parent_data = []
                var son_data = []
                var filtered_data = []
                this.selectedfenpei['unitoptions'] = []
                for (var i = res_data.length - 1; i >= 0; i--) {
                    res_data[i]['bianzhi_num'] = 0
                    res_data[i]['shiji_num'] = 0
                    res_data[i]['edit'] = false
                    if (res_data[i]['seq_code'] == '18') {
                        console.log(res_data[i])
                    }
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
                        son_data.push(res_data[i])
                    }
                    this.selectedfenpei['unitoptions'].push({
                        'text': res_data[i]['name'],
                        'value': res_data[i]['id']
                    })
                }
                for (i = parent_data.length - 1; i >= 0; i--) {
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
                    for (j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == parent_data[i]["id"])
                            filtered_data.push(son_data[j])
                    }
                }

                for (i = 0; i < filtered_data.length; i++) {
                    filtered_data[i]['realname'] = filtered_data[i]['name']
                    filtered_data[i]['name'] = filtered_data[i]['seq_code'] + '.' + filtered_data[i]['shortname']
                    filtered_data[i]['edit'] = false
                    if (filtered_data[i]['kind'] == '机关单位') {
                        filtered_data[i]['kind'] = '1'
                    }
                    if (filtered_data[i]['kind'] == '事业单位') {
                        filtered_data[i]['kind'] = '2'
                    }
                    if (filtered_data[i]['kind'] == '参公单位') {
                        filtered_data[i]['kind'] = '3'
                    }

                    if (filtered_data[i]["status"] == 99) {
                        var paraent_node = {}
                        paraent_node["name"] = filtered_data[i]["name"]
                        paraent_node["id"] = filtered_data[i]["id"]
                        paraent_node["seq_code"] = filtered_data[i]["seq_code"]
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

                tree_list = tree_list.sort(function (a, b) {
                    return parseInt(a['seq_code']) - parseInt(b['seq_code'])
                });
                store.dispatch("unit/setUnit", tree_list);
                this.origin_tree_list = tree_list
                this.tree = new Tree(tree_list)
                this.loading = false;
                this.localData = {
                    data: filtered_data
                }
            });
        }
    }

};
</script>

<style>
.ui.disabled.input,
.ui.input:not(.disabled) input[disabled] {
    opacity: 1 !important;
    color: black !important;
}

.ui.positive.button {
    background-color: #75ADBF !important;
}

.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
}

.ui.modal .content {
    padding: 15px;
    box-sizing: border-box;
}

.ui.table {
    font-size: 13px;
}

.width800 {
    width: 800px;
}

.ui.table thead th {
    cursor: auto;
    background: #F5F7FA;
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
    margin: 0 0 15px 0
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

.addListIcon {
    overflow-y: auto;
    max-height: 700px;
    background: #f9f9f9;
}

.addListIcon .vtl {
    position: relative;
    /* padding-left: 26px; */
    cursor: pointer;
}

.addListIcon .vtl span {
    /* position: absolute;
    top: 5px;
    left: 10px; */
    float: left;
    margin-left: 10px !important;
}

.addListIcon .vtl-node-main {
    display: block;
}

.addListIcon .vtl-node-content {
    padding-left: 20px;
}

.addListIcon .vtl-tree-margin .vtl-node-content {
    padding-left: 35px;
}

.ui.modal .scrolling.content {
    max-height: none !important;
}

.addListIcon .vtl-node-main .vtl-caret {
    margin: 0;
}

.addListIcon .vtl-tree-margin {
    margin: 0;
}

.yello {
    background-color: #E6A23C;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.purple {
    background-color: purple;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.redBand {
    background-color: red;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.lvse {
    background-color: rgb(0, 255, 200);
    width: 10px;
    height: 10px;
    display: inline-block;
}

.displayInline {
    display: inline;

}
</style>
