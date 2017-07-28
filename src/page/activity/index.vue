<template>
<div class="wrap">
    <div class="bar "   :style="{paddingTop:ishead+'px'}"  v-if="isplus=='plus'">
		活动
		<!--<div class="search-bar" >
			<div class="scan" @click="Toscan()" v-show="is_plus" ></div>

		</div>-->
	</div> 
	 <div class="bar_after" :style="{paddingTop:ishead+'px'}" v-if="isplus=='plus'"></div>

	<div class="index_list">
			<div class="index_box box_bor">
				<div class="index_title">
					<p>发起活动</p>
					<img width="56%" src="~assets/img/home_news.png" />
				</div>
			</div>
			<div class="index_box">
		
				<div class="index_img" >
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
		</div>
    <!--<p class="block_title" >官方活动</p>-->
    <div class="index_town play_box" >
        <!--:style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}"-->
        
        <div class="play_item" @click="todetail(activity.activity_id)" v-for="activity in activitys"  
		:style="{backgroundImage: 'url(' +activity.thumb + ')'}"></div>


    </div>
    <foot></foot>
</div>
</template>

<script>
    import footer from 'plugin/footer'
	export default {
		name: 'activityList',
		data: function() {

			return {
				ishead:this.$util.istop(),
				isplus:this.$util.isEnvironment(),
				activitys:[]
				
			}
		},
		computed: {

		},
		methods: {
		
			todetail:function(activitys_id){
				this.$router.push('/activity/'+activitys_id)
			}
		},
		components: {
			 foot:footer
		},
		watch: {

		},
		mounted() {

			var self = this
			self.$http.get('/v1/activity').then(response=>{

				self.activitys = response.body.data

				

			},response=>{

			})



			  


		}
	}
</script>
<style lang="less">


</style>
