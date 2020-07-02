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
                <label>房屋用途</label>
                <sui-dropdown placeholder="房屋用途" selection :options="yongtuOptions" v-model="singleRoom.usage1" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <label>是否包含物业费:</label>
            <sui-form-field>
                <sui-checkbox label="是" radio value="1" v-model="singleRoom.value2" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="否" radio value="2" v-model="singleRoom.value2" />
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
