<template lang="html">
<wl-container>
    <div>
        <div>

            <sui-dimmer :active="loading" inverted>
                <sui-loader content="Loading..." />
            </sui-dimmer>

        </div>

        <sui-grid>
            <sui-grid-row :columns="2">
                <sui-grid-column>
                    <div class="filterBiaoDan">
                    <vue-tree-list :key="componentKey" @click="onClick" @changeName="onChangeName" @delete-node="onDel" @add-node="onAddNode" :model="tree" default-tree-node-name="new node" default-leaf-node-name="new leaf" v-bind:default-expanded="false">
                        <span class="icon" slot="addTreeNodeIcon">📂</span>
                        <span class="icon" slot="addLeafNodeIcon">＋</span>
                        <span class="icon" slot="leafNodeIcon">
                            <sui-icon name="home" /></span>
                        <span class="icon" slot="treeNodeIcon">
                            <sui-icon name="building outline" /></span>
                    </vue-tree-list>
                    </div>
                </sui-grid-column>
                <sui-grid-column>
                    <sui-tab :menu="{ text: true }">
                        <sui-tab-pane title="基本信息" :attached="false">
                            <div>
                                <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="分配列表" :attached="false">
                            <div>
                                <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div :class="props.rowData.status!=99?'center aligned':'' ">
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="领导办公" :attached="false">
                            <div>
                                <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                                    <div slot="name" slot-scope="props">
                                        <div :class="props.rowData.status!=99?'center aligned':'' ">
                                            {{props.rowData.name}}
                                        </div>
                                    </div>
                                    <div slot="action" slot-scope="props">
                                    </div>
                                </vuetable>
                            </div>
                        </sui-tab-pane>
                        <sui-tab-pane title="地图定位" :attached="false">
                        </sui-tab-pane>
                    </sui-tab>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>

        <div class="filterBiaoDan">
            <sui-button content="添加" @click.native="createRoomModel" icon="add green" />
            <!-- <sui-button content="修改" icon="edit yellow" />
        <sui-button content="删除" icon="delete red" /> -->
            <sui-button content="导出" v-on:click="exportToExcel" icon="file green" />
        </div>

        <!-- <div class="wl-gantt-demo">
            <wlGantt :data="data" default-expand-all></wlGantt>
        </div> -->
        <!-- <div class="vue2Table">
            <vuetable ref="vuetable" :api-mode="false" :data="localData" :fields="fields" :sort-order="sortOrder" data-path="data" pagination-path="" @vuetable:pagination-data="onPaginationData">
                <div slot="name" slot-scope="props">
                    <div :class="props.rowData.status!=99?'center aligned':'' ">
                        {{props.rowData.name}}
                    </div>
                </div>
                <div slot="action" slot-scope="props">
                    <sui-button positive content="编辑" v-on:click="openAssignSection(props.rowData)" />
                    <sui-button negative content="删除" v-on:click="deleteRoom(props.rowData)" />
                    <sui-button v-if="props.rowData.status!=99" positive content="查看" v-on:click="viewSomeThing(props.rowData,'check')" />
                        <sui-button v-if="props.rowData.status!=99" content="修改" v-on:click="viewSomeThing(props.rowData,'modify')" />
                        <sui-button v-if="props.rowData.status!=99" content="删除" v-on:click="deleteRoom(props.rowData)" />
                </div>
            </vuetable>
            <div class="pagination ui basic segment grid">
                <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
                <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
            </div>
        </div> -->
        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>
        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header>{{modelTitle}}</sui-modal-header>
                <sui-modal-content>
                    <div>
                        <form-create ref='formComponent' :singleRoom="selectedRoom"></form-create>
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
            <sui-modal class="modal2" v-model="buildingForm.open">
                <sui-modal-content image>
                    <building-form ref='formComponentBuilding'></building-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button negative @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button positive @click.native="createBuilding">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header>{{modelTitle}}</sui-modal-header>
                <sui-modal-content image>
                    <unit-form ref='formComponent'></unit-form>
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
    </div>
    <div>
        <sui-modal class="modal2" v-model="assignList.open">
            <sui-modal-content scrolling>
                <div>

                </div>

            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="toggle">
                    保存
                </sui-button>
                <sui-button negative @click.native="closeModal">
                    取消
                </sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>

</wl-container>
</template>

<script>
import FormCreate from "@/components/unit_basic_info";
import dialogBar from '@/components/MDialog'
import UnitForm from "@/components/unitForm";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FieldsDef from "./FieldsDef.js";
import FieldsDefList from "./FieldsDefList.js";
import BuildingForm from "@/components/buildingForm";
import AssignForm from "@/components/assignForm";
import chanZhengForm from "@/components/chanZhengForm";
import ziChanForm from "@/components/ziChanForm";
import mianjiForm from "@/components/mianjiForm";
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list'
import {
    export_json_to_excel
} from "@/util/Export2Excel";
import {
    getUnitApi,
    createUnitApi,
    updateUnitApi,
    deleteUnitApi
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    components: {
        VueTreeList,
        'dialog-bar': dialogBar,
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        UnitForm,
        FormCreate,
        'zichan-form': ziChanForm,
        'chanzheng-form': chanZhengForm,
        'building-form': BuildingForm,
        'assign-form': AssignForm,
        'mianji-form': mianjiForm
    },
    data() {
        return {
            tree: new Tree([{
                    name: 'Node 1',
                    id: 1,
                    pid: 0,
                    dragDisabled: true,
                    addTreeNodeDisabled: true,
                    addLeafNodeDisabled: true,
                    editNodeDisabled: true,
                    delNodeDisabled: true,
                    children: [{
                        name: 'Node 1-2',
                        id: 1,
                        isLeaf: true,
                        pid: 1
                    },
                    {
                        name: 'Node 1-1',
                        id: 2,
                        isLeaf: true,
                        pid: 1
                    }]
                },
                {
                    name: 'Node 3',
                    id: 4,
                    pid: 0
                }
            ]),
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
            }],
            data: [{
                id: "2",
                name: "租房子"
            }],

            // copied

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
            buildingFloorForm: {
                open: false
            },
            singleBuilding: {},
            buildingImage: {
                open: false
            },
            assignForm: {
                open: false,
                room_id: "",
                roomname: "",
                building_id: null
            },
            selectedBuildingID: null,
            deleteTarget: "",
            loading: true,
            localData: [],
            selectedRoom: {
                roomname: ""
            },
            listField: FieldsDefList,
            fields: FieldsDef,
            assignList: {
                open: false,
                buildings: [],
                selectedBuilding: {},
                selectedFloor: {}
            },
            buildingForm: {
                open: false
            }
        };
    },

    methods: {

        //tree
        onDel(node) {
            console.log(node)
            this.deleteBuilding(node);
        },

        onChangeName(params) {
            console.log(params)
        },

        onAddNode(params) {
            console.log(params)
        },

        onClick(params) {
            console.log(params)
            this.$refs.formComponent.singleRoom = {
                name: params.name,
                enumber: params.enumber
                
            };
            

        },

        addNode() {
            var node = new TreeNode({
                name: 'new node',
                isLeaf: false
            })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
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
            deleteUnitApi(this.deleteTarget).then((result) => {
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
                text: "是否要删除" + data.name + "(" + data.enumber + ")?",
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

            getUnitApi().then((data) => {
                console.log(data);

                var res_data = data.data.data
                var parent_data = []
                var son_data = []
                var filtered_data = []
                for (var i = res_data.length - 1; i >= 0; i--) {
                    if (res_data[i]["parent_id"] == 0)
                        parent_data.push(res_data[i])
                    else
                        son_data.push(res_data[i])
                }
                for (var i = parent_data.length - 1; i >= 0; i--) {
                    var abstract_parent = JSON.parse(JSON.stringify(parent_data[i]))
                    for (var j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == abstract_parent["id"])
                            abstract_parent["enumber"] = parseInt(abstract_parent["enumber"]) + parseInt(son_data[j]["enumber"])
                        abstract_parent["zhengting"] = parseInt(abstract_parent["zhengting"]) + parseInt(son_data[j]["zhengting"])
                        abstract_parent["futing"] = parseInt(abstract_parent["futing"]) + parseInt(son_data[j]["futing"])
                        abstract_parent["zhengchu"] = parseInt(abstract_parent["zhengchu"]) + parseInt(son_data[j]["zhengchu"])
                        abstract_parent["fuchu"] = parseInt(abstract_parent["fuchu"]) + parseInt(son_data[j]["fuchu"])
                        abstract_parent["zhengke"] = parseInt(abstract_parent["zhengke"]) + parseInt(son_data[j]["zhengke"])
                        abstract_parent["fuke"] = parseInt(abstract_parent["fuke"]) + parseInt(son_data[j]["fuke"])
                        abstract_parent["keji"] = parseInt(abstract_parent["keji"]) + parseInt(son_data[j]["keji"])
                    }
                    filtered_data.push(abstract_parent)
                    filtered_data.push(parent_data[i])
                    for (var j = son_data.length - 1; j >= 0; j--) {
                        if (son_data[j]["parent_id"] == parent_data[i]["id"])
                            filtered_data.push(son_data[j])
                    }
                }

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
                    data: filtered_data
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
        // openAssignSection(rowData) {
        //     console.log(this.selectedRoom);
        //     this.selectedRoom = rowData;

        //     this.modalMode = "edit";
        //     // point 
        //     if (rowData.lat === null || rowData.lat == "") {
        //         this.point = {
        //             lng: 121.547967,
        //             lat: 30.879141
        //         }
        //     } else {
        //         this.point = {
        //             lng: rowData.lon,
        //             lat: rowData.lat
        //         }
        //     }
        //     this.loading = true;
        //     this.tree = new Tree([]);
        //     this.assignList.selectedBuilding = false;
        //     this.assignList.selectedFloor = {
        //         url: ""
        //     };
        //     this.loading = false;
        //     this.assignList.open = true;
        // },
        // toggle() {
        //     this.open = !this.open;
        //     this.loading = true;
        //     let formdata = this.$refs.formComponent.singleUnit;

        //     if (this.modalMode == "create") {
        //         createUnitApi(formdata).then((result) => {
        //             console.log(result);
        //             this.loading = false;
        //             this.refreshUnits();

        //         });
        //     } else if (this.modalMode == "edit") {
        //         updateUnitApi(formdata).then((result) => {
        //             console.log(result);
        //             this.loading = false;
        //         });
        //     }

        // },
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
        }

    },
    created() {
        getUnitApi().then((data) => {
            //this.localData = data.data.data;
            
            // tree: new Tree([{
            //         name: 'Node 1',
            //         id: 1,
            //         pid: 0,
            //         dragDisabled: true,
            //         addTreeNodeDisabled: true,
            //         addLeafNodeDisabled: true,
            //         editNodeDisabled: true,
            //         delNodeDisabled: true,
            //         children: [{
            //             name: 'Node 1-2',
            //             id: 1,
            //             isLeaf: true,
            //             pid: 1
            //         },
            //         {
            //             name: 'Node 1-1',
            //             id: 2,
            //             isLeaf: true,
            //             pid: 1
            //         }]
            //     },
            //     {
            //         name: 'Node 3',
            //         id: 4,
            //         pid: 0
            //     }
            // ]),



            console.log(data.data.data)
            var res_data = data.data.data
            var parent_data = []
            var son_data = []
            var filtered_data = []
            console.log(res_data)
            for (var i = res_data.length - 1; i >= 0; i--) {
                if (res_data[i]["parent_id"] == 0)
                    parent_data.push(res_data[i])
                else
                    son_data.push(res_data[i])
            }
            for (var i = parent_data.length - 1; i >= 0; i--) {
                var abstract_parent = JSON.parse(JSON.stringify(parent_data[i]))
                abstract_parent["status"] = 99
                for (var j = son_data.length - 1; j >= 0; j--) {
                    if (son_data[j]["parent_id"] == abstract_parent["id"])
                    abstract_parent["enumber"] = parseInt(abstract_parent["enumber"]) + parseInt(son_data[j]["enumber"])
                    abstract_parent["zhengting"] = parseInt(abstract_parent["zhengting"]) + parseInt(son_data[j]["zhengting"])
                    abstract_parent["futing"] = parseInt(abstract_parent["futing"]) + parseInt(son_data[j]["futing"])
                    abstract_parent["zhengchu"] = parseInt(abstract_parent["zhengchu"]) + parseInt(son_data[j]["zhengchu"])
                    abstract_parent["fuchu"] = parseInt(abstract_parent["fuchu"]) + parseInt(son_data[j]["fuchu"])
                    abstract_parent["zhengke"] = parseInt(abstract_parent["zhengke"]) + parseInt(son_data[j]["zhengke"])
                    abstract_parent["fuke"] = parseInt(abstract_parent["fuke"]) + parseInt(son_data[j]["fuke"])
                    abstract_parent["keji"] = parseInt(abstract_parent["keji"]) + parseInt(son_data[j]["keji"])
                }
                filtered_data.push(abstract_parent)
                filtered_data.push(parent_data[i])
                for (var j = son_data.length - 1; j >= 0; j--) {
                    if (son_data[j]["parent_id"] == parent_data[i]["id"])
                        filtered_data.push(son_data[j])
                }
            }
            console.log(filtered_data)
            var tree_list = []
            for (var i=0; i < filtered_data.length; i++){
                if (filtered_data[i]["status"] == 99){
                    var paraent_node = {}
                    paraent_node["name"] = filtered_data[i]["name"]
                    paraent_node["id"] = filtered_data[i]["id"]
                    paraent_node["children"] = []
                    tree_list.push(paraent_node)
                }
                else{
                    var children_node = {}
                    children_node["id"] = filtered_data[i]["id"]
                    children_node["name"] = filtered_data[i]["name"]
                    children_node["enumber"] = filtered_data[i]["enumber"]
                    children_node["zhengting"] = filtered_data[i]["zhengting"]
                    children_node["futing"] = filtered_data[i]["futing"]
                    children_node["zhengchu"] = filtered_data[i]["zhengchu"]
                    children_node["fuchu"] = filtered_data[i]["fuchu"]
                    children_node["zhengke"] = filtered_data[i]["zhengke"]
                    children_node["fuke"] = filtered_data[i]["fuke"]
                    children_node["keji"] = filtered_data[i]["keji"]
                    children_node["isLeaf"] = true
                    tree_list[tree_list.length-1]["children"].push(children_node)
                }
            }
            console.log(tree_list)
            this.tree = new Tree(tree_list)








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
                data: filtered_data
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

.map {
    width: 100%;
    height: 400px;
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
