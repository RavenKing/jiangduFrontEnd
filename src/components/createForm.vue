<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>Room</label>
                <sui-input placeholder="roomid" v-model="singleRoom.room_id" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>certid</label>
                <sui-input placeholder="certid" v-model="singleRoom.cert_id" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>owner</label>
                <sui-input placeholder="owner" v-model="singleRoom.owner" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>address</label>
                <sui-input placeholder="address" v-model="singleRoom.address" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>roomname</label>
                <sui-input placeholder="roomname" v-model="singleRoom.room_name" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>usage</label>
                <sui-input placeholder="usage" v-model="singleRoom.usage" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>space</label>
                <sui-input placeholder="space" v-model="singleRoom.space" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>optional</label>
                <sui-input placeholder="optional" v-model="singleRoom.optional" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>build_date</label>
                <sui-input placeholder="build_date" v-model="singleRoom.build_date" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>origin_value</label>
                <sui-input placeholder="origin_value" v-model="singleRoom.origin_value" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>room_value</label>
                <sui-input placeholder="room_value" v-model="singleRoom.room_value" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>dep</label>
                <sui-input placeholder="dep" v-model="singleRoom.dep" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>net_value</label>
                <sui-input placeholder="net_value" v-model="singleRoom.net_value" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>optional</label>
                <sui-input placeholder="dep_rate" v-model="singleRoom.dep_rate" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>internal_info</label>
                <sui-input placeholder="internal_info" v-model="singleRoom.internal_info" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>cur_status</label>
                <sui-input placeholder="cur_status" v-model="singleRoom.cur_status" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'form-create',
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
