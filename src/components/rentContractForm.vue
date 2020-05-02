<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>起始时间</label>
                <sui-input placeholder="起始时间" v-model="singleContract.starttime" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>结束时间</label>
                <sui-input placeholder="结束时间" v-model="singleContract.endtime" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>出租单位</label>
                <sui-input placeholder="出租单位" v-model="singleContract.rentunit" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>负责人</label>
                <sui-input placeholder="负责人" v-model="singleContract.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>金额</label>
                <sui-input placeholder="金额" v-model="singleContract.amt" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>      
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'rentroom-contract',
    data() {
        return {
            disabled:false,
            singleContract: {
                open:false,
                title:"createForm",
                room_id:"",
                amt:0,
                owner:"",
                rentunit:"",
                starttime:"",
                endtime:""
            }   
        };
    },
    methods:{
      createRoom(){console.log(this.singleContract.roomid);}

    }
};
</script>
