<template>
  <div id="app">
  <audio src="" id='audio'></audio>
  <top></top>
  <div class="container mlist">
  <div class="col-xs-6 .col-md-offset-3 apphtml container">
    <ul class="nav navbar-nav blete-menu-wrapper" style="margin-bottom:30px;">
      <li :class="{active:active}" @click="change(true)">
          <router-link to="/">Home</router-link>
      </li>
      <li :class="{active:!active}" @click="change(false)">
          <router-link to="/found">Found</router-link>
      </li>
    </ul>
  <router-view></router-view>
  </div>
  </div>
  <div class="err" v-show="errshow"></div>
  <div class="panel panel-danger errbox" v-show="errshow">
    <div class="panel-heading">
      <h3 class="panel-title">警告</h3>
      <span class="glyphicon glyphicon-remove errspan" @click="hidden"></span>
    </div>
    <div class="panel-body">
      出现一些错误，请检查网络问题！ 
    </div>
  </div>
  <bottom></bottom>  
  </div>
</template>

<script>
import top from './components/top'
import bottom from './components/bottom'
import MusicData from './music-date'

export default {
  name: 'app',
  components: {
    top,
    bottom
  },
  beforeCreate(){
    localStorage.music = localStorage.music?localStorage.music:'[]';
    if(localStorage.music!='[]'){
      this.$store.commit('createmusic',JSON.parse(localStorage.music));
    }else{
      this.$store.commit('createmusic',Object.assign([], MusicData).musicData);
    }  
  },
  mounted(){
    this.$store.commit('setdom', {audio:document.getElementById('audio')});
    this.$store.commit('togglemusic', 0);
    this.$store.state.dom.audio.addEventListener('ended', () => { this.$store.commit('togglemusic', this.$store.state.audio.index+1);this.$store.state.dom.audio.autoplay = 'autoplay';});
    this.$store.state.dom.audio.addEventListener('error', () => {this.$store.commit('seterrshow',true);this.$store.commit('setisplay',true);});
    // this.axios.get('api/musictxt/'+101369814).then(res =>{ console.log(res);console.log('a')});
  },
  computed:{
    active(){
      return this.$store.state.active;
    },
    errshow(){
      return this.$store.state.errshow;
    }
  },
  methods:{
    change:function(flag){
      this.$store.commit('setactive',flag);
    },
    hidden(){
      this.$store.commit('seterrshow',false);
    }
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 80px;
}
.mlist{
  margin-top: 30px; 
}
.active{
  box-shadow:  0px 3px 0px #4793fa ;
}
.nav>li>a:hover{
  background-color: #fff;
  text-shadow: 0px 1px 0px #4793fa;
}
.apphtml .nav>li,.apphtml .nav>li>a{
  background-color: #fff;
}
.errbox{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-70%);
  width: 300px;
  text-align: left;
  z-index: 21;
}
.errspan{
    position: absolute;
    top: 10px;
    right: 7px;
    font-size: 18px;
    cursor: pointer;
}
.err{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  opacity: .2;
  background-color:#f1f1f1;
  z-index:20; 
}
</style>
