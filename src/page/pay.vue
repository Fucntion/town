<template>
<div class="who">
<div id="dcontent" class="dcontent">
		<button @click="captureImage()">ffff</button>
					
			<br/>
			<p id="info" style="padding: 0 1em;text-align:left;">支付通道信息：
			</p>
			<div style="padding: 0.5em 1em;"><hr color="#EEE"/></div>
			<p style="padding: 0 1em;text-align:left;">为DCloud提供的免费软件进行赞助吧。</p>
			<br/>
			<div style="padding: 0 1em;text-align:left">
				金额：<input id="total" type="number" v-model="amount"/> 元
			</div>
			<br/>
			<!--<div class="button" onclick="clicked('payment_iap.html')">Apple IAP</div>-->
			<button  class="button" v-for="channel in channels" :id="channel.id" @click="pay(channel.id)">
				{{channel.description+'支付'+channel.id}}
			</button>
		</div>
<!--<div id="output">
Payment模块管理支付功能，可通过js调用第三方支付服务。通过plus.payment可获取支付管理对象。
</div>-->

</div>
</template>
<script>

// import { alert } from 'vue-mui'
// require('../assets/js/common.js');
require('../assets/js/immersed.js');

export default {
	name:'home',
	data: function() {

		return {
			pays:{},
			w:null,
			PAYSERVER:'http://api.town.icloudinn.com/order/pay/wx',
			channels:null,
			amount:null
		}
	},
	methods: {
		init:function(){
			var self = this
			// 获取支付通道
			plus.payment.getChannels(function(channels){
				self.channels = channels
				console.log(self.channels)
				var content=document.getElementById('dcontent');
				var info=document.getElementById('info');

				var txt='支付通道信息：';
				for(var i in channels){
					var channel=channels[i];
					if(channel.id=='qhpay'||channel.id=='qihoo'){	// 过滤掉不支持的支付通道：暂不支持360相关支付
						continue;
					}
					self.pays[channel.id]=channel;

					txt += 'id:'+channel.id+', ';
					txt += 'description:'+channel.description+', ';
					txt += 'serviceReady:'+channel.serviceReady+'； ';

					// var de=document.createElement('div');
					// de.setAttribute('class', 'button');
					// de.setAttribute('onclick', 'pay(this.id)');
					// de.id=channel.id;
					// de.innerText=channel.description+'支付';
					// content.appendChild(de);

					self.checkServices(channel);
				}
				info.innerText=txt;
			},function(e){
				console.log('获取支付通道失败：'+e.message);
			});	
		},
				
		// 检测是否安装支付服务
		checkServices:function(pc){
			if(!pc.serviceReady){
				var txt=null;
				switch(pc.id){
					case 'alipay':
					txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
					break;
					default:
					txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
					break;
				}
				plus.nativeUI.confirm(txt, function(e){
					if(e.index==0){
						pc.installService();
					}
				}, pc.description);
			}
		},

		
		// 支付
		pay:function(id){

			alert('333')

			var self =this

			console.log(self.w)

			if(self.w){return;}//检查是否请求订单中
			if(id==='appleiap'){
				// outSet('应用内支付');
				clicked('payment_iap.html');
				return;
			}
			// outSet('----- 请求支付 -----');
			var url=self.PAYSERVER;
			if(id=='alipay'||id=='wxpay'){
				url+=id;
			}else{
				plus.nativeUI.alert('当前环境不支持此支付通道！', null, '捐赠');
				return;
			}
			var appid=plus.runtime.appid;
			if(navigator.userAgent.indexOf('StreamApp')>=0){
				appid='Stream';
			}
			// url+='&appid='+appid+'&total=';
			
			self.w=plus.nativeUI.showWaiting();
			// 请求支付订单
			var amount = document.getElementById('total').value;
			// var xhr=new XMLHttpRequest();
			// xhr.onreadystatechange=function(){
			// 	switch(xhr.readyState){
			// 		case 4:
			// 		self.w.close();self.w=null;
			// 		if(xhr.status==200){
			// 			// outLine('----- 请求订单成功 -----');
			// 			console.log(xhr.responseText);
			// 			var order=xhr.responseText;
					
			// 			plus.payment.request(self.pays[id],order,function(result){
			// 				// outLine('----- 支付成功 -----');
			// 				// outLine(JSON.stringify(result));
			// 				plus.nativeUI.alert('支付成功：感谢你的支持，我们会继续努力完善产品。',function(){
			// 					back();
			// 				},'捐赠');
			// 			},function(e){
			// 				// outLine('----- 支付失败 -----');
			// 				// outLine('['+e.code+']：'+e.message);
			// 				plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：'+e.code);
			// 			});
			// 		}else{
			// 			// outLine('----- 请求订单失败 -----');
			// 			// outLine( xhr.status );
			// 			plus.nativeUI.alert('获取订单信息失败！', null, '捐赠');
			// 		}
			// 		break;
			// 		default:
			// 		break;
			// 	}
			// }
			// xhr.open('GET',url+amount);
			// outLine('请求支付订单：'+url+amount);
			this.$http.post('/order/pay/wx',{amount:self.amount}).then(response => {
				// get body data
				// response.body
				self.w.close();self.w=null;
				console.log(response.body.data)
				var order=response.body.data
				plus.payment.request(self.pays[id],order,function(result){
							// outLine('----- 支付成功 -----');
							// outLine(JSON.stringify(result));
							plus.nativeUI.alert('支付成功',function(){
								back();
							},'支付');
						},function(e){
							// outLine('----- 支付失败 -----');
							// outLine('['+e.code+']：'+e.message);
							plus.nativeUI.alert(null, null, '支付失败：'+e.code);
						});

			}, response => {
				self.w.close();self.w=null;
				console.log(response.body)
			});
			// xhr.send();
		},
		captureImage:function(){

			// 获取设备默认的摄像头对象 
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			console.log("Resolution: "+res+", Format: "+fmt);
			cmr.captureImage( function( path ){
					alert( "Capture image success: " + path );  
				},
				function( error ) {
					alert( "Capture image failed: " + error.message );
				},
				{resolution:res,format:fmt}
			);
		}
	},
	components: {
		// alert
	},
	watch: {

	},
	mounted() {
		var self = this

		self.init()
		 
	}
}
</script>
<style lang="less">

</style>