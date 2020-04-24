<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>name</label>
                <sui-input placeholder="name" v-model="singleUnit.name" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>enumber</label>
                <sui-input placeholder="enumber" v-model="singleUnit.enumber" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>level</label>
                <sui-input placeholder="level" v-model="singleUnit.level" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>level_num</label>
                <sui-input placeholder="level_num" v-model="singleUnit.level_num" :disabled="disabled"/>
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
