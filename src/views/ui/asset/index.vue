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
                                    <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                                </sui-form-field>
                                <label> 至</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="查询" v-on:click="submit" />
                                <sui-button content="重置" />
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
                            <th colspan="7" class="thTextcenter">其中</th>
                        </tr>
                    </template>
                    <vuetable-row-header></vuetable-row-header>
                </template>
                <div slot="wuchanTudiMianji" slot-scope="props">
                    {{props.rowData.rawspace-props.rowData.tudispace}}
                </div>
                <div slot="wuchanJianZhuMianji" slot-scope="props">
                    {{props.rowData.space-props.rowData.jianzhuspace}}
                </div>
                <div slot="action" slot-scope="props">

                    <!-- <sui-button basic color="red"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button basic color="blue" content="编辑" v-on:click="openAssignSection(props.rowData)" />
                    <sui-button basic color="red" content="删除" v-on:click="deleteRoom(props.rowData)" />
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
                        <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
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
                <sui-modal-header style="border-bottom:0;">放大图</sui-modal-header>
                <sui-modal-content image>

                    <sui-item-group divided>
                        <sui-item class="imageModal">
                            <sui-image :src="this.assignList.selectedFloor.url" style="display: inline-block; width:700px" />
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
            <sui-modal class="modal2" v-model="assignForm.open">
                <sui-modal-header style="border-bottom:0;">分配楼层</sui-modal-header>
                <sui-modal-content image>
                    <assign-form ref='formComponentAssign'>
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
                        <sui-tab :menu="{ attached: false }">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
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
                            <sui-tab-pane title="房屋面积" :attached="false" style="max-height:600px;overflow-y: auto;">
                                <mianji-form ref='mianjiForm' :singleRoom="selectedRoom"></mianji-form>
                            </sui-tab-pane>
                            <sui-tab-pane title="楼层管理" :attached="false">
                                <sui-button basic color="blue" @click.native="openBuildingModal">
                                    新增
                                </sui-button>
                                <sui-grid :columns="2" relaxed="very">
                                    <sui-grid-column :width="5">
                                        <div>
                                            <vue-tree-list @click="onClick" @changeName="onChangeName" @delete-node="onDel" @add-node="onAddNode" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                                                <span class="icon" slot="addTreeNodeIcon">📂</span>
                                                <span class="icon" slot="addLeafNodeIcon">＋</span>
                                                <span class="icon" slot="leafNodeIcon">
                                                    <sui-icon name="home" /></span>
                                                <span class="icon" slot="treeNodeIcon">
                                                    <sui-icon name="building outline" /></span>
                                            </vue-tree-list>
                                        </div>
                                    </sui-grid-column>
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

                                        <canvas ref="canvas" id="myCanvas" width="500" height="350" class="louBackground" />
                                        <sui-list v-show="assignList.selectedFloor.name!==undefined">
                                            <sui-list-item v-for="unit in assignList.selectedFloor.unitlist" :key="unit[0]">
                                                {{unit[1]}} {{unit[2]}}平米
                                                <sui-button>
                                                    编辑
                                                </sui-button>
                                                <sui-button @click.native="deleteBuildingFloorAssignment(unit)">
                                                    删除
                                                </sui-button>
                                            </sui-list-item>
                                        </sui-list>
                                        <div v-show="assignList.selectedBuilding">
                                            <sui-button v-show="assignList.selectedBuilding.name!==''" @click.native="openAssignModal(assignList.selectedBuilding,assignList.selectedFloor)">
                                                分配
                                            </sui-button>
                                            <sui-button v-show="assignList.selectedFloor.name!==undefined" @click.native="openImageModal()">
                                                楼层图
                                            </sui-button>
                                        </div>
                                    </sui-grid-column>
                                </sui-grid>

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
                                            <label>地址</label>
                                            <sui-form-field>
                                                <sui-input type="text" placeholder="输入地址" v-model="keyword" />
                                            </sui-form-field>
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
                                <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFile" :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
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
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import chanZhengForm from "@/components/chanZhengForm";
import ziChanForm from "@/components/ziChanForm";
import mianjiForm from "@/components/mianjiForm";
import FormCreate from "@/components/createForm";
import constants from "@/util/constants";
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list'
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    uploadFileApi,
    uploadZiliaoFileApi,
    getFileOSSApi
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
    deleteBuildingFloorAssignmentApi,
    getBuildingFloorApi,
    updateFloorApi
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
            fileList: [],
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            showMap: false,
            point: {},
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
                roomname: "",
                area: "奉贤区"
            },
            ComponentKey: 1,
            listField: FieldsDefList,
            fields: FieldsDef,
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
            uploadCount: 0

        };
    },

    methods: {
        uploadZiliaoFile(e, fileList) {
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
                    console.log(result);
                    if (result.data.code == 0) {
                        this.fileList.push(result.data.data)
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
            } else {
                this.assignList.selectedFloor = params;
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
            if (this.assignList.selectedFloor.cadfile != null) {
                getFileOSSApi(this.assignList.selectedFloor.cadfile).then((file) => {
                    console.log(file);
                    this.buildingImage.open = true;
                    this.loading = false;
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else {
                this.buildingImage.open = true;
                this.loading = false;
            }

        },
        createAssignment() {
            this.loading = true;
            let data = this.$refs.formComponentAssign.singleAssignment;
            data.room_id = this.assignForm.room_id;
            data.building_id = this.assignForm.building_id;
            data.floor_id = this.assignForm.floor_id;
            createAssignmentApi(data).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.getBuildingSection();
                    this.closeAssignModal();
                } else {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                }
            }).catch(function () {
                this.loading = false;
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

        createBuildingFloor(data) {
            this.loading = true;
            createBuildingFloorApi(data).then(() => {
                this.loading = false;
                this.$refs.formComponentBuilding.singleBuilding = {
                    room_id: this.selectedRappoom.id,
                    name: "",
                    upper: "",
                    lower: "",
                    detail: ""
                };
            }).catch(function () {
                this.loading = false;
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
            updateRoomApi(this.selectedRoom).then(() => {
                this.loading = false;
            });
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
            console.log(this.selectedRoom);
            this.selectedRoom = rowData;

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
            this.assignList.open = true;

            this.getBuildingSection();

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
                this.tree = new Tree(this.treeData);
                this.drawRect()
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        drawRect() {
            this.context = this.$refs.canvas.getContext("2d");
            this.context.strokeStyle = "#FF0000";
            this.context.strokeText("201", 10, 20);
            this.context.strokeRect(0, 0, 60, 100);
            this.$refs.canvas.addEventListener('click', function (event) {
                var x = event.pageX
                var y = event.pageY;
                console.log(x + "," + y)
            }, false);

        },
        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.type == "Room") {
                deleteRoomApi(this.deleteTarget).then(() => {
                    this.refreshRooms({
                        page: 1
                    });
                    this.$notify({
                        group: 'foo',
                        title: '删除自有房屋成功',
                        text: '删除自有房屋成功'
                    });
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
                    }
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.deleteTarget.type == "buildingFloorAssignment") {
                deleteBuildingFloorAssignmentApi(this.deleteTarget).then((result) => {
                    // this.ComponentKey++;
                    if (result.data.code == 0) {
                        this.getBuildingSection();
                        this.$notify({
                            group: 'foo',
                            title: '删除房成功',
                            text: '删除房成功'
                        });
                    }
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        createBuilding: function () {
            this.$refs.formComponentBuilding.singleBuilding.room_id = this.selectedRoom.id;
            this.loading = true;
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
            let headers = ['id', 'room_id', 'certid', 'owner', 'address', 'roomname', 'usage', 'space', 'optional', 'age', 'build_date', 'origin_value', 'room_value', 'dep', 'net_value', 'dep_rate', 'internal_info', 'cur_status'];
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
        },
        deleteBuildingFloorAssignment(building) {
            this.sendVal = true;
            console.log(building)
            this.deleteTarget = {
                text: "是否要删除" + building[1] + "(" + building[0] + ")?",
                id: building[0],
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
                            case 1:
                                one.kindText = "经营性"
                                break;
                            case 2:
                                one.kindText = "办公性"
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
                this.open = !this.open;
                createRoomApi(this.selectedRoom).then((result) => {
                    context.loading = false;
                    console.log("success")
                    if (result.data.code == 0) {
                        context.refreshRooms({
                            page: 1
                        });
                        notifySomething("创建自有房屋成功", "创建自有房屋成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.modalMode == "edit") {
                this.assignList.open = false;
                if (this.fileList.length > 0) {
                    this.selectedRoom.qitaziliao = JSON.stringify(this.fileList);
                    this.fileList = [];
                }
                updateRoomApi(this.selectedRoom).then((result) => {
                    if (result.data.code == 0) {
                        this.refreshRooms({
                            page: 1
                        });
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
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.loading = true;
            this.refreshRooms({
                page: page
            });
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
            this.buildingImage.open = false;
            if (e.target.files[0] != undefined) {
                formData.append('ossfile', e.target.files[0]);
                uploadFileApi(formData).then((result) => {
                    this.updateFloorInfo(result);
                    this.closeImageModal();
                    //uppdate file ppath
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        saveImage() {},
        updateFloorInfo(result) {
            this.assignList.selectedFloor.cadfile = result.data.data;
            this.loading = false;
            updateFloorApi(this.assignList.selectedFloor).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.$notify({
                        group: 'foo',
                        title: '成功上传',
                        text: '成功上传',
                        type: "success"
                    });
                }
            }).catch(function () {
                this.loading = false;
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
    height: 600px;
}

.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
    /* min-height: 500px !important; */
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
}

.ui.text.menu .active.item {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 1000;
    color: #75ADBF;
}
</style>
