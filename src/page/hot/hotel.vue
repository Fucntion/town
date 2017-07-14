<template>
    <div class="wrap white_wrap" v-if="hotelList.length>0">
        
         <div class="bar bot" :style="{paddingTop:ishead+'px'}">
             热门美食
            <img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)" />
            
        </div>
        <div class="bar_after"></div>
       
    
        <div class="hot_list_box block">
            <div class="hot_title">按类别浏览</div>
            <div class="hot_list">
                
                <div class="hot_item cate_item" v-for="item in hotelList"  @click="tohotel(item)">
                    <div class="thumb"  
                    :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.thumb + ')'}"></div>
                    <p class="name">{{item.name}}</p>
                    <!-- <span class="total"></span> -->
                </div>
            </div>
        </div>

        <div class="hot_list_box block">
            <div class="hot_title">热门美食</div>
            <div class="hot_list">
                
                <div class="hot_item cate_item" v-for="item in hotelList"  @click="tohotel(item)">
                    <div class="thumb"  
                    :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.thumb + ')'}"></div>
                    <p class="name">{{item.name}}</p>
                    <!-- <span class="total"></span> -->
                </div>
            </div>
        </div>
        
        
        <div class="hot_list_box block">
            <div class="hot_title">美食排行榜</div>
            <div class="hot_all_list">
                
                <div class="hot_item cate_item" v-for="(item,index) in hotelList" @click="tohotel(item)">
                    <div class="thumb"  
                    :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.thumb + ')'}"></div>
                    <div class="info">
                        <p class="name">{{item.name}}</p>
                        <p class="index">排名第{{index+1}}的美食</p> 
                        <p class="address">所在地：海口市</p> 
                        <p class="address">价格：{{item.price.toFixed(2)}}</p> 
                        <p class="address">推荐理由：价格实惠,服务好,环境安静</p> 
                    </div>
                </div>
            </div>
        </div>


        
    </div>
</template>
<script>
    export default {
        name: 'hot_area',
        data: function () {

            return {
                ishead: this.$util.istop(),
                hotelList:[]
            }
        },
        computed: {

        },
        methods: {

            tohotel:function(hotel){
				
				var self = this
				self.$router.push('/hotel/'+hotel.hotel_id)
			},
            init: function () {

                var self = this

                self.$http.get('/test/getHotel').then(response => {

                    if(!_.isArray(response.body.data))return
                    self.hotelList = self.$util.getRandomArrayElements(response.body.data,10)
                    
				}, response => {
					console.log("请求失败")
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


        }
    }

</script>
<style lang="less">

</style>