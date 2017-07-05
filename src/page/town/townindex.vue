<template>
<div class="wrap" v-if="townInfo" >
	<div id="banner">
		   
		<div class="bar">
			<img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/>
			<div class="bar-right"><img src="../../assets/img/share.png" class="icon_img icon_left" @click="updateSerivces()"></div>
		</div>
		<img :src="'http://api.town.icloudinn.com/uploads/'+townInfo.town_thumb" />
			
	</div>
	<div class="town_index">
		<div  class="block info_item">
			<div  class="info_title">
				简介
			</div>
            <div v-html="townInfo.town_desc" class="box info_box">

            </div>
		</div>
		<div class="block info_item" v-if="sceneList.length>0">
			<div  class="info_title">
				自然风光
			</div>
            
            <div class="box">
                <a class="item" v-for="(scene,index) in sceneList"  :href="'/#/scene/'+scene.scene_id" >
                    <div class="thumb" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + scene.scene_thumb + ')'}"></div>

                    <p>{{scene.scene_name}}</p>
                </a>
            </div>
		</div>
		<div class="block info_item" v-if="cateList.length>0">
			<div  class="info_title">
				美食
			</div>
            
            <div class="box">
 <a class="item" v-for="(cate,index) in cateList"   :href="'/#/cate/'+cate.cate_id" >
               <!--{{cate.thumb[0].url}}-->
                <div class="thumb" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + cate.thumb[0].url + ')'}"></div>

                    <p> {{cate.name}}</p>
                </a>

            </div>
		</div>
        <div class="block info_item" v-if="wareList.length>0">
			<div  class="info_title">
				手礼
			</div>
            
            <div class="box">
<a class="item" v-for="(ware,index) in wareList" :href="'/#/ware/'+ware.goods_id" >

    <div class="thumb" :style="{backgroundImage: 'url('+'http://api.town.icloudinn.com/uploads/' + ware.thumb + ')'}"></div>

                    <p> {{ware.name}}</p>
                
                </a>
            </div>
		</div>
	</div>
    <div class="weui-btn-area">
        <div class="weui-btn weui-btn_primary" @click="totowninfo()">进入小镇</div>
    </div>
</div>
</template>
<script>

	import Store from 'store'
	export default {
		name: 'townindex',
		data: function () {

			return {
				townInfo:null,
				ishead:null,
				shares:{},
                desc:null,
                sceneList:[],
                cateList:[],
                wareList:[]
			}
		},
		computed: {

		},
		methods: {

			
            // 更新分享服务及发布分享
           
            updateSerivces:function(){

                var self=this
                plus.share.getServices( function(s){
                    // self.shares={};
                    for(var i in s){
                        var t=s[i];
                        self.shares[t.id]=t;
                        console.log(t.id)
                    }
                    self.shareShow(self.shares)
                }, function(e){
                    console.log( "获取分享服务列表失败："+e.message );
                } );
            },
            
           // 分享操作

            shareAction:function(sb,bh) {

                var self=this
                console.log( "分享操作：" );
                if(!sb||!sb.s){
                    console.log( "无效的分享服务！" );
                    return;
                }
    
                var msg={extra:{scene:sb.x}};
                if(bh){
                    msg.href="http://town.icloudinn.com/load.html";
                    msg.title="海南乡村游，你想要的都在这里了。";
                    msg.content="海南乡村游，你想要的都在这里了。";  
                }
                // 发送分享
                if ( sb.s.authenticated ) {
                    console.log( "---已授权---" );
                    self.shareMessage(msg,sb.s);
                } else {
                    console.log( "---未授权---" );
                    sb.s.authorize( function(){
                            self.shareMessage(msg,sb.s);
                        },function(e){
                        console.log( "认证授权失败："+e.code+" - "+e.message );
                    });
                }
            },
            
            // 发送分享消息
            
            shareMessage:function(msg,s){
                console.log(JSON.stringify(msg));
                s.send( msg, function(){
                    console.log( "分享到\""+s.description+"\"成功！ " );
                }, function(e){
                    console.log( "分享到\""+s.description+"\"失败: "+JSON.stringify(e) );
                } );
            },
            // 打开分享
            shareShow:function(shares){

                var self = this
                var shareBts=[];
                // 更新分享列表
                var ss=shares['weixin'];
                if(navigator.userAgent.indexOf('qihoo')<0){  //在360流应用中微信不支持分享图片
                    ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
                    shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
                }
                // 弹出分享列表
                shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts},function(e){
                    (e.index>0)&&self.shareAction(shareBts[e.index-1],true);
                }):plus.nativeUI.alert('当前环境无法支持分享操作!');
            },
			totowninfo:function(){
                this.$router.push('/towninfo')
            },
			init:function(){

				var self = this,
                townId = self.$route.params.id

                this.$http.get('/town/' + townId ).then(response => {


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


			}

			
		},
		components: {


		},
		watch: {

		},
		mounted() {

			var self=this
            self.$nextTick(function () {

				var gallery = mui('.mui-slider')
				gallery.slider({
					interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			})
			self.init()
			self.ishead = Store.getters.getvisible;

		}
	}

</script>
<style lang="less">

</style>
