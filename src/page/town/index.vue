<template>
<div class="wrap">

    <header class="bar" :style="{paddingTop:ishead+'px'}">
		<div class="bar-icon"  ><img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<!--<div class="bar-icon" @click="toMap()"><img src="../../assets/img/address_s.png" class="icon_img" /> {{IS_TOWN_NAME}}</div>-->
		<div class="bar-title" >{{IS_TOWN_NAME}}</div>
	</header>
	<div class="bar_after"></div>

    <div class="towns_content" >
        <div class="town_left flex">
			<div class="town_main">
				<a :href="'#/town/'+IS_TOWN_ID+'/info/'" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/desc.png" alt="">
					</div>
					<p class="weui__label">小镇简介</p>
				</a>
				<a :href="'#/town/'+IS_TOWN_ID+'/hotel'" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/hotel.png" alt="">
					</div>
					<p class="weui__label">住宿</p>
				</a>
			</div>
			<div class="town_food">
				<a :href="'#/town/'+IS_TOWN_ID+'/cate'" class="town_box">
					<p class="weui__label">美食</p>
					<div class="weui__icon">
						<img src="~assets/img/town/cate.png" alt="">
					</div>
				</a>
			</div>
			<div class="town_car">
				<a href="javascript:void(0)" class="town_box">
				<!--<a href="http://m.xiaoerzuche.com/hour" class="town_box">-->
					<div class="weui__icon">
						<img src="~assets/img/town/car.png" alt="">
					</div>
					<p class="weui__label">租车</p>
				</a>
			</div>
			<div class="town_farm">
				<a :href="'#/town/'+IS_TOWN_ID+'/farm'" class="town_box">
					<p class="weui__label">我的农庄</p>
					<div class="weui__icon">
						<img src="~assets/img/town/farm.png" alt="">
					</div>
				</a>
			</div>
		</div>
		<div class="town_right flex">
			<div class="town_hand">
				<a :href="'#/town/'+IS_TOWN_ID+'/ware'" class="town_box">
					<p class="weui__label">伴手礼</p>
					<div class="weui__icon">
						<img src="~assets/img/town/hand.png" alt="">
					</div>
				</a>
			</div>
			<div class="town_way">
				<a :href="'#/town/'+IS_TOWN_ID+'/way'" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/luxian.png" alt="">
					</div>
					<p class="weui__label">旅游路线</p>
				</a>
			</div>
			<div class="town_gation">
				<a :href="'#/town/'+IS_TOWN_ID+'/scene'" class="town_box">
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


export default {
	name:'townindex',
	data: function() {

		return {
			IS_TOWN_NAME:null,
			ishead:this.$util.istop(),
			IS_TOWN_ID:null
		}
	},
    computed:{
        
    },
	methods: {
		
		
		init:function(){
			var self = this
			//程序跳转的时候，是要求带name的不过考虑到线下二维码不容易改变的情况，就只必须带id即可。
			
			if(!self.$route.params.id){
				 alert('小镇信息补全');
				  location.href='/#/nearby'
			}else{
				self.IS_TOWN_NAME= self.$route.query.town_name || '玩转小镇'
				self.IS_TOWN_ID  = self.$route.params.id
				sessionStorage.setItem('town_id',self.$route.params.id)
			}
				

		}
			
	},
	components: {
		
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