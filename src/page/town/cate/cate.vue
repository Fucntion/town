<template>
<div class="wrap">


   <div class="bar bar-clear" :style="{paddingTop:ishead+'px'}">
        <img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()"/>
        <img src="~assets/img/share.png" v-if="isplus=='plus'"  class="icon_img icon_right gray" @click="updateSerivces()">
    </div>


    <slider :List="cateInfo.pic" v-if="cateInfo.pic"></slider>


    <div id="introduction">
        <div class="titles">{{cateInfo.name}}
        </div>
        <div class="prices"><span>￥</span>{{cateInfo.price| formatMoney }}<span class="rise">起</span>
        </div>
    </div>

    <div class="message padding_bottom_50">
        <div class="rqm_title"><img src="~assets/img/hotel.png">商品详情</div>
        <div v-html="cateInfo.content" class="m_content child_color">
        </div>
    </div>

    <nav  id="foot">

        <button class="town-tab-item town-btn weui-btn weui-btn_primary">立即预订</button>

    </nav>
</div>
</template>

<script>

     
    import Slider from 'plugin/slider'
    export default {
        name: 'cate',
        data: function () {
            return {
                cateInfo: {},
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
           
            init: function () {

                var self = this,
                    cateId = self.$route.params.id

                this.$http.get('/cate/' + cateId).then(response => {

                    self.cateInfo = response.body.data

                    this.$nextTick(function () {

                        var gallery = mui('.mui-slider')
                        gallery.slider({
                            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })


                }, response => {
                    // error callback
                });
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
