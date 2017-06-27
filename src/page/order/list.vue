<template>
<div class="wrap">
	<header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >我的订单</div>
	</header>
	<div id="order_list" class="marTop" :class="{head:ishead}">
		<div class="weui-form-preview" v-for="order in orderList">
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

import Store from 'store'
export default {
	name:'orderlist',
	data: function() {

		return {
			orderList:[],
			ishead:null
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

		Store.commit('openLoading')

		this.$http.get('/order/list').then(response => {

			Store.commit('closeLoading')
			// get body data
			self.orderList = response.body
			// self.orderList = self.orderList.purchaser

		}, response => {
			// error callback
		});
		self.ishead = Store.getters.getvisible;

	}
}
</script>
<style lang="less">

</style>
