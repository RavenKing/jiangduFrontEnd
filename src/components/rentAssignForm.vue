<template lang="html">
<div>
    <sui-form class="marginBottom30">
        <sui-form-fields>
            <sui-form-field style="width:33.33333%;">
                <label>地址</label>
                <sui-dropdown placeholder="选择房屋" selection :options="options" v-model="singleEntry.room_id" @input="getOtherData" :loading="loading"/>
            </sui-form-field>
            <sui-form-field style="width:33.33333%;" disabled>
                <label>主管单位</label>
                <sui-input style="width:100%" placeholder="主管单位" v-model="singleEntry.zhuguandanwei" disabled />
            </sui-form-field>
            <sui-form-field style="width:33.33333%;" disabled>
                <label>产权单位</label>
                <model-select style="width:100%" :options="unitoptions" v-model="singleEntry.unit_id" placeholder="产权单位" disabled>
                </model-select>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field style="width:33.33333%;">
                <label>承租方</label>
                <sui-input style="width:100%" placeholder="承租方名称" v-model="singleEntry.renter" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%;">
                <label>联系电话</label>
                <sui-input style="width:100%" placeholder="联系电话" v-model="singleEntry.tel" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field style="width:33.33333%;">
                <label>联系人地址</label>
                <sui-input style="width:100%" placeholder="联系人地址" v-model="singleEntry.rent_address" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%;">
                <label>经营用途</label>
                <sui-input style="width:100%" placeholder="经营用途" v-model="singleEntry.usage" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>起始时间</label>
                <datepicker style="width:100%" :value="singleEntry.rent_start" v-model="singleEntry.rent_start" :language="lang['zh']"></datepicker>
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>结束时间</label>
                <datepicker style="width:100%" :value="singleEntry.rent_end" v-model="singleEntry.rent_end" :language="lang['zh']"></datepicker>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>

            <sui-form-field style="width:33.33333%;">
                <label>合同面积</label>
                <sui-input style="width:100%" placeholder="合同面积" v-model="singleEntry.contract_space" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>年租金</label>
                <sui-input style="width:100%" placeholder="年租金" v-model="singleEntry.rent_amt" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%;">
                <label>保证金(应收)</label>
                <sui-input style="width:100%" placeholder="保证金" v-model="singleEntry.baozheng_amt" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%">
                <label>备注</label>
                <textarea v-model="singleEntry.memo" rows="3" />
                </sui-form-field>
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
    getroombyid
} from "@/api/weixiuAPI";
import {
    getUnitApi,
    getRoomDataApi
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
            floorLoading: false,
            louLoading: false,
            lang: lang,
            disabled: false,
            unitoptions: [],
            uploadCount: 0,
            fileList: [],
            loading: false,
            options: []
        };
    },
    methods: {
        getOtherData(data) {
            this.loading=true;
            var context = this;
            getroombyid({
                room_id: data
            }).then((result) => {
              this.loading=false;
                if (result.data.code == 0) {
                    context.singleEntry.roomname = result.data.data.roomname;
                    context.singleEntry.address = result.data.data.address;
                    context.singleEntry.zhuguandanwei = result.data.data.zhuguandanwei;
                    if (result.data.data.inaccount) {
                        context.singleEntry.inaccount = "有"
                    } else {
                        context.singleEntry.inaccount = "无"
                    }
                }
            }).catch(function () {
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });
        },
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
        getRoom() {
            var context = this;
            getRoomDataApi({
                kind: 2,
                //   extract: 1
            }).then((data) => {
                //this.localData = data.data.data;
                data.data.data.map((one) => {
                    context.options.push({
                        text: one.address,
                        value: one.id,
                    })
                });

                context.loading = false;
                context.openWeiXiuForm("create");
            });
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
        }
    },
    created() {
        this.getUnit();
        this.getRoom();
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
