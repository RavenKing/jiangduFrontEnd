<template lang="html">
<div>
    <sui-form>


        <sui-form-fields inline>
            <sui-form-field>
                <label>出租方:</label>
                <sui-input placeholder="出租方" v-model="singleEntry.rentowner" />
            </sui-form-field>
            <sui-form-field>
                <label>出租方地址:</label>
                <sui-input placeholder="出租方地址" v-model="singleEntry.rentaddress" />
            </sui-form-field>
            <sui-form-field>
                <label>出租方联系人:</label>
                <sui-input placeholder="出租方联系人" v-model="singleEntry.rentcontact" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field>
                <label>出租方联系人电话:</label>
                <sui-input placeholder="出租方联系人电话" v-model="singleEntry.rentmobile" />
            </sui-form-field>
            <sui-form-field>
                <label>出租方联系人职务:</label>
                <sui-input placeholder="出租方联系人职务" v-model="singleEntry.title" />
            </sui-form-field>
            <!-- <sui-form-field>
                <label>出租方</label>
                <datepicker :value="singleEntry.appdate" v-model="singleEntry.appdate" :language="lang['zh']"></datepicker>
            </sui-form-field> -->
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field>
                <label>签约金额:</label>
                <sui-input placeholder="签约金额" v-model="singleEntry.rent_amt" type="number" />
            </sui-form-field>
            <sui-form-field>
                <label>增长规则:</label>
                <sui-input placeholder="增长规则" v-model="singleEntry.rule" />
            </sui-form-field>
        </sui-form-fields>
        <div v-show="mianji==2">
            <sui-form-fields inline>
                <sui-form-field>
                    <label>办公面积:</label>
                    <sui-input placeholder="办公面积" v-model="singleEntry.space1" type="number" required />
                </sui-form-field>
                <sui-form-field>
                    <label>单价:</label>
                    <sui-input placeholder="办公面积单价" v-model="singleEntry.price1" type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields inline>
                <sui-form-field>
                    <label>仓库面积:</label>
                    <sui-input placeholder="仓库面积" v-model="singleEntry.space2" type="number" />
                </sui-form-field>
                <sui-form-field>
                    <label>单价:</label>
                    <sui-input placeholder="仓库面积单价" v-model="singleEntry.price2" type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields inline>
                <sui-form-field>
                    <label>场地面积:</label>
                    <sui-input placeholder="场地面积" v-model="singleEntry.space3" type="number" />
                </sui-form-field>
                <sui-form-field>
                    <label>单价:</label>
                    <sui-input placeholder="场地面积单价" v-model="singleEntry.price3" type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields inline>
                <sui-form-field>
                    <label>其他面积:</label>
                    <sui-input placeholder="其他面积" v-model="singleEntry.space4" type="number" />
                </sui-form-field>
                <sui-form-field>
                    <label>单价:</label>
                    <sui-input placeholder="其他面积单价" v-model="singleEntry.price4" type="number" />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-fields inline>
                <sui-form-field>
                    <label>车位个数</label>
                    <sui-input placeholder="车位个数" v-model="singleEntry.carslot" type="number" />
                </sui-form-field>
                <sui-form-field>
                    <label>单价</label>
                    <sui-input placeholder="单价" v-model="singleEntry.price5" type="number" />
                </sui-form-field>
            </sui-form-fields>
        </div>
        <sui-form-fields inline>
            <sui-form-field>
                <label>起始时间:</label>
                <datepicker :value="singleEntry.starttime" v-model="singleEntry.starttime" :language="lang['zh']"></datepicker>
            </sui-form-field>
            <sui-form-field>
                <label>结束时间:</label>
                <datepicker :value="singleEntry.endtime" v-model="singleEntry.endtime" :language="lang['zh']"></datepicker>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <label>是否包含物业费:</label>
            <sui-form-field>
                <sui-checkbox label="是" radio value="1" v-model="value2" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="否" radio value="2" v-model="value2" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field>
                <label>总面积</label>
                <sui-input placeholder="总面积" v-model="total" />
            </sui-form-field>
            <sui-form-field>
                <label>总价</label>
                <sui-input placeholder="总价" v-model="totalPrice" />
            </sui-form-field>
            <sui-button animated="vertical" @click.prevent="calculateTotal">
                <sui-button-content hidden>刷新</sui-button-content>
                <sui-button-content visible>
                    <sui-icon name="refresh" />
                </sui-button-content>
            </sui-button>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from "vuejs-datepicker/src/locale";
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi
} from "@/api/roomDataAPI";
export default {
    name: 'weixiu-form',
    components: {
        Datepicker
    },
    props: ['singleEntry','mianji'],
    data() {
        return {
            options: [],
            louOptions: [],
            floorOptions: [],
            floorLoading: false,
            louLoading: false,
            lang: lang,
            disabled: false,
            total: 0,
            value: "1",
            totalPrice: 0
        };
    },
    methods: {
        calculateTotal() {
            this.total = this.checkValue(this.singleEntry.space1) + this.checkValue(this.singleEntry.space2) + this.checkValue(this.singleEntry.space4) + this.checkValue(this.singleEntry.carslot);
            this.totalPrice = this.checkValue(this.singleEntry.price1) * this.checkValue(this.singleEntry.space1) + this.checkValue(this.singleEntry.price2) * this.checkValue(this.singleEntry.space2) + this.checkValue(this.singleEntry.price3) * this.checkValue(this.singleEntry.space3) + this.checkValue(this.singleEntry.price4) * this.checkValue(this.singleEntry.space4) + this.checkValue(this.singleEntry.price5) * this.checkValue(this.singleEntry.carslot);
            console.log(this.$props);
        },
        checkValue(value) {
            if (value) {
                return parseFloat(value);
            } else {
                return 0
            }
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
        if (this.singleEntry.space2 != null) {
            this.value = "2";
        } else {
            this.value = "1"
        }
        this.total = 0;
        this.totalPrice = 0;
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
