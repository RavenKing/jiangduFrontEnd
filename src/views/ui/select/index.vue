<template>
  <wl-container :use-scroll="false">
    <div class="select-box">
      <div>
        <div class="mg-bt">
          <el-button type="success" plain>树形下拉框</el-button>
        </div>
        <wlTreeSelect
          ref="wl-tree-select"
          v-model="selected"
          node-key="id"
          size="small"
          width="240"
          checkbox
          collapse-tags
          noCheckedClose
          :data="treeData"
          :defaultExpandAll="false"
          :defaultExpandedKeys="[1]"
          @change="hindleChanged"
        ></wlTreeSelect>
      </div>
      <div>
        <div class="mg-bt">
          <el-button type="success" plain>全选下拉框</el-button>
        </div>
        <wlVueSelect
          v-model="value"
          :props="props"
          :data="data"
          multiple
          collapse-tags
          default-select
          noCheckedClose
        ></wlVueSelect>
      </div>
    </div>
  </wl-container>
</template>

<script>

import { getSelectDataApi } from "@/api/menu"; // 导入获取用户菜单接口

export default {
  name: "wl-select",
  data() {
    var selectData=[];
    console.log(selectData);
    selectData=getSelectDataApi().then((test)=>{
      this.data=test.data.data;
//this.data =test.data;
     });
    return {
      value: [], // 选中值
      data:[{id:1,name:"11"},{id:2,name:"121"}] , // 数据
      props: {
        label: "name",
        value: "id"
      }, // 配置
      treeData: [
        {
          id: "love",
          name: "所有和你走过的风光",
          children: [
            {
              id: 1,
              name: "海边",
              children: [
                {
                  id: 5,
                  name: "蓬莱"
                },
                {
                  id: 6,
                  name: "威海"
                }
              ]
            },
            {
              id: 2,
              name: "森林",
              children: []
            },
            {
              id: 3,
              name: "草原"
            },
            {
              id: 4,
              name: "古城"
            }
          ]
        }
      ],
      selected: ["1"] // 树下拉框选中数据
    };
  },
  methods: {
    hindleChanged(val) {
      console.log(val, this.selected);
    },
    // 手动关闭树形下拉框选项
    closeSelect() {
      this.$refs["wl-tree-select"].closeOptions();
    }
  }
};
</script>

<style lang="scss">
.select-box {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin: 120px auto;

  .mg-bt {
    margin-bottom: 12px;
  }
}
</style>