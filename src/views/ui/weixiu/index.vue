<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="正在加载" />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan" style="padding-left:15px;">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="3">
                        <sui-dropdown placeholder="选择状态" selection :options="statusOptions" v-model="listStatus" search fluid @input="changeStatus"></sui-dropdown>
                    </sui-grid-column>
                    <sui-grid-column :width="8" style="padding-right:0">
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:0">
                        <div v-show="role==2" style="float:right;">
                            <sui-button basic color="blue" content="申请维修" @click.native="openWeiXiuForm" icon="add blue" />
                            <!-- <sui-button content="修改" icon="edit yellow" />
                 <sui-button content="删除" icon="delete red" /> -->
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>

        </div>
        <div class="vue2Table">
            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="statusText" slot-scope="props">
                    <el-tag :type="props.rowData.status==2?'success':'danger'">
                        {{props.rowData.statusText}}
                    </el-tag>
                </div>
                <div slot="action" slot-scope="props">
                    <sui-button text="编辑" basic color="blue" v-on:click="editWeixiuShenqing(props.rowData)">编辑</sui-button>
                    <!-- <sui-button text="删除" basic color="red" @change="handleChange(props)">删除</sui-button> -->
                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
            </div>
        </div>

        <dialog-bar :mode="deleteTarget.mode" ref="dialog" :singleTime="deleteTarget" :commentData="deleteTarget.reason" v-model="sendVal" type="danger" title="确认" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" :dangerText="deleteTarget.dangerText">
        </dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="weixiuForm.open">
                <sui-modal-header style="border-bottom:0;">
                    <div style="float:left;">{{modelTitle}}维修</div>
                    <div style="float:right;">
                        <h4 style="line-height:25px;" is="sui-header" :color="selectedWeixiu.status==2?'green':'red'">
                            {{selectedWeixiu.statusText}}
                        </h4>
                    </div>
                </sui-modal-header>

                <sui-modal-content scrolling>
                    <sui-segment>
                        <weixiu-form :singleEntry="selectedWeixiu" ref="weixiuForm" :mode="modalMode"> </weixiu-form>
                    </sui-segment>
                </sui-modal-content>

                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeWeiXiuForm">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="createShenbao">
                        保存
                    </sui-button>
                    <sui-button v-show="role==1&&modalMode=='edit'" color="green" v-on:click="approveContract(selectedWeixiu)">同意</sui-button>
                    <sui-button v-show="role==1&&modalMode=='edit'" basic color="red" v-on:click="rejectContract(selectedWeixiu)">拒绝</sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import {
    fromShitFormat,
    toShitFormat
} from "@/util/time"
import dialogBar from '@/components/MDialogNewV'
import Vuetable from "vuetable-2/src/components/Vuetable";
import FieldsDef from "./FieldsDef.js";
import constants from "@/util/constants";
import Fields2 from "./fields2.js";
import FieldHetong from "./fieldsHetong.js";
import WeiXiuForm from "@/components/weixiuForm";
import * as lang from "vuejs-datepicker/src/locale";
import {
    localGet
} from "@/util/storage";
import {
    notifySomething,
} from "@/util/utils"
import {
    getMRApi,
    createMRApi,
    editMRApi,
    getroombyid,
    createMCApi,
    approveMRApi,
    rejectMRApi,
} from "@/api/weixiuAPI";
import {
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        'weixiu-form': WeiXiuForm
    },
    data() {
        return {
            lang: lang,
            hetongdata: [],
            statusOptions: [{
                    text: constants.NEW,
                    value: 1
                },
                {
                    text: constants.PASS,
                    value: 2
                }, {
                    text: constants.FAIL,
                    value: 3
                },
                {
                    text: constants.WEIXIU,
                    value: 4
                }
            ],
            listStatus: 0,
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
        changeStatus() {
            console.log("status");
            this.refreshWeixiuList({
                status: this.listStatus
            })

        },
        clickConfirmDelete() {
            this.loading = true;
            var context = this;
            this.deleteTarget.reason = this.$refs.dialog.commentData;
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
                }).catch(function () {
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
                }).catch(function () {
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
            this.refreshWeixiuList(null);
            //  this.refreshWeixiuList();
        },
        approveContract(props) {
            this.sendVal = true;
            this.deleteTarget.text = "是否要同意该申请" + props.roomname + "(申请id:" + props.id + ")?";
            this.deleteTarget.mode = "approve";
            this.deleteTarget.dangerText = "确认";
            this.deleteTarget.reason = "无";
            this.deleteTarget.id = props.id;
            this.deleteTarget.starttime = "";
            this.deleteTarget.endtime = "";
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
            console.log("editdebug")
            this.selectedWeixiu = props;
            this.modelTitle = "编辑";
            this.loading = true;
            const context = this;
            if (this.selectedWeixiu.room_id && this.selectedWeixiu.building_id) {
                var flooroptions = [];
                var buildingoptions = [];
                getBuildingListApi(context.selectedWeixiu).then((data) => {
                    if (data.data.code != 0) {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                        this.loading = false;
                        return;
                    }

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
                    }).catch(function () {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    });
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else {
                this.loading = false;
                context.openWeiXiuForm("edit");
                notifySomething(constants.GENERALERROR, constants.GENERALERROR + ":数据错误", constants.typeError);

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
            this.closeHetongModal();
            createMCApi(this.weixiuhetong).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                } else {
                    notifySomething(constants.CREATEFAILED, constants.CREATEFAILED, constants.typeError);
                }
            }).catch(function () {
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
                this.selectedWeixiu.starttime = toShitFormat(this.selectedWeixiu.starttime)
                createMRApi(this.selectedWeixiu).then(() => {
                    this.loading = false;
                    this.closeWeiXiuForm();
                    this.refreshWeixiuList(null);
                    notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.modalMode == "edit") {
                this.selectedWeixiu.starttime = toShitFormat(this.selectedWeixiu.starttime)
                editMRApi(this.selectedWeixiu).then((result) => {
                    if (result.data.code == 0) {
                        this.loading = false;
                        this.closeWeiXiuForm();
                        this.refreshWeixiuList(null);
                        notifySomething("编辑成功", "编辑成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        refreshWeixiuList(params) {
            this.role = localGet("role");
            this.loading = true;
            if (params == null && this.role == 1) {
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
                    one.starttime = fromShitFormat(one.starttime);
                    getroombyid(one).then((result) => {
                        console.log(result);
                        if (result.data.code == 0) {
                            one.roomname = result.data.data.roomname;
                            one.address = result.data.data.address;
                            console.log(one.address);
                            console.log(this.localData.data);
                            this.componentKey++;
                        }
                    }).catch(function () {
                        this.loading = false;
                        // notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
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
                        case 4:
                            one.statusText = constants.WEIXIU;
                            break;
                        default:
                            one.statusText = constants.NEW;
                            break;
                    }

                });

            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
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

        this.refreshWeixiuList(null);

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
    margin: 0 0 15px 0;
    margin-bottom:15px;
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
</style>
