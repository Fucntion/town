<template>
<div class="wrap">
    <!--<header class="bar":style="{paddingTop:ishead+'px'}">
		<div class="bar-icon"><img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >{{wayInfo.name}}</div>
	</header>-->

    
         <div class="bar bar-clear notfixed" :style="{paddingTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/>
            <img v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right" @click="updateSerivces()">
        </div>
        <div class="bar_after"></div>

        <slider :List="wayInfo.pic" v-if="wayInfo.pic"></slider>


    <div id="introduction">
        <div class="titles">{{wayInfo.title}}
        </div>
    </div>

    <div class="message">
        <div class="rqm_title"><img src="~assets/img/hotel.png">路线详情:</div>
        <div v-html="wayInfo.content" class="m_content child_colo way_content">
        </div>
    </div>
</div>
</template>

<script>

     
    import Slider from 'plugin/slider'
    export default {
        name: 'way',
        data: function () {
            return {
                wayInfo: {},
                ishead:this.$util.istop(),
                isplus:this.$util.isEnvironment()
                // 分享
                
             
            }
        },
        methods: {

             updateSerivces:function(){

              this.$util.updateSerivces()
            },
            init: function () {

                var self = this,
                    wayId = self.$route.params.id

                this.$http.get('/lu/' + wayId).then(response => {

                    self.wayInfo = response.body.data

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
