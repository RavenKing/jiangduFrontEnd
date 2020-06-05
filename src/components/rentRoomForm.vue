<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>所属区域</label>
                <sui-input placeholder="所属区域" v-model="singleRoom.area" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled" class="width600"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>结构类型</label>
                <sui-input placeholder="结构类型" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>

            <sui-form-field>
                <label>建筑类型</label>
                <sui-input placeholder="建筑类型" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>建筑面积</label>
                <sui-input placeholder="建筑面积" v-model="singleRoom.space" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'rentroom-form',
    data() {
        return {
            disabled:false,
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
                net_value: "",
                dep_rate: "",
                internal_info: "",
                cur_status: ""
            }
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
.width600{
    width:600px!important;
}
</style>