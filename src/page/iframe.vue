<template>
	<div class="wrap">
		<header class="bar bar-clear " :style="{paddingTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()" />
            
            
        </header>
        <!-- :src="link"  -->
		<iframe :src="link" v-if="link" class="linkbox" frameborder="0" seamless :style="{paddingTop:ishead+'px'}"></iframe>
        <!-- <i class="icon-shouye iconfont " :style="{top:ishead+50+'px'}"></i> -->
        <img src="~assets/img/nav-home_s.png" class="icon_tohome" @click="tohome()" />
	</div>
</template>
<script>


	export default {
		name: 'iframe',
		data: function () {

			return {
				ishead: this.$util.istop(),
                isplus: this.$util.isEnvironment(),
                link:this.$route.query.link
				
			}
		},
		computed: {

		},
		components: {
			
		},
		methods: {
			tohome:function(){
                this.$router.push('/')
            },
			init: function () {

				var self = this
				
				// self.$http.get('/v1/activity').then(response => {

				// 	self.activitys = response.body.data

				// }, response => {

				// })

			}

		},

		watch: {

		},
		mounted() {

			this.init()
			

		}
	}

</script>
<style lang="less">
.linkbox{
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
}
.icon_tohome{
    width: 40px;
    height: 40px;
    /* padding: 10px; */
    position: fixed;
    bottom: 60px;
    /* background: rgba(0, 0, 0, 0.4); */
    /* border-radius: 50%; */
    left:10px;
    z-index: 9999;
}
</style>