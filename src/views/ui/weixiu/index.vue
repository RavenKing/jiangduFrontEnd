<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan" v-show="role!=1">
            <sui-button content="申请维修" @click.native="openWeiXiuForm" icon="add green" />
        </div>

        <div class="vue2Table">
            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="statusText" slot-scope="props">
                    <h4 is="sui-header" :color="props.rowData.status==2?'green':'red'">
                        {{props.rowData.statusText}}
                    </h4>
                </div>
                <div slot="action" slot-scope="props">
                    <sui-button text="编辑" v-on:click="editWeixiuShenqing(props.rowData)">编辑</sui-button>
                    <sui-button text="删除" @change="handleChange(props)">删除</sui-button>
                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div>

        <dialog-bar :commentData="deleteTarget.reason" v-model="sendVal" type="danger" title="确认" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" :dangerText="deleteTarget.dangerText">
        </dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="weixiuForm.open">
                <sui-modal-header>{{modelTitle}}维修
                    <h4 is="sui-header" :color="selectedWeixiu.status==2?'green':'red'">
                        {{selectedWeixiu.statusText}}
                    </h4>
                </sui-modal-header>
                <sui-modal-content scrolling>
                    <weixiu-form :singleEntry="selectedWeixiu" ref="weixiuForm"> </weixiu-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeWeiXiuForm">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createShenbao">
                        保存
                    </sui-button>
                    <span v-show="role==1&&modalMode=='edit'">
                        <sui-button color="green" v-on:click="approveContract(selectedWeixiu)">同意</sui-button>
                        <sui-button negative v-on:click="rejectContract(selectedWeixiu)">拒绝</sui-button>
                    </span>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import dialogBar from '@/components/MDialog'
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import constants from "@/util/constants";
import Fields2 from "./fields2.js";
import FieldHetong from "./fieldsHetong.js";
import WeiXiuForm from "@/components/weixiuForm";
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    localGet
} from "@/util/storage";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    notifySomething
} from "@/util/utils"
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
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        Datepicker,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        'weixiu-form': WeiXiuForm

    },
    data() {
        return {
            lang: lang,
            hetongdata: [],
            hetongComponentKey: 1,
            componentKey: 1,
            currentStep: 1,
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {},
            weixiuList: [],
            value: [],
            role: 2,
            weixiuForm: {
                open: false
            },
            selectedWeixiu: {},
            deleteTarget: {},
            loading: true,
            localData: [],
            fields: FieldsDef,
            fields2: Fields2,
            hetongFields: FieldHetong,
            sortOrder: [{}],
            steps: [],
            weixiuhetong: {},
            contractForm: {
                open: false,
                title: "createForm",
                room_id: "",
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: ""
            }
        };
    },

    methods: {
        clickConfirmDelete() {
            this.loading = true;
            var context = this;
            if (this.deleteTarget.mode == "approve") {
                approveMRApi(this.deleteTarget).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        context.closeComfirmDialog();
                        context.closeWeiXiuForm();
                        context.$notify({
                            group: 'foo',
                            title: '已经同意',
                            text: '已经同意',
                            type: "success"
                        });
                    } else {
                        notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);
                    }
                }).catch(function (error) {
                    context.loading = false;
                    notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);

                });

            } else if (this.deleteTarget.mode == "reject") {
                this.loading = false;
                rejectMRApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        context.closeComfirmDialog();
                        context.$notify({
                            group: 'foo',
                            title: '已经拒绝',
                            text: '已经拒绝',
                            type: "success"
                        });
                    } else {
                        notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);

                    }
                }).catch(function (error) {
                    context.loading = false;
                    notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);

                });
            }

        },
        openComfirmDialog() {
            this.sendVal = true;
        },
        closeComfirmDialog() {
            this.sendVal = false;
            this.refreshWeixiuList();
            //  this.refreshWeixiuList();
        },
        approveContract(props) {
            this.sendVal = true;
            this.deleteTarget.text = "是否要同意该申请" + props.roomname + "(申请id:" + props.id + ")?";
            this.deleteTarget.mode = "approve";
            this.deleteTarget.dangerText = "确认";
            this.deleteTarget.reason = "无";
            this.deleteTarget.id = props.id;
            this.openComfirmDialog();
        },
        rejectContract(props) {
            this.sendVal = true;
            this.deleteTarget.text = "是否要拒绝该申请" + props.roomname + "(申请id:" + props.id + ")?";
            this.deleteTarget.mode = "reject";
            this.deleteTarget.id = props.id;
            this.deleteTarget.reason = "无";
            this.deleteTarget.dangerText = "确认";

            this.openComfirmDialog();
        },
        editWeixiuShenqing(props) {
            this.selectedWeixiu = props;
            this.modelTitle = "编辑";
            this.loading = true;
            if (this.selectedWeixiu.room_id && this.selectedWeixiu.building_id) {
                var flooroptions = [];
                var buildingoptions = [];
                const context = this;
                getBuildingListApi(context.selectedWeixiu).then((data) => {
                    data.data.data.map((one) => {
                        buildingoptions.push({
                            text: one.name,
                            value: one.id,
                        })
                    });
                    context.$refs.weixiuForm.louOptions = buildingoptions;
                    getBuildingFloorApi(context.selectedWeixiu).then((result) => {
                        var floors = result.data.data;
                        floors.map((floor) => {
                            flooroptions.push({
                                text: floor.name,
                                value: floor.id,
                            })
                        });
                        context.$refs.weixiuForm.floorOptions = flooroptions;
                        this.loading = false;
                        context.openWeiXiuForm("edit");
                    });
                })
            } else {
                context.openWeiXiuForm("edit");
            }

        },
        createWeiXiuHeTong() {
            console.log(this.weixiuhetong);
            this.weixiuhetong.mrlist = [];
            this.weixiuList.map((one) => {
                this.weixiuhetong.mrlist.push(one.id);
            });
            this.weixiuhetong.memo = "test";
            this.loading = true;
            var context = this;
            closeHetongModal();
            createMCApi(this.weixiuhetong).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                } else {
                    notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);
                }
            }).catch(function (error) {
                this.loading = false;
                notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);

            });
        },
        closeHetongModal() {
            this.open = false;
        },
        createShenbao() {
            this.loading = true;
            if (this.modalMode == "create") {
                createMRApi(this.selectedWeixiu).then((result) => {
                    this.loading = false;
                    this.closeWeiXiuForm();
                    this.refreshWeixiuList();
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                })
            } else if (this.modalMode == "edit") {
                editMRApi(this.selectedWeixiu).then((result) => {
                    console.log(result);
                    this.loading = false;
                    this.closeWeiXiuForm();
                    this.refreshWeixiuList();
                    notifySomething("编辑成功", "编辑成功", constants.typeSuccess);

                })
            }

        },
        refreshWeixiuList() {
            this.role = localGet("role");
            this.loading = true;
            let params = {};
            if (this.role == 1) {
                params = {
                    status: constants.STATUSNEW
                }
            }
            getMRApi(params).then((data) => {
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
                this.localData.data.map((one) => {
                    getroombyid(one).then((result) => {
                        console.log(result);
                        if (result.data.code == 0) {
                            one.roomname = result.data.data.roomname;
                            one.address = result.data.data.address;
                            console.log(one.address);
                            console.log(this.localData.data);
                            this.componentKey++;
                        }
                    });
                    switch (one.status) {
                        case 1:
                            one.statusText = constants.NEW;
                            break;
                        case 2:
                            one.statusText = constants.PASS;
                            break;
                        case 3:
                            one.statusText = constants.FAIL;
                            break;
                        default:
                            break;
                    }

                });

            });
        },
        openWeiXiuForm(mode) {
            if (mode == "edit") {
                this.modelTitle = "编辑";
                this.modalMode = "edit";

            } else {
                this.modelTitle = "创建";
                this.selectedWeixiu = {};
                this.modalMode = "create";
            }
            this.weixiuForm.open = true;
        },
        closeWeiXiuForm() {
            this.weixiuForm.open = false;
        },

        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page);
        }
    },
    mounted() {
        //this.localData = data.data.data;
        this.role = localGet("role");
        this.loading = true;
        let params = {};
        if (this.role == 1) {
            params = {
                status: constants.STATUSNEW
            }
        }
        getMRApi(params).then((data) => {
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
            this.localData.data.map((one) => {
                getroombyid(one).then((result) => {
                    console.log(result);
                    if (result.data.code == 0) {
                        one.roomname = result.data.data.roomname;
                        one.address = result.data.data.address;
                        console.log(one.address);
                        console.log(this.localData.data);
                        this.componentKey++;
                    }
                });
                switch (one.status) {
                    case 1:
                        one.statusText = constants.NEW;
                        break;
                    case 2:
                        one.statusText = constants.PASS;
                        break;
                    case 3:
                        one.statusText = constants.FAIL;
                        break;
                    default:
                        break;
                }

            });

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
</style>
