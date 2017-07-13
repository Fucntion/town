<template>
<div class="wrap">
    <div class="bar "   :style="{paddingTop:ishead+'px'}"  v-if="isplus=='plus'">
		活动
		<!--<div class="search-bar" >
			<div class="scan" @click="Toscan()" v-show="is_plus" ></div>

		</div>-->
	</div> 
	<div class="bar_after" v-if="isplus=='plus'"></div>
	<!--<div id="banner">

			<div class="search-bar" :class="{top:ishead}">
				<div class="scan" @click="Toscan()" v-show="is_weixin"></div>
			</div>
			<div id="slider" class="mui-slider slider-home">

				<div class="mui-slider-group mui-slider-loop">

					<div class="mui-slider-item mui-slider-item-duplicate">
						<div class="mask"></div>
						<a href="javascript:;">
						
						<img src="http://api.town.icloudinn.com/static/img/slider2.jpg">
					</a>
					</div>
					
				
				
					<div class="mui-slider-item">
						<div class="mask"></div>
						<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider2.jpg">
					</a>
					</div>
				
					<div class="mui-slider-item">
						<div class="mask"></div>
						<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider3.jpg">
					</a>
					</div>
				
					<div class="mui-slider-item">
						<div class="mask"></div>
						<a href="javascript:;">
						<img src="http://api.town.icloudinn.com/static/img/slider4.jpg">
					</a>
					</div>
				
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
		</div>-->
	<!--<div class="index_list">
			<div class="index_box box_bor">
				<div class="index_title">
					<p>发起活动</p>
					<img width="56%" src="~assets/img/home_news.png" />
				</div>
			</div>
			<div class="index_box">
		
				<div class="index_img" @click="way()">
					<div class="index_title">
						<img width="20%" src="~assets/img/home_travel.png" /> 游记攻略
					</div>
				</div>
				<div class="index_img">
					<div class="index_title">
						<img width="20%" src="~assets/img/home_farm.png" /> 农产品众筹
					</div>
				</div>
			</div>
		</div>-->
    <!--<p class="block_title" >官方活动</p>-->
    <div class="index_town play_box" >
        <!--:style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}"-->
        
        <div class="play_item"   style="background-image:url(static/img/play1.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play2.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play3.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play4.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play5.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play6.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play1.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play2.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play3.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play4.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play5.png);"></div>
        <div class="play_item"   style="background-image:url(static/img/play6.png);"></div>


    </div>
    <foot></foot>
</div>
</template>

<script>
    import footer from 'plugin/footer'
	export default {
		name: 'travel',
		data: function() {

			return {
				ishead:this.$util.istop(),
				isplus:this.$util.isEnvironment()
				
			}
		},
		computed: {

		},
		methods: {
		

		},
		components: {
			 foot:footer
		},
		watch: {

		},
		mounted() {

			var self = this

			  


		}
	}
</script>
<style lang="less">


</style>
