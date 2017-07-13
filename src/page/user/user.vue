<template>
<div class="wrap">

    <div class="user_picture ware_imgs" id="slider" >
       
        <div class="user_photo"><img src="~assets/img/photo.png" class="icon_photo" /></div>
        <div class="user_name">
            <p class="login"v-if="istoken" @click="toLogin()">登录/注册</p>
            <p class="edtr" v-if="!istoken">
                <span>游客20170547124</span>
                <!-- <span>编辑</span> -->
            </p>
        </div>
    </div>
    <div class="user-content">
       
        <div class="weui-cell weui-cell_access user_nav" @click="toOrder()">
            <div class="weui-cell__hd"><img src="~assets/img/order.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>订单中心</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
        <div class="weui-cell weui-cell_access user_nav" @click="toOrder()">
            <div class="weui-cell__hd"><img src="~assets/img/order.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>我的收藏</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
    </div>
    <div class="user_set">
        <!-- <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/psw.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>修改密码</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div> -->
        <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/service.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>联系客服</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
        <!-- <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/service.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>联系客服</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
        <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/service.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>联系客服</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div> -->
    </div>
    <div class="weui-btn-area" v-if="!istoken">
        <div class="weui-btn weui-btn_primary" @click="logout()">退出登录</div>
    </div>
   <foot></foot>
	
</div>
</template>

<script>
     import footer from 'plugin/footer'
    export default {
        name: 'ware',
        data: function () {

            return {
                login:{
                    account:null,
                    password:null
                },
               istoken:null,
               ishead:this.$util.istop(),

            }
        },
        methods: {
            toLogin:function(){

               this.$router.push('/login')
            },

            toRegister:function(){

              this.$router.push('/register')
            },
            logout:function(){
                localStorage.clear()
                this.$router.push('/')
            },
            toOrder:function(){

               this.$router.push('/orderlist')
            },
            init:function(){

                var self=this
               if(!localStorage.getItem('token')) {
                    self.istoken = true
                }else{
                    self.istoken = false
                }
            }

        },
        components: {
            foot:footer
        },
        watch: {

        },
        mounted() {
            
            var self=this
            self.init()
              



        }
    }

</script>
<style lang="less">

</style>
