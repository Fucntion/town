<template>
<div class="wrap">
	<div class="bar relatived"   :style="{paddingTop:ishead+'px'}"  v-if="isplus=='plus'">
		全域旅游新时代
		<div class="search-bar" :style="{marginTop:ishead+'px'}">
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
				<div class="mui-indicator"></div>
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
		<div class="" style="margin-top:20px;font-size:16px;">
			<p style="text-align:center;color:#333333">行程定制</p>
			<div style="margin:15px 0 10px;">
			<input style="font-size:14px;color:#444444;width:49%;line-height:2.5;padding:2px 6px;box-sizing:border-box;border:1px solid #e7e7e7;border-radius:0;" placeholder="称呼" class="" type="text" /> 
			<input style="font-size:14px;color:#444444;width:49%;line-height:2.5;padding:2px 6px;box-sizing:border-box;border:1px solid #e7e7e7;border-radius:0;" placeholder="联系方式" class="" type="text" /> 
			<!--<textarea style="font-size:14px;color:#444444;width:100%;margin-top:10px;height:100px;line-height:1.4;padding:2px 6px;box-sizing:border-box;border:1px solid #e7e7e7;border-radius:0;" placeholder="您的期望" >

			</textarea>-->
			</div>

			<div class="weui-btn weui-btn_primary" style="line-height:2.7;font-size:16px;border-radius:0">定制行程</div>
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

	<p class="block_title" style="margin-top:20px;">热门小镇</p>
	<div class=" mudi_box" >
		<div class="mudi_row">
			<div class="mudi_item" v-if="index<3"  v-for="(item,index) in townInfo" @click="Totown(item)">
				<div class="thumb" 
				:style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}"></div>
				<p class="name">{{item.town_name}} <span class="small"> {{item.city_name}}</span></p>
			</div>
			
		</div>
		<div class="mudi_row" >
			<div class="mudi_item" v-if="index>2"  v-for="(item,index) in townInfo" @click="Totown(item)">
				<div class="thumb" 
				:style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}"></div>
				<p class="name">{{item.town_name}} <span class="small">{{item.city_name}}</span></p>
			</div>
			
		</div>
		<!--<div class="town_img" @click="Totown(item)" v-for="item in townInfo"  :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}">
			
			<div class="index_item">
				<div class="index_title"><span>{{item.town_name}}  </span>{{item.city_name}} </div>
				<p>推荐理由</p>
			</div>
			<div class="index_mask"></div>
		</div>-->
		<!--<div class="town_img" @click="Totown(item)" v-for="item in townInfo"  :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}">
			<div class="index_item">
				<div class="index_title"><span>{{item.town_name}}  </span>{{item.city_name}} </div>
				<p>推荐理由</p>
			</div>
			<div class="index_mask"></div>
		</div>-->
	</div>

	<p class="block_title" style="margin-top:20px;">最新活动</p>
	<div class="index_town play_box" >
		<!--:style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}"-->
		
		<div class="play_item"   style="background-image:url(static/img/play1.png);"></div>
		<div class="play_item"   style="background-image:url(static/img/play2.png);"></div>
		<div class="play_item"   style="background-image:url(static/img/play3.png);"></div>
		<div class="play_item"   style="background-image:url(static/img/play1.png);"></div>
		<div class="play_item"   style="background-image:url(static/img/play2.png);"></div>
		<div class="play_item"   style="background-image:url(static/img/play3.png);"></div>
		
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
				isplus:this.$util.isEnvironment()
			}
		},
		computed: {
			is_plus:function(){
				return 'plus'==this.$util.isEnvironment()
			}
		},
		components: {
			foot:footer
		},
		methods: {
			
			
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
			Toscan:function(){
				this.$router.push('/scan')
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
				
			}
			
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

				// new JRoll(".wrap");
			})
			self.getTown()

			// self.istop()
			

		}
	}

</script>
<style lang="less">

</style>
