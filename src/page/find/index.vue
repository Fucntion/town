<template>
	<div class="wrap"> 
	<div class="head"   :style="{paddingTop:ishead+'px'}">
		发现
		<!--<div class="search-bar" >
			<div class="scan" @click="Toscan()" v-show="is_plus" ></div>

		</div>-->
	</div>

		<div class="swiper-container card_container" :style="{paddingTop:ishead+'px'}">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="(ware,index) in wareList"  @click="toware(ware.goods_id)" >
					<div class="hands_img card_img" >
						
						<div class="img" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"></div>
						
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
				wareList:[],
				ishead:this.$util.istop()
			}
		},
		computed: {
			
		},
		methods: {
			toware:function(goods_id){

			this.$router.push('ware/'+goods_id)

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
			},
			Totownindex: function (towns, a) {

				var self = this
				if (a == 1) {
					localStorage.setItem("town_id", towns.town_id);//这里的每个接口都有用
					localStorage.setItem("town_name", towns.town_name);
					localStorage.setItem("city_name", self.city);

					self.$router.push('townindex/' + towns.town_id)

				}
			},
			way: function () {
				this.$router.push('/waylist')
			},
			share: function () {
				this.$router.push('/share')
			},
			Toscan: function () {
				this.$router.push('/scan')
			},
			toTown: function () {

				var self = this
				self.$http.get('/town/list/').then(response => {
					// self.$http.post('/town/list/',{city_name:city}).then(response => {

					self.townInfo = response.body.data
					// sessionStorage.setItem('townList',JSON.stringify(response.body.data))
				}, response => {
					console.log("请求失败")
				});

			}

		},
		components: {
			foot: footer

		},
		watch: {

		},
		mounted() {

			var self = this


		self.$http.get('/test/getGoods').then(response => {



			if(!_.isArray(response.body.data))return
			self.wareList = response.body.data

			self.$nextTick(function () {
				// console.log($('.card_img img'))
    			
				self.Swiper() 

			})

		}, response => {
			
		});

			


		}
	}

</script>
<style lang="less">

</style>