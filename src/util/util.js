//检查一变量是否每个属性都有值
var util = {}

util.isEnvironment = function(){

    var ua= navigator.userAgent.toLowerCase();

    if(ua.indexOf("micromessenger")>=0) {

        return 'wechat'

    }else if(ua.indexOf('html5plus')>=0) {

        return 'plus'

    }else{

        return 'web'

    }

}

util.istop = function(){
				
    var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if(ms && ms.length>=3){
        // alert(parseFloat(ms[2]))
        return  parseFloat(ms[2]);// 获取状态栏的高度

    }else{

        return 0
    }
}


util.getRandomArrayElements=function (arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

util.swiperTop = function(){

    // 底部
    var availHeight =  window.screen.availHeight-54,
        availWidth = window.screen.availWidth,
        boxwidth = availWidth*0.71,
        boxheight = boxwidth*1.72+18;
        // console.log(boxheight)
        return availHeight/2-boxheight/2
}


 // 更新分享服务及发布分享
util.updateSerivces=function(){
    return false;//微信审核不通过
    var self=this,shares={};
    plus.share.getServices( function(s){
        console.log(s)
        for(var i in s){
            var t=s[i];
            shares[t.id]=t;
        }
        self.shareShow(shares)
    }, function(e){
        console.log( "获取分享服务列表失败："+e.message );
    } );
}

// 分享操作
util.shareAction=function(sb,bh) {

    var self=this
    
    if(!sb||!sb.s){
        console.log( "无效的分享服务！" );
        return;
    }

    var msg={extra:{scene:sb.x}};
    if(bh){
        msg.href="http://town.icloudinn.com";
        msg.title="海南乡村游，你想要的都在这里了。";
        msg.content="小镇演义，为全域旅游而生，带您游览海南所有特色小镇。海南各特色小镇的美食、民宿、精品游玩一日游线路均在于此，更有精彩户外活动等你来参加。";
        msg.thumbs=['http://town.icloudinn.com/xzyy.jpg']
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
            alert( "认证授权失败："+e.code+" - "+e.message );
        });
    }
}

// 发送分享消息

util.shareMessage=function(msg,s){
   
    s.send( msg, function(){
        console.log( "分享到\""+s.description+"\"成功！ " );
         alert( "分享到\""+s.description+"\"成功！ " );
    }, function(e){
        console.log( "分享到\""+s.description+"\"失败: "+JSON.stringify(e) );
        alert( "分享到\""+s.description+"\"失败: "+JSON.stringify(e) );
    } );
}

// 打开分享
util.shareShow=function(shares){

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
}


util.checkPhone=function(phone){ 
    var phone = parseInt(phone)

    if(!(/^1[34578]\d{9}$/.test(phone))&&!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 

        

       return false; 

    }else{
        return true
    } 

    
}

// @click="$util.toBack()"
// 为了兼容有的页面没有底部菜单，或者分享出去后没有history导致无法返回上一页，可以初始化的时候显式调用本函数，添加首页到history中
util.toBack = function(){
    
    if(history.length==0){
        location.hash = ''//返回首页
       
    }else{
         history.go(-1)
    }
    

}



export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$util', { value: util });
  }
}