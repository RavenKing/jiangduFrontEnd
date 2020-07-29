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
