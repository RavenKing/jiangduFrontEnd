<template lang="html">
<div>
    <sui-form class="marginBottom30">
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>单位名称</label>
                <model-select style="width:100%" :options="unitoptions" v-model="singleEntry.unit_id" placeholder="选择单位" @input="changeUnit">
                </model-select>
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>原出租单位</label>
                <sui-input style="width:100%" placeholder="原出租单位" v-model="singleEntry.loan_name" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>房屋名称</label>
                <model-select style="width:100%" :options="options" v-model="singleEntry.room_id" placeholder="选择房屋" @input="changeUnit">
                </model-select>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>承租方名称</label>
                <sui-input style="width:100%" placeholder="承租方名称" v-model="singleEntry.rent_name" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>联系电话</label>
                <sui-input style="width:100%" placeholder="联系电话" v-model="singleEntry.tel" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>联系人地址</label>
                <sui-input style="width:100%" placeholder="联系人地址" v-model="singleEntry.address" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>起始时间</label>
                <datepicker style="width:100%" :value="singleEntry.appdate" v-model="singleEntry.starttime" :language="lang['zh']"></datepicker>
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>结束时间</label>
                <datepicker style="width:100%" :value="singleEntry.appdate" v-model="singleEntry.endtime" :language="lang['zh']"></datepicker>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>合同面积</label>
                <sui-input style="width:100%" placeholder="合同面积" v-model="singleEntry.space" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>租金</label>
                <sui-input style="width:100%" placeholder="租金" v-model="singleEntry.amt" />
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field style="width:100%">
                <label>备注</label>
                <textarea v-model="singleEntry.memo" />
                </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>               
             <label>资料上传</label>
   <el-upload ref="upload" class="upload-demo" :on-change="uploadZiliaoFile" :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>                                </el-upload>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    uploadZiliaoFileApi,
} from "@/api/utilApi";
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    ModelSelect
} from 'vue-search-select';
import store from "@/store";
import constants from "@/util/constants";
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi,
    getUnitApi
} from "@/api/roomDataAPI";
import {
    notifySomething,
} from "@/util/utils"
export default {
    name: 'weixiu-form',
    components: {
        Datepicker,
        'model-select': ModelSelect,

    },
    props: ['singleEntry', 'mode'],
    data() {
        return {
            options: [],
            louOptions: [],
            floorOptions: [],
            floorLoading: false,
            louLoading: false,
            lang: lang,
            disabled: false,
            unitoptions: [],
            uploadCount: 0,
            fileList: []
        };
    },
    methods: {
        uploadZiliaoFile(e, fileList) {
            if (this.uploadCount == 1) {
                this.uploadCount = 0;
                return;
            }
            this.uploadCount++;
            fileList.push(e.raw);
            let formData = new FormData();
            this.loading = true;
            var context = this;
            if (e.raw != undefined) {
                formData.append('ossfile', e.raw);
                uploadZiliaoFileApi(formData).then((result) => {
                    console.log(result);
                    if (result.data.code == 0) {
                        this.fileList.push(result.data.data)
                        this.singleEntry.url = JSON.stringify(this.fileList);
                    }
                }).catch(function () {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                });
            }
        },
        getUnit() {
            this.unitoptions = [];
            if (store.getters.unit.unitBasic.length > 0) {
                this.unitoptions = store.getters.unit.unitBasic;
            } else {
                getUnitApi().then((data) => {
                    var res_data = data.data.data
                    for (var i = res_data.length - 1; i >= 0; i--) {
                        this.unitoptions.push({
                            'text': res_data[i]['name'],
                            'value': res_data[i]['id']
                        })
                    }
                });
            }
        },
        setFloor() {
            console.log(this.singleEntry.building_id);
            this.floorOptions = [];
            this.floorLoading = true;
            if (this.singleEntry.building_id != null) {
                getBuildingFloorApi(this.singleEntry).then((result) => {
                    var floors = result.data.data;
                    floors.map((floor) => {
                        this.floorOptions.push({
                            text: floor.name,
                            value: floor.id,
                        })
                    });
                    this.floorLoading = false;
                })
            }
            this.louLoading = false;
        },
        setFang() {
            console.log(this.singleEntry.room_id);
            this.louOptions = [];
            this.louLoading = true;
            if (this.singleEntry.room_id != null) {
                getBuildingListApi(this.singleEntry).then((data) => {
                    data.data.data.map((one) => {
                        this.louOptions.push({
                            text: one.name,
                            value: one.id,
                        })
                    });
                    this.louLoading = false;

                })
            }

        }
    },
    created() {
        this.getUnit();
        getRoomDataApi({
            kind: 2
        }).then((data) => {
            //this.localData = data.data.data;
            data.data.data.map((one) => {
                this.options.push({
                    text: one.roomname,
                    value: one.id,
                })
            });
        });
    }
};
</script>

<style>
.marginBottom30 {
    margin-bottom: 15px;
}

.ui.modal>.actions {
    text-align: center;
}

.width300 {
    width: 300px !important
}
</style>
