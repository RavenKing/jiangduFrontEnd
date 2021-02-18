<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan" style="padding-left:15px;margin:0;">

            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="12">
                        <sui-form>
                            <sui-form-fields inline>
                                <label> 产证面积</label>
                                <sui-form-field>
                                    <sui-input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                                </sui-form-field>
                                <label> 至</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="搜索" v-on:click="submit" />
                            </sui-form-fields>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:0">
                        <div style="float:right;">
                            <sui-button basic color="blue" content="新建" @click.native="createRoomModel" icon="add blue" />
                            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
                            <sui-button basic color="green" content="导出" v-on:click="exportToExcel" icon="file green" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <!-- <sui-button basic color="blue"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button basic color="blue" content="修改" v-on:click="viewSomeThing(props.rowData)" />
                    <sui-button basic color="red" content="删除" v-on:click="deleteRoom(props.rowData)" />

                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div>
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal v-model="exportData.open" class="modal2">
                <sui-modal-header style="border-bottom:0;">导出选择</sui-modal-header>
                <sui-modal-content image>
                    <sui-form>
                        <sui-form-fields grouped>
                            <label>选择导出</label>
                            <sui-form-field>
                                <sui-checkbox label="办公" radio value="1" v-model="exportData.kind" />
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox label="经营" radio value="2" v-model="exportData.kind" />
                            </sui-form-field>
                            <sui-form-field>
                                <sui-checkbox label="全部" radio value="0" v-model="exportData.kind" />
                            </sui-form-field>
                        </sui-form-fields>
                    </sui-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModalExport">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="openExportUrl">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="imageModal" v-model="buildingImage.open" :key="imgeComponentKey">
                <sui-modal-header style="border-bottom:0;"> </sui-modal-header>
                <sui-modal-content scrolling image>
                    <sui-item-group divided>
                        <div>
                            <sui-message>
                                <sui-message-header>注意</sui-message-header>
                                <sui-message-list>
                                    <sui-message-item v-show="buildingImage.notification">
                                        上传后会覆盖原有图层并清除所有信息
                                    </sui-message-item>
                                    <sui-message-item>
                                        上传尺寸应为 500 X 350px
                                    </sui-message-item>
                                </sui-message-list>
                            </sui-message>
                        </div>
                        <sui-item class="imageModal">

                            <!-- <pdf :src="this.assignList.selectedFloor.url"  /> -->
                        </sui-item>
                        <sui-item>
                            <input type="file" placeholder="上传Cad图" @change="uploadFile" />
                        </sui-item>

                    </sui-item-group>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeImageModal">
                        取消
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="buildingForm.open">
                <sui-modal-content image>
                    <building-form ref='formComponentBuilding'></building-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="createBuilding">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modal2" v-model="assignList.open">
                <sui-modal-content scrolling class="modalStep">
                    <div>
                        <sui-tab :menu="{ attached: false }" :active-index.sync="defaultTab">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <rentroom-form :clickDingWei="clickDingWei" :singleRoom="selectedRoom"></rentroom-form>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="合同信息" :attached="false">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader content="Loading..." />
                                </sui-dimmer>
                                <div>
                                    <!-- <sui-dropdown placeholder="选择合同(默认最新)" selection :options="listContract" v-model="selectedRoomContract.id" @input="changeContract" /> -->
                                    <!-- <sui-button basic color="blue" @click="changeMode">编辑</sui-button> -->
                                    <div v-show="selectedRoomContract.mode!='initial'">
                                        <contract-form style="margin-top:15px;" :singleEntry="selectedRoomContract" :mianji="selectedRoom.value" :disabled="false"></contract-form>
                                    </div>
                                    <div>
                                        <!-- <sui-button content="创建新合同" v-on:click="emptyRentContract()" /> -->
                                        <!-- <sui-button content="保存" v-on:click="createRentContract()" /> -->
                                    </div>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="使用单位" :attached="false" :disabled="!editMode" :key="componentFenpeikey">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader content="Loading..." />
                                </sui-dimmer>
                                <sui-form :warning="validationCheck.status=='warning'">
                                    <sui-message warning>
                                        <sui-message-header>{{validationCheck.header}}</sui-message-header>
                                        <p>
                                            {{validationCheck.text}}
                                        </p>
                                    </sui-message>
                                    <sui-form-fields inline>
                                        <sui-form-field required :error="validationCheck.unit_id" class="width300">
                                            <model-select :options="unitoptions" v-model="selectedRoom.unit_id" placeholder="选择单位" @input="changeUnit">
                                            </model-select>
                                        </sui-form-field>
                                        <sui-form-field required :error="validationCheck.space">
                                            <sui-input placeholder="输入面积" v-model="selectedRoom.space_assign" type="number" />
                                        </sui-form-field>
                                        <sui-button basic color="blue" icon="add" content="添加单位" @click.prevent="assignRentRoom()" />
                                    </sui-form-fields>
                                </sui-form>
                                <div v-show="newXuncha.open">
                                    <sui-form>
                                        <sui-form-fields inline>
                                            <label>巡查人</label>
                                            <sui-form-field required>
                                                <sui-input placeholder="巡查人" v-model="newXuncha.name" />
                                            </sui-form-field>
                                            <label>备注</label>
                                            <sui-form-field required>
                                                <sui-input placeholder="备注" v-model="newXuncha.memo" />
                                            </sui-form-field>
                                            <sui-button basic color="blue" icon="add" content="添加" @click.prevent="createPatrol()" />
                                        </sui-form-fields>
                                    </sui-form>
                                </div>
                                <div class="vue2Table">
                                    <vuetable ref="vuetable" :api-mode="false" :data="selectedRoom.assignList" :fields="fieldsAssign" data-path="data" :key="componentAssignListkey">
                                        <div slot="action" slot-scope="props">
                                            <!-- <sui-button basic color="blue"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                                            <sui-button basic color="red" content="删除" v-on:click="deleteRoomAssign(props.rowData)" />
                                            <sui-button basic color="blue" content="巡查" v-on:click="showPatrol(props.rowData)" />
                                        </div>
                                    </vuetable>
                                </div>
                            </sui-tab-pane>
                            <!-- <sui-tab-pane title="巡查记录" v-show="false">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader content="Loading..." />
                                </sui-dimmer>
                                <div class="vue2Table">
                                    <vuetable ref="vuetable" :api-mode="false" :data="selectedRoom.patrol" :fields="fieldsPatrol" data-path="data" :key="componentAssignListkey">
                                        <div slot="action" slot-scope="props">
                                            <sui-button basic color="blue"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" />
                                            <sui-button basic color="red" content="删除" v-on:click="deleteRoomPatrol(props.rowData)" />
                                        </div>
                                    </vuetable>
                                </div>
                            </sui-tab-pane> -->
                            <sui-tab-pane title="地图定位" :attached="false" :disabled="!editMode">
                                <div class="imageForm">
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
                                            <!-- <label>地址</label>
                                            <sui-form-field>
                                                <sui-input type="text" placeholder="输入地址" v-model="keyword" />
                                            </sui-form-field> -->
                                        </sui-form-fields>
                                    </sui-form>
                                </div>
                                <baidu-map class="map" :center="point" :zoom="15">
                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                                    </bm-marker>
                                    <bm-local-search :keyword="keyword" :auto-viewport="true" location="上海" @markersset="setFirstPoint"></bm-local-search>
                                </baidu-map>
                            </sui-tab-pane>
                            <sui-tab-pane title="房屋面积" :attached="false" style="max-height:600px;overflow-y: auto;">
                                <mianji-form ref='mianjiForm' :singleRoom="selectedRoom"></mianji-form>
                            </sui-tab-pane>
                            <sui-tab-pane title="楼层管理" :attached="false" :disabled="selectedRoom.kind==2">
                                <sui-button basic color="blue" @click.native="openBuildingModal">
                                    新增
                                </sui-button>
                                <sui-grid :columns="3" relaxed="very">
                                    <sui-grid-column :width="4">
                                        <div>
                                            <vue-tree-list @click="onClick" @changeName="onChangeName" @delete-node="onDel" @add-node="onAddNode" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                                                <span class="icon" slot="leafNodeIcon">
                                                </span>
                                                <span class="icon" slot="treeNodeIcon">
                                                </span>
                                            </vue-tree-list>
                                        </div>
                                    </sui-grid-column>
                                    <sui-grid-column :width="8">
                                        <sui-statistic horizontal size="small">
                                            <sui-statistic-value>
                                                {{assignList.selectedBuilding.name}}
                                            </sui-statistic-value>
                                        </sui-statistic>
                                        <sui-statistic horizontal size="small">
                                            <sui-statistic-value>
                                                {{assignList.selectedFloor.name}}
                                            </sui-statistic-value>
                                        </sui-statistic>
                                        <img :src="assignList.selectedFloor.url" ref="backImage" v-show="false" />
                                        <canvas ref="canvas" id="myCanvas" width="500" height="350" />
                                        <div v-show="selectedRoomInFloor.type">
                                            <sui-grid>
                                                <sui-grid-row>
                                                    <sui-grid-column :width="12">
                                                        <assign-form ref='formComponentAssign' :index="selectedRoomInFloorIndex" :singleEntry="selectedRoomInFloor">
                                                        </assign-form>
                                                    </sui-grid-column>
                                                    <sui-grid-column :width="4">
                                                        <sui-button basic color="blue" @click.native="createAssignment" class="buttonblueFun">
                                                            提交
                                                        </sui-button>
                                                    </sui-grid-column>
                                                </sui-grid-row>
                                            </sui-grid>
                                        </div>
                                        <div v-show="assignList.selectedBuilding">
                                            <sui-button v-show="assignList.selectedFloor.name!==undefined" @click.native="openImageModal()">
                                                楼层图
                                            </sui-button>
                                        </div>
                                    </sui-grid-column>
                                    <sui-grid-column :width="3">
                                        <div>
                                            <sui-list v-show="roomAssignmentTotal.length>0">
                                                <sui-list-item v-for="unit in roomAssignmentTotal" :key="unit[0]" v-show="unit.space>0">
                                                    <div class="displayInline">
                                                        <div class="yello" v-show="unit.type=='bangong'"></div>
                                                        <div class="purple" v-show="unit.type=='fushu'"></div>
                                                        <div class="redBand" v-show="unit.type=='leader'"></div>
                                                        <div class="yewuyongfang" v-show="unit.type=='yewuyongfang'"></div>
                                                        <div class="lvse" v-show="unit.type=='shebei'"></div>
                                                        <div class="baise" v-show="unit.type=='other'"></div>
                                                        {{unit.text}} {{unit.space}}(m²)
                                                    </div>
                                                </sui-list-item>
                                            </sui-list>
                                        </div>
                                    </sui-grid-column>
                                </sui-grid>

                            </sui-tab-pane>
                        </sui-tab>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import moment from "moment";
import dialogBar from "@/components/MDialog";
import RentRoomForm from "@/components/rentRoomForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "./FieldsDef.js";
import FieldsAssign from "./FieldsForAssign.js";
import FieldsPatrol from "./FieldsPatrol.js";
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import rentHeTongForm from "@/components/rentHeTongForm";
import {
    ModelSelect
} from "vue-search-select";
import constants from "@/util/constants";
import {
    uploadZiliaoFileApi,
    updateFloorInfoApi
    // getFileOSSApi
    //getRentRoomContractListApi
} from "@/api/utilApi";
import global from "@/global/index";
import {
    localGet
} from "@/util/storage"; // 导入存储函数
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list'
import mianjiForm from "@/components/mianjiForm";

import {
    getRoomStatApi,
    createPatrolApi,
    getRentRoomDataApi,
    createRentRoomApi,
    updateRentRoomApi,
    deleteRentRoomApi,
    createRentContractApi,
    getRentRoomContractListApi,
    assignRentAssignmentApi,
    getUnitApi,
    listRentRoomAssignmentApi,
    deleteRentRoomAssignmentApi,
    editRentContractDetailApi,
    editRentContractApi,
    listPatrolApi,
    getFloorById,
    deletePatrolApi,
    createAssignmentApi,
    createBuildingFloorApi,
    createBuildingApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
import {
    notifySomething,
    goToLogin
} from "@/util/utils";
export default {
    name: "MyVuetable",
    components: {
        VueTreeList,

        "model-select": ModelSelect,
        "dialog-bar": dialogBar,
        Vuetable,
        VuetablePagination,
        "rentroom-form": RentRoomForm,
        "contract-form": rentHeTongForm,
        'building-form': BuildingForm,
        'assign-form': AssignForm,
        'mianji-form': mianjiForm
    },
    data() {
        return {
            imgeComponentKey: 1,
            singleBuilding: {},
            buildingImage: {
                open: false,
                notification: ""
            },
            buildingForm: {
                open: false
            },
            validationCheck: {
                unit_id: false,
                space: false,
                text: "",
                header: "",
                status: "",
            },
            fieldsPatrol: FieldsPatrol,
            sendVal: false,
            modelTitle: "",
            editMode: false,
            open: false,
            filterString: {
                jiadi: "",
                diji: "",
            },
            newXuncha: {
                open: false,
            },
            unitoptions: [],
            listContract: [],
            componentAssignListkey: 1,
            componentFenpeikey: 1,
            defaultTab: 0,
            point: {},
            selectedRoom: {
                patrol: [],
            },
            selectedRoomContract: {
                mode: "initial",
            },
            deleteTarget: "",
            loading: true,
            localData: [],
            fields: FieldsDef,
            fieldsAssign: FieldsAssign,
            sortOrder: [{
                field: "email",
                direction: "asc",
            }, ],
            exportData: {
                open: false,
                kind: "0"
            },
            roomType: 2,
            assignList: {
                open: false,
                buildings: [],
                selectedBuilding: {},
                selectedFloor: {}
            },
            contractForm: {
                open: false,
                model: "create",
                title: "createForm",
                room_id: "",
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: "",
            },
            keyword: "",
            treeData: [],
            tree: new Tree([]),
            roomInFloor: [],
            selectedRoomInFloorIndex: 0,
            roomAssignment: [],
            roomAssignmentTotal: [{
                    type: "bangong",
                    space: 0,
                    text: "办公"
                },
                {
                    type: "fushu",
                    space: 0,
                    text: "附属"
                },
                {
                    type: "leader",
                    space: 0,
                    text: "领导"
                },
                {
                    types: 'shebei',
                    space: 0,
                    text: "设备"
                }
            ],
            selectedRoomInFloor: {},
            assignForm: {
                open: false,
                room_id: "",
                roomname: "",
                building_id: null
            },
        };
    },

    methods: {
        closeImageModal() {
            this.buildingImage.open = false;
            this.assignList.open = true;
        },
        uploadFile: function (e) {
            let formData = new FormData();
            this.loading = true;
            var context = this;
            this.buildingImage.open = false;
            if (e.target.files[0] != undefined) {
                formData.append('ossfile', e.target.files[0]);
                uploadZiliaoFileApi(formData).then((result) => {
                    context.updateFloorInfo(result, e.target.files[0]);
                    e.target.value = "";
                    context.closeImageModal();
                    //uppdate file ppath
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        updateFloorInfo(result, file) {
            this.assignList.selectedFloor.cadfile = result.data.data;
            this.loading = false;
            var context = this;
            var formData = new FormData();
            formData.append("png", file)
            formData.append("cadfile", result.data.data)
            formData.append("id", this.assignList.selectedFloor.id)
            formData.append("name", this.assignList.selectedFloor.name)
            updateFloorInfoApi(formData).then((data) => {
                context.loading = false;
                if (data.data.code == 0) {
                    context.$notify({
                        group: 'foo',
                        title: '成功上传',
                        text: '成功上传',
                        type: "success"
                    });
                }
            }).catch(function (error) {
                console.log(error);
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        drawRect(info) {
            if (this.context == null || this.context == undefined) {
                this.context = this.$refs.canvas.getContext("2d");
            }
            var tmpSum = {
                bangong: 0,
                fushu: 0,
                leader: 0,
                shebei: 0,
                qita: 0,
                yewuyongfang: 0
            }
            this.roomAssignment = [];
            this.roomAssignmentTotal = [];
            if (info.room_detail != null && info.room_detail != "") {
                var zuobiao = JSON.parse(info.room_detail);
                this.roomInFloor = zuobiao;
                if (info.room_detail != null) {
                    this.roomAssignment = JSON.parse(info.room_detail);
                    if (Object.keys(this.roomAssignment).length === 0 && this.roomAssignment.constructor === Object) {
                        this.roomAssignment = [];
                        this.roomAssignmentTotal = [];
                    }
                    var spaceObject = JSON.parse(info.room_space);
                    var spaceArray = [];
                    var otherObject = {};
                    for (var name in spaceObject) {
                        //console.log(name);
                        if (name == "roomother") {
                            otherObject.id = "roomother";
                            otherObject.space = spaceObject[name];
                            tmpSum.qita = spaceObject[name];
                            otherObject.type = "其他";
                        } else {
                            spaceArray.push({
                                room: name,
                                space: spaceObject[name]
                            });
                        }
                    }
                    this.roomAssignment.map((one, index) => {
                        var roomindex = index + 1;
                        for (var i = 0; i < spaceArray.length; i++) {
                            one.id = "room" + roomindex;
                            if (spaceArray[i].room == "room" + roomindex) {
                                one.space = spaceArray[i].space;
                                switch (one.type) {
                                    case "yewuyongfang":
                                        tmpSum.yewuyongfang += parseFloat(one.space);
                                        break;
                                    case "bangong":
                                        tmpSum.bangong += parseFloat(one.space);
                                        break;
                                    case "fushu":
                                        tmpSum.fushu += parseFloat(one.space);
                                        break;
                                    case "leader":
                                        tmpSum.leader += parseFloat(one.space);
                                        break;
                                    case "shebei":
                                        tmpSum.shebei += parseFloat(one.space);
                                        break;
                                    case "qita":
                                        tmpSum.qita += parseFloat(one.space);
                                        break;
                                }
                            }
                        }
                    });
                    if (otherObject != {}) {
                        this.roomAssignment.push(otherObject)
                    }

                }
            }
            this.roomAssignmentTotal = [{
                    type: "bangong",
                    space: tmpSum.bangong,
                    text: "办公"
                }, {
                    type: "yewuyongfang",
                    space: tmpSum.yewuyongfang,
                    text: "业务用房"
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
                    type: "other",
                    space: tmpSum.qita,
                    text: "其他"
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
                        var roomindex = index + 1;

                        var changIndex = room.origin_width / 500;
                        var gaoIndex = room.origin_height / 350;
                        room["room" + roomindex][0] = room["room" + roomindex][0] / changIndex;
                        room["room" + roomindex][1] = room["room" + roomindex][1] / gaoIndex;
                        room["room" + roomindex][2] = room["room" + roomindex][2] / changIndex;
                        room["room" + roomindex][3] = room["room" + roomindex][3] / gaoIndex;

                        if (this.roomAssignment.length != null) {
                            this.roomAssignment.map((one) => {
                                if (one.id == "room" + roomindex) {
                                    this.context.globalAlpha = 1;
                                    if (one.space && one.space != 0) {
                                        this.context.strokeText(one.space + "m²", room["room" + roomindex][0] + (room["room" + roomindex][2] / 3), room["room" + roomindex][1] + (room["room" + roomindex][3] / 2));
                                        textDraw = false;
                                    }
                                }
                            })
                        }
                        if (textDraw) {
                            this.context.globalAlpha = 1;
                            try {
                                this.context.strokeText("房间" + roomindex, room["room" + roomindex][0] + (room["room" + roomindex][2] / 2), room["room" + roomindex][1] + (room["room" + roomindex][3] / 2));
                            } catch (error) {
                                console.log("parse error")
                            }
                        }
                        this.context.globalAlpha = 0;
                        try {
                            this.context.strokeRect(room["room" + roomindex][0], room["room" + roomindex][1], room["room" + roomindex][2], room["room" + roomindex][3])
                        } catch (error) {
                            console.log("parse error")
                        }
                    });
                }

            } else {
                this.context.clearRect(0, 0, 500, 350);
            }

            // this.context.strokeStyle = "#FF0000";
            // this.context.strokeText("201", 10, 20);
            // this.context.strokeRect(0, 0, 60, 100);
            var canvas = this.$refs.canvas;
            var contextThis = this;
            this.$refs.canvas.addEventListener('click', function (event) {
                var rect = canvas.getBoundingClientRect();
                //2
                var x = event.clientX - rect.left * (500 / rect.width);
                var y = event.clientY - rect.top * (350 / rect.height);

                var withinOrNot = contextThis.whereIsTheRoom(x, y, contextThis)
                console.log("within or Not " + withinOrNot);
                if (!withinOrNot) {
                    contextThis.selectedRoomInFloorIndex = "roomother";
                    contextThis.selectedRoomInFloor = {
                        type: "其他",
                        space: tmpSum.qita
                    }
                }
                //contextThis.context.clearRect(0, 0, 500, 350);
                contextThis.openAssignModalNew(contextThis.assignList.selectedBuilding, contextThis.assignList.selectedFloor, contextThis)
            }, false);

        },
        whereIsTheRoom(x, y, context) {
            var withinOrNot = false;
            const checkZuoBiao = {
                x: x,
                y: y
            };
            context.roomInFloor.map((room, index) => {
                var roomindex = 0;
                if (room["room" + index] == null) {
                    roomindex = index + 1;
                } else {
                    roomindex = index + 1;
                }

                var leftCornor = {
                    x: room["room" + roomindex][0],
                    y: room["room" + roomindex][1]
                }; //左上坐标
                var rightCornor = {
                    x: room["room" + roomindex][0] + room["room" + roomindex][2],
                    y: room["room" + roomindex][1]
                };
                var leftDown = {
                    x: room["room" + roomindex][0],
                    y: room["room" + roomindex][1] + room["room" + roomindex][3]
                }
                var rightDown = {
                    x: room["room" + roomindex][0] + room["room" + roomindex][2],
                    y: room["room" + roomindex][1] + room["room" + roomindex][3]
                }
                if (context.withinZuobiao(checkZuoBiao, leftCornor, rightCornor, leftDown, rightDown)) {
                    withinOrNot = true;
                    context.selectedRoomInFloorIndex = roomindex;
                    context.selectedRoomInFloor = {};
                    context.roomAssignment.map((one) => {
                        if (one.id == "room" + roomindex) {
                            context.selectedRoomInFloor = one;
                        }
                    });
                    switch (room.type) {
                        case "yewuyongfang":
                            context.selectedRoomInFloor.type = "业务用房"
                            break;
                        case "qita":
                            context.selectedRoomInFloor.type = "其他"
                            break;
                        case "shebei":
                            context.selectedRoomInFloor.type = "设备"
                            break;
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
            });
            return withinOrNot;
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
                    floor.disabled = false;
                    building.children.push(floor)
                })
                this.tree = new Tree(this.treeData);
                // this.drawRect()
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        getBuildingSection() {
            let data = {};
            data.room_id = this.selectedRoom.id;
            var context = this;
            // get room
            getBuildingListApi(data).then((result) => {
                context.loading = false;
                context.assignList.selectedFloor = {
                    url: ""
                };
                context.assignList.selectedBuilding = {
                    name: ""
                };
                //get floor
                context.assignList.buildings = [];
                context.assignList.buildings = result.data.data;
                let root = [];

                context.assignList.buildings.map((building) => {
                    building.building_id = building.id;
                    building.pid = 0;
                    building.dragDisabled = true;
                    building.addTreeNodeDisabled = true;
                    building.addLeafNodeDisabled = true;
                    // building.editLeafNodeDisabled = false;
                    // building.delLeafNodeDisabled = false;
                    building.editNodeDisabled = true;
                    building.delNodeDisabled = false;
                    building.children = [];
                    root.push(building);
                    context.getBuildingFloorSection(building);
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
        createBuilding: function () {
            this.$refs.formComponentBuilding.singleBuilding.room_id = this.selectedRoom.id;
            this.loading = true;
            var context = this;
            this.$refs.formComponentBuilding.singleBuilding.type = this.roomType;
            createBuildingApi(this.$refs.formComponentBuilding.singleBuilding).then((result) => {
                this.buildingForm.open = false;
                this.getBuildingSection();
                this.$refs.formComponentBuilding.singleBuilding.building_id = result.data.data;
                this.createBuildingFloor(this.$refs.formComponentBuilding.singleBuilding);
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        openBuildingModal() {
            this.assignList.open = false;
            this.buildingForm.open = true;
        },
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
            if (params.floor_id == undefined) {
                this.assignList.selectedBuilding = params;
                this.assignList.selectedFloor = {
                    url: ""
                };
                this.roomAssignment = [];
                this.roomAssignmentTotal = [];

                if (this.context == null || this.context == undefined) {
                    this.context = this.$refs.canvas.getContext("2d");
                    this.context.clearRect(0, 0, 500, 350);
                } else {
                    this.context.clearRect(0, 0, 500, 350);

                }
            } else {
                this.assignList.selectedFloor = params;
                console.log(params);
                getFloorById({
                    floor_id: params.id
                }).then((result) => {
                    if (result.data.code == 0) {
                        this.assignList.selectedFloor.url = constants.fileURL + this.assignList.selectedFloor.cadfile;
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

        addNode() {
            var node = new TreeNode({
                name: 'new node',
                isLeaf: false
            })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },
        //

        openImageModal() {
            this.loading = true;
            this.assignList.open = false;
            if (this.assignList.selectedFloor.cadfile != null && this.assignList.selectedFloor.cadfile != "") {
                this.assignList.selectedFloor.url = constants.fileURL + this.assignList.selectedFloor.cadfile;
                this.buildingImage.open = true;
                this.buildingImage.notification = true;
                this.loading = false;
            } else {
                this.buildingImage.open = true;
                this.buildingImage.notification = false;
                this.loading = false;
            }

        },
        createAssignment() {
            this.loading = true;
            let data = this.selectedRoomInFloor;
            data.room_id = this.assignForm.room_id;
            data.building_id = this.assignForm.building_id;
            data.floor_id = this.assignForm.floor_id;
            if (this.selectedRoomInFloorIndex != "roomother") {
                data.id = "room" + this.selectedRoomInFloorIndex;
            } else {
                data.id = this.selectedRoomInFloorIndex;
            }
            data.isleader = this.assignForm.isleader;
            console.log(JSON.stringify(data));
            if (this.roomAssignment == null || this.roomAssignment == {}) {
                this.roomAssignment = [];
                this.roomAssignmentTotal = [];
            }
            var found = 0;
            this.roomAssignment.map((one) => {
                if (one.id == data.id) { //已经有了的话 直接更新
                    one = data;
                    found = 1;
                }
            })
            if (found == 0) {
                this.roomAssignment.push(data); //没有塞进去

            }
            if (this.roomAssignment.length == 0) {
                this.roomAssignment.push(data); //没有塞进去

            }
            if (this.context == null || this.context == undefined) {
                this.context = this.$refs.canvas.getContext("2d");
            }
            var contextF = this;
            if (!data.space) {
                data.space = 0
            }
            createAssignmentApi({
                space: data.space.toString(),
                roomid: data.id,
                id: this.assignList.selectedFloor.id
            }).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.context.clearRect(0, 0, 500, 350);
                    this.roomAssignment = [];
                    this.roomAssignmentTotal = [];
                    // this.getBuildingSection();
                    this.refreshFloor(this.assignList.selectedFloor.id)
                    this.getRoomStat({
                        unit_id: this.selectedRoom.id
                    });
                    this.closeAssignModal();
                } else {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                }
            }).catch(function () {
                contextF.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });

        },
        getRoomStat(data) {
            getRoomStatApi(data).then((result) => {
                if (result.data.code == 0) {
                    var roomSpaceData = result.data.data;
                    this.selectedRoom.space7 = roomSpaceData.bangong[1] + roomSpaceData.leader[1]; //办公
                    this.selectedRoom.space8 = roomSpaceData.bangong[0] + roomSpaceData.leader[0]; //办公
                    this.selectedRoom.space28 = roomSpaceData.shebei[1]; //设备
                    this.selectedRoom.space40 = roomSpaceData.fushu[1]; //附属
                    this.selectedRoom.space25 = roomSpaceData.yewuyongfang[1]; //业务用
                    this.selectedRoom.space24 = roomSpaceData.other[1];
                    this.selectedRoom.space29 = roomSpaceData.reserved[1];
                }
            })

        },
        refreshFloor(id) {
            getFloorById({
                floor_id: id
            }).then((result) => {
                if (result.data.code == 0) {
                    this.assignList.selectedFloor.url = constants.fileURL + result.data.data.cadfile;
                    if (this.context) {
                        this.context.clearRect(0, 0, 500, 350);
                    }
                    this.drawRect(result.data.data);
                }
            })
        },

        openAssignModal(building, floor) {
            this.assignForm.room_id = building.room_id;
            this.assignForm.building_id = building.id;
            this.assignForm.floor_id = floor.id;
            //TODO floor_id
            this.assignForm.open = true;
            this.assignList.open = false;
        },
        openAssignModalNew(building, floor, context) {

            context.assignForm.room_id = building.room_id;
            context.assignForm.building_id = building.id;
            context.assignForm.floor_id = floor.id;
            //TODO floor_id
            //context.assignForm.open = true;
            //context.assignList.open = false;
        },

        createBuildingFloor(data) {
            this.loading = true;
            var context = this;
            data.type = this.roomType;
            createBuildingFloorApi(data).then(() => {
                context.loading = false;
                context.$refs.formComponentBuilding.singleBuilding = {
                    room_id: context.selectedRoom.id,
                    name: "",
                    upper: "",
                    lower: "",
                    detail: ""
                };
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },

        //patrol

        showPatrol(data) {
            console.log(data);
            this.newXuncha.open = true;
            this.newXuncha.unit_id = data.unit_id;
        },
        refreshPatrol() {
            this.loading = true;

            listPatrolApi({
                room_id: this.selectedRoom.id,
            }).then((result) => {
                if (result.data.code == 0) {
                    this.loading = false;
                    this.selectedRoom.patrol = result.data.data;
                    console.log(this.selectedRoom.patrol);
                } else {
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                }
            });
        },

        createPatrol() {
            this.newXuncha.room_id = this.selectedRoom.id;
            //this.newXuncha.unit_id = this.selectedRoom.unit_id
            if (!this.newXuncha.name) {
                notifySomething(
                    constants.GENERALERROR,
                    constants.GENERALERROR,
                    constants.typeError
                );
                return;
            }
            createPatrolApi(this.newXuncha).then((result) => {
                if (result.data.code == 0) {
                    this.refreshPatrol();
                    this.newXuncha.open = false;
                    notifySomething(
                        constants.CREATESUCCESS,
                        constants.CREATESUCCESS,
                        constants.typeSuccess
                    );
                }
            });
        },
        clickDingWei() {
            this.defaultTab = 3;
            // this.keyword = this.selectedRoom.address;
        },
        emptyRentContract() {
            this.selectedRoomContract = {
                mode: "new",
                spaceJianzhu: this.selectedRoom.space,
                rent_amt: 0,
                priceinfo: [{
                    pricename: "",
                    price: "",
                    space: ""
                }]
            };
        },
        changeUnit() {
            let count = 0;
            this.selectedRoom.assignList.map((one) => {
                if (this.selectedRoom.unit_id == one.unit_id) {
                    this.validationCheck.header = "单位已经被分配过了";
                    this.validationCheck.text =
                        "单位已经被分配过了,再分配会覆盖原有的分配";
                    this.validationCheck.status = "warning";
                    count = 1;
                }
            });
            if (count == 0) {
                this.validationCheck.status = "";
            }
        },
        changeContract() {
            this.listContract.map((one) => {
                if (one.one.id == this.selectedRoomContract.id) {
                    this.selectedRoomContract = one.one;
                }
            });
        },
        changeMode() {
            // this.loading = true;
            // if (this.listContract.length > 0) {
            //     this.loading = false;
            //     this.selectedRoomContract.mode = "edit";
            //     this.selectedRoomContract.modeDisable = true;
            // } else {
            //     this.selectedRoomContract.mode = "new";
            // }
            // this.selectedRoomContract = {
            //     mode: "new",
            //     priceinfo: [{
            //         pricename: "",
            //         price: "",
            //         space: "",
            //     }]
            // }
        },
        setFirstPoint(pois) {
            this.point = pois[0].point;
            this.selectedRoom.lon = this.point.lng;
            this.selectedRoom.lat = this.point.lat;
        },
        assignRentRoom() {
            this.loading = true;
            if (
                this.selectedRoom.unit_id == undefined ||
                this.selectedRoom.unit_id == ""
            ) {
                this.validationCheck.unit_id = true;
                this.validationCheck.space = true;
                this.validationCheck.header = "请选择单位和面积";
                this.validationCheck.text = "请选择单位和面积";
                this.loading = false;
                return;
            }
            this.validationCheck.unit_id = false;
            this.validationCheck.space = false;
            var context = this;
            var nPayload = {
                room_id: this.selectedRoom.id,
                space: this.selectedRoom.space_assign,
                unit_id: this.selectedRoom.unit_id,
                type: 2,
            };
            assignRentAssignmentApi(nPayload)
                .then((result) => {
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(
                            constants.FENPEISUCCESS,
                            constants.FENPEISUCCESS,
                            constants.typeSuccess
                        );
                        this.loading = true;
                        this.selectedRoom.space_assign =
                            this.selectedRoom.space - this.selectedRoom.space_assign;
                        this.refreshAssignment();
                    } else {
                        notifySomething(
                            constants.FEIPEICREATEFAILED,
                            constants.FEIPEICREATEFAILED + result.data.data,
                            constants.typeError
                        );
                    }
                })
                .catch(function () {
                    context.loading = false;
                    notifySomething(
                        constants.FEIPEICREATEFAILED,
                        constants.FEIPEICREATEFAILED + "房屋已分配或者面积不足",
                        constants.typeError
                    );
                });
        },
        refreshAssignment() {
            listRentRoomAssignmentApi({
                room_id: this.selectedRoom.id,
            }).then((data) => {
                this.loading = false;
                this.selectedRoom.assignList = data.data.data;
                this.componentAssignListkey++;
            });
        },
        //    let filterheaders = ['address', 'space', 'ori_space', 'rent_amt', 'starttime', 'endtime', 'rentowner'];
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) =>
                filterVal.map((j) => {
                    if (j === "timestamp") {
                        //  return parseTime(v[j])
                    } else if (
                        j == "rent_amt" ||
                        j == "starttime" ||
                        j == "endtime" ||
                        j == "rentowner"
                    ) {
                        if (v["contract_info"] != null) {
                            return v["contract_info"][j];
                        }
                    } else {
                        return v[j];
                    }
                })
            );
        },
        formatTime(value) {
            if (value == null || value == undefined) {
                return "";
            }
            return moment(value).format("YYYY-MM-DD");
        },
        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.room_type == constants.typeRoomAssignment) {
                deleteRentRoomAssignmentApi(this.deleteTarget).then((result) => {
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(
                            constants.DELETESUCCESS,
                            constants.DELETESUCCESS,
                            constants.typeSuccess
                        );
                        this.refreshAssignment();
                    } else {
                        notifySomething(
                            constants.DELETEFAILED,
                            constants.DELETEFAILED,
                            constants.typeError
                        );
                    }
                });
            } else if (this.deleteTarget.room_type == constants.typeRoomPatrol) {
                deletePatrolApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        this.refreshPatrol();
                        notifySomething(
                            constants.DELETESUCCESS,
                            constants.DELETESUCCESS,
                            constants.typeSuccess
                        );
                    } else {
                        notifySomething(
                            constants.DELETEFAILED,
                            constants.DELETEFAILED,
                            constants.typeError
                        );
                    }

                    console.log(result);
                });
            } else {
                deleteRentRoomApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        this.refreshRooms({
                            page: 1,
                        });
                        notifySomething(
                            constants.DELETESUCCESS,
                            constants.DELETESUCCESS,
                            constants.typeSuccess
                        );
                    } else {
                        notifySomething(
                            constants.DELETEFAILED,
                            constants.DELETEFAILED,
                            constants.typeError
                        );
                    }

                    console.log(result);
                });
            }
        },
        dragend: function (e) {
            //this.loading = true;
            // alert("what")
            if (e == undefined) {
                this.selectedRoom.lon = this.point.lng;
                this.selectedRoom.lat = this.point.lat;
            } else {
                this.selectedRoom.lon = e.point.lng;
                this.selectedRoom.lat = e.point.lat;
            }
            // updateRoomApi(this.selectedRoom).then(() => {
            //     this.loading = false;
            // });
        },
        createRentContract: function () {
            this.selectedRoomContract.room_id = this.selectedRoom.id;
            var context = this;
            this.selectedRoomContract.rule = JSON.stringify({
                type: 1,
                rate: this.selectedRoomContract.rate,
                year: this.selectedRoomContract.year,
            });
            if (this.selectedRoomContract.mode != "new") {
                editRentContractApi(this.selectedRoomContract)
                    .then((result) => {
                        this.closeModal();
                        if (result.data.code == 0) {
                            this.loading = false;
                            editRentContractDetailApi({
                                contract_id: this.selectedRoomContract.id,
                                valuelist: JSON.stringify(this.selectedRoomContract.priceinfo),
                            }).then((result) => {
                                if (result.data.code == 0) {
                                    notifySomething("编辑合同成功", "编辑合同成功", "success");
                                } else {
                                    notifySomething("编辑合同失败", "编辑合同失败", "error");
                                }
                            });
                        } else {
                            context.$notify({
                                group: "foo",
                                title: "编辑合同失败",
                                text: "编辑合同失败",
                                type: "error",
                            });
                        }
                    })
                    .catch(function () {
                        context.$notify({
                            group: "foo",
                            title: "编辑合同失败",
                            text: "编辑合同失败",
                            type: "error",
                        });
                    });
            } else if (this.selectedRoomContract.mode == "new") {
                createRentContractApi(this.selectedRoomContract)
                    .then((result) => {
                        this.closeModal();
                        if (result.data.code == 0) {
                            getRentRoomContractListApi({
                                room_id: this.selectedRoom.id,
                            }).then((result) => {
                                var latestOne = result.data.data.length;
                                this.selectedRoomContract.contract_id =
                                    result.data.data[latestOne - 1].id;
                                editRentContractDetailApi({
                                    contract_id: this.selectedRoomContract.contract_id,
                                    valuelist: JSON.stringify(
                                        this.selectedRoomContract.priceinfo
                                    ),
                                }).then((result) => {
                                    if (result.data.code == 0) {
                                        notifySomething(
                                            "'创建合同成功'",
                                            "创建合同成功",
                                            "success"
                                        );
                                    } else {
                                        notifySomething("'创建合同失败'", "创建合同失败", "error");
                                    }
                                });
                                this.loading = false;
                            });
                        } else {
                            context.$notify({
                                group: "foo",
                                title: "创建合同失败",
                                text: "创建合同失败",
                                type: "error",
                            });
                        }
                    })
                    .catch(function () {
                        context.$notify({
                            group: "foo",
                            title: "创建合同失败",
                            text: "创建合同失败",
                            type: "error",
                        });
                    });
            }
        },
        viewSomeThing(data) {
            this.loading = true;
            this.defaultTab = 0;
            this.selectedRoom = data;
            this.selectedRoomInFloor = {};
            this.selectedRoomInFloorIndex = 0;
            if (
                !this.selectedRoom.priceinfo ||
                this.selectedRoom.priceinfo.length == 0
            ) {
                this.selectedRoom.priceinfo = [{
                    space: 0,
                    price: 0,
                    pricename: "",
                }, ];
            }

            this.modelTitle = "修改租赁房屋";
            this.editMode = true;
            if (data.lat === null || data.lat == "") {
                this.point = {
                    lng: 121.547967,
                    lat: 30.879141,
                };
            } else {
                this.point = {
                    lng: data.lon,
                    lat: data.lat,
                };
            }
            this.validationCheck.status = "";
            this.assignList.open = true;
            this.tree = new Tree([]);
            this.assignList.selectedBuilding = false;
            this.assignList.selectedFloor = {
                url: ""
            };

            this.loading = false;
            this.assignList.open = true;

            this.getBuildingSection();
            this.getRoomStat({
                unit_id: this.selectedRoom.id
            });
            this.selectedRoom.space_assign = data.space;
            listRentRoomAssignmentApi({
                room_id: this.selectedRoom.id,
            }).then((data) => {
                data.data.data.map((one) => {
                    one.space = this.selectedRoom.space;
                });
                this.selectedRoom.assignList = data.data.data;
                this.refreshPatrol();
                getRentRoomContractListApi({
                    room_id: this.selectedRoom.id,
                }).then((result) => {
                    var latestOne = result.data.data.length;
                    if (latestOne == 0) {
                        this.emptyRentContract();
                    } else {
                        this.listContract = [];
                        this.selectedRoomContract = result.data.data[latestOne - 1];
                        this.selectedRoomContract.spaceJianzhu = this.selectedRoom.space;
                        var rule = JSON.parse(this.selectedRoomContract.rule);
                        if (rule != null) {
                            this.selectedRoomContract.rate = rule.rate;
                            this.selectedRoomContract.year = rule.year;
                        }
                        result.data.data.map((one) => {
                            this.listContract.push({
                                value: one.id,
                                text: one.rentcontact,
                                one,
                            });
                        });
                    }
                    this.loading = false;
                });
            });
        },

        exportToExcel() {
            this.exportData.open = true;
        },
        openExportUrl() {
            let local_auth = localGet(global.project_key, true);
            if (this.exportData.kind != "0") {
                window.open(constants.exportroomr + "?token=" + local_auth + "&kind=" + this.exportData.kind);
            } else {
                window.open(constants.exportroomr + "?token=" + local_auth);
            }
            this.exportData.open = false;
        },
        closeModalExport() {
            this.exportData.open = false;
        },
        deleteRoomPatrol(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.id + "(" + data.name + ")?",
                id: data.id,
                room_type: constants.typeRoomPatrol,
            };
        },
        deleteRoomAssign(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.unit_detail.name + ")?",
                id: data.id,
                room_type: constants.typeRoomAssignment,
                room_id: data.room_id,
                unit_id: data.unit_id,
            };
        },
        deleteRoom(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.roomname + ")?",
                id: data.id,
                room_type: "rentRoom",
            };
            // this.loading = true;
            // deleteRoomApi(data).then((result) => {
            //     this.refreshRooms();
            //     console.log(result)
            // });
        },
        inDays: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000));
        },
        refreshRooms(payload) {
            this.loading = true;
            var context = this;
            getRentRoomDataApi(payload)
                .then((data) => {
                    if (data.data.code == 0) {
                        this.loading = false;
                        this.localData = data.data.data;
                        this.localData.data.map((one) => {
                            one.status = "normal";
                            if (one.contract_info != null) {
                                if (one.contract_info.starttime) {
                                    one.qishinianxian =
                                        this.formatTime(one.contract_info.starttime) +
                                        "到" +
                                        this.formatTime(one.contract_info.endtime);
                                    const nowTime = new Date();
                                    if (
                                        context.inDays(
                                            new Date(one.contract_info.endtime),
                                            nowTime
                                        ) > 90
                                    ) {
                                        one.status = "warning";
                                    }
                                } else {
                                    one.qishinianxian = "无";
                                }
                            }
                        });
                    } else if (data.data.code == 2) {
                        notifySomething(
                            "重复登陆 请重新登陆",
                            constants.GENERALERROR,
                            constants.typeError
                        );
                        goToLogin();
                        this.$router.push("/login");
                    }
                })
                .catch(function () {
                    context.loading = false;
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                });
        },
        createRoomModel() {
            // show create Model
            this.modelTitle = "创建租赁房屋";
            this.editMode = false;
            this.assignList.open = true;

            this.selectedRoom = {
                area: "奉贤区",
            };
        },
        toggle() {
            this.loading = true;
            if (this.defaultTab == 1) {
                this.createRentContract();
                return;
            }

            this.assignList.open = !this.assignList.open;

            if (!this.editMode) {
                createRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms({
                        page: 1,
                    });
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(
                            constants.CREATESUCCESS,
                            constants.CREATESUCCESS,
                            constants.typeSuccess
                        );
                        this.loading = false;
                    } else {
                        notifySomething(
                            constants.CREATEFAILED,
                            constants.CREATEFAILED + ":" + result.data.msg,
                            constants.typeError
                        );
                    }
                });
            } else if (this.editMode) {
                updateRentRoomApi(this.selectedRoom).then((result) => {
                    this.refreshRooms({
                        page: 1,
                    });
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(
                            constants.EDITSUCCESS,
                            constants.EDITSUCCESS,
                            constants.typeSuccess
                        );
                    } else {
                        notifySomething(
                            constants.EDITFAILED,
                            constants.EDITFAILED + ":" + result.data.msg,
                            constants.typeError
                        );
                    }
                });
            }
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
            this.refreshRooms({
                page: page,
            });
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.refreshRooms({
                page: 1,
            });
            this.assignList.open = false;
            this.contractForm.open = false;
        },
    },
    created() {
        this.refreshRooms({
            page: 1,
        });
        getUnitApi().then((data) => {
            var res_data = data.data.data;
            for (var i = res_data.length - 1; i >= 0; i--) {
                this.unitoptions.push({
                    text: res_data[i]["name"],
                    value: res_data[i]["id"],
                });
            }
        });
    },
};
</script>

<style>
.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
}

.ui.modal>.content {
    padding: 15px 15px 15px 15px;
    box-sizing: border-box;
    max-height: none !important;
}

.map {
    width: 100%;
    height: 400px;
}

.ui.table {
    font-size: 13px;
}

.ui.table thead th {
    cursor: auto;
    background: #f5f7fa;
    text-align: inherit;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.92857143em 0.78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 500;
    text-transform: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    border-left: none;
}

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 0 0 15px 0;
}

.width300 {
    width: 300px;
    /* margin-left: 20px !important; */
}

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer;
}

.BMap_cpyCtrl {
    display: none;
}

.vue2Table {
    /* margin: 20px; */
}

.modalStep {
    height: 500px;
}

.anchorBL {
    display: none;
}

.map {
    width: 100%;
    height: 400px;
}

.normalIcon {
    height: 50px;
    background: url("../../../../public/green.png") center no-repeat;
    width: 50px;
    background-size: contain;
}

.alertIcon {
    height: 50px;
    background: url("../../../../public/alert.png") center no-repeat;
    width: 50px;
    background-size: contain;
}

.ui.modal .scrolling.content {
    max-height: none !important;
}

.imageModal {
    height: 500px;
}
</style>
