<template>
<div class="user-info">
    <h1>
        {{ $store.state._const.PERSONAL_INFORMATION }}
    </h1>
    <div>
        <div class="base-info">
            <img src="../assets/img/h1.jpg" id="img-id">
            <i class="el-icon-time"></i>
            <span>
                {{ $store.state._const.NICKNAME }}
            </span>
            <p class=“name”>{{ this.$store.state.userNickName }}</p>
            <i class="el-icon-edit"></i>
            <el-button id="btn" type="text" @click="changeName = true" :title="$store.state._const.CLICK_TO_CHANGE_NICKNAME">
                {{ $store.state._const.RESET_NAME }}
            </el-button><br><br>
            <i class="el-icon-message"></i>
            <span>
                {{ $store.state._const.EMAIL }}
            </span>
            <p>{{ this.$store.state.userEmail }}</p>
            <i class="el-icon-date"></i>
            <span>
                {{ $store.state._const.REGISTER_DATE }}
            </span>
            <p>
                {{ this.$store.state.registerDate }}
            </p>
        </div>
        <div class="game-info">
            <i class="el-icon-check"></i>
            <span>
                {{ $store.state._const.GAME_PROGRESS }}
            </span>
            <p>{{ finishedLevel }}</p>
            <i class="el-icon-close"></i>
            <span>
                {{ $store.state._const.REMAINED_LEVELS }}
            </span>
            <p>{{ remainedLevel }}</p>
        </div>
        <el-dialog :title="$store.state._const.RESET_NAME" :visible.sync="changeName" size="tiny">
            <el-form label-width="100px" class="demo-nameForm">
                <el-form-item :label="$store.state._const.NEWNICKNAME" class="form-name-item">
                    <el-input v-model="nickname"></el-input>
                </el-form-item>
                <el-form-item class="form-submit-item">
                    <el-button type="primary" id="submit" @click="nameSubmit">{{ $store.state._const.SUBMIT }}</el-button>
                    <el-button id="cancel" @click="changeName = false">{{ $store.state._const.CANCEL }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</div>
</template>

<script>
/**
* UserInfo 用户信息界面
*
* @class UserInfo
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from '@/assets/js/store.js'
import ResetPasswordForm from './ResetPasswordForm'
import { simplePost } from '@/assets/js/util.js'
import { Message } from 'element-ui'

export default {
    name: 'user-info',
    store: store,
    components: {
        ResetPasswordForm
    },
    data: function () {
        return {
            /**
            *已经完成的关卡数
            *
            * @property finishedLevel
            * @type {Number}
            */
            finishedLevel: null,
            /**
            *未完成的关卡数
            *
            * @property remainedLevel
            * @type {Number}
            */
            remainedLevel: null,
            /**
            *昵称
            *
            * @property nickname
            * @type {String}
            */
            nickname: null,
            changeName: false
        }
    },
    /**
    *
    *vue组件的mounted函数, 判断登录状态, 调用初始化函数
    *
    *@method mounted
    */
    mounted: async function () {
        if (this.$store.state.loginStatus === false) {
            await this.$store.dispatch('signin')
            if (await this.$store.state.loginStatus === false) {
                this.$message({
                    message: this.$store.state._const.LOGIN_FIRST,
                    type: 'warning'
                })
                this.$router.push('/')
            } else {
                this.init()
            }
        } else {
            this.init()
        }
    },
    methods: {
        /**
        *初始化函数, 读取当前用户的昵称等信息
        *
        *@method init
        */
        init: function () {
            this.finishedLevel = this.$store.state.userGameProgress
            this.remainedLevel = 15 - this.finishedLevel
            this.nickname = this.$store.state.userNickName
        },
        /**
        *更改昵称提交
        *
        *@method nameSubmit
        */
        nameSubmit: async function () {
            let response = await simplePost('api/change-nickname', {
                'nickname': this.nickname
            })
            let obj = await response.json()
            if (await obj.status === '1') {
                this.$store.commit('changeUserNickName', this.nickname)
                Message.success({message: this.$store.state._const.CHANGE_SUCCESS})
            } else {
                Message.error({message: this.$store.state._const.CHANGE_FALURE})
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-weight: normal;
    color: #A0522D;
    text-align: center;
    margin-top: 70px;
}
.user-info {
    margin-top: -30px;
    width: 100%;
    min-height: 760px;
    text-align: justify;
}
#btn {
    font-size: 20px;
    margin-top: -50px;
    padding-top: 0px;
}
.name {
    padding-bottom: 0px;
    margin-bottom: 0;
}
h2, p, span, i, input, .el-button {
    position: relative;
    left: 10%;
}
#btn:hover {
    padding-top: 0PX;
    color: #FF00FF;
    text-decoration: underline;
}
span {
    font-size: 20px;
    color: 	#2F4F4F;
    font-weight: 600;
}
p {
    font-size: 20px;
    color: black;
}
h2 {
    margin-bottom: -8px;
    font-size: 18px;
    color: #FA8072;
}
img {
    width: 15%;
    height: 15%;
}
.base-info p, .game-info p {
    border-radius: 30px;
    border: 18px solid transparent;
    border-image: url(../assets/img/border10.png) 100 120 round;
    width: 35%;
}
#img-id {
    float: right;
    margin-right: 10%;
    transition: width 2s,height 2s,transform 2s;
    border: 1px solid #BFBFBF;
    box-shadow: 2px 2px 3px #aaaaaa;
}
#img-id:hover {
    width: 20%;
    height: 20%;
    transform: skewX(30deg),skewY(50deg);
    transform: rotate(360deg);
}
@keyframes myfirst {
    from {background:#F0E6BC;}
    to {background:#7FFFD4;}
}
.el-icon-time, .el-icon-message, .el-icon-date {
    color: #FA8072;
}
.el-icon-check, .el-icon-close {
    color: #E9967A;
}
.el-icon-edit {
    color: #FF8C00;
}
.el-form {
    width: 100%;
}
.el-input {
    width: 80%;
    margin-bottom: 4%;
}
#submit {
    left: 5%;
}
#cancel {
    right: 5%;
}
.el-dialog {
    width: 30%;
    height: auto;
    text-align: center;
    background-image: url(../assets/img/border2.png);
    background-position: 2% -38px;
    background-size: 50%;
    background-repeat: no-repeat;
    border: 18px solid transparent;
    border-radius:25px;
    font-weight: 600;
    background-color: #F0FFFF;
}
</style>
