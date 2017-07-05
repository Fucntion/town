<template>
<div class="wrap">

     <header class="bar">
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >直播列间</div>
	</header>
    <div class="town-content" v-if="room">
      <img class="cover"  :src="room.coverImgUrl" onclick="javascript:location.href='http://live.icloudinn.com'"/>
        <!-- <video controls="controls" width="100%" autoplay="autoplay"  v-bind:style="{'height': clientHeight+'px'}" >
        <source :src="hlsUrl" type='application/vnd.apple.mpegurl' />
        Your browser does not support the video tag.
        </video> -->


	</div>
</div>
</template>

<script>

 
export default {
	name:'room',
	data: function() {

		return {
            room: {},
            clientWidth:document.body.clientWidth,
            clientHeight:document.documentElement.clientHeight-44,
            hlsUrl:'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'||window.hlsUrl
		}
	},
    computed: {

    },
	methods: {



	},
	components: {
    // 
	},
	watch: {

	},
	mounted() {

var self =this
self.room = localStorage.getItem('room')

	}
}
</script>
<style lang="less">

</style>
