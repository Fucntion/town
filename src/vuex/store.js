import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);


const state = {
   isLoading: {
        show: false,
        text: null
    },
    room:null,
    visible:false


};

const getters = {

    getLoading: function (state) {
        return state.isLoading
    },
    getRoom: function (state) {
        return state.room
    },
    getvisible: function (state) {

         if(navigator.userAgent.indexOf("Html5Plus")>=0){
				
           return state.visible=true
        }else{

           return state.visible=false
        }
    }

}


const mutations = {

    setRoom: function (state,obj) {
        state.room = obj
    },
    openLoading: function (state, text) {
        state.isLoading.show = true,
        state.isLoading.text = text || 'loading'

    },
    closeLoading: function (state) {
        state.isLoading.show = false
    },
   

   

}

export default new Vuex.Store({
    state,
    getters,
    mutations
});
