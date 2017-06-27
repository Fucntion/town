<template>

<div id="town">
	<loading v-if="isLoading.show" :text="isLoading.text" ></loading>
	<router-view></router-view>
</div>
</template>

<script>
import Store from 'store'
import loading from 'plugin/loading.vue'

export default {
	name:'app',
	data: function() {

		return {
			isLoading:Store.getters.getLoading
		}
	},
	computed:{

	},
	methods: {

	
	},
	components: {
		Store,
		loading
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
