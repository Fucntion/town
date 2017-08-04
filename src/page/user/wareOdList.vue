<template>
<div class="wrap">
	<header class="bar" :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()"/>
		我的订单
	</header>
<div class="bar_after" ></div>
	<div style="text-align:center" v-if="!orderList||orderList.length<1"  :style="{marginTop:ishead+'px'}"> 
		<img src="~assets/img/nores.png" />
		<p style="font-size:14px;color:gray;margin-top:10px;">空空如也</p>
	</div>
	<div id="order_list" class="" :style="{marginTop:ishead+'px'}">
		<div class="weui-form-preview" v-for="order in orderList" v-if="orderList.length>0">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">付款金额</label>
                    <span class="weui-form-preview__value price">¥{{order.count}}.00</span>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">收货人</label>
                    <span class="weui-form-preview__value">{{order.link}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">联系电话</label>
                    <span class="weui-form-preview__value">{{order.tel}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">地址</label>
                    <span class="weui-form-preview__value">{{order.address}}</span>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">下单成功</a>
            </div>
        </div>
	</div>
</div>
</template>

<script>

 
export default {
	name:'orderlist',
	data: function() {

		return {
			orderList:[],
			ishead:this.$util.istop(),
            isplus:this.$util.isEnvironment()
		}
	},
	methods: {

		toware:function(goods_id){

			this.$router.push('ware/'+goods_id)

		}
	},
	components: {

	},
	watch: {

	},
	mounted() {

		var self = this

		  

		this.$http.get('/v1/hotel_order').then(response => {

			  
			// get body data
			self.orderList = response.body.data
			// self.orderList = self.orderList.purchaser

		}, response => {
			// error callback
		});
		 

	}
}
</script>
<style lang="less">

</style>
