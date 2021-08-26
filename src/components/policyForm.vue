<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:25%;">
                <label>政策id</label>
                <sui-input placeholder="政策id" v-model="singleRoom.POLICY_ID" disabled/>
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>政策标题</label>
                <sui-input placeholder="政策标题" v-model="singleRoom.POLICY_TITLE" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"> <em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
</div>
</template>

<script>
import {
    getUnitApi,
} from "@/api/roomDataAPI";
import * as lang from "vuejs-datepicker/src/locale";

export default {
    props: ['singleRoom', 'clickDingWei', 'clickToHeTong'],
    name: 'form-create',

    data() {
        return {
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
        getUnit() {
            this.unitoptions = [];

            console.log(this.unitOptions);
            getUnitApi().then((data) => {
                var res_data = data.data.data
                for (var i = res_data.length - 1; i >= 0; i--) {
                    this.unitOptions.push({
                        'text': res_data[i]['name'],
                        'value': res_data[i]['id']
                    })
                }
                console.log(this.unitOptions);

            });
        }

    },
    created() {
        this.getUnit();

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
