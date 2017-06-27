<template>
 <div id="slider" class="mui-slider ware_imgs">
    <div class="mui-slider-group mui-slider-loop">

        <div class="mui-slider-item mui-slider-item-duplicate">
            <div class="mask"></div>
            <a href="javascript:;">
                <img :src="'http://api.town.icloudinn.com/uploads/'+first.url">
            </a>
        </div>


        <div v-for="item in List" class="mui-slider-item">
            <div class="mask"></div>
            <a href="javascript:;">
                <img  :src="'http://api.town.icloudinn.com/uploads/'+item.url">
            </a>
        </div>


        <div class="mui-slider-item mui-slider-item-duplicate">
            <div class="mask"></div>
            <a href="javascript:;">
                <img :src="'http://api.town.icloudinn.com/uploads/'+last.url">
            </a>
        </div>
    </div>
    <div class="mui-slider-indicator">
        <div class="mui-indicator mui-active"></div>
        <div class="mui-indicator"></div>
        <div class="mui-indicator"></div>
        <div class="mui-indicator"></div>
    </div>
</div>
</template>
<script>
export default {
		name: 'slider',
        props:{
            List:{
                type: Array,
                required: true
            }
        },
		data() {

			return {
                visibility:false
			}

		},
        computed:{
            first:function(){
                var self = this
                return self.List[0]
            },
            last:function(){
                var self = this,
                    len = self.List.length-1
                return self.List[len]
            }
        },
		components: {

		},
		methods:{
            show:function(){
                this.visibility =true
            },
            hide:function(){
                this.visibility =false
            }
		},
		mounted() {
          this.show() 
		}
	}
</script>
<style lang="less">

</style>