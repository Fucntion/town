<template>
<div class="wrap">
     <header class="bar" :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()" />
		民宿酒店
    </header>
    <div class="bar_after" :style="{paddingTop:ishead+'px'}"></div>

    <div class="town-content  js-content">
        <div id="hotel" class="hotel_box">
            <div class="town-row">
                <div @click="toHotel(item)" class="town-col-xs-12" v-for="item in hotelList" 
                :style="{backgroundImage: 'url(' + item.thumb + ')'}">
                    <div class="hotel_title">{{item.name}}</div>
                    <div class="hotel_number"><span>{{parseInt(Math.random()*100)+1}}</span>人来过</div>
                    <div class="mask"></div>
                </div>

            </div>
        </div>
   </div>

</div>
</template>

<script>
	 
export default {
	name:'hotellist',
	data: function() {

		return {
            hotelList: [],
            ishead:this.$util.istop()
           
            
		}
	},
    computed:{
        
    },
	methods: {
		toHotel:function(item){

			this.$router.push('/hotel/'+item.hotel_id)
		}
       
	},
	components: {
		// 
	},
	watch: {

	},
	mounted() {

        var self = this

          
        
        this.$http.get('/hotel/list').then(response => {

            self.hotelList = response.body.data

            this.$nextTick(function () {

                    var gallery = mui('.mui-slider')
                    gallery.slider({
                        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                })
        }, response => {
            // error callback
        });
        
         
        
        var top = $('.js-content').offset().top;
        
	}
}
</script>
<style lang="less">

</style>
