<template>
<footer>
<div class="weui-tabbar index-tabbar">
	<a href="#/" class="weui-tabbar__item weui-bar__item_on">
		<span style="display: inline-block;position: relative;">
		<img src="../assets/img/home.png" class="icon_img"/>
	</span>
		<p class="weui-tabbar__label">首页</p>
	</a>
	
	<a href="#/towninfo" class="weui-tabbar__item" >
		
	</a>
	<a href="#/user" class="weui-tabbar__item">
		<img src="../assets/img/user_s.png" class="icon_img"/>
		<p class="weui-tabbar__label">我的</p>
	</a>
	
</div>
<a href="#/towninfo" class="weui-tabbar__item" id="nav_town">
		<span style="display: inline-block;position: relative;">
			<img src="../assets/img/home.png" class="icon_img"/>
		</span>
		<p class="weui-tabbar__label">玩转小镇</p>
	</a>
</footer>
</template>

<script>
	export default {
		name: 'footer',
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