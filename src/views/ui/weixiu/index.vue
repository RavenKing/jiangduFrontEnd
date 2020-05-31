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
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="select" slot-scope="props">
                    <sui-checkbox label="" @change="handleChange(props)" />
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
                <sui-modal-content >
                  <weixiu-form> </weixiu-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createRentContract">
                        申报
                    </sui-button>
                    <sui-button positive @click.native="createRentContract">
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
        <div class="filterBiaoDan">
            <sui-button content="创建维修计划" @click.native="openWeiXiuJihua" icon="add green" />
        </div>

        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="select" slot-scope="props">
                    <sui-checkbox label="" @change="handleChange(props)" />
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
                <sui-modal-content>
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
                            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields2" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
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
                                    <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                                </sui-form-field>
                                <label> 到</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                                </sui-form-field>
                                <label>合同状态</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                                </sui-form-field>
                            </sui-form-fields>
                            <sui-form-fields inline>
                                <label>维修单位</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                                </sui-form-field>
                                <label> 维修金额</label>
                                <sui-form-field>
                                    <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
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

                    <sui-button positive @click.native="" v-if="currentStep == 3">
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
import FieldsDef from "./FieldsDef.js";
import Fields2 from "./fields2.js";
import WeiXiuForm from "@/components/weixiuForm";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getRentRoomDataApi,
    createRentRoomApi,
    updateRentRoomApi,
    deleteRentRoomApi,
    createLoanContractApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        'weixiu-form': WeiXiuForm

    },
    data() {
        return {
            currentStep: 1,
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            weixiuList: [],
            value: [],
            weixiuForm: {
                open: false
            },
            deleteTarget: "",
            loading: true,
            localData: [],
            fields: FieldsDef,
            fields2: Fields2,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
            steps: [],
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
        openWeiXiuForm() {
            this.weixiuForm.open = true;
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
        }

    },
    created() {
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
            data: [{
                    id: 1,
                    roomname: "金山1",
                    address: "jinshan1"
                },
                {
                    id: 2,
                    roomname: "金山2",
                    address: "jinshan2"
                },
                {
                    id: 3,
                    roomname: "金山3",
                    address: "jinshan3"
                },
                {
                    id: 4,
                    roomname: "金山4",
                    address: "jinshan4"
                }
            ]
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
