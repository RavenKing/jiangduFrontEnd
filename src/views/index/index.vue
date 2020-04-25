<template>
  <wl-container class="wlui-index" :use-scroll="false">
    <div class="wlui-logo">
      <img
        class="wlui-logo-img"
        src="@/assets/images/wlui-logo-lang.jpg"
        alt="wl-ui logo"
        title="wl-ui 精美易用的复杂前端组件解决方案"
      />
      <h1 class="wlui-logo-title">南桥金汇万岁</h1>
      <h2 class="wlui-logo-subtitle">Beautiful and easy-to-use complex front-end component solutions</h2>
    </div>
  </wl-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; 

export default {
  computed: {
    // 导入vuex菜单数据，菜单折叠状态
    ...mapGetters(["menu_list"])
  },
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
  }
}
</style>