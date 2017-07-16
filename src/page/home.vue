<template>
<div class="wrap">
	<div class="bar relatived"   :style="{paddingTop:ishead+'px'}"  v-if="isplus=='plus'">
		全域旅游新时代
		<div class="search-bar" >
			<!--<div class="scan" @click="Toscan()" v-show="is_plus" ></div>-->
			<!--<div class="weui-search">
				<div class="weui-icon-search" ></div>
				<input type="text" class="weui-input">
			
			</div>-->
		</div>
	</div>
	<div id="banner">
		
			
		    <div id="slider" class="mui-slider slider-home" >
		    	
			<div class="mui-slider-group mui-slider-loop">
				
				
				<div class="mui-slider-item" v-for="slider in sliders">
					<div class="mask"></div>
					<a :href="slider.jump_path">
						<img :src="slider.url" />
					</a>
				</div>

				
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator" v-for="slider in sliders"></div>

			</div>
		</div>
	</div>

	<div class="index_nav">
		<div class="nav">
			<a class="nav_item" href="#/hot/area">
				<img  src="~assets/img/mudidi.png" />
				<p>小镇</p>
			</a>
			<!--<div class="nav_item">
				<img src="~assets/img/fengguang.png"/>
				<p>风光</p>
			</div>-->
			<a class="nav_item" href="#/hot/hotel">
				<img src="~assets/img/minsu.png"/>
				<p>民宿</p>
			</a>
			<a class="nav_item" href="#/hot/cate">
				<img src="~assets/img/cate.png"/>
				<p>美食</p>
			</a>
			<a class="nav_item" href="#/find">
				<img src="~assets/img/luxian.png"/>
				<p>路线</p>
			</a>
			
		</div>
		<div class="dingzhi">
			<p class="title" >行程定制</p>
			<div  class="dingzhi_info_box">
				<input v-model="contact_person" class="name"  placeholder="称呼"  type="text" /> 
				<input v-model="phone" class="telphone"  placeholder="联系方式" type="text" /> 
				<textarea v-model="demand" class="content"  placeholder="请填写您的需求，方便更好为您服务。" >

				</textarea>
			</div>

			<div @click="dingzhi()" class="weui-btn weui-btn_primary" style="line-height:2.7;font-size:16px;border-radius:0">定制行程</div>
		</div>
	</div>
	

	<!--<div class="index_list">
		<div class="index_box box_bor">
			<div class="index_title">
				<p>游玩资讯</p>
				<img width="56%" src="~assets/img/home_news.png" />			
			</div>
		</div>
		<div class="index_box">
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
	</div>-->

	<p class="block_title">热门小镇</p>
	<div class=" mudi_box" >
		<div class="mudi_row">
			<div class="mudi_item" v-if="index<3"  v-for="(item,index) in townInfo" @click="Totown(item)">
				<div class="thumb" 
				:style="{backgroundImage: 'url(' + item.town_thumb + ')'}"></div>
				<p class="name">{{item.town_name}} <span class="small"> {{item.city_name}}</span></p>
			</div>
			
		</div>
		<div class="mudi_row" >
			<div class="mudi_item" v-if="index>2"  v-for="(item,index) in townInfo" @click="Totown(item)">
				<div class="thumb" 
				:style="{backgroundImage: 'url(' + item.town_thumb + ')'}"></div>
				<p class="name">{{item.town_name}} <span class="small">{{item.city_name}}</span></p>
			</div>
			
		</div>
	
	</div>

	<p class="block_title" style="margin-top:20px;">最新活动</p>
	<div class="index_town play_box" >

		<div class="play_item" v-for="activity in activitys"  
		:style="{backgroundImage: 'url(' +activity.thumb + ')'}"></div>
		
		
	</div>
	<foot></foot>
</div>
</template>
<script>


	import footer from 'plugin/footer'

	export default {
		name: 'home',
		data: function () {

			return {
				townInfo:null,
				ishead:this.$util.istop(),
				isplus:this.$util.isEnvironment(),
				demand:null,//定制需求
				phone:null,//定制联系方式
				contact_person:null,//定制联系人
				sliders:[],
				activitys:[]
			}
		},
		computed: {

		},
		components: {
			foot:footer
		},
		methods: {
			
			dingzhi:function(){

				var self = this

				// if(!self.demand||!self.contact_parson||!self.phone){
				// 	console.log('信息不全哦')
				// 	return
				// }
				// console.log(self.$util.checkPhone(self.phone))
				if(!self.$util.checkPhone(self.phone)){
					console.log('联系方式不符合')
					return
				}

				var dataObj = {
					demand:self.demand,
					phone:self.phone,//定制联系方式
					contact_person:self.contact_person,//定制联系人
				}
				self.$http.post('/v1/travel_customization',dataObj).then(response=>{

				},response=>{

				})

			},
			Totown:function(towns){
				
				var self = this
				self.$router.push('/town/category/'+towns.town_id)
			},
			way:function(){
				this.$router.push('/waylist')
			},
			share:function(){
				this.$router.push('/share')
			},
			getTown:function(){

				var self = this
				self.$http.get('/town/list').then(response => {
				// self.$http.post('/town/list/',{city_name:city}).then(response => {

					self.townInfo = self.$util.getRandomArrayElements(response.body.data,6)
					// sessionStorage.setItem('townList',JSON.stringify(self.townInfo))
				}, response => {
					console.log("请求失败")
				});
				
			},
			init:function(){

				var self = this 
				self.$http.get('/v1/slide_show').then(response=>{

					self.sliders = response.body.data

					self.$nextTick(function () {

						var gallery = mui('.mui-slider')
						gallery.slider({
							interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
						});

						// new JRoll(".wrap");
					})

				},response=>{

				})

				self.$http.get('/v1/activity').then(response=>{

					self.activitys = response.body.data

					

				},response=>{

				})



				
			}
			
		},
		
		watch: {

		},
		mounted() {

			var self = this
			self.init()
			 

			self.getTown()

			// self.istop()
			

		}
	}

</script>
<style lang="less">

</style>
