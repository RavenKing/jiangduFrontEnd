<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>权证号</label>
                <sui-input placeholder="权证号" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>权证单位(人)</label>
                <sui-input placeholder="权证单位(人)" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-dropdown placeholder="房屋用途" selection :options="yongtuOptions" v-model="singleRoom.usage1" />
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
        <sui-form-fields inline>
            <label>土地面积</label>
            <sui-form-field>
                <sui-input placeholder="土地面积" v-model="singleRoom.tudispace" :disabled="disabled" />
            </sui-form-field>
            <label>建筑面积</label>
            <sui-form-field>
                <sui-input placeholder="建筑面积" v-model="singleRoom.jianzhuspace" :disabled="disabled" />
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
            yongtuOptions: [{
                text: "办公用房",
                value: "1"
            }, {
                text: "服务用房",
                value: "2"
            }, {
                text: "设备用房",
                value: "3"
            }, {
                text: "附属用房",
                value: "4"
            }],
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
