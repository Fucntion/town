<template>
<div class="wrap">
     <header class="bar" :class="{head:ishead}">
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >美食</div>
	</header>
    <div class="town-content marTop" :class="{head:ishead}">
        <div id="hotel" class="hotel_box">
            <div class="town-row">
                <div @click="toCate(item)" class="town-col-xs-12" v-for="item in cateList" :style="{backgroundImage: 'url(' +'http://api.town.icloudinn.com/uploads/'+ item.thumb[0].url + ')'}">

                    <div class="hotel_title">{{item.name}}</div>
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
	name:'hotellist',
	data: function() {

		return {
            cateList: [],
            ishead:null
		}
	},
    computed:{

    },
	methods: {
		toCate:function(item){

			this.$router.push('cate/'+item.cate_id)
		}
	},
	components: {
		 
	},
	watch: {

	},
	mounted() {

        var self = this

          

        this.$http.get('/cate/list').then(response => {

              

            self.cateList = response.body.data

           
        }, response => {
            // error callback
        });
        
         
	}
}
</script>
<style lang="less">

</style>
