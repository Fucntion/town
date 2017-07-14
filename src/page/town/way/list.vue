<template>
<div class="wrap list_wrap">
	 <header class="bar" :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)" />
		旅游路线
	</header>
	<div class="bar_after" :style="{paddingTop:ishead+'px'}"></div>
	<div id="main" class="town-content " >
		
		<div class="swiper-container card_container" :style="{paddingTop:swiperTop+ishead/2+44+'px'}">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="(way,index) in wayList"  @click="toway(way.lu_id)" >
					<div class="hands_img card_img" >
						
						<div class="img" :style="{backgroundImage: 'url('+ way.thumb + ')'}"></div>
						<!--<div class="fram_title">{{ware.name}}</div>-->
						<div class="card_mask"></div>
					</div>		
				</div>
			</div>
		</div>
		
		
		
	</div>
</div>
</template>

<script>
 
export default {
	name:'home',
	data: function() {

		return {
			wayList:[],
			ishead:this.$util.istop(),
			swiperTop:this.$util.swiperTop()
		}
	},
	methods: {

		toway:function(goods_id){

			this.$router.push('/way/'+goods_id)

		},
		// 轮播
		Swiper:function(){
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: 5000,
					loop: true,
					effect : 'coverflow',
					slidesPerView:1.4,
					centeredSlides: true,
					coverflow: {
								rotate: 20,
								stretch:-18,
								depth: 60,
								modifier: 2,
								slideShadows : false
						},		
				})
		}
	},
	components: {
		 
	},
	watch: {

	},
	mounted() {

		var self = this
			//   
		
		self.$http.get('/lu/list').then(response => {

			//   

			if(!_.isArray(response.body.data))return
			self.wayList = response.body.data
			// console.log(response.body.data)
			// console.log( self.wayList.thumb)
			 
			self.$nextTick(function () {
				self.Swiper() 
			})

		}, response => {
			// error callback
		});

    	  
	}
}
</script>
<style lang="less">

</style>
