<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>金融产品</label>
                <sui-input placeholder="金融产品" v-model="singleRoom.NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>金融产品代码</label>
                <sui-input placeholder="金融产品代码" v-model="singleRoom.FIN_CODE" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>银行名</label>
                <sui-input placeholder="银行名字" v-model="singleRoom.BANK_NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>银行ID</label>
                <sui-input placeholder="银行ID" v-model="singleRoom.BANK_ID" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>利率(下限)</label>
                <sui-input placeholder="利率(下限)" v-model="singleRoom.RATE_LOW" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>利率(上限)</label>
                <sui-input placeholder="利率(上限)" v-model="singleRoom.RATE_HIGH" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33%;">
                <label>贷款金额</label>
                <sui-input placeholder="贷款金额" v-model="singleRoom.LOAN_QUOTA" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>贷款时限(下限)</label>
                <sui-input placeholder="贷款时限(下限)" v-model="singleRoom.LOAN_DATE_LOW" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>贷款时限(上限)</label>
                <sui-input placeholder="贷款时限(上限)" v-model="singleRoom.LOAN_DATE_HIGH" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33%;">
                <label>担保方式</label>
                <sui-dropdown placeholder="担保方式" selection :options="chargeMethod" v-model="singleRoom.CHARGE_METHOD" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>还款方式</label>
                <sui-input placeholder="贷款时限(下限)" v-model="singleRoom.REPAY_METHOD" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>适用对象</label>
                <sui-input placeholder="贷款时限(上限)" v-model="singleRoom.TARGET" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33%;">
                <label>产品类型</label>
                <sui-input placeholder="产品类型" v-model="singleRoom.PRODUCT_TYPE" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>融资类型</label>
                <sui-input placeholder="融资类型" v-model="singleRoom.LOAN_TYPE" />
            </sui-form-field>
            <sui-form-field style="width:33.33%;">
                <label>状态</label>
                <sui-dropdown placeholder="状态" selection :options="finStatus" v-model="singleRoom.STATUS" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>适用开始时间</label>
                <datepicker :value="singleRoom.FIN_START_DATE" v-model="singleRoom.FIN_START_DATE" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>适用结束时间</label>
                <datepicker :value="singleRoom.FIN_END_DATE" v-model="singleRoom.FIN_END_DATE" :language="lang['zh']"></datepicker>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"> <em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
</div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";
import Datepicker from 'vuejs-datepicker';
import constants from "@/util/constants";
export default {
    components: {
        //  Pagination,
        //"model-select": ModelSelect,
        Datepicker
    },
    props: ['singleRoom'],
    name: 'form-create',

    data() {
        return {
            fileList: [],
            checkZhuguan: false,
            finStatus: constants.FIN_STATUS,
            chargeMethod:constants.FIN_CHARGE_METHOD,
            lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now(),
        };
    },
    methods: {
        changeZhuguan() {
            console.log("change")
            if (this.singleRoom.isunimanage == 1) {
                this.checkZhuguan = true;
                this.singleRoom.zhuguandanwei = 2;
            } else {
                this.checkZhuguan = false;
            }
        },

    },
    created() {

    }
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
    width: 840px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
</style>
