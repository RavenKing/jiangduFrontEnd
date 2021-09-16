<template>
<wl-container class="wlui-login" :use-scroll="false">
    <el-drawer title="注册平台" :visible.sync="drawer" :direction="direction">
        <span>基本信息</span>
        <register-form :singleEntry="singleEntry" />
    </el-drawer>
    <div>
        <sui-dimmer :active="loading" inverted>
            <sui-loader content="正在加载" />
        </sui-dimmer>
    </div>
    <div class="headerNew">
        <div class="logoTitle">扬州市江都区企业赋能管理平台</div>
    </div>
    <div>
        <h1>欢迎你！</h1>
        <h1>登陆党政机关</h1>
    </div>
    <div class="login-form">
        <div class="login-form-content">
            <h2 class="login-form-title">用户登陆</h2>
            <el-form :model="login_form" :rules="login_rules" class="login-box" ref="login-form" @keyup.enter.native="submitLogin('login-form')">
                <el-form-item prop="USER_NAME">
                    <div class="ipt-box">
                        <label class="item-label">
                            <i class="iconfont icon-yonghu1"></i>
                        </label>
                        <input class="item-ipt" type="text" v-model="login_form.USER_NAME" placeholder="请输入账号" />
                    </div>
                </el-form-item>
                <el-form-item prop="PASSWORD">
                    <div class="ipt-box">
                        <label class="item-label">
                            <i class="iconfont icon-password1"></i>
                        </label>
                        <input class="item-ipt" type="password" v-model="login_form.PASSWORD" placeholder="请输入密码" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" @click="submitLogin('login-form')" class="login-btn">登录</el-button>
                    <el-button type="text" @click="drawer = true">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</wl-container>
</template>

<script>
import {
    mapActions
} from "vuex";
import {
    loginApi
} from "@/api/login"; // 导入接口
import {
    localSet
} from "@/util/storage";
import RegisterForm from "@/components/registerForm";
import {
    notifySomething,
    //  goToLogin
} from "@/util/utils";

export default {
    components: {
        'register-form': RegisterForm
    },
    data() {
        return {
            singleEntry: {
                "USER_ID": " ",
                "PHONE": " ",
                "LEVEL": " ",
                "AREA": " ",
                "USER_NAME": " ",
                "COMPANY_NAME": " ",
                "COMPANY_CODE": " ",
                "COMPANY_ADDRESS": " ",
                "LEGAL_REPRESENTATIVE": " ",
                "REGISTERED_CAPITAL": " ",
                "CONTACT_PERSON": " ",
                "CONTACT_PHONE": " ",
                "TERM_OF_OPERATION": " ",
                "COMPANY_TYPE": " ",
                "REGISTER_STATUS": " ",
                "HEZHUN_TIME": " ",
                "REGISTER_NUMBER": " ",
                "REGISTER_CURRENCY": " ",
                "BUSINESS_SCOPE": " ",
                "CERTIFICATE_URL": " ",
                "CREATED_AT": " ",
                "UPDATED_AT": " ",
                "COUNTRY_CODE": " ",
                "DENGJI_JIGUAN": " ",
                "PASSWORD": "",
                "TOKEN": " ",
                "LOG_DATE": " ",
                "VALIDATEDATE": " ",
                "INDUSTRY": " ",
                "CAP": " "
            },
            direction: 'rtl',
            drawer: false,
            loading: false,
            login_form: {
                USER_NAME: "",
                PASSWORD: "",
                // code: "v9am"
            }, // 登录表单
            login_rules: {
                USER_NAME: [{
                    required: true,
                    message: "请输入账号",
                    trigger: "blmessageur"
                }],
                PASSWORD: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                }],
                // code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            }, // 登录验证规则
            yzm_code: require("../../assets/images/yzm.png")
        };
    },
    methods: {
        // 登录表单提交
        openRegisterForm() {},
        submitLogin(formName) {
            this.loading = true;
            this.$refs[formName].validate(valid => {
                this.loading = false;
                if (valid) {
                    loginApi({data:this.login_form}).then(({
                        data
                    }) => {
                        if (data.code === 0) {
                            // localSet(this.GLOBAL.project_key, data.data.token);
                            // localSet("role", data.data.role);
                            localSet("USER_ID", data.USER_ID);
                            localSet("USER_NAME", data.USER_NAME);
                            localSet('TOKEN',data.token)
                            localSet('LEVEL',data.LEVEL)
                            this.setToken(data.data);
                            notifySomething(
                                "登录成功",
                                 "登录成功",
                                "success"
                            );
                            // window.location.history('/index')
                            console.log(this.$router);
                            this.$router.push("/index");
                        } else {
                            notifySomething(
                                "登录失败",
                                "登录失败",
                                "error"
                            );
                        }
                    });
                } else {
                    // alert("登路失败")
                     notifySomething("登录失败", "登录失败", "error");
                    return false;
                }
            });
        },
        ...mapActions("app", ["setToken"])
    }
};
</script>

<style lang="scss">
.bv-example-row {
    margin-top: 100px;
}

.logoTitle {
    margin-left: 5%;
    color: white;
    font-size: 2em;
    line-height: 80px;
}

.headerNew {
    overflow: hidden;
    background-color: rgb(49, 48, 48);
    color: white;
    height: 80px;
    // padding: 20px 10px;
}

.title-position {
    position: relative;
    margin-top: 100px;
    font-size: 3em;
    color: white;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2)
}

.wlui-login {
    background-image: url("https://fengxianjiguanju.oss-cn-shanghai.aliyuncs.com/bailian.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: 0px;

    .login-form {
        display: flex;
        // position: absolute;
        // top: 150px;
        // right: 100px;
        // bottom: 0;
        // //  left: 0;
        margin: auto;
        width: 410px;
        padding-bottom: 25px;
        border-radius: 4px;
        // box-shadow: 2px 2px 5px rgba(28, 28, 28, 0.2),
        //   -2px -2px 5px rgba(28, 28, 28, 0.2);
        box-shadow: 0 0 5px 6px rgba(68, 67, 67, 0.2);
        background: #f7f7f7;
        overflow: hidden;

        >.login-form-img {
            width: 345px;
            background: url("../../assets/images/wlui-logo.jpg") center no-repeat;
            background-size: 100% 100%;
        }
    }

    .login-form-content {
        flex: 1;
        // background-color: #fff;
        padding: 10px 7px;
        box-sizing: border-box;

        >.login-form-title {
            line-height: 64px;
            font-size: 26px;
            color: rgb(194, 59, 59);
            padding-left: 35px;
            border-bottom: 1px dashed #e6e6e6;
            margin-bottom: 28px;
        }
    }

    .login-box {
        padding: 0 35px;
        box-sizing: border-box;

        >.el-form-item {
            margin-bottom: 28px;
        }

        .ipt-box-m {
            width: 200px;
            float: left;
        }

        .ipt-box-s {
            width: 150px;
            float: right;
        }
    }

    .ipt-box {
        display: flex;
        height: 50px;
        line-height: 48px;
        border-radius: 5px;
        border: 1px solid #ddd;
        box-shadow: 5px 5px 10px rgba(202, 202, 202, 0.4) inset,
            -5px -5px 10px rgba(202, 202, 202, 0.4) inset;
        box-sizing: border-box;

        &:hover {
            box-shadow: 5px 5px 10px rgba(64, 158, 255, 0.4) inset,
                -5px -5px 10px rgba(64, 158, 255, 0.4) inset;
        }

        .item-label {
            width: 60px;
            height: 48px;
            line-height: 48px;
            color: #cccccc;
            text-align: center;
        }

        .item-ipt {
            flex: 1;
            flex-grow: 1;
            flex-shrink: 1;
            height: 48px;
            background-color: transparent;
            padding-left: 10px;
            border: none;
            box-sizing: border-box;
        }

        .item-ipt-yzm {
            width: calc(100% - 60px);
        }

        .yzm-code {
            width: 100%;
        }
    }

    .login-btn {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        font-size: 20px;
        letter-spacing: 10px;
    }
}
</style>
