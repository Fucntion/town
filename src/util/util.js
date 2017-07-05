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

export default  {
  install: function(Vue) {
    // Do stuff
    Object.defineProperty(Vue.prototype, '$util', { value: util });
  }
}