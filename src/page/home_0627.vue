<template>
<div class="wrap">
	<div id="banner">
		
			<div class="search-bar" :class="{top:ishead}">
				<div class="scan" @click="Toscan()" v-show="is_weixin" ></div>
			<!--<div class="weui-search">
				<div class="weui-icon-search" ></div>
				<input type="text" class="weui-input">
			
			</div>-->
			</div>
		    <div id="slider" class="mui-slider slider-home" >
		    	
			<div class="mui-slider-group mui-slider-loop">
				
				<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<div class="mask"></div>
					<a href="javascript:;">
						
						<img src="http://api.town.icloudinn.com/static/img/slider2.jpg">
					</a>
				</div>
				<!-- 第一张 -->
				<!--<div class="mui-slider-item">
					<div class="mask"></div>
					<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider1.jpg">
					</a>
				</div>-->
				<!-- 第二张 -->
				<div class="mui-slider-item">
					<div class="mask"></div>
					<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider2.jpg">
					</a>
				</div>
				<!-- 第三张 -->
				<div class="mui-slider-item">
					<div class="mask"></div>
					<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider3.jpg">
					</a>
				</div>
				<!-- 第四张 -->
				<div class="mui-slider-item">
					<div class="mask"></div>
					<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider4.jpg">
					</a>
				</div>
				<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<div class="mask"></div>
					<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider4.jpg">
					</a>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<!--<div class="mui-indicator"></div>-->
				<div class="mui-indicator"></div>
			</div>
		</div>
	</div>
	<div class="index_list">
		<div class="index_box box_bor">
			<div class="index_title">
				<p>游玩资讯</p>
				<img width="56%" src="~assets/img/home_news.png" />			
			</div>
		</div>
		<div class="index_box">
			<!--232323223-->
			<div class="index_img" @click="way()">
				<div class="index_title">
					<img width="20%"  src="~assets/img/home_travel.png" />
					精品游线
				</div>
			</div>
			<div class="index_img" >
				<div class="index_title">
					<img  width="20%"   src="~assets/img/home_farm.png" />
					农产品众筹
				</div>
			</div>
		</div>
	</div>
	<div class="index_town">
		<div class="town_img" @click="Totownindex(item,1)" v-for="item in townInfo"  :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}">
			<div class="index_item">
				<div class="index_title">{{item.city_name}}*{{item.town_name}}</div>
				<p>--海南水果之乡</p>
			</div>
			<div class="index_mask"></div>
		</div>
	</div>
	<footer>
		<div class="weui-tabbar index-tabbar">
		<a href="#/" class="weui-tabbar__item">
			<span style="display: inline-block;position: relative;">
			<img src="../assets/img/home.png" class="icon_img"/>
		</span>
			<p class="weui-tabbar__label">首页</p>
		</a>
		
		<a href="#/towninfo" class="weui-tabbar__item" >
			
		</a>
		<a href="#/user" class="weui-tabbar__item">
			<img src="../assets/img/user_s.png" class="icon_img"/>
			<p class="weui-tabbar__label">我的</p>
		</a>
		
	</div>
	<a href="#/towninfo" class="weui-tabbar__item" id="nav_town">
			<span style="display: inline-block;position: relative;">
				<img src="~assets/img/town_s.png" class="icon_img"/>
			</span>
			<p class="weui-tabbar__label">玩转小镇</p>
		</a>
	</footer>
</div>
</template>
<script>

	
	require('../assets/js/immersed.js');

	export default {
		name: 'home',
		data: function () {

			return {
				townInfo:null,
				ishead:null
			}
		},
		computed: {
			is_weixin:function(){ 
				var ua = navigator.userAgent.toLowerCase(); 
				if(ua.match(/MicroMessenger/i)=="micromessenger") { 
					return true; 
				} else { 
					return false; 
				} 
			} 
		},
		methods: {
			
			istop:function(){
				
				var self=this
				if(navigator.userAgent.indexOf("Html5Plus")>=0){
			
		           return self.ishead=true
		        }else{
		
		           return self.ishead=false
		        }
			},
			Totownindex:function(towns,a){

				var self = this
				if(a==1){
					localStorage.setItem("town_id",towns.town_id);//这里的每个接口都有用
					localStorage.setItem("town_name",towns.town_name);
					localStorage.setItem("city_name",self.city);
					
					self.$router.push('townindex/'+towns.town_id)
					
				}
			},
			way:function(){
				this.$router.push('/waylist')
			},
			share:function(){
				this.$router.push('/share')
			},
			Toscan:function(){
				this.$router.push('/scan')
			},
			toTown:function(){

				var self = this
				// 不传参数就返回所有镇列表
				if(sessionStorage.getItem('townList')){
					
					self.townInfo = JSON.parse(sessionStorage.getItem('townList'))
					
				}else{
					self.$http.get('/town/list/').then(response => {
					// self.$http.post('/town/list/',{city_name:city}).then(response => {
	
						self.townInfo = response.body.data
						sessionStorage.setItem('townList',JSON.stringify(response.body.data))
					}, response => {
						console.log("请求失败")
					});
				
				}
				
			}
			
		},
		components: {


		},
		watch: {

		},
		mounted() {

			var self = this
			 self.$nextTick(function () {

				var gallery = mui('.mui-slider')
				gallery.slider({
					interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			})
			self.toTown()
			self.istop()
			

		}
	}

</script>
<style lang="less">

</style>
