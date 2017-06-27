<template>
<div class="wrap" style="overflow: hidden;">

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

		<div class="search-bar" :class="{top:ishead}">
			<div @click="toMap()" class="change_town_btn">{{IS_TOWN_NAME}}
				</div>
			<div class="scan" @click="Toscan()" v-show="!is_weixin" ><img src="~assets/img/qrcode.png" /></div>
		</div>

	<a class="zuimei" href="#/towninfo">
		<p>玩转</p>
		<p>小镇</p>
	</a>
<div  id="mapbox"></div>
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
				IS_TOWN_NAME:'演丰镇',
				gpsPoint:null,  
				baiduPoint:null, 
				gpsAddress:null,  
				baiduAddress:null, 

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
			changeTownShow:function(){
				var self = this
				self.town_show = false;
			},
			reloadMap:function(town_info){
				var self =this
				//后台会返回镇中心的经纬度
				console.log(town_info)
				self.IS_TOWN_NAME = town_info.town_name
				if(town_info.lat&&town_info.lng){
					map.centerAndZoom(new BMap.Point(town_info.lat,town_info.lng),14);      // 用城市名设置地图中心点
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

					console.log( links)
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
				console.log(11)

			},
			toTown:function(){

				var self = this
				// 不传参数就返回所有镇列表
				
				self.$http.get('/city/list/').then(response => {

					self.townInfo = response.body.data
					self.$nextTick(function () {
						self.accordions()
					})

					
				}, response => {
					console.log("请求失败")
				});
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
					map.centerAndZoom(new BMap.Point(117.264089,28.268578),14);
					
					
				}else if(ua.indexOf('html5plus')>=0) {

					function plusReady(){
						plus.geolocation.getCurrentPosition(function(p){
							
							map.centerAndZoom(new BMap.Point(p.coords.longitude,p.coords.latitude),14);
							var pt = new BMap.Point(p.coords.longitude,p.coords.latitude);

							var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
							var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
							map.addOverlay(marker2);              // 将标注添加到地图中
							
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
					map.centerAndZoom(new BMap.Point(110.381734,19.995524),14);
				}
				


				
			},
			// 编写自定义函数,创建标注
			addMarker:function (point,type,resource_id,label){
			
	

			var pt = new BMap.Point(point.lng,point.lat);
			var myIcon = new BMap.Icon("http://town.icloudinn.com/map/map.png", new BMap.Size(30,30));
			var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			map.addOverlay(marker);              // 将标注添加到地图中
			if(label){
				var label = new BMap.Label(label,{offset:new BMap.Size(20,-10)});
				marker.setLabel(label);
			}
			
			

			},
			mapload:function(){
				// 百度地图API功能
				var self =this
				var map = new BMap.Map("mapbox");
				window.map = map
				map.centerAndZoom(new BMap.Point(120.381734,19.995524),14);
				//获取当前位置
				self.getLocation()

		
				//加载风景
				this.$http.get('/test/getScene').then(response => {
					// get body data
					
					var sceneList = response.body.data

					for(var i=0;i<sceneList.length;i++){
						var point = new BMap.Point(sceneList[i].lng,sceneList[i].lat),
							type = 'scene',
							label = sceneList[i].scene_name,
							resource_id = sceneList[i].scene_id;
							// label = 
						self.addMarker(point,type,resource_id,label);
					}
				}, response => {
					// error callback
				});

				
				// //加载酒店
				// this.$http.get('/test/getHotel').then(response => {
				// 	// get body data
					
				// 	var hotelList = response.body.data

				// 	for(var i=0;i<hotelList.length;i++){
						
				// 		var point = new BMap.Point(hotelList[i].lng,hotelList[i].lat),
				// 			type = 'hotel',
				// 			label = hotelList[i].hotel_name,
				// 			resource_id = hotelList[i].hotel_id;
				// 			// label = 
				// 		self.addMarker(point,type,resource_id,label);
				// 	}
				// }, response => {
				// 	// error callback
				// });

				// //加载酒店
				// this.$http.get('/test/getCate').then(response => {
				// 	// get body data
					
				// 	var cateList = response.body.data

				// 	for(var i=0;i<cateList.length;i++){
				// 		console.log(cateList[i])
				// 		var point = new BMap.Point(cateList[i].lng,cateList[i].lat),
				// 			type = 'hotel',
				// 			label = cateList[i].hotel_name,
				// 			resource_id = cateList[i].hotel_id;
				// 			// label = 
				// 		self.addMarker(point,type,resource_id,label);
				// 	}
				// }, response => {
				// 	// error callback
				// });
				
				// 添加带有定位的导航控件
				var navigationControl = new BMap.NavigationControl({
					// 靠左上角位置
					anchor:BMAP_ANCHOR_BOTTOM_RIGHT,
					// LARGE类型
					type:BMAP_ANCHOR_TOP_LEFT,
					// 启用显示定位
					enableGeolocation: true,
					offset: new BMap.Size(10, 100)
				});
				map.addControl(navigationControl);

				// 添加定位控件
				// var opts = {}
				var geolocationControl = new BMap.GeolocationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});
				
				geolocationControl.addEventListener("locationSuccess", function(e){
					// 定位成功事件
					var address = '';
					address += e.addressComponent.province;
					address += e.addressComponent.city;
					address += e.addressComponent.district;
					address += e.addressComponent.street;
					address += e.addressComponent.streetNumber;
					console.log("当前定位地址为：" + address);
				});
				geolocationControl.addEventListener("locationError",function(e){
					// 定位失败事件
					alert(e.message);
				});
				map.addControl(geolocationControl);
				//方便其他地方用
				
			}
			
		},
		components: {


		},
		watch: {

		},
		mounted() {

			var self = this
			self.mapload()
			self.toTown()
			self.istop()
			 
			

		}
	}

</script>
<style lang="less">

</style>
