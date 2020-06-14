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
                申请维修
            </h4>
        </div>
        <div class="filterBiaoDan">
            <sui-button content="申请维修" @click.native="openWeiXiuForm" icon="add green" />
        </div>

        <div class="vue2Table">
            <vuetable :key="componentKey" ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
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
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="weixiuForm.open">
                <sui-modal-header>申请维修</sui-modal-header>
                <sui-modal-content scrolling>
                    <weixiu-form :singleEntry="selectedWeixiu" ref="weixiuForm"> </weixiu-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeWeiXiuForm">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createShenbao">
                        申报
                    </sui-button>
                    <sui-button positive @click.native="">
                        保存
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div is="sui-divider" horizontal>
            <h4 is="sui-header">
                <i class="tag icon"></i>
                维修合同
            </h4>
        </div>
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

    </div>
</wl-container>
</template>

<script>
import dialogBar from '@/components/MDialog'
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import Fields2 from "./fields2.js";
import FieldHetong from "./fieldsHetong.js";
import WeiXiuForm from "@/components/weixiuForm";
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getMRApi,
    createMRApi,
    getroombyid,
    createMCApi,
    getMCApi
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
            weixiuForm: {
                open: false
            },
            selectedWeixiu: {},
            deleteTarget: "",
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
        editWeixiuShenqing(props) {
            console.log(props);
            this.selectedWeixiu = props;
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
                        context.openWeiXiuForm();
                    });
                })
            } else {
                context.openWeiXiuForm();
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
            closeHetongModal
            createMCApi(this.weixiuhetong).then((result) => {
                this.loading = false;
                if (result.data.code == 0) {
                    this.$notify({
                        group: 'foo',
                        title: '创建成功',
                        text: '创建成功',
                        type: "success"
                    });
                } else {
                    this.$notify({
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
            this.contractForm.open = false;
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
