<template lang="html">
<div>
    <sui-segment style="margin-top:15px;">
    <sui-form>
        <sui-form-fields inline>
            <label>领导级别</label>
            <sui-form-field>
                <sui-dropdown placeholder="选择领导级别" selection :options="leaderLevel" v-model="singleRoom.leader" />
            </sui-form-field>

            
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>房屋面积</label>
                <sui-input  v-model="singleRoom.space" :disabled="disabled" width="800px"/>
            </sui-form-field inline>
            <sui-form-field inline>
                <label>房屋号</label>
                <sui-input  v-model="singleRoom.room" :disabled="disabled" width="800px"/>
            </sui-form-field inline>
        </sui-form-fields>
    </sui-form>
    </sui-segment>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'leader-form',
    components: {
    },
    data() {
        return {
            leaderLevel: [{
                text: "正科",
                value: "正科"
            }, {
                text: "副处",
                value: "副处"
            }],
            disabled: false
        };
    },
    methods: {
    },
    mounted() {
        console.log(this.singleRoom);
        if (this.singleRoom.roomname == undefined) {
            this.singleRoom.roomname = ""
        }
    }
};
</script>

<style>
.width300 {
    width: 300px !important
}
</style>
