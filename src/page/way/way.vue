<template>
<div class="wrap">
    <!--<header class="bar":class="{head:ishead}">
		<div class="bar-icon"><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >{{wayInfo.name}}</div>
	</header>-->

    
         <div class="bar bar-clear notfixed" :class="{head:ishead}">
            <img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/>
            <div class="bar-right"><img src="../../assets/img/share.png" class="icon_img icon_left" @click="updateSerivces()"></div>
        </div>
        <slider :List="wayInfo.pic" v-if="wayInfo.pic"></slider>


    <div id="introduction">
        <div class="titles">{{wayInfo.title}}
        </div>
    </div>

    <div class="message">
        <div class="rqm_title"><img src="~assets/img/hotel.png">路线详情:</div>
        <div v-html="wayInfo.content" class="m_content child_colo way_content">
        </div>
    </div>
</div>
</template>

<script>

    import Store from 'store'
    import Slider from 'plugin/slider'
    export default {
        name: 'way',
        data: function () {
            return {
                wayInfo: {},
                ishead:null,
                // 分享
                shares:{}
             
            }
        },
        methods: {

             // 更新分享服务及发布分享
            updateSerivces:function(){

                var self=this
                plus.share.getServices( function(s){
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
            
            init: function () {

                var self = this,
                    wayId = self.$route.params.id

                this.$http.get('/lu/' + wayId).then(response => {

                    self.wayInfo = response.body

                    this.$nextTick(function () {

                        var gallery = mui('.mui-slider')
                        gallery.slider({
                            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                    })


                }, response => {
                    // error callback
                });
            }

        },
        components: {
            slider:Slider
        },
        watch: {

        },
        mounted() {

            var self=this
            self.init()
             
            self.ishead = Store.getters.getvisible;




        }
    }

</script>
<style lang="less">

</style>
