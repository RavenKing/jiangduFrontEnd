<template lang="html">
<div>
    <sui-form>
        <sui-form-fields inline>
            <label for="roomtype">请选择房屋类型:</label>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <sui-checkbox radio name="type" label="自有房屋" value="1" v-model="singleRoom.roomtype" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox radio name="type" label="租赁房屋" value="2" v-model="singleRoom.roomtype" />
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field v-if="singleRoom.roomtype == '1'" class="width300">
                <label>选择房屋</label>
                <model-select :options="singleRoom.ziyousource" v-model="item" placeholder="select item" width="300px" @input="handleOnInput">
                </model-select>
                <!-- <sui-dropdown placeholder="选择房屋"  selection :options="singleRoom.ziyouroomoptions" v-model="singleRoom.room" /> -->
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field v-if="singleRoom.roomtype == '2'">
                <label>选择房屋</label>
                <sui-dropdown placeholder="选择房屋" selection :options="singleRoom.rentroomoptions" v-model="singleRoom.room" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field v-if="singleRoom.roomtype == '1'">
                <label>选择单位</label>
                <sui-dropdown placeholder="选择单位" selection :options="singleRoom.unitoptions" v-model="singleRoom.unit" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    ModelSelect
} from 'vue-search-select'

export default {
    props: ['singleRoom'],
    name: 'form-fenpei',
    components: {
        'model-select': ModelSelect
    },
    data() {
        return {
            disabled: false,
            zoomlevel: 14,
            item: "",
            roomoptions: [{
                    text: 'Male',
                    value: 1,
                },
                {
                    text: 'Female',
                    value: 2,
                },
            ],
        };
    },
    methods: {
        handleOnInput(props) {
            console.log(props);
            singleRoom.room = props;
        }
    },
    created() {
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
