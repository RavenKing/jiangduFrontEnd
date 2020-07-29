<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>选择</label>
                <sui-dropdown placeholder="选择房屋" selection :options="options" v-model="singleContract.room_id" />
            </sui-form-field>
            <sui-form-field>
                <label>起始</label>
                <datepicker :value="singleContract.starttime" v-model="singleContract.starttime" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field>
                <label>结束时间</label>
                <datepicker :value="singleContract.endtime" v-model="singleContract.endtime" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field>
                <label>出租单位</label>
                <sui-input placeholder="出租单位" v-model="singleContract.rentunit" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>手机号</label>
                <sui-input placeholder="手机号" v-model="singleContract.mobile" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>负责人</label>
                <sui-input placeholder="负责人" v-model="singleContract.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>金额</label>
                <sui-input placeholder="金额" v-model="singleContract.amt" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    getRoomDataApi,
    getRentRoomDataApi
} from "@/api/roomDataAPI";
export default {
    name: 'rentroom-contract',
    components: {
        Datepicker
    },
    data() {
        return {
            lang: lang,
            disabled: false,
            type: 'Room',
            options: [],
            singleContract: {
                open: false,
                title: "createForm",
                room_id: null,
                amt: 0,
                owner: "",
                rentunit: "",
                starttime: "",
                endtime: ""
            }
        };
    },
    methods: {
        updateData() {
            if (this.type == 'Room') {
                console.log(this.type);
                getRoomDataApi({}).then((data) => {
                    //this.localData = data.data.data;
                    data.data.data.map((one) => {
                        this.options.push({
                            text: one.roomname,
                            value: one.room_id,
                        })
                    });
                });
            } else {
                getRentRoomDataApi({}).then((data) => {
                    //this.localData = data.data.data;
                    this.options = [];
                    data.data.data.map((one) => {
                        this.options.push({
                            text: one.roomname,
                            value: one.room_id,
                        })
                    });
                });

            }
        }
    },
    mounted() {
        if (this.type == 'Room') {
            console.log(this.type);
            getRoomDataApi({}).then((data) => {
                //this.localData = data.data.data;
                console.log(data.data.data);
                data.data.data.map((one) => {
                    this.options.push({
                        text: one.roomname,
                        value: one.room_id,
                    })
                });
            });
        } else {
            getRentRoomDataApi({}).then((data) => {
                //this.localData = data.data.data;
                console.log(data.data.data);
                data.data.data.map((one) => {
                    this.options.push({
                        text: one.roomname,
                        value: one.room_id,
                    })
                });
            });

        }
    },
    created() {

    }
};
</script>
