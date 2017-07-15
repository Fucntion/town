<template>
<div class="wrap nearby_wrap" >

	 <header class="bar " :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left gray neary_left_icon" onclick="javascript:history.go(-1)"/>
		 <!-- <span class="icon_text icon_right">搜索</span>  -->
		<span @click="toMap()" class="icon_text icon_left">切换小镇</span>
		{{IS_TOWN_NAME}}
	</header>
	 <!--搜索-->
	<div v-show="!marker_info_box" class="nearby-search-bar" >
		<!-- <span @click="toMap()" class="change_town_btn">{{IS_TOWN_NAME}}</span> -->
		<div class="scan" @click="Toscan()" v-if="isplus=='plus'" ></div>
	</div>

	<!--底部按钮-->
	<!-- <div class="zuimei" @click="totown()"  v-show="!marker_info_box">
		玩转小镇
	</div> -->
	<!-- static/img/play3.png -->
	<div class="suspend_box" v-show="suspendSatus" :style="{marginTop:ishead+50+'px'}">
		 <div class="suspend_titel" @click="suspend_back()">{{IS_TOWN_NAME}}热门推荐 <i class="icon-right iconfont"></i></div>  
		<!-- <div class="suspend_back" >返回</div> -->
		<div class="list_box" >
			<div v-show="suspendType=='hotel'"  @click="todetail('hotel',item.hotel_id)" v-for="item in suspendList" class="suspend_item" 
			:style="{backgroundImage: 'url(' + item.thumb + ')'}">
				<p class="item_name"  v-strcut>{{item.name}}</p>
				<div class="mask"></div>
			</div>
			
			<!-- 这里单独用if是为了避免vue报错，但是会增加dom渲染成本。准备让后台换数据格式 -->
			<div v-show="suspendType=='cate'"  @click="todetail('cate',item.cate_id)" v-for="item in suspendList" class="suspend_item" 
			:style="{backgroundImage: 'url(' + item.thumb  + ')'}">
				<p class="item_name"  v-strcut>{{item.name}}</p>
				<div class="mask"></div>
			</div>

			<div v-show="suspendType=='scene'"  @click="todetail('scene',item.scene_id)" v-for="item in suspendList" class="suspend_item" 
			:style="{backgroundImage: 'url(' + item.thumb + ')'}">
				<p class="item_name"  v-strcut>{{item.name}}</p>
				<div class="mask"></div>
			</div>

			<div v-show="suspendType=='ware'"  @click="todetail('ware',item.goods_id)" v-for="item in suspendList" class="suspend_item" 
			:style="{backgroundImage: 'url(' + item.thumb+ ')'}">
				<p class="item_name"  v-strcut>{{item.name}}</p>
				<div class="mask"></div>
			</div>

			<div v-show="suspendType=='lu'"  @click="todetail('lu',item.lu_id)" v-for="item in suspendList" class="suspend_item" 
			:style="{backgroundImage: 'url(' + item.thumb + ')'}">
				<p class="item_name"  v-strcut>{{item.title}}</p>
				<div class="mask"></div>
			</div>

		</div>
		
		
	</div>

	<!--地图-->
	<div  id="mapbox"></div>

	<!-- <foot></foot> -->
		
		<!-- 底部菜单 -->
		<div class="bottom_control">
			<div class="control_item" @click="openSuspend('scene')">
				<img class="control_icon"  src="~assets/img/fengguang.png" /> 
				<span class="control_title" >自然风光</span>  
			</div>
			<div class="control_item" @click="openSuspend('hotel')">
				<img class="control_icon"  src="~assets/img/minsu.png" /> 
				<span class="control_title">民宿酒店</span>
			</div>
			<div class="control_item" @click="openSuspend('cate')">
				<img class="control_icon"  src="~assets/img/cate.png" /> 
				<span class="control_title">美食品鉴</span> 
			</div>
			<div class="control_item" @click="openSuspend('ware')">
				<img class="control_icon"  src="~assets/img/play.png" /> 
				<span class="control_title">特色商品</span> 
			</div>
			<div class="control_item" @click="openSuspend('lu')">
				<img class="control_icon"  src="~assets/img/luxian.png" /> 
				<span class="control_title">精品线路</span> 
			</div>
			
		</div>
	<!--游线列表-->
 
	<!--点信息-->
	<div v-if="marker_info_box" class="marker_info_box info_box">
		<div class="info">
			
			<div class="info_c">

				<div class="thumb" :style="{backgroundImage: 'url(' + marker_info_box.thumb + ')'}"></div>
			</div>
			<dl class="info_l">
				<dd class="name"><span>{{marker_info_box.name}}</span><small>66人想去</small></dd>
				<dd class="adress"><span>xx</span><span>xx</span></dd>
				<dd class="juli"><span>距您xx公里</span></dd>
			</dl>
			<div class="info_r">
				<div class="detail btn" @click="todetail(marker_info_box.type,marker_info_box.resource_id)">查看详情</div>
				<div class="go btn">导航这里</div>
			</div>
		</div>
		<div class="hr"></div>
		<div class="feature">
			<span class="feature-item  active"><i class="icon-VR iconfont feature-icon"></i>体验VR</span>
			<span class="feature-item active"><i class="icon-AR iconfont  feature-icon"></i>体验AR</span>
			 <!-- v-if="isplus=='plus'" -->
			<span class="feature-item"><i class="icon-yuyin iconfont  feature-icon"></i>暂无语音</span>
		</div>
	</div>

	<!--选择所在镇组件-->
	<div id="index_address" style="z-index:4" v-show="town_show">	
      <div class="address_content">
			<header class="bar" :style="{paddingTop:ishead+'px'}">
				<div class="bar-icon"  @click="changeTownShow()">
					<img src="~assets/img/left.png" class="icon_img icon_left"  /></div>
				<div class="bar-title"  >请选择您所在的镇</div>
			</header>
			<div class="bar_after"></div>
			<div class="address_box " :style="{paddingTop:ishead+'px'}">
				<ul id="accordion" class="accordion">

					<li v-for="city in townInfo"><div class="link">{{city.city_name}}</div>

						<ul class="submenu">
							<li v-for="town in city.townList" @click="reloadMap(town)" ><p>{{town.town_name}}</p></li>
						</ul>

					</li>	

				</ul>

			</div>	
      	</div>
  	</div>

</div>

	
</template>
<script>

import footer from 'plugin/footer'
export default {
	name: 'nearby',
	data: function () {

		return {

			town_show:false,
			townInfo:[],
			IS_TOWN_NAME:'',
			IS_TOWN_ID:null,//小镇id
			gpsPoint:null,  
			baiduPoint:null, 
			gpsAddress:null,  
			baiduAddress:null, 
			marker_info_box:null,
			ishead:this.$util.istop(),
			isplus:this.$util.isEnvironment(),
			suspendSatus:false,//右侧是关闭的
			all_scene_list:[],
			all_hotel_list:[],
			all_cate_list:[],
			all_ware_list:[],//这个内容不再地图上标记，不要拖累初始化进度，后期考虑需要才加载
			all_lu_list:[],//这个内容不再地图上标记，不要拖累初始化进度，后期考虑需要才加载
			suspendList:[],
			suspendType:null,//记录当前打开的数据类别，方便选择不同模板

		}
	},
	computed: {

	},
	methods: {
		openSuspend:function(type){
			var self = this 
			


			if(!type){
				console.log('请选择类别')
				return 
			}
			self.suspendType =type
			self.suspendList = []
			// if(!self.IS_TOWN_ID){
			// 	console.log('请先点击左上角选择镇')
			// 	return
			// }

			// 到底哪种好呢？
			// switch(type){
			// 	case 'hotel':
			// 		self.suspendList = self.all_hotel_list
			// 	break;
			// 	case 'cate':
			// 		self.suspendList = self.all_cate_list
			// 	break;
			// 	default:
			// 	break;
			// }


			self.suspendList = self['all_'+type+'_list']
								
			if(self.suspendList.length>0){
				for(var i = 0;i<self.suspendList.length;i++){



					//救救没有图片的穷鬼哦
					if(!self.suspendList[i].thumb){
						self.suspendList[i].thumb = 'http://localhost:8081/static/img/play3.png'
					}

				}
				self.suspendSatus = true
			}
		},
		suspend_back:function(){
			var self = this 
			self.suspendSatus = false
			self.suspendList=[]
		},
		todetail:function(type,resource_id){
			//为了兼容右侧悬浮层的跳转，所以就把type，id拿出来
			console.log(type,resource_id)
			var self = this 
			if(!type||!resource_id){
				console.log('参数错误')
				return 
			}
			switch(type){
				case 'scene':
					self.$router.push('/scene/'+resource_id)
				break;

				case 'town':
				self.$router.push('/town/category/'+resource_id)
				break;

				case 'hotel':
				self.$router.push('/hotel/'+resource_id)
				break;

				case 'ware':
				self.$router.push('/ware/'+resource_id)
				break;

				case 'lu':
				self.$router.push('/way/'+resource_id)
				break;

				case 'cate':
				self.$router.push('/cate/'+resource_id)
				// alert('类别有误')
				break;
				default:
					// alert('类别有误')
				break;

			}
		},
		changeTownShow:function(){
			var self = this
			self.town_show = false;
		},
		reloadMap:function(town_info){
			var self =this
			//后台会返回镇中心的经纬度
			// console.log(town_info)
			self.IS_TOWN_NAME = town_info.town_name
			self.IS_TOWN_ID = town_info.town_id
			if(town_info.lat&&town_info.lng){
				map.panTo([town_info.lng,town_info.lat]); // 用城市名设置地图中心点
				
				// sessionStorage.setItem("town_id",town_info.town_id);//这里的每个接口都有用
				// sessionStorage.setItem("town_name",town_info.town_name);

			}
			self.town_show = false;
		},
		accordions:function(){
		
			var Accordion = function(el, multiple) {

				this.el = el || {};
				
				this.multiple = multiple || false;
				// Variables privadas
				var links = this.el.find('.link');
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


		},
		toMap:function(){
			var self = this
			self.town_show = true
		},
		totown:function(){
			var self = this

			if(!self.IS_TOWN_ID ||self.IS_TOWN_NAME=='海南'){
				alert('请先点击左上角选择镇')
				return 
			}else{
				this.$router.push({path:'/town/'+self.IS_TOWN_ID,query:{town_name:self.IS_TOWN_NAME}})
			}



			
		},
		Tocity:function(){
			var self = this
			self.$http.get('/city/list').then(response => {

				self.townInfo = response.body.data
				self.$nextTick(function () {
					self.accordions()
				})
				
			}, response => {
				console.log("请求失败")
			});
		},
		getLocation:function(){
	
			var Env = this.$util.isEnvironment()

			if(!Env){return}

			switch(Env){
				case 'plus':
					function plusReady(){
						plus.geolocation.getCurrentPosition(function(p){
							map.panTo([p.coords.longitude,p.coords.latitude]);

							new AMap.Marker({
								map,
								position: [p.coords.longitude,p.coords.latitude],
								icon: new AMap.Icon({            
										size: new AMap.Size(128, 128),  //图标大小
										imageSize: new AMap.Size(36,36),
										image: 'http://town.icloudinn.com/map/map.png',
										// imageOffset: new AMap.Pixel(0, -60)
								})    
							});
							
						}, function(e){
							alert('Geolocation error: ' + e.message);
						} );
					}
						
					if(window.plus){
						plusReady();
					}else{
						document.addEventListener("plusready",plusReady,false);
					}
				break
				case 'wechat':
				// do something
				console.log("is wechat")
				break
				case 'web':
				// do something
				console.log("is web");
				break
				default:
				// do something
				console.log("迷之设备");
				break
			}
			
			
		},
		markerClick:function (e){
			
			// 让marker_info_box变量不为空，就控制页面显示/消失了
			var self = this
			self.marker_info_box = {
				name:e.target.name,
				resource_id:e.target.resource_id,
				type:e.target.type,
				lng:e.lnglat.lng,
				lat:e.lnglat.lat,
				thumb:e.target.thumb,
			}
			map.panTo([e.lnglat.lng,e.lnglat.lat]); 

			// 修改所有控件显示状态
			self.mapPluginHide()

			self.suspendSatus = false
		
		},
		// 编写自定义函数,创建标注
		addMarker:function (point,type,resource_id,label,thumb){
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
			// console.log(label)
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
			marker.thumb = thumb||'http://town.icloudinn.com/xzyy.png'

			//给Marker绑定单击事件
			marker.on('click', self.markerClick);
			
		},
		mapPluginShow:function(){
			
			map.toolbar.show()
			// map.geolocation.show()
		},
		mapPluginHide:function(){
			map.toolbar.hide()
			// map.geolocation.hide()
		},

		mapload:function(){

			// 高德地图API功能
			var self =this
			var map = new AMap.Map('mapbox', {
					resizeEnable: true,
					zoom:12,
					// center: '海南'
			});

			// 一楼用
			// var map = new AMap.Map('mapbox', {
			// 		resizeEnable: true,
			// 		zoom:9,
			// 		center: [109.769514,19.188529]
			// });

			
			
			window.map = map

			map.setMapStyle('amap://styles/efcd282ccc6602c716da03bfa4d88a3c');


			AMap.plugin(['AMap.ToolBar','AMap.Geolocation'],
				function(){
					map.toolbar = new AMap.ToolBar()
					map.geolocation = new AMap.Geolocation()
					map.addControl(map.toolbar);
					map.addControl(map.geolocation);
			});

			map.on('click', function(e) {

				self.marker_info_box = null
				self.suspendSatus = false //顺路也把左侧给清空了
				self.mapPluginShow()
				
			});


		
			//获取当前位置
			self.getLocation()


		

			//加载镇
			this.$http.get('/town/list').then(response => {
				// get body data
				
				var townList = response.body.data


				for(var i=0;i<townList.length;i++){

					if(townList[i].lat&&townList[i].lng){

						var point = [townList[i].lng,townList[i].lat],
						type = 'town',
						label = townList[i].town_name,
						resource_id = townList[i].town_id,
						thumb = townList[i].thumb
				
						self.addMarker(point,type,resource_id,label,thumb);
					}
					

					
				}
							
			}, response => {
				// error callback
			});


			//加载风景
			this.$http.get('/test/getScene').then(response => {
				// get body data
				
				var sceneList = response.body.data
				
				for(var i=0;i<sceneList.length;i++){

					if(sceneList[i].lat&&sceneList[i].lng){

						// 让缩略图统一字段名字哦。。
						sceneList[i].thumb = sceneList[i].scene_thumb
						sceneList[i].name = sceneList[i].scene_name
						delete sceneList[i].scene_thumb
						delete sceneList[i].scene_name
						var point = [sceneList[i].lng,sceneList[i].lat],
						type = 'scene',
						label = sceneList[i].scene_name,
						resource_id = sceneList[i].scene_id,
						thumb = sceneList[i].scene_thumb
				
						self.addMarker(point,type,resource_id,label,thumb);
					}
								
				}

				self.all_scene_list = sceneList
							
			}, response => {
				// error callback
			});

			//加载酒店
			this.$http.get('/test/getHotel').then(response => {
				// get body data
				
				var hotelList = response.body.data
				self.all_hotel_list = hotelList

				for(var i=0;i<hotelList.length;i++){
					
					if(hotelList[i].lat&&hotelList[i].lng){
						var point = [hotelList[i].lng,hotelList[i].lat],
						type = 'hotel',
						label = hotelList[i].name,
						resource_id = hotelList[i].hotel_id,
						thumb = hotelList[i].thumb
				
						self.addMarker(point,type,resource_id,label,thumb);
					}
					

					
				}
							
			}, response => {
				// error callback
			});


			//加载美食
			this.$http.get('/test/getCate').then(response => {
				// get body data
				
				var cateList = response.body.data
				self.all_cate_list = cateList
				
				for(var i=0;i<cateList.length;i++){
					
					if(cateList[i].lat&&cateList[i].lng){
						var point = [cateList[i].lng,cateList[i].lat],
						type = 'cate',
						label = cateList[i].name,
						resource_id = cateList[i].cate_id,
						thumb = cateList[i].thumb
				
						self.addMarker(point,type,resource_id,label,thumb);
					}
					

					
				}
							
			}, response => {
				// error callback
			});

			//加载美食
			this.$http.get('/test/getGoods').then(response => {
				// get body data
				
				var wareList = response.body.data
				self.all_ware_list = wareList
				
				
							
			}, response => {
				// error callback
			});
			
			
			//加载精美线路
			this.$http.get('/test/travelRoute').then(response => {
				// get body data
				
				var luList = response.body.data
				self.all_lu_list = luList
				
				
							
			}, response => {
				// error callback
			});

			
		}
		
	},
	components: {

		foot:footer
	},
	watch: {

	},
	mounted() {

		// localStorage.clear()
		// sessionStorage.clear()

		var self = this
		self.IS_TOWN_NAME = '海南'
		self.mapload()
		self.Tocity()
			
	}
}

</script>
<style lang="less">

</style>
