<template>

<div id="loadingToast" v-show="visibility">
	<div class="weui-mask_transparent"></div>
	<div class="weui-toast">
		<i class="weui-loading weui-icon_toast"></i>
		<p class="weui-toast__content">数据加载中</p>
	</div>
</div>
</template>

<script>
	export default {
		name: 'loading',
        props:{
            text:{
                type: String,
                required: true
            }
        },
		data() {

			return {
                visibility:false
			}

		},
		components: {

		},
		methods:{
            show:function(){
                this.visibility =true
            },
            hide:function(){
                this.visibility =false
            }
		},
		mounted() {
          this.show()
          
		}
	}
</script>

<style lang="less">



</style>