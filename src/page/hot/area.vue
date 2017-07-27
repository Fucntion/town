<template>
    <div class="wrap" v-if="townList.length>0">

        <div class="bar bar-clear" :style="{marginTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left  gray" @click="$util.toBack()" />
        </div>
        <div class="town_img" @click="Totown(item)" v-for="item in townList" :style="{backgroundImage: 'url(' + item.town_thumb + ')'}">

            <div class="desc">
                <!-- {{item.city_name}} -->
                <div class="address"><i class="iconfont icon-map"></i>{{item.town_name}} </div>
                <p class="recommend">这是一个有魔力的小镇</p>
            </div>
            <div class="index_mask"></div>
        </div>


    </div>
</template>
<script>
    export default {
        name: 'hot_area',
        data: function () {

            return {
                ishead: this.$util.istop(),
                isplus: this.$util.isEnvironment(),
                townList: []
            }
        },
        computed: {

        },
        methods: {

            Totown: function (towns) {

                var self = this


                self.$router.push('/town/category/' + towns.town_id)


            },
            init: function () {

                var self = this

                self.$http.get('/town/list').then(response => {
                    // self.$http.post('/town/list/',{city_name:city}).then(response => {

                    self.townList = response.body.data
                    // sessionStorage.setItem('townList',JSON.stringify(self.townList))
                }, response => {
                    console.log("请求失败")
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

</style>