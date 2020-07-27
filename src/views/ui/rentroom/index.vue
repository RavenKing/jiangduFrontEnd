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
                            <sui-button basic color="blue" content="导出" v-on:click="exportToExcel" icon="file blue" />
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
            <sui-modal class="modal2" v-model="open">
                <sui-modal-content scrolling class="modalStep">
                    <div>
                        <sui-tab :menu="{ attached: false }" :active-index.sync="defaultTab">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <rentroom-form :singleRoom="selectedRoom"></rentroom-form>
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
                                        <sui-button content="创建新合同" v-on:click="emptyRentContract()" />
                                        <!-- <sui-button content="保存" v-on:click="createRentContract()" /> -->
                                    </div>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="分配单位" :attached="false" :disabled="!editMode" :key="componentFenpeikey">
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
                                            <sui-input type="text" placeholder="输入面积" v-model="selectedRoom.space_assign" />
                                        </sui-form-field>
                                        <sui-button basic color="blue" icon="add" content="添加单位" @click.prevent="assignRentRoom()" />
                                    </sui-form-fields>
                                </sui-form>
                                <div class="vue2Table">
                                    <vuetable ref="vuetable" :api-mode="false" :data="selectedRoom.assignList" :fields="fieldsAssign" data-path="data" :key="componentAssignListkey">
                                        <div slot="action" slot-scope="props">
                                            <!-- <sui-button basic color="blue"  content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                                            <sui-button basic color="red" content="删除" v-on:click="deleteRoomAssign(props.rowData)" />
                                        </div>
                                    </vuetable>
                                </div>
                            </sui-tab-pane>
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
                                            <label>地址</label>
                                            <sui-form-field>
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
import dialogBar from '@/components/MDialog'
import RentRoomForm from "@/components/rentRoomForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "./FieldsDef.js";
import FieldsAssign from "./FieldsForAssign.js";

import rentHeTongForm from "@/components/rentHeTongForm";
import {
    ModelSelect
} from 'vue-search-select'
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
    deleteRentRoomAssignmentApi,
    editRentContractDetailApi,
    editRentContractApi
} from "@/api/roomDataAPI";
import {
    notifySomething,
    goToLogin
} from "@/util/utils"
export default {
    name: "MyVuetable",
    components: {
        'model-select': ModelSelect,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        'rentroom-form': RentRoomForm,
        'contract-form': rentHeTongForm

    },
    data() {
        return {
            validationCheck: {
                unit_id: false,
                space: false,
                text: "",
                header: "",
                status: ""
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
            listContract: [],
            componentAssignListkey: 1,
            componentFenpeikey: 1,
            defaultTab: 0,
            point: {},
            selectedRoom: {},
            selectedRoomContract: {
                mode: "initial"
            },
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
        emptyRentContract() {
            this.selectedRoomContract = {
                mode: 'new',
                priceinfo: [{
                    pricename: "",
                    price: "",
                    space: "",
                }]
            }
        },
        changeUnit() {
            let count = 0;
            this.selectedRoom.assignList.map((one) => {
                if (this.selectedRoom.unit_id == one.unit_id) {
                    this.validationCheck.header = "单位已经被分配过了";
                    this.validationCheck.text = "单位已经被分配过了,再分配会覆盖原有的分配";
                    this.validationCheck.status = "warning";
                    count = 1;
                }
            })
            if (count == 0) {
                this.validationCheck.status = "";
            }
        },
        changeContract() {
            this.listContract.map((one) => {
                if (one.one.id == this.selectedRoomContract.id) {
                    this.selectedRoomContract = one.one;
                }
            })

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
            if (this.selectedRoom.unit_id == undefined || this.selectedRoom.unit_id == "") {
                this.validationCheck.unit_id = true;
                this.validationCheck.space = true;
                this.validationCheck.header = "请选择单位和面积";
                this.validationCheck.text = "请选择单位和面积";
                this.loading = false;
                return;
            }
            this.validationCheck.unit_id = false;
            this.validationCheck.space = false;
            var nPayload = {
                room_id: this.selectedRoom.id,
                space: this.selectedRoom.space_assign,
                unit_id: this.selectedRoom.unit_id,
                type: 2
            }
            assignRentAssignmentApi(nPayload).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    notifySomething(constants.FENPEISUCCESS, constants.FENPEISUCCESS, constants.typeSuccess);
                    this.loading = true;
                    this.refreshAssignment();
                } else {
                    notifySomething(constants.FEIPEICREATEFAILED, constants.FEIPEICREATEFAILED + result.data.data, constants.typeError);
                }
            }).catch(function () {
                this.loading = false;
                notifySomething(constants.FEIPEICREATEFAILED, constants.FEIPEICREATEFAILED + "房屋已分配或者面积不足", constants.typeError);
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
            if (this.deleteTarget.room_type == constants.typeRoomAssignment) {
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
                    if (result.data.code == 0) {
                        this.refreshRooms({
                            page: 1
                        });
                        notifySomething(constants.DELETESUCCESS, constants.DELETESUCCESS, constants.typeSuccess);
                    } else {
                        notifySomething(constants.DELETEFAILED, constants.DELETEFAILED, constants.typeError);

                    }

                    console.log(result)
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
            if (this.selectedRoomContract.mode != "new") {
                editRentContractApi(this.selectedRoomContract).then((result) => {
                    //this.closeModal();
                    if (result.data.code == 0) {
                        this.loading = false;
                        editRentContractDetailApi({
                            contract_id: this.selectedRoomContract.id,
                            valuelist: JSON.stringify(this.selectedRoomContract.priceinfo)
                        }).then((result) => {
                            if (result.data.code == 0) {
                                notifySomething("编辑合同成功", '编辑合同成功', 'success');
                            } else {
                                notifySomething("编辑合同失败", '编辑合同失败', 'error');
                            }
                        })

                    } else {
                        context.$notify({
                            group: 'foo',
                            title: '编辑合同失败',
                            text: '编辑合同失败',
                            type: "error"
                        });

                    }
                }).catch(function () {
                    context.$notify({
                        group: 'foo',
                        title: '编辑合同失败',
                        text: '编辑合同失败',
                        type: "error"
                    });
                });
            } else if (this.selectedRoomContract.mode == "new") {
                createRentContractApi(this.selectedRoomContract).then((result) => {
                    this.closeModal();
                    if (result.data.code == 0) {
                        getRentRoomContractListApi({
                            room_id: this.selectedRoom.id
                        }).then((result) => {
                            var latestOne = result.data.data.length;
                            this.selectedRoomContract.contract_id = result.data.data[latestOne - 1].id;
                            editRentContractDetailApi({
                                contract_id: this.selectedRoomContract.contract_id,
                                valuelist: JSON.stringify(this.selectedRoomContract.priceinfo)
                            }).then((result) => {
                                if (result.data.code == 0) {
                                    notifySomething("'创建合同成功'", '创建合同成功', 'success');
                                } else {
                                    notifySomething("'创建合同失败'", '创建合同失败', 'error');
                                }
                            })
                            this.loading = false;
                        })

                    } else {
                        context.$notify({
                            group: 'foo',
                            title: '创建合同失败',
                            text: '创建合同失败',
                            type: "error"
                        });

                    }
                }).catch(function () {
                    context.$notify({
                        group: 'foo',
                        title: '创建合同失败',
                        text: '创建合同失败',
                        type: "error"
                    });
                });

            }

        },
        viewSomeThing(data) {
            this.loading = true;
            this.defaultTab = 0;
            this.selectedRoom = data;
            if (!this.selectedRoom.priceinfo || this.selectedRoom.priceinfo.length == 0) {
                this.selectedRoom.priceinfo = [{
                    space: 0,
                    price: 0,
                    pricename: ""
                }]
            }
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
            this.validationCheck.status = "";
            this.open = true;
            listRentRoomAssignmentApi({
                room_id: this.selectedRoom.id
            }).then((data) => {
                this.selectedRoom.assignList = data.data.data;
                getRentRoomContractListApi({
                    room_id: this.selectedRoom.id
                }).then((result) => {
                    var latestOne = result.data.data.length;
                    if (latestOne == 0) {
                        this.selectedRoomContract = {
                            mode: "initial"
                        }
                    } else {
                        this.listContract = [];
                        this.selectedRoomContract = result.data.data[latestOne - 1];
                        result.data.data.map((one) => {
                            this.listContract.push({
                                value: one.id,
                                text: one.rentcontact,
                                one
                            })
                        })
                        console.log(this.listContract.length);
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
                room_type: constants.typeRoomAssignment,
                room_id: data.room_id,
                unit_id: data.unit_id
            };
        },
        deleteRoom(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.roomname + ")?",
                id: data.id,
                room_type: "rentRoom"
            };
            // this.loading = true;
            // deleteRoomApi(data).then((result) => {
            //     this.refreshRooms();
            //     console.log(result)
            // });
        },
        refreshRooms(payload) {
            this.loading = true;
            getRentRoomDataApi(payload).then((data) => {

                if (data.data.code == 0) {
                    this.loading = false;
                    this.localData = data.data.data
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
            this.loading = true;
            if (this.defaultTab == 1) {
                this.createRentContract();
                return;
            }

            this.open = !this.open;

            if (!this.editMode) {
                createRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms({
                        page: 1
                    });
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                        this.loading = false;
                    } else {
                        notifySomething(constants.CREATEFAILED, constants.CREATEFAILED + ":" + result.data.msg, constants.typeError);
                    }
                });
            } else if (this.editMode) {
                updateRentRoomApi(this.selectedRoom).then((result) => {
                    this.refreshRooms({
                        page: 1
                    });
                    this.loading = false;
                    if (result.data.code == 0) {
                        notifySomething(constants.EDITSUCCESS, constants.EDITSUCCESS, constants.typeSuccess);
                    } else {

                        notifySomething(constants.EDITFAILED, constants.EDITFAILED + ":" + result.data.msg, constants.typeError);

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
                page: page
            })
            this.$refs.vuetable.changePage(page);
        },
        closeModal: function () {
            this.refreshRooms({
                page: 1
            });
            this.open = false;
            this.contractForm.open = false;
        },

    },
    created() {
        this.refreshRooms({
            page: 1
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

.width300 {
    width: 300px;
    /* margin-left: 20px !important; */
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

.ui.modal .scrolling.content {
    max-height: none !important;
}
</style>
