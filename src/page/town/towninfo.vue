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
				<a href="#/townintroduction" class="town_box">
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
   
	<footer>
		<div class="weui-tabbar index-tabbar">
		<a href="#/" class="weui-tabbar__item">
			<span style="display: inline-block;position: relative;">
			<img src="~assets/img/home_s.png" class="icon_img"/>
		</span>
			<p class="weui-tabbar__label">附近</p>
		</a>
		
		<a href="#/towninfo" class="weui-tabbar__item" >
			
		</a>
		<a href="#/user" class="weui-tabbar__item">
			<img src="~assets/img/user_s.png" class="icon_img"/>
			<p class="weui-tabbar__label">我的</p>
		</a>
		
	</div>
	<a href="#/towninfo" class="weui-tabbar__item" id="nav_town">
			<span style="display: inline-block;position: relative;">
				<img src="~assets/img/town.png" class="icon_img"/>
			</span>
			<p class="weui-tabbar__label">玩转小镇</p>
		</a>
	</footer>

	<div id="index_address" v-show="town_show">
      <div class="address_content">
			<header class="bar" :class="{head:ishead}">
				<!--<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img"  onclick="javascript:history.go(-1)" /></div>-->
				<div class="bar-title" >请选择您所在的镇</div>
			</header>
			<div class="address_box marTop" :class="{head:ishead}">
				<ul id="accordion" class="accordion">

					<li v-for="city in townInfo"><div class="link">{{city.city_name}}</div>

						<ul class="submenu">
							<li v-for="town in city.townList" @click="dotown(town,2)" ><p>{{town.town_name}}</p></li>
						</ul>

					</li>	

				</ul>

			</div>
			<!--<div class="address_box marTop" :class="{head:ishead}">
				<div class="address_town" v-for="town in townInfo" @click="dotown(town,2)" v-bind:class="{active:town.town_id==active_town_id }" >
					{{town.town_name}}
				</div>
			</div>-->
      </div>
  </div>

</div>
</template>
	
<script>

import Store from 'store'
// import 'static/js/jquery.js'
// import 'static/js/index.js'
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
			ishead:null
		}
	},
    computed:{
       
    },
	methods: {
		
		toMap:function(){
			var self = this
			// self.location_web()
			self.town_show = true

			// self.accordions()
		},
		accordions:function(){
			
			var Accordion = function(el, multiple) {

				this.el = el || {};
				
				this.multiple = multiple || false;
				
				// Variables privadas
				var links = this.el.find('.link');

				console.log( links)
				// Evento
				links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
			}

			Accordion.prototype.dropdown = function(e) {
				console.log(22)
				var $el = e.data.el,
					$this = $(this),
					$next = $this.next();

				$next.slideToggle();
				$this.parent().toggleClass('open');

				if (!e.data.multiple) {
					$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
				};
			}	

			var accordion = new Accordion($('#accordion'), false);
			 console.log(11)

		},
		toTown:function(){

			var self = this
			// 不传参数就返回所有镇列表
			
			self.$http.get('/city/list/').then(response => {
			// self.$http.post('/town/list/',{city_name:city}).then(response => {
				// self.accordions()

				self.townInfo = response.body.data
				self.$nextTick(function () {
					self.accordions()
				})
				
			}, response => {
				console.log("请求失败")
			});
		},
		dotown:function(towns,a){

			var self = this
			self.town_show = false
			self.townName = towns.town_name
			self.active_town_id = towns.town_id
			if(a==2){

				localStorage.setItem("town_id",self.active_town_id);//这里的每个接口都有用
				localStorage.setItem("town_name",self.townName);
				localStorage.setItem("city_name",self.city);
			}
			

		},
		init:function(){
			var self = this
			if(!localStorage.getItem("town_id")||!localStorage.getItem("town_name")){
					
				self.town_show = true	
			}else{

				self.townName = localStorage.getItem("town_name")
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
		self.toTown()
		self.ishead = Store.getters.getvisible;

		
	}
}
</script>
<style lang="less">

</style>