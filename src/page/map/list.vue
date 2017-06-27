<template>
<div class="wrap goods_wrap">
	<header class="bar" :class="{head:ishead}">
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >伴手礼</div>
	</header>
	 <div class="town-content hand_info marTop" :class="{head:ishead}">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="hands_img">
						<img src="http://api.town.icloudinn.com/static/img/slider1.png">
					</div>		
				</div>
				<div class="swiper-slide">
					<div class="hands_img">
						<img src="http://api.town.icloudinn.com/static/img/slider2.png">
					</div>
				</div>
				<div class="swiper-slide">
					<div class="hands_img">
						<img src="http://api.town.icloudinn.com/static/img/slider3.png">
					</div>
				</div>
				<div class="swiper-slide">
					<div class="hands_img">
						<img src="http://api.town.icloudinn.com/static/img/slider4.png">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>

	import Store from 'store'
	// import 'static/css/swiper-3.4.2.min.css'
    // import 'static/js/swiper-3.4.2.min.js'
	export default {
		name: 'home',
		data: function () {

			return {
				ishead:null
			}
		},
		computed: {

		},
		methods: {
			// 轮播
			Swiper:function(){
					var mySwiper = new Swiper('.swiper-container', {
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
			
			var self=this
			self.Swiper() 
				
			self.ishead = Store.getters.getvisible;
		}
	}

</script>
<style lang="less">
	
</style>
