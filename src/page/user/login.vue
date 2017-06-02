<template>
<div class="wrap">
    <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" @click="user()"/></div>
		<div class="bar-title">登录</div>
	</header>
    <div class="town-content marTop" :class="{head:ishead}" >
        <div class="town-input-group">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">账号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="login.account" placeholder="账号/手机/邮箱">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" v-model="login.password" placeholder="密码">
                </div>
            </div>
        </div>
    </div>
    <div class="town-button-row">
        <a href="javascript:;" @click="doLogin()" class="weui-btn weui-btn_primary">登录</a>
        <a href="javascript:;" @click="toRegister()" class="weui-btn weui-btn_warn">注册</a>
    </div>
    <div id="toast" v-if="css_show">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-warn weui-icon_msg warn_show" v-if="failure_show"></i>
            <i class="weui-icon-success-no-circle weui-icon_toast" v-if="win_show"></i>
            <p class="weui-toast__content">{{judge}}</p>
        </div>
    </div>
</div>
</template>

<script>

    import Store from 'store'
    export default {
        name: 'ware',
        data: function () {

            return {
                login:{
                    account:null,
                    password:null
                },
                css_show:false,
                failure_show:false,
                win_show:false,
                judge:null,
                ishead:null


            }
        },
        methods: {
             user:function(){
                 this.$router.push('/')
             },
             doLogin:function(){

                var self = this,
                url = '/user/login',
                data = self.login;
                if(self.login.account==null || self.login.password==null){

                     self.judge = "不能为空"
                     self.css_show = true
                     self.failure_show = true
                     self.win_show =false
                     setTimeout(function () {
                        self.css_show = false
                    }, 1000);
                }else{
                    this.$http.post(url,data).then(response => {
                    var result = response.body;
                    console.log(result);

                    var datas = JSON.parse(result.data);
                    var access_token = datas.data.access_token;
                    if(result.code == 100){

                        localStorage.setItem("token",access_token );

                        self.judge = "登录成功"
                        self.css_show = true
                        self.win_show = true
                        self.failure_show =false
                        setTimeout(function () {
                            self.css_show = false
                            self.$router.back()
                        }, 1000);

                    }else{

                        self.judge = "登录失败"
                        self.css_show = true
                        self.failure_show = true
                        self.win_show = false
                        setTimeout(function () {
                            self.css_show = false
                            window.location.reload();
                        }, 1000);

                    }

                    }, response => {
                        // error callback
                    });
                }
             },
             toRegister:function(){

                 var self = this

                 self.$router.push('/register')
             }

        },
        components: {

        },
        watch: {

        },
        mounted() {

            var self=this
            self.ishead = Store.getters.getvisible;


        }
    }

</script>
<style lang="less">

</style>
