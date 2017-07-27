<template>
    <div class="wrap login_wrap">
        <div class="bar bar-clear" :style="{marginTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left  gray" @click="$util.toBack()" />
        </div>

        <div class="login_box">
            <div class="town-input-group">
                <div class="weui-cell">
                    <!-- <div class="weui-cell__hd"><label class="weui-label">账号</label></div> -->
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="login.account" placeholder="账号/手机/邮箱">
                    </div>
                </div>
                <div class="weui-cell">
                    <!-- <div class="weui-cell__hd"><label class="weui-label">密码</label></div> -->
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="password" v-model="login.password" placeholder="密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <!-- <div class="weui-cell__hd"><label class="weui-label">密码</label></div> -->

                </div>
            </div>
            <div class="town-button-row">
                
                <wv-button @click="toRegister()" type="default login_btn" :mini="true">注册</wv-button>
                <wv-button  @click="doLogin()" type="primary login_btn" :mini="true">登录</wv-button>
                <!-- <div  class="weui-btn weui-btn_warn">注册</div>
                <div  class="weui-btn weui-btn_primary">登录</div> -->
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data: function () {

            return {
                login: {
                    account: null,
                    password: null
                },
                ishead: this.$util.istop(),


            }
        },
        methods: {
            user: function () {
                this.$router.push('/')
            },
            doLogin: function () {

                var self = this,
                    data = self.login;
                if (!self.login.account || !self.login.password) {

                    WeVue.Toast({
                        duration: 1000,
                        message: '账号密码不能为空',
                        type: 'text'
                    })

                } else {
                    this.$http.post('/user/login', data).then(response => {
                        var result = response.body;


                        var datas = JSON.parse(result.data);
                        console.log(result);
                        if (result.code == 100) {
                            var access_token = datas.data.access_token;
                            localStorage.setItem("token", access_token);

                            WeVue.Toast({
                                duration: 1000,
                                message: '登录成功',
                                icon: 'success'
                            })

                            setTimeout(function () {

                                if (self.$route.query.isRegister) {
                                    self.$router.push('/')
                                } else {
                                    self.$router.back()
                                }

                            }, 1000);

                        } else {
                            WeVue.Toast({
                                duration: 1000,
                                message: '登录失败',
                                icon: 'warn'
                            })
                            self.login = {
                                account: null,
                                password: null
                            }



                        }

                    }, response => {
                        // error callback
                    });
                }
            },
            toRegister: function () {

                var self = this

                self.$router.push('/register')
            }

        },
        components: {

        },
        watch: {

        },
        mounted() {

            var self = this



        }
    }

</script>
<style lang="less">

</style>