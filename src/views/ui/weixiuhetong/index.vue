<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan">
            <sui-button content="创建项目" @click.native="openWeiXiuJihua" icon="add green" />
        </div>

        <div class="wl-gantt-demo">
            <wlGantt :data="hetongdataNewData" use-real-time default-expand-all date-type="yearAndMonth" start-date="2020-6-06" end-date="2023-7-02" @timeChange="timeChange" @preChange="preChange" @expand-change="expandChange"></wlGantt>
        </div>
        <!-- 
        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="hetongdata" :fields="hetongFields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData" :key="hetongComponentKey">
                <div slot="action" slot-scope="props">
                    <sui-button basic color="blue" v-on:click="editHeTongData(props.rowData)">编辑</sui-button>
                    <sui-button basic color="red">删除</sui-button>
                </div>

            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div> -->
        <dialog-bar :commentData="deleteTarget.comment" v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-content scrolling>
                    <div>
                        <sui-step-group>
                            <sui-step :active="currentStep==1">
                                <sui-icon name="truck" />
                                <sui-step-content>
                                    <sui-step-title>房屋清单</sui-step-title>
                                </sui-step-content>
                            </sui-step>

                            <sui-step :active="currentStep==2">
                                <sui-icon name="payment" />
                                <!-- Shorthand -->
                                <sui-step-content title="填写项目信息" />
                            </sui-step>

                            <sui-step :active="currentStep==3">
                                <sui-icon name="info" />
                                <sui-step-content title="上传附件" />
                            </sui-step>
                        </sui-step-group>

                        <!-- Shorthand -->
                        <sui-step-group :steps="steps" />
                    </div>
                    <sui-segment v-show="currentStep==1">
                        <div class="vue2Table">
                            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields2" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                <div slot="select" slot-scope="props">
                                    <sui-checkbox @change="handleChange(props)" v-model="props.rowData.select" />
                                </div>
                            </vuetable>
                            <div class="pagination ui basic segment grid">
                                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
                                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
                            </div>
                        </div>
                    </sui-segment>

                    <sui-segment v-show="currentStep==2">
                        <sui-form>
                            <sui-form-fields inline>
                                <label>项目名称</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.name" />
                                </sui-form-field>
                                <label>项目金额</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.budget" />
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <label>项目开始时间</label>
                                <sui-form-field>
                                    <datepicker :value="weixiuhetong.starttime" v-model="weixiuhetong.starttime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <label> 项目结束时间</label>
                                <sui-form-field>
                                    <datepicker :value="weixiuhetong.endtime" v-model="weixiuhetong.endtime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                            </sui-form-fields>
                        </sui-form>
                    </sui-segment>
                    <sui-segment v-show="currentStep==3">
                        <sui-button icon="upload" />上传附件
                    </sui-segment>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="currentStep !== 1 " basic color="blue" @click.native="goToPreviousStep">
                        上一步 </sui-button>
                    <sui-button v-if="currentStep !== 3" basic color="blue" @click.native="goToNextStep">
                        下一步
                    </sui-button>

                    <sui-button basic color="blue" @click.native="createWeiXiuHeTong" v-if="currentStep == 3">
                        确定
                    </sui-button>
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
import FieldHetong from "./fieldsHetong.js";
import WeiXiuForm from "@/components/weixiuForm";
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import Fields2 from "./fields2.js";
import constants from "@/util/constants";
import {
    notifySomething
} from "@/util/utils"
import {
    getMRApi,
    createMRApi,
    getroombyid,
    createMCApi,
    getMCApi,
    updateMCApi
} from "@/api/weixiuAPI";
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
            fields2: Fields2,
            lang: lang,
            hetongdata: [],
            hetongdataNewData: [],
            hetongComponentKey: 1,
            componentKey: 1,
            currentStep: 1,
            sendVal: false,
            open: false,
            weixiuList: [],
            value: [],
            mode: "",
            weixiuForm: {
                open: false,
            },
            selectedWeixiu: {},
            deleteTarget: "",
            loading: true,
            localData: [],
            hetongFields: FieldHetong,
            sortOrder: [{}],
            steps: [],
            weixiuhetong: {},
            maxStartDate: 0,
            minEndDate: 0
        };
    },

    methods: {
        editHeTongData(props) {
            this.resetStep();
            this.mode = "edit";
            this.weixiuhetong = props;
            this.weixiuList = [];
            var selectedlist = JSON.parse(this.weixiuhetong.mrlist);
            this.localData.data.map((one) => {
                one.select = false;
                selectedlist.map((selectedOne) => {
                    if (selectedOne == one.id) {
                        one.select = true;
                        this.weixiuList.push(one);
                    }
                })
            });
            this.componentKey++;
            this.open = true;
        },
        resetStep() {

            this.currentStep = 1;
        },
        createWeiXiuHeTong() {
            this.resetStep();
            this.weixiuhetong.mrlist = [];
            this.weixiuList.map((one) => {
                this.weixiuhetong.mrlist.push(one.id);
            });
            this.weixiuhetong.mrlist = JSON.stringify(this.weixiuhetong.mrlist);
            this.loading = true;
            var context = this;
            this.closeHetongModal();
            if (this.mode == "create") {
                createMCApi(this.weixiuhetong).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        context.refreshHetongList();
                        context.$notify({
                            group: 'foo',
                            title: '创建成功',
                            text: '创建成功',
                            type: "success"
                        });
                    } else {
                        context.$notify({
                            group: 'foo',
                            title: '创建失败',
                            text: '创建失败',
                            type: "error"
                        });

                    }
                }).catch(function (error) {
                    this.loading = false;
                    context.$notify({
                        group: 'foo',
                        title: '创建失败',
                        text: '创建失败',
                        type: "error"
                    });
                });
            } else if (this.mode == "edit") {
                updateMCApi(this.weixiuhetong).then((result) => {
                    context.loading = false;
                    if (result.data.code == 0) {
                        context.refreshHetongList();
                        context.$notify({
                            group: 'foo',
                            title: '更新成功',
                            text: '更新成功',
                            type: "success"
                        });
                    } else {
                        context.$notify({
                            group: 'foo',
                            title: '更新失败',
                            text: '更新失败',
                            type: "error"
                        });

                    }
                }).catch(function (error) {
                    this.loading = false;
                    context.$notify({
                        group: 'foo',
                        title: '更新失败',
                        text: '更新失败',
                        type: "error"
                    });
                });
            }

        },
        closeHetongModal() {
            this.open = false;
        },
        refreshHetongList() {
            this.loading = true;
            getMCApi().then((data) => {
                //this.localData = data.data.data;
                this.loading = false;
                this.hetongdata = {
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
                this.hetongdata.data.map((one, index) => {
                    var ganttData = {};
                    ganttData = {
                        id: index,
                        pid: index,
                        name: one.name,
                        startDate: one.starttime,
                        endDate: one.endtime,
                    }
                    this.hetongdataNewData.push(ganttData);

                    // switch (one.status) {
                    //     case 1:
                    //         one.statusText = "未开始";
                    //         break;
                    //     case 2:
                    //         one.statusText = "开始维修";
                    //         break;
                    //     case 3:
                    //         one.statusText = "维修完成";
                    //         break;
                    //     default:
                    //         break;
                    // }

                });
            }).catch(function (error) {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
        refreshWeixiuList() {
            this.loading = true;
            getMRApi({
                status: 2
            }).then((data) => {
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
                    }).catch(function (error) {
                        this.loading = false;
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                    });
                    switch (one.status) {
                        case 1:
                            one.statusText = "新建";
                            break;
                        case 2:
                            one.statusText = "审核通过";
                            break;
                        case 3:
                            one.statusText = "审核失败";
                            break;
                        default:
                            break;
                    }
                });
            }).catch(function (error) {
                this.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },

        openWeiXiuJihua() {
            this.mode = "create";
            this.weixiuhetong = {};
            this.resetStep();
            this.localData.data.map((one) => {
                one.select = false;
            })
            this.selectedlist = [];
            this.componentKey++;
            this.open = true;
        },

        goToPreviousStep() {
            this.currentStep--;

        },
        goToNextStep() {
            this.currentStep++;
        },
        handleChange(data) {
            console.log(this.weixiuList);
            var count = 0;
            this.weixiuList.map((item, index) => {
                if (item.id !== data.rowData.id) {} else {

                    count++;
                    this.weixiuList.splice(index, 1);
                }
            })
            if (count == 0) {
                this.weixiuList.push(data.rowData);
                return;
            }
            console.log(this.weixiuList);
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
            // this.contractForm.open = false;
        },
    },
    mounted() {
        //this.localData = data.data.data;
        this.loading = true;

        getMRApi({
            status: 2
        }).then((data) => {
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
                        this.componentKey++;
                    }
                }).catch(function (error) {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
                switch (one.status) {
                    case 1:
                        one.statusText = "新建";
                        break;
                    case 2:
                        one.statusText = "审核通过";
                        break;
                    case 3:
                        one.statusText = "审核失败";
                        break;
                    default:
                        break;
                }
            });
        }).catch(function (error) {
            this.loading = false;
            notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
        });

        getMCApi().then((data) => {
            //this.localData = data.data.data;
            this.loading = false;
            console.log(data.data.data);
            this.hetongdata = {
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
            this.hetongdata.data.map((one, index) => {
                var ganttData = {};
                ganttData = {
                    id: index,
                    pid: index,
                    name: one.name,
                    startDate: one.starttime,
                    endDate: one.endtime,
                    children: []
                }
                one.step_info.map((child) => {
                        var child = {
                            id: index*100 + child.id,
                            pid: index,
                            name: child.name,
                            startDate: child.starttime,
                            endDate: child.endtime
                        }
                        ganttData.children.push(child);
                    }
                )

                if (this.maxStartDate == 0) {
                    this.maxStartDate = one.starttime;
                    this.minEndDate = one.endtime;
                }

                this.hetongdataNewData.push(ganttData);

                switch (one.status) {
                    case 1:
                        one.statusText = "未开始";
                        break;
                    case 2:
                        one.statusText = "开始维修";
                        break;
                    case 3:
                        one.statusText = "维修完成";
                        break;
                    default:
                        break;
                }

            });
        }).catch(function (error) {
            this.loading = false;
            notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
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

.ui.table {
    font-size: 13px;
}

.ui.table thead th {
    cursor: auto;
    background: #f9fafb;
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
