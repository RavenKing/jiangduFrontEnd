<template lang="html">
<div>
    <sui-form>

        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>专利名</label>
                <sui-input placeholder="专利名" v-model="singleRoom.NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>Username</label>
                <sui-input placeholder="Username" v-model="singleRoom.USER_NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>专利申请国家</label>
                <template>
                    <vue-country-intl v-model="singleRoom.PATENT_APPLICATION_COUNTRY" useChinese=true type = "country"></vue-country-intl>
                </template>
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>状态</label>
                <sui-dropdown placeholder="状态" selection :options="options" v-model="singleRoom.STATUS" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>类型</label>
                <sui-dropdown placeholder="类型" selection :options="heOptions" v-model="singleRoom.TYPE" />
            </sui-form-field>
        </sui-form-fields>

        <sui-form-fields>
            <sui-form-field style="width:100%;">
                <label>专利描述</label>
                <textarea placeholder="专利描述" v-model="singleRoom.DESCRIPTION" />
                </sui-form-field>
      </sui-form-fields>
      
    </sui-form>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text"><em>点击上传简历</em></div>
      <div class="el-upload__tip" slot="tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";
export default {
    props: ["singleRoom"],
    name: "form-create",
    data() {
        return {
            country: '',
            region: '',
            heOptions: [{
                text: "专利",
                value: "专利",
            }, ],
            options: [{
                    text: "启用",
                    value: "启用",
                },
                {
                    text: "禁用",
                    value: "禁用",
                },
            ],
            fileList: [],
            checkZhuguan: false,
            unitOptions: [],
            lang: lang,
            disabled: false,
            zoomlevel: 14,
            testDate: Date.now(),
        };
    },
    methods: {},
    created() {},
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

.upload-demo {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #fff;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
</style>
