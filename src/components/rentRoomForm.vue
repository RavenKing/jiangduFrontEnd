<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>权证号</label>
                <sui-input placeholder="权证号" v-model="singleRoom.certid" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>权证人</label>
                <sui-input placeholder="权证人" v-model="singleRoom.owner" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>房屋地址</label>
                <sui-input placeholder="房屋地址" v-model="singleRoom.address" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>房屋名称</label>
                <sui-input placeholder="房屋名称" v-model="singleRoom.roomname" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>房屋用途</label>
                <sui-input placeholder="房屋用途" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房屋面积</label>
                <sui-input placeholder="房屋面积" v-model="singleRoom.space" :disabled="disabled"/>
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
    methods:{
      createRoom(){console.log(this.singleRoom.roomid);}

    }
};
</script>
