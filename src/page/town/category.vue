<template>
    <div class="wrap" v-if="townInfo">
        <div id="banner">

            <div class="bar" :style="{paddingTop:ishead+'px'}">
                小镇简介
                <img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)" />
                <img src="~assets/img/share.png" v-if="isplus=='plus'"  class="icon_img icon_right" @click="updateSerivces()">
            </div>
            <div class="bar_after"></div>
            <img width="100%" :src="townInfo.town_thumb" />
            

        </div>
        

        <div class="info_list">
            <div class="block info_item info_item_desc">
                <div class="info_title">
                    简介
                </div>
                <div v-html="townInfo.town_desc" style="margin-top:20px;" :class="isDrop?'desc_box':''">

                </div>

                <div class="weui-btn" style="border-radius:0;margin:20px auto 10px;width:100px;font-size:14px;color:#666666;" @click="changeDrop()">显示全部</div>

            </div>
            <div class="block info_item" v-if="sceneList.length>0">
                <div class="info_title">
                    自然风光
                </div>

                <div class="box">
                    <a class="item" v-for="(scene,index) in sceneList" :href="'/#/scene/'+scene.scene_id">
                        <div class="thumb" :style="{backgroundImage: 'url('+ scene.scene_thumb + ')'}"></div>

                        <p>{{scene.scene_name}}</p>
                    </a>
                </div>
            </div>
            <div class="block info_item" v-if="cateList.length>0">
                <div class="info_title">
                    美食
                </div>

                <div class="box">
                    <a class="item" v-for="(cate,index) in cateList" :href="'/#/cate/'+cate.cate_id">
                        <!--{{cate.thumb[0].url}}-->
                        <div class="thumb" :style="{backgroundImage: 'url('+ cate.thumb[0].url + ')'}"></div>

                        <p> {{cate.name}}</p>
                    </a>

                </div>
            </div>
            <div class="block info_item" v-if="wareList.length>0">
                <div class="info_title">
                    手礼
                </div>

                <div class="box">
                    <a class="item" v-for="(ware,index) in wareList" :href="'/#/ware/'+ware.goods_id">

                        <div class="thumb" :style="{backgroundImage: 'url('+ ware.thumb + ')'}"></div>

                        <p> {{ware.name}}</p>

                    </a>
                </div>
            </div>
            <div class="block info_item" v-if="hotelList.length>0">
                <div class="info_title">
                    民宿
                </div>

                <div class="box">
                    <a class="item" v-for="(hotel,index) in hotelList" :href="'/#/hotel/'+hotel.hotel_id">

                        <div class="thumb" :style="{backgroundImage: 'url('+ hotel.thumb + ')'}"></div>

                        <p> {{hotel.name}}</p>

                    </a>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <div class="weui-btn weui-btn_primary" @click="totown()">进入小镇</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'town_category',
        data: function () {

            return {
                townInfo: null,
                shares: {},
                desc: null,
                sceneList: [],
                cateList: [],
                wareList: [],
                hotelList: [],
                isDrop: true,
                ishead: this.$util.istop(),
                isplus:this.$util.isEnvironment()
            }
        },
        computed: {

        },
        methods: {

            changeDrop: function () {
                this.isDrop = !this.isDrop
            },
            // 更新分享服务及发布分享

            updateSerivces: function () {

                this.$util.updateSerivces()
            },

           
            totown: function () {
                this.$router.push('/town/' + this.$route.params.id)
            },
            init: function () {

                var self = this,
                    townId = self.$route.params.id

                this.$http.get('/town/' + townId).then(response => {

                    self.townInfo = response.body.data
                    self.sceneList = self.townInfo.scene
                }, response => {
                    // error callback
                });

                this.$http.get('/cate/list').then(response => {


                    self.cateList = response.body.data

                }, response => {
                    // error callback
                });

                this.$http.get('/ware/list').then(response => {


                    self.wareList = response.body.data

                }, response => {
                    // error callback
                });

                this.$http.get('/hotel/list').then(response => {


                    self.hotelList = response.body.data

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
            self.$nextTick(function () {

                var gallery = mui('.mui-slider')
                gallery.slider({
                    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            })
            self.init()


        }
    }

</script>
<style lang="less">

</style>