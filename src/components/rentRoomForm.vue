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
        <sui-form-fields fields="two">
            <sui-form-field style="width:50%;">
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <sui-button basic color="blue" @click.prevent="clickDingWei" icon="location arrow">
                </sui-button>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-dropdown placeholder="房屋用途" selection :options="yongtuOptions" v-model="singleRoom.usage1" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" type="number" />
            </sui-form-field>
            <sui-form-field>
                <label>出租方性质</label>
                <sui-dropdown placeholder="出租方性质" selection :options="chuzuOptions" v-model="singleRoom.owner"/>
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'rentroom-form',
    props: ['singleRoom', 'clickDingWei'],
    data() {
        return {
            chuzuOptions:[
              {
                text: "国企",
                value: "国企"
            },{
                text: "国企控股",
                value: "国企控股"
            },{
                text: "村委会",
                value: "村委会"
            },{
                text: "私企",
                value: "私企"
            },
            ],
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
.ui.modal>.actions {
    text-align: center;
}

.width600 {
    width: 600px !important;
}
</style>
