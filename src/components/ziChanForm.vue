<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>

            <sui-form-field>
                <label>资产编号</label>
                <sui-input placeholder="资产编号" v-model="singleRoom.propertyid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>资产类型</label>
                <sui-input placeholder="资产类型" v-model="singleRoom.propertytype" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>资产价值</label>
                <sui-input placeholder="资产价值" v-model="singleRoom.propertyvalue" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.propertyspace" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>入账时间</label>
                <sui-input placeholder="入账时间" v-model="singleRoom.accounttime" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>取得时间</label>
                <sui-input placeholder="取得时间" v-model="singleRoom.aquiretime" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>账面原值</label>
                <sui-input placeholder="账面原值" v-model="singleRoom.origin_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋价格</label>
                <sui-input placeholder="房屋价格" v-model="singleRoom.room_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>年折旧率</label>
                <sui-input placeholder="年折旧率" v-model="singleRoom.dep_rate" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <label>累计折旧</label>
                <sui-input placeholder="累计折旧" v-model="singleRoom.dep" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>净值</label>
                <sui-input placeholder="净值" v-model="singleRoom.net_value" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'zichan-form',
    data() {
        return {
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
</style>
