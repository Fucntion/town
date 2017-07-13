<template>
<div class="wrap">
     <header class="bar" :style="{paddingTop:ishead+'px'}" >
		<div class="bar-icon"  ><img src="~assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >{{townName}}简介</div>
        <div class="bar-icon" @click="updateSerivces()">
            <img src="~assets/img/share.png" class="icon_img icon_right">
        </div>
    </header>
    <div class="bar_after"></div>
    <div class="town_intro" :style="{marginTop:ishead+'px'}" v-html="townDesc" >   
   </div>
</div>
</template>

<script>

     

export default {
	name:'home',
	data: function() {

		return {
            ishead:this.$util.istop(),
            townName:null,
            townDesc:null,
            text:""

		}
	},
	methods: {


            init:function(){

                var self=this,
                    town_id = self.$route.params.id

                    if(!town_id){

                        alert('小镇id缺失')
                        history(-1)
                    }

                self.$http.get('/town/'+town_id).then(response => {

                    self.townName = response.body.data.town_name
                    self.townDesc = response.body.data.town_desc

                }, response => {
                    // error callback
                    alert(JSON.stringify(response.body))
                });

            }

    },
	components: {

	},
	watch: {

	},
	mounted() {
        
        var self=this
        self.init()
          
    }
}
</script>
<style lang="less">

</style>
