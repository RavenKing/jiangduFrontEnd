<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋名字</label>
                <sui-input placeholder="房屋名字" v-model="singleRoom.roomname" />
            </sui-form-field>
            <sui-form-field>
                <label>所属区域</label>
                <sui-input placeholder="所属区域" v-model="singleRoom.area" disabled />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" class="width600" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>结构类型</label>
                <sui-dropdown placeholder="结构类型" selection :options="jiegouoptions" v-model="singleRoom.jiegou" />
            </sui-form-field>

            <sui-form-field>
                <label>建筑类型</label>
                <sui-dropdown placeholder="建筑类型" selection :options="jianzhuoptions" v-model="singleRoom.jianzhu" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'rentroom-form',
    props: ['singleRoom'],
    data() {
        return {
            jianzhuoptions: [{
                text: "低层住宅",
                value: "低层住宅"
            }, {
                text: "多层住宅",
                value: "多层住宅"
            }, {
                text: "中高层住宅",
                value: "中高层住宅"
            }, {
                text: "高层住宅",
                value: "高层住宅"
            }, {
                text: "其他形式住宅",
                value: "、其他形式住宅"
            }],
            jiegouoptions: [{
                text: "砖混结构",
                value: "砖混结构"
            }, {
                text: "钢筋混凝土结构",
                value: "钢筋混凝土结构"
            }, {
                text: "框架结构",
                value: "框架结构"
            }, {
                text: "框剪结构",
                value: "框剪结构"
            }, {
                text: "钢结构",
                value: "钢结构"
            }, {
                text: "核心筒结构",
                value: "核心筒结构"
            }]
        };
    },
    methods: {
        createRoom() {
            console.log(this.singleRoom.roomid);
        }

    }
};
</script>

<style>
.width600 {
    width: 600px !important;
}
</style>
