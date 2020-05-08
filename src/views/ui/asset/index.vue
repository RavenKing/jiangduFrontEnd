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
            <sui-button content="添加" @click.native="createRoomModel" icon="add green" />
            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>
        <div class="filterBiaoDan">
            <sui-form>
                <sui-form-fields inline>
                    <label> 房屋ID</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.jiadi" />
                    </sui-form-field>
                    <label> 权证号</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.diji" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields inline>
                    <label> 使用面积</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                    </sui-form-field>
                    <label> 至</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields inline>
                    <label> 产证面积</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                    </sui-form-field>
                    <label> 至</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                    </sui-form-field>
                </sui-form-fields>
            </sui-form>
            <sui-button positive content="查询" v-on:click="submit" />
            <sui-button content="重置" />
        </div>
        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <!-- <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button positive content="编辑" v-on:click="viewSomeThing(props.rowData,'modify')" />
                    <sui-button content="删除" v-on:click="deleteRoom(props.rowData)" />
                    <sui-button positive content="定位地址" v-on:click="showMapF(props.rowData)" />
                    <sui-button content="分配房屋" v-on:click="openAssignSection(props.rowData)" />
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
                        <form-create ref='formComponent'></form-create>
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
            <sui-modal class="modal2" v-model="buildingImage.open">
                <sui-modal-header>放大图</sui-modal-header>
                <sui-modal-content image>
                    <sui-image src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4034879928,1229713244&fm=26&gp=0.jpg" size="medium" centered />
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
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
                    <sui-button negative @click.native="closeModal">
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
        <div v-show="showMap">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="tag icon"></i>
                    地址选取({{selectedRoom.roomname}})
                </h4>
            </div>

            <baidu-map class="map" :center="point" :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                </bm-marker>
            </baidu-map>
        </div>
        <div v-show="assignList.open">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="tag icon"></i>
                    分配房屋({{selectedRoom.roomname}})
                </h4>
            </div>
            <div class="buttonBuildingFloor">
                <sui-button positive @click.native="openBuildingModal()">
                    创建楼
                </sui-button>
                <sui-button positive @click.native="openBuildingFloorModel()">
                    创建楼层
                </sui-button>
            </div>
            <div class="tabNew">
                <sui-tab ref="tab" :key="componentKey" @change="handleTabChange">
                    <sui-tab-pane v-for="building in assignList.buildings" v-bind:key="building.id" :title="building.name">
                        <p>简介:{{building.detail}}</p>
                        <sui-item-group divided>
                            <sui-item>

                                <sui-statistic horizontal size="huge">
                                    <sui-statistic-value>
                                        第一层这一层很大：
                                    </sui-statistic-value>
                                    <sui-statistic-value>
                                        2,204
                                    </sui-statistic-value>
                                    <sui-statistic-label>
                                        平米
                                    </sui-statistic-label>
                                </sui-statistic>
                                <sui-button @click.native="openAssignModal(building)">
                                    分配
                                </sui-button>
                                <sui-button @click.native="openImageModal()">
                                    楼层图
                                </sui-button>

                            </sui-item>
                            <sui-item>
                                这层给Kevin</sui-item>
                            <sui-item>
                                测试</sui-item>
                        </sui-item-group>
                    </sui-tab-pane>
                </sui-tab>
            </div>
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
import {
    export_json_to_excel
} from "@/util/Export2Excel";
// import {
//     getMapLonAndLat
//     //getRentRoomContractListApi
// } from "@/api/utilApi";
import {
    getRoomDataApi,
    createRoomApi,
    updateRoomApi,
    deleteRoomApi,
    createBuildingApi,
    getBuildingListApi,
    createBuildingFloorApi,
    createAssignmentApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        FormCreate,
        'building-form': BuildingForm,
        'buildingFloor-form': BuildingFloorForm,
        'assign-form': AssignForm
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
            componentKey: 1,
            showMap: false,
            point: {},
            buildingFloorForm: {
                open: false
            },
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
            selectedRoom: {},
            listField: FieldsDefList,
            fields: FieldsDef,
            assignList: {
                open: false,
                buildings: [{
                    id: "123",
                    name: "cool",
                    detal: "cool"
                }]
            },
            buildingForm: {
                open: false
            }
        };
    },

    methods: {
        openImageModal() {
            this.buildingImage.open = true;
        },
        createAssignment() {
            this.loading = true;
            let data = this.$refs.formComponentAssign.singleAssignment;
            data.room_id = this.assignForm.room_id;
            data.building_id = this.assignForm.building_id;
            data.floor_id = this.assignForm.floor_id;
            createAssignmentApi(data).then((result) => {
                this.loading = false;
                console.log(result);
            })

        },
        openAssignModal(building) {
            this.assignForm.room_id = building.room_id;
            this.assignForm.building_id = building.id;
            this.assignForm.floor_id = 1;
            //TODO floor_id
            this.assignForm.open = true;
        },

        openBuildingFloorModel() {
            this.buildingFloorForm.open = true;
        },
        createBuildingFloor() {
            this.loading = true;
            this.$refs.formComponentBuildingFloor.singleBuildingFloor.building_id = this.selectedBuildingID;
            createBuildingFloorApi(this.$refs.formComponentBuildingFloor.singleBuildingFloor).then(() => {
                this.loading = false;
                this.buildingFloorForm.open = false;
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
        showMapF: function (data) {
            this.assignList.open = false;
            this.selectedRoom = data;
            this.showMap = true;
            //  this.loading = true;

            this.point = {
                lng: data.lon,
                lat: data.lat
            }
        },
        handleTabChange: function (e, activePane) {
            console.log(activePane.title);
            this.assignList.buildings.map((building) => {
                if (building.name == activePane.title) {
                    this.selectedBuildingID = building.id;
                }
                console.log(this.selectedBuildingID);
            });

        },
        dragend: function (e) {
            this.loading = true;
            this.selectedRoom.lon = e.point.lng;
            this.selectedRoom.lat = e.point.lat;
            updateRoomApi(this.selectedRoom).then((result) => {
                console.log(result);
                this.loading = false;
            });
        },
        openAssignSection(rowData) {
            this.loading = true;
            this.assignList.open = true;
            this.showMap = false;
            this.selectedRoom = rowData;
            this.getBuildingSection();
        },
        getBuildingSection() {
            let data = {};
            data.room_id = this.selectedRoom.room_id;
            // get room
            getBuildingListApi(data).then((result) => {
                this.loading = false;
                //get floor
                this.assignList.buildings = [];
                this.assignList.buildings = result.data.data;
                this.assignList.buildings.map((building) => {
                    this.getBuildingFloorSection(building);
                })
                if (this.assignList.buildings.length > 0) {
                    this.selectedBuildingID = this.assignList.buildings[0].id;
                }
                this.componentKey += 1;
            });
        },
        getBuildingFloorSection(building) {

            console.log(building);

        },
        clickConfirmDelete() {
            this.loading = true;
            deleteRoomApi(this.deleteTarget).then((result) => {
                this.refreshRooms();
                console.log(result)
            });
        },
        createBuilding: function () {
            this.$refs.formComponentBuilding.singleBuilding.room_id = this.selectedRoom.room_id;
            this.loading = true;
            createBuildingApi(this.$refs.formComponentBuilding.singleBuilding).then((result) => {
                this.buildingForm.open = false;
                this.getBuildingSection();
                console.log(result);
            })
        },
        viewSomeThing(data, type) {
            this.$refs.formComponent.singleRoom = data;
            //修改
            if (type == "modify") {
                //查看
                this.modelTitle = "编辑房屋";
                this.modalMode = "edit";
                this.open = !this.open;
                console.log(data.lat);
                console.log(data.lon);
                if (this.$refs.formComponent.zoomlevel == 14) {
                    this.$refs.formComponent.zoomlevel = 13;
                }
                if (data.lat === null) {
                    this.$refs.formComponent.point = {
                        lng: 121.547967,
                        lat: 30.879141
                    }
                } else {
                    this.point = {
                        lng: data.lon,
                        lat: data.lat
                    }
                    this.$refs.formComponent.point = {
                        lng: data.lon,
                        lat: data.lat
                    }
                }
            } else if (type == "check") {
                this.modalMode = "check";
                this.modelTitle = "查看Room";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
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
                id: data.id
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
            this.$refs.formComponent.singleRoom = {
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
            this.open = !this.open;
            this.loading = true;
            let formdata = this.$refs.formComponent.singleRoom;
            if (formdata.space == "") {
                formdata.space = null;
            }
            if (formdata.usage == "") {
                formdata.usage = null
            }
            if (this.modalMode == "create") {
                createRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    console.log(result);
                    this.loading = false;
                });
            } else if (this.modalMode == "edit") {
                updateRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    console.log(result);
                    this.loading = false;
                });
            }

        },
        openBuildingModal() {
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
            this.assignForm.open = false;
            this.buildingForm.open = false;
            this.buildingFloorForm.open = false;
            this.buildingImage.open = false;
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

.wl-viewer {
    height: 90%;
    width: 90%;
    margin: 4% auto 0;
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
