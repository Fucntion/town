<template>
<div class="wrap" v-if="show">
     

    <header class="bar bar-clear"  :style="{paddingTop:ishead+'px'}">
		<img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()" />
        <img  v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right gray" @click="updateSerivces()">
{{sceneInfo.scene_name}}
    </header>

    <div class="content">
        <!-- 是否要用幻灯 -->
        <div class="thumb" :style="{backgroundImage: 'url('+sceneInfo.scene_thumb + ')'}"></div>

        <div class="scene_audio">
            <audio style="margin-top:5px;width:414px !important;"  v-if="sceneInfo.scene_voice" :src="sceneInfo.scene_voice" controls="controls">
            </audio>
        </div>

        <div class="message">
            <div v-html="sceneInfo.scene_content" class="m_content child_color">
            </div>
        </div>
    </div>
    

</div>
</template>

<script>

     
    export default {
        name: 'scene',
        data: function () {
            return {
                sceneInfo: {},
                show:false,
                ishead:this.$util.istop(),
                isplus:this.$util.isEnvironment()
            }
        },
        methods: {

            updateSerivces:function(){

              this.$util.updateSerivces()
            },
            init: function () {

                var self = this,
                    sceneId = self.$route.params.id

                this.$http.get('/scene/' + sceneId).then(response => {


                    self.sceneInfo = response.body.data
                    self.show = true

                    this.$nextTick(function () {

                        var gallery = mui('.mui-slider')
                        gallery.slider({
                            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })


                }, response => {
                    // error callback
                });
            }


        },
        components: {

        },
        watch: {

        },

        mounted() {

            var self = this
            self.init()

              

        }
    }

</script>
<style lang="less">
.content{
        .thumb{
        height: 0;
        width: 100%;
        padding-top: 56.7%;
        background-size: cover;
    }
}
</style>
