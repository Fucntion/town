<template>
	<div class="wrap">
		
    <div class="bar bar-clear notfixed" :style="{paddingTop:ishead+'px'}">
        <img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()" />
        <img v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right" @click="updateSerivces()">
    </div>
    
    

		<img width="100%" :src="activity.thumb" />



    <div id="introduction">
        <div class="titles">{{activity.name||'活动名称'}}</div>
        <!-- <div class="prices"><span>￥</span><span class="rise">起</span></div> -->
        <!-- <div class="hotel_address">
            <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><img src="~assets/img/address_hotel.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
				<div class="weui-cell__bd weui-cell_primary">
					<p>三亚三亚三亚三亚三亚三亚</p>
				</div>
				<span class="weui-cell__ft"></span>
			</div>
        </div> -->
    </div>
    <div class="message">
        <div class="rqm_title"><img src="~assets/img/hotel.png">活动介绍:</div>
        <div v-html="activity.content" class="m_content child_color">
        </div>
    </div>

    <nav  id="foot">

        <button class="town-tab-item town-btn weui-btn weui-btn_primary" @click="change()">立即报名</button>

    </nav>

		
	</div>
</template>

<script>

	export default {
		name: 'activityDetail',
		data: function() {

			return {

				activity:{}
				
			}
		},
		computed: {

		},
		methods: {
		

		},
		components: {
			 
		},
		watch: {

		},
		mounted() {

			var self = this,
				activity_id = self.$route.params.id

			self.$http.get('/v1/activity/'+activity_id).then(response=>{

				self.activity = response.body.data

				

			},response=>{

			})
			  


		}
	}
</script>
<style lang="less">


</style>
