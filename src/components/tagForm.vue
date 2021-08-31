<template lang="html">
<div>
    <sui-form>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>标签名</label>
                <sui-input placeholder="标签名" v-model="singleRoom.TAG_NAME" />
            </sui-form-field>
            <sui-form-field style="width:50%;">
                <label>标签值</label>
                <sui-input placeholder="标签值" v-model="singleRoom.TAG_VALUE" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:50%;">
                <label>标签类型</label>
                <sui-dropdown
    placeholder="标签类型"
    selection
    :options="options"
    v-model="singleRoom.TYPE"
  />
            </sui-form-field>
            
            <sui-form-field style="width:50%;">
                <label>标签种类</label>
                <sui-input placeholder="标签种类" v-model="singleRoom.TAG_CATEGORY" />
            </sui-form-field>
        </sui-form-fields>
        <sui-form-fields>
            <sui-form-field style="width:100%;">
                <label>标签描述</label>
                <textarea placeholder="标签描述" v-model="singleRoom.DESCRIPTION" />
            </sui-form-field>
        </sui-form-fields>
    </sui-form>
</div>
</template>

<script>
import * as lang from "vuejs-datepicker/src/locale";

export default {
  props: ["singleRoom"],
  name: "form-create",

  data() {
    return {
      current: null,
      options: [
        {
          text: "人才",
          value: "TA",
        },
        {
          text: "科技",
          value: "TE",
        },
        {
          text: "资产",
          value: "AS",
        },
        {
          text: "金融",
          value: "FI",
        },
        {
          text: "政策",
          value: "PO",
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
  methods: {
    changeZhuguan() {
      console.log("change");
      if (this.singleRoom.isunimanage == 1) {
        this.checkZhuguan = true;
        this.singleRoom.zhuguandanwei = 2;
      } else {
        this.checkZhuguan = false;
      }
    },
  },
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
.el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 495px;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
</style>
