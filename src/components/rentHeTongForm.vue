/* eslint-disable vue/valid-v-for */
<template lang="html">
<div>
    <sui-form>
        <sui-form-fields inline>
            <label>出租方</label>
            <sui-form-field>
                <sui-input placeholder="出租方" v-model="singleEntry.rentowner" />
            </sui-form-field>
            <label>法定代表人</label>
            <sui-form-field>
                <sui-input placeholder="法定代表人" v-model="singleEntry.title" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;" inline>
            <label>出租方地址</label>
            <sui-form-field>
                <sui-input placeholder="出租方地址" v-model="singleEntry.rentaddress" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;" inline>
            <label>联系人</label>
            <sui-form-field>
                <sui-input placeholder="联系人" v-model="singleEntry.rentcontact" />
            </sui-form-field>
            <label>联系人电话</label>
            <sui-form-field>
                <sui-input placeholder="联系人电话" v-model="singleEntry.rentmobile" />
            </sui-form-field>
            <!-- <sui-form-field>
                <label>出租方</label>
                <datepicker :value="singleEntry.appdate" v-model="singleEntry.appdate" :language="lang['zh']"></datepicker>
            </sui-form-field> -->
        </sui-form-fields>
        <sui-form-fields inline>
            <label>年租金(元)</label>
            <sui-form-field>
                <sui-input placeholder="年租金(元)" v-model="singleEntry.rent_amt" type="number" disabled />
            </sui-form-field>
            <label>增长率</label>
            <sui-form-field>
                <sui-checkbox toggle v-model="singleEntry.is_add" />
            </sui-form-field>

            <sui-form-field v-show="singleEntry.is_add">
                第
                <sui-input v-model="singleEntry.year" transparent class="width30" />年
            </sui-form-field>
            <sui-form-field v-show="singleEntry.is_add">
                按
                <sui-input v-model="singleEntry.rate" transparent class="width30" />%增长
            </sui-form-field>
        </sui-form-fields>
        <div v-for="(item, index) in singleEntry.priceinfo" :key="item[index]">
            <sui-form-fields inline style="position: relative;">
                <sui-form-field>
                    <sui-dropdown placeholder="性质" selection :options="xingzhiOptions" v-model="singleEntry.priceinfo[index].pricename" />
                </sui-form-field>
                <label v-show="singleEntry.priceinfo[index].pricename!='停车位'">面积</label>
                <sui-form-field v-show="singleEntry.priceinfo[index].pricename!='停车位'">
                    <sui-input placeholder="面积" v-model="singleEntry.priceinfo[index].space" type="number" required />
                </sui-form-field>
                <label v-show="singleEntry.priceinfo[index].pricename!='停车位'"> 单价</label>
                <sui-form-field v-show="singleEntry.priceinfo[index].pricename!='停车位'">
                    <sui-input placeholder="单价" v-model="singleEntry.priceinfo[index].price" type="number" @change="caluculateTotal" />元/天/m²
                </sui-form-field>

                <label v-show="singleEntry.priceinfo[index].pricename=='停车位'">停车位</label>
                <sui-form-field v-show="singleEntry.priceinfo[index].pricename=='停车位'">
                    <sui-input placeholder="个" v-model="singleEntry.priceinfo[index].space" type="number" required />
                </sui-form-field>
                <label v-show="singleEntry.priceinfo[index].pricename=='停车位'">单价</label>
                <sui-form-field v-show="singleEntry.priceinfo[index].pricename=='停车位'">
                    <sui-input placeholder="单价" v-model="singleEntry.priceinfo[index].price" type="number" @change="caluculateTotal" />元/月/个
                </sui-form-field>
                <span>
                    <sui-button style="padding:6px;" circular icon="add" @click.prevent="addOneMore" />
                    <sui-button style="padding:6px;" circular icon="minus" @click.prevent="deleteOne(index)" v-show="singleEntry.priceinfo.length > 1" />
                </span>
            </sui-form-fields>
            <sui-form-fields inline style="position: relative;">
                <label v-show="singleEntry.priceinfo[index].pricename=='其他'">备注</label>
                <sui-form-field v-show="singleEntry.priceinfo[index].pricename=='其他'">
                    <sui-input placeholder="备注" v-model="singleEntry.priceinfo[index].memo" />
                </sui-form-field>
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
                <sui-checkbox label="是" radio value="1" v-model="singleEntry.space2" :transparent="disabled" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="否" radio value="0" v-model="singleEntry.space2" :transparent="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <div v-show="singleEntry.space2=='0'">
                <sui-form-fields inline style="position: relative;">
                    <label>物业费(每年)</label>
                    <sui-form-field>
                        <sui-input placeholder="物业费" v-model="wuyefei" type="number" disabled />
                    </sui-form-field>
                    <label>面积</label>
                    <sui-form-field>
                        <sui-input placeholder="面积" v-model="singleEntry.spaceJianzhu" type="number" disabled />
                    </sui-form-field>
                    <label>单价</label>
                    <sui-form-field>
                        <sui-input placeholder="单价" v-model="singleEntry.price1" type="number" @change="caluculateTotal" />月/m²
                    </sui-form-field>
                </sui-form-fields>
            </div>
        </sui-form-fields>
        <sui-form-fields inline>
            <label>备注</label>
            <sui-form-field style="width:90%;">
                <textarea placeholder="备注" v-model="singleEntry.space4" />
                </sui-form-field>
        </sui-form-fields>
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
            wuyefei: 0,
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
        caluculateTotal() {
            var base = this.singleEntry.priceinfo;
            this.singleEntry.rent_amt = 0;
            if (this.singleEntry.space2 != "1" && this.singleEntry.price1 > 0) {
                this.singleEntry.rent_amt = this.singleEntry.spaceJianzhu * this.singleEntry.price1*12;
               this.wuyefei = this.singleEntry.spaceJianzhu * this.singleEntry.price1*12;
            }
            console.log(this.singleEntry.rent_amt);
            if (base.length > 0) {
                base.map((one) => {
                    if (one.pricename == "停车位") {
                        this.singleEntry.rent_amt += one.price * one.space * 12;
                    } else {
                        this.singleEntry.rent_amt += one.price * one.space * 365;
                    }
                });
            }
        },
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
        if (this.singleEntry.space2 != "1" && this.singleEntry.price1 > 0) {
            this.wuyefei = this.singleEntry.spaceJianzhu * this.singleEntry.price1*12;
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
