<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>

            <sui-form-field>
                <label>权证号</label>
                <sui-input placeholder="权证号" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>权证d单位(人)</label>
                <sui-input placeholder="权证单位(人)" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-input placeholder="房屋用途" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>土地面积</label>
                <sui-input placeholder="土地面积" v-model="singleRoom.propertyspace2" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'chanzheng-form',
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
