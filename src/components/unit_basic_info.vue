<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field inline>
                <label>单位名称</label>
                <sui-input class="ui disabled input width800" v-model="singleRoom.realname" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field inline>
                <label>联系人</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.contact" v-model="singleRoom.contact" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field inline>
                <label>联系人电话</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.contact_tel" v-model="singleRoom.contact_tel" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field inline>
                <label>单位地址</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.address" v-model="singleRoom.address" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;" inline>
            <label>单位类别</label>
            <sui-form-field>
                <sui-dropdown :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.kind" selection :options="leaderLevel" v-model="singleRoom.kind" />
            </sui-form-field>
            <label>单位级别</label>
            <sui-form-field>
                <sui-dropdown :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.level" selection :options="leveloptions" v-model="singleRoom.level" />
            </sui-form-field>
            <label>组织机构代码</label>
            <sui-form-field>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" :placeholder="singleRoom.code" v-model="singleRoom.code" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field style="width:25%;" inline>
                <label>编制人数</label>
                <sui-input class="ui disabled" :placeholder="singleRoom.bianzhi_num" v-model="singleRoom.bianzhi_num" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields>
            <!-- <sui-form-field>

                <label>单位人数</label>
                <sui-input placeholder="单位人数" v-model="singleRoom.enumber" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field style="width:25%;" inline>
                <label>正局</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="正局" v-model="singleRoom.zhengju" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>副局</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="副局" v-model="singleRoom.fuju" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>

            <sui-form-field style="width:25%;" inline>
                <label>正处</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="正处" v-model="singleRoom.zhengchu" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>副处</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="副处" v-model="singleRoom.fuchu" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>

            <sui-form-field style="width:25%;" inline>
                <label>正科</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="正科" v-model="singleRoom.zhengke" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>副科</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="副科" v-model="singleRoom.fuke" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>科员</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="科员" v-model="singleRoom.keji" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
            </sui-form-field>

        </sui-form-fields>
        <sui-form-fields style="border-bottom: 1px solid rgba(34,36,38,.15); padding-bottom: 15px;">

        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>实际人数</label>
                <sui-input class="ui disabled" placeholder="总数" v-model="singleRoom.memberinfo.total" :disabled="disabled" type="number" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <!-- <sui-form-field>
                <label>实际人数</label>
                <sui-input placeholder="实际人数" v-model="singleRoom.enumber_r" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>处级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="处级" v-model="singleRoom.memberinfo.chuji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>副处级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="副处级" v-model="singleRoom.memberinfo.fuchuji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>

            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>局级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="局级" v-model="singleRoom.memberinfo.juji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>副局级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="副局级" v-model="singleRoom.memberinfo.fujuji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields v-if="singleRoom.memberinfo">

            <sui-form-field style="width:25%;" inline>
                <label>科级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="正科" v-model="singleRoom.memberinfo.keji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline v-if="singleRoom.memberinfo">
                <label>副科级</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="正科" v-model="singleRoom.memberinfo.fukeji" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>科员</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="科员" v-model="singleRoom.memberinfo.keyuan" :disabled="disabled" type="number" v-on:change="shijisum()" />
            </sui-form-field>
            <sui-form-field style="width:25%;" inline>
                <label>其他</label>
                <sui-input :class="singleRoom.edit?'':'ui disabled'" placeholder="其他" v-model="singleRoom.memberinfo.qita" :disabled="disabled" type="number" v-on:change="bianzhisum()" />
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
            }],
            leveloptions: [{
                    'text': '局级',
                    'value': '局级'
                },
                {
                    'text': '副局级',
                    'value': '副局级'
                },
                {
                    'text': '处级',
                    'value': '处级'
                },
                {
                    'text': '副处级',
                    'value': '副处级'
                },
                {
                    'text': '科级',
                    'value': '科级'
                }
            ]
        };

    },
    methods: {
        bianzhisum() {
            this.singleRoom.bianzhi_num = this.singleRoom.zhengju + this.singleRoom.fuju + this.singleRoom.zhengchu + this.singleRoom.fuchu + this.singleRoom.zhengke + this.singleRoom.fuke
        },

        shijisum() {
            this.singleRoom.shiji_num = this.singleRoom.zhengju_r + this.singleRoom.fuju_r + this.singleRoom.zhengchu_r + this.singleRoom.fuchu_r + this.singleRoom.zhengke_r + this.singleRoom.fuke_r + this.singleRoom.other_r

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
