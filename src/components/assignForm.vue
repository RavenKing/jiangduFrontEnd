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
                <label>房间名称</label>
                <sui-input placeholder="房间名称" v-model="singleEntry.roomname" />
            </sui-form-field>
            <sui-form-field>
                <label>领导级别</label>
                <sui-dropdown placeholder="领导级别" selection :options="leaderlevelOption" v-model="singleEntry.leader" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleEntry.space" type="number" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋用途</label>
            {{singleEntry.type}}
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
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
            }],
            leaderlevelOption: [{
                text: "正局",
                value: "正局"
            }, {
                text: "副局",
                value: "副局"
            },{
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
        console.log("test");
    }
};
</script>
