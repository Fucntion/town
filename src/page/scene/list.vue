<template>
<div class="wrap">
     <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >语音导览</div>
	</header>
    <div class="town-content marTop" :class="{head:ishead}">
        <!--<div id="live" class="live">
            <div class="town-row">
                <div class="town-col-xs-12" @click="toscene(item.scene_id)" v-for="item in sceneList" :style="{backgroundImage: 'url(' + 'http://api.town.icloudinn.com/uploads/'+item.scene_thumb+ ')'}">
                    <img :src="'http://api.town.icloudinn.com/uploads/'+ item.town_thumb">
                    <div class="l_title">{{item.scene_name}}</div>
                    <div class="mask"></div>
                </div>

            </div>
        </div>-->
         <div id="hotel" class="hotel_box">
            <div class="town-row">
                <div @click="toscene(item.scene_id)" class="town-col-xs-12" v-for="item in sceneList" :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.scene_thumb + ')'}">

                    <div class="hotel_title">{{item.scene_name}}</div>
                    <div class="hotel_number"><span>{{parseInt(Math.random()*100)+1}}</span>人来过</div>
                    <div class="mask"></div>
                </div>

            </div>
        </div>
   </div>


</div>
</template>

<script>

 
export default {
	name:'sceneList',
	data: function() {

		return {
            sceneList: [],
            ishead:null
		}
	},
    computed:{

    },
	methods: {
		toscene:function(scene_id){

			this.$router.push('scene/'+scene_id)

		}
	},
	components: {

	},
	watch: {

	},
	mounted() {

        var self = this

        //   
        
        this.$http.post('/scene/list',{town_id:localStorage.getItem('town_id')}).then(response => {
            // get body data
            //   
            self.sceneList = response.body.data

        }, response => {
            // error callback
        });

          
	}
}
</script>
<style lang="less">

</style>
