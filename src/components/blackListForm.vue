<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>企业名称</label>
                <model-select :options="companyNameList" v-model="singleRoom.COMPANY_NAME" :placeholder="singleRoom.COMPANY_NAME" @input="onSelect"></model-select>
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>黑白名单</label>
                <sui-dropdown v-model="singleRoom.STATUS" placeholder="黑白名单" selection :options="options" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%;">
                <label>描述</label>
                <textarea v-model="singleRoom.COMMENTS" placeholder="描述" />
                </sui-form-field>
        </sui-form-fields>
    </sui-form>
  </div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";
import {
    ModelSelect
} from 'vue-search-select';
import {
    getCompanysApi,
} from "@/api/roomDataAPI";

export default {
    name: "FormCreate",
    props: ["singleRoom"],
    components: {
        'model-select': ModelSelect,
    },
    data() {
        return {
            localData: [],
            companyNameList: [],
            current: null,
            options: [{
                    text: "黑名单",
                    value: "黑名单",
                },
                {
                    text: "白名单",
                    value: "白名单",
                },
            ],
            fileList: [],
            checkZhuguan: false,
            unitOptions: [],
            lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now(),
        };
    },
    created() {
        getCompanysApi().then((result) => {
            this.localData = result.data;
            result.data.forEach((element, index) => {
                this.companyNameList.push({
                    value: index,
                    text: element.COMPANY_NAME
                });
            });
        })
    },
    methods: {
        onSelect(item) {
            this.singleRoom.USER_ID = this.localData[item].USER_ID;
        },
        changeZhuguan() {
            console.log("change");
            if (this.singleRoom.isunimanage == 1) {
                this.checkZhuguan = true;
                this.singleRoom.zhuguandanwei = 2;
            } else {
                this.checkZhuguan = false;
            }
        },
    },
};
</script>

<style>
.BMap_cpyCtrl {
    display: none;
}

.anchorBL {
    display: none;
}

.map {
    width: 100%;
    height: 400px;
}

.el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 495px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
</style>
