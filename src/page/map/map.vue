<template>
<div class="wrap">
	 <header class="bar">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" @click="clear()"/></div>
		<div class="bar-title" >地图</div>
        <div class="bar-right" @click="userLocation()">位置</div>
	</header>
	<div id="map">地图加载中...</div>
</div>
</template>

<script>

export default {
	name:'map',
	data: function() {

		return {
			lats: null,
			longts: null,
            marker:null

          
		}
	},
	methods: {

		locations: function () {
                var self = this
                self.em=document.getElementById("map");
                plus.geolocation.getCurrentPosition(function (p) {
                    self.lats = p.coords.latitude;
                    self.longts = p.coords.longitude;
                    console.log(self.lats+"你好");
                    console.log(self.longts+"你好");                     
                    self.createMarker(self.lats,self.longts) 
                })
        },
      createMarker:function(lats,longts){

           console.log(lats);
           console.log(longts); 
            var self=this
            var posit = new plus.maps.Point(longts,lats);
            self.marker=new plus.maps.Marker(posit);
            self.marker=new plus.maps.Map("map");
		    self.marker.centerAndZoom(posit,12);
            // marker.setLabel("HBuilder");
            // var bubble = new plus.maps.Bubble("打造最好的HTML5移动开发工具");
            // self.marker.setBubble(bubble);    
        },
        clear:function(){
            var self = this
			self.marker.hide()
            setTimeout(function () {
                self.$router.push('/')
            },100);
        
        }
        
    },
	components: {

	},
	watch: {

	},
	mounted() {

       var self=this
       if(window.plus){
           self.locations();
        }else{
            document.addEventListener("plusready",self.locations,false);
        }
    }
}
</script>
<style lang="less">
    #map {
        width: 100%;
        position: fixed;
        top:60px;
        bottom: 0px;
        line-height: 200px;
        text-align: center;
        background: #FFFFFF;
    }
</style>
