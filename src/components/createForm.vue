<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:25%;">
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>所属区域</label>
                <sui-input placeholder="所属区域" v-model="singleRoom.area" disabled />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>建造年代</label>
                <sui-input placeholder="建造年代" v-model="singleRoom.age" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-field>
            <label>房屋地址</label>

            <sui-form-fields fields="two">
                <sui-form-field style="width:50%;">
                    <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" />
                </sui-form-field>
                <sui-form-field style="width:25%;">
                    <sui-button basic color="blue" @click.prevent="clickDingWei" icon="location arrow">
                    </sui-button>
                </sui-form-field>
            </sui-form-fields>
        </sui-form-field>
        <sui-form-fields>
            <sui-form-field style="width:25%;">
                <label>结构类型</label>
                <sui-dropdown placeholder="结构类型" selection :options="jiegouoptions" v-model="singleRoom.jiegou" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>取得方式:</label>
                <sui-dropdown placeholder="取得方式" selection :options="qudeOptions" v-model="singleRoom.aquiretype" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:25%;">
                <label>房屋用途</label>
                <sui-dropdown placeholder="房屋用途" selection :options="kindOptions" v-model="singleRoom.kind" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>土地面积</label>
                <sui-input placeholder="土地面积" v-model="singleRoom.rawspace" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleRoom.kind==2">
            <sui-form-field style="width:25%;">
                <label>是否机关局统一管理</label>
                <sui-dropdown placeholder="是否机关局统一管理" selection :options="isunimanageOptions" v-model="singleRoom.isunimanage" @input="changeZhuguan" />
            </sui-form-field>
            <sui-form-field style="width:25%;" :disabled="checkZhuguan">
                <label>主管单位</label>
                <sui-dropdown placeholder="主管单位" selection :options="unitOptions" v-model="singleRoom.zhuguandanwei" :disabled="checkZhuguan" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;" v-show="singleRoom.isunimanage==2">
                <label>委托单位</label>
                <sui-input placeholder="委托单位" v-model="singleRoom.weituodanwei" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>

            <sui-form-field style="width:25%;">
                <sui-checkbox label="是否有产证" toggle v-model="singleRoom.hasproperty" />
            </sui-form-field>
            <sui-form-field style="width:80%;">
                <sui-checkbox label="是否入账" toggle v-model="singleRoom.inaccount" />
                <sui-button v-show="singleRoom.kindShow" floated="right" content="维护出租管理信息" @click.prevent="clickToHeTong" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>

</div>
</template>

<script>
import {
    getUnitApi,
} from "@/api/roomDataAPI";
import * as lang from "vuejs-datepicker/src/locale";

export default {
    props: ['singleRoom', 'clickDingWei', 'clickToHeTong'],
    name: 'form-create',

    data() {
        return {
            checkZhuguan: false,
            unitOptions: [],
            isunimanageOptions: [{
                text: "统一管理",
                value: 1
            }, {
                text: "委托管理",
                value: 2
            }, {
                text: "自行管理",
                value: 3
            }],
            qudeOptions: [{
                    text: "自购",
                    value: "自购"
                },
                {
                    text: "无偿调拨",
                    value: "无偿调拨"
                },
                {
                    text: "自建",
                    value: "自建"
                },
                {
                    text: "置换",
                    value: "置换"
                },
                {
                    text: "租借",
                    value: "租借"
                },
            ],
            kindOptions: [{
                text: "经营性",
                value: 2
            }, {
                text: "办公性",
                value: 1
            }],
            lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now(),
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
            yongtuOptions: [{
                text: "出租",
                value: "1"
            }, {
                text: "出借",
                value: "2"
            }, {
                text: "闲置",
                value: "3"
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
        changeZhuguan() {
            console.log("change")
            if (this.singleRoom.isunimanage == 1) {
                this.checkZhuguan = true;
                this.singleRoom.zhuguandanwei = 2;
            } else {
                this.checkZhuguan = false;
            }
        },
        getUnit() {
            this.unitoptions = [];

            console.log(this.unitOptions);
            getUnitApi().then((data) => {
                var res_data = data.data.data
                for (var i = res_data.length - 1; i >= 0; i--) {
                    this.unitOptions.push({
                        'text': res_data[i]['name'],
                        'value': res_data[i]['id']
                    })
                }
                console.log(this.unitOptions);

            });
        }

    },
    created() {
        this.getUnit();

        this.testDate = Date.now();
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
