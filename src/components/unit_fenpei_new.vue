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
            <sui-form-field v-if="singleRoom.roomtype == '1'" class="width300">
                <label>房</label>
                <sui-dropdown placeholder="选择房" selection :options="louOptions" v-model="singleRoom.building_id" @input="setFloor()" :loading="louLoading" :disabled="louLoading" />

            </sui-form-field>
            <sui-form-field v-if="singleRoom.roomtype == '1'" class="width300">
                <label>楼</label>
                <sui-dropdown floating direction="upward" placeholder="选择楼" selection :options="floorOptions" v-model="singleRoom.floor_id" :loading="floorLoading" :disabled="floorLoading" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field v-if="singleRoom.roomtype == '2'">
                <label>选择租赁房屋</label>
                <model-select :options="singleRoom.rentroomoptions" v-model="itemrent" placeholder="select item" width="300px" @input="handleOnInput">
                </model-select>
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
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
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
            floorLoading: false,
            louLoading: false,
            louOptions: [],
            floorOptions: [],
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
            this.singleRoom.room_id = props;
            this.setFang();
        },
        setFloor() {
            console.log(this.singleRoom.building_id);
            this.floorOptions = [];
            this.floorLoading = true;
            if (this.singleRoom.building_id != null) {
                getBuildingFloorApi(this.singleRoom).then((result) => {
                    var floors = result.data.data;
                    floors.map((floor) => {
                        this.floorOptions.push({
                            text: floor.name,
                            value: floor.id,
                        })
                    });
                    this.floorLoading = false;
                })
            }
            this.louLoading = false;
        },
        setFang() {
            console.log(this.singleRoom.room_id);
            this.louOptions = [];
            this.louLoading = true;
            if (this.singleRoom.room_id != null) {
                getBuildingListApi(this.singleRoom).then((data) => {
                    data.data.data.map((one) => {
                        this.louOptions.push({
                            text: one.name,
                            value: one.id,
                        })
                    });
                    this.louLoading = false;

                })
            }

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
