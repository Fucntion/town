<template>
<div class="wrap list_wrap">
	 <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >旅游路线</div>
	</header>
	<div id="main" class="town-content marTop" :class="{head:ishead}">
		
		<div class="swiper-container card_container">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="(way,index) in wayList"  @click="toway(way.lu_id)" >
					<div class="hands_img card_img" >
						<!--:style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"-->
						<!--<img  :src="'http://api.town.icloudinn.com/uploads/' + way.thumb">-->
						<div class="img" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + way.thumb + ')'}"></div>
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
import Store from 'store'
export default {
	name:'home',
	data: function() {

		return {
			wayList:[],
			ishead:null
		}
	},
	methods: {

		toway:function(goods_id){

			this.$router.push('way/'+goods_id)

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
		Store
	},
	watch: {

	},
	mounted() {

		var self = this
			Store.commit('openLoading')

		self.$http.get('/lu/list').then(response => {

			Store.commit('closeLoading')

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

    	self.ishead = Store.getters.getvisible;
	}
}
</script>
<style lang="less">

</style>
