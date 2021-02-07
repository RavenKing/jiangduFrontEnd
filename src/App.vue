<template>
<div id="app">
    <div style="height: calc(100vh - 36px);">
        <router-view />
        <notifications group="foo" position="top center" type="success"/>
    </div>
    <!-- 网站默认脚部信息 -->
    <footer class="wlui-footer">
      Copyright@2021 www.xxx.cn All Rights Reserved
    </footer>
</div>
</template>

<style lang="scss">
@import '~@/assets/css/clear.css';
@import '~@/style/animate/transition.scss';

html,
body {
    height: 100%;

    >#app {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
.wlui-footer {
    text-align: center;
    font-size: 14px;
    background: #2e2f30;
    line-height: 36px;
    color:white;
    position: relative;
    z-index: 2;
    > .beianhao {
      color: white;
    }
  }
</style>
