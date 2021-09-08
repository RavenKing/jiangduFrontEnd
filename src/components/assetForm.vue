<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>设备名</label>
                <sui-input placeholder="设备名" v-model="singleRoom.ASSET_NAME" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>设备国家</label>
                <sui-input placeholder="设备国家" v-model="singleRoom.ASSET_COUNTRY" />
            </sui-form-field>
            <sui-form-field style="width:25%;">
                <label>适用地区</label>
                <sui-input placeholder="设备国家" v-model="singleRoom.AREA" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>状态</label>
                <sui-input placeholder="状态" v-model="singleRoom.STATUS" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>资产数目</label>
                <sui-input placeholder="资产数目" v-model="singleRoom.ASSET_COUNT" />
                </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%;">
                <label>描述</label>
                <textarea placeholder="描述" v-model="singleRoom.DESCRIPTION" />
                </sui-form-field>
            </sui-form-fields>
    </sui-form>
    <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"  :file-list="fileList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"> <em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload> -->
</div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";

export default {
    props: ['singleRoom'],
    name: 'form-create',

    data() {
        return {
            fileList: [],
            checkZhuguan: false,
            unitOptions: [],
            lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now(),
        };
    },
    methods: {
        changeZhuguan() {
            console.log("change")
            if (this.singleRoom.isunimanage == 1) {
                this.checkZhuguan = true;
                this.singleRoom.zhuguandanwei = 2;
            } else {
                this.checkZhuguan = false;
            }
        },

    },
    created() {

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

.el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 840px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
</style>
