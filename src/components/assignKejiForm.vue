<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>房间号</label>
                <sui-input placeholder="房间号" v-model="assignEntry.roomnumber" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>房间名字</label>
                <sui-input placeholder="房间名字" v-model="assignEntry.roomname" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>备注</label>
                <sui-input placeholder="备注" v-model="assignEntry.beizhu" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleEntry.space" type="number" disabled />
            </sui-form-field>
            <sui-form-field>
                <label>房间用途</label>
                {{singleEntry.type}}
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleEntry.type=='领导办公室'">
            <sui-form-field>
                <label>局级</label>
                <sui-input placeholder="局级" v-model="assignEntry.juji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>副局级</label>
                <sui-input placeholder="副局级" v-model="assignEntry.fujuji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>处级</label>
                <sui-input placeholder="处级" v-model="assignEntry.chuji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>副处级</label>
                <sui-input placeholder="副处级" v-model="assignEntry.fuchuji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleEntry.type=='领导办公室'||singleEntry.type=='办公'">
            <sui-form-field>
                <label>科级</label>
                <sui-input placeholder="科级" v-model="assignEntry.keji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>副科级</label>
                <sui-input placeholder="副科级" v-model="assignEntry.fukeji" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>科员</label>
                <sui-input placeholder="科员" v-model="assignEntry.keyuan" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="assignEntry.qita" type="number" :disabled="singleEntry.status" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'assign-keji',
    props: ["index", "singleEntry", "assignEntry"],
    data() {
        return {};
    },
    methods: {},
    created() {}
};
</script>
