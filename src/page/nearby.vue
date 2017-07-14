<template>
<div class="wrap" >
	 <!--搜索-->
	<div v-show="!marker_info_box" class="nearby-search-bar" :style="{paddingTop:ishead+'px'}">
		<span @click="toMap()" class="change_town_btn">{{IS_TOWN_NAME}}</span>
		<div class="scan" @click="Toscan()" v-if="isplus=='plus'" ></div>
	</div>

	<!--底部按钮-->
	<div class="zuimei" @click="totown()"  v-show="!marker_info_box">
		玩转小镇
	</div>
	
	<!--地图-->
	<div  id="mapbox"></div>

	<foot></foot>

	<!--游线列表-->
 
	<!--点信息-->
	<div v-if="marker_info_box" class="marker_info_box info_box">
		<div class="info">
			<dl class="info_l">
				<dd class="name"><span>{{marker_info_box.name}}</span><small>66人想去</small></dd>
				<dd class="adress"><span>海口</span><span>演丰</span></dd>
				<dd class="juli"><span>距您32.26公里</span></dd>
			</dl>
			<div class="info_r">
				<div class="detail btn" @click="todetail(marker_info_box)">查看详情</div>
				<div class="go btn">导航这里</div>
			</div>
		</div>
		<div class="hr"></div>
		<div class="feature">
			<span><i></i>VR</span>
			<span><i></i>AR</span>
			<span><i></i>语音介绍</span>
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
			isplus:this.$util.isEnvironment()
			

		}
	},
	computed: {

	},
	methods: {
		todetail:function(info){

			
			var self = this 

			switch(info.type){
				case 'scene':
					self.$router.push('/scene/'+info.resource_id)
				break;
				case 'town':
				self.$router.push('/town/category/'+info.resource_id)
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

			if(!self.IS_TOWN_ID ||self.IS_TOWN_NAME=='我在哪?'){
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
				lat:e.lnglat.lat
			}
		
		},
		// 编写自定义函数,创建标注
		addMarker:function (point,type,resource_id,label){
			var self = this,
				imageUrl = null
			
			switch(type){
				case 'scene':
				imageUrl = "http://town.icloudinn.com/static/images/way_btn2.png"
				break;
				case 'town':
				imageUrl = "http://town.icloudinn.com/static/images/zhen.png"
				break;
				case 'hotel':
				imageUrl = "http://town.icloudinn.com/static/images/ms.png"
				break;
				case 'cate':
				imageUrl = "http://town.icloudinn.com/static/images/shi.png"
				break;
				default:
				break;
			}
			// console.log(label)
			var marker=new AMap.Marker({
				map: map,
				position:point,
				icon: new AMap.Icon({            
					size: new AMap.Size(40, 50),  //图标大小
					image: imageUrl,
					imageOffset: new AMap.Pixel(0, -60)
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
					// center: '海南'
			});

			// 一楼用
			// var map = new AMap.Map('mapbox', {
			// 		resizeEnable: true,
			// 		zoom:9,
			// 		center: [109.769514,19.188529]
			// });

			map.on('click', function(e) {

				self.marker_info_box = null
			});
			
			window.map = map

			map.setMapStyle('amap://styles/efcd282ccc6602c716da03bfa4d88a3c');


			AMap.plugin(['AMap.ToolBar','AMap.Geolocation'],
				function(){
					map.addControl(new AMap.ToolBar());
					map.addControl(new AMap.Geolocation());
			});

			//获取当前位置
			self.getLocation()


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
						label = hotelList[i].hotel_name,
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
						label = cateList[i].cate_name,
						resource_id = cateList[i].cate_id;
				
						self.addMarker(point,type,resource_id,label);
					}
					

					
				}
							
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
		self.IS_TOWN_NAME = '我在哪?'
		self.mapload()
		self.Tocity()
			
	}
}

</script>
<style lang="less">

</style>
