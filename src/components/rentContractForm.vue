<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>starttime</label>
                <sui-input placeholder="starttime" v-model="singleContract.starttime" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>endtime</label>
                <sui-input placeholder="endtime" v-model="singleContract.endtime" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>rentunit</label>
                <sui-input placeholder="rentunit" v-model="singleContract.rentunit" :disabled="disabled"/>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>owner</label>
                <sui-input placeholder="owner" v-model="singleContract.owner" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>amt</label>
                <sui-input placeholder="amt" v-model="singleContract.amt" :disabled="disabled"/>
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
