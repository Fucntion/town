<template>
<footer>
    <div class="weui-tabbar index-tabbar">
    <a href="#/" class="weui-tabbar__item " v-bind:class="{'active_tabbar': path=='/'}" >
       <i class="iconfont icon-shouye"></i>
        <p class="weui-tabbar__label " >首页</p>
    </a>
    
     <a href="#/nearby" class="weui-tabbar__item" v-bind:class="{'active_tabbar': path=='/nearby'}" >
        
       <i class="iconfont icon-ditu"></i>
        <p class="weui-tabbar__label">附近</p>
    </a>
    <a href="#/find" class="weui-tabbar__item" v-bind:class="{'active_tabbar': path=='/find'}">
        
       <i class="iconfont icon-faxian"></i>
        <p class="weui-tabbar__label">路线</p>
    </a>
   
     <a href="#/activity" class="weui-tabbar__item" v-bind:class="{'active_tabbar': path=='/activity'}">
        
       <i class="iconfont icon-huodong-copy"></i>
        <p class="weui-tabbar__label">活动</p>
    </a>
    <a href="#/user" class="weui-tabbar__item" v-bind:class="{'active_tabbar': path=='/user'}">
        
       <i class="iconfont icon-wode"></i>
        <p class="weui-tabbar__label">我的</p>
    </a>
    
</div>

</footer>

</template>

<script>
	export default {
		name: 'footer',
		data() {

			return {
                path:this.$route.path
			}

		},
		components: {

		},
		methods:{
           
		},
		mounted() {
              
		}
	}
</script>

<style lang="less">
.index-tabbar{
    position: fixed;
}
.weui-tabbar__item{
    i.iconfont{
        font-size:18px;
    }
    .weui-tabbar__label {
        /*font-size: 14px;*/
        /*line-height: 14px;*/
    }
}

.active_tabbar{
    color: #1AAD19;
    .weui-tabbar__label{
        color: #1AAD19
    }
}

</style>