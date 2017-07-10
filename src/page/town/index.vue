<template>
<div class="wrap list_wrap">

    <header class="bar towninfo_bar" :class="{head:ishead}">
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<!--<div class="bar-icon" @click="toMap()"><img src="../../assets/img/address_s.png" class="icon_img" /> {{townName}}</div>-->
		<div class="bar-title" >{{townName}}</div>
	</header>
    <div class="towns_content marTop towninfo_bar" :class="{head:ishead}">
        <div class="town_left flex">
			<div class="town_main">
				<a :href="'#/town/info/'+town_id" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/desc.png" alt="">
					</div>
					<p class="weui__label">小镇简介</p>
				</a>
				<a href="#/hotellist" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/hotel.png" alt="">
					</div>
					<p class="weui__label">住宿</p>
				</a>
			</div>
			<div class="town_food">
				<a href="#/catelist" class="town_box">
					<p class="weui__label">美食</p>
					<div class="weui__icon">
						<img src="~assets/img/town/cate.png" alt="">
					</div>
				</a>
			</div>
			<div class="town_car">
				<a href="#" class="town_box">
				<!--<a href="http://m.xiaoerzuche.com/hour" class="town_box">-->
					<div class="weui__icon">
						<img src="~assets/img/town/car.png" alt="">
					</div>
					<p class="weui__label">租车</p>
				</a>
			</div>
			<div class="town_farm">
				<a href="#/farmlist" class="town_box">
					<p class="weui__label">我的农庄</p>
					<div class="weui__icon">
						<img src="~assets/img/town/farm.png" alt="">
					</div>
				</a>
			</div>
		</div>
		<div class="town_right flex">
			<div class="town_hand">
				<a href="#/warelist" class="town_box">
					<p class="weui__label">伴手礼</p>
					<div class="weui__icon">
						<img src="~assets/img/town/hand.png" alt="">
					</div>
				</a>
			</div>
			<div class="town_way">
				<a href="#/waylist" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/luxian.png" alt="">
					</div>
					<p class="weui__label">旅游路线</p>
				</a>
			</div>
			<div class="town_gation">
				<a href="#/scenelist" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/scene.png" alt="">
					</div>
					<p class="weui__label">语音导览</p>
				</a>
			</div>
			<div class="town_main">
				<a href="javascript:;" class="town_box">
					
				</a>
				<a href="javascript:;" class="town_box">
					
				</a>
			</div>
			<div class="town_empty">
				<a href="javascript:;" class="town_box">
					
				</a>
		   </div>
		</div>
   </div>
<!--   
	<foot>
		</foot>-->

</div>
</template>
	
<script>

import footer from 'plugin/footer'

export default {
	name:'towninfo',
	data: function() {

		return {
			lat: null,
			longt: null,
			str: null,
			city:null,
			citys:null,
			district: null,
			street: null,
			town_show:false,
			townName:'未选择所在镇',
			townInfo:[],
			ishead:null,
			town_id:null
		}
	},
    computed:{
       
    },
	methods: {
		
		toMap:function(){
			var self = this
			self.town_show = true
		},
		init:function(){
			var self = this
			if(!sessionStorage.getItem("town_id")||!sessionStorage.getItem("town_name")){
					
				alert('小镇信息不全')
				history.go(-1)	
			}else{

				self.townName = sessionStorage.getItem("town_name")
				self.town_id  = sessionStorage.getItem("town_id")
			}
		}
			
	},
	components: {
		foot:footer
	},
	watch: {

	},
	mounted() {

        var self = this

		self.init()
		// self.toTown()
		  

		
	}
}
</script>
<style lang="less">

</style>