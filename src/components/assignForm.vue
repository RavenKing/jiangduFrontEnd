<template lang="html">
<div>
    <sui-form>

        <h1>当前房间房间{{index}}</h1>
        <sui-form-fields>
            <sui-form-field>
                <label>房间号</label>
                <sui-input placeholder="房间号" v-model="singleEntry.roomnumber" />
            </sui-form-field>
            <sui-form-field>
                <label>房间名字</label>
                <sui-input placeholder="房间名字" v-model="singleEntry.roomname" />
            </sui-form-field>
            <sui-form-field>
                <label>选择单位</label>
                <sui-dropdown placeholder="选择单位" selection :options="options" v-model="singleEntry.unit_id" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleEntry.space" type="number" />
            </sui-form-field>
            <sui-form-field>
                <label>房间用途</label>
                <sui-dropdown placeholder="房间用途" selection :options="yongtuoptions" v-model="singleEntry.kind" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    getUnitApi
} from "@/api/roomDataAPI";
export default {
    name: 'assign-contract',
    props: ["index", "singleEntry"],
    data() {
        return {
            options: [],
            yongtuoptions: [{
                text: "经营性",
                value: 2
            }, {
                text: "办公性",
                value: 1
            }]
        };
    },
    methods: {},
    created() {
        getUnitApi().then((data) => {
            //this.localData = data.data.data;
            data.data.data.map((one) => {
                this.options.push({
                    text: one.name,
                    value: one.id,
                })
            });
        });
    }
};
</script>
