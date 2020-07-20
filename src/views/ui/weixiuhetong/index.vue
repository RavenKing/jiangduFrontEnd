<template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan">
            <sui-button basic color="blue" content="新建" @click.native="openWeiXiuJihua" icon="add blue" />
        </div>

        <div class="wl-gantt-demo">
            <wlGantt @expand-change="expandChange" :key="componentKey"  @taskRemove="removeTasks" @row-dblclick="handleRowDbClick" :data="hetongdataNewData" use-real-time date-type="yearAndMonth" :start-date="maxStartDate" :end-date="minEndDate" @timeChange="timeChange"></wlGantt>
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
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="project.open">
                <sui-modal-header>
                    <h4 is="sui-header">项目信息
                    </h4>
                </sui-modal-header>
                <sui-modal-content scrolling>

                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red">
                        取消
                    </sui-button>
                    <sui-button basic color="blue">
                        保存
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="selectedStep.open">
                <sui-modal-header>
                    <h4 is="sui-header">步骤控制
                    </h4>
                </sui-modal-header>
                <sui-modal-content scrolling>
                    <div v-show="selectedStep.mode=='edit'">
                        <sui-form>
                            <sui-form-fields inline>
                                <sui-form-field>
                                    <label>开始时间:</label>
                                    <datepicker :value="selectedStep.data.startDate" v-model="selectedStep.data.startDate" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>结束时间:</label>
                                    <datepicker :value="selectedStep.data.endDate" v-model="selectedStep.data.endDate" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <sui-form-field>
                                    <label>计划开始:</label>
                                    <datepicker :value="selectedStep.data.realStartDate" v-model="selectedStep.data.realStartDate" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>计划结束时间:</label>
                                    <datepicker :value="selectedStep.data.realEndDate" v-model="selectedStep.data.realEndDate" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                            </sui-form-fields>
                        </sui-form>
                    </div>
                    <div v-show="selectedStep.mode=='mark'">
                        <sui-form>
                            <sui-form-fields>
                                <sui-form-field>
                                    <label>结束时间:</label>
                                    <datepicker :value="selectedStep.data.endtime" v-model="selectedStep.data.endtime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                            </sui-form-fields>
                        </sui-form>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeStepModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="saveModel">
                        保存
                    </sui-button>
                    <sui-button basic color="blue" @click.native="changeStepModal">
                        完成步骤
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal v-model="open">
                <sui-modal-content scrolling class="modalStep">
                    <div style="font-size:0">
                        <sui-step-group size="mini" style="width:100%;">
                            <sui-step :active="currentStep==1">
                                <sui-icon style="font-size:16px;" name="truck" />
                                <sui-step-content>
                                    <sui-step-title>房屋清单</sui-step-title>
                                </sui-step-content>
                            </sui-step>

                            <sui-step :active="currentStep==2">
                                <sui-icon style="font-size:16px;" name="payment" />
                                <!-- Shorthand -->
                                <sui-step-content title="填写项目信息" />
                            </sui-step>

                            <sui-step :active="currentStep==3">
                                <sui-icon style="font-size:16px;" name="info" />
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
                        </div>
                    </sui-segment>

                    <sui-segment v-show="currentStep==2">
                        <sui-form>
                            <sui-form-fields inline>
                                <label style="width:80px;">项目名称</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.name" />
                                </sui-form-field>
                                <label style="width:80px;">项目金额</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.budget" />
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <label style="width:80px;">项目开始时间</label>
                                <sui-form-field>
                                    <datepicker :value="weixiuhetong.starttime" v-model="weixiuhetong.starttime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <label style="width:80px;"> 项目结束时间</label>
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
import FieldHetong from "./fieldsHetong.js";
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import Fields2 from "./fields2.js";
import constants from "@/util/constants";
import {
    notifySomething
} from "@/util/utils"
import {
    fromShitFormat,
    toShitFormat
} from "@/util/time"
import {
    getMRApi,
    getroombyid,
    createMCApi,
    getMCApi,
    updateMCApi,
    delProjectApi,
    delStepApi,
    markStepApi,
    editStepApi
} from "@/api/weixiuAPI";
export default {
    name: "MyVuetable",
    components: {
        Datepicker,
        'dialog-bar': dialogBar,
        Vuetable,
    },
    data() {
        return {
            project: {
                open: false
            },
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
            selectedStep: {
                mode: "default",
                open: false,
                data: {}
            },
            selectedWeixiu: {},
            deleteTarget: {},
            loading: true,
            localData: [],
            hetongFields: FieldHetong,
            sortOrder: [{}],
            steps: [],
            weixiuhetong: {},
            maxStartDate: "2020-01-01",
            minEndDate: "2021-07-31"
        };
    },

    methods: {
        expandChange() {},
        changeStepModal() {
            this.selectedStep.mode = "mark"
        },
        saveModel() {
            this.selectedStep.open = false;
            this.loading = true;
            var payload;
            if (this.selectedStep.mode == "edit") {
                payload = {
                    id: this.selectedStep.data.step_id,
                    starttime: toShitFormat(this.selectedStep.data.startDate),
                    endtime: toShitFormat(this.selectedStep.data.endDate),
                    plantime: toShitFormat(this.selectedStep.data.realStartDate),
                    planendtime: toShitFormat(this.selectedStep.data.realEndDate),
                }
                editStepApi(payload).then((one) => {
                    this.loading = false;
                    if (one.data.code == 0) {
                        this.refreshHetongList();
                        notifySomething("编辑成功", "编辑成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError)
                    }
                }).catch(() => {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError)

                })

            } else if (this.selectedStep.mode == "mark") {
                console.log(this.selectedStep.data);
                payload = {
                    id: this.selectedStep.data.step_id,
                    endtime: toShitFormat(this.selectedStep.data.endtime)
                }
                markStepApi(payload).then((one) => {
                    this.loading = false;
                    if (one.data.code == 0) {
                        this.refreshHetongList();
                        notifySomething("马克成功", "马克成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError)
                    }
                }).catch(() => {
                    this.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError)

                })

            }

        },
        closeStepModal() {
            this.selectedStep.open = false;
        },
        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.type == "project") {
                delProjectApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        this.loading = false;
                        this.refreshHetongList();
                        notifySomething("删除项目成功", "删除项目成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR + result.data.code, constants.typeError);
                    }
                }).catch(() => {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                })
            } else if (this.deleteTarget.type == "step") {
                delStepApi(this.deleteTarget).then((result) => {
                    if (result.data.code == 0) {
                        this.loading = false;
                        this.refreshHetongList();
                        notifySomething("删除步骤成功", "删除步骤成功", constants.typeSuccess);
                    } else {
                        notifySomething(constants.GENERALERROR, constants.GENERALERROR + result.data.code, constants.typeError);
                    }
                }).catch(() => {
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                })
            }

        },
        nameChange(row) {
            console.log(row);
        },
        removeTasks(row) {
            console.log(row.type);
            this.deleteTarget.type = row.type;
            if (row.type && row.type == "project") {
                this.deleteTarget.text = "是否要删除项目" + row.name;
                this.deleteTarget.id = row.project_id;
                this.sendVal = true;
            } else if (row.type == "step") {
                this.deleteTarget.text = "是否要删除步骤" + row.name;
                this.deleteTarget.id = row.step_id;
                this.sendVal = true;
            }
        },
        handleRowDbClick(row) {
            var selectedRow = {};
            if (row.type == "project") {
                this.hetongdata.data.map((one) => {
                    if (one.id == row.project_id) {
                        selectedRow = one;
                    }
                });
                this.editHeTongData(selectedRow);
            } else if (row.type == "step") {
                this.selectedStep.mode = "edit";
                // this.selectedStep = row;
                this.selectedStep.open = true;
                this.selectedStep.data = row;

            }
        },
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
            this.weixiuhetong.starttime = toShitFormat(this.weixiuhetong.starttime);
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
                }).catch(function () {
                    context.loading = false;
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
                }).catch(function () {
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
            this.hetongdataNewData = [];
            getMCApi().then((data) => {
                //this.localData = data.data.data;
                this.loading = false;
                this.hetongdata = {
                    data: data.data.data
                }
                var testData = [];
                this.hetongdata.data.map((one, index) => {
                    var ganttData = {};
                    index = index + 1;
                    switch (one.status) {
                        case 1:
                            one.status = "未开始";
                            break;
                        case 2:
                            one.status = "完成";
                            break;
                        default:
                            break;
                    }
                    ganttData = {
                        id: index,
                        pid: index,
                        project_id: one.id,
                        type: "project",
                        name: one.name,
                        startDate: fromShitFormat(one.starttime),
                        endDate: fromShitFormat(one.endtime),
                        realStartDate: fromShitFormat(one.plantime),
                        realEndDate: fromShitFormat(one.planendtime),
                        status: one.status,
                        children: []
                    }
                    if (new Date(ganttData.startDate) < new Date(this.maxStartDate)) {
                        this.maxStartDate = ganttData.startDate;
                    }
                    if (new Date(ganttData.endDate) > new Date(this.minEndDate)) {
                        this.minEndDate = ganttData.endDate;
                    }

                    one.step_info.map((child) => {
                        switch (child.status) {
                            case 1:
                                child.status = "未开始";
                                break;
                            case 2:
                                child.status = "完成";
                                break;
                            default:
                                break;
                        }
                        var childOne = {
                            id: index * 100 + child.id,
                            pid: index,
                            name: child.name,
                            type: "step",
                            step_id: child.id,
                            startDate: fromShitFormat(child.plantime),
                            endDate: fromShitFormat(child.endtime),
                            realStartDate: fromShitFormat(child.plantime),
                            realEndDate: fromShitFormat(child.planendtime),
                            status: child.status,
                        }
                        ganttData.children.push(childOne);
                    })

                    if (this.maxStartDate == 0) {
                        this.maxStartDate = one.starttime;
                        this.minEndDate = one.endtime;
                    }

                    testData.push(ganttData);

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
                this.hetongdataNewData = testData;
                this.componentKey++;
            }).catch(function () {
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
                        if (result.data.code == 0) {
                            one.roomname = result.data.data.roomname;
                            one.address = result.data.data.address;
                            console.log(one.address);
                            console.log(this.localData.data);
                            this.componentKey++;
                        }
                    }).catch(function () {
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
            }).catch(function () {
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
                if (item.id !== data.rowData.id) {
                    console.log("do nothing")
                } else {

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
    created() {
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
        }).catch(function () {
            this.loading = false;
            notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
        });

        this.refreshHetongList();

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

.modalStep {
    height: 500px;
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

.vue2Table {
    /* margin: 20px; */
}

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}

.ui.modal>.actions {
    background: #F5F7FA;
    padding: 1rem 1rem;
    border-top: 1px solid rgba(34, 36, 38, .15);
    text-align: center;
}

.ui.segment {
    margin: 0;
    margin-top: 15px;
}

.ui.step,
.ui.steps .step {
    text-align: left;
    justify-content: left;
}

.wl-gantt-demo .el-table {
    border-radius: .28571429rem;
}
</style>
