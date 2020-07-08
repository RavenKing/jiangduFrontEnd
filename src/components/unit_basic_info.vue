<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field inline>
                <label>单位名称</label>
                <sui-input class="ui disabled input" :placeholder="singleRoom.name" :disabled="disabled" />
            </sui-form-field inline>
            
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field >
                <label>单位类别</label>
                <!-- <label> {{}} </label> -->
                <sui-input class="ui disabled input" :placeholder="singleRoom.kind"/>
            </sui-form-field>
            <sui-form-field>
                <label>单位级别</label>
                <sui-input class="ui disabled input" :placeholder="singleRoom.level" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>组织机构代码</label>
                <sui-input class="ui disabled input" :placeholder="singleRoom.code" :disabled="disabled" />
            </sui-form-field>

        </sui-form-fields>
        
        <sui-form-fields>
            <sui-form-field>
                <label>编制人数：</label>
            </sui-form-field>
            <sui-form-field>
                <sui-input class="ui disabled input" :placeholder="singleRoom.bianzhi_num" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <!-- <sui-form-field>
                
                <label>单位人数</label>
                <sui-input placeholder="单位人数" v-model="singleRoom.enumber" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field>
                <label>正局</label>
                <sui-input placeholder="正局" v-model="singleRoom.zhengju" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副局</label>
                <sui-input placeholder="副局" v-model="singleRoom.fuju" :disabled="disabled" />
            </sui-form-field>
        
            <sui-form-field>
                <label>正处</label>
                <sui-input placeholder="正处" v-model="singleRoom.zhengchu" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>副处</label>
                <sui-input placeholder="副处" v-model="singleRoom.fuchu" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>正科</label>
                <sui-input placeholder="正科" v-model="singleRoom.zhengke" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleRoom.fuke" :disabled="disabled" />
            </sui-form-field>
            
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="singleRoom.other" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>实际人数：</label>
            </sui-form-field>
            <sui-form-field>
                <sui-input class="ui disabled input" :placeholder="singleRoom.shiji_num" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <!-- <sui-form-field>
                <label>实际人数</label>
                <sui-input placeholder="实际人数" v-model="singleRoom.enumber_r" :disabled="disabled" />
            </sui-form-field> -->
            <sui-form-field>
                <label>正局</label>
                <sui-input placeholder="正局" v-model="singleRoom.zhengju_r" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副局</label>
                <sui-input placeholder="副局" v-model="singleRoom.fuju_r" :disabled="disabled" />
            </sui-form-field>
        
            <sui-form-field>
                <label>正处</label>
                <sui-input placeholder="正处" v-model="singleRoom.zhengchu_r" :disabled="disabled" />
            </sui-form-field>
            </sui-form-fields>
        <sui-form-fields>    
            <sui-form-field>
                <label>副处</label>
                <sui-input placeholder="副处" v-model="singleRoom.fuchu_r" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>正科</label>
                <sui-input placeholder="正科" v-model="singleRoom.zhengke_r" :disabled="disabled" />
            </sui-form-field>
            <sui-form-field>
                <label>副科</label>
                <sui-input placeholder="副科" v-model="singleRoom.fuke_r" :disabled="disabled" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field>
                <label>其他</label>
                <sui-input placeholder="其他" v-model="singleRoom.other_r" :disabled="disabled" />
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
            zoomlevel: 14
        };
    },
    methods: {},
    created() {
        if(this.singleRoom.roomname==undefined)
        {
            this.singleRoom.roomname=""
        }
    }
};
</script>

<style>
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
</style>
