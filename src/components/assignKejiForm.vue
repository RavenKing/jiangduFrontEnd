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
                <sui-input placeholder="房间号" v-model="assignEntry.roomnumber" :disabled="singleEntry.status"  required/>
            </sui-form-field>
            <sui-form-field required>
                <label>房间名字</label>
                <sui-input placeholder="房间名字" v-model="assignEntry.roomname" :disabled="singleEntry.status" required/>
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
                {{singleEntry.type}}
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-show="singleEntry.type=='领导办公室'">
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
        <sui-form-fields v-show="singleEntry.type=='领导办公室'||singleEntry.type=='办公'">
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
export default {
    name: 'assign-keji',
    props: ["index", "singleEntry", "assignEntry"],
    data() {
        return {
            componentKey: 1
        };
    },
    methods: {
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
            if (one.type == "办公") {
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
            if (one.type == "领导办公室") {
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
