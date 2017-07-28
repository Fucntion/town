<template>
<div class="wrap">

    <header class="bar" :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()"/>
		<span class="icon_text icon_right">搜索</span>
		{{IS_TOWN_NAME}}
	</header>
	<div class="bar_after" :style="{paddingTop:ishead+'px'}"></div>
	<!-- 亲手写的页面亲手杀掉 -->
    <!-- <div class="towns_content" v-show="mapShow">
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
					<p class="weui__label">民宿</p>
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
					<p class="weui__label">伴特产</p>
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
					<p class="weui__label">游玩路线</p>
				</a>
			</div>
			<div class="town_gation">
				<a :href="'#/town/'+IS_TOWN_ID+'/scene'" class="town_box">
					<div class="weui__icon">
						<img src="~assets/img/town/scene.png" alt="">
					</div>
					<p class="weui__label">语音讲解</p>
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
   </div> -->
 
	<div class="towns_content" id="mapbox" style="bottom:0;top:44px;" >
		<!-- 底部菜单 -->
		<div class="bottom_control">
			<div class="control_item">
				<img class="control_icon"  src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3958839273,589658018&fm=58" /> 
				<span class="control_title">自然风光</span>  
			</div>
			<div class="control_item">
				<img class="control_icon"  src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3958839273,589658018&fm=58" /> 
				<span class="control_title">民宿酒店</span>
			</div>
			<div class="control_item">
				<img class="control_icon"  src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3958839273,589658018&fm=58" /> 
				<span class="control_title">美食品鉴</span> 
			</div>
			<div class="control_item">
				<img class="control_icon"  src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3958839273,589658018&fm=58" /> 
				<span class="control_title">精品线路</span> 
			</div>
			
		</div>

		<!--点信息-->
		<div v-if="marker_info_box" class="marker_info_box info_box">
			<div class="info">
				<dl class="info_l">
					<dd class="name"><span>{{marker_info_box.name}}</span><small>66人想去</small></dd>
					<dd class="adress"><span>xx</span><span>xx</span></dd>
					<dd class="juli"><span>距您xx公里</span></dd>
				</dl>
				<div class="info_r">
					<div class="detail btn" @click="todetail(marker_info_box)">查看详情</div>
					<div class="go btn">导航这里</div>
				</div>
			</div>
			<div class="hr"></div>
			<div class="feature">
				<span class="feature-item"><i class="icon-active- iconfont feature-icon active"></i>VR</span>
				<span class="feature-item"><i class="icon-active- iconfont  feature-icon active"></i>AR</span>
				<span class="feature-item"><i class="icon-active- iconfont  feature-icon"></i>语音介绍</span>
			</div>
		</div>

	</div>

	<!-- <div class="zuimei" @click="totown()" style="bottom:20px;"  v-show="!marker_info_box">
		玩转小镇
	</div> -->

	
	


</div>
</template>
	
<script>


export default {
	name:'townindex',
	data: function() {

		return {
			IS_TOWN_NAME:null,
			ishead:this.$util.istop(),
			IS_TOWN_ID:null,
			mapShow:false,//默认不显示地图
			marker_info_box:null,
			luList:[]
		}
	},
    computed:{
        
    },
	methods: {
		
		changeView:function(){
			var self = this
			self.mapShow = !self.mapShow
		},
		todetail:function(info){

			var self = this 

			switch(info.type){
				case 'scene':
					self.$router.push('/scene/'+info.resource_id)
				break;
				case 'town':
				self.$router.push('/town/category/'+info.resource_id)
				break;
				case 'hotel':
				self.$router.push('/hotel/'+info.resource_id)
				break;
				case 'cate':
				self.$router.push('/cate/'+info.resource_id)
				// alert('类别有误')
				break;
				default:
					// alert('类别有误')
				break;

			}
		},
		reloadMap:function(town_info){
			var self =this
			//后台会返回镇中心的经纬度
			// console.log(town_info)
			self.IS_TOWN_NAME = town_info.town_name
			self.IS_TOWN_ID = town_info.town_id
			if(town_info.lat&&town_info.lng){
				map.panTo([town_info.lng,town_info.lat]); // 用城市名设置地图中心点
				
			}
			self.town_show = false;
		},
		markerClick:function (e){
			
			
			var self = this

			// console.log(this.marker_info_box)
			self.marker_info_box = {
				name:e.target.name,
				resource_id:e.target.resource_id,
				type:e.target.type,
				lng:e.lnglat.lng,
				lat:e.lnglat.lat
			}
			// console.log(this.marker_info_box)
		},
		// 编写自定义函数,创建标注
		addMarker:function (point,type,resource_id,label){
			var self = this,
				imageUrl = null
			
			switch(type){
				case 'scene':
				imageUrl = "http://town.icloudinn.com/static/images/map-icon/jing.png"
				break;
				case 'town':
				imageUrl = "http://town.icloudinn.com/static/images/map-icon/zhen.png"
				break;
				case 'hotel':
				imageUrl = "http://town.icloudinn.com/static/images/map-icon/su.png"
				break;
				case 'cate':
				imageUrl = "http://town.icloudinn.com/static/images/map-icon/shi.png"
				break;
				default:
				alert('该类别暂未支持');
				break;
			}
			// console.log(self.markerClick)
			var marker=new AMap.Marker({
				map: map,
				position:point,
				icon: new AMap.Icon({            
					size: new AMap.Size(30, 39.9),  //图标大小
					imageSize: new AMap.Size(30, 39.9),
					image: imageUrl
				})        
			})

			marker.name=label||null;
			marker.type =type ||null
			marker.resource_id = resource_id||null

			//给Marker绑定单击事件
			marker.on('click', self.markerClick);
			
		},
		mapload:function(){

			// 高德地图API功能
			var self =this
			var map = new AMap.Map('mapbox', {
					resizeEnable: true,
					zoom:12,
					center: [self.town_info.lng,self.town_info.lat]||self.town_info.town_name
			});



			map.on('click', function(e) {
				self.marker_info_box = null
			});
			
			window.map = map

			map.setMapStyle('amap://styles/efcd282ccc6602c716da03bfa4d88a3c');


			AMap.plugin(['AMap.ToolBar','AMap.Geolocation'],
				function(){
					// map.addControl(new AMap.ToolBar());
					// map.addControl(new AMap.Geolocation());
			});

			// 加载镇
			self.$http.get('/town/list').then(response => {

				var townList = response.body.data
				
				for(var i=0;i<townList.length;i++){
					if(townList[i].lat&&townList[i].lng){
						
						var point = [townList[i].lng,townList[i].lat],
							type = 'town',
							label = townList[i].town_name,
							resource_id = townList[i].town_id;
						self.addMarker(point,type,resource_id,label)
					}
				}
				
			}, response => {
				console.log("请求失败")
			});


			//加载风景
			this.$http.get('/test/getScene').then(response => {
				// get body data
				
				var sceneList = response.body.data

				for(var i=0;i<sceneList.length;i++){

					if(sceneList[i].lat&&sceneList[i].lng){

						var point = [sceneList[i].lng,sceneList[i].lat],
						type = 'scene',
						label = sceneList[i].scene_name,
						resource_id = sceneList[i].scene_id;
				
						self.addMarker(point,type,resource_id,label);
					}
					

					
				}
							
			}, response => {
				// error callback
			});

			//加载酒店
			this.$http.get('/test/getHotel').then(response => {
				// get body data
				
				var hotelList = response.body.data

				for(var i=0;i<hotelList.length;i++){
					
					if(hotelList[i].lat&&hotelList[i].lng){
						var point = [hotelList[i].lng,hotelList[i].lat],
						type = 'hotel',
						label = hotelList[i].name,
						resource_id = hotelList[i].hotel_id;
				
						self.addMarker(point,type,resource_id,label);
					}
					

					
				}
							
			}, response => {
				// error callback
			});


			//加载美食
			this.$http.get('/test/getCate').then(response => {
				// get body data
				
				var cateList = response.body.data

				for(var i=0;i<cateList.length;i++){
					
					if(cateList[i].lat&&cateList[i].lng){
						var point = [cateList[i].lng,cateList[i].lat],
						type = 'cate',
						label = cateList[i].name,
						resource_id = cateList[i].cate_id;
				
						self.addMarker(point,type,resource_id,label);
					}
					

					
				}
							
			}, response => {
				// error callback
			});

			// 加载本镇精品线路
			self.$http.get('/lu/list').then(response => {

				//   

				if(!_.isArray(response.body.data))return
					self.luList = response.body.data
					
			}, response => {
				// error callback
			});

			
		},
		init:function(){
			var self = this
			//程序跳转的时候，是要求带name的不过考虑到线下二维码不容易改变的情况，就只必须带id即可。
			
			self.IS_TOWN_NAME= self.$route.query.town_name || '玩转小镇'
			self.IS_TOWN_ID  = self.$route.params.id
			sessionStorage.setItem('town_id',self.$route.params.id)
				

		}
			
	},
	components: {
		
	},
	watch: {

	},
	mounted() {

        var self=this,
			town_id = self.$route.params.id

			if(!town_id){

				alert('小镇id缺失')
				history(-1)
			}

		self.init()

		self.$http.get('/town/'+town_id).then(response => {


			self.town_info = response.body.data
			self.mapload()

		}, response => {
			// error callback
			alert(JSON.stringify(response.body))
		});
		// self.toTown()
		  

		
	}
}
</script>
<style lang="less">

</style>