<template>
<div class="wrap">
     <header class="bar" :style="{paddingTop:ishead+'px'}" >

		<img src="~assets/img/left.png" class="icon_img icon_left" @click="$util.toBack()" />
        <img  v-if="isplus=='plus'" src="~assets/img/share.png" class="icon_img icon_right" @click="updateSerivces()">

		{{townName}}简介
       
    </header>

    <div class="bar_after" :style="{paddingTop:ishead+'px'}"></div>
    <div class="town_intro"  v-html="townDesc" >   
   </div>
</div>
</template>

<script>

     

export default {
	name:'home',
	data: function() {

		return {
            ishead:this.$util.istop(),
            isplus:this.$util.isEnvironment(),
            townName:null,
            townDesc:null,
            text:""

		}
	},
	methods: {

            updateSerivces:function(){

              this.$util.updateSerivces()
            },
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
