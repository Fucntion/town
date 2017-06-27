<template>
<div class="wrap list_wrap">
	 <header class="bar"  :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >我在海南有农庄</div>
	</header>
	<div class="town-content marTop " :class="{head:ishead}" id="farm" >
		
					<!--<div class="town-row">
							<div @click="tofarm(farm.farms_id)"  class="town-col-xs-12" v-for="farm in farmList" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + farm.thumb + ')'}">
									<div class="l_title">{{farm.name}}</div>
									<div class="mask"></div>
							</div>

					</div>-->
			<div class="swiper-container card_container">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="(farm,index) in farmList"  @click="tofarm(farm.farms_id)" >
					<div class="hands_img card_img" >
						<!--:style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"-->
						<!--<img  :src="'http://api.town.icloudinn.com/uploads/' + farm.thumb">-->
						<div class="img" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + farm.thumb + ')'}"></div>
						<!--<div class="fram_title">{{ware.name}}</div>-->
						<div class="card_mask"></div>
					</div>		
				</div>
			</div>
		</div>
		
		
	  
  </div>
	<!-- <div id="main">

		<ul class="town-grid-view">
			<li @click="tofarm(farm.goods_id)" class="town-col-xs-6 ware-item" v-for="(farm,index) in farmList">
				<div class="list">
					<div class="simg">
						<img class="town-media-object" :src="'http://api.town.icloudinn.com/uploads/'+farm.thumb">
					</div>
					<div class="town-media-body">
						<p class="txt">{{farm.name}}</p>
						<p class="price">￥{{farm.price}}.00</p>
						<p class="more"><img src="../../assets/img/plus_1.png" class="icon_img plus"></p>
					</div>
				</div>
			</li>
		</ul>
	</div> -->

</div>
</template>

<script>
import Store from 'store'
export default {
	name:'farmlist',
	data: function() {

		return {
			farmList:[],
			ishead:null
		}
	},
	methods: {

		tofarm:function(goods_id){

			this.$router.push('farm/'+goods_id)

		},
		// 轮播
		Swiper:function(){
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: 50000,
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

		this.$http.get('/farm/list').then(response => {
			Store.commit('closeLoading')
			if(!_.isArray(response.body.data))return
			
			self.farmList = response.body.data
			
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
