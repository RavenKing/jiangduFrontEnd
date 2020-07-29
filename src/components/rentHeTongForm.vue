/* eslint-disable vue/valid-v-for */
<template lang="html">
<div>
    <sui-form>
        <sui-form-fields inline>
            <label>出租方</label>
            <sui-form-field>
                <sui-input placeholder="出租方" v-model="singleEntry.rentowner" />
            </sui-form-field>
            <label>出租方地址</label>
            <sui-form-field>
                <sui-input placeholder="出租方地址" v-model="singleEntry.rentaddress" />
            </sui-form-field>
            <label>出租方联系人</label>
            <sui-form-field>
                <sui-input placeholder="出租方联系人" v-model="singleEntry.rentcontact" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;" inline>
            <label>出租方联系人电话</label>
            <sui-form-field>
                <sui-input placeholder="出租方联系人电话" v-model="singleEntry.rentmobile" />
            </sui-form-field>
            <label>出租方联系人职务</label>
            <sui-form-field>
                <sui-input placeholder="出租方联系人职务" v-model="singleEntry.title" />
            </sui-form-field>
            <!-- <sui-form-field>
                <label>出租方</label>
                <datepicker :value="singleEntry.appdate" v-model="singleEntry.appdate" :language="lang['zh']"></datepicker>
            </sui-form-field> -->
        </sui-form-fields>
        <sui-form-fields inline>
            <label>签约金额</label>
            <sui-form-field>
                <sui-input placeholder="签约金额" v-model="singleEntry.rent_amt" type="number" />
            </sui-form-field>
            <sui-form-field>
                第
                <sui-input v-model="singleEntry.year" transparent class="width30" />年
            </sui-form-field>
            <sui-form-field>
                按
                <sui-input v-model="singleEntry.rate" transparent class="width30" />%增长
            </sui-form-field>
        </sui-form-fields>
        <div :key="componentKey" v-for="(item, index) in singleEntry.priceinfo">
            <sui-form-fields inline style="position: relative;">
                <label>面积</label>
                <sui-form-field>
                    <sui-input placeholder="面积" v-model="singleEntry.priceinfo[index].space" type="number" required />
                </sui-form-field>
                <label>单价</label>
                <sui-form-field>
                    <sui-input placeholder="单价" v-model="singleEntry.priceinfo[index].price" type="number" />
                </sui-form-field>
                <label>性质</label>
                <sui-form-field>
                    <sui-dropdown placeholder="性质" selection :options="xingzhiOptions" v-model="singleEntry.priceinfo[index].pricename" />
                </sui-form-field>
                <span>
                    <sui-button style="padding:6px;" circular icon="add" @click.prevent="addOneMore" />
                    <sui-button style="padding:6px;" circular icon="minus" @click.prevent="deleteOne(index)" v-show="singleEntry.priceinfo.length > 1" />
                    </span>
            </sui-form-fields>
        </div>

        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;" inline>
            <label>起始时间</label>
            <sui-form-field>
                <datepicker style="margin-top:10px;" :value="singleEntry.starttime" v-model="singleEntry.starttime" :language="lang['zh']" :transparent="disabled"></datepicker>
            </sui-form-field>
            <label>结束时间</label>
            <sui-form-field>
                <datepicker style="margin-top:10px;" :value="singleEntry.endtime" v-model="singleEntry.endtime" :language="lang['zh']" :transparent="disabled"></datepicker>
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields inline>
            <label>是否包含物业费</label>
            <sui-form-field>
                <sui-checkbox label="是" radio value="1" v-model="value2" :transparent="disabled" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="否" radio value="2" v-model="value2" :transparent="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <!-- <sui-form-fields inline>
            <sui-form-field>
                <label>总面积</label>
                <sui-input placeholder="总面积" v-model="total"  />
            </sui-form-field>
            <sui-form-field>
                <label>总价</label>
                <sui-input placeholder="总价" v-model="totalPrice"  />
            </sui-form-field>
        </sui-form-fields> -->
    </sui-form>
</div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import {
    getRoomDataApi,
    getBuildingListApi,
    getBuildingFloorApi,
} from "@/api/roomDataAPI";
export default {
    name: "weixiu-form",
    components: {
        Datepicker,
    },
    props: ["singleEntry", "mianji", "disabled"],
    data() {
        return {
            componentKey: 0,
            options: [],
            louOptions: [],
            floorOptions: [],
            floorLoading: false,
            louLoading: false,
            lang: lang,
            total: 0,
            value: "1",
            totalPrice: 0,
            value2: "",
            xingzhiOptions: [{
                text: "办公用房",
                value: "办公用房"
            }, {
                text: "停车位",
                value: "停车位"
            }, {
                text: "仓库",
                value: "仓库"
            }, {
                text: "其他",
                value: "其他"
            }, ]
        };
    },
    methods: {
        deleteOne(index) {
            this.singleEntry.priceinfo.splice(index, 1);
            this.componentKey++;
        },
        addOneMore() {
            this.singleEntry.priceinfo.push({
                pricename: "",
                price: "",
                space: "",
            });

            this.componentKey++;
        },
        checkValue(value) {
            if (value) {
                return parseFloat(value);
            } else {
                return 0;
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
                        });
                    });
                    this.floorLoading = false;
                });
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
                        });
                    });
                    this.louLoading = false;
                });
            }
        },
    },
    created() {
        this.disabled = true;
        if (!this.singleEntry.priceinfo || this.singleEntry.priceinfo.length == 0) {
            this.singleEntry.priceinfo = [{
                space: "",
                price: "",
                pricename: "",
            }, ];
        }

        this.total = 0;
        this.totalPrice = 0;
        getRoomDataApi({}).then((data) => {
            //this.localData = data.data.data;
            data.data.data.map((one) => {
                this.options.push({
                    text: one.roomname,
                    value: one.id,
                });
            });
        });
    },
};
</script>

<style>
.ui.form .field label {
    display: block !important;
    margin: 0 0 .28571429rem 0 !important;
    color: rgba(0, 0, 0, .87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
}

.width30 {
    width: 30px !important;
}
</style>
