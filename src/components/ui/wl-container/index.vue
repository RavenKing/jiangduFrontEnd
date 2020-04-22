<template>
  <div class="wl-container">
    <!-- 主体内容区 - 头部 -->
    <div class="wl-container-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <!-- 主体区 -->
    <el-scrollbar class="wl-container-scroll" v-if="useScroll">
      <slot></slot>
    </el-scrollbar>
    <div v-else class="wl-container-main">
      <slot></slot>
    </div>
    <!-- 主体内容区 - 底部 -->
    <div class="wl-container-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
    <!-- 网站默认脚部信息 -->
    <footer class="wlui-footer">
      Copyright@2018 www.xxx.cn All Rights Reserved 上海奉贤人民政府 ICP 备案： 沪05003300号
    </footer>
  </div>
</template>

<script>
export default {
  name: "wl-container",
  props: {
    useScroll: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.wl-container {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 8px;

  > .wl-container-scroll {
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    > .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  > .wl-container-main {
    position: relative;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .wlui-footer {
    text-align: center;
    font-size: 14px;
    background: #2e2f30;
    line-height: 26px;
    color:white;
    border-radius: 2px;
    > .beianhao {
      color: white;
    }
  }
}
</style>