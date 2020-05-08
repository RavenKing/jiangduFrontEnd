<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>地上层数</label>
                <sui-input placeholder="upper" v-model="singleBuildingFloor.upper" />
            </sui-form-field>
            <sui-form-field>
                <label>地下层数</label>
                <sui-input placeholder="地下层数" v-model="singleBuildingFloor.lower"  />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'buildingFloor-form',
    data() {
        return {
            singleBuildingFloor: {
                upper: "",
                lower: ""
            }
        };
    },
    methods: {}
};
</script>
