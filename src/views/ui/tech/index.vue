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
                                    <input type="text" placeholder="专利文件" v-model="filterString.name" />
                                </sui-form-field>
                                <sui-button basic color="blue" content="查询" @click.prevent="onSearch" />
                            </sui-form-fields>
                        </sui-form>
                    </sui-grid-column>
                    <sui-grid-column :width="4" style="padding-right:0">
                        <div style="float:right;">
                            <sui-button basic color="blue" content="新建" @click.native="createRoomModel" icon="add blue" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>
        <div>
            <div>
                <vue-good-table :columns="columns" :rows="localData" :sort-options="{
              enabled: true,
              initialSortBy: { field: 'CREATED_AT', type: 'desc' },
            }" :pagination-options="paginationOptions">
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'action'">
                            <span>
                                <el-button @click.native.prevent="recommendList(props.row)" type="text" size="small">
                                    推荐
                                </el-button>
                                <el-button @click.native.prevent="openTagDialog(props.row)" type="text" size="small">
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
                            <div class="tag-group">
                                <el-tag class="tag" v-for="item in props.row.tags" :key="item.TAG_NAME" type="warning" effect="dark">
                                    {{ item.TAG_NAME }}
                                </el-tag>
                            </div>
                        </span>
                        <span v-else>
                            {{ props.formattedRow[props.column.field] }}
                        </span>
                    </template>
                </vue-good-table>
            </div>
        </div>
        <el-dialog title="公司列表" :visible.sync="dialogTableVisible">
            <el-row v-show="!showReview">
                <el-col :span="12">
                    推荐列表
                    <div class="grid-content bg-purple">
                        <el-table max-height="500px" :data="recommendDataList.data" ref="multipleTableRecommend" style="width: 100%" @selection-change="handleSelectionChangeR">
                            <el-table-column property="selected" type="selection" width="55"> </el-table-column>
                            <el-table-column property="COMPANY_NAME" label="公司名称" width="200"></el-table-column>
                            <el-table-column property="SORT" label="推荐指数" width="200"><template slot-scope="scope">
                                    <el-rate v-model="scope.row.SORT" disabled show-score text-color="#ff9900" score-template="{value} 分">
                                    </el-rate>
                                </template></el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="6">
                    公司列表
                    <div class="grid-content bg-purple-light">
                        <div class="grid-content bg-purple">
                            <el-input v-model="item" size="mini" placeholder="Type to search" @input="handleSearch" />
                            <el-table max-height="500px" @filter-change="filterChange" :data="companySelect" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55"> </el-table-column>
                                <el-table-column property="COMPANY_NAME" label="公司名称" width="200"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        常用公司列表
                        <div class="grid-content bg-purple">
                            <el-table max-height="500px" @filter-change="filterChange" :data="offenUsedCompanys" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChangeH">
                                <el-table-column type="selection" width="55"> </el-table-column>
                                <el-table-column property="COMPANY_NAME" label="公司名称" width="200"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div v-show="showReview">
                <el-table :data="recommendReviewList" style="width: 100%">
                    <el-table-column property="COMPANY_NAME" label="公司名称" width="200"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取消</el-button>
                <el-button type="primary" @click="showReviewTable" v-show="!showReview">reiew</el-button>
                <el-button type="primary" @click="notifyCompany" v-show="showReview" :disabled="recommendReviewList.length==0">推送</el-button>
                <el-button type="primary" @click="prevNotify" v-show="showReview">上一步</el-button>
            </span>
        </el-dialog>

        <el-dialog title="标签" :visible.sync="tagDialogVisible" width="90%" :before-close="refreshRooms">
            <el-steps :active="active">
                <el-step title="大行业"></el-step>
                <el-step title="小行业"></el-step>
                <el-step title="其他"></el-step>
            </el-steps>
            <el-button style="margin-top: 12px; margin-bottom: 12px" @click="next">下一步</el-button>
            <div class="tag-group">
                <span class="tag-group__title" style="font-size: 25px;">已打标签</span>
                <div style>
                    <el-tag class="tableTag" v-for="(item,index) in showItems1" :key="item.TAG_ID" :type="tagType" effect="dark" closable @close="deleteTag(item,index)">
                        {{ item.TAG_NAME }}
                    </el-tag>
                </div>
            </div>
            <div class="tag-group">
                <span class="tag-group__title" style="font-size: 25px;">标签列表</span>
                <div style>
                    <el-tag class="tableTag" v-for="(item,index) in showItems2" :key="item.TAG_ID" :type="tagType" effect="dark" @click="addTag(item,index)">
                        {{ item.TAG_NAME }}
                    </el-tag>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="tagDialogVisible = false">取消</el-button>
            </span>
        </el-dialog>

        <dialog-bar v-model="sendVal" type="danger" title="是否要删除" :content="deleteTarget.text" v-on:cancel="clickCancel()" @danger="clickConfirmDelete()" @confirm="clickConfirmDelete()" dangerText="确认删除"></dialog-bar>

        <div>
            <sui-modal class="modal2" v-model="open">
                <sui-modal-header style="border-bottom:0; margin-bottom:-15px;">{{
            modelTitle
          }}</sui-modal-header>
                <sui-modal-content>
                    <sui-segment>
                        <tech-form :singleRoom="selectedPolicy"></tech-form>
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
import techform from "@/components/techform";
import constants from "@/util/constants";

import {
    notifySomething,
    //  goToLogin
} from "@/util/utils";
import {

    queryTagsApi,
    //getRoomDataApi,
    getCompanysApi,
    postRecommendListApi,
    getHistoricalApi,
    //getTechApi

    //createRoomApi,
} from "@/api/roomDataAPI";

import {
    getRecommendTECHCompanysApi
} from "@/api/recommendApi"
import {
    getTechApi,
    deleteTechTagApi,
    updateTechApi,
    postTechApi,
    deleteTechApi,
    addTechTagApi,
    getTechTagApi
} from "@/api/techApi.js";
export default {
    name: "policyVue",
    props: ["kind"],
    components: {
        //  Pagination,
        //"model-select": ModelSelect,
        VueGoodTable,
        "dialog-bar": dialogBar,
        "tech-form": techform,
    },
    data() {
        return {
            recommendDataList: [],
            tagItems: [],
            item: "",
            // 展示某种类型的selected tag
            showItems1: [],
            // 展示某种类型的unselected tag
            showItems2: [],
            tagType: "success",
            active: 1,
            tagDialogVisible: false,
            paginationOptions: {
                enabled: true,
                nextLabel: "下一页",
                prevLabel: "上一页",
                rowsPerPageLabel: "每页条目",
                perPage: 10,
            },
            columns: [{
                    label: "专利名",
                    field: "NAME",
                    sortable: false,
                },
                {
                    label: "专利申请国家",
                    field: "PATENT_APPLICATION_COUNTRY",
                    sortable: false,
                    //  type: 'date',
                },
                {
                    label: "类型",
                    field: "TYPE",
                    sortable: false,
                    //  type: 'date',
                },
                {
                    label: "状态",
                    field: "STATUS",
                    sortable: false,
                    //  type: 'date',
                },
                {
                    label: "设备数目",
                    field: "ASSET_COUNT",
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
            companySelect: [],
            page: 0,
            sendVal: false,
            modelTitle: "",
            modalMode: "create",
            open: false,
            filterString: {
                name: ""
            },
            selectedPolicy: {
                tags: []
            },
            tagControl:{
                tag1:"industry",
                tag2:"cap"
            },
            offenUsedCompanys: [],
            dialogTableVisible: false,
            multipleSelection: [],
            multipleSelectionR: [],
            multipleSelectionH: [],
            deleteTarget: "",
            loading: true,
            companyList: [],
            localData: [],
            showReview: false,
            recommendReviewList: [],
            docType: "FI"

        };
    },
    methods: {
        getUniqueArray(arr, keyProps) {
            return Object.values(
                arr.reduce((uniqueMap, entry) => {
                    const key = keyProps.map((k) => entry[k]).join('|')
                    if (!(key in uniqueMap)) uniqueMap[key] = entry
                    return uniqueMap
                }, {}),
            )
        },
        handleSearch() {
            this.companySelect = this.companyList.filter(data => data.COMPANY_NAME.includes(this.item))
        },

        filterChange() {

            console.log("change")
        },
        prevNotify() {
            //   this.$refs.multipleTable.toggleRowSelection(this.recommendReviewList, true);
            this.showReview = false
            //            this.$refs.multipleTable.toggleRowSelection(this.recommendReviewList,true);
        },
        handleOnInput(data) {
            console.log(data)
        },
        notifyCompany() {
            var payload = [];
            if (this.recommendReviewList.length > 0) {
                this.recommendReviewList.map((one) => {
                    payload.push({
                        "USER_ID": one.USER_ID /*USER_ID <NVARCHAR(36)>*/ ,
                        "RECOMMENDED_ID": this.selectedPolicy.TECH_ID /*RECOMMENDED_ID <NVARCHAR(36)>*/ ,
                        "TYPE": this.docType /*TYPE <NVARCHAR(2)>*/ ,
                        "STATUS": false /*STATUS <BOOLEAN>*/ ,
                        "COMMENT": " " /*COMMENT <NVARCHAR(500)>*/ ,
                        "CREATED_AT": new Date() /*CREATED_AT <TIMESTAMP>*/ ,
                        "UPDATED_AT": new Date() /*UPDATED_AT <TIMESTAMP>*/
                    })
                })
                postRecommendListApi(payload).then((result) => {
                    if (result.data == constants.OK) {
                        this.dialogTableVisible = false;
                        notifySomething(constants.notifyCompany, constants.notifyCompany, constants.typeSuccess);
                    }
                })
            }
        },

        showReviewTable() {
            this.recommendReviewList = this.multipleSelectionR.concat(this.multipleSelection);
            this.recommendReviewList = this.recommendReviewList.concat(this.multipleSelectionH);
            this.recommendReviewList = this.getUniqueArray(this.recommendReviewList, ["USER_ID"])
            this.showReview = true;
        },
        handleSelectionChangeH(val) {
            this.multipleSelectionH = val;
        },
        handleSelectionChangeR(val) {
            this.multipleSelectionR = val;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        recommendList(data) {
            // console.log(data.TECH_ID);
            this.loading = true;
            this.selectedPolicy = data;
            this.recommendReviewList = []
            this.showReview = false;
            getHistoricalApi().then((company) => {
                this.offenUsedCompanys = company.data;
            })
            getCompanysApi().then((result1) => {
                this.companyList = result1.data;
                this.companyList.map(one => {
                    one.selected = true;
                    this.companySelect = this.companyList;
                })
                getRecommendTECHCompanysApi(data).then((result) => {
                    this.loading = false;
                    this.recommendDataList = result.data;
                    this.recommendDataList.data.map(one => one.SORT = (parseFloat(one.SORT).toFixed(2) * 10).toFixed(2))
                    this.dialogTableVisible = true;
                })
            })

        },

        addTag(data, index) {
            const payload = {
                TECH_ID_TECH_ID: this.selectedPolicy.TECH_ID,
                TAG_ID_TAG_ID: data.TAG_ID
            }
            var context = this;
            addTechTagApi(payload).then((result) => {
                //(result);
                if (result.data == constants.OK) {
                    context.showItems2.splice(index, 1);
                    context.selectedPolicy.tags.push(data);
                    context.showItems1.push(data);
                }
            });
        },
        deleteTag(data, index) {
            console.log(data);
            //delete tag 
            const payload = {
                TECH_ID_TECH_ID: this.selectedPolicy.TECH_ID,
                TAG_ID_TAG_ID: data.TAG_ID
            }
            var context = this;
            deleteTechTagApi(payload).then((result) => {
                console.log(result)
                if (result.data == constants.OK) {
                    let name = this.showItems1[index].TAG_NAME;
                    context.showItems1.splice(index, 1);
                    for (let i = 0; i < context.selectedPolicy.tags.length; i++) {
                        if (context.selectedPolicy.tags[i].TAG_NAME == name)
                            context.selectedPolicy.tags.splice(i, 1);
                    }
                    context.showItems2.push(data);
                }
            })
            // delete the item in tags.
        },
        // open tag dialog
        openTagDialog(data) {
            this.loading = true;
            this.selectedPolicy = data;
            this.selectedPolicy.tags = []
            getTechTagApi(this.selectedPolicy).then((result) => {
                this.loading = false;
                this.tagDialogVisible = true;
                this.selectedPolicy.tags = result.data;
                let selectedTags = this.selectedPolicy.tags;
                // get all related tags
                let unselectedTags = [];
                for (let i = 0; i < this.tagItems.length; i++) {
                    let isSelected = false;
                    for (let j = 0; j < selectedTags.length; j++) {
                        if (this.tagItems[i].TAG_NAME == selectedTags[j].TAG_NAME) {
                            isSelected = true;
                            break;
                        }
                    }
                    if (!isSelected)
                        unselectedTags.push(this.tagItems[i]);
                }
                this.showItems1 = [];
                selectedTags.forEach(element => {
                    if (element["TAG_CATEGORY"] == this.tagControl.tag1) {
                        this.showItems1.push(element);
                    }
                });
                this.showItems2 = [];
                unselectedTags.forEach(element => {
                    if (element["TAG_CATEGORY"] == this.tagControl.tag1) {
                        this.showItems2.push(element);
                    }
                });

            })

        },
        next() {
            if (this.active++ > 2) this.active = 1;
            let selectedTags = this.selectedPolicy.tags;
            let unselectedTags = [];
            for (let i = 0; i < this.tagItems.length; i++) {
                let isSelected = false;
                for (let j = 0; j < selectedTags.length; j++) {
                    if (this.tagItems[i].TAG_NAME == selectedTags[j].TAG_NAME) {
                        isSelected = true;
                        break;
                    }
                }
                if (!isSelected)
                    unselectedTags.push(this.tagItems[i]);
            }

            switch (this.active) {
                case 1:
                    this.showItems1 = [];
                    selectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] == this.tagControl.tag1) {
                            this.showItems1.push(element);
                        }
                    });
                    this.showItems2 = [];
                    unselectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] == this.tagControl.tag1) {
                            this.showItems2.push(element);
                        }
                    });
                    this.tagType = "success";
                    break;
                case 2:
                    this.showItems1 = [];
                    selectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] == this.tagControl.tag2) {
                            this.showItems1.push(element);
                        }
                    });
                    this.showItems2 = [];
                    unselectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] == this.tagControl.tag2) {
                            this.showItems2.push(element);
                        }
                    });
                    this.tagType = "warning";
                    break;
                case 3:
                    this.showItems1 = [];
                    selectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] != this.tagControl.tag1 && element["TAG_CATEGORY"] != this.tagControl.tag2) {
                            this.showItems1.push(element);
                        }
                    });
                    this.showItems2 = [];
                    unselectedTags.forEach(element => {
                        if (element["TAG_CATEGORY"] != this.tagControl.tag1 && element["TAG_CATEGORY"] != this.tagControl.tag2) {
                            this.showItems2.push(element);
                        }
                    });
                    this.tagType = "danger";
                    break;
            }
        },

        onSearch() {
            var payload = {
                data: {
                    searchString: this.filterString.name,
                }
            };
            this.refreshRooms(payload);
        },

        clickConfirmDelete() {
            this.loading = true;
            if (this.deleteTarget.type == "tech") {
                this.deleteTarget.TECH_ID = this.deleteTarget.id;
                deleteTechApi(this.deleteTarget).then((result) => {
                    if (result.data == constants.OK) {
                        this.refreshRooms();
                        notifySomething(
                            "删除专利成功",
                            "删除专利成功",
                            constants.typeSuccess
                        );
                    } else if (result.data.code == 3) {
                        notifySomething(
                            constants.GENERALERROR,
                            "删除专利失败",
                            constants.typeError
                        );
                    }
                    this.loading = false;
                });
            }
        },
        deletePolicy(data) {
            this.sendVal = true;
            console.log(data);
            this.deleteTarget = {
                text: "是否要删除" + data.NAME + "(ID: " + data.TECH_ID + ")?",
                id: data.TECH_ID,
                type: "tech",
            };
        },
        refreshRooms(payload) {
            this.loading = true;
            if (!payload) {
                payload = {}
            }
            var context = this;
            getTechApi(payload)
                .then((data) => {
                    this.localData = data.data;
                    this.loading = false;
                    this.localData.map((one) => {
                        one.CREATED_AT = formatDate(new Date(one.CREATED_AT));
                        one.UPDATED_AT = formatDate(new Date(one.UPDATED_AT));
                    });
                })
                .catch(function () {
                    context.loading = false;
                    notifySomething(
                        constants.GENERALERROR,
                        constants.GENERALERROR,
                        constants.typeError
                    );
                });
        },
        // open emodify room
        changePolicy(data) {
            if (
                // eslint-disable-next-line no-prototype-builtins
                data.hasOwnProperty("vgt_id") ||
                // eslint-disable-next-line no-prototype-builtins
                data.hasOwnProperty("originalIndex")

            ) {
                delete data.vgt_id;
                delete data.originalIndex;
            }
            this.selectedPolicy = data;
            this.modelTitle = "修改金融产品";
            this.modalMode = "edit";
            this.open = true;
        },

        //open create
        createRoomModel() {
            // show create Model
            this.modelTitle = "新建专利产品";
            this.modalMode = "create";
            this.open = true;
            this.selectedPolicy = {
                "TECH_CODE": "2",
                "NAME": "专利2",
                "DESCRIPTION": "专利描述2",
                "DESCRIPTION_PIC_URL": " ",
                "TYPE": "专利",
                "PATENT_APPLICATION_COUNTRY": "国内",
                "PATENT_APPLICATION_CODE": " ",
                "PATENT_APPLICATION_DATE": " ",
                "PATENT_AUTHORIZATION_STATE": " ",
                "PATENT_AUTHORIZATION_CODE": " ",
                "PATENT_AUTHORIZATION_DATE": " ",
                "PATENT_APPLICANT": " ",
                "PATENT_INVENTOR": " ",
                "TRADEMARK_AVATAR": " ",
                "TRADEMARK_REGISTERATION_CODE": " ",
                "TRADEMARK_REGISTERATION_DATE": " ",
                "TRADEMARK_REGISTERATION_EXPIRE_DATE": " ",
                "TRADEMARK_APPLICANT": " ",
                "COPYRIGHT_TYPE": " ",
                "COPYRIGHT_REGISTERATION_CODE": " ",
                "COPYRIGHT_REGISTERATION_DATE": " ",
                "COPYRIGHT_FINISHED_DATE": " ",
                "COPYRIGHT_PUBLISHED_DATE": " ",
                "COPYRIGHT_VERSION_CODE": " ",
                "COPYRIGHT_CLASSIFICATION_CODE": " ",
                "COPYRIGHT_AUTHORIZATION_DATE": " ",
                "QUALIFICATION_CODE": " ",
                "QUALIFICATION_STATUS": " ",
                "QUALIFICATION_DATE": " ",
                "QUALIFICATION_EXPIRE_DATE": " ",
                "CONTACT_NAME": " ",
                "PHONE": " ",
                "EMAIL": " ",
                "DEPARTMENT": " ",
                "COMPANY_CODE_COMPANY_CODE": " ",
                "COMPANY_NAME": " ",
                "STATUS": "启用",
                "CREATED_AT": "1970-01-01",
                "UPDATED_AT": "1970-01-01",
                "USER_ID_USER_ID": " ",
                "USER_NAME": "张三",
                "AREA": " ",
                "NEW_INDUSTRY": " ",
                "TARGET_PRICE": " ",
                "QUANSHU_AREA": " ",
                "IPC_CATEGORY": " ",
                "PATENT_CATEGORY": " ",
                "PCT": true,
                "HEZUO_TYPE": " "
            };
        },
        toggle() {
            this.loading = true;
            var context = this;
            //kind=1 means 自由房屋创建和编辑
            if (this.modalMode == "create") {
                this.selectedPolicy.CREATED_AT = new Date();
                this.selectedPolicy.UPDATED_AT = new Date();
                postTechApi(this.selectedPolicy)
                    .then((result) => {
                        context.loading = false;
                        if (result.data == constants.OK) {
                            this.closeModal();
                            notifySomething(
                                "专利上传成功",
                                "专利上传成功",
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
                delete this.selectedPolicy.tags;
                updateTechApi(this.selectedPolicy)
                    .then((result) => {
                        if (result.data == constants.OK) {
                            this.closeModal();
                            this.$notify({
                                group: "foo",
                                title: "更新专利成功",
                                text: "更新专利成功",
                                type: "success",
                            });
                        } else if (result.data.code == 3) {
                            notifySomething(
                                "更新专利失败",
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
            this.refreshRooms();
        },
    },
    created() {

        queryTagsApi(["TYPE=TE"]).then((data) => {
            this.tagItems = data.data;
            //console.log(this.tagItems)
        });

        this.refreshRooms();
    },
};
</script>

<style>
.el-tag--dark {
    background-color: #4BA6E6;
    border-color: #6AABDD;
    color: #fff;
}

.tableTag {
    margin-left: 5px;
    margin-bottom: 1%;
    border-radius: 10px;
}

.tag {
    margin-left: 5px;
    margin-bottom: 1%;
    border-radius: 10px;
}

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
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
