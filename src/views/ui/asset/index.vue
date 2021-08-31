x   <template lang="html">
<wl-container>
    <div>
        <div>
            <sui-dimmer :active="loading" inverted>
                <sui-loader content="正在加载" />
            </sui-dimmer>
        </div>
        <div class="filterBiaoDan" style="padding-left:15px;margin:0;">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="12">
                        <sui-form>
                            <sui-form-fields inline>
                                <!-- <sui-form-field>
                                    <sui-dropdown placeholder="房屋类型" selection :options="options" v-model="filterString.kind" />
                                </sui-form-field> -->
                                <sui-form-field>
                                    <input type="text" placeholder="政策文件" v-model="filterString.name" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="查询" @click.prevent="onSearch" />
                            </sui-form-fields>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:0">
                        <div style="float:right;">
                            <sui-button basic color="blue" content="新建" @click.native="createRoomModel" icon="add blue" />
                            <!-- <sui-button content="修改" icon="edit yellow" />
                 <sui-button content="删除" icon="delete red" /> -->
                            <sui-button basic color="green" content="导出" v-on:click="exportToExcel" icon="file green" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <div>

            <div>
                <vue-good-table :columns="columns" :rows="localData" :sort-options="{enabled: true, initialSortBy: {field: 'CREATED_AT', type: 'desc'}}" :pagination-options="paginationOptions">
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'action'">
                            <span>
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                                    查看文件
                                </el-button>
                                <el-button @click.native.prevent="tagDialogVisible = true" type="text" size="small">
                                    标签
                                </el-button>
                                <el-button @click.native.prevent="changePolicy(props.row)" type="text" size="small">
                                    修改
                                </el-button>
                                <el-button @click.native.prevent="deletePolicy(props.row)" type="text" size="small">
                                    删除
                                </el-button>
                            </span>
                        </span>
                        <span v-if="props.column.field == 'TAGS'">
                            <el-tag>Tag 1</el-tag>
                            <el-tag>Tag 1</el-tag>
                        </span>
                        <span v-else>
                            {{props.formattedRow[props.column.field]}}
                        </span>
                    </template>

                </vue-good-table>
            </div>
            <!-- <el-table :data="localData" style="width: 100%">
                <el-table-column prop="POLICY_ID" label="政策id" width="180">
                </el-table-column>
                <el-table-column prop="POLICY_TITLE" label="政策标题" width="180">
                </el-table-column>
                <el-table-column prop="POLICY_URL" label="政策文件">
                </el-table-column>
                <el-table-column prop="CREATED_AT" label="创建时间">
                </el-table-column>
                <el-table-column prop="UPDATED_AT" label="更新时间">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            查看文件
                        </el-button>
                        <el-button @click.native.prevent="changePolicy(scope.row)" type="text" size="small">
                            修改
                        </el-button>
                        <el-button @click.native.prevent="deletePolicy(scope.row)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </div>

        <el-dialog title="标签" :visible.sync="tagDialogVisible" width="90%" :before-close="handleClose">
            <el-container style="height: 500px; border: 1px solid #eee">
                <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>Navigator One</span>
                            </template>
                            <el-menu-item-group title="Group One">
                                <el-menu-item index="1-1">item one</el-menu-item>
                                <el-menu-item index="1-2">item one</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="Group Two">
                                <el-menu-item index="1-3">item three</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">item four</template>
                                <el-menu-item index="1-4-1">item one</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span>Navigator Two</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span>Navigator Three</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span>Navigator Four</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-container>
                    <el-header style="text-align: right; font-size: 12px">
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span>Tom</span>
                    </el-header>

                    <el-main>
                        <el-table :data="tableData">
                            <el-table-column prop="date" label="Date" width="140">
                            </el-table-column>
                            <el-table-column prop="name" label="Name" width="120">
                            </el-table-column>
                            <el-table-column prop="address" label="Address">
                            </el-table-column>
                        </el-table>
                    </el-main>
                </el-container>
            </el-container>

            <span slot="footer" class="dialog-footer">
                <el-button @click="tagDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="tagDialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog>

        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">{{modelTitle}}</sui-modal-header>
                <sui-modal-content>
                    <sui-segment>
                        <policy-form :singleRoom="selectedPolicy"></policy-form>
                    </sui-segment>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModal">
                        取消
                    </sui-button>
                    <sui-button v-if="modalMode !== 'check'" basic color="blue" @click.native="toggle">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
        <div>
            <sui-modal v-model="exportData.open" class="modal2">
                <sui-modal-header style="border-bottom:0;">导出选择</sui-modal-header>
                <sui-modal-content scrolling>
                    <export-form :filterString="filterString" :singleRoom="filterString" ref='FormExport' mode1="room"></export-form>
                </sui-modal-content>
                <sui-modal-actions>
                    <sui-button basic color="red" @click.native="closeModalExport">
                        取消
                    </sui-button>
                    <sui-button basic color="blue" @click.native="openExportUrl">
                        提交
                    </sui-button>
                </sui-modal-actions>
            </sui-modal>
        </div>
    </div>
</wl-container>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import {
    VueGoodTable
} from "vue-good-table";
import dialogBar from "@/components/MDialog";
import {
    formatDate
} from "@/util/time";
import FieldsDef from "./FieldsDef.js";
import FieldsDefList from "./FieldsDefList.js";
import FieldsUnit from "./FieldsUnit.js";
import ExportForm from "@/components/export_form";
import policyForm from "@/components/policyForm";
import constants from "@/util/constants";
//import Pagination from 'vue-pagination-2';

import global from "@/global/index";
import {
    localGet
} from "@/util/storage"; // 导入存储函数

import {
    notifySomething,
    //  goToLogin
} from "@/util/utils";
import {
    getPolicysApi,
    //getRoomDataApi,
    updatePolicyApi,
    postPolicyApi,
    deletePolicyApi,
    //createRoomApi,
} from "@/api/roomDataAPI";
export default {
    name: "MyVuetable",
    props: ["kind"],
    components: {
        //  Pagination,
        VueGoodTable,
        "dialog-bar": dialogBar,
        "policy-form": policyForm,
        "export-form": ExportForm,
    },
    data() {
        const item = {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        };
        return {
            tableData: Array(20).fill(item),
            tagDialogVisible: true,
            paginationOptions: {
                enabled: true,
                nextLabel: "下一页",
                prevLabel: "上一页",
                rowsPerPageLabel: "每页条目",
                perPage: 10,
            },
            /**test 
                   * 
                   * 
                   * <el-table :data="localData" style="width: 100%">
                      <el-table-column prop="POLICY_ID" label="政策id" width="180">
                      </el-table-column>
                      <el-table-column prop="POLICY_TITLE" label="政策标题" width="180">
                      </el-table-column>
                      <el-table-column prop="POLICY_URL" label="政策文件">
                      </el-table-column>
                      <el-table-column prop="CREATED_AT" label="创建时间">
                      </el-table-column>
                      <el-table-column prop="UPDATED_AT" label="更新时间">
                      </el-table-column>
                   */

            columns: [{
                    label: "政策标题",
                    field: "POLICY_TITLE",
                    sortable: false,
                },
                {
                    label: "标签",
                    field: "TAGS",
                    sortable: false,

                    //  type: 'date',
                },
                {
                    label: "创建时间",
                    field: "CREATED_AT",
                    //  type: 'date',
                },
                {
                    label: "更新时间",
                    field: "UPDATED_AT",
                    sortable: false,
                    //  type: 'percentage',
                },
                {
                    label: "操作",
                    field: "action",
                    sortable: false,
                    //  type: 'percentage',
                },
            ],

            page: 0,
            componentAssignListkey: 1,
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            exportData: {
                open: false,
                kind: "0",
            },
            filterString: {
                jiadi: "",
                diji: "",
                kind: 1,
                page: 1,
            },
            selectedPolicy: {},
            buildingImage: {
                open: false,
                notification: "",
            },
            deleteTarget: "",
            loading: true,
            localData: [],
            ComponentKey: 1,
            listField: FieldsDefList,
            fields: FieldsDef,
            fieldsUnit: FieldsUnit,
            imgeComponentKey: 1,
            buildingForm: {
                open: false,
            },
        };
    },

    //     juji: data.assign.juji,
    // fujuji: data.assign.fujuji,
    // chuji: data.assign.chuji,
    // fuchuji: data.assign.fuchuji,
    // keji: data.assign.keji,
    // fukeji: data.assign.fukeji,
    // keyuan: data.assign.keyuan,
    // qita: data.assign.qita,
    // roomname: data.assign.roomname,
    // beizhu: data.assign.beizhu,
    // roomnumber: data.assign.roomnumber

    methods: {
        onSearch() {
            var payload = {
                name: this.filterString.name,
                page: 1,
            };
            if (this.filterString.kind) {
                payload.kind = this.filterString.kind;
            }
            this.refreshRooms(payload);
        },

        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.type == "policy") {
                this.deleteTarget.POLICY_ID = this.deleteTarget.id;
                deletePolicyApi(this.deleteTarget).then((result) => {
                    if (result.data == constants.OK) {
                        this.refreshRooms({
                            page: 1,
                            kind: 1,
                        });
                        notifySomething(
                            "删除政策成功",
                            "删除政策成功",
                            constants.typeSuccess
                        );
                    } else if (result.data.code == 3) {
                        notifySomething(
                            constants.GENERALERROR,
                            "删除政策失败",
                            constants.typeError
                        );
                    }
                    this.loading = false;
                });
            }
        },
        exportToExcel() {
            this.exportData.open = true;
        },
        openExportUrl() {
            let local_auth = localGet(global.project_key, true);
            console.log(local_auth);
            if (this.$refs.FormExport.toDataList.length == 0) {
                if (this.$refs.FormExport.filterString.kind == 0) {
                    window.open(constants.exportroom + "?token=" + local_auth);
                } else {
                    window.open(
                        constants.exportroom +
                        "?token=" +
                        local_auth +
                        "&kind=" +
                        this.$refs.FormExport.filterString.kind
                    );
                }
            } else {
                var idlist = this.$refs.FormExport.toDataList.toString();
                window.open(
                    constants.exportroom +
                    "?token=" +
                    local_auth +
                    "&kind=" +
                    this.$refs.FormExport.filterString.kind +
                    "&idlist=" +
                    "[" +
                    idlist +
                    "]"
                );
            }
            this.closeModalExport();
        },
        closeModalExport() {
            this.$refs.FormExport.toData = [];
            this.$refs.FormExport.fromData = [];
            this.exportData.open = false;
        },
        deletePolicy(data) {
            this.sendVal = true;
            console.log(data);
            this.deleteTarget = {
                text: "是否要删除" + data.POLICY_TITLE + "(ID: " + data.POLICY_ID + ")?",
                id: data.POLICY_ID,
                type: "policy",
            };
        },
        refreshRooms(payload) {
            this.loading = true;
            console.log(payload);
            payload = [];
            getPolicysApi()
                .then((data) => {
                    this.localData = data.data;
                    console.log(this.localData);
                    this.loading = false;
                    this.localData.map((one) => {
                        one.CREATED_AT = formatDate(new Date(one.CREATED_AT));
                        one.UPDATED_AT = formatDate(new Date(one.UPDATED_AT));
                    });
                    //this.localData = data.data.data;
                    // if (data.data.code == 0) {
                    //     this.loading = false;
                    //     this.localData = data.data.data
                    //     this.localData.data.map((one) => {
                    //         one.owner = parseInt(one.owner);
                    //         one.zhuguandanwei = parseInt(one.zhuguandanwei);
                    //         switch (one.kind) {
                    //             case 2:
                    //                 one.kindText = "经营性"
                    //                 one.kindShow = true;
                    //                 break;
                    //             case 1:
                    //                 one.kindText = "办公性"
                    //                 one.kindShow = false;
                    //                 break;

                    //             default:
                    //                 break;
                    //         }

                    //     })
                    // } else if (data.data.code == 2) {
                    //     notifySomething("重复登陆 请重新登陆", constants.GENERALERROR, constants.typeError);
                    //     goToLogin();
                    //     this.$router.push("/login");
                    // }
                })
                .catch(function () {
                    this.loading = false;
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                });
        },
        // assignRentRoom(rowData){
        //     console.log(rowData);
        // },

        // open emodify room
        changePolicy(data) {
            console.log(data);
            // eslint-disable-next-line no-prototype-builtins
            if (
                // eslint-disable-next-line no-prototype-builtins
                data.hasOwnProperty("vgt_id") || data.hasOwnProperty("originalIndex")
            ) {
                delete data.vgt_id;
                delete data.originalIndex;
            }
            this.selectedPolicy = data;
            this.modelTitle = "修改政策";
            this.modalMode = "edit";
            this.open = true;
        },

        //open create
        createRoomModel() {
            // show create Model
            this.modelTitle = "上传政策";
            this.modalMode = "create";
            this.open = true;
            this.selectedPolicy = {
                POLICY_ID: "",
                POLICY_TITLE: "",
                CDATA: "",
            };
        },
        toggle() {
            this.loading = true;
            var context = this;
            //kind=1 means 自由房屋创建和编辑
            if (this.modalMode == "create") {
                this.selectedPolicy.CREATED_AT = new Date();
                this.selectedPolicy.UPDATED_AT = new Date();
                this.selectedPolicy.POLICY_URL = " ";
                this.selectedPolicy.USER_USER_ID = "2200";
                postPolicyApi(this.selectedPolicy)
                    .then((result) => {
                        context.loading = false;
                        if (result.data == constants.OK) {
                            this.closeModal();
                            notifySomething(
                                "政策上传成功",
                                "政策上传成功",
                                constants.typeSuccess
                            );
                        } else {
                            notifySomething(
                                constants.GENERALERROR,
                                constants.GENERALERROR,
                                constants.typeError
                            );
                        }
                    })
                    .catch(function () {
                        context.loading = false;
                        notifySomething(
                            constants.GENERALERROR,
                            constants.GENERALERROR,
                            constants.typeError
                        );
                    });
            } else if (this.modalMode == "edit") {
                //upate Policy APi
                updatePolicyApi(this.selectedPolicy)
                    .then((result) => {
                        if (result.data == constants.OK) {
                            this.closeModal();
                            this.$notify({
                                group: "foo",
                                title: "更新政策成功",
                                text: "更新政策成功",
                                type: "success",
                            });
                        } else if (result.data.code == 3) {
                            notifySomething(
                                "更新政策失败",
                                "该房屋已有分配房间，无法更改房屋性质",
                                "error"
                            );
                        } else {
                            notifySomething("更新自有房屋失败", "更新自有房屋失败", "error");
                        }
                        this.loading = false;
                    })
                    .catch(function (err) {
                        console.log(err);
                        context.loading = false;
                        notifySomething(
                            constants.GENERALERROR,
                            constants.GENERALERROR,
                            constants.typeError
                        );
                    });
            }
        },

        closeModal: function () {
            this.open = false;
            // /this.assignForm.open = false;
            //this.buildingForm.open = false;
            //  this.buildingFloorForm.open = false;
            //    this.buildingImage.open = false;
            //this.assignList.open = false;
            var payload = {
                name: this.filterString.name,
                page: 1,
            };
            if (this.filterString.kind) {
                payload.kind = this.filterString.kind;
            }
            this.refreshRooms(payload);
        },
    },

    created() {
        this.refreshRooms({
            page: 1,
            kind: 1,
        });
    },
};
</script>

<style>
.ui.positive.button {
    background-color: #75adbf !important;
}

.imageForm {
    display: block;
    width: 100%;
}

.wl-viewer {
    height: 90%;
    width: 90%;
    margin: 4% auto 0;
}

.imageModal {
    height: 500px;
}

.ui.modal {
    top: auto;
    left: auto;
    height: auto !important;
    max-height: 900px !important;
}

.ui.modal>.actions {
    background: rgb(249, 250, 251);
    border-bottom-left-radius: 0.285714rem;
    border-bottom-right-radius: 0.285714rem;
    padding: 1rem;
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    text-align: center;
}

.ui.modal .content {
    padding: 15px;
    box-sizing: border-box;
    max-height: none !important;
}

.ui.table {
    font-size: 13px;
}

.louBackground {
    background-size: cover;
    background-image: url("../../../../public/lou.png");
}

.ui.table thead th {
    cursor: auto;
    background: #f5f7fa;
    text-align: inherit;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.92857143em 0.78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 500;
    text-transform: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    border-left: none;
}

.ui.blue.table {
    border-top: 0px !important;
}

.filterBiaoDan {
    margin: 0 0 15px 0;
}

.buttonBuildingFloor {
    margin: 10px;
}

.pagination {
    margin-top: 1rem;
}

.modalStep {
    /* height: 500px; */
}

.tabNew {
    margin-left: 20px;
    margin-right: 20px;
}

.vuetable-head-wrapper table.vuetable th.sortable {
    cursor: pointer;
}

.ui.text.menu {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 1000;
    color: black;
}

.thTextcenter {
    text-align: center !important;
    border-bottom: 0px !important;
}

.ui.text.menu .active.item {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 1000;
    color: #75adbf;
}

.yello {
    background-color: #e6a23c;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.purple {
    background-color: purple;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.redBand {
    background-color: red;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.yewuyongfang {
    background-color: blue;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.lvse {
    background-color: rgb(0, 255, 200);
    width: 10px;
    height: 10px;
    display: inline-block;
}

.baise {
    background-color: white;
    border: 1px;
    height: 10px;
    display: inline-block;
    width: 10px;
    border-color: black;
    border-style: solid;
}

.reversed {
    background-color: rgb(10, 10, 10);
    width: 10px;
    height: 10px;
    display: inline-block;
}

.displayInline {
    display: inline;
}

.buttonblueFun {
    margin-top: 20px !important;
    font-size: 10px !important;
}

.hiddenUpload {
    box-shadow: 0 0 0 1px #1678c2 inset !important;
    color: #1678c2 !important;
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    outline: 0;
    border: none;
    vertical-align: baseline;
    background: #e0e1e2 none;
    font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
    margin: 0 0.25em 0 0;
    padding: 0.78571429em 1.5em 0.78571429em;
    text-transform: none;
    text-shadow: none;
    font-weight: 700;
    line-height: 1em;
    font-style: normal;
    text-align: center;
    text-decoration: none;
}

.ui.modal .scrolling.content {
    overflow: auto;
    max-height: 500px !important;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
