<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>名称</label>
                <sui-input placeholder="名称" v-model="singleBuilding.name" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>描述</label>
                <sui-input placeholder="描述" v-model="singleBuilding.detail" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>地上层数</label>
                <sui-input placeholder="地上层数" v-model="singleBuilding.upper" />
            </sui-form-field>
            <sui-form-field>
                <label>地下层数</label>
                <sui-input placeholder="地下层数" v-model="singleBuilding.lower" />
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
            disabled: false,
            singleBuilding: {
                name: "",
                detail: ""
            }
        };
    },
    methods: {}
};
</script>
