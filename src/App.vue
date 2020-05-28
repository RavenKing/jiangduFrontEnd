<template>
<div id="app">
    <router-view />
    <notifications group="foo" position="top center" type="success"/>
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
</style>
