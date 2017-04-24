<template>
  <div class="bottom container">
   <div class="col-xs-3  play">
        <div class="col-xs-4 col-md-push-1">
        <span class="glyphicon glyphicon-step-backward" @click="togglemusic(-1)"></span>
        </div>
        <div class="col-xs-4">
        <span class="glyphicon" :class="{'glyphicon-play':isplay,'glyphicon-stop':!isplay}"@click="play" style="font-size:30px;"></span>
        </div>
        <div class="col-xs-4 col-md-pull-1">
        <span class="glyphicon glyphicon-step-forward" @click="togglemusic(1)"></span>
        </div>
   </div>
   <div class="col-xs-6">
      <transition name="music">
      <div v-show="ismusic">
       <div class="music_txt" >
         <strong style="float:left;font-size:18px;">{{faudio.musicname}}</strong>
         <span style="float:right;font-size:14px;" v-cloak>{{parseInt(this.faudio.currentTime/60) | keep2}}:{{(this.faudio.currentTime%60) | keep2}}/{{changeet(faudio.endtime)}}</span>
       </div> 
       <div class="progress" @click="adjustment" id="play">
        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" 
          aria-valuemin="0" aria-valuemax="100" :style="{width: Percentage+'%',transition: 'width .05s ease'}">
       </div>
       </div>
       </div>
       </transition>
   </div>
   <div class="col-xs-3 play">
     <div class="col-xs-3">
     <a :href="faudio.src"  download><span class="glyphicon glyphicon-download"></span></a>
     </div>
     <div class="col-xs-9">
       <span class="glyphicon glyphicon-volume-up" style="float:left;margin-top:30px;"></span>
       <div class="progress" @click="adjustmentv" style="float:left;width:60%;margin-left:5px;margin-top:40px;" id="voice">
          <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" 
            aria-valuemin="0" aria-valuemax="100" :style="{width: volume+'%'}">
         </div>
        </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data(){
    return {
      end_times:'',
      volume:50,
      faudio:{},
    }
  },
  mounted(){
    this.audio = document.querySelector('audio');
    this.faudio = this.$store.state.audio;
    this.audio.addEventListener('play', () => {
      if(!this.$store.state.setsid){
          this.sid = setInterval(this.timeup,20 );
          this.$store.commit('setsid',this.sid);         
      }
    });
  },
  computed:{
    faudio() {
      return this.$store.state.audio;
    },
    Percentage() {
      return (this.$store.state.audio.currentTime/this.faudio.endtime)*100;
    },
    ismusic(){
      return this.$store.state.ismusic;
    },
    isplay(){
      return this.$store.state.isplay;
    },
  },
  methods:{
    timeup:function () {
     this.$store.commit('setcurrentTime',this.audio.currentTime);
    },
    play:function () {       
      this.$store.commit('setismusic');
      var _this = this;
        if(this.audio.paused){
          this.audio.play();         
        }else{
          this.audio.pause();
          clearInterval(this.$store.state.sid);
          this.$store.commit('setsid','');          
        }
        this.$store.commit('setisplay',this.audio.paused);
    },
    adjustment:function (event) {
      var nowl = $('#play').offset().left;
      var noww = $('#play').width();
      var nowx = (event || window.event).clientX;
      var x = (nowx-nowl)<0?-(nowx-nowl):(nowx-nowl);  
      this.audio.currentTime = this.faudio.endtime*(x/noww);
    },
    adjustmentv:function () {
      var nowl = $('#voice').offset().left;
      var noww = $('#voice').width();
      var nowx = (event || window.event).clientX;
      var x = (nowx-nowl)<0?-(nowx-nowl):(nowx-nowl);
      this.volume = (x/noww)*100;
      this.audio.volume =  this.volume/100;      
    },
    changeet :function (val) {
      if(!val) return '-- : --';
      var min = parseInt(val/60);
      var sec = parseInt(val)%60;
      min = min<10?'0'+min:min;
      sec = sec<10?'0'+sec:sec;
      return min+':'+sec;
    },
    togglemusic:function (index) {
      this.$store.commit('togglemusic',this.$store.state.audio.index+index);
    },
  },
  filters:{
    keep2:function (val) {
      val = parseInt(val);
      if(val<10) return '0'+val;
      else return val;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  z-index: 10;
}
.glyphicon{
  font-size: 25px;
  color: #4793fa;
  cursor: pointer;
  vertical-align: middle;
}
.glyphicon:hover{
  color: #06e;
}
.play >div,.play{
  height: 100%;
  line-height: 80px;
}
.progress{
  height: 5px;
  cursor: pointer;
  margin-top: 5px;
}
.music_txt{
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
}
.music_txt:after{
  content:"";
  display: block;
  clear: both;
}
.music-enter,.music-leave{
  opacity: 0;
  margin-top: -60px;
}
.music-enter-active,.music-leave-active{
  transition: all .6s ease;
}

</style>
