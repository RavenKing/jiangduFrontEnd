<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>name</label>
                <sui-input placeholder="name" v-model="singleEmployee.name" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>job</label>
                <sui-input placeholder="job" v-model="singleEmployee.job" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>level</label>
                <sui-input placeholder="level" v-model="singleEmployee.level" :disabled="disabled"/>
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
