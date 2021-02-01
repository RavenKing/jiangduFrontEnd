<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <!-- <sui-form-field>
                <label>房间号</label>
                <sui-input placeholder="房间号" v-model="singleEntry.id" />
            </sui-form-field> -->
            <!-- <sui-form-field>
                <label>房间名称</label>
                <sui-input placeholder="房间名称" v-model="singleEntry.roomname" />
            </sui-form-field>
            <sui-form-field>
                <label>领导级别</label>
                <sui-dropdown placeholder="领导级别" selection :options="leaderlevelOption" v-model="singleEntry.leader" />
            </sui-form-field> -->
            <!-- <sui-form-field>
                <label>选择单位</label>
                <sui-dropdown placeholder="选择单位" selection :options="options" v-model="singleEntry.unit_id" />
            </sui-form-field> -->
            
            <sui-form-field style="width:33.33333%;">
                <label>房间用途</label>
                {{singleEntry.type}}
            </sui-form-field>
            <sui-form-field style="width:50.33333%;">
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleEntry.space" type="number" />
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
    props: ["index", "singleEntry", "showLeader"],
    data() {
        return {
            options: [],
            yongtuoptions: [{
                text: "经营性",
                value: 2
            }, {
                text: "办公性",
                value: 1
            }],
            leaderOption: [{
                text: "是",
                value: 1
            }, {
                text: "不是",
                value: 0
            }],
            leaderlevelOption: [{
                text: "正局",
                value: "正局"
            }, {
                text: "副局",
                value: "副局"
            }, {
                text: "正处",
                value: "正处"
            }, {
                text: "副处",
                value: "副处"
            }]
        };
    },
    methods: {},
    created() {
        getUnitApi().then((data) => {
            console.log(data)
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
