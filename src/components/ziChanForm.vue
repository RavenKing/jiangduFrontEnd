<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>

            <sui-form-field style="width:33.33333%">
                <label>资产编号</label>
                <sui-input placeholder="资产编号" v-model="singleRoom.propertyid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>资产类型</label>
                <sui-input placeholder="资产类型" v-model="singleRoom.propertytype" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>资产价值(元)</label>
                <sui-input placeholder="资产价值" v-model="singleRoom.propertyvalue" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%">
                <label>建筑面积(m²)</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>入账时间</label>
                <datepicker :value="singleRoom.accounttime" v-model="singleRoom.accounttime" :language="lang['zh']"></datepicker>

            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>取得时间</label>
                <datepicker :value="singleRoom.aquiretime" v-model="singleRoom.aquiretime" :language="lang['zh']"></datepicker>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%">
                <label>账面原值(元)</label>
                <sui-input placeholder="账面原值" v-model="singleRoom.origin_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>房屋价格(元)</label>
                <sui-input placeholder="房屋价格" v-model="singleRoom.room_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>年折旧率(%)</label>
                <sui-input placeholder="年折旧率" v-model="singleRoom.dep_rate" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%">
                <label>累计折旧(%)</label>
                <sui-input placeholder="累计折旧" v-model="singleRoom.dep" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%">
                <label>净值(元)</label>
                <sui-input placeholder="净值" v-model="singleRoom.net_value" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
export default {
    props: ['singleRoom'],
    name: 'zichan-form',
    components: {
        Datepicker
    },
    data() {
        return {
            lang: lang,
            disabled: false,
            zoomlevel: 14
        };
    },
    methods: {},
    created() {
        if (this.singleRoom.roomname == undefined) {
            this.singleRoom.roomname = ""
        }
    }
};
</script>
