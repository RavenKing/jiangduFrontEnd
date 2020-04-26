<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>名称</label>
                <sui-input placeholder="名称" v-model="singleEmployee.name" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>职位</label>
                <sui-input placeholder="职位" v-model="singleEmployee.job" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>级别</label>
                <sui-input placeholder="级别" v-model="singleEmployee.level" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'employee-form',
    data() {
        return {
            disabled:false,
            singleEmployee: {
                name: "",
                job: "",
                level: ""         
            }
        };
    },
    methods:{
    }
};
</script>
