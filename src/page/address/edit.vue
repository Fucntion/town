<template>
<div class="wrap">
   <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >选择收货地址</div>
        <div class="bar-right" @click="present()">保存</div>
	</header>
    <div class="town-content marTop" :class="{head:ishead}">
        <div class="town-input-group">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">收货人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="addressInfo.link">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">联系号码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" v-model="addressInfo.tel">
                </div>
            </div>
            <div class="weui-cell" id='showCityPicker3'>
                <div class="weui-cell__hd"><label class="weui-label">所在的地区</label></div>
                <div class="weui-cell__bd">
                    <div class="address" id='cityResult3'>
                        {{address}}
                    </div>
                    <!-- <input class="weui-input" type="text" v-model="address" id='cityResult3'> -->
                    <input type="hidden" class="town-input-clear" v-model="addressInfo.province">
                    <input type="hidden" class="town-input-clear" v-model="addressInfo.city">
                    <input type="hidden" class="town-input-clear" v-model="addressInfo.area">
                </div>
                <img src="../../assets/img/right.png" class="icon_img address_icon"/>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="addressInfo.detail">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__set">
                    <label v-if="addressInfo.ismain=='1'">默认地址</label>
                    <label v-if="addressInfo.ismain=='0'" @click="setIs()">设为默认地址</label>
                </div>
            </div>
        </div>
    </div>
    <div class="address_remove">
        <div class="weui-cell">
                <div class="weui-cell__remove">
                     <label @click="del(addressInfo.address_id)">删除地址</label>
                </div>
        </div>
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
    import 'static/css/mui.picker.css'
    import 'static/css/mui.poppicker.css'
    var cityData3=require('static/js/city.data-3.js')

    export default {
        name: 'editoraddress',
        data: function () {
            return {
                show:false,
                addressInfo:{},
                isDefault:null,
                css_show:false,
                failure_show:false,
                win_show:false,
                judge:null,
                ishead:null
            }
        },
        computed:{
            address:function(){
                var self = this
                return self.addressInfo.province + ' ' + self.addressInfo.city + ' ' +self.addressInfo.area
            },
        isDefault:function(){
                var self = this
                if(self.addressInfo.ismain==1){
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {

            init: function () {

                var self = this,
                    addressId = self.$route.params.id

                this.$http.get('/address/' + addressId).then(response => {

                    self.addressInfo = response.body
                    console.log(self.addressInfo)
                    // self.show = true

                }, response => {
                    // error callback
                });
            },
            inits:function(){
                    var self = this
                    var cityPicker3 = new window.mui.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(cityData3);
                    var showCityPickerButton = document.getElementById('showCityPicker3');
                    var cityResult3 = document.getElementById('cityResult3');
                    showCityPickerButton.addEventListener('tap', function(event) {
                        cityPicker3.show(function(items) {
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
            // 修改
            present:function(){

                 var self = this,
                addressId = self.$route.params.id,
                url = '/address/' + addressId;

            this.$http.post(url,{link:this.addressInfo.link,tel:this.addressInfo.tel,province:this.addressInfo.province,city:this.addressInfo.city,	area:this.addressInfo.area,detail:this.addressInfo.detail,ismain:this.addressInfo.ismain}).then(response => {

                    var result = response.body;
                    console.log(result);
                   if(result.code == 12){

                        self.judge = "修改成功"
                        self.css_show = true
                        self.win_show = true
                        self.failure_show = false
                        setTimeout(function () {
                            self.css_show = false
                            self.$router.push('/addresslist')
                        }, 1000);

                    }else{

                        self.judge = "修改失败"
                        self.css_show = true
                        self.failure_show = true
                        self.win_show = false
                        setTimeout(function () {
                            self.css_show = false
                        }, 1000);
                    }
                    }, response => {
                    console.log(response.body)
                    });
            },
            setIs:function(){
               this.addressInfo.ismain = 1;
            },
             //删除收货地址
            del:function(item){

                var self = this
                self.$http.post('/address/del',{addrId:item}).then(response => {
                var result = response.body;
                    if(result.code == 101){

                        self.judge = "删除成功"
                        self.css_show = true
                        self.win_show = true
                        self.failure_show = false
                        setTimeout(function () {
                            self.css_show = false
                            self.$router.push('/addresslist')
                        }, 1000);

                    }else{
                        self.judge = "删除失败"
                        self.css_show = true
                        self.failure_show = true
                        self.win_show = false
                        setTimeout(function () {
                            self.css_show = false
                        }, 1000);
                    }

                }, response => {
                    console.log(response.body)
                });
            }

        },
        components: {

        },
        watch: {

        },
        mounted() {

            var self = this
            self.init()
            self.inits()
            self.ishead = Store.getters.getvisible;

        }
    }

</script>
<style lang="less">
</style>
