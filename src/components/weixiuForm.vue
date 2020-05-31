<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>申报单号</label>
                <sui-input placeholder="申报单号" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>申报日期</label>
                <sui-input placeholder="申报日期" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>联系人</label>
                <sui-input placeholder="联系人" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>联系电话</label>
                <sui-input placeholder="联系电话" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>维修理由</label>
                <textarea />
                </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <label>房屋</label>
                <sui-input placeholder="房屋" v-model="singleRoom.certid" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>房</label>
                <sui-input placeholder="房" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>楼</label>
                <sui-input placeholder="楼" v-model="singleRoom.owner" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>

            <sui-form-field>
                <label>房屋结构</label>
                <sui-input placeholder="房屋结构" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>建成时间</label>
                <sui-input placeholder="建成时间" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <label>产权单位</label>
                <sui-input placeholder="产权单位" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>产权证号</label>
                <sui-input placeholder="产权证号" v-model="singleRoom.roomname" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'weixiu-form',
    data() {
        return {
            disabled: false,
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
