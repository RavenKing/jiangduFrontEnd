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
                                    <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
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
                    <sui-button positive content="修改" v-on:click="viewSomeThing(props.rowData,'modify')" />
                    <sui-button negative content="删除" v-on:click="deleteRoom(props.rowData)" />
                    <sui-button content="创建合同" v-on:click="openContractModal(props.rowData)" />

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
                        <sui-tab :menu="{ text: true }">
                            <sui-tab-pane title="基本信息" :attached="false">
                                <div>
                                    <rentroom-form ref='formComponent' :singleRoom="selectedRoom"></rentroom-form>
                                </div>
                            </sui-tab-pane>
                          
                            <sui-tab-pane title="合同信息" :attached="false">
                            </sui-tab-pane>
                            <sui-tab-pane title="物业管理" :attached="false">
                            </sui-tab-pane>
                            <sui-tab-pane title="分配单位" :attached="false">
                            </sui-tab-pane>
                            <sui-tab-pane title="地图定位" :attached="false">
                            </sui-tab-pane>
                        </sui-tab>
                    </div>
                    </sui-modal-content>
                    <sui-modal-actions>
                        <sui-button negative @click.native="closeModal">
                            取消
                        </sui-button>
                        <sui-button positive @click.native="createRentContract">
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
import contractForm from "@/components/rentContractForm";
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
        'rentroom-form': RentRoomForm,
        'contract-form': contractForm

    },
    data() {
        return {
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            selectedRoom: {},
            deleteTarget: "",
            loading: true,
            localData: [],
            fields: FieldsDef,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
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
            deleteRentRoomApi(this.deleteTarget).then((result) => {
                this.refreshRooms();
                console.log(result)
            });
        },
        openContractModal(rowData) {
            this.contractForm.open = true;
            this.contractForm.room_id = rowData.room_id;
            this.$refs.formComponentContract.singleContract = this.contractForm;
        },
        createRentContract: function () {
            createLoanContractApi(this.$refs.formComponentContract.singleContract).then(() => {
                this.$refs.formComponentContract.singleContract = {
                    open: false,
                    title: "createForm",
                    room_id: "",
                    amt: 0,
                    owner: "",
                    rentunit: "",
                    starttime: "",
                    endtime: ""
                }
                this.contractForm.open = false;
            });

        },
        viewSomeThing(data, type) {
            this.selectedRoom = data;
    console.log(this.selectedRoom);
            //修改
            if (type == "modify") {
                //查看
                this.$refs.formComponent.disabled = false;
                this.modelTitle = "修改租赁房屋";
                this.modalMode = "edit";
                this.open = !this.open;
            } else if (type == "check") {
                this.$refs.formComponent.disabled = true;
                this.modalMode = "check";
                this.modelTitle = "查看租赁房屋";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
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
        deleteRoom(data) {
            this.sendVal = true;
            this.deleteTarget = {
                text: "是否要删除" + data.room_id + "(" + data.room_name + ")?",
                id: data.id
            };
            // this.loading = true;
            // deleteRoomApi(data).then((result) => {
            //     this.refreshRooms();
            //     console.log(result)
            // });
        },
        refreshRooms() {
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
            this.modalMode = "create";
            this.open = true;
            this.$refs.formComponent.singleRoom = {
                room_id: "",
                cert_id: "",
                owner: "",
                address: "",
                room_name: "",
                usage: "",
                space: "",
                optional: "",
                age: "",
                build_date: "",
                origin_value: "",
                room_value: "",
                dep: "",
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: ""
            };
        },
        toggle() {
            this.open = !this.open;
            this.loading = true;
            let formdata = this.$refs.formComponent.singleRoom;
            if (formdata.space == "") {
                formdata.space = null;
            }
            if (formdata.usage == "") {
                formdata.usage = null
            }
            if (this.modalMode == "create") {
                createRentRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    console.log(result);
                    this.loading = false;
                });
            } else if (this.modalMode == "edit") {
                updateRentRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    console.log(result);
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
            this.open = false;
            this.contractForm.open = false;
        }

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
