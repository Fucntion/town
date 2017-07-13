<template>
<div class="wrap">
   <header class="bar" :style="{marginTop:ishead+'px'}">
		<div class="bar-icon"><img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >确认订单</div>
	</header>

    <div class="town-content marTop" :style="{marginTop:ishead+'px'}">

        <div class="address-box" @click="toaddress()" >
            <img src="../../assets/img/address_s.png"  class="icon_img order_icon left "/>
            <div class="info">
               <div class="info-group"> 收货人:<h2>{{name}}</h2><h2> {{tel}}</h2></div>
               <div class="info-group address"> 地址:{{address}}</div>
            </div>
            <img src="~assets/img/right.png" class="icon_img order_icon right"/>
        </div>

        <div class="ware-list" >
            <div class="ware-item">
                <img class="ware-thumb" v-if="wareInfo.goods_pic"  :src="'http://api.town.icloudinn.com/uploads/'+wareInfo.goods_pic[0].url" />
                <div class="ware-info">
                    <div class="info-group info-name">{{wareInfo.name}}</div>
                    <div class="info-group info-sku">商品规格:{{skuInfo.name}}</div>
                    <div class="info-group info-price"><span class="price">￥{{skuInfo.price}} </span><span> x{{order.number}}</span></div>
                </div>
            </div>

        </div>

        <div class="foot">
            <div class="count-box">合计：<span class="count">￥{{count}}</span></div>
            <!--<button class="btn-sub-order">提交订单</button>-->
            <button  class="btn-sub-order" v-for="channel in channels" :id="channel.id" @click="doOrder(channel.id)">提交订单</button>
        </div>


    </div>
</div>
</template>

<script>

     
    export default {
        name: 'order',
        data: function () {
            return {
                wareInfo:{},
                order:{
                    number:parseInt(sessionStorage.getItem('number'))
                },
                skuInfo:{},
                addressList:[],
                address:null,
                name:null,
                tel:null,
                isaddress:false,
                addressInfo:null,
                pays:{},
                w:null,
                // PAYSERVER:'http://api.town.icloudinn.com/order/pay/wx',
                channels:null,
                amount:null,
                ishead:null

            }
        },
        computed:{
            count:function(){
                var self = this
                return self.order.number*self.skuInfo.price
            }
        },
        methods: {

            initz:function(){

        			var self = this
        			// 获取支付通道
                if(window.plus){

                    plus.payment.getChannels(function(channels){

                        self.channels = channels
                        for(var i in channels){
                            var channel=channels[i];
                            if(channel.id=='qhpay'||channel.id=='qihoo'||channel.id=='alipay'){
                                continue;// 过滤掉不支持的支付通道：暂不支持360相关支付
                            }
                            self.pays[channel.id]=channel;
                            console.log(JSON.stringify(channel))
                        }
                    },function(e){
                        console.log('获取支付通道失败：'+e.message);
                    });
                }

            },
            doOrder:function(id){

                var self = this,
                url = '/order/list',

                count=this.count,
                arrPrice = document.querySelectorAll('.info-price'),

                strPrice = [],
                strNumber = [],
                strSkuId = []
                 for(var i=0;i<arrPrice.length;i++){

                    strPrice.push(self.skuInfo.price)
                    strNumber.push(self.order.number)
                    strSkuId.push(self.skuInfo.goods_id)

                }
                this.$http.post(url,{sku_price:strPrice,sku_number:strNumber,sku_id:strSkuId,address:self.address,count:count,link:self.name,tel:self.tel}).then(response => {

                    console.log(response.body)
                    console.log("下单成功");

                }, response => {
                   console.log(response.body)
                });

                // 支付
                if(self.w){return;}//检查是否请求订单中

                    self.w=plus.nativeUI.showWaiting();
                    console.log(self.w)

                    // 请求支付订单
                    this.$http.post('/order/pay/wx',{amount:count}).then(response => {

                        self.w.close();self.w=null;
                        console.log(response.body.data)
                        var order=response.body.data
                        plus.payment.request(self.pays[id],order,function(result){
                                    plus.nativeUI.alert('支付成功',function(){
                                        back();
                                    },'支付');
                                    self.$router.push('order/list')
                                },function(e){
                                    plus.nativeUI.alert(null, null, '支付失败：'+e.code);
                                });

                    }, response => {
                        self.w.close();self.w=null;
                        console.log(response.body)
                    });

             },
             inits:function(){

                    var self = this
                    if(this.isaddress){

                        self.address = self.addressInfo.province + self.addressInfo.city + self.addressInfo.area + self.addressInfo.detail;
                        self.name = self.addressInfo.link;
                        self.tel= self.addressInfo.tel

                    }else{
                        self.$http.get('/address/list').then(response => {
                            // get body data
                            self.addressList = response.body

                            if(self.addressList==null){
                                 self.address = "请选择地址";
                            }
                            else{
                                self.addressList.forEach(function(item,index){
                                    if(item.ismain==1){
                                        self.address = item.province + item.city + item.area + item.detail;
                                        self.name = item.link;
                                        self.tel=item.tel
                                    }
                                })
                            }

                        }, response => {
                            // error callback
                        });
                    }
             },
             toaddress:function(){
                 this.$router.push('/addressselect')
             }

        },
        components: {

        },
        watch: {

        },
        mounted() {

            var self= this

            self.skuInfo = JSON.parse(sessionStorage.getItem('select_sku'))
            self.wareInfo = JSON.parse(sessionStorage.getItem('wareInfo'))

            self.isaddress = sessionStorage.getItem('isaddress')
            self.addressInfo = JSON.parse(sessionStorage.getItem('addressInfo'))

            self.inits()
            self.initz()

              

        }
    }

</script>
<style lang="less">

</style>
