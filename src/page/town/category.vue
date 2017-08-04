<template>
    <div class="wrap" v-if="townInfo">
        <div id="banner">

            <div class="bar bar-clear" :style="{paddingTop:ishead+'px'}">
                <!-- 小镇简介 -->
                <img src="~assets/img/left.png" class="icon_img icon_left gray" @click="$util.toBack()" />
                <img src="~assets/img/share.png" v-if="isplus=='plus'" class="icon_img icon_right gray" @click="updateSerivces()">
            </div>
            <!-- <div class="bar_after"></div> -->
            <img class="category_thumb" :style="{backgroundImage: 'url(' + townInfo.town_thumb + ')'}"  />


        </div>

        <div class="info_list">
            <div class="block info_item info_item_desc">
                <div class="info_title">
                    {{townInfo.town_name}}简介
                </div>
                <div v-html="townInfo.town_desc" style="margin-top:10px;" class="m_content" :class="isDrop?'desc_box':''">

                </div>

                <div class="weui-btn drop-btn" v-if="isDrop" @click="changeDrop()">显示全部</div>

                <div class="weui-btn drop-btn" v-else @click="changeDrop()">收起</div>

            </div>

            <div class="block info_item" v-if="sceneList&&sceneList.length>0">
                <div class="info_title">
                    自然风光
                </div>

                <div class="box">
                    <div class="item" v-for="(scene,index) in sceneList" @click="todetail('scene',scene.scene_id)">
                        <div class="thumb" :style="{backgroundImage: 'url('+ scene.scene_thumb + ')'}"></div>

                        <p v-strcut='6'>{{scene.scene_name}}</p>
                    </div>
                </div>
            </div>

            <div class="block info_item" v-if="cateList&&cateList.length>0">
                <div class="info_title">
                    美食
                </div>

                <div class="box">
                    <div class="item" v-for="(cate,index) in cateList" @click="todetail('cate',cate.cate_id)">

                        <div class="thumb" :style="{backgroundImage: 'url('+ cate.thumb + ')'}"></div>

                        <p v-strcut='6'> {{cate.name}}</p>
                    </div>

                </div>
            </div>

            <div class="block info_item" v-if="wareList&&wareList.length>0">
                <div class="info_title">
                    特产
                </div>

                <div class="box">
                    <div class="item" v-for="(ware,index) in wareList" @click="todetail('ware',ware.goods_id)">

                        <div class="thumb" :style="{backgroundImage: 'url('+ ware.thumb + ')'}"></div>

                        <p v-strcut='6'> {{ware.name}}</p>

                    </div>
                </div>
            </div>

            <div class="block info_item" v-if="hotelList&&hotelList.length>0">
                <div class="info_title">
                    民宿
                </div>

                <div class="box">
                    <div class="item" v-for="(hotel,index) in hotelList" @click="todetail('hotel',hotel.hotel_id)">

                        <div class="thumb" :style="{backgroundImage: 'url('+ hotel.thumb + ')'}"></div>

                        <p v-strcut='6'> {{hotel.name}}</p>

                    </div>
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
                isplus: this.$util.isEnvironment()
            }
        },
        computed: {

        },
        methods: {
            todetail: function (type, resource_id) {
                //为了兼容右侧悬浮层的跳转，所以就把type，id拿出来
                console.log(type, resource_id)
                var self = this
                if (!type || !resource_id) {
                    console.log('参数错误')
                    return
                }
                switch (type) {
                    case 'scene':
                        self.$router.push('/scene/' + resource_id)
                        break;

                    case 'town':
                        self.$router.push('/town/' + resource_id+'/category')
                        break;

                    case 'hotel':
                        self.$router.push('/hotel/' + resource_id)
                        break;

                    case 'ware':
                        self.$router.push('/ware/' + resource_id)
                        break;

                    case 'lu':
                        self.$router.push('/way/' + resource_id)
                        break;

                    case 'cate':
                        self.$router.push('/cate/' + resource_id)
                        // alert('类别有误')
                        break;
                    default:
                        // alert('类别有误')
                        break;

                }
            },
            changeDrop: function () {
                this.isDrop = !this.isDrop
            },
            // 更新分享服务及发布分享

            updateSerivces: function () {

                this.$util.updateSerivces()
            },


            totown: function () {
                // this.$router.push('/town/' + this.$route.params.id)
                this.$router.push({
                    path: '/', query: {
                        town_id: this.$route.params.id,
                        type: 'target'
                    }                
})
            },
            init: function () {

                var self = this,
                    townId = self.$route.params.id


                // sessionStorage.setItem("town_id", townId)

                this.$http.get('/town/' + townId).then(response => {

                    self.townInfo = response.body.data
                    self.sceneList = self.townInfo.scene
                }, response => {
                    // error callback
                });

                this.$http.get('/v1/cate?town_id='+townId).then(response => {


                    self.cateList = response.body.data

                }, response => {
                    // error callback
                });

                this.$http.get('/v1/goods?town_id='+townId).then(response => {


                    self.wareList = response.body.data

                }, response => {
                    // error callback
                });

                this.$http.get('/v1/hotel?town_id='+townId).then(response => {


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