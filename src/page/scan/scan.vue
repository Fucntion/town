<template>
	<div class="wrap">
		<header class="bar" :style="{paddingTop:ishead+'px'}">
			<img src="~assets/img/left.png" class="icon_img icon_left" @click="closeScan()" />
			扫一扫
		</header>
		
		<div id="bcid" v-if="isplus=='plus'" :style="{top:44+ishead+'px'}">
			
		</div>

		

		
	</div>
</template>

<script>
	
	 
// require('assets/js/common.js')


export default {
	name: 'scan',
	data: function() {

		return {

			ishead:this.$util.istop(),
			isplus:this.$util.isEnvironment(),
			scan: null,
		}
	},
	computed: {

	},
	methods: {
		// H5 plus事件处理
		// onmarked:function (type, result, file){
		// 	console.log('plus',plus)
		// 	var self = this
		// 	switch(type){
		// 		case plus.barcode.QR:
		// 		type = 'QR';
		// 		break;
		// 		case plus.barcode.EAN13:
		// 		type = 'EAN13';
		// 		break;
		// 		case plus.barcode.EAN8:
		// 		type = 'EAN8';
		// 		break;
		// 		default:
		// 		type = '其它'+type;
		// 		break;
		// 	}
		// 	result = result.replace(/\n/g, '');
		// 	console.log(type,result,file);
		// 	self.scan.close()
			
		// },
		onmarked: function(type, result) {

			console.log(type,result);
			console.log('扫码结束')

			var self= this,
				text = '未知: ';
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

			result = result.replace(/\n/g, '');

			WeVue.Toast({
                            duration: 1000,
                            message: result,
                            type: 'text'
                        })
			if(type==plus.barcode.QR){

				
				// 搞了半天是我自己做的二维码不符合json格式。。。
				var data = JSON.parse(result),
					resource_type =data.type,
					resource_id = data.resource_id;
				
				if(resource_type&&resource_id){
					// alert('成功啦')
					self.scan.close()
				}else{
				// alert('失败啦')
					WeVue.Toast({
                            duration: 1000,
                            message: '内容有误',
                            type: 'text'
                        })
					self.cancelScan()
					self.startScan()
					return
				}

				

				switch(resource_type){
					case 'scene':
						self.$router.push('/scene/'+resource_id)
					break;

					case 'town':
					self.$router.push('/town/category/'+resource_id)
					break;

					case 'hotel':
					// self.$router.push('/')
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
						console.log('类别有误')
						self.$router.back()
					break;

				}


				// location.href ="http://tonw.icloudinn.com"
				
			}else{

				WeVue.Toast({
					duration: 1000,
					message: '二维码无效',
					type: 'text'
				})
				self.cancelScan()
				self.startScan()
				
				
			}
		},
		onerror:function(error){
			var code = error.code; 			// 错误编码
			var message = error.message;	// 错误描述信息
			console.log(code,message)
		},
		startScan: function() {
			console.log('跑起来')
			var self = this
			self.scan.start({vibrate:true})
			console.log('跑起来2')
		},
		cancelScan: function() {
			var self = this
			self.scan.cancel();
		},
		setFlash: function() {
			var self = this
			self.scan.setFlash();
		},
		closeScan:function(){

			var self = this
			self.scan.close();

			self.$util.toBack()

		},
		plusReady:function (){

			var self = this
			console.log('开始开始开始')

			if(!window.plus){
				return;
			}

			var styles = {frameColor: "#1AAD19",scanbarColor: "#1AAD19"};
			var filter = [plus.barcode.QR];
console.log('跑起来---------')
			self.scan = new plus.barcode.Barcode('bcid',filter,styles);
			self.scan.onmarked = self.onmarked
			self.scan.onerror = self.onerror
console.log('跑起来0')
			self.startScan()
			console.log('跑起来3')
		},

	},
	components: {
			
	},
	watch: {

	},
	mounted() {

		var self = this

		// if(window.plus) {
		// 	self.plusReady();
		// } else {
		// 	document.addEventListener('DOMContentLoaded', self.plusReady, false);
		// }

		// var ws=null,wo=null;
		// var domready=false;


		// // 二维码扫描成功
		// function onmarked(type, result, file){


		// 	switch(type){
		// 		case plus.barcode.QR:
		// 		type = 'QR';
		// 		break;
		// 		case plus.barcode.EAN13:
		// 		type = 'EAN13';
		// 		break;
		// 		case plus.barcode.EAN8:
		// 		type = 'EAN8';
		// 		break;
		// 		default:
		// 		type = '其它'+type;
		// 		break;
		// 	}
		// 	result = result.replace(/\n/g, '');
		// 	console.log(type,result,file);
		// 	self.scan.close()
			
		// }


		


		if(window.plus){
			
			self.plusReady();

		}else{
			document.addEventListener('plusready', self.plusReady, false);
		}


		// 监听DOMContentLoaded事件
		document.addEventListener('DOMContentLoaded', function(){
			self.plusReady();
		}, false);


		
		


		
	}
}
</script>
<style lang="less">	
#bcid {
	position: absolute;
	top:0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
}
</style>
