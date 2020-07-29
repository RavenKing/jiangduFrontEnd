<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>单位名称</label>
                <sui-input placeholder="单位名称" v-model="singleUnit.name" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>单位人数</label>
                <sui-input placeholder="单位人数" v-model="singleUnit.enumber" :disabled="disabled" type="number"/>
            </sui-form-field>
            <sui-form-field>
                <label>正厅</label>
                <sui-input placeholder="正厅" v-model="singleUnit.zhengting" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>副厅</label>
                <sui-input placeholder="副厅" v-model="singleUnit.futing" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>正处</label>
                <sui-input placeholder="正处" v-model="singleUnit.zhengchu" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>副处</label>
                <sui-input placeholder="副处" v-model="singleUnit.fuchu" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>单位级别</label>
                <sui-input placeholder="单位级别" v-model="singleUnit.level" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>各个级别人数</label>
                <sui-input placeholder="各个级别人数" v-model="singleUnit.level_num" :disabled="disabled" type="number"/>
            </sui-form-field>
            <sui-form-field>
                <label>正科</label>
                <sui-input placeholder="正科" v-model="singleUnit.zhengke" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleUnit.fuke" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>科级</label>
                <sui-input placeholder="科级" v-model="singleUnit.keji" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>

                <label>各个级别人数</label>
                <sui-input placeholder="各个级别人数" v-model="singleUnit.level_num" :disabled="disabled" type="number"/>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'unit-form',
    data() {
        return {
            disabled:false,
            singleUnit: {
                name: "",
                enumber: "",
                level: "",
                level_num: ""              
            }
        };
    },
    methods:{
    }
};
</script>
