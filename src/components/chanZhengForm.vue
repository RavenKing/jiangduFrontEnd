<template lang="html">
<div>
    <sui-form>

        <sui-form-fields>
            <sui-form-field style="width:33.33333%;">
                <label>房产证号</label>
                <sui-input placeholder="房产证号" v-model="singleRoom.quanshuzhengming" />
            </sui-form-field>

            <sui-form-field style="width:33.33333%;">
                <label>土地证号</label>
                <sui-input placeholder="土地证号" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%;" >
                <label>权证单位</label>
                <model-select style="width:100%" :options="unitoptions" v-model="singleRoom.owner" placeholder="权证单位" disabled>
                </model-select>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%;">
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:33.33333%;">
                <label>土地面积</label>
                <sui-input placeholder="土地面积" v-model="singleRoom.tudispace" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field style="width:33.33333%;">
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.jianzhuspace" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    getUnitApi
} from "@/api/roomDataAPI";
import {
    ModelSelect
} from 'vue-search-select';
import store from "@/store";

export default {
    components: {
        'model-select': ModelSelect,

    },
    props: ['singleRoom'],
    name: 'chanzheng-form',
    data() {
        return {
            quanshuzhengmingOptions: [{
                text: "不动产证明",
                value: "不动产证明"
            }, ],
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
            zoomlevel: 14,
            unitoptions: []
        };
    },
    methods: {
        getUnit() {
            this.unitoptions = [];
            if (store.getters.unit.unitBasic.length > 0) {
                this.unitoptions = store.getters.unit.unitBasic;
            } else {
                getUnitApi().then((data) => {
                    var res_data = data.data.data
                    for (var i = res_data.length - 1; i >= 0; i--) {
                        this.unitoptions.push({
                            'text': res_data[i]['name'],
                            'value': res_data[i]['id']
                        })
                    }
                });
            }
        }

    },
    created() {
        this.getUnit();
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
