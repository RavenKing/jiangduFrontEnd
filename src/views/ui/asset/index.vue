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
                                <sui-form-field>
                                    <sui-dropdown placeholder="房屋类型" selection :options="options" v-model="filterString.kind" />
                                </sui-form-field>
                                <sui-form-field>
                                    <input type="text" placeholder="房屋名字" v-model="filterString.name" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="查询" @click.prevent="onSearch" />
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
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <template slot="tableHeader">
                    <template>
                        <tr>
                            <th colspan="5" class="thTextcenter">基本信息</th>
                            <th colspan="2" class="thTextcenter">有产证</th>
                            <th colspan="2" class="thTextcenter">无产证</th>
                            <th colspan="1" class="thTextcenter">操作</th>
                        </tr>
                    </template>
                    <vuetable-row-header></vuetable-row-header>
                </template>
                <div slot="wuchanTudiMianji" slot-scope="props">
                    {{parseFloat(props.rowData.rawspace-props.rowData.tudispace).toFixed(2)}}
                </div>
                <div slot="wuchanJianZhuMianji" slot-scope="props">
                    {{parseFloat(props.rowData.space-props.rowData.jianzhuspace).toFixed(2)}}
                </div>
                <div slot="action" slot-scope="props">

                    <!-- <sui-button basic color="red"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button basic color="blue" content="编辑" v-on:click="openAssignSection(props.rowData)" size="tiny" />
                    <sui-button basic color="red" content="删除" v-on:click="deleteRoom(props.rowData)" size="tiny" />
                    <!-- <sui-button content="分配房屋列表" v-on:click="openAssignList(props.rowData)" /> -->
                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div>
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">{{modelTitle}}</sui-modal-header>
                <sui-modal-content>
                    <sui-segment>
                        <form-create ref='formComponent' :singleRoom="selectedRoom" :clickToHeTong="changeToChuZuHeTong"></form-create>
                        <chanzheng-form ref='chanZhengForm' :singleRoom="selectedRoom" v-show="selectedRoom.hasproperty"></chanzheng-form>
                    </sui-segment>
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
                                </sui-message-list>
                            </sui-message>
                        </div>
                        <sui-item class="imageModal">

                            <sui-image :src="assignList.selectedFloor.url" style="display: inline-block; width:700px" />
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
            <sui-modal v-model="exportData.open" class="modal2">
                <sui-modal-header style="border-bottom:0;">导出选择</sui-modal-header>
                <sui-modal-content scrolling image>
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
            <sui-modal class="modal2" v-model="assignForm.open">
                <sui-modal-header style="border-bottom:0;">输入面积</sui-modal-header>
                <sui-modal-content image>
                    <assign-form ref='formComponentAssign' :index="selectedRoomInFloorIndex" :singleEntry="selectedRoomInFloor">
                    </assign-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeAssignModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="createAssignment">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal v-model="assignList.open" :key="ComponentKey" class="modal2">
                <sui-modal-content scrolling class="modalStep">
                    <div>
                        <sui-dimmer :active="loading" inverted>
                            <sui-loader content="Loading..." />
                        </sui-dimmer>
                    </div>
                    <div>
                        <sui-tab :menu="{ attached: false }" @change="tabChange" :active-index.sync="activeIndex">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <form-create ref='formComponent' :singleRoom="selectedRoom" :clickDingWei="clickDingWei" :clickToHeTong="changeToChuZuHeTong"></form-create>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="产证信息" :attached="false" v-show="selectedRoom.hasproperty" :disabled="!selectedRoom.hasproperty">
                                <div>

                                    <chanzheng-form ref='chanZhengForm' :singleRoom="selectedRoom"></chanzheng-form>

                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="资产信息" :attached="false" :disabled="!selectedRoom.inaccount">
                                <div>
                                    <zichan-form ref='zichanForm' :singleRoom="selectedRoom"></zichan-form>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="楼层管理" :attached="false" :disabled="selectedRoom.kind==2">

                                <sui-grid :columns="3" relaxed="very">
                                    <sui-dimmer :active="loading" inverted>
                                        <sui-loader content="Loading..." />
                                    </sui-dimmer>
                                    <sui-grid-column :width="4">
                                        <div>
                                            <vue-tree-list @click="onClick" @change-name="onChangeName" @delete-node="onDel" @add-node="onAddNode" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                                                <span class="icon" slot="leafNodeIcon">
                                                </span>
                                                <span class="icon" slot="treeNodeIcon">
                                                </span>
                                            </vue-tree-list>
                                        </div>
                                        <sui-button basic color="blue" @click.native="openBuildingModal" v-show="selectedRoom.kind==1" size="tiny">
                                            新增
                                        </sui-button>
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
                                                        <sui-button basic color="blue" @click.native="createAssignment" class="buttonblueFun" size="tiny">
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
                                                        <div class="reversed" v-show="unit.type=='reversed'"></div>
                                                        {{unit.text}} {{unit.space}}(m²)
                                                    </div>
                                                </sui-list-item>
                                            </sui-list>
                                        </div>
                                    </sui-grid-column>
                                </sui-grid>

                            </sui-tab-pane>
                            <sui-tab-pane title="房屋面积" :attached="false" style="max-height:600px;overflow-y: auto;" :disabled="selectedRoom.kind==2">
                                <mianji-form ref='mianjiForm' :singleRoom="selectedRoom"></mianji-form>
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
                                            <!-- <label>地址</label>
                                            <sui-form-field>
                                                <sui-input type="text" placeholder="输入地址" v-model="keyword" />
                                            </sui-form-field> -->
                                        </sui-form-fields>
                                    </sui-form>
                                </div>
                                <baidu-map class="map" :center="point" :zoom="15">
                                    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_PERSPECTIVE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                                    </bm-marker>
                                    <bm-local-search :keyword="keyword" :auto-viewport="true" location="上海" @markersset="setFirstPoint" @searchComplete="setFirstPoint"></bm-local-search>
                                </baidu-map>
                            </sui-tab-pane>
                            <sui-tab-pane title="资料管理" :attached="false">
                                <div is="sui-divider" horizontal>
                                    <h4 is="sui-header">
                                        <i class="tag icon"></i>
                                        产证资料
                                    </h4>
                                </div>
                                <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFileChanZheng" :file-list="chanzhenZiLiao">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <div is="sui-divider" horizontal>
                                    <h4 is="sui-header">
                                        <i class="tag icon"></i>
                                        房屋图纸资料
                                    </h4>
                                </div>
                                <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFileTuzhi" :file-list="tuzhiZiLiao">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <div is="sui-divider" horizontal>
                                    <h4 is="sui-header">
                                        <i class="tag icon"></i>
                                        其他资料
                                    </h4>
                                </div>
                                <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFileQita" :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <div is="sui-divider" horizontal>
                                    <h4 is="sui-header">
                                        <i class="tag icon"></i>
                                        已上传文档
                                    </h4>
                                </div>
                                <div>
                                    <sui-list key="213123">
                                        <sui-list-item v-for="(link) in selectedRoom.qitaziliaoList" :key="link[0]">
                                            <a type="primary" :href="link.fileURL" target="_blank">{{link.fileName}}--({{link.type}})</a>
                                        </sui-list-item>
                                    </sui-list>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="房间列表" :attached="false" :disabled="selectedRoom.kind==2">
                                <vuetable ref="vuetable" :api-mode="false" :data="unitRoomData" :fields="fieldsUnit" data-path="data" :key="componentAssignListkey">
                                </vuetable>
                            </sui-tab-pane>
                        </sui-tab>
                    </div>

                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="blue" @click.native="toggle">
                        保存
                    </sui-button>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader.vue'
import dialogBar from '@/components/MDialog'
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "./FieldsDef.js";
import FieldsDefList from "./FieldsDefList.js";
import FieldsUnit from "./FieldsUnit.js";
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import chanZhengForm from "@/components/chanZhengForm";
import ziChanForm from "@/components/ziChanForm";
import mianjiForm from "@/components/mianjiForm";
import FormCreate from "@/components/createForm";
import constants from "@/util/constants";
import global from "@/global/index"
import {
    localGet
} from "@/util/storage"; // 导入存储函数
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list'
import {
    uploadZiliaoFileApi,
    updateFloorInfoApi
    // getFileOSSApi
    //getRentRoomContractListApi
} from "@/api/utilApi";
import {
    notifySomething,
    goToLogin
} from "@/util/utils"
import {
    getRoomDataApi,
    createRoomApi,
    updateRoomApi,
    deleteRoomApi,
    createBuildingApi,
    getBuildingListApi,
    createBuildingFloorApi,
    createAssignmentApi,
    deleteBuildingApi,
    getBuildingFloorApi,
    getFloorById,
    getRoomStatApi,
    deleteFloorApi,
    getroomunitinfo,
    renamefloorApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    props: ["kind"],
    components: {
        VuetableRowHeader,
        VueTreeList,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        FormCreate,
        'zichan-form': ziChanForm,
        'chanzheng-form': chanZhengForm,
        'building-form': BuildingForm,
        'assign-form': AssignForm,
        'mianji-form': mianjiForm
    },
    data() {
        return {
            options: [{
                text: "办公性",
                value: 1
            }, {
                text: "经营性",
                value: 2
            }],
            componentAssignListkey: 1,
            chanzhenZiLiao: [],
            tuzhiZiLiao: [],
            fileList: [],
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            exportData: {
                open: false,
                kind: "0"
            },
            filterString: {
                jiadi: "",
                diji: "",
                page: 1
            },
            activeIndex: 0,
            showMap: false,
            point: {},
            buildingFloorForm: {
                open: false
            },
            singleBuilding: {},
            buildingImage: {
                open: false,
                notification: ""
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
                roomname: "",
                area: "奉贤区"
            },
            ComponentKey: 1,
            listField: FieldsDefList,
            fields: FieldsDef,
            fieldsUnit: FieldsUnit,
            imgeComponentKey: 1,
            assignList: {
                open: false,
                buildings: [],
                selectedBuilding: {},
                selectedFloor: {}
            },
            buildingForm: {
                open: false
            },
            treeData: [],
            tree: new Tree([]),
            keyword: "",
            uploadCount: 0,
            roomInFloor: [],
            roomType: 1,
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
            unitRoomData: []

        };
    },

    //     juji: data.assign.juji,
    // fujuji: data.assign.fujuji,
    // chuji: data.assign.chuji,
    // fuchuji: data.assign.fuchuji,
    // keji: data.assign.keji,
    // fukeji: data.assign.fukeji,
    // keyuan: data.assign.keyuan,
    // qita: data.assign.qita,
    // roomname: data.assign.roomname,
    // beizhu: data.assign.beizhu,
    // roomnumber: data.assign.roomnumber

    methods: {
        onSearch() {
            var payload = {
                name: this.filterString.name,
                page: 1,
            }
            if (this.filterString.kind) {
                payload.kind = this.filterString.kind
            }
            this.refreshRooms(payload);
        },
        getroomunitinfo(data) {
            var context = this;
            getroomunitinfo(data).then((result) => {
                if (result.data.code == 0) {
                    console.log(result.data.data);
                    this.unitRoomData = [];
                    var resultSet = result.data.data;
                    resultSet.map((one) => {

                        if (one.room_info != null) {
                            one.room_info.map((infoData) => {
                                var dataOne = {
                                    name: one.unit_name,
                                    roomNumber: one.roomnumber,
                                    roomName: one.roomName,
                                    keyuan: 0,
                                    chuji: 0,
                                    fuchuji: 0,
                                    qita: 0,
                                    keji: 0,
                                    fukeji: 0,
                                    juji: 0,
                                    fujuji: 0,
                                    space: 0
                                }
                                var parsedData = JSON.parse(infoData[0]);

                                if (parsedData.hasOwnProperty("roomname")) {
                                    dataOne.roomName = parsedData.roomname;
                                }
                                if (parsedData.hasOwnProperty("roomnumber")) {
                                    dataOne.roomNumber = parsedData.roomnumber;
                                }
                                if (parsedData.hasOwnProperty("chuji")) {
                                    dataOne.chuji += parsedData.chuji;
                                }
                                if (parsedData.hasOwnProperty("fuchuji")) {
                                    dataOne.fuchuji += parsedData.fuchuji;
                                }
                                if (parsedData.hasOwnProperty("keji")) {
                                    dataOne.keji += parsedData.keji;
                                }
                                if (parsedData.hasOwnProperty("fukeji")) {
                                    dataOne.fukeji += parsedData.fukeji;
                                }
                                if (parsedData.hasOwnProperty("juji")) {
                                    dataOne.juji += parsedData.juji;
                                }
                                if (parsedData.hasOwnProperty("fujuji")) {
                                    dataOne.fujuji += parsedData.fujuji;
                                }
                                if (parsedData.hasOwnProperty("qita")) {
                                    dataOne.qita += parsedData.qita;
                                }
                                if (parsedData.hasOwnProperty("keyuan")) {
                                    dataOne.keyuan += parsedData.keyuan;
                                }

                                dataOne.space = JSON.parse(infoData[1]);

                                this.unitRoomData.push(dataOne)
                            })
                        }

                    });

                }
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });

        },
        changeToChuZuHeTong() {
            this.$router.push("rentAssign?room_id=" + this.selectedRoom.id);
        },
        clickDingWei() {
            this.activeIndex = 5;
            //this.keyword = this.selectedRoom.address;
        },
        tabChange() {
            this.context = this.$refs.canvas;
            if (this.activeIndex == 4) {
                if (this.context == undefined) {
                    setTimeout(this.tabChange, 1000)
                } else {
                    this.context = this.context.getContext("2d");
                    this.drawRect(null);
                }
            }
        },
        uploadZiliaoFileTuzhi(e, fileList) {
            this.uploadZiliaoFile(e, fileList, 'tuzhi');
        },
        uploadZiliaoFileChanZheng(e, fileList) {
            this.uploadZiliaoFile(e, fileList, 'chanzheng');
        },
        uploadZiliaoFileQita(e, fileList) {
            this.uploadZiliaoFile(e, fileList, 'qita');

        },
        uploadZiliaoFile(e, fileList, mode) {
            console.log(mode);
            if (this.uploadCount == 1) {
                this.uploadCount = 0;
                return;
            }
            this.uploadCount++;
            fileList.push(e.raw);
            let formData = new FormData();
            this.loading = true;
            var context = this;
            //  this.buildingImage.open = false;
            if (e.raw != undefined) {
                formData.append('ossfile', e.raw);
                uploadZiliaoFileApi(formData).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        if (mode == 'tuzhi') {
                            context.tuzhiZiLiao.push({
                                url: result.data.data,
                                fileName: e.name,
                                type: '图纸'
                            });
                        } else if (mode == 'chanzheng') {
                            context.chanzhenZiLiao.push({
                                url: result.data.data,
                                fileName: e.name,
                                type: "产证"
                            });

                        } else {
                            context.fileList.push({
                                url: result.data.data,
                                fileName: e.name,
                                type: "其他"
                            });
                        }
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }
        },
        setFirstPoint(pois) {
            this.point = pois[0].point;
            this.selectedRoom.lon = this.point.lng;
            this.selectedRoom.lat = this.point.lat;
        },
        //tree
        onDel(node) {
            console.log(node)
            this.deleteBuilding(node);
        },

        onChangeName(params) {
            console.log(params)
            var payoad = {
                id: params.id,
                name: params.newName
            }
            renamefloorApi(payoad).then((result) => {

                if (result.data.code == 0) {
                    //  notifySomething("改名成功", "改名成功", constants.typeSuccess);

                }
            })

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

        //end of tree
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
                    // this.closeAssignModal();
                } else {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                }
            }).catch(function () {
                contextF.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });

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
            if (!data.upper) {
                data.upper = 0;
            }
            if (!data.lower) {
                data.lower = 0;
            }
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
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    //  return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        dragend: function (e) {
            this.loading = true;
            // alert("what")
            if (e == undefined) {
                this.selectedRoom.lon = this.point.lng;
                this.selectedRoom.lat = this.point.lat;
            } else {
                this.selectedRoom.lon = e.point.lng;
                this.selectedRoom.lat = e.point.lat;
            }
            this.loading = false;
            // updateRoomApi(this.selectedRoom).then(() => {
            //     this.loading = false;
            // });
        },
        manualUpdateGeo: function () {
            this.loading = true;
            this.selectedRoom.lon = this.point.lng;
            this.selectedRoom.lat = this.point.lat;
            updateRoomApi(this.selectedRoom).then(() => {
                this.loading = false;
            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        openAssignSection(rowData) {
            this.selectedRoom = rowData;
            this.selectedRoomInFloor = {}
            this.selectedRoomInFloorIndex = 0
            // this.default
            this.activeIndex = 0;
            this.selectedRoom.qitaziliaoList = [];

            if (this.selectedRoom.qitaziliao != "") {
                try {
                    this.selectedRoom.qitaziliao = JSON.parse(this.selectedRoom.qitaziliao)
                    this.selectedRoom.qitaziliao.map((one) => {
                        this.selectedRoom.qitaziliaoList.push(one);
                    })
                } catch (error) {
                    console.log("error")
                }

            }
            if (this.selectedRoom.tuzhiziliao != "") {
                try {
                    this.selectedRoom.tuzhiziliao = JSON.parse(this.selectedRoom.tuzhiziliao)
                    this.selectedRoom.tuzhiziliao.map((one) => {
                        this.selectedRoom.qitaziliaoList.push(one);
                    })
                } catch (error) {
                    console.log("error")
                }
            }
            if (this.selectedRoom.chanzhengziliao != "") {
                try {
                    this.selectedRoom.chanzhengziliao = JSON.parse(this.selectedRoom.chanzhengziliao)
                    this.selectedRoom.chanzhengziliao.map((one) => {
                        this.selectedRoom.qitaziliaoList.push(one);
                    })
                } catch (error) {
                    console.log("error")
                    //do nothing
                }

            }
            try {
                this.selectedRoom.qitaziliaoList.map((one) => {
                    one.fileURL = constants.fileURL + one.url;
                })
            } catch (error) {
                console.log("error")
            }
            this.modalMode = "edit";
            // point 
            if (rowData.lat === null || rowData.lat == "") {
                this.point = {
                    lng: 121.547967,
                    lat: 30.879141
                }
            } else {
                this.point = {
                    lng: rowData.lon,
                    lat: rowData.lat
                }
            }
            this.loading = true;
            this.tree = new Tree([]);
            this.assignList.selectedBuilding = false;
            this.assignList.selectedFloor = {
                url: ""
            };

            this.loading = false;
            this.openAssignSec();
            this.getBuildingSection();
            // get room Stats
            this.getRoomStat({
                unit_id: this.selectedRoom.id
            })
            this.getroomunitinfo({
                room_id: this.selectedRoom.id,
                room_type: this.roomType
            })

        },
        getRoomStat(data) {
            data.room_type = this.roomType;
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
                    this.selectedRoom.space10 = this.selectedRoom.space7 + this.selectedRoom.space28 + this.selectedRoom.space40 + this.selectedRoom.space25 + this.selectedRoom.space29 + this.selectedRoom.space24;
                }
            })

        },
        getBuildingSection() {
            let data = {};
            data.room_id = this.selectedRoom.id;
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
                    // building.editLeafNodeDisabled = false;
                    // building.delLeafNodeDisabled = false;
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
                // this.ComponentKey++;
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        openAssignSec() {
            this.assignList.open = true;
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
                this.openAssignSec();
                // this.drawRect()
            }).catch(function () {
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
                yewuyongfang: 0,
                reversed: 0
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
                                    case "reversed":
                                        tmpSum.reversed += parseFloat(one.space);
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
                    text: "业务"
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
                },
                {
                    type: "reversed",
                    space: tmpSum.reversed,
                    text: "服务"
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
                            context.selectedRoomInFloor.type = "业务"
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
                        case "reversed":
                            context.selectedRoomInFloor.type = "服务"
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
        clickConfirmDelete() {
            this.loading = true;

            if (this.deleteTarget.type == "Room") {
                deleteRoomApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        this.refreshRooms({
                            page: 1
                        });
                        this.$notify({
                            group: 'foo',
                            title: '删除自有房屋成功',
                            text: '删除自有房屋成功'
                        });
                    } else if (result.data.code == 3) {
                        notifySomething(constants.GENERALERROR, "房屋被占用", constants.typeError);

                    }
                    this.loading = false;

                });
            } else if (this.deleteTarget.type == "Floor") {
                deleteFloorApi(this.deleteTarget).then((result) => {
                    this.getBuildingSection();
                    if (result.data.code == 0) {
                        this.$notify({
                            group: 'foo',
                            title: '删除楼层成功',
                            text: '删除楼层成功'
                        });
                    } else if (result.data.code == 3) {
                        notifySomething(constants.GENERALERROR, "楼层被占用", constants.typeError);
                    }
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.deleteTarget.type == "Building") {
                deleteBuildingApi(this.deleteTarget).then((result) => {
                    this.getBuildingSection();
                    if (result.data.code == 0) {
                        this.$notify({
                            group: 'foo',
                            title: '删除房成功',
                            text: '删除房成功'
                        });
                    } else if (result.data.code == 3) {
                        notifySomething(constants.GENERALERROR, "楼房被占用", constants.typeError);
                    }
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.deleteTarget.type == "BuildingFloorAssignment") {
                this.loading = true;
                let data = this.deleteTarget;
                console.log(JSON.stringify(data));
                if (this.roomAssignment == null || this.roomAssignment == {}) {
                    this.roomAssignment = [];
                }
                var deleteIndex = -1;
                this.roomAssignment.map((one, index) => {
                    if (one.id == data.id) { //已经有了的话 直接更新
                        if (one.roomname == data.roomname) {
                            deleteIndex = index;
                        }
                    }
                })
                if (deleteIndex != -1) {
                    this.roomAssignment.splice(deleteIndex, 1)
                }
                var contextF = this;
                if (this.context) {
                    this.context.clearRect(0, 0, 500, 350);
                }
                createAssignmentApi({
                    assignment: JSON.stringify(this.roomAssignment),
                    id: this.assignList.selectedFloor.id
                }).then((result) => {
                    this.loading = false;
                    if (result.data.code == 0) {
                        // this.context.clearRect(0, 0, 500, 350);
                        this.roomAssignment = [];
                        this.roomAssignmentTotal = [];
                        this.getBuildingSection();
                        // this.closeAssignModal();
                        notifySomething(constants.DELETESUCCESS, constants.DELETESUCCESS, constants.typeSuccess);

                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    contextF.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });

            }

        },
        createBuilding: function () {
            this.$refs.formComponentBuilding.singleBuilding.room_id = this.selectedRoom.id;
            this.loading = true;
            this.$refs.formComponentBuilding.singleBuilding.type = this.roomType;
            createBuildingApi(this.$refs.formComponentBuilding.singleBuilding).then((result) => {
                this.buildingForm.open = false;
                this.getBuildingSection();
                this.$refs.formComponentBuilding.singleBuilding.building_id = result.data.data;
                this.createBuildingFloor(this.$refs.formComponentBuilding.singleBuilding);
            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        exportToExcel() {
            this.exportData.open = true;
        },
        openExportUrl() {
            let local_auth = localGet(global.project_key, true);
            if (this.exportData.kind != "0") {
                window.open(constants.exportroom + "?token=" + local_auth + "&kind=" + this.exportData.kind);
            } else {
                window.open(constants.exportroom + "?token=" + local_auth);
            }
            this.exportData.open = false;
        },
        closeModalExport() {
            this.exportData.open = false;
        },
        deleteRoom(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.roomname + ")?",
                id: data.id,
                type: "Room"
            };
        },
        deleteBuilding(building) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + building.name + "(" + building.id + ")?",
                id: building.id,
                type: "Building"
            };
            if (building.isLeaf) {
                this.deleteTarget.type = "Floor"
            }
        },
        deleteBuildingFloorAssignment(building) {
            this.sendVal = true;
            console.log(building)
            this.deleteTarget = {
                text: "是否要删除" + building.roomname + "(" + building.roomnumber + ")?",
                id: building.id,
                roomname: building.roomname,
                roomnumber: building.roomnumber,
                room_id: this.selectedRoom.id,
                building_id: this.assignList.selectedBuilding.id,
                floor_id: this.assignList.selectedFloor.id,
                unit_id: building[0],
                type: "BuildingFloorAssignment"
            };
        },
        refreshRooms(payload) {
            this.loading = true;
            getRoomDataApi(payload).then((data) => {
                //this.localData = data.data.data;
                if (data.data.code == 0) {
                    this.loading = false;
                    this.localData = data.data.data
                    this.localData.data.map((one) => {
                        switch (one.kind) {
                            case 2:
                                one.kindText = "经营性"
                                one.kindShow = true;
                                break;
                            case 1:
                                one.kindText = "办公性"
                                one.kindShow = false;
                                break;

                            default:
                                break;
                        }

                    })
                } else if (data.data.code == 2) {
                    notifySomething("重复登陆 请重新登陆", constants.GENERALERROR, constants.typeError);
                    goToLogin();
                    this.$router.push("/login");
                }
            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        // assignRentRoom(rowData){
        //     console.log(rowData);
        // },
        createRoomModel() {
            // show create Model
            this.modelTitle = "创建房屋"
            this.modalMode = "create";
            this.open = true;
            this.selectedRoom = {
                room_id: "",
                certid: "",
                owner: "",
                address: "",
                roomname: "",
                usage: "",
                space: "",
                optional: "",
                age: "2000",
                built_date: "",
                origin_value: "",
                room_value: "",
                dep: "",
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: "",
                area: "奉贤区",
                usage1: "1"
            };
        },
        toggle() {
            this.loading = true;
            let formdata = this.selectedRoom;
            if (formdata.space == "") {
                formdata.space = null;
            }
            if (formdata.usage == "") {
                formdata.usage = null
            }
            var context = this;
            //kind=1 means 自由房屋创建和编辑
            //this.selectedRoom.kind = 1;
            if (this.modalMode == "create") {
                createRoomApi(this.selectedRoom).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        this.closeModal();
                        notifySomething("创建自有房屋成功", "创建自有房屋成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.modalMode == "edit") {
                // this.selectedRoom.qitaziliao = JSON.stringify([])
                // this.selectedRoom.tuzhiziliao = JSON.stringify([])
                // this.selectedRoom.chanzhengziliao = JSON.stringify([])
                // 有list的时候 ，，不为空时 merge。
                if (this.fileList.length > 0) {
                    if (this.selectedRoom.qitaziliao != "") {
                        this.selectedRoom.qitaziliao = this.selectedRoom.qitaziliao.concat(this.fileList);
                        this.selectedRoom.qitaziliao = JSON.stringify(this.selectedRoom.qitaziliao);
                    } else {
                        // 为空时 直接等于
                        this.selectedRoom.qitaziliao = JSON.stringify(this.fileList);
                    }
                    //重置
                    this.fileList = [];
                    //没有新添加的时候
                } else {
                    //如果没有值 "" 不干嘛， 有值的话 直接stringify
                    //if (this.selectedRoom.qitaziliao != "") {
                    if (this.selectedRoom.qitaziliao == "") {
                        this.selectedRoom.qitaziliao = [];
                    }
                    this.selectedRoom.qitaziliao = JSON.stringify(this.selectedRoom.qitaziliao);
                    //}
                }
                if (this.tuzhiZiLiao.length > 0) {
                    if (this.selectedRoom.tuzhiziliao != "") {
                        this.selectedRoom.tuzhiziliao = this.selectedRoom.tuzhiziliao.concat(this.tuzhiZiLiao);
                        this.selectedRoom.tuzhiziliao = JSON.stringify(this.selectedRoom.tuzhiziliao);
                    } else {
                        this.selectedRoom.tuzhiziliao = JSON.stringify(this.tuzhiZiLiao);
                    }
                    this.tuzhiZiLiao = [];
                } else {
                    //if (this.selectedRoom.tuzhiziliao.length) {
                    if (this.selectedRoom.tuzhiziliao == "") {
                        this.selectedRoom.tuzhiziliao = [];
                    }
                    this.selectedRoom.tuzhiziliao = JSON.stringify(this.selectedRoom.tuzhiziliao)
                    //}
                }
                if (this.chanzhenZiLiao.length > 0) {
                    if (this.selectedRoom.chanzhengziliao != "") {
                        this.selectedRoom.chanzhengziliao = this.selectedRoom.chanzhengziliao.concat(this.chanzhenZiLiao)
                        this.selectedRoom.chanzhengziliao = JSON.stringify(this.selectedRoom.chanzhengziliao);
                    } else {
                        this.selectedRoom.chanzhengziliao = JSON.stringify(this.chanzhenZiLiao);
                    }
                    this.chanzhenZiLiao = [];
                } else {
                    if (this.selectedRoom.chanzhengziliao == "") {
                        this.selectedRoom.chanzhengziliao = [];
                        //this.selectedRoom.chanzhengziliao = JSON.stringify(this.selectedRoom.chanzhengziliao);
                    }
                    this.selectedRoom.chanzhengziliao = JSON.stringify(this.selectedRoom.chanzhengziliao);
                }
                updateRoomApi(this.selectedRoom).then((result) => {
                    if (result.data.code == 0) {
                        this.closeModal();
                        this.$notify({
                            group: 'foo',
                            title: '更新自有房屋成功',
                            text: '更新自有房屋成功',
                            type: "success"
                        });
                    } else {
                        notifySomething("更新自有房屋失败", "更新自有房屋失败", "error");
                        this.refreshRooms({
                            page: 1
                        });
                    }
                    this.loading = false;
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }
        },
        openBuildingModal() {
            this.assignList.open = false;
            this.buildingForm.open = true;
        },
        openRoom(value) {
            console.log(value);
        },
        submit() {
            console.log(this.filterString);
        },
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            // this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.loading = true;
            if (page == "next") {
                page =
                    1 + this.$refs.vuetable.currentPage
            }
            if (page == "prev") {
                page =
                    this.$refs.vuetable.currentPage - 1
            }
            var payload = {
                name: this.filterString.name,
                page: page,
            }
            if (this.filterString.kind) {
                payload.kind = this.filterString.kind
            }
            this.refreshRooms(payload);
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.open = false;
            // /this.assignForm.open = false;
            this.buildingForm.open = false;
            this.buildingFloorForm.open = false;
            this.buildingImage.open = false;
            this.assignList.open = false;
            this.refreshRooms({
                page: 1
            });
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
        closeImageModal() {
            this.buildingImage.open = false;
            this.assignList.open = true;
        },
        closeAssignModal() {
            this.assignForm.open = false;
            this.assignList.open = true;
        }

    },

    created() {
        this.refreshRooms({
            page: 1
        })
    }
};
</script>

<style>
.ui.positive.button {
    background-color: #75ADBF !important;
}

.imageForm {
    display: block;
    width: 100%;

}

.wl-viewer {
    height: 90%;
    width: 90%;
    margin: 4% auto 0;
}

.imageModal {
    height: 500px;
}

.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
    max-height: 900px !important;
}

.ui.modal>.actions {
    background: rgb(249, 250, 251);
    border-bottom-left-radius: 0.285714rem;
    border-bottom-right-radius: 0.285714rem;
    padding: 1rem;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    text-align: center;
}

.ui.modal .content {
    padding: 15px;
    box-sizing: border-box;
    max-height: none !important;
}

.ui.table {
    font-size: 13px;
}

.louBackground {
    background-size: cover;
    background-image: url("../../../../public/lou.png");
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

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 0 0 15px 0
}

.vue2Table {
    /* margin: 20px; */
}

.buttonBuildingFloor {
    margin: 10px
}

.pagination {
    margin-top: 1rem;
}

.modalStep {
    /* height: 500px; */
}

.tabNew {
    margin-left: 20px;
    margin-right: 20px;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}

.ui.text.menu {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 1000;
    color: black;
}

.thTextcenter {
    text-align: center !important;
    border-bottom: 0px !important;
}

.ui.text.menu .active.item {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 1000;
    color: #75ADBF;
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

.yewuyongfang {
    background-color: blue;
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

.baise {
    background-color: white;
    border: 1px;
    height: 10px;
    display: inline-block;
    width: 10px;
    border-color: black;
    border-style: solid;
}

.reversed {
    background-color: rgb(10, 10, 10);
    width: 10px;
    height: 10px;
    display: inline-block;
}

.displayInline {
    display: inline;

}

.buttonblueFun {
    margin-top: 20px !important;
    font-size: 10px !important;

}

.ui.modal .scrolling.content {
    overflow: auto;
    max-height: 500px !important;
}
</style>
