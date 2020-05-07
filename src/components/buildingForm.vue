<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>单位名称</label>
                <sui-input placeholder="单位名称" v-model="singleBuilding.building_id" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>单位人数</label>
                <sui-input placeholder="单位人数" v-model="singleBuilding.upper" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>单位级别</label>
                <sui-input placeholder="单位级别" v-model="singleBuilding.lower" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'building-form',
    data() {
        return {
            disabled:false,
            singleBuilding: {
                building_id: "",
                upper: "",
                lower: "",
                level_num: ""              
            }
        };
    },
    methods:{
    }
};
</script>
