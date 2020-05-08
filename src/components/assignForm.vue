<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field>
                <label>选择处级</label>
                <sui-dropdown placeholder="选择处级" selection :options="options" v-model="singleAssignment.unit_id" />
            </sui-form-field>
            <sui-form-field>
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleAssignment.space" />
            </sui-form-field>

        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    getUnitApi
} from "@/api/roomDataAPI";
export default {
    name: 'assign-contract',
    data() {
        return {
            options: [],
            singleAssignment: {
                open: false,
                title: "createForm",
                room_id: ""
            }
        };
    },
    methods: {},
    created() {
        getUnitApi().then((data) => {
            //this.localData = data.data.data;
            console.log(data.data.data);
            data.data.data.map((one) => {
                this.options.push({
                    text: one.name,
                    value: one.id,
                })
            });

            console.log(this.options);
        });
    }
};
</script>
