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
                维修合同
            </h4>
        </div>
        <div class="filterBiaoDan">
            <sui-button content="创建维修计划" @click.native="openWeiXiuJihua" icon="add green" />
        </div>

        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="hetongdata" :fields="hetongFields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData" :key="hetongComponentKey">
                <div slot="action" slot-scope="props">
                    <sui-button>编辑</sui-button>
                    <sui-button>删除</sui-button>
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
                        <sui-step-group>
                            <sui-step :active="currentStep==1">
                                <sui-icon name="truck" />
                                <sui-step-content>
                                    <sui-step-title>选择维修房屋</sui-step-title>
                                </sui-step-content>
                            </sui-step>

                            <sui-step :active="currentStep==2">
                                <sui-icon name="payment" />
                                <!-- Shorthand -->
                                <sui-step-content title="填写合同信息" />
                            </sui-step>

                            <sui-step :active="currentStep==3">
                                <sui-icon name="info" />
                                <sui-step-content title="上传合同" />
                            </sui-step>
                        </sui-step-group>

                        <!-- Shorthand -->
                        <sui-step-group :steps="steps" />
                    </div>
                    <sui-segment v-show="currentStep==1">
                        <div class="vue2Table">
                            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields2" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                <div slot="select" slot-scope="props">
                                    <sui-checkbox label="" @change="handleChange(props)" />
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
                                <label>维修时间</label>
                                <sui-form-field>
                                    <datepicker :value="weixiuhetong.starttime" v-model="weixiuhetong.starttime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <label> 到</label>
                                <sui-form-field>
                                    <datepicker :value="weixiuhetong.endtime" v-model="weixiuhetong.endtime" :language="lang['zh']"></datepicker>
                                </sui-form-field>
                                <label>合同状态</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.status" />
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <label>维修单位</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.rep_unit" />
                                </sui-form-field>
                                <label> 维修金额</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="weixiuhetong.rep_contact" />
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <label>上传附件</label>
                                <sui-form-field>
                                    <input type="file" placeholder="请选择" />
                                </sui-form-field>
                            </sui-form-fields>
                        </sui-form>
                    </sui-segment>
                    <sui-segment v-show="currentStep==3">
                        <sui-button icon="upload" />上传附件
                    </sui-segment>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="currentStep !== 1 " positive @click.native="goToPreviousStep">
                        上一步 </sui-button>
                    <sui-button v-if="currentStep !== 3" positive @click.native="goToNextStep">
                        下一步
                    </sui-button>

                    <sui-button positive @click.native="createWeiXiuHeTong" v-if="currentStep == 3">
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

import {
    getMRApi,
    createMRApi,
    getroombyid,
    createMCApi,
    getMCApi
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
            hetongComponentKey: 1,
            componentKey: 1,
            currentStep: 1,
            sendVal: false,
            open: false,
            weixiuList: [],
            value: [],
            weixiuForm: {
                open: false
            },
            selectedWeixiu: {},
            deleteTarget: "",
            loading: true,
            localData: [],
            hetongFields: FieldHetong,
            sortOrder: [{}],
            steps: [],
            weixiuhetong: {},
        };
    },

    methods: {
        createWeiXiuHeTong() {
            console.log(this.weixiuhetong);
            this.weixiuhetong.mrlist = [];
            this.weixiuList.map((one) => {
                this.weixiuhetong.mrlist.push(one.id);
            });

            this.weixiuhetong.mrlist = JSON.stringify(this.weixiuhetong.mrlist);
            this.weixiuhetong.memo = "test";
            this.loading = true;
            var context = this;
            this.closeHetongModal();
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
        },
        closeHetongModal() {
            this.open = false;
        },
        createShenbao() {
            this.loading = true;
            createMRApi(this.selectedWeixiu).then((result) => {
                console.log(result);
                this.loading = false;
                this.closeWeiXiuForm();
                this.refreshWeixiuList();
            })
        },
        refreshHetongList() {
            this.loading=true;
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
                this.hetongdata.data.map((one) => {
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

            });
        },
        refreshWeixiuList() {
            this.loading = true;
            getMRApi().then((data) => {
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
                            one.statusText = "新建";
                            break;
                        case 2:
                            one.statusText = "审核中";
                            break;
                        case 3:
                            one.statusText = "审核通过";
                            break;
                        default:
                            break;
                    }

                });

            });
        },
        openWeiXiuForm() {
            this.weixiuForm.open = true;
        },
        closeWeiXiuForm() {
            this.weixiuForm.open = false;
        },
        openWeiXiuJihua() {
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
        getMRApi().then((data) => {
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
                        one.statusText = "新建";
                        break;
                    case 2:
                        one.statusText = "审核中";
                        break;
                    case 3:
                        one.statusText = "审核通过";
                        break;
                    default:
                        break;
                }

            });

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
            this.hetongdata.data.map((one) => {
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
