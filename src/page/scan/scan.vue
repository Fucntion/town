<template>
	<div class="wrap">
		<header class="bar" :class="{head:ishead}">
			<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" @click="closeScan()" /></div>
			<div class="bar-title">扫一扫</div>
		</header>
		
		<div id="bcid">
			
		</div>
		
	</div>
</template>

<script>
	
	import Store from 'store'
	require('../../assets/js/common.js')

	export default {
		name: 'travel',
		data: function() {

			return {

				ishead: null,
				scan: null,
			}
		},
		computed: {

		},
		methods: {
			plusReady: function() {

//				var e = document.getElementById("scan");
//				e.removeAttribute("disabled");
			this.startRecognize()
			
				
			},
			onmarked: function(type, result) {
				var text = '未知: ';
				switch(type) {
					case plus.barcode.QR:
						text = 'QR: ';
						break;
					case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
					case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
				}
				
				if(type==plus.barcode.QR){
					self.cancelScan()
					var data = JSON.parse(result),
						type =data.type,
						id = data.id;
						
					location.href ="http://tonw.icloudinn.com";
					
				}else{
					alert('二维码无效');
					this.startScan()
				}
			},
			startRecognize: function() {
				self =this
				var styles = {frameColor: "#1AAD19",scanbarColor: "#1AAD19"};
				var filter;
				self.scan = new plus.barcode.Barcode('bcid',filter,styles);
				self.scan.onmarked = self.onmarked;
				this.startScan()
			},
			startScan: function() {
				self.scan.start();
			},
			cancelScan: function() {
				self.scan.cancel();
			},
			setFlash: function() {
				self.scan.setFlash();
			},
			closeScan:function(){
				if(typeof(plus)!='undefined'&&plus){
					self.scan.close();
				}
				this.$router.push('/')
			}

		},
		components: {
			Store
		},
		watch: {

		},
		mounted() {

			var self = this

			self.ishead = Store.getters.getvisible;

			if(window.plus) {
				self.plusReady();
			} else {
				document.addEventListener('plusready', self.plusReady, false);
			}

		}
	}
</script>
<style lang="less">

	html,
	body {
		margin: 0px;
		padding: 0px;
		height: 100%;
	}
	
	#bcid {
		position: absolute;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
