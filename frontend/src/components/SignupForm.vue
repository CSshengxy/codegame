<template>
    <div>
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$store.state._const.EMAIL" prop="email">
                <el-input v-model="registerForm.email" :placeholder="$store.state._const.NEED_EMAIL"></el-input>
            </el-form-item>
            <el-form-item :label="$store.state._const.NICKNAME" prop="nickname">
                <el-input :placeholder="$store.state._const.NEED_NICKNAME" :maxlength="16" v-model="registerForm.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$store.state._const.PASSWORD" prop="password">
                <el-input type="password" :placeholder="$store.state._const.NEED_PASSWORD_REGISTER" :maxlength="16" v-model="registerForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$store.state._const.REPEAT_PASSWORD" prop="checkpassword">
                <el-input type="password" :placeholder="$store.state._const.NEED_REPEAT_PASSWORD" :maxlength="16" v-model="registerForm.checkpassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$store.state._const.CAPTCHA" prop="captcha">
                <div id="ver-area">
                    <div id="ver-code">
                        <el-input :placeholder="$store.state._const.NEED_CAPTCHA" :maxlength="4" v-model="registerForm.captcha"></el-input>
                    </div>
                    <img :src="captchaImage" @click="refreshCaptcha" width="80" height="35"/>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">
                    {{ $store.state._const.SUBMIT }}
                </el-button>
                <el-button @click="resetForm('registerForm')">
                    {{ $store.state._const.RESET }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
* SignupForm 注册界面
*
* @class SignupForm
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from '@/assets/js/store.js'
import { cbcEncrypt, simpleGet, simplePost } from '@/assets/js/util.js'

export default {
    name: 'signup-form',
    store: store,
    data: function () {
        var rEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        var validateEmail = (rule, email, callback) => {
            if (email === '') {
                callback(new Error(' '))
            } else if (rEmail.test(email.toLowerCase())) {
                this.checkEmail(email.toLowerCase(), callback)
            } else {
                callback(new Error(this.$store.state._const.WRONG_EMAIL_FORMAT))
            }
        }
        var rPassword = /^[A-Za-z0-9]+$/
        var validatePassword = (rule, password, callback) => {
            if (password === '') {
                callback(new Error(this.$store.state._const.BLANK))
            } else if (password.length < 6) {
                callback(new Error(this.$store.state._const.SHORT_PASSWORD))
            } else if (rPassword.test(password)) {
                callback()
            } else {
                callback(new Error(this.$store.state._const.WRONG_PASSWORD_FORMAT))
            }
        }
        var validateRepeatPassword = (rule, repeatPassword, callback) => {
            if (repeatPassword === '') {
                callback(new Error(this.$store.state._const.BLANK))
            } else if (repeatPassword !== this.registerForm.password) {
                callback(new Error(this.$store.state._const.DIFFERENT_PASSWORD))
            } else {
                callback()
            }
        }
        var validateCaptcha = (rule, captcha, callback) => {
            if (captcha === '') {
                callback(new Error(this.$store.state._const.BLANK))
            } else if (captcha.toLowerCase() === this.captchaKey) {
                callback()
            } else if (captcha.length < 4) {
                callback(new Error(this.$store.state._const.SHORT_CAPTCHA))
            } else {
                callback(new Error(this.$store.state._const.WRONG_CAPTCHA))
            }
        }
        return {
            /**
            *验证码图片
            *
            * @property captchaImage
            * @type {Object}
            * @default null
            */
            captchaImage: null,
            /**
            *验证码
            *
            * @property captchaKey
            * @type {String}
            * @default null
            */
            captchaKey: null,
            /**
            *注册表单
            *
            * @property registerForm
            * @type {Object}
            */
            registerForm: {
                email: '',
                nickname: '',
                password: '',
                checkpassword: '',
                captcha: ''
            },
            /**
            *注册规则
            *
            * @property registerRules
            * @type {Object}
            */
            registerRules: {
                email: [
                    { required: true, validator: validateEmail, trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: validatePassword, trigger: 'blur' }
                ],
                checkpassword: [
                    { required: true, validator: validateRepeatPassword, trigger: 'blur' }
                ],
                captcha: [
                    { required: true, validator: validateCaptcha, trigger: 'change' }
                ]

            }
        }
    },
    /**
    *
    *vue组件的mounted函数
    *
    *@method mounted
    */
    mounted: async function () {
        this.refreshCaptcha()
    },
    methods: {
        /**
        *检查邮箱格式
        * @method checkEmail
        * @param {String} email
        * @param {function} callback
        */
        checkEmail: async function (email, callback) {
            let response = await simpleGet('api/check-email?email=' + email.toLowerCase())
            let obj = await response.json()
            if (await obj.status === '0') {
                callback()
            } else {
                callback(new Error(this.$store.state._const.USED_EMAIL))
            }
        },
        /**
        *提交注册表单
        * @method submitForm
        * @param {Object} formName
        */
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.register()
                } else {
                    this.$message({
                        message: this.$store.state._const.CHECK_FORM,
                        type: 'warning'
                    })
                    return false
                }
            })
        },
        /**
        *重置表单
        * @method resetForm
        * @param {Object} formName
        */
        resetForm: function (formName) {
            this.$refs[formName].resetFields()
        },
        /**
        *注册执行
        * @method register
        */
        register: async function () {
            let password = cbcEncrypt(this.registerForm.captcha, this.registerForm.password)
            let jsonObj = {
                'email': this.registerForm.email.toLowerCase(),
                'password': password,
                'nickname': this.registerForm.nickname,
                'captcha': this.registerForm.captcha
            }
            let response = await simplePost('api/register', jsonObj)
            let obj = await response.json()
            if (await obj.status === '1') {
                this.$message({
                    message: this.$store.state._const.REGISTER_SUCCESS,
                    type: 'success'
                })
                this.$store.commit('signupWindow', false)
            } else {
                this.$message.error(this.$store.state._const.REGISTER_FAILURE)
            }
        },
        /**
        *更新验证码
        * @method refreshCaptcha
        */
        refreshCaptcha: async function () {
            let response = await simpleGet('/api/captcha')
            let obj = await response.json()
            let src = await obj.img
            this.captchaImage = await src
            this.captchaKey = await obj.captcha
        }
    }
}
</script>
<style scoped>
#email-button {
    margin-top: 10px;
    margin-bottom: -10px;
    margin-left: 120px;
}
#ver-code {
    width: 100%;
}
#ver-area {
        display: inline-flex;
}
.el-form {
    width: 100%;
}
</style>
