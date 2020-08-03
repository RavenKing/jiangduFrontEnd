<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field inline>
                <label>单位名称</label>
                <sui-input class="ui disabled input width800" v-model="singleRoom.name" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;">
            <sui-form-field inline>
                <label>单位类别</label>
                <!-- <label> {{}} </label> -->
                <sui-dropdown :placeholder="singleRoom.leader" selection :options="leaderLevel" v-model="singleRoom.leader" />
            </sui-form-field>
            <sui-form-field inline>
                <label>单位级别</label>
                <sui-input :placeholder="singleRoom.level" v-model="singleRoom.level" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field inline>
                <label>组织机构代码</label>
                <sui-input :placeholder="singleRoom.code" v-model="singleRoom.code" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field inline>
                <label>联系人</label>
                <sui-input :placeholder="singleRoom.contact" v-model="singleRoom.contact" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field inline>
                <label>联系人电话</label>
                <sui-input :placeholder="singleRoom.contact_tel" v-model="singleRoom.contact_tel" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field inline>
                <label>单位地址</label>
                <sui-input :placeholder="singleRoom.address" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>编制人数</label>
                <sui-input :placeholder="singleRoom.bianzhi_num" v-model="singleRoom.bianzhi_num" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <!-- <sui-form-field>

                <label>单位人数</label>
                <sui-input placeholder="单位人数" v-model="singleRoom.enumber" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field inline>
                <label>正局</label>
                <sui-input placeholder="正局" v-model="singleRoom.zhengju" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>副局</label>
                <sui-input placeholder="副局" v-model="singleRoom.fuju" :disabled="disabled" type="number" />
            </sui-form-field>

            <sui-form-field inline>
                <label>正处</label>
                <sui-input placeholder="正处" v-model="singleRoom.zhengchu" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>副处</label>
                <sui-input placeholder="副处" v-model="singleRoom.fuchu" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>正科</label>
                <sui-input placeholder="正科" v-model="singleRoom.zhengke" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleRoom.fuke" :disabled="disabled" type="number" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;">
            <sui-form-field inline>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="singleRoom.other" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>实际人数</label>
                <sui-input :placeholder="singleRoom.shiji_num" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <!-- <sui-form-field>
                <label>实际人数</label>
                <sui-input placeholder="实际人数" v-model="singleRoom.enumber_r" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field inline>
                <label>正局</label>
                <sui-input placeholder="正局" v-model="singleRoom.zhengju_r" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>副局</label>
                <sui-input placeholder="副局" v-model="singleRoom.fuju_r" :disabled="disabled" type="number" />
            </sui-form-field>

            <sui-form-field inline>
                <label>正处</label>
                <sui-input placeholder="正处" v-model="singleRoom.zhengchu_r" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>副处</label>
                <sui-input placeholder="副处" v-model="singleRoom.fuchu_r" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>正科</label>
                <sui-input placeholder="正科" v-model="singleRoom.zhengke_r" :disabled="disabled" type="number" />
            </sui-form-field>
            <sui-form-field inline>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleRoom.fuke_r" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="singleRoom.other_r" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
export default {
    props: ['singleRoom'],
    name: 'form-create',
    data() {
        return {
            disabled: false,
            zoomlevel: 14,
            leaderLevel: [{
                text: "机关单位",
                value: "1"
            }, {
                text: "事业单位",
                value: "2"
            }, {
                text: "参公单位",
                value: "3"
            }]
        };

    },
    methods: {},
    created() {
        if (this.singleRoom.roomname == undefined) {
            this.singleRoom.roomname = ""
        }
    }
};
</script>

<style>
.width800 {
    width: 800px !important;
    color: rgba(0, 0, 0, .87) !important;

}

.BMap_cpyCtrl {
    display: none;
}

.anchorBL {
    display: none;
}

.map {
    width: 100%;
    height: 400px;
}

.ui.form .field label {
    /* display: block !important; */
    margin: 0 0 .28571429rem 0 !important;
    color: rgba(0, 0, 0, .87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
    margin-right: 10px !important;
}
</style>
