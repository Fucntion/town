<template>

<div id="town">
	<!--<loading v-if="isLoading.show" :text="isLoading.text" ></loading>-->
	<router-view></router-view>
</div>
</template>

<script>

// import loading from 'plugin/loading.vue'

export default {
	name:'app',
	data: function() {

		return {
			
		}
	},
	computed:{

	},
	methods: {

	
	},
	components: {

		
	},
	watch: {

	},
	mounted() {

		mui.init();	

		mui.plusReady(function(){

            plus.navigator.setStatusBarStyle('light');
        })


	}
}
</script>
<style lang="less">

</style>
