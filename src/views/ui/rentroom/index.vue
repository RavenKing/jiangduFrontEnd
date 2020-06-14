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
                    <sui-button positive content="修改" v-on:click="viewSomeThing(props.rowData)" />
                    <sui-button negative content="删除" v-on:click="deleteRoom(props.rowData)" />

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
                                    <rentroom-form :singleRoom="selectedRoom"></rentroom-form>
                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="合同信息" :attached="false" :disabled="!editMode">
                                <div>
                                    <contract-form :singleEntry="selectedRoomContract"></contract-form>
                                    <sui-button content="创建合同" v-on:click="createRentContract()" />

                                </div>
                            </sui-tab-pane>
                            <sui-tab-pane title="分配单位" :attached="false" :disabled="!editMode">
                            </sui-tab-pane>
                            <sui-tab-pane title="地图定位" :attached="false" :disabled="!editMode">
                                <div class="imageForm" :key="ComponentKey">
                                    <sui-form>
                                        <sui-form-fields inline>
                                            <label> 经度
                                            </label>
                                            <sui-form-field>
                                                <sui-input type="text" placeholder="请选择" v-model="selectedRoom.lon" />
                                            </sui-form-field>
                                            <label> 维度</label>
                                            <sui-form-field>
                                                <sui-input type="text" placeholder="请选择" v-model="selectedRoom.lat" />
                                            </sui-form-field>
                                        </sui-form-fields>
                                    </sui-form>
                                </div>
                                <baidu-map class="map" :center="point" :zoom="15">
                                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                                    <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                                    </bm-marker>
                                </baidu-map>
                            </sui-tab-pane>
                        </sui-tab>
                    </div>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="toggle">
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
import rentHeTongForm from "@/components/rentHeTongForm";
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getRentRoomDataApi,
    createRentRoomApi,
    updateRentRoomApi,
    deleteRentRoomApi,
    createRentContractApi,
    getRentRoomContractListApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        'rentroom-form': RentRoomForm,
        'contract-form': rentHeTongForm

    },
    data() {
        return {
            sendVal: false,
            modelTitle: "",
            editMode: false,
            open: false,
            filterString: {
                jiadi: "",
                diji: ""
            },
            point: {},
            selectedRoom: {},
            selectedRoomContract: {},
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
                model: "create",
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
            this.selectedRoomContract.room_id = this.selectedRoom.id;
            var context = this;
            createRentContractApi(this.selectedRoomContract).then((result) => {
                this.selectedRoomContract = {};
                if (result.data.code == 0) {
                    context.$notify({
                        group: 'foo',
                        title: '创建合同成功',
                        text: '创建合同成功',
                        type: "success"
                    });
                } else {
                    context.$notify({
                        group: 'foo',
                        title: '创建合同失败',
                        text: '创建合同失败',
                        type: "error"
                    });

                }
            }).catch(function (error) {
                context.$notify({
                    group: 'foo',
                    title: '创建合同失败',
                    text: '创建合同失败',
                    type: "error"
                });
            });

        },
        viewSomeThing(data) {
            this.loading = true
            this.selectedRoom = data;
            this.modelTitle = "修改租赁房屋";
            console.log(data.id);
            this.editMode = true;
            if (data.lat === null || data.lat == "") {
                this.point = {
                    lng: 121.547967,
                    lat: 30.879141
                }
            } else {
                this.point = {
                    lng: data.lon,
                    lat: data.lat
                }
            }
            this.open = true;

            getRentRoomContractListApi({
                room_id: this.selectedRoom.id
            }).then((result) => {
                console.log(result.data.data);
                var latestOne = result.data.data.length;
                if (latestOne == 0) {
                    this.selectedRoomContract = {}
                } else {
                    this.selectedRoomContract = result.data.data[latestOne - 1];
                }
                this.selectedRoomContract = {}
                this.loading = false;
            })
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
            this.editMode = false;
            this.open = true;
            this.selectedRoom = {
                area: "奉贤区"
            };
        },
        toggle() {
            this.open = !this.open;
            this.loading = true;
            console.log(this.editMode);
            if (!this.editMode) {
                createRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms();
                    this.loading = false;
                });
            } else if (this.editMode) {
                updateRentRoomApi(this.selectedRoom).then((result) => {
                    console.log(result);
                    this.refreshRooms();

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
