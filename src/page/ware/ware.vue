<template>
<div class="wrap" v-if="show">
    <!--<header class="bar":style="{paddingTop:ishead+'px'}">
		<div class="bar-icon"><img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >{{wareInfo.name}}</div>
	</header>-->


         <div class="bar bar-clear notfixed" :style="{paddingTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/>
            <img v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_left" @click="updateSerivces()">
        </div>
        <div class="bar_after"></div>

        <slider :List="wareInfo.goods_pic" v-if="wareInfo.goods_pic"></slider>


    <div id="introduction">
        <div class="titles">{{wareInfo.name}}
        </div>
        <div class="prices"><span>￥</span>{{wareInfo.price | formatMoney }}<span class="rise">起</span>
        </div>

    </div>

    <div class="message">
        <div class="rqm_title"><img src="~assets/img/hotel.png">商品详情:</div>
        <div v-html="wareInfo.content" class="m_content child_color">
        </div>
    </div>

    <nav  id="foot">

        <button class="town-tab-item town-btn weui-btn weui-btn_primary" @click="change()">立即购买</button>

    </nav>

    <div id="choose" v-if="box_show">
        <div class="goodsc" style="height: auto;">
            <div class="top">
                <div class="title town-pull-left">请选择您想样的商品类型</div>
                <i  @click="change()" class="weui-icon-cancel icon-close"></i>
                
            </div>
            <div class="goods_sku">

                <div class="sku_group">
                    <div class="s_title">商品规格:</div>
                    <div class="s_content ">
                        <div v-for="item in wareInfo.goods_sku"
                        v-if="item.name" @click="select(item)" class="gdiv" v-bind:class="{active: item.goods_sku_id==active_sku_id }">{{item.name}}</div>
                    </div>
                </div>
                <div class="sku_group">
                    <div class="s_title">单价:</div>
                    <div class="s_content ">
                        <span v-if="select_sku" style="color:red">￥{{select_sku.price | formatMoney}}</span>
                    </div>
                </div>
                <div class="sku_group">
                    <div class="s_title">商品数量:</div>
                    <div class="number s_content">
                        <span @click="minus()" class="minus">-</span>
                        <input type="number" class="input-number" v-model.number="number" >

                        <span @click="plus()" class="plus">+</span>
                    </div>
                </div>
            </div>
            <button @click="toorder()" class="weui-btn weui-btn_primary goorder ">确认订单</button>
        </div>
    </div>
</div>
</template>

<script>

     
    import Slider from 'plugin/slider'
    export default {
        name: 'ware',
        data: function () {
            return {
                wareInfo: {},
                box_show:false,
                show:false,
                number:1,
                select_sku:null,
                active_sku_id:null,
                ishead:this.$util.istop(),
                isplus:this.$util.isEnvironment(),
                // 分享
                
             
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
             // 更新分享服务及发布分享
             updateSerivces:function(){

              this.$util.updateSerivces()
            },

            select:function(goods_sku){

                var self = this
                self.select_sku = goods_sku
                self.active_sku_id = goods_sku.goods_sku_id
        
            },
            change:function(){
                var self = this
                self.box_show = !self.box_show
                console.log("wowo")
            },
            init: function () {

                var self = this,
                    wareId = self.$route.params.id

                this.$http.get('/ware/' + wareId).then(response => {


                    self.wareInfo = response.body.data
                    self.select_sku = self.wareInfo.goods_sku[0]
                    self.active_sku_id = self.wareInfo.goods_sku[0].goods_sku_id
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
            toorder:function(){

                var self =this
                if(self.select_sku && self.number>0){

                    sessionStorage.setItem('select_sku',JSON.stringify(self.select_sku))
                    sessionStorage.setItem('wareInfo',JSON.stringify(self.wareInfo))
                    sessionStorage.setItem('number',self.number)
                     this.$router.push('/order')

                }else{
                    alert('未选择商品')
                }

            },
            plus:function(){
                var self = this
                self.number++
            },
            minus:function(){
                var self =this
                if(self.number==1)return

                this.number--



            }

        },
        components: {
            slider:Slider
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
