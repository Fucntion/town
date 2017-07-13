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

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$util', { value: util });
  }
}