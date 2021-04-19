<template lang="html">
<div>
    <sui-form>
        <div :key="componentKey">
            <!-- <sui-message v-show="singleEntry.statusShow">
                <sui-message-header>注意</sui-message-header>
                <sui-message-list>
                    <sui-message-item v-if="singleEntry.statusText">
                    </sui-message-item>
                </sui-message-list>
            </sui-message> -->
        </div>
        <sui-form-fields>
            <sui-form-field required>
                <label>房间号</label>
                <sui-input placeholder="房间号" v-model="assignEntry.roomnumber" :disabled="singleEntry.status" required />
            </sui-form-field>
            <sui-form-field required>
                <label>房间名字</label>
                <sui-input placeholder="房间名字" v-model="assignEntry.roomname" :disabled="singleEntry.status" required />
            </sui-form-field>
            <sui-form-field>
                <label>备注</label>
                <sui-input placeholder="备注" v-model="assignEntry.beizhu" :disabled="singleEntry.status" />
            </sui-form-field>
            <sui-form-field>
                <label>面积</label>
                <sui-input placeholder="面积" v-model="singleEntry.space" type="number" disabled />
            </sui-form-field>
            <sui-form-field>
                <label>房间用途</label>
                <sui-dropdown placeholder="房间用途" selection :options="bangongOptions" v-model="singleEntry.type" @input="changeType" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleEntry.type=='leader'">
            <sui-form-field>
                <label>局级</label>
                <sui-input placeholder="局级" v-model="assignEntry.juji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" default="0" />
            </sui-form-field>
            <sui-form-field>
                <label>副局级</label>
                <sui-input placeholder="副局级" v-model="assignEntry.fujuji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" default="0" />
            </sui-form-field>
            <sui-form-field>
                <label>处级</label>
                <sui-input placeholder="处级" v-model="assignEntry.chuji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" default="0" />
            </sui-form-field>
            <sui-form-field>
                <label>副处级</label>
                <sui-input placeholder="副处级" v-model="assignEntry.fuchuji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" default="0" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleEntry.type=='leader'||singleEntry.type=='bangong'">
            <sui-form-field>
                <label>科级</label>
                <sui-input placeholder="科级" v-model="assignEntry.keji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" />
            </sui-form-field>
            <sui-form-field>
                <label>副科级</label>
                <sui-input placeholder="副科级" v-model="assignEntry.fukeji" type="number" :disabled="singleEntry.status" @change="caluculateTotal" />
            </sui-form-field>
            <sui-form-field>
                <label>科员</label>
                <sui-input placeholder="科员" v-model="assignEntry.keyuan" type="number" :disabled="singleEntry.status" @change="caluculateTotal" />
            </sui-form-field>
            <sui-form-field>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="assignEntry.qita" type="number" :disabled="singleEntry.status" @change="caluculateTotal" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import {
    notifySomething
} from "@/util/utils";
import constants from "@/util/constants";
import {
    changeRoomTypeApi
} from "@/api/roomDataAPI";
export default {
    name: 'assign-keji',
    props: ["floor_id", "singleEntry", "assignEntry"],
    data() {
        return {
            componentKey: 1,
            bangongOptions: [{
                    text: "办公",
                    value: "bangong"
                },
                {
                    text: "业务",
                    value: "yewuyongfang"
                },
                {
                    text: "附属",
                    value: "fushu"
                },
                {
                    text: "领导",
                    value: "leader"
                },
                {
                    text: "设备",
                    value: "shebei"
                },
                {
                    text: "其他",
                    value: "other"
                },
                {
                    text: "服务",
                    value: "reversed"
                }
            ]
        };
    },
    //         type: "bangong",
    //     space: parseFloat(tmpSum.bangong).toFixed(2),
    //     text: "办公"
    // }, {
    //     type: "yewuyongfang",
    //     space: parseFloat(tmpSum.yewuyongfang).toFixed(2),
    //     text: "业务"
    // },
    // {
    //     type: "fushu",
    //     space: parseFloat(tmpSum.fushu).toFixed(2),
    //     text: "附属"
    // },
    // {
    //     type: "leader",
    //     space: parseFloat(tmpSum.leader).toFixed(2),
    //     text: "领导"
    // },
    // {
    //     type: "shebei",
    //     space: parseFloat(tmpSum.shebei).toFixed(2),
    //     text: "设备"
    // },
    // {
    //     type: "other",
    //     space: parseFloat(tmpSum.qita).toFixed(2),
    //     text: "其他"
    // },
    // {
    //     type: "reversed",
    //     space: parseFloat(tmpSum.reversed).toFixed(2),
    //     text: "服务"
    // }
    methods: {
        changeType() {
            changeRoomTypeApi({
                room_id: this.singleEntry.id,
                floor_id: this.floor_id,
                type: this.singleEntry.type
            }).then((result) => {
                if (result.data.code == 0) {
                    notifySomething("成功",
                        "修改房屋用途成功", constants.typeSuccess)
                }
            })
        },
        caluculateTotal() {
            // this.loading = true;
            console.log("calculate")
            var one = this.singleEntry;
            var assignedSpace = 0;
            one.statusText = "";
            one.statusShow = false;
            if (one.space == 0) {
                one.statusText = "面积为0！请先分配面积";
            }
            if (one.typeText == "办公") {
                //  one.status = ;
                if (!this.assignEntry.keji) {
                    this.assignEntry.keji = 0
                }
                if (!this.assignEntry.fukeji) {
                    this.assignEntry.fukeji = 0
                }
                if (!this.assignEntry.keyuan) {
                    this.assignEntry.keyuan = 0
                }
                if (one.assign) {
                    if (one.kind == "2") {
                        assignedSpace = one.assign.keji * 18 + one.assign.fukeji * 12 + one.assign.keyuan * 9;
                        if (assignedSpace > parseInt(one.space) - 9) {
                            one.status = true;
                            one.statusText = "面积不够"
                        }
                    } else if (one.kind == "1") {
                        assignedSpace = one.assign.keji * 9 + one.assign.fukeji * 9 + one.assign.keyuan * 9;
                        if (assignedSpace > parseInt(one.space) - 9) {
                            one.status = true;
                            one.statusText = "面积不够"
                        }
                    }
                }
            }
            if (one.typeText == "领导办公室") {
                //  one.status = ;
                if (!this.assignEntry.juji) {
                    this.assignEntry.juji = 0
                }
                if (!this.assignEntry.fujuji) {
                    this.assignEntry.fujuji = 0
                }
                if (!this.assignEntry.chuji) {
                    this.assignEntry.chuji = 0
                }
                if (!this.assignEntry.fuchuji) {
                    this.assignEntry.fuchuji = 0
                }
                if (!this.assignEntry.keji) {
                    this.assignEntry.keji = 0
                }
                if (!this.assignEntry.fukeji) {
                    this.assignEntry.fukeji = 0
                }
                if (!this.assignEntry.keyuan) {
                    this.assignEntry.keyuan = 0
                }

                if (one.assign) {
                    if (one.kind == "2") {
                        assignedSpace = one.assign.juji * 0 + one.assign.fujuji * 0 + one.assign.chuji * 30 + one.assign.fuchuji * 35 + one.assign.keji * 18 + one.assign.fukeji * 12 + one.assign.keyuan * 9;
                        if (assignedSpace > one.space - 9) {
                            one.status = true;
                            one.statusText = "面积不够"
                        }
                    } else if (one.kind == "1") {
                        assignedSpace = one.assign.juji * 42 + one.assign.fujuji * 30 + one.assign.chuji * 24 + one.assign.fuchuji * 18 + one.assign.keji * 9 + one.assign.fukeji * 9 + one.assign.keyuan * 9;
                        if (assignedSpace > one.space - 9) {
                            one.status = true;
                            one.statusText = "面积不够"
                        }
                    }
                }
            }
            if (one.statusText == "面积不够") {
                one.status = false;
                one.statusShow = true;
            }
            console.log(this.singleEntry.status);
            this.componentKey++;
            //this.componentKey1++;
        }
    },
    created() {}
};
</script>
