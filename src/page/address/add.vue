<template>
<div class="wrap">
     <header class="bar" :style="{paddingTop:ishead+'px'}">
		<div class="bar-icon"><img src="~assets/img/left.png" class="icon_img  icon_left" @click="$util.toBack()"/></div>
		<div class="bar-title" >添加收货地址</div>
    </header>
    <div class="bar_after"></div>
    <div class="town-content ">
        <div class="town-input-group">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">收货人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入收货人姓名" v-model="addressInfo.link">
                </div>
            </div>
             <!-- <div class="weui-cell phone">
                <div class="weui-cell__hd"><label class="weui-label">+86</label></div>
                <div class="weui-cell__bd">
                    中国
                </div>
                <i class="icon-angle-right iconfont address_icon right"></i>
            </div> -->
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入收货人的手机号" v-model="addressInfo.tel">
                </div>
            </div>
            <div class="weui-cell" id='showCityPicker3'>
                <div class="weui-cell__hd"><label class="weui-label">所在的地区</label></div>
                <div class="weui-cell__bd">
                    <div class="address" id='cityResult3'>
                        {{address}}
                    </div>
                    <!-- <input class="weui-input" type="text" placeholder="--请选择--" v-model="address" id='cityResult3' > -->
                    <!--<div id='cityResult3'>{{address}}</div>-->
                    <input type="hidden" class="town-input-clear" placeholder="请输入您所在的省" v-model="addressInfo.province">
                    <input type="hidden" class="town-input-clear"  placeholder="请输入您所在的市" v-model="addressInfo.city">
                    <input type="hidden" class="town-input-clear" placeholder="请输入您所在的县区" v-model="addressInfo.area">
                </div>
                <i class="icon-angle-right iconfont address_icon right"></i>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入详细地址" v-model="addressInfo.detail">
                </div>
            </div>
            <div class="weui-cell weui-cell_switch">
                <div class="weui-cell__bd">设为默认地址</div>
                <div class="weui-cell__ft">
                    <label for="switchCP" class="weui-switch-cp">
                        <input id="switchCP" class="weui-switch-cp__input" type="checkbox"  @click="active()">
                        <div class="weui-switch-cp__box"></div>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="doAddress()">确定</a>
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

    import 'static/css/mui.picker.css'
    import 'static/css/mui.poppicker.css'
    var cityData3=require('static/js/city.data-3.js')

    export default {
        name: 'addressadd',
        data: function () {
            return {
               address:null,
               addressInfo:{
                    link:null,
                    tel:null,
                    province:null,
                    city:null,
                    area:null,
                    detail:null,
                    ismain:0
                },
                on:true,
                css_show:false,
                failure_show:false,
                win_show:false,
                judge:null,
                ishead:null


            }
        },
        methods: {
            active:function(){
                var self = this
                self.on=!self.on
                if(self.on){
                    self.addressInfo.ismain = 1
                }else{
                    self.addressInfo.ismain = 0
                }
            },

            doAddress:function(){

                var self = this,

                data = self.addressInfo
                if(!self.addressInfo.link||!self.addressInfo.tel||!self.addressInfo.province||!self.addressInfo.city||!self.addressInfo.area||!self.addressInfo.area||!self.addressInfo.detail){
                   WeVue.Toast({
                        duration: 1000,
                        message: '信息不完整',
                        type: 'text'
                    })
                    return  
                }

                 if (!self.$util.checkPhone(self.addressInfo.tel)) {
					
					WeVue.Toast({
						duration: 1000,
						message: '联系方式格式不符',
						type: 'text'
					})
					return
				}

                this.$http.post('/v1/delivery_address',data).then(response => {
                    var result = response.body;
                    console.log(result)
                    if(result.code == 100){

                        WeVue.Toast({
                            duration: 1000,
                            message: '添加成功',
                            icon: 'success'
                        })
                        self.$router.push('/addresslist')
                        

                    }else{

                        WeVue.Toast({
                            duration: 1000,
                            message: '添加失败',
                            icon: 'error'
                        })
                        
                        
                    }

                }, response => {
                    // error callback
                });
             },
             init:function(){

                    var self = this
                    var cityPicker3 = new window.mui.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(cityData3);
                    var showCityPickerButton = document.getElementById('showCityPicker3');
                    var cityResult3 = document.getElementById('cityResult3');
                    showCityPickerButton.addEventListener('tap', function(event) {
                        cityPicker3.show(function(items) {
                            console.log(items)
                            if((items[2] || {}).text == undefined){
                                (items[2] || {}).text =' ';
                            }
                            self.addressInfo.province = (items[0] || {}).text;
                            self.addressInfo.city = (items[1] || {}).text;
                            self.addressInfo.area = (items[2] || {}).text;
                            self.address = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                            //返回 false 可以阻止选择框的关闭
                            //return false;
                        });
                    }, false);

             },
            doAddresslist:function(){
                this.$router.push('/addresslist')
            }
        },
        components: {

        },
        watch: {

        },
        mounted() {
            var self = this
            self.init()



        }
    }
</script>
<style lang="less">
</style>
