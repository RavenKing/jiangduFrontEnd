<template>
<wl-container :use-scroll="false">
    <sui-button content="huatu" v-on:click="drawRect" />
    <canvas ref="canvas" id="myCanvas" width="850" height="600" class="louBackground" />
</wl-container>
</template>

<script>
export default {
    name: "bim",
    data() {
        return {
            context: "",
            bims: [{
                    name: "urn_model1",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo1/0.svf",
                    modelObj: null
                },
                {
                    name: "urn_model2",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo2/0.svf",
                    modelObj: null
                },
                {
                    name: "urn_model3",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo3/0.svf",
                    modelObj: null
                },
                {
                    name: "urn_model4",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo4/0.svf",
                    modelObj: null
                },
                {
                    name: "urn_model5",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
                    modelObj: null
                },
                {
                    name: "urn_model6",
                    path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
                    modelObj: null
                }
            ]
        };
    },
    methods: {
        drawRect() {
            this.context = this.$refs.canvas.getContext("2d");
            this.context.strokeStyle = "#FF0000";
            this.context.strokeText("201", 10, 20);
            this.context.strokeRect(0, 0, 100, 200);
            this.$refs.canvas.addEventListener('click', function (event) {
                var x = event.pageX
                var y = event.pageY;
                console.log(x + "," + y)
            }, false);

        }
    },
};
</script>

<style lang="scss">
.louBackground {
    background-size: cover;
    background-image: url("../../../../public/lou.png");
}

.wl-viewer {
    height: 90%;
    width: 90%;
    margin: 4% auto 0;
}
</style>
