<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>名字</label>
                <sui-input placeholder="名字" v-model="singleRoom.TALENT_NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>年龄</label>
                <sui-dropdown placeholder="Gender" selection :options="ageOptions" v-model="singleRoom.AGE" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>性别</label>
                <sui-dropdown placeholder="Gender" selection :options="options" v-model="singleRoom.SEX" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>学历</label>
                <sui-dropdown placeholder="学历" selection :options="heOptions" v-model="singleRoom.HIGHEST_EDUCATION" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>期望薪资</label>
                <sui-input placeholder="期望薪资" v-model="singleRoom.SALARY" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>工作年限</label>
                <sui-dropdown placeholder="工作年限" selection :options="wyOptions" v-model="singleRoom.WORK_YEARS" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%;">
                <label>政策内容</label>
                <textarea placeholder="政策内容" v-model="singleRoom.CDATA" />
                </sui-form-field>
        </sui-form-fields>
    </sui-form>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"  :file-list="fileList" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"> <em>点击上传简历</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
</div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";

export default {
    props: ['singleRoom'],
    name: 'form-create',

    data() {
        return {
            heOptions: [{
                    text: "不限",
                    value: 0
                },
                {
                    text: "中专/中技",
                    value: 1
                },
                {
                    text: "高中",
                    value: 2
                },
                {
                    text: "大专",
                    value: 3
                },
                {
                    text: "本科",
                    value: 4
                },
                {
                    text: "硕士",
                    value: 4
                },
                {
                    text: "博士",
                    value: 4
                }
            ],
            wyOptions: [{
                    text: "不限",
                    value: 0
                }, {
                    text: "1年以内",
                    value: 1
                },
                {
                    text: "1-3年",
                    value: 2
                },
                {
                    text: "3-5年",
                    value: 3
                },
                {
                    text: "5-10年",
                    value: 4
                },
                {
                    text: "10年以上",
                    value: 5
                }
            ],
            ageOptions: [{
                    text: "18-25",
                    value: 0
                },
                {
                    text: "25-35",
                    value: 1
                },
                {
                    text: "35-45",
                    value: 2
                }, {
                    text: "45以上",
                    value: 3
                }
            ],
            options: [{
                text: "男",
                value: "0"
            }, {
                text: "女",
                value: "1"
            }],
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
