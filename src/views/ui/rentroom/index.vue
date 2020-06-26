<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan">

            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="13">
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
                                <sui-button positive content="搜索" v-on:click="submit" />
                            </sui-form-fields>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :width="3">
                        <div>
                            <sui-button content="创建房屋" @click.native="createRoomModel" icon="add green" />
                            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
                            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <!-- <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button positive content="修改" v-on:click="viewSomeThing(props.rowData)" />
                    <sui-button negative content="删除" v-on:click="deleteRoom(props.rowData)" />

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
                <sui-modal-content scrolling>
                    <div>
                        <sui-tab :menu="{ text: true }" :active-index.sync="defaultTab">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <rentroom-form :singleRoom="selectedRoom"></rentroom-form>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="合同信息" :attached="false" :disabled="!editMode">
                                <div>

                                    <contract-form :singleEntry="selectedRoomContract" :mianji="selectedRoom.value"></contract-form>
                                    <sui-button content="创建新合同" v-on:click="createRentContract()" />

                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="分配单位" :attached="false" :disabled="!editMode" :key="componentFenpeikey">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader content="Loading..." />
                                </sui-dimmer>
                                <sui-form>
                                    <sui-form-fields inline>
                                        <sui-form-field required :error="validationCheck.unit_id">
                                            <label>单位 </label>
                                            <sui-dropdown placeholder="选择单位" selection :options="unitoptions" v-model="selectedRoom.unit_id" />
                                        </sui-form-field>
                                        <sui-form-field required :error="validationCheck.space">
                                            <label>面积</label>
                                            <sui-input type="text" placeholder="输入面积" v-model="selectedRoom.space_assign" />
                                        </sui-form-field>
                                        <sui-button negative content="添加单位" @click.prevent="assignRentRoom()" />
                                    </sui-form-fields>
                                </sui-form>
                                <div class="vue2Table">
                                    <vuetable ref="vuetable" :api-mode="false" :data="selectedRoom.assignList" :fields="fieldsAssign" data-path="data" :key="componentAssignListkey">
                                        <div slot="action" slot-scope="props">
                                            <!-- <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                                            <sui-button negative content="删除" v-on:click="deleteRoomAssign(props.rowData)" />
                                        </div>
                                    </vuetable>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="地图定位" :attached="false" :disabled="!editMode">
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
                                            <sui-form-field>
                                                <label>地址</label>
                                                <sui-input type="text" placeholder="输入地址" v-model="keyword" />
                                            </sui-form-field>
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
                        </sui-tab>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import dialogBar from '@/components/MDialog'
import RentRoomForm from "@/components/rentRoomForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FieldsAssign from "./FieldsForAssign.js";
import contractForm from "@/components/rentContractForm";
import rentHeTongForm from "@/components/rentHeTongForm";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import constants from "@/util/constants";
import {
    getRentRoomDataApi,
    createRentRoomApi,
    updateRentRoomApi,
    deleteRentRoomApi,
    createRentContractApi,
    getRentRoomContractListApi,
    assignRentAssignmentApi,
    getUnitApi,
    listRentRoomAssignmentApi,
    deleteRentRoomAssignmentApi
} from "@/api/roomDataAPI";
import {
    notifySomething
} from "@/util/utils"
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        'rentroom-form': RentRoomForm,
        'contract-form': rentHeTongForm

    },
    data() {
        return {
            validationCheck: {
                unit_id: false,
                space: false
            },
            sendVal: false,
            modelTitle: "",
            editMode: false,
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            unitoptions: [],
            componentAssignListkey: 1,
            componentFenpeikey: 1,
            defaultTab: 0,
            point: {},
            selectedRoom: {},
            selectedRoomContract: {},
            deleteTarget: "",
            loading: true,
            localData: [],
            fields: FieldsDef,
            fieldsAssign: FieldsAssign,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
            contractForm: {
                open: false,
                model: "create",
                title: "createForm",
                room_id: "",
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: ""
            },
            keyword: ""
        };
    },

    methods: {
        setFirstPoint(pois) {
            this.point = pois[0].point;
            this.selectedRoom.lon = this.point.lng;
            this.selectedRoom.lat = this.point.lat;
        },
        assignRentRoom() {
            this.loading = true;
            console.log(this.selectedRoom.unit_id);
            if (this.selectedRoom.unit_id == undefined || this.selectedRoom.unit_id == "") {
                this.validationCheck.unit_id = true;
                this.validationCheck.space = true;
                return;
            }
            this.validationCheck.unit_id = false;
            this.validationCheck.space = false;
            var nPayload = {
                room_id: this.selectedRoom.id,
                space: this.selectedRoom.space_assign,
                unit_id: this.selectedRoom.unit_id
            }
            assignRentAssignmentApi(nPayload).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    notifySomething(constants.FENPEISUCCESS, constants.FENPEISUCCESS, constants.typeSuccess);
                    this.loading = true;
                    this.refreshAssignment();
                } else {
                    notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);
                }
            }).catch(function (error) {
                this.loading = false;
                notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);
            });

        },
        refreshAssignment() {
            listRentRoomAssignmentApi({
                room_id: this.selectedRoom.id
            }).then((data) => {
                this.loading = false;
                this.selectedRoom.assignList = data.data.data;
                this.componentAssignListkey++;

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
        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.type == constants.typeRoomAssignment) {
                deleteRentRoomAssignmentApi(this.deleteTarget).then((result) => {
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(constants.DELETESUCCESS, constants.DELETESUCCESS, constants.typeSuccess);
                        this.refreshAssignment();
                    } else {
                        notifySomething(constants.DELETEFAILED, constants.DELETEFAILED, constants.typeError);
                    }
                });

            } else {
                deleteRentRoomApi(this.deleteTarget).then((result) => {
                    this.refreshRooms();
                    console.log(result)
                });
            }
        },
        openContractModal(rowData) {
            this.contractForm.open = true;
            this.contractForm.room_id = rowData.room_id;
            this.$refs.formComponentContract.singleContract = this.contractForm;
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
            createRentContractApi(this.selectedRoomContract).then((result) => {
                this.selectedRoomContract = {};
                if (result.data.code == 0) {
                    context.$notify({
                        group: 'foo',
                        title: '创建合同成功',
                        text: '创建合同成功',
                        type: "success"
                    });
                } else {
                    context.$notify({
                        group: 'foo',
                        title: '创建合同失败',
                        text: '创建合同失败',
                        type: "error"
                    });

                }
            }).catch(function (error) {
                context.$notify({
                    group: 'foo',
                    title: '创建合同失败',
                    text: '创建合同失败',
                    type: "error"
                });
            });

        },
        viewSomeThing(data) {
            this.loading = true;
            this.defaultTab = 0;
            this.selectedRoom = data;
            this.modelTitle = "修改租赁房屋";
            this.editMode = true;
            if (data.lat === null || data.lat == "") {
                this.point = {
                    lng: 121.547967,
                    lat: 30.879141
                }
            } else {
                this.point = {
                    lng: data.lon,
                    lat: data.lat
                }
            }
            this.open = true;
            listRentRoomAssignmentApi({
                room_id: this.selectedRoom.id
            }).then((data) => {
                this.selectedRoom.assignList = data.data.data;
                getRentRoomContractListApi({
                    room_id: this.selectedRoom.id
                }).then((result) => {
                    console.log(result.data.data);
                    var latestOne = result.data.data.length;
                    if (latestOne == 0) {
                        this.selectedRoomContract = {}
                    } else {
                        this.selectedRoomContract = result.data.data[latestOne - 1];
                    }
                    this.loading = false;
                })
            })

        },
        exportToExcel() {
            let headers = ['id', 'room_id', 'cert_id', 'owner', 'address', 'roomname', 'usage', 'space'];
            const filtedData = this.formatJson(headers, this.localData.data);
            export_json_to_excel({
                header: headers,
                data: filtedData,
                filename: 'excel-list', //Optional
                autoWidth: true, //Optional
                bookType: 'xlsx' //Optional
            });

        },
        deleteRoomAssign(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.unit_detail.name + ")?",
                id: data.id,
                type: constants.typeRoomAssignment
            };
        },
        deleteRoom(data) {

            // this.loading = true;
            // deleteRoomApi(data).then((result) => {
            //     this.refreshRooms();
            //     console.log(result)
            // });
        },
        refreshRooms() {
            this.loading = true;
            getRentRoomDataApi().then((data) => {
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
        createRoomModel() {
            // show create Model
            this.modelTitle = "创建租赁房屋"
            this.editMode = false;
            this.open = true;
            this.selectedRoom = {
                area: "奉贤区"
            };
        },
        toggle() {
            this.open = !this.open;
            this.loading = true;
            console.log(this.editMode);
            if (!this.editMode) {
                createRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms();
                    this.loading = false;
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                });
            } else if (this.editMode) {
                updateRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms();
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);

                    this.loading = false;
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
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.refreshRooms();
            this.open = false;
            this.contractForm.open = false;
        },

    },
    created() {

        getRentRoomDataApi().then((data) => {
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
        getUnitApi().then((data) => {
            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                this.unitoptions.push({
                    'text': res_data[i]['name'],
                    'value': res_data[i]['id']
                })
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

.map {
    width: 100%;
    height: 400px;
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

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}

.BMap_cpyCtrl {
    display: none;
}

.anchorBL {
    display: none;
}

.map {
    width: 100%;
    height: 400px;
}
</style>
