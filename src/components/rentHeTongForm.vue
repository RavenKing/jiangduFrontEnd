<template lang="html">
<div>
    <sui-form>
        <sui-form-fields inline>
            <sui-form-field style="width:33%">
                <label>出租方</label>
                <sui-input placeholder="出租方" v-model="singleEntry.rentowner" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33%">
                <label>出租方地址</label>
                <sui-input placeholder="出租方地址" v-model="singleEntry.rentaddress" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33%">
                <label>出租方联系人</label>
                <sui-input placeholder="出租方联系人" v-model="singleEntry.rentcontact" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
        </sui-form-fields>
        
        <sui-form-fields inline>
            <sui-form-field style="width:33%">
                <label>签约金额</label>
                <sui-input placeholder="签约金额" v-model="singleEntry.rent_amt" type="number" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33%">
                <label>增长规则</label>
                <sui-input placeholder="增长规则" v-model="singleEntry.rule" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <div :key="componentKey" v-for="(item, index) in singleEntry.priceinfo">
            <sui-form-fields inline style="position: relative;">
                <sui-form-field style="width:33%">
                    <label>面积</label>
                    <sui-input placeholder="面积" v-model="singleEntry.priceinfo[index].space" type="number" required :transparent="disabled" :readonly="disabled" />
                </sui-form-field>
                <sui-form-field style="width:33%">
                    <label>单价</label>
                    <sui-input placeholder="单价" v-model="singleEntry.priceinfo[index].price" type="number" :transparent="disabled" :readonly="disabled" />
                </sui-form-field>
                <sui-form-field style="width:33%">
                    <label>描述</label>
                    <sui-input placeholder="描述" v-model="singleEntry.priceinfo[index].pricename" type="text" :transparent="disabled" :readonly="disabled" />
                </sui-form-field>
                <span style="position:absolute;right:0;" v-show="!disabled">
                    <sui-button style="padding:6px;" circular icon="add" @click.prevent="addOneMore" v-show="index == singleEntry.priceinfo.length - 1" />
                    <sui-button style="padding:6px;" circular icon="minus" @click.prevent="deleteOne(index)" v-show="singleEntry.priceinfo.length > 1" />
                </span>
            </sui-form-fields>
        </div>
        
        <sui-form-fields inline>
            <sui-form-field style="width:50%">
                <label>起始时间</label>
                <datepicker style="margin-top:10px;" :value="singleEntry.starttime" v-model="singleEntry.starttime" :language="lang['zh']" :transparent="disabled" :readonly="disabled"></datepicker>
            </sui-form-field>
            <sui-form-field style="width:50%">
                <label>结束时间</label>
                <datepicker style="margin-top:10px;" :value="singleEntry.endtime" v-model="singleEntry.endtime" :language="lang['zh']" :transparent="disabled" :readonly="disabled"></datepicker>
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field style="width:50%">
                <label>出租方联系人电话</label>
                <sui-input placeholder="出租方联系人电话" v-model="singleEntry.rentmobile" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field style="width:50%">
                <label>出租方联系人职务</label>
                <sui-input placeholder="出租方联系人职务" v-model="singleEntry.title" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <!-- <sui-form-field>
                <label>出租方</label>
                <datepicker :value="singleEntry.appdate" v-model="singleEntry.appdate" :language="lang['zh']"></datepicker>
            </sui-form-field> -->
        </sui-form-fields>
        <sui-form-fields inline>
            <label>是否包含物业费</label>
            <sui-form-field>
                <sui-checkbox label="是" radio value="1" v-model="value2" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field>
                <sui-checkbox label="否" radio value="2" v-model="value2" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields inline>
            <sui-form-field style="width:33%">
                <label>总面积</label>
                <sui-input placeholder="总面积" v-model="total" :transparent="disabled" :readonly="disabled" />
            </sui-form-field>
            <sui-form-field style="width:33%">
                <label>总价</label>
                <sui-input placeholder="总价" v-model="totalPrice" :transparent="disabled" :readonly="disabled" />
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
    props: ["singleEntry", "mianji","disabled"],
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
        calculateTotal() {
            // this.total =
            //     this.checkValue(this.singleEntry.space1) +
            //     this.checkValue(this.singleEntry.space2) +
            //     this.checkValue(this.singleEntry.space4) +
            //     this.checkValue(this.singleEntry.carslot);
            // this.totalPrice =
            //     this.checkValue(this.singleEntry.price1) *
            //     this.checkValue(this.singleEntry.space1) +
            //     this.checkValue(this.singleEntry.price2) *
            //     this.checkValue(this.singleEntry.space2) +
            //     this.checkValue(this.singleEntry.price3) *
            //     this.checkValue(this.singleEntry.space3) +
            //     this.checkValue(this.singleEntry.price4) *
            //     this.checkValue(this.singleEntry.space4) +
            //     this.checkValue(this.singleEntry.price5) *
            //     this.checkValue(this.singleEntry.carslot);
            // console.log(this.$props);
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
        getRoomDataApi().then((data) => {
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
