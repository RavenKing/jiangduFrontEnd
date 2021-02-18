<template>
<div class="the-menu-box">
    <transition name="fade-width" mode="out-in">
        <div class="the-menu-logo" @click="gotoIndex()" :key="is_collapse">
        </div>
    </transition>
    <div class="the-menu-scroll" ref="the-menu-scroll">
        <el-menu class="the-menu" :collapse="is_collapse" :text-color="themeMenu.text" :default-openeds="menuDefaultOpeneds" :background-color="themeMenu.background" :active-text-color="themeMenu.active_text" :default-active="current_menu">
            <el-submenu v-for="sub of menu_data" :key="sub.id" :index="sub.id">
                <el-menu-item v-for="item of sub.children" :key="item.id" :index="item.url" @click="goto(item)">
                    <i :class="item.icon"></i>
                    <span class="menu-item-title">{{item.title}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
import {
    mapGetters,
    mapActions
} from "vuex";
import {
    menu_background,
    menu_color,
    menu_active_color
} from "@/style/variables.scss.js"; // 导入菜单样式变量

export default {
    name: "theMenu",
    data() {
        return {
            theme_menu: {
                background: menu_background,
                text: menu_color,
                active_text: menu_active_color
            }, // 菜单主题
            BS: null // better-scroll实例
        };
    },
    computed: {
        // 左侧菜单主题
        themeMenu() {
            return this.theme_menu;
        },
        // 左侧菜单默认展开
        menuDefaultOpeneds() {
            return this.menu_data.map(i => i.id);
        },
        // 导入vuex菜单数据，菜单折叠状态
        ...mapGetters({
            menu_data: "menu",
            is_collapse: "is_collapse",
            current_menu: "current"
        })
    },
    watch: {
        is_collapse() {
            this.scrollDestroy();
            setTimeout(() => {
                this.scrollInit();
            }, 500);
        }
    },
    mounted() {
        this.scrollInit();
    },
    beforeDestroy() {
        this.scrollDestroy();
    },
    methods: {
        // 菜单路由跳转
        goto(item) {
            this.addKeepPage(item); // 添加历史记录
            this.setCurrentPage(item.url); // 记录当前页
            this.$router.push(item.url);
        },
        // 初始化better-scroll
        scrollInit() {
            this.BS = new BScroll(this.$refs["the-menu-scroll"], {
                mouseWheel: true,
                click: true
                // 如果你愿意可以打开显示滚动条
                // scrollbar: {
                //   fade: true,
                //   interactive: false
                // }
            });
        },
        // 销毁better-scroll
        scrollDestroy() {
            // https://github.com/d2-projects/d2-admin/issues/75
            try {
                this.BS.destroy();
            } catch (e) {
                delete this.BS;
                this.BS = null;
            }
        },
        // 去首页
        gotoIndex() {
            this.setCurrentPage("/index");
            this.$router.push("/index");
        },
        // 导入vuex action函数
        ...mapActions("page", ["addKeepPage", "setCurrentPage"])
    }
};
</script>

<style lang="scss">
.el-submenu__title {
    height: 0px;
}

.the-menu-box {
    background: $menu-background;

    .el-menu--collapse {
        width: 64px;
    }

    >.the-menu-logo {
        // margin-top: 15px;
        position: relative;
        z-index: 1;
        height: $header-height;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        background: #2a3f54 url("../../public/logo.jpg") center;
        background-repeat: no-repeat;
        background-size: contain;
        line-height: 60px;
    }

    >.the-menu-scroll {
        height: calc(100% - #{$header-height});
        overflow: hidden;
    }
}

.the-menu {
    // height: 100%;
    width: $menu-width;

    .menu-icon {
        color: #fff;
    }

    .menu-sub-title {
        margin-left: 6px;
        font-weight: 600;
    }

    .el-menu-item {
        padding: 0 30px 0 24px !important;
        min-width: auto;

        i {
            width: 20px;
            height: 20px;
            display: block;
            float: left;
            margin-right: 5px;
            margin-top: 15px;
            line-height: 20px;
            font-size: 14px;
            color: #fff;
        }
    }

    .is-active.el-menu-item {
        i {
            color: rgb(255, 208, 75);
        }
    }
}

.the-menu.el-menu {
    border: none;
}
</style>
