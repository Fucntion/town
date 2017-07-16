<template>
    <div class="wrap" v-if="townList.length>0">
        
         <div class="bar bar-clear" :style="{marginTop:ishead+'px'}">
            <img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()" />
        </div>
        <div class="town_img" @click="Totown(item)" v-for="item in townList"  :style="{backgroundImage: 'url(' + item.town_thumb + ')'}">
			
			<div class="index_item">
				<div class="index_title"><span>{{item.town_name}}  </span>{{item.city_name}} </div>
				<!--<p>推荐理由</p>-->
			</div>
			<div class="index_mask"></div>
		</div>
		<!--<div class="town_img" @click="Totown(item,1)" v-for="item in townList"  :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.town_thumb + ')'}">
			<div class="index_item">
				<div class="index_title"><span>{{item.town_name}}  </span>{{item.city_name}} </div>
				<p>推荐理由</p>
			</div>
			<div class="index_mask"></div>
		</div>-->
        
    </div>
</template>
<script>
    export default {
        name: 'hot_area',
        data: function () {

            return {
                ishead: this.$util.istop(),
                isplus:this.$util.isEnvironment(),
                townList:[]
            }
        },
        computed: {

        },
        methods: {

            Totown:function(towns){
				
				var self = this


					self.$router.push('/town/category/'+towns.town_id)
					

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

/*.index_town {
    margin-bottom: 55px;*/
    .town_img {
        width: 100%;
        /*margin: 5px auto;*/
        /*//      border: 1px solid #ccc;*/
        border-radius: 3px;
        position: relative;
        height: 0;
        padding-top: 56.7%;
        background-size: cover;
        background-position: center center;
        .index_item {
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: 50%;
            font-size: 16px;
            line-height: 16px;
            margin-top: -16px;
            // left: 10px;
            color: #fff;
            z-index: 5;
        }
        .index_mask {
            position: absolute;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
            z-index: 2;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            padding-top: 60%;
            border-radius: 3px;
        }
    }
/*}*/

</style>