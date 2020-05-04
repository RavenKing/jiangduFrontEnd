<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋id</label>
                <sui-input placeholder="房屋id" v-model="singleRoom.room_id" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>权证号</label>
                <sui-input placeholder="权证号" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>权证人</label>
                <sui-input placeholder="权证人" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-input placeholder="房屋用途" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋面积</label>
                <sui-input placeholder="房屋面积" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>optional</label>
                <sui-input placeholder="optional" v-model="singleRoom.optional" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>建造年代</label>
                <sui-input placeholder="建造年代" v-model="singleRoom.built_date" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>账面原值</label>
                <sui-input placeholder="账面原值" v-model="singleRoom.origin_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋价格</label>
                <sui-input placeholder="房屋价格" v-model="singleRoom.room_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>累计折旧</label>
                <sui-input placeholder="累计折旧" v-model="singleRoom.dep" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>

            <sui-form-field>
                <label>净值</label>
                <sui-input placeholder="净值" v-model="singleRoom.net_value" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>年折旧率</label>
                <sui-input placeholder="年折旧率" v-model="singleRoom.dep_rate" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋内部信息</label>
                <sui-input placeholder="房屋内部信息" v-model="singleRoom.internal_info" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋现状</label>
                <sui-input placeholder="房屋现状" v-model="singleRoom.cur_status" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <label>地址经度</label>
                <sui-input placeholder="" v-model="point.lng" :disabled="disabled" v-on:change="testAlert"/>
            </sui-form-field>
            <sui-form-field>
                <label>地址维度</label>
                <sui-input placeholder="" v-model="point.lat" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <baidu-map class="map" :center="{lng: singleRoom.lon, lat: singleRoom.lat}" :zoom="15">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
                <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
            </bm-marker>
        </baidu-map>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'form-create',
    data() {
        return {
            disabled: false,
            point: {
                lng: 121.468322,
                lat: 30.924587
            },
            singleRoom: {
                roomid: "",
                certid: "",
                owner: "",
                address: "",
                roomname: "",
                usage: "",
                space: "",
                optional: "",
                age: "",
                build_date: "",
                origin_value: "",
                room_value: "",
                dep: "",
                lat: 30.924587,
                lon: 121.468322,
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: ""
            }
        };
    },
    methods: {
        testAlert(event){console.log(event)},
        createRoom() {
            console.log(this.singleRoom.roomid);
        },
        dragend(e) {
            console.log(e.point);
            console.log(this.point);
            this.singleRoom.lat=this.point.lat;
            this.singleRoom.lon=this.point.lng;
        }

    }
};
</script>

<style>
.map {
    width: 100%;
    height: 400px;
}
</style>
