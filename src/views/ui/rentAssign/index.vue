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
                    <sui-grid-column :width="12">
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:0">
                        <div style="float:right;">
                            <sui-button basic color="blue" content="新建" @click.native="createChuju" icon="add blue" />
                            <!-- <sui-button content="修改" icon="edit yellow" />
                 <sui-button content="删除" icon="delete red" /> -->
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <div class="vue2Table">
            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="time" slot-scope="props">
                    {{props.rowData.starttime}} 到 {{props.rowData.endtime}}
                </div>
                <div slot="statusText" slot-scope="props">
                    <el-tag :type="props.rowData.status==2?'success':'danger'">
                        {{props.rowData.statusText}}
                    </el-tag>
                </div>
                <div slot="action" slot-scope="props">
                    <sui-button text="编辑" basic color="blue" v-on:click="editWeixiuShenqing(props.rowData)" size="tiny"> 编辑</sui-button>
                    <sui-button text="删除" basic color="red" v-on:click="handleDelete(props.rowData)" size="tiny">删除</sui-button>
                </div>
            </vuetable>
        </div>

        <dialog-bar ref="dialog" :singleTime="deleteTarget" v-model="sendVal" type="danger" title="确认" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" :dangerText="deleteTarget.dangerText">
        </dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="weixiuForm.open">
                <sui-modal-header style="border-bottom:0;">
                    <div style="float:left;">{{modelTitle}}</div>
                </sui-modal-header>
                <sui-modal-content scrolling style="height:600px!important">
                    <div>
                        <sui-dimmer :active="loading" inverted>
                            <sui-loader content="正在加载" />
                        </sui-dimmer>
                    </div>
                    <sui-tab :menu="{ attached: false }" :active-index.sync="activeIndex">
                        <sui-tab-pane title="基本信息">
                            <sui-segment>
                                <weixiu-form :singleEntry="selectedWeixiu" ref="weixiuForm" :options="options" :mode="modalMode"> </weixiu-form>
                            </sui-segment>
                        </sui-tab-pane>
                        <sui-tab-pane title="巡查记录" :disabled="modalMode=='create'">
                            <sui-dimmer :active="loading" inverted>
                                <sui-loader content="正在加载" />
                            </sui-dimmer>
                            <div v-show="newXuncha.open">
                                <sui-form>
                                    <sui-form-fields inline v-show="false">
                                        <sui-form-field required>
                                            <model-select style="width:100%" :options="options" v-model="selectedWeixiu.room_id" :isDisabled="true">
                                            </model-select>
                                        </sui-form-field>
                                        <sui-form-field required>
                                            <model-select style="width:100%" :options="unitoptions" v-model="selectedWeixiu.unit_id" :isDisabled="true">
                                            </model-select>
                                        </sui-form-field>
                                    </sui-form-fields>
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
                                <vuetable ref="vuetable" :api-mode="false" :data="selectedWeixiu.patrol" :fields="fieldsPatrol" data-path="data">
                                    <div slot="action" slot-scope="props">
                                        <sui-button basic color="red" content="删除" v-on:click="deleteRoomPatrol(props.rowData)" size="tiny" />
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="租金收缴" :disabled="modalMode=='create'">
                            <div>
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader content="正在加载" />
                                </sui-dimmer>
                            </div>

                            <sui-form>
                                <sui-form-fields inline>
                                    <sui-form-field required>
                                        <datepicker placeholder="收缴时间" style="width:100%" :value="rentOne.enter_date" v-model="rentOne.enter_date" :language="lang['zh']"></datepicker>
                                    </sui-form-field>
                                    <sui-form-field required>
                                        <datepicker placeholder="租金起始年月" style="width:100%" :value="rentOne.fromtime" v-model="rentOne.fromtime" :language="lang['zh']"></datepicker>
                                    </sui-form-field>
                                    <sui-form-field required>
                                        <datepicker placeholder="结束年月" style="width:100%" :value="rentOne.totime" v-model="rentOne.totime" :language="lang['zh']"></datepicker>
                                    </sui-form-field>
                                    <sui-form-field required>
                                        <sui-input placeholder="金额" v-model="rentOne.amt" type="number" />
                                    </sui-form-field>
                                    <sui-button basic color="blue" content="添加" @click.prevent="createZujinShangjiao()" size="tiny" />
                                </sui-form-fields>
                            </sui-form>
                            <vuetable ref="vuetable" :api-mode="false" :data="selectedWeixiu.rentInfo" :fields="fieldsRent" data-path="data">
                                <div slot="billing_status" slot-scope="props">
                                    <sui-label color="green" v-show=" props.rowData.billing_status == '1'">
                                        已开票
                                    </sui-label>
                                    <sui-label color="red" v-show=" props.rowData.billing_status == '0'">
                                        未开票
                                    </sui-label>

                                </div>
                                <div slot="action" slot-scope="props">
                                    <sui-button basic color="blue" content="开票" v-on:click="openKaipiao(props.rowData)" size="tiny" />
                                    <sui-button basic color="red" content="删除" v-on:click="deleteRent(props.rowData)" size="tiny" />
                                </div>
                            </vuetable>
                        </sui-tab-pane>
                        <sui-tab-pane title="资料上传" :disabled="modalMode=='create'">
                            <sui-form-fields inline>
                                <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFile" :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </sui-form-fields>
                            <div is="sui-divider" horizontal>
                                <h4 is="sui-header">
                                    <i class="tag icon"></i>
                                    已上传文档
                                </h4>
                            </div>
                            <div>
                                <sui-list key="213123">
                                    <sui-list-item v-for="(link,index) in selectedWeixiu.ziliaoList" :key="link[0]">
                                        <a type="primary" :href="link.fileURL" target="_blank">文件{{index+1}}</a>
                                    </sui-list-item>
                                </sui-list>
                            </div>
                        </sui-tab-pane>
                    </sui-tab>
                </sui-modal-content>

                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeWeiXiuForm">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="createShenbao">
                        保存
                    </sui-button>
                    <!-- <sui-button v-show="role==1&&modalMode=='edit'" color="green" v-on:click="approveContract(selectedWeixiu)">同意</sui-button>
                    <sui-button v-show="role==1&&modalMode=='edit'" basic color="red" v-on:click="rejectContract(selectedWeixiu)">拒绝</sui-button> -->
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="kaipiao.open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">开票</sui-modal-header>
                <sui-modal-content image style="min-height: 400px !important;">
                    <sui-form>
                        <sui-form-fields inline>
                            <sui-form-field required>
                                <datepicker placeholder="开票时间" style="width:100%" :value="kaipiao.billing_date" v-model="kaipiao.billing_date" :language="lang['zh']"></datepicker>
                            </sui-form-field>
                            <sui-form-field required>
                                <sui-input placeholder="税费金额" v-model="kaipiao.tax_amt" type="number" />
                            </sui-form-field>
                        </sui-form-fields>
                    </sui-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeKaipiao">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" basic color="blue" @click.native="createKaipiao">
                        开票
                    </sui-button>
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
import FieldsRent from "./FieldsRent.js";
import WeiXiuForm from "@/components/rentAssignForm";
import * as lang from "vuejs-datepicker/src/locale";
import Datepicker from 'vuejs-datepicker';

import {
    localGet
} from "@/util/storage";
import store from "@/store";
import {
    notifySomething,
} from "@/util/utils";
import FieldsPatrol from "./FieldsPatrol.js";

import {
    listLoanAssignmentApi,
    createLoanAssignmentApi,
    editLoanAssignmentApi,
    deleteLoanAssignmentApi,
    listloanassignmentbyidr,
    listPatrolApi,
    getUnitApi,
    createPatrolApi,
    getRoomDataApi,
    deletePatrolApi
} from "@/api/roomDataAPI"
import {
    ModelSelect
} from 'vue-search-select';
import {
    getroombyid,
    addrentApi,
    listrentApi,
    delrentApi,
    createKaipiaoApi
} from "@/api/weixiuAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        Datepicker,
        'weixiu-form': WeiXiuForm,
        'model-select': ModelSelect,
    },
    data() {
        return {
            fieldsPatrol: FieldsPatrol,
            newXuncha: {
                open: true,
            },
            activeIndex: 1,
            fieldsRent: FieldsRent,
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
            rentOne: {},
            kaipiao: {
                open: false
            },
            contractForm: {
                open: false,
                title: "createForm",
                room_id: "",
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: "",
                unitoptions: [],
                options: []
            },
        };
    },

    methods: {
        createKaipiao() {
            this.kaipiao.billing_date = toShitFormat(this.kaipiao.billing_date)
            createKaipiaoApi(this.kaipiao).then((result) => {
                this.closeKaipiao();
                if (result.data.code == 0) {
                    this.refreshRent();
                    notifySomething(
                        constants.CREATESUCCESS,
                        constants.CREATESUCCESS,
                        constants.typeSuccess
                    );
                } else {
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                }
            })

        },

        closeKaipiao() {
            this.kaipiao.open = false;
        },
        openKaipiao(data) {
            console.log(data)
            this.kaipiao.billing_date = fromShitFormat(data.billing_date);
            this.kaipiao.tax_amt = data.tax_amt;
            this.kaipiao.open = true;
            this.kaipiao.id = data.id;
            // this.kaipiao
        },
        //
        createZujinShangjiao() {
            this.loading = true;
            this.rentOne.cid = this.selectedWeixiu.id;
            this.rentOne.billing_status = 0;
            this.rentOne.tax_amt = 0
            this.rentOne.amt = parseInt(this.rentOne.amt);
            this.rentOne.enter_date = toShitFormat(this.rentOne.enter_date);
            this.rentOne.fromtime = toShitFormat(this.rentOne.fromtime);
            this.rentOne.totime = toShitFormat(this.rentOne.totime);
            addrentApi(this.rentOne).then((result) => {
                if (result.data.code == 0) {
                    this.refreshRent();
                    //   this.newXuncha.open = false;
                    notifySomething(
                        constants.CREATESUCCESS,
                        constants.CREATESUCCESS,
                        constants.typeSuccess
                    );
                }
            });
        },
        refreshRent() {
            this.loading = true;
            listrentApi({
                cid: this.selectedWeixiu.id
            }).then((result) => {
                if (result.data.code == 0) {

                    this.selectedWeixiu.rentInfo = result.data.data;
                    this.selectedWeixiu.rentInfo.map((one) => {
                        one.fromtime = fromShitFormat(one.fromtime);
                        one.totime = fromShitFormat(one.totime);
                        one.enter_date = fromShitFormat(one.enter_date);
                    })
                    this.loading = false;
                    this.openWeiXiuForm("edit");
                } else {
                    this.loading = false;
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                }
            });
        },

        getUnit() {
            this.unitoptions = [];
            if (store.getters.unit.unitBasic.length > 0) {
                this.unitoptions = store.getters.unit.unitBasic;
            } else {
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
        },
        deleteRent(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.enter_date,
                id: data.id,
                type: constants.typeRoomRent,
                room_type: 1,
            };
        },
        deleteRoomPatrol(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.created_by,
                id: data.id,
                type: constants.typeRoomPatrol,
                room_type: 1,
            };
        },
        showPatrol(data) {
            console.log(data);
            this.newXuncha.open = true;
            this.newXuncha.unit_id = data.unit_id;
        },
        createPatrol() {
            this.newXuncha.room_type = 2;
            this.newXuncha.room_id = this.selectedWeixiu.room_id;
            this.newXuncha.unit_id = this.selectedWeixiu.unit_id;
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
                    //   this.newXuncha.open = false;
                    notifySomething(
                        constants.CREATESUCCESS,
                        constants.CREATESUCCESS,
                        constants.typeSuccess
                    );
                }
            });
        },
        refreshPatrol() {
            this.loading = true;
            listPatrolApi({
                room_id: this.selectedWeixiu.room_id,
                room_type: 2,
                type: 2
            }).then((result) => {
                if (result.data.code == 0) {
                    this.loading = false;
                    this.selectedWeixiu.patrol = result.data.data;
                } else {
                    this.loading = false;
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                }
            });
        },

        handleDelete(props) {
            console.log(props);
            this.deleteTarget.text = "是否要删除" + props.roomname + "?";
            this.deleteTarget.id = props.id;
            this.deleteTarget.type = "loan"
            this.sendVal = true;
        },
        clickConfirmDelete() {
            var context = this;

            if (this.deleteTarget.type == constants.typeRoomPatrol) {
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
                });
            } else if (this.deleteTarget.type == constants.typeRoomRent) {
                this.loading = true;
                this.deleteTarget.reason = this.$refs.dialog.commentData;
                delrentApi(this.deleteTarget).then((result) => {
                    //context.loading = false;
                    if (result.data.code == 0) {
                        this.refreshRent();
                        context.closeComfirmDialog();
                        //context.closeWeiXiuForm();
                        context.$notify({
                            group: 'foo',
                            title: '已经删除',
                            text: '已经删除',
                            type: "success"
                        });
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else {
                this.loading = true;
                // var context = this;
                this.deleteTarget.reason = this.$refs.dialog.commentData;
                deleteLoanAssignmentApi(this.deleteTarget).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        this.refresh();
                        context.closeComfirmDialog();
                        context.closeWeiXiuForm();
                        context.$notify({
                            group: 'foo',
                            title: '出租已经删除',
                            text: '出租已经删除',
                            type: "success"
                        });
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        openComfirmDialog() {
            this.sendVal = true;
        },
        closeComfirmDialog() {
            this.sendVal = false;
            this.refresh();
            //  this.refresh();
        },
        editWeixiuShenqing(props) {
            var context = this;
            context.options = [];
            getRoomDataApi({
                kind: 2,
                //   extract: 1
            }).then((data) => {
                //this.localData = data.data.data;
                context.getUnit();
                context.selectedWeixiu = props;
                context.loading = true;
                context.refreshRent();
                context.refreshPatrol();
                context.modelTitle = "编辑";
                //  context.loading = true;
                data.data.data.map((one) => {
                    context.options.push({
                        text: one.address,
                        value: one.id,
                    })
                });
            });

        },
        closeHetongModal() {
            this.open = false;
        },
        createShenbao() {
            var context = this;
            if (this.selectedWeixiu.rent_start == "NaNNaNNaN" || this.selectedWeixiu.rent_end == "NaNNaNNaN" || this.selectedWeixiu.is_borrow == null) {

                return;
            }
            this.loading = true;

            this.selectedWeixiu.rent_start = toShitFormat(this.selectedWeixiu.rent_start)
            this.selectedWeixiu.rent_end = toShitFormat(this.selectedWeixiu.rent_end)
            if (this.modalMode == "create") {
                createLoanAssignmentApi(this.selectedWeixiu).then((result) => {
                    if (result.data.code == 0) {
                        this.loading = false;
                        this.closeWeiXiuForm();
                        this.refresh();
                        notifySomething(constants.CREATESUCCESS, constants.CREATESUCCESS, constants.typeSuccess);
                    } else if (result.data.code == 3) {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, "该房屋这段时间已出租", constants.typeError);

                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            } else if (this.modalMode == "edit") {
                editLoanAssignmentApi(this.selectedWeixiu).then((result) => {
                    if (result.data.code == 0) {
                        this.loading = false;
                        this.closeWeiXiuForm();
                        this.refresh();
                        notifySomething("编辑成功", "编辑成功", constants.typeSuccess);
                    } else if (result.data.code == 3) {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, "该房屋这段时间已出租", constants.typeError);

                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }

        },
        refresh() {
            this.role = localGet("role");
            this.loading = true;
            let params = {};
            if (this.role == 1) {
                params = {
                    status: constants.STATUSNEW
                }
            }
            listLoanAssignmentApi(params).then((data) => {
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
                    var unitBasics = store.getters.unit.unitBasic
                    if (unitBasics.length > 0) {
                        unitBasics.map((unit) => {
                            if (unit.value == one.unit_id) {
                                one.unit_name = unit.text;
                            }
                        })
                    }

                    // one.ziliaoListData = JSON.parse(one.url);
                    //one.ziliaoList = [];
                    // one.ziliaoListData.map((one1) => {
                    //     var newOne = {
                    //         fileURL: constants.fileURL + one1
                    //     }
                    //     one.ziliaoList.push(newOne);
                    // })

                    one.starttime = one.rent_start
                    one.endtime = one.rent_end
                    one.rent_time = one.starttime + "-" + one.endtime;
                    getroombyid(one).then((result) => {
                        console.log(result);
                        if (result.data.code == 0) {
                            one.roomname = result.data.data.roomname;
                            one.address = result.data.data.address;
                            one.zhuguandanwei = result.data.data.zhuguandanwei;
                            one.quanshuzhengming = result.data.data.quanshuzhengming;
                            one.certid = result.data.data.certid;
                            if (result.data.data.inaccount) {
                                one.inaccount = "有"
                            } else {
                                one.inaccount = "无"
                            }
                            this.componentKey++;
                        }
                    }).catch(function () {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
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

            }).catch(function () {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },

        createChuju() {
            var context = this;
            this.loading = true;
            getRoomDataApi({
                kind: 2,
                //   extract: 1
            }).then((data) => {
                //this.localData = data.data.data;
                data.data.data.map((one) => {
                    context.options.push({
                        text: one.address,
                        value: one.id,
                    })
                });

                context.loading = false;
                context.openWeiXiuForm("create");
            });

        },
        openWeiXiuForm(mode) {
            this.activeIndex = 0;
            if (mode == "edit") {
                this.modelTitle = "编辑";
                this.modalMode = "edit";

            } else {
                this.modelTitle = "创建";
                this.selectedWeixiu = {
                    room_id: "1"
                };
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
        },
        getDataById(data) {
            listloanassignmentbyidr(data).then((data) => {
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
                    var unitBasics = store.getters.unit.unitBasic
                    if (unitBasics.length > 0) {
                        unitBasics.map((unit) => {
                            if (unit.value == one.unit_id) {
                                one.unit_name = unit.text;
                            }
                        })
                    }
                    one.starttime = fromShitFormat(one.rent_start);
                    one.endtime = fromShitFormat(one.rent_end);
                    one.rent_time = one.starttime + "-" + one.endtime;
                    getroombyid(one).then((result) => {
                        console.log(result);
                        if (result.data.code == 0) {
                            one.roomname = result.data.data.roomname;
                            one.address = result.data.data.address;
                            this.componentKey++;
                        }
                    }).catch(function () {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
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
                })
            })
        }
    },
    created() {

        var context = this;
        context.options = [];
        getRoomDataApi({
            kind: 2,
            // extract: 1
        }).then((data) => {
            //this.localData = data.data.data;
            data.data.data.map((one) => {
                context.options.push({
                    text: one.address,
                    value: one.id,
                })
            });
        });

        let uri = window.location.href.split('?');
        let getVars = {};
        if (uri.length == 2) {
            let vars = uri[1].split('&');
            let tmp = '';
            vars.forEach(function (v) {
                tmp = v.split('=');
                if (tmp.length == 2)
                    getVars[tmp[0]] = tmp[1];
            });
            console.log(getVars);
            if (getVars.room_id) {
                this.getDataById(getVars);
                return;
            }
        } else {
            this.refresh();
        }
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

.modal2 {
    height: 600px;
}

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 10px;
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
