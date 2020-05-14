<template>

  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

<!--     <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->
    <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
    </el-col>

     
    <div>
      <todo-list />  
      <!-- <pie-chart /> -->
    </div>      
    



  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex"; 
import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    // PanelGroup,
    BarChart,
    PieChart,
    TodoList,
    BoxCard
  },
  // computed: {
  //   // 导入vuex菜单数据，菜单折叠状态
  //   ...mapGetters(["menu_list"])
  // },
  methods: {
    /**
     * 路由跳转
     * url 地址
     */
    routerGo(url) {
      let _item = this.menu_list.find(i => i.url === url);
      this.addKeepPage(_item); // 添加历史记录
      this.setCurrentPage(url); // 记录当前页
      this.$router.push(url);
    },
    ...mapActions("page", ["addKeepPage", "setCurrentPage"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>

<!-- 
<style lang="scss">
.wlui-index {
  .wlui-logo {
    text-align: center;
    height: 30%;
    margin-bottom: 100px;
    > .wlui-logo-img {
      height: 100%;
    }
    > .wlui-logo-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
    > .wlui-logo-subtitle {
      font-size: 14px;
      font-weight: 600;
      color: #dcdfe6;
    }
  }

  .ui-components {
    overflow: hidden;
    width: 700px;
    margin: 0 auto;
    > .item-box {
      display: flex;
      justify-content: space-between;
      padding: 50px 0;
    }
  }

  .blog-box {
    > .blog-item {
      padding: 10px;
      color: #c0c4cc;
    }
  } -->
}
</style>