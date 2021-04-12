<template lang="html">
<wl-container>
    <div>
        <div>

            <sui-dimmer :active="loading" inverted>
                <sui-loader content="正在加载" />
            </sui-dimmer>

        </div>
        <div class="filterBiaoDan">
            <sui-button content="创建合同" icon="edit yellow" v-on:click="openContractForm" />
            <!-- <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />  -->
        </div>
        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <sui-button content="删除合同" v-on:click="deleteRoom(props.rowData)" />

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
                <sui-modal-header style="border-bottom:0;">{{modelTitle}}</sui-modal-header>
                <sui-modal-content image>
                    <unit-form ref='formComponent'></unit-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red"  @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" basic color="blue"  @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modalForm" v-model="contractForm.open">
                <sui-modal-header style="border-bottom:0;">创建合同 </sui-modal-header>
                <sui-modal-content image>
                    <contract-form ref='formComponentContract'></contract-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red"  @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button basic color="blue"  @click.native="createContract">
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
import UnitForm from "@/components/unitForm";
import contractForm from "@/components/rentContractForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getRentRoomContractListApi,
    deleteRentContractApi,
    createRentContractApi

} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        UnitForm,
        'contract-form': contractForm
    },
    data() {
        return {
            sendVal: false,
            contractForm: {
                open: false,
                title: "createForm",
                room_id: "",
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: ""
            },
            modelTitle: "",
            modalMode: "create",
            open: false,
            deleteTarget: "",
            loading: true,
            localData: [],
            fields: FieldsDef,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }]
        };
    },

    methods: {
        openContractForm: function () {
            this.contractForm.open = true
        },
        formatDate(timeDate){
            const year = new Intl.DateTimeFormat('en', { year: 'numeric'}).format(timeDate)
            const month = new Intl.DateTimeFormat('en', {  month: '2-digit' }).format(timeDate)
            const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(timeDate)
            return year.toString()+month.toString()+day.toString();
        },

        createContract: function () {

            var postdata =this.$refs.formComponentContract.singleContract; 
            postdata.starttime=this.formatDate(postdata.starttime); 
            postdata.endtime=this.formatDate(postdata.endtime);
            postdata.rent_amt=parseInt(postdata.amt);
            postdata.rentowner=postdata.owner;
            postdata.rent_mobile=postdata.mobile;
            createRentContractApi(this.$refs.formComponentContract.singleContract).then(() => {
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
            deleteRentContractApi(this.deleteTarget).then((result) => {
                this.refreshUnits();
                console.log(result)
            });
        },
        viewSomeThing(data, type) {
            this.$refs.formComponent.singleUnit = data;
            //修改
            if (type == "modify") {
                //查看
                this.$refs.formComponent.disabled = false;
                this.modelTitle = "修改单位";
                this.modalMode = "edit";
                this.open = !this.open;
            } else if (type == "check") {
                this.$refs.formComponent.disabled = true;
                this.modalMode = "check";
                this.modelTitle = "查看单位";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
        },
        exportToExcel() {
            let headers = ['id', 'name', 'enumber', 'level', 'level_num'];
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
                text: "是否要删除" + data.rentowner + "(" + data.rentunit + ")?",
                id: data.id
            };
            // this.loading = true;
            // deleteRoomApi(data).then((result) => {
            //     this.refreshUnits();
            //     console.log(result)
            // });
        },
        refreshUnits() {
            this.loading = true;
            getRentRoomContractListApi().then((data) => {
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
            this.modelTitle = "创建单位"
            this.modalMode = "create";
            this.open = true;
            this.$refs.formComponent.singleUnit = {
                name: "",
                enumber: "",
                level: "",
                level_num: ""
            };
        },
        toggle() {
            this.open = !this.open;
            this.loading = true;
            // let formdata = this.$refs.formComponent.singleUnit;

            // if (this.modalMode == "create") {
            //     createUnitApi(formdata).then((result) => {
            //         console.log(result);
            //         this.loading = false;
            //         this.refreshUnits();

            //     });
            // } else if (this.modalMode == "edit") {
            //     updateUnitApi(formdata).then((result) => {
            //         console.log(result);
            //         this.loading = false;
            //     });
            // }

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
            this.contractForm.open=false;
        }

    },
    created() {
        getRentRoomContractListApi().then((data) => {
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
.ui.modal {
    top: auto;
    left: auto;
    height:auto !important;
    /* min-height: 500px !important; */
}
.ui.modal>.actions{
    background: rgb(249, 250, 251);
    border-bottom-left-radius: 0.285714rem;
    border-bottom-right-radius: 0.285714rem;
    padding: 1rem;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    text-align: center;
}
.ui.modal>.content{
    padding: 15px 15px 15px 15px;
    box-sizing: border-box;
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
.map {
    width: 100%;
    height: 400px;
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
</style>
