<template>
	<div class="wrap"> 
	<div class="bar"   :style="{paddingTop:ishead+'px'}" v-if="isplus=='plus'">
		发现
		<!--<div class="search-bar" >
			<div class="scan" @click="Toscan()" v-show="is_plus" ></div>

		</div>-->
	</div>
	<div class="bar_after" :style="{paddingTop:ishead+'px'}"></div>


		<div class="swiper-container card_container" :style="{paddingTop:isplus=='plus'?swiperTop+ishead/2+44+'px':swiperTop+'px'}">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="lu in luList"  @click="todetail(lu.lu_id)" >
					<div class="hands_img card_img" >
						
						<div class="img" :style="{backgroundImage: 'url('+lu.thumb + ')'}"></div>
						
						<div class="card_mask"></div>
					</div>		
				</div>
			</div>
		</div>

		<foot></foot>
	</div>
</template>
<script>
	// 贼心不死，来弄个发现
	import footer from 'plugin/footer'
	// require('assets/js/immersed.js');

	export default {
		name: 'find',
		data: function () {

			return {
				luList:[],
				ishead:this.$util.istop(),
				isplus:this.$util.isEnvironment(),
				swiperTop:this.$util.swiperTop()
			}
		},
		computed: {
			
		},
		methods: {
			todetail:function(lu_id){

				this.$router.push('/way/'+lu_id)

			},
			Swiper:function(){
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 50000,
						loop: true,
						effect : 'coverflow',
						slidesPerView:1.4,
						centeredSlides: true,
						coverflow: {
									rotate: 10,
									stretch:-18,
									depth: 50,
									modifier: 2,
									slideShadows : false
							},		
					})
			},
			istop: function () {

				var self = this
				if (navigator.userAgent.indexOf("Html5Plus") >= 0) {

					return self.ishead = true
				} else {

					return self.ishead = false
				}
			}
		},
		components: {
			foot: footer

		},
		watch: {

		},
		mounted() {

			var self = this


		self.$http.get('/v1/travel_route').then(response => {

 

			if(!_.isArray(response.body.data))return
			// self.luList = self.$util.getRandomArrayElements(response.body.data,6)
			self.luList = response.body.data
			// console.log(self.wareList)
			self.$nextTick(function () {
				// console.log($('.card_img img'))
    			
				self.Swiper() 
				// alert(self.swiperTop)

			})

		}, response => {
			
		});

			


		}
	}

</script>
<style lang="less">

</style>