<template>
<div class="wrap  list_wrap">
	 <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >伴手礼</div>
	</header>
	<div id="main" class="town-content marTop" :class="{head:ishead}">
		<!--<div id="hotel" class="hotel_box">
            <div class="town-row">
                <div @click="toware(ware.goods_id)" class="town-col-xs-12" v-for="(ware,index) in wareList" :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ware.thumb[0].url + ')'}">

                    <div class="hotel_title">{{ware.name}}</div>
                    <div class="hotel_number"><span>23</span>人来过</div>
                    <div class="mask"></div>
                </div>
				
            </div>
        </div>-->
		<div class="swiper-container card_container">
			<div class="swiper-wrapper">
				<div class="swiper-slide"  v-for="(ware,index) in wareList"  @click="toware(ware.goods_id)" >
					<div class="hands_img card_img" >
						<!--:style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"-->
						<!--<img  :src="'http://api.town.icloudinn.com/uploads/' + ware.thumb">-->
						<div class="img" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"></div>
						<!--<div class="fram_title">{{ware.name}}</div>-->
						<div class="card_mask"></div>
					</div>		
				</div>
			</div>
		</div>
		
		<!--<ul class="town-grid-view">
			<li @click="toware(ware.goods_id)" class="town-col-xs-6 ware-item" v-for="(ware,index) in wareList">
				<div class="list">
					<div class="simg">
						<img class="town-media-object" :src="'http://api.town.icloudinn.com/uploads/'+ware.thumb[0].url">
					</div>
					<div class="town-media-body">
						<p class="txt">{{ware.name}}</p>
						<p class="price">￥{{ware.price}}.00</p>
						<p class="more"><img src="../../assets/img/plus_1.png" class="icon_img plus"></p>
					</div>
				</div>
			</li>
		</ul>-->
	</div>
</div>
</template>

<script>
import Store from 'store'
export default {
	name:'warelist',
	data: function() {

		return {
			wareList:[],
			ishead:null
		}
	},
	methods: {

		toware:function(goods_id){

			this.$router.push('ware/'+goods_id)

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
								rotate: 10,
								stretch:-18,
								depth: 50,
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

		self.$http.get('/ware/list').then(response => {

			Store.commit('closeLoading')

			if(!_.isArray(response.body.data))return
			self.wareList = response.body.data
			// console.log(response.body.data)
			// console.log( self.wareList.thumb)
			 
			self.$nextTick(function () {
				console.log($('.card_img img'))
    			
				self.Swiper() 
				
//				$('.swiper-slide').css('width',$('body').width()*0.9)
//				$('.card_img img').attr('width',$('body').width()*0.9+'px')
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
