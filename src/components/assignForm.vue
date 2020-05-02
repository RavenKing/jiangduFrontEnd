<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>unit_id</label>
                <sui-input placeholder="unit_id" v-model="singleAssignment.unit_id" :disabled="disabled"/>
            </sui-form-field>
            <sui-form-field>
                <label>space</label>
                <sui-input placeholder="space" v-model="singleAssignment.space" :disabled="disabled"/>
            </sui-form-field>
            
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    name: 'assign-contract',
    data() {
        return {
            disabled:false,
            singleAssignment: {
                open:false,
                title:"createForm",
                room_id:""
            }   
        };
    },
    methods:{
      createRoom(){console.log(this.singleAssignment.roomid);}

    }
};
</script>
