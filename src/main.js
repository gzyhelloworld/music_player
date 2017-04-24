// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
  	audio:{
  		name:'',
  		musicname:'',		
  		imgsrc:'',
  		src:'',
  		index:0,
  		endtime:'',
  		currentTime:'',
  	},
  	music:[],
  	dom:{},
  	sid:'',
  	ismusic:false,
  	isplay:true,
    active:true,
    errshow:false,
  },
  mutations: {
  	togglemusic(state,index,flag){
  		if(index<0) index=state.music.length-1;
  		if(index>=state.music.length) index = 0;
  		state.audio.name = state.music[index].name;
  		state.audio.musicname = state.music[index].musicname;
  		state.audio.imgsrc = state.music[index].musicImgSrc;
  		state.audio.src = state.music[index].src;
  		state.audio.index = index;
  		state.audio.currentTime = 0;
  		state.dom.audio.src = state.audio.src;
  		state.dom.audio.oncanplaythrough = function () {
        state.audio.endtime = state.dom.audio.duration;
    	}
      if(state.isplay) {state.dom.audio.autoplay = '';}
      else{state.dom.audio.autoplay = 'autoplay';}
  	},
  	createmusic(state,music){
  		state.music = music;
  	},
  	setdom(state,dom){
  		state.dom = dom;
 	},
 	setsid(state,index){
 		state.sid = index;
 	},
 	setcurrentTime(state,index){
 		state.audio.currentTime = index;
 	},
 	setismusic(state){
 		state.ismusic = true;
 	},
 	setisplay(state,flag){
 		state.isplay = flag;
 	},
  setactive(state,flag){
    state.active = flag;
  },
  seterrshow(state,flag){
    state.errshow = flag;
  }
  },
  actions:{
  delmusic({commit,state},index){
    if(index==state.audio.index){
      state.music.splice(index,1);
      commit('togglemusic',index);
    }else
    if(index<state.audio.index){
      state.music.splice(index,1);
      state.audio.index--;
    }else{
      state.music.splice(index,1);
    }
    localStorage.music = JSON.stringify(state.music);
  },
  addmusic({commit,state},music){
    state.music.unshift(music);
    localStorage.music = JSON.stringify(state.music);
    state.isplay = false;
    state.ismusic = true;
    commit('togglemusic',0);
  }
  }
});
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
