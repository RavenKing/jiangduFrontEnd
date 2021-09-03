/* eslint-disable vue/html-indent */ /* eslint-disable vue/html-indent */
<template lang="html">
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
                                <sui-form-field>
                                    <input v-model="filterString.name" type="text" placeholder="搜索" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="查询" @click.prevent="onSearch" />
                            </sui-form-fields>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:10px">
                        <div style="float:right;">
                            <sui-button basic color="blue" content="新建" icon="add blue" @click.native="createRoomModel" />
                            <sui-button basic color="green" content="导出" icon="file green" @click="exportToExcel" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>

        <div>
            <div>
                <vue-good-table :columns="columns" :rows="showData" :pagination-options="paginationOptions">
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'action'">
                            <span>
                                <el-button type="text" size="small" @click.native.prevent="changeTag(props.row)">
                                    修改
                                </el-button>
                                <el-button type="text" size="small" @click.native.prevent="deleteTag(props.row)">
                                    删除
                                </el-button>
                            </span>
                        </span>
                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>

        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" danger-text="确认删除" @cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" />

        <div>
            <sui-modal v-model="open" class="modal2">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">
                    {{ modelTitle }}
                </sui-modal-header>
                <sui-modal-content>
                    <sui-segment>
                        <blackList-form :single-room="balckListItem" />
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
                <sui-modal-header style="border-bottom:0;">
                    导出选择
                </sui-modal-header>
                <sui-modal-content scrolling>
                    <export-form ref="FormExport" :filter-string="filterString" :single-room="filterString" mode1="room" />
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
import blackListForm from "@/components/blackListForm";
import constants from "@/util/constants";
import global from "@/global/index";
import {
    localGet,
} from "@/util/storage"; // 导入存储函数
import {
    notifySomething,
} from "@/util/utils";
import {
    updateBlackListApi,
    getUserApi,
} from "@/api/roomDataAPI";

export default {
    name: "blackListPage",
    components: {
        VueGoodTable,
        "dialog-bar": dialogBar,
        "blackList-form": blackListForm,
        "export-form": ExportForm,
    },
    props: ["kind"],
    data() {
        return {
            paginationOptions: {
                enabled: true,
                nextLabel: "下一页",
                prevLabel: "上一页",
                rowsPerPageLabel: "每页条目",
                perPage: 10,
            },

            columns: [{
                    label: "企业名称",
                    field: "COMPANY_NAME",
                    sortable: false,
                },
                {
                    label: "分类",
                    field: "STATUS",
                    sortable: false,
                },
                {
                    label: "评论",
                    field: "COMMENTS",
                    sortable: false,
                },

                {
                    label: "操作",
                    field: "action",
                    sortable: false,
                },
            ],
            page: 0,
            options: [{
                    text: "办公性",
                    value: 1,
                },
                {
                    text: "经营性",
                    value: 2,
                },
            ],
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
            balckListItem: {},
            buildingImage: {
                open: false,
                notification: "",
            },
            deleteTarget: "",
            loading: true,
            localData: [],
            showData: [],
            selectedRoom: {
                roomname: "",
                area: "奉贤区",
            },
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

    created() {
        this.refreshRooms({
            page: 1,
            kind: 1,
        });
    },

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
            this.deleteTarget.COMMENTS = "";
            this.deleteTarget.STATUS = "";
            updateBlackListApi(this.deleteTarget).then((result) => {
                if (result.data == constants.OK) {
                    this.refreshRooms({
                        page: 1,
                        kind: 1,
                    });
                    notifySomething(
                        "删除标签成功",
                        "删除标签成功",
                        constants.typeSuccess
                    );
                } else if (result.data.code == 3) {
                    notifySomething(
                        constants.GENERALERROR,
                        "删除标签失败",
                        constants.typeError
                    );
                }
                this.loading = false;
            });
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
        deleteTag(data) {
            this.sendVal = true;
            console.log(data);
            this.deleteTarget = {
                text: "是否要将" + data.COMPANY_NAME + "从" + data.STATUS + "列表删除?",
                USER_ID: data.USER_ID,
            };
        },
        refreshRooms(payload) {
            this.loading = true;
            console.log(payload);
            payload = [];
            getUserApi()
                .then((data) => {
                    this.localData = data.data;
                    console.log(this.localData);
                    this.loading = false;
                    this.localData.map((one) => {
                        one.CREATED_AT = formatDate(new Date(one.CREATED_AT));
                        one.UPDATED_AT = formatDate(new Date(one.UPDATED_AT));
                    });
                    this.showData = [];
                    this.localData.forEach(element => {
                        if (element.STATUS != null && element.STATUS != "") {
                            this.showData.push(element);
                        }
                    });
                    console.log(showData);
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

        // open emodify room
        changeTag(data) {
            console.log(data);
            if (
                // eslint-disable-next-line no-prototype-builtins
                data.hasOwnProperty("vgt_id") ||
                data.hasOwnProperty("originalIndex")
            ) {
                delete data.vgt_id;
                delete data.originalIndex;
            }
            this.balckListItem = data;
            this.modelTitle = "修改黑/白名单";
            this.modalMode = "edit";
            this.open = true;
        },

        //open create
        createRoomModel() {
            // show create Model
            this.modelTitle = "添加黑/白名单";
            this.modalMode = "create";
            this.open = true;
            this.balckListItem = {
                "USER_ID": "",
                "COMMENTS": "",
                "STATUS": ""
            };
            this.selectedRoom = {
                room_id: "",
                certid: "",
                owner: "",
                address: "",
                roomname: "",
                usage: "",
                space: "0",
                optional: "",
                age: "2000",
                built_date: "",
                origin_value: "",
                room_value: "",
                dep: "",
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: "",
                area: "奉贤区",
                usage1: "1",
                rawspace: 0,
            };
        },
        toggle() {
            this.loading = true;
            let formdata = this.selectedRoom;
            if (formdata.space == "") {
                formdata.space = null;
            }
            if (formdata.usage == "") {
                formdata.usage = null;
            }
            var context = this;
            if (this.modalMode == "create") {
                this.balckListItem.CREATED_AT = new Date();
                this.balckListItem.UPDATED_AT = new Date();
                this.balckListItem.USER_ID_USER_ID = "2200";
                updateBlackListApi(this.balckListItem)
                    .then((result) => {
                        context.loading = false;
                        if (result.data == constants.OK) {
                            this.closeModal();
                            notifySomething(
                                "标签上传成功",
                                "标签上传成功",
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
                updateBlackListApi(this.balckListItem)
                    .then((result) => {
                        if (result.data == constants.OK) {
                            this.closeModal();
                            this.$notify({
                                group: "foo",
                                title: "更新成功",
                                text: "更新成功",
                                type: "success",
                            });
                        } else {
                            notifySomething("更新失败", "更新失败", "error");
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
</style>
