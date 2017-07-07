<template>
<div class="wrap">
  <!-- <header class="bar">
		<div class="bar-title" >个人中心</div>
	</header>-->
    <div class="user_picture ware_imgs" id="slider" >
        <!--<div class="slider-icon" :class="{head:ishead}">
            <img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/>
        </div>-->
        <div class="user_photo"><img src="~assets/img/photo.png" class="icon_photo" /></div>
        <div class="user_name">
            <p class="login"v-if="istoken" @click="toLogin()">登录/注册</p>
            <p class="edtr" v-if="!istoken">
                <span>游客20170547124</span>
                <span>编辑</span>
            </p>
        </div>
    </div>
    <div class="user-content">
        <!--<div class="weui-cell weui-cell_access user_nav"  @click="toLogin()" v-if="istoken">
            <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>登录</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
         <div class="weui-cell weui-cell_access user_nav" @click="toRegister()" v-if="istoken">
            <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>注册</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>-->
        <div class="weui-cell weui-cell_access user_nav" @click="toOrder()">
            <div class="weui-cell__hd"><img src="~assets/img/order.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>订单中心</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
    </div>
    <div class="user_set">
        <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/psw.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>修改密码</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
        <div class="weui-cell weui-cell_access user_nav">
            <div class="weui-cell__hd"><img src="~assets/img/service.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd weui-cell_primary">
                <p>联系客服</p>
            </div>
            <span class="weui-cell__ft"></span>
        </div>
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
               ishead:null,

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
            console.log('user')
            // var self=this
            // self.init()
              



        }
    }

</script>
<style lang="less">

</style>
