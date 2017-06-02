<template>
<div class="wrap">
     <header class="bar" :class="{head:ishead}" >
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >直播列表</div>
	</header>
    <div class="town-content marTop" :class="{head:ishead}">
        <div id="live" class="live_box">
            <div class="town-row">
                <div @click="toRoom(item)" class="town-col-xs-12" v-for="item in liveList" :style="{backgroundImage: 'url(' + item.room.coverImgUrl + ')'}">

                    <div class="l_title">{{item.room.title}}</div>
                    <div class="mask"></div>
                </div>

            </div>
        </div>
   </div>

	<div class="weui-tabbar index-tabbar">
		<a href="#/" class="weui-tabbar__item">
			<span style="display: inline-block;position: relative;">
			<img src="../../assets/img/home_s.png" class="icon_img"/>
		</span>
			<p class="weui-tabbar__label">首页</p>
		</a>
		<a href="#/livelist" class="weui-tabbar__item weui-bar__item_on">
			<img src="../../assets/img/live.png" class="icon_img"/>
			<p class="weui-tabbar__label">旅游直播</p>
		</a>
		<a href="#/warelist" class="weui-tabbar__item">
			<span style="display: inline-block;position: relative;">
			<img src="../../assets/img/find_s.png" class="icon_img"/>
		</span>
			<p class="weui-tabbar__label">发现</p>
		</a>
		<a href="#/user" class="weui-tabbar__item">
			<img src="../../assets/img/user_s.png" class="icon_img"/>
			<p class="weui-tabbar__label">我的</p>
		</a>
	</div>
</div>
</template>

<script>
	import Store from 'store'
export default {
	name:'livelist',
	data: function() {

		return {
            liveList: [],
			ishead:null
		}
	},
    computed:{

    },
	methods: {
		toRoom:function(item){
      Store.commit('setRoom',item.room)
      localStorage.setItem('room',JSON.stringify(item))
			window.hlsUrl = item.room.playUr
			this.$router.push('/room/25')
		}
	},
	components: {
		Store
	},
	watch: {

	},
	mounted() {

        var self = this
		Store.commit('openLoading')
        this.$http.get('/live/list').then(response => {
            // get body data
			Store.commit('closeLoading')
            self.liveList = response.body.data

            this.$nextTick(function () {

                    var gallery = mui('.mui-slider')
                    gallery.slider({
                        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                })
        }, response => {
            // error callback
        });

		self.ishead = Store.getters.getvisible;
	}
}
</script>
<style lang="less">

</style>
