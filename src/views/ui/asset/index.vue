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
                基本信息列表
            </h4>
        </div>
        <div class="filterBiaoDan">

            <sui-button content="添加" @click.native="createRoomModel" icon="add green" />
            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>
        <div class="filterBiaoDan">
            <sui-form>
                <sui-form-fields inline>
                    <label> 房屋ID</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.jiadi" />
                    </sui-form-field>
                    <label> 权证号</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.diji" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields inline>
                    <label> 使用面积</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                    </sui-form-field>
                    <label> 至</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-fields inline>
                    <label> 产证面积</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.hezhunyongtu" />
                    </sui-form-field>
                    <label> 至</label>
                    <sui-form-field>
                        <input type="text" placeholder="请选择" v-model="filterString.shijiyongtu" />
                    </sui-form-field>
                </sui-form-fields>
            </sui-form>
            <sui-button positive content="查询" v-on:click="submit" />
            <sui-button content="重置" />
        </div>
        <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="action" slot-scope="props">
                    <!-- <sui-button positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" /> -->
                    <sui-button positive content="编辑" v-on:click="viewSomeThing(props.rowData,'modify')" />
                    <sui-button content="删除" v-on:click="deleteRoom(props.rowData)" />
                    <sui-button positive content="定位地址" v-on:click="showMapF(props.rowData)" />
                    <sui-button content="分配房屋" v-on:click="openAssignModal(props.rowData)" />
                    <!-- <sui-button content="分配房屋列表" v-on:click="openAssignList(props.rowData)" /> -->
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
                <sui-modal-content>
                    <div>
                        <form-create ref='formComponent'></form-create>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" positive @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal class="modal2" v-model="assignForm.open">
                <sui-modal-header>分配房屋</sui-modal-header>
                <sui-modal-content image>
                    <assign-form ref='formComponentAssign'></assign-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createAssignment">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div v-show="showMap">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="tag icon"></i>
                    地址选取({{selectedRoom.roomname}})
                </h4>
            </div>

            <baidu-map class="map" :center="point" :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                </bm-marker>
            </baidu-map>
        </div>
        <div v-show="assignList.open">
            <div is="sui-divider" horizontal>
                <h4 is="sui-header">
                    <i class="tag icon"></i>
                    分配房屋({{assignForm.roomname}})
                </h4>
            </div>
            <div class="buttonBuildingFloor">
                <sui-button positive @click.native="openAssignModal(null)">
                    创建楼
                </sui-button>
                <sui-button positive @click.native="openAssignModal(null)">
                    创建楼层
                </sui-button>
            </div>
            <sui-tab>
                <sui-tab-pane v-for="todo in todos" v-bind:key="todo.id" title="todo.id">
                    <h3>HTML</h3>
                    <p>
                        {{todo.text}}
                    </p>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">developer.mozilla.org</a>
                </sui-tab-pane>
            </sui-tab>
        </div>

    </div>
</wl-container>
</template>

<script>
import dialogBar from '@/components/MDialog'
import FormCreate from "@/components/createForm";
import assignForm from "@/components/assignForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FieldsDefList from "./FieldsDefList.js";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
// import {
//     getMapLonAndLat
//     //getRentRoomContractListApi
// } from "@/api/utilApi";
import {
    getRoomDataApi,
    createRoomApi,
    updateRoomApi,
    deleteRoomApi,
    createRentContractApi,
    createAssignmentApi,
    getAssignRoomList
    //getRentRoomContractListApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        FormCreate,
        'assign-form': assignForm
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
            showMap: false,
            point: {},
            assignForm: {
                open: false,
                room_id: "",
                roomname: ""
            },
            deleteTarget: "",
            loading: true,
            localData: [],
            selectedRoom: {},
            listField: FieldsDefList,
            fields: FieldsDef,
            sortOrder: [{
                field: "email",
                direction: "asc"
            }],
            assignList: {
                open: false,
                data: []
            },
            unitList: [],
            todos: [{
                    id: 1,
                    text: 'Learn JavaScript'
                },
                {
                    id: 2,
                    text: 'Learn Vue'
                },
                {
                    id: 3,
                    text: 'Build something awesome'
                }
            ]
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
        openAssignList(rowData) {
            this.assignList.open = true;
            getAssignRoomList(rowData).then((result) => {
                this.assignList.data = result.data;
                console.log(result);
            })

        },
        showMapF: function (data) {
            this.assignList.open = false;
            this.selectedRoom = data;
            this.showMap = true;
          //  this.loading = true;

            this.point = {
                lng: data.lon,
                lat: data.lat
            }
            // getMapLonAndLat(this.point).then((data) => {
            //     this.point = {
            //         lng: data.result.x[0],
            //         lat: data.result.y[0]
            //     }
            // })
        },
        dragend: function (e) {
            this.loading = true;
            this.selectedRoom.lon = e.point.lng;
            this.selectedRoom.lat = e.point.lat;
            updateRoomApi(this.selectedRoom).then((result) => {
                console.log(result);
                this.loading = false;
            });
        },
        // openContractList(rowData) {
        //     this.contractList.open = true;
        //     this.contractList.room_id = rowData.room_id;
        //     this.loading = true;
        //     getRentRoomContractListApi(rowData).then((result) => {
        //         this.loading = false;
        //         this.contractList.dataList = result;
        //     })
        // },
        openAssignModal(rowData) {
            this.assignList.open = true;
            if (rowData !== undefined) {
                this.assignForm.room_id = rowData.room_id;
                this.assignForm.roomname = rowData.roomname;
                this.showMap = false;
            }
            console.log(rowData.room_id);
            console.log(this.selectedRoom.room_id);

            this.$refs.formComponentAssign.singleAssignment = this.assignForm;
        },
        createAssignment() {
            this.loading = true;
            this.assignForm.open = false;
            createAssignmentApi(this.$refs.formComponentAssign.singleAssignment).then(() => {
                this.loading = false;
            });
        },
        clickConfirmDelete() {
            this.loading = true;
            deleteRoomApi(this.deleteTarget).then((result) => {
                this.refreshRooms();
                console.log(result)
            });
        },
        createRentContract: function () {
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
        viewSomeThing(data, type) {
            this.$refs.formComponent.singleRoom = data;
            //修改
            if (type == "modify") {
                //查看
                this.modelTitle = "编辑房屋";
                this.modalMode = "edit";
                this.open = !this.open;
                console.log(data.lat);
                console.log(data.lon);
                if (this.$refs.formComponent.zoomlevel == 14) {
                    this.$refs.formComponent.zoomlevel = 13;
                }
                if (data.lat === null) {

                    this.$refs.formComponent.point = {
                        lng: 121.547967,
                        lat: 30.879141
                    }
                } else {
                    this.point = {
                        lng: data.lon,
                        lat: data.lat
                    }
                    this.$refs.formComponent.point = {
                        lng: data.lon,
                        lat: data.lat
                    }
                }
            } else if (type == "check") {
                this.modalMode = "check";
                this.modelTitle = "查看Room";
                this.open = !this.open;
            } else {
                console.log("delete");
            }
        },
        exportToExcel() {
            let headers = ['id', 'room_id', 'certid', 'owner', 'address', 'roomname', 'usage', 'space', 'optional', 'age', 'build_date', 'origin_value', 'room_value', 'dep', 'net_value', 'dep_rate', 'internal_info', 'cur_status'];
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
                text: "是否要删除" + data.room_id + "(" + data.roomname + ")?",
                id: data.id
            };
        },
        refreshRooms() {
            getRoomDataApi().then((data) => {
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
        openContractModal(rowData) {
            this.contractForm.open = true;
            this.contractForm.room_id = rowData.room_id;
            this.$refs.formComponentContract.singleContract = this.contractForm;
        },
        // assignRentRoom(rowData){
        //     console.log(rowData);
        // },
        createRoomModel() {
            // show create Model
            this.modelTitle = "创建房屋"
            this.modalMode = "create";
            this.open = true;
            this.$refs.formComponent.singleRoom = {
                room_id: "",
                certid: "",
                owner: "",
                address: "",
                roomname: "",
                usage: "",
                space: "",
                optional: "",
                age: "",
                built_date: "",
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
                createRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
                    console.log(result);
                    this.loading = false;
                });
            } else if (this.modalMode == "edit") {
                updateRoomApi(this.$refs.formComponent.singleRoom).then((result) => {
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
            this.assignForm.open = false;
            this.assignList.open = false;

        }
    },
    created() {
        getRoomDataApi().then((data) => {
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

.buttonBuildingFloor {
    margin: 10px
}

.pagination {
    margin-top: 1rem;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer
}
</style>
