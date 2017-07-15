<template>
<div class="wrap farm-detail" v-if="show">

    <div class="bar bar-clear" :style="{paddingTop:ishead+'px'}">
        <img src="~assets/img/left.png" class="icon_img icon_left gray" onclick="javascript:history.go(-1)"/>
        <div class="bar-title" >认领—{{farmInfo.name}}</div>
        <img v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right gray" @click="updateSerivces()">
    </div>
    <!-- <div class="bar_after"></div> -->
    <slider :List="farmInfo.pic" v-if="farmInfo.pic"></slider>


    <div class="content">
      <div class="block">   
        <div class="rqm_title">规格介绍</div>
        <table class="sku_box" cellPadding="0" cellSpacing="0" >
          <tr>
            <th>
              编号
            </th>
            <th>
              认领价格
            </th>
            <th>
              回报
            </th>
            <th>
              状态
            </th>
          </tr>

        <tr class="sku_item" v-for="sku in farmInfo.sku" v-bind:class="{select: sku.status!=0}">
          <td>
            {{sku.name}}
          </td>
          <td>
            {{sku.price}}
          </td>
          <td>
            {{sku.repay}}
          </td>
          <td v-if="sku.status!=0">
            不可认领
          </td>
          <td v-else>
            可认领
          </td>
        </tr>
        </table>
      </div>
      <div class="block" v-if="farmInfo.news.length>0">
        <div class="rqm_titles">动态</div>
        <div class="news_box" v-for="news in farmInfo.news">
            <div class="news_time">{{news.inputtime}}</div>
            <div class="news_hr"> </div>
            <div class="news_img" @click="Tonews(news)">
                <div class="news_title">{{news.title}}</div>
                <img  :src="news.thumb">
            </div>
        </div>
      </div>
      <div class="block">
        <div class="rqm_title">商品详情</div>
        <div v-html="farmInfo.content" class="m_content child_color"></div>
      </div>
    </div>

    <nav  id="foot">
        <button class="town-tab-item town-btn weui-btn weui-btn_primary" @click="change()">我要认领</button>
    </nav>
    <div id="choose" v-if="news_show">
        <div class="news_info">
            <div class="top" :style="{paddingTop:ishead+'px'}">
               <div class="title town-pull-left">动态内容</div>
                <i  @click="colsenews()" class="weui-icon-cancel icon-close"></i>
            </div>
            <div class="news_content" v-html="newsinfo.content"></div>
        </div>
    </div>
    <div id="choose" v-if="box_show">
        <div class="goodsc" style="height: auto;">
            <div class="top">
                <div class="title town-pull-left">请选择您要认领的类型</div>
                <i  @click="change()" class="weui-icon-cancel icon-close"></i>
            </div>
            <div class="goods_sku">

                <div class="sku_group">
                    <div class="s_title">产品规格:</div>
                    <div class="s_content ">
                        <div v-for="item in farmInfo.sku"
                        v-if="item.name" @click="select(item)" class="gdiv"  v-bind:class="{active: item.farms_sku_id==active_sku_id,disabled: item.status!=0}">{{item.name}}</div>
                    </div>
                </div>
                  <div class="sku_group" >
                        <div class="s_title">认领回报:</div>
                        <div class="s_content ">
                          <span v-if="select_sku">{{select_sku.repay}}</span>
                        </div>
                  </div>
                    <div class="sku_group" >
                          <div class="s_title">单价:</div>
                          <div class="s_content ">
                          <span v-if="select_sku" style="color:red">￥{{select_sku.price | formatMoney}}</span>
                          </div>
                    </div>
                <!-- <div class="sku_group">
                    <div class="s_title">商品数量:</div>
                    <div class="number s_content">
                        <span @click="minus()" class="minus">-</span>
                        <input type="number" class="input-number" v-model.number="number" >

                        <span @click="plus()" class="plus">+</span>
                    </div>
                </div> -->
            </div>
            <button @click="sendorder()" class="weui-btn weui-btn_primary goorder ">付费认领</button>
        </div>
    </div>
</div>
</template>

<script>

     
    import Slider from 'plugin/slider'
    export default {
        name: 'farm',
        data: function () {
            return {
                farmInfo: {},
                box_show:false,
                show:false,
                // number:1,
                select_sku:null,
                active_sku_id:null,
                w:null,
                pays:{},
                channels:null,
                amount:null,
                ishead:this.$util.istop(),
                isplus:this.$util.isEnvironment(),
                newsinfo:null,
                news_show:false,
                pays:{},
                w:null,
                channels:null
            }
        },
        // 过滤器
        filters: {
            formatMoney: function (value) {
                // console.log(this.hotelInfo.price);
                if(value==undefined){
                    return value
                }else{
                return value.toFixed(2);
                }
            }
        },
        methods: {
            updateSerivces: function () {

                this.$util.updateSerivces()
            },
            select:function(sku){
              if(sku.status!=0){
                alert('已经被人认领啦');
                return;
              }
                var self = this
                self.select_sku = sku
                self.active_sku_id = sku.farms_sku_id
                self.repay = sku.repay
            },
            change:function(){
                var self = this
                self.box_show = !self.box_show
                console.log("wowo")
            },
            init: function () {

                var self = this,
                    farmId = self.$route.params.id

                this.$http.get('/farm/' + farmId).then(response => {


                    self.farmInfo = response.body.data
                    self.farmInfo.pic = []
                    for(var key in self.farmInfo.sku){
                        self.farmInfo.sku[key].url = self.farmInfo.sku[key].picture
                        self.farmInfo.pic.push(self.farmInfo.sku[key])
                    }
                    // self.select_sku = self.farmInfo.sku[0]
                    // self.active_sku_id = self.farmInfo.sku[0].farms_sku_id
                    self.show = true

                    this.$nextTick(function () {

                        var gallery = mui('.mui-slider')
                        gallery.slider({
                            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })


                }, response => {
                    // error callback
                });
            },
            sendorder:function(){

                var self =this,
                post = {
                  farms_sku_id:self.select_sku.farms_sku_id,
                  farms_sku_price:self.select_sku.price,
                }
                self.$http.post('/farm/order',post).then((response)=>{

                if(response.body.code ==100){
                  self.pay(response.body.data)
                  alert("下单成功")
                }

                },(response)=>{
                    alert("下单失败")
                })

            },
            pay:function(amount){

              var self =this,
              type = 'wxpay'
              console.log(amount.count)
              // 支付
              if(self.w){return;}//检查是否请求订单中

                  self.w=plus.nativeUI.showWaiting();

                  // 请求支付订单
                  this.$http.post('/order/pay/wx',{amount:amount.count}).then(response => {

                      self.w.close();self.w=null;

                      var order=response.body.data

                      alert('支付了')
                      //写死微信了
                      plus.payment.request(self.pays[type],order,function(result){

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
            initPay:function(){

        			var self = this
              console.log('issisis')
        			// 获取支付通道
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


            },
            Tonews:function(news){

                var self=this

                self.newsinfo=news

                self.news_show=true

            },
            colsenews:function(){

                var self=this
                self.news_show=!self.news_show
            }

        },
        components: {
             slider:Slider
        },
        watch: {

        },
        mounted() {
            var self = this
            self.init()
            mui.plusReady(function(){
                self.initPay()
            })

             
        }
    }

</script>
<style lang="less">

</style>
