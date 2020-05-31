<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>单位名称</label>
                <sui-input placeholder="单位名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>单位类别</label>
                <sui-input placeholder="单位类别" v-model="singleRoom.area" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>单位性质</label>
                <sui-input placeholder="单位性质" v-model="singleRoom.age" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>机构规格</label>
                <sui-input placeholder="机构规格" v-model="singleRoom.room_id" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>组织机构</label>
                <sui-input placeholder="组织机构" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>
        
        <sui-form-fields>
            <sui-form-field>
                <label>编制人数：</label>
            </sui-form-field>
            <sui-form-field>
                
                <label>编制数</label>
                <sui-input placeholder="编制数" v-model="singleRoom.jiegou" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>正局级</label>
                <sui-input placeholder="正局级" v-model="singleRoom.jianzhu" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleRoom.optional" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>其中：</label>
            </sui-form-field>
            <sui-form-field>
                
                <label>副局级</label>
                <sui-input placeholder="副局级" v-model="singleRoom.jiegou" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>正处级</label>
                <sui-input placeholder="正处级" v-model="singleRoom.jianzhu" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副处级</label>
                <sui-input placeholder="副处级" v-model="singleRoom.optional" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>正科级</label>
                <sui-input placeholder="正科级" v-model="singleRoom.optional" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>科员及以下</label>
                <sui-input placeholder="科员及以下" v-model="singleRoom.optional" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <sui-checkbox label="是否统一管理" toggle v-model="singleRoom.isunimanage" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="是否有产证" toggle v-model="singleRoom.hasproperty" />
            </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <sui-checkbox label="是否入账" toggle v-model="singleRoom.inaccount" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'form-create',
    data() {
        return {
            disabled: false,
            zoomlevel: 14
        };
    },
    methods: {},
    created() {
        if(this.singleRoom.roomname==undefined)
        {
            this.singleRoom.roomname=""
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
