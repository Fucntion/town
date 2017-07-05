<template>
<div class="wrap">
    <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >选择收货地址</div>
        <div class="bar-right" @click="addresslist()">管理</div>
	</header>
    <div class="town-content ad ad_select marTop" :class="{head:ishead}">
        <div class="addres" v-for="item in addressList" @click="addressSelect(item)">
            <div class="top">
                <input class="link" type="text" :value="item.link" disabled="disabled">
                <input class="tel" type="text" :value="item.tel"  disabled="disabled">
            </div>
            <div class="addr"><span v-if="item.ismain=='1'" style="color:#f60"> [默认地址] </span>{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</div>
                <input class="province" type="hidden" :value="item.province">
                <input class="city" type="hidden" :value="item.city">
                <input class="area" type="hidden" :value="item.area">
                <input class="detail" type="hidden" :value="item.detail">
        </div>
     </div>   
</div>
</template>
	
<script>

 
export default {
	name:'home',
	data: function() {

		return {
			addressList:[],
            ismain:[],
            isaddress:true,
            addressInfo:[]

		}
	},
    computed:{
        
    },
	methods: {
		addresslist:function(){

		 	 this.$router.push('/addresslist')

		 },
        // toorder:function(){
        //         this.$router.push('/order')
        //     },
        addressSelect:function(item){
            var self = this
            self.addressInfo = item
            sessionStorage.setItem('addressInfo',JSON.stringify(self.addressInfo))
            sessionStorage.setItem('isaddress',JSON.stringify(self.isaddress))
            this.$router.push('/order')    
        }
	},
	components: {
		
	},
	watch: {

	},
	mounted() {
		var self = this	
		this.$http.get('/address/list').then(response => {
			// get body data
			self.addressList = response.body
            self.ismain = response.body.ismain
            console.log(self.addressList);
		}, response => {
			// error callback
		});

          
	}
}
</script>
<style lang="less">

</style>