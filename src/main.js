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
      id:0,
      lyric:[],
      lyrictime:[],
      thislyric:0,
  	},
  	music:[],
  	dom:{},
  	sid:'',
  	ismusic:false,
  	isplay:true,
    active:true,
    errshow:false,
    musictxt:"",
  },
  mutations: {
  	togglemusic(state,index,flag){
  		if(index<0) index=state.music.length-1;
  		if(index>=state.music.length) index = 0;
  		state.audio.name = state.music[index].name;
  		state.audio.musicname = state.music[index].musicname;
  		state.audio.imgsrc = state.music[index].musicImgSrc;
  		state.audio.src = state.music[index].src;
      Vue.axios.get('api/musictxt/'+state.music[index].id).then(res =>{
      let list = res.data,list2=[];
      if(list.indexOf('CDATA[')>=0){
      list = list.split('CDATA[')[1].split(']]><')[0].split('\n');
      for(let i=5;i<list.length;i++){
        let a = list[i];
        a = a.replace('[','').replace(']',':').split(':');
        list[i] = a[0]*60 + parseFloat(a[1])+','+a[2];
      }
      list.splice(0,5);
      $(list).map( (a,b) =>{
        list2[a] = b.split(',')[0]*1;
        list[a]=b.split(',')[1];})
        state.audio.lyrictime = list2;
        state.audio.lyric = list;}else{
          state.audio.lyric = ['没有找到歌词~']
          state.audio.lyrictime = [];
        }         
        })
      state.audio.thislyric = 0;
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
  },
  setmusictxt(state,txt){
    console.log(txt+'dasdadas')
    state.musictxt = txt;
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
