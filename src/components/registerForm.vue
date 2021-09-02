<template lang="html">
<div>

    <div>
        <sui-dimmer :active="loading" inverted>
            <sui-loader content="正在加载" />
        </sui-dimmer>
    </div>
    <el-form ref="form" :model="singleEntry" label-width="120px">
        <el-form-item label="用户名" required>
            <el-input v-model="singleEntry.USER_NAME"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required>
            <el-input v-model="singleEntry.PHONE"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
            <el-input v-model="singleEntry.PASSWORD" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required>
            <el-input v-model="singleEntry.password1" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import constants from "@/util/constants";
import {
    notifySomething,
    //  goToLogin
} from "@/util/utils"
import {
    registerUserApi,
} from "@/api/roomDataAPI";
export default {
    name: 'register-form',
    props: ["index", "singleEntry", "showLeader"],
    data() {
        return {
            options: [],
            loading: false,

        };
    },
    methods: {
        onSubmit() {
            console.log(this.singleEntry);
            var context = this;
            this.fullscreenLoading = true;
            // eslint-disable-next-line no-prototype-builtins
            if (this.singleEntry.hasOwnProperty("password1")) {
                delete this.singleEntry.password1;
            }
            registerUserApi(this.singleEntry).then((result) => {
                if (result.data == constants.OK) {
                    context.loading = false;
                    notifySomething("用户注册成功", "用户注册成功", constants.typeSuccess);
                } else {
                    context.loading = false;
                    notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
                }
            }).catch(function () {
                context.loading = false;
                notifySomething(constants.GENERALERROR, constants.GENERALERROR, constants.typeError);
            });

        }
    },
    created() {

    }
};
</script>
