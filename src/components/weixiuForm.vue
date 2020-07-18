<template lang="html">
<div>
    <sui-form class="marginBottom30">
        <sui-form-fields>
            <sui-form-field>
                <label>申报单号</label>
                <sui-input placeholder="申报单号" v-model="singleEntry.appid" />
            </sui-form-field>
            <sui-form-field>
                <label>申报日期</label>
                <datepicker :value="singleEntry.appdate" v-model="singleEntry.appdate" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field :disabled="mode=='edit'">
                <label>联系人</label>
                <sui-input placeholder="联系人" v-model="singleEntry.contract" />
            </sui-form-field>
            <sui-form-field :disabled="mode=='edit'">
                <label>联系电话</label>
                <sui-input placeholder="联系电话" v-model="singleEntry.tel" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>计划维修时间</label>
                <datepicker :value="singleEntry.starttime" v-model="singleEntry.starttime" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field>
                <label>维修金额</label>
                <sui-input placeholder="维修金额" v-model="singleEntry.repair_amt" />
            </sui-form-field>
            <sui-form-field disabled>
                <label>申报时间</label>

                <sui-input placeholder="申报时间" v-model="singleEntry.created_on" />
            </sui-form-field>
            <sui-form-field disabled>
                <label>申报单位</label>
                <sui-input placeholder="申报单位" v-model="singleEntry.unit_name" />

                <!-- <model-select :options="unitoptions" v-model="singleEntry.unit_id" placeholder="选择单位" @input="changeUnit">
                </model-select> -->
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%">
                <label>维修理由</label>
                <textarea v-model="singleEntry.reason" />
                </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field :disabled="mode=='edit'">
                <label>房屋</label>
             <sui-dropdown placeholder="选择房屋" selection :options="options" v-model="singleEntry.room_id"  @input="setFang()"/>

            </sui-form-field >
            <sui-form-field :disabled="mode=='edit'">
                <label>房</label>
                <sui-dropdown placeholder="选择房" selection :options="louOptions" v-model="singleEntry.building_id"  @input="setFloor()"  :loading="louLoading" :disabled="louLoading" />

            </sui-form-field>
            <sui-form-field :disabled="mode=='edit'">
                <label>楼</label>
              <sui-dropdown  floating direction="upward" placeholder="选择楼" selection :options="floorOptions" v-model="singleEntry.floor_id"  :loading="floorLoading" :disabled="floorLoading"/>
            </sui-form-field>
        </sui-form-fields>

        <!-- <sui-form-fields> -->
<!-- 
            <sui-form-field>
                <label>房屋结构</label>
                <sui-input placeholder="房屋结构" v-model="singleEntry.roomname"/>
            </sui-form-field>
            <sui-form-field>
                <label>建成时间</label>
                <sui-input placeholder="建成时间" v-model="singleEntry.roomname" />
            </sui-form-field>
        </sui-form-fields>
                <sui-form-fields>
            <sui-form-field>
                <label>产权单位</label>
                <sui-input placeholder="产权单位" v-model="singleEntry.roomname"/>
            </sui-form-field>
            <sui-form-field>
                <label>产权证号</label>
                <sui-input placeholder="产权证号" v-model="singleEntry.roomname" />
            </sui-form-field>
        </sui-form-fields> -->
    </sui-form>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi,
    getUnitApi
} from "@/api/roomDataAPI";
export default {
    name: 'weixiu-form',
    components: {
        Datepicker,
    },
    props: ['singleEntry', 'mode'],
    data() {
        return {
            options: [],
            louOptions: [],
            floorOptions: [],
            floorLoading: false,
            louLoading: false,
            lang: lang,
            disabled: false,
            unitoptions: []
        };
    },
    methods: {
        changeUnit(props) {
            console.log(props);
            this.unitoptions.map((unit) => {
                if (unit.value == props) {
                    this.singleEntry.unit_name = unit.text;
                }
            })
        },
        setFloor() {
            console.log(this.singleEntry.building_id);
            this.floorOptions = [];
            this.floorLoading = true;
            if (this.singleEntry.building_id != null) {
                getBuildingFloorApi(this.singleEntry).then((result) => {
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
            console.log(this.singleEntry.room_id);
            this.louOptions = [];
            this.louLoading = true;
            if (this.singleEntry.room_id != null) {
                getBuildingListApi(this.singleEntry).then((data) => {
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
    mounted() {
        getUnitApi().then((data) => {
            var res_data = data.data.data
            for (var i = res_data.length - 1; i >= 0; i--) {
                this.unitoptions.push({
                    'text': res_data[i]['name'],
                    'value': res_data[i]['id']
                })
            }
        });
        getRoomDataApi().then((data) => {
            //this.localData = data.data.data;
            data.data.data.map((one) => {
                this.options.push({
                    text: one.roomname,
                    value: one.id,
                })
            });
        });
    }
};
</script>

<style>
.marginBottom30 {
    margin-bottom: 15px;
}

.ui.modal>.actions {
    text-align: center;
}

.width300 {
    width: 300px !important
}
</style>
