<template lang="html">
<div>
    <div>

        <sui-dimmer :active="loading" inverted>
            <sui-loader content="Loading..." />
        </sui-dimmer>

    </div>
    <div class="filterBiaoDan">
        <sui-button content="添加" @click.native="createRoomModel" icon="add green" />
        <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
        <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
    </div>
    <div class="vue2Table">
        <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
            <div slot="action" slot-scope="props">
                <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" />
                <sui-button content="修改" v-on:click="viewSomeThing(props.rowData,'modify')" />
                <sui-button content="删除" v-on:click="deleteRoom(props.rowData)" />

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
            <sui-modal-header>{{modelTitle}}</sui-modal-header>
            <sui-modal-content image>
                <employee-form ref='formComponent'></employee-form>
            </sui-modal-content>
            <sui-modal-actions>
                
                <sui-button  negative @click.native="closeModal">
                    取消
                </sui-button>
                <sui-button v-if="modalMode !== 'check'" positive @click.native="toggle">
                    提交
                </sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</div>
</template>

<script>
import dialogBar from '@/components/MDialog'
import EmployeeForm from "@/components/employeeForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getEmployeeApi,
    createEmployeeApi,
    updateEmployeeApi,
    deleteEmployeeApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        EmployeeForm
    },
    data() {
        return {
            sendVal: false,
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
            deleteEmployeeApi(this.deleteTarget).then((result) => {
                this.refreshUnits();
                console.log(result)
            });
        },
        viewSomeThing(data, type) {
            this.$refs.formComponent.singleEmployee = data;
            //修改
            if (type == "modify") {
                //查看
                this.$refs.formComponent.disabled = false;
                this.modelTitle = "修改员工";
                this.modalMode = "edit";
                this.open = !this.open;
            } else if (type == "check") {
                this.$refs.formComponent.disabled = true;
                this.modalMode = "check";
                this.modelTitle = "查看员工资料";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
        },
        exportToExcel() {
            let headers = ['id', 'name', 'job', 'level'];
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
                text: "是否要删除员工(" + data.name + ")?",
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
            getEmployeeApi().then((data) => {
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
            this.modelTitle = "创建员工"
            this.modalMode = "create";
            this.open = true;
            this.$refs.formComponent.singleEmployee = {
                name: "",
                job: "",
                level: ""
            };
        },
        toggle() {
            this.open = !this.open;
            this.loading = true;
            let formdata = this.$refs.formComponent.singleEmployee;

            if (this.modalMode == "create") {
                createEmployeeApi(formdata).then((result) => {
                    console.log(result);
                    this.loading = false;
                    this.refreshUnits();
                });
            } else if (this.modalMode == "edit") {
                updateEmployeeApi(formdata).then((result) => {
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
        closeModal:function()
        {
            this.open=false;
        }

    },
    created() {
        getEmployeeApi().then((data) => {
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
    height:auto!important;
}

.ui.table thead th {
    padding: 2px !important;
    background-color: #75ADBF !important;
    color: white !important;
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
