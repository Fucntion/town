<template>
<div class="wrap">
     <header class="bar" :class="{head:ishead}" >
		<div class="bar-icon"  ><img src="../../assets/img/left.png" class="icon_img icon_left" onclick="javascript:history.go(-1)"/></div>
		<div class="bar-title" >{{townName}}简介</div>
        <div class="bar-right" @click="updateSerivces()"><img src="../../assets/img/share.png" class="icon_img icon_left"></div>
	</header>
    <div class="town_intro marTop" :class="{head:ishead}" v-html="townDesc" id="share_content">   
   </div>
</div>
</template>

<script>

     

export default {
	name:'home',
	data: function() {

		return {
			shares:{},
            ishead:null,
            townList:null,
            townName:null,
            townDesc:null,
            text:"你好你好你好"

		}
	},
	methods: {

            /**
            * 更新分享服务
            */
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
            /**
            * 分享操作
            * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
            * @param {Boolean} bh 是否分享链接
            */
            shareAction:function(sb,bh) {

                var self=this
                console.log( "分享操作：" );
                if(!sb||!sb.s){
                    console.log( "无效的分享服务！" );
                    return;
                }
                // var shareContent = $('#share_content').text()
                // console.log( "分享内容："+shareContent);
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
            /**
            * 发送分享消息
            * @param {JSON} msg
            * @param {plus.share.ShareService} s
            */
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
                // ss=shares['sinaweibo'];
                // ss&&shareBts.push({title:'新浪微博',s:ss});
                // ss=shares['qq'];
                // ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
                // 弹出分享列表
                shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts},function(e){
                    (e.index>0)&&self.shareAction(shareBts[e.index-1],true);
                }):plus.nativeUI.alert('当前环境无法支持分享操作!');
            },
            init:function(){

                var self=this,
                    town_id = this.$route.params.id||sessionStorage.getItem('town_id')

                    if(!town_id){
                        // alert 小镇id不对
                        return
                    }
                 this.$http.get('/town/'+town_id).then(response => {

                    self.townList = response.body.data
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
