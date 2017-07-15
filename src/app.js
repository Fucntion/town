import Vue from 'vue'
var _ = require('lodash')

import util from './util/util'
Vue.use(util)

Vue.config.productionTip = false

import VueRouter from 'vue-router'

import routes from './routes'




Vue.use(VueRouter)

const router = new VueRouter({
	//  mode: 'history',
	 routes
});


router.beforeEach((to, from, next) => {

	if(to.path == "/login" || to.path == "/register") {
		next();
	}else{
		next();

	}

})

var env = 0;//0线上，1开发
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;


Vue.http.interceptors.push((request, next) => {



    if(request.url.indexOf('nature=')>=0){

        request.url = request.url.substr(7)

    }else{


		var url = 'http://api.town.icloudinn.com'
      
        request.url = url + request.url
        request.headers.set('token', localStorage.getItem("token"))
    	request.headers.set('town', sessionStorage.getItem("town_id")) //后台接口把town_id废弃了
    }


	next((response) => {
		// token存在，但是过期

		if(response.body.code == 404||response.body.code ==20005){
			location.hash = 'login'
		}else if(response.body.code == 405){
			
			location.hash = 'towninfo'
		}
		return response
	});

});




require ('assets/css/app.less')

import App from './App.vue'

// import './filter.js'

import './util/directive.js'


const app = new Vue({
	router,
	el: '#town',
	render: h => h(App)
})
