<template>
    <div class="wrap white_wrap" v-if="wareList.length>0">
        
         <div class="bar bot" :style="{paddingTop:ishead+'px'}">
             特色商品
            <img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()" />
            
        </div>
        <div class="bar_after"></div>
       
    
        <div class="hot_list_box block">
            <div class="hot_title">按类别浏览</div>
            <div class="hot_list">
                
                <div class="hot_item cate_item" v-for="item in wareList"  @click="toware(item)">
                    <div class="thumb"  v-if="item.thumb"
                    :style="{backgroundImage: 'url(' + item.thumb + ')'}"></div>
                    <p class="name">{{item.name}}</p>
                    <!-- <span class="total"></span> -->
                </div>
            </div>
        </div>

        <div class="hot_list_box block">
            <div class="hot_title">热门</div>
            <div class="hot_list">
                
                <div class="hot_item cate_item" v-for="item in wareList"  @click="toware(item)">
                    <div class="thumb"  v-if="item.thumb"
                    :style="{backgroundImage: 'url(' + item.thumb + ')'}"></div>
                    <p class="name">{{item.name}}</p>
                    <!-- <span class="total"></span> -->
                </div>
            </div>
        </div>
        
        
        <div class="hot_list_box block">
            <div class="hot_title">排行榜</div>
            <div class="hot_all_list">
                
                <div class="hot_item cate_item" v-for="(item,index) in wareList" @click="toware(item)">
                    <div class="thumb"  v-if="item.thumb"
                    :style="{backgroundImage: 'url(' +item.thumb + ')'}"></div>
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
        name: 'hot_ware',
        data: function () {

            return {
                ishead: this.$util.istop(),
                wareList:[]
            }
        },
        computed: {

        },
        methods: {

            toware:function(ware){
				
				var self = this
				self.$router.push('/ware/'+ware.goods_id)
			},
            init: function () {

                var self = this

                self.$http.get('/test/getGoods').then(response => {

                    if(!_.isArray(response.body.data))return
                    self.wareList = self.$util.getRandomArrayElements(response.body.data,10)
                    
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