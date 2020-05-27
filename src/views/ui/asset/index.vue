<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div is="sui-divider" horizontal>
            <h4 is="sui-header">
                <i class="tag icon"></i>
                基本信息列表
            </h4>
        </div>

        <div class="filterBiaoDan">
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
                    <sui-button positive content="查询" v-on:click="submit" />
                    <sui-button content="重置" />
                </sui-form-fields>
            </sui-form>
        </div>
        <div class="filterBiaoDan">
            <sui-button content="创建房屋" @click.native="createRoomModel" icon="add green" />
            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>
        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <!-- <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button positive content="编辑" v-on:click="openAssignSection(props.rowData)" />
                    <sui-button negative content="删除" v-on:click="deleteRoom(props.rowData)" />
                    <!-- <sui-button content="分配房屋列表" v-on:click="openAssignList(props.rowData)" /> -->
                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div>
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header>{{modelTitle}}</sui-modal-header>
                <sui-modal-content>
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
                <sui-modal-header>创建楼</sui-modal-header>
                <sui-modal-content image>
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
            <sui-modal class="imageModal" v-model="buildingImage.open" :key="imgeComponentKey">
                <sui-modal-header>放大图</sui-modal-header>
                <sui-modal-content image>

                    <sui-item-group divided>
                        <sui-item class="imageModal">
                            <pdf :src="this.assignList.selectedFloor.url" style="display: inline-block; width:700px" />
                        </sui-item>
                        <sui-item>
                            <input type="file" placeholder="上传Cad图" @change="uploadFile" />
                        </sui-item>

                    </sui-item-group>

                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeImageModal">
                        取消
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="assignForm.open">
                <sui-modal-header>分配楼层</sui-modal-header>
                <sui-modal-content image>
                    <assign-form ref='formComponentAssign'>
                    </assign-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeAssignModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createAssignment">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="buildingFloorForm.open">
                <sui-modal-header>创建楼层</sui-modal-header>
                <sui-modal-content image>
                    <buildingFloor-form ref='formComponentBuildingFloor'>
                    </buildingFloor-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createBuildingFloor">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="assignList.open" >
                <sui-modal-content scrolling>
                    <div>
                        <sui-tab :menu="{ text: true }">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="产证信息" :attached="false">
                                <div>

                                    <chanzheng-form ref='chanZhengForm' :singleRoom="selectedRoom"></chanzheng-form>

                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="资产信息" :attached="false">
                                <div>
                                    <zichan-form ref='zichanForm' :singleRoom="selectedRoom"></zichan-form>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="房屋面积" :attached="false">
                                <mianji-form ref='mianjiForm' :singleRoom="selectedRoom"></mianji-form>
                            </sui-tab-pane>
                            <sui-tab-pane title="楼层管理" :attached="false">
                                <sui-button positive @click.native="openBuildingModal">
                                    创建楼
                                </sui-button>
                                <sui-grid :columns="2" relaxed="very">
                                    <sui-grid-column>
                                        <div>
                                            <vue-tree-list @click="onClick" @change-name="onChangeName" @delete-node="onDel" @add-node="onAddNode" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                                                <span class="icon" slot="addTreeNodeIcon">📂</span>
                                                <span class="icon" slot="addLeafNodeIcon">＋</span>
                                                <span class="icon" slot="editNodeIcon">📃</span>
                                                <span class="icon" slot="delNodeIcon">✂️</span>
                                                <span class="icon" slot="leafNodeIcon">
                                                    <sui-icon name="home" /></span>
                                                <span class="icon" slot="treeNodeIcon">
                                                    <sui-icon name="building outline" /></span>
                                            </vue-tree-list>
                                        </div>
                                    </sui-grid-column>
                                    <sui-grid-column>
                                        <sui-statistic horizontal size="huge">
                                            <sui-statistic-value>
                                                {{assignList.selectedFloor.name}}
                                            </sui-statistic-value>
                                        </sui-statistic>
                                        <div v-show="assignList.selectedBuilding">
                                            <sui-button @click.native="openAssignModal(assignList.selectedBuilding,assignList.selectedFloor)">
                                                分配
                                            </sui-button>
                                            <sui-button @click.native="openImageModal()">
                                                楼层图
                                            </sui-button>
                                        </div>
                                    </sui-grid-column>
                                </sui-grid>

                            </sui-tab-pane>
                            <sui-tab-pane title="地图定位" :attached="false">
                                <div class="imageForm">
                                    <sui-form>
                                        <sui-form-fields inline>
                                            <label> 经度</label>
                                            <sui-form-field>
                                                <input type="text" placeholder="请选择" v-model="point.lng" />
                                            </sui-form-field>
                                            <label> 维度</label>
                                            <sui-form-field>
                                                <input type="text" placeholder="请选择" v-model="point.lat" />
                                            </sui-form-field>
                                        </sui-form-fields>
                                    </sui-form>
                                </div>
                                <baidu-map class="map" :center="point" :zoom="15">
                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                                    </bm-marker>
                                </baidu-map>
                            </sui-tab-pane>
                            <sui-tab-pane title="资料管理" :attached="false">
                                建设中。。。。
                            </sui-tab-pane>
                        </sui-tab>
                    </div>

                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button positive @click.native="toggle">
                        保存
                    </sui-button>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>

                </sui-modal-actions>
            </sui-modal>
        </div>

    </div>

</wl-container>
</template>

<script>
import dialogBar from '@/components/MDialog'
import FormCreate from "@/components/createForm";
import BuildingFloorForm from "@/components/buildingFloorForm"
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FieldsDefList from "./FieldsDefList.js";
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import chanZhengForm from "@/components/chanZhengForm";
import ziChanForm from "@/components/ziChanForm";
import mianjiForm from "@/components/mianjiForm";
import pdf from 'vue-pdf'
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
    getFileOSSApi
    //getRentRoomContractListApi
} from "@/api/utilApi";
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
    updateFloorApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        VueTreeList,
        pdf,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        FormCreate,
        'zichan-form': ziChanForm,
        'chanzheng-form': chanZhengForm,
        'building-form': BuildingForm,
        'buildingFloor-form': BuildingFloorForm,
        'assign-form': AssignForm,
        'mianji-form': mianjiForm
    },
    data() {
        return {
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
                roomname: ""
            },
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
            tree: new Tree([{
                    name: 'Node 1',
                    id: 1,
                    pid: 0,
                    dragDisabled: true,
                    addTreeNodeDisabled: true,
                    addLeafNodeDisabled: true,
                    editNodeDisabled: false,
                    delNodeDisabled: false,
                    children: [{
                        name: 'Node 1-2',
                        id: 2,
                        isLeaf: true,
                        pid: 1
                    }]
                },
                {
                    name: 'Node 2',
                    id: 3,
                    pid: 0,
                    disabled: true
                },
                {
                    name: 'Node 3',
                    id: 4,
                    pid: 0
                }
            ])
        };
    },

    methods: {
        //tree
        onDel(node) {
            console.log(node)
            node.remove()
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
                    this.assignList.selectedFloor.url = file;
                    this.buildingImage.open = true;
                    this.loading = false;
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
                this.closeAssignModal();
                console.log(result);
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

        openBuildingFloorModel() {
            this.buildingFloorForm.open = true;
        },
        createBuildingFloor(data) {
            this.loading = true;
            createBuildingFloorApi(data).then(() => {
                this.loading = false;
                ti
                this.buildingFloorForm.open = false;
                this.$refs.formComponentBuilding.singleBuilding = {
                    room_id: this.selectedRappoom.id,
                    name: "",
                    upper: "",
                    lower: "",
                    detail: ""
                };
            })
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
            // get room
            getBuildingListApi(data).then((result) => {
                this.loading = false;
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
                    building.editNodeDisabled = true;
                    building.delNodeDisabled = true;
                    building.children = [];
                    root.push(building);
                    this.getBuildingFloorSection(building);
                })
                if (this.assignList.buildings.length > 0) {
                    this.selectedBuildingID = this.assignList.buildings[0].id;
                }
                this.treeData = root;
                this.assignList.open = true;

            });
        },
        getBuildingFloorSection(building) {
            var data = {
                building_id: building.id
            }
            //console.log(data);
            getBuildingFloorApi(data).then((result) => {
                building.floors = result.data.data;
                building.floors.map((floor) => {
                    floor.pid = building.id;
                    floor.isLeaf = true;
                    floor.floor_id = floor.id;
                    building.children.push(floor)
                });
                this.tree = new Tree(this.treeData);
            })
        },
        clickConfirmDelete() {
            if (this.deleteTarget.type == "Room") {
                this.loading = true;
                deleteRoomApi(this.deleteTarget).then(() => {
                    this.refreshRooms();
                });
            } else {
                this.loading = true;
                deleteBuildingApi(this.deleteTarget).then(() => {
                    this.getBuildingSection();

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
            })
        },
        viewSomeThing(data, type) {
            // this.$refs.formComponent.singleRoom = data;
            // //修改
            // if (type == "modify") {

            // } else if (type == "check") {
            //     this.modalMode = "check";
            //     this.modelTitle = "查看Room";
            //     this.open = !this.open;
            // } else {
            //     console.log("delete");
            // }
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
        refreshRooms() {
            getRoomDataApi().then((data) => {
                console.log(data);
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
                    data: data.data.data
                }
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
                age: "",
                built_date: "",
                origin_value: "",
                room_value: "",
                dep: "",
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: ""
            };
        },
        toggle() {
            this.loading = true;

            console.log(this.selectedRoom.age);
            console.log(this.selectedRoom.certid);
            let formdata = this.selectedRoom;
            if (formdata.space == "") {
                formdata.space = null;
            }
            if (formdata.usage == "") {
                formdata.usage = null
            }
            if (this.modalMode == "create") {
                this.open = !this.open;
                createRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    this.loading = false;

                });
            } else if (this.modalMode == "edit") {
                this.assignList.open = false;
                updateRoomApi(this.selectedRoom).then((result) => {
                    this.loading = false;
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
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.open = false;
            // /this.assignForm.open = false;
            this.buildingForm.open = false;
            this.buildingFloorForm.open = false;
            this.buildingImage.open = false;
            this.assignList.open = false;
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
                });
            }

        },
        updateFloorInfo(result) {
            this.assignList.selectedFloor.cadfile = result.data.data;
            updateFloorApi(this.assignList.selectedFloor).then((result) => {
                this.loading = false;
                this.$notify({
                    group: 'foo',
                    title: '成功上传',
                    text: '成功上传'
                });
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
        getRoomDataApi().then((data) => {
            //this.localData = data.data.data;
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
                data: data.data.data
            }
        });
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
    min-height: 500px !important;
}

.ui.modal>.actions {
    position: fixed;
    bottom: 0;
    right: 0;
    border: 0px !important;
    background: white !important;
}

.ui.table thead th {
    padding: 2px !important;
    background-color: #75ADBF !important;
    color: white !important;
    font-size: 15px;
    height: 80px !important
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

.buttonBuildingFloor {
    margin: 10px
}

.pagination {
    margin-top: 1rem;
}

.tabNew {
    margin-left: 20px;
    margin-right: 20px;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}
</style>
