<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>所属区域</label>
                <sui-input placeholder="所属区域" v-model="singleRoom.area" disabled />
            </sui-form-field>
            <sui-form-field>
                <label>建造年代</label>
                <sui-input placeholder="建造年代" v-model="singleRoom.age" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-input placeholder="房屋用途" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>竣工日期</label>
                <datepicker :value="singleRoom.build_date" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field>
                <label>结构类型</label>
                <sui-input placeholder="结构类型" v-model="singleRoom.jiegou" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑类型</label>
                <sui-input placeholder="建筑类型" v-model="singleRoom.jianzhu" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="土地面积" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>土地面积</label>
                <sui-input placeholder="土地面积" v-model="singleRoom.rawspace" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <sui-checkbox label="是否统一管理" toggle v-model="singleRoom.isunimanage" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="是否有产证" toggle v-model="singleRoom.hasproperty" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <sui-checkbox label="是否入账" toggle v-model="singleRoom.inaccount" />
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
    name: 'form-create',
    components: {
        Datepicker
    },
    data() {
        return {
             lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now()
        };
    },
    methods: {},
    created() {
        this.testDate = Date.now();
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
