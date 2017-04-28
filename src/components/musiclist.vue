<template>
  <div class="musiclist">
      <table class="table table-hover ">
      <thead>
        <tr>
          <th class="col-xs-2">
          <div class="checkboxs">
          <input type="checkbox" name="" style="top:6px;" >
          <ins style="top:6px;"></ins>
          </div>
          </th>
          <th class="col-xs-5">歌曲</th>
          <th class="col-xs-1">&nbsp</th>
          <th class="col-xs-3">歌手</th>
          <th class="col-xs-1">&nbsp</th>
        </tr>
    </thead>
    <tbody>
    <mylist v-for="(list,index) in musics" :list="list" :index="index" :key="list"></mylist>
    </tbody>
      </table>
  </div>
</template>

<script>

export default {
  name: 'musiclist',
  data(){
    return {
      musics:[],
    }
  },
  components:{
    mylist:{
      template:`
      <tr @mouseover="isshow=true" @mouseout="isshow=false" @click="ischeck=!ischeck">
        <td class="col-xs-2"><div class="checkboxs"><input type="checkbox" name="" :checked="check"><ins ></ins></div></td>
        <td class="col-xs-5">{{list.musicname}}</td>
        <td class="col-xs-1"><span><i  v-show="isshow" @click.stop="play(index)"></i></span></td>
        <td class="col-xs-3">{{list.name}}</td>
        <td class="col-xs-1"><span class="glyphicon glyphicon-trash" @click="delthis(index)"></span></td>
      </tr>`,
      props:['list','index'],
      data(){
        return {isshow:false,ischeck:false}
      },
      methods:{
        play(index){
          var sid,_this=this;
          this.audio = this.$store.state.dom.audio;
          this.$store.commit('setisplay',false);
          this.$store.commit('togglemusic',index);
          this.$store.commit('setismusic');        
          this.$store.state.dom.audio.play();
        },
        delthis(index) {
          this.del = true;
          this.$store.dispatch('delmusic',index);
        },
      },
      computed:{
        check(){
          return this.ischeck?'checked':'';
        }
      }
    }
  },
  mounted(){
   this.musics = this.$store.state.music;
  },
  computed:{
    musics(){
      return this.$store.music;
    },
    audio(){
      return this.$store.state.dom.audio;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.table tr{
  text-align: left;
}
td .glyphicon {
  color: #aaa;
  position: relative;
  margin-top: 2px;
  cursor: pointer;
}
td .glyphicon:hover{
    color: #37c6f1;
    text-shadow: 0 0 3px #c5dfe6;
    font-size: 15px;
}
.table-hover>tbody>tr:hover {
  background-color: #f1f1f1;
}
td span{
  width: 20px;
  height: 20px;
  position: relative;
}
td i{
  background: url(../img/start.png);
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
}
.checkboxs{
  position: relative;
}
.checkboxs input{
  position: relative;
  width: 15px;
  height: 15px;
  display: inline-block;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}
.checkboxs ins{
  content: "";
  width: 14px;
  height: 14px;
  position: absolute;
  left: 0;
  top:2px;
  border: 1px solid #aaa;
  z-index: 2;
  opacity: 1;
}
.checkboxs input:checked + ins{
  background:url('../img/check.png') no-repeat;
  background-position: -1px -2px;
}
table tbody {
    display:block;
    height:350px;
    overflow-y:auto;
}
table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}

::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.2); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #9e9e9e; 
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #9e9e9e; 
}
</style>
