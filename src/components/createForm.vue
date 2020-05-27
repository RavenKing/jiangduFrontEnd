<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>所属区域</label>
                <sui-input placeholder="所属区域" v-model="singleRoom.area" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建造年代</label>
                <sui-input placeholder="建造年代" v-model="singleRoom.age" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋id</label>
                <sui-input placeholder="房屋id" v-model="singleRoom.room_id" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>结构类型</label>
                <sui-input placeholder="结构类型" v-model="singleRoom.jiegou" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑类型</label>
                <sui-input placeholder="建筑类型" v-model="singleRoom.jianzhu" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建筑类型</label>
                <sui-input placeholder="建筑类型" v-model="singleRoom.optional" :disabled="disabled" />
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
