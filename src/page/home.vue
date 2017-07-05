<template>
<div class="wrap" style="overflow: hidden;">
	 
	<!--选择所在镇组件-->
	<div id="index_address" style="z-index:4" v-show="town_show">	
      <div class="address_content">
			<header class="bar" :class="{head:ishead}">
				<div class="bar-icon"  @click="changeTownShow()"><img src="~assets/img/left.png" class="icon_img"   /></div>
				<div class="bar-title"  >请选择您所在的镇</div>
			</header>
			<div class="address_box marTop" :class="{head:ishead}">
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

	<!--搜索-->
	<div v-show="!marker_info_box" class="search-bar" :class="{top:ishead}">
		<div @click="toMap()" class="change_town_btn">{{IS_TOWN_NAME}}
			</div>
		<div class="scan" @click="Toscan()" v-show="!is_weixin" ><img src="~assets/img/qrcode.png" /></div>
	</div>

	<!--底部按钮-->
	<a class="zuimei" href="#/towninfo" v-show="!marker_info_box">
		玩转小镇

	</a>
	
	<!--地图-->
	<div  id="mapbox"></div>

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

</div>

	
</template>
<script>

export default {
	name: 'home',
	data: function () {

		return {
			ishead:null,
			town_show:false,
			townInfo:[],
			IS_TOWN_NAME:'',
			gpsPoint:null,  
			baiduPoint:null, 
			gpsAddress:null,  
			baiduAddress:null, 
			marker_info_box:null,//marker点的详情box

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
		todetail:function(info){

			
			var self = this 

			switch(info.type){
				case 'scene':
					self.$router.push('/scene/'+info.resource_id)
				break;
				case 'town':
				self.$router.push('/townindex/'+info.resource_id)
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
			if(town_info.lat&&town_info.lng){
				map.panTo([town_info.lng,town_info.lat]); // 用城市名设置地图中心点
				localStorage.setItem("town_id",town_info.town_id);//这里的每个接口都有用
				localStorage.setItem("town_name",town_info.town_name);
				localStorage.setItem("city_name",town_info.city_);
			}
			self.town_show = false;
		},
		accordions:function(){
		
			var Accordion = function(el, multiple) {

				this.el = el || {};
				
				this.multiple = multiple || false;
				
				// Variables privadas
				var links = this.el.find('.link');

				// console.log( links)
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
			// console.log(11)

		},
		toMap:function(){
			var self = this
			// self.location_web()
			self.town_show = true

			// self.accordions()
		},
		totowninfo:function(){
			this.$router.push('/towninfo')
		},
		istop:function(){
			
			var self=this
			if(navigator.userAgent.indexOf("Html5Plus")>=0){
		
				return self.ishead=true
			}else{
	
				return self.ishead=false
			}
		},
		Tocity:function(){
			var self = this
			self.$http.get('/city/list/').then(response => {

				self.townInfo = response.body.data
				self.$nextTick(function () {
					self.accordions()
				})
				
				
			}, response => {
				console.log("请求失败")
			});
		},
		Toscan:function(){
			this.$router.push('/scan')
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
		getLocation:function(){
	
			var ua= navigator.userAgent.toLowerCase();
			console.log('ua is',ua,ua.indexOf('html5plus')>=0)
			if(ua.indexOf("micromessenger")>=0) {
				console.log("is wechat")
				// map.panTo([117.264089,28.268578]);

			}else if(ua.indexOf('html5plus')>=0) {

				function plusReady(){
					plus.geolocation.getCurrentPosition(function(p){
						map.panTo([p.coords.longitude,p.coords.latitude]);

						new AMap.Marker({
							map,
							position: [p.coords.longitude,p.coords.latitude],
							icon: new AMap.Icon({            
									// size: new AMap.Size(40, 50),  //图标大小
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

			}else{
				console.log("is web");

				
			}
			
			
		},
		markerClick:function (e){
			var self = this
			self.marker_info_box = {
				name:e.target.name,
				resource_id:e.target.resource_id,
				type:e.target.type,
				lng:e.lnglat.lng,
				lat:e.lnglat.lat
			}
		
			// var infoWindow = new AMap.InfoWindow();
			// infoWindow.setContent(e.target.name);
			// infoWindow.open(map, e.target.getPosition());
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


			AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView','AMap.Geolocation'],
				function(){
					map.addControl(new AMap.ToolBar());
					map.addControl(new AMap.Geolocation());
			});

			//获取当前位置
			self.getLocation()


			// 加载镇


			self.$http.get('/town/list/').then(response => {

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


			// http://town.icloudinn.com/static/images/zhen.png
			//加载风景
			this.$http.get('/test/getScene').then(response => {
				// get body data
				
				var sceneList = response.body.data

				for(var i=0;i<sceneList.length;i++){
					var point = [sceneList[i].lng,sceneList[i].lat],
						type = 'scene',
						label = sceneList[i].scene_name,
						resource_id = sceneList[i].scene_id;
				
					self.addMarker(point,type,resource_id,label);

					
				}
							
			}, response => {
				// error callback
			});

			// map.setFitView();
			
		}
		
	},
	components: {


	},
	watch: {

	},
	mounted() {

		// localStorage.clear()
		// sessionStorage.clear()
		console.log(util)
		var self = this
		self.IS_TOWN_NAME = localStorage.getItem("town_name")||'我在哪？'
		self.mapload()
		self.Tocity()
		self.istop()
			
	}
}

</script>
<style lang="less">

</style>
