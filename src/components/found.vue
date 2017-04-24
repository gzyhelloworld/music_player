<template>
  <div class="found">
		<div class="input-group col-xs-8 col-md-offset-1" style="margin-top:0px positon:relative">  
		       <input type="text" class="form-control"  id="keyword">  
		            <span class="input-group-btn">  
		               <button class="btn btn-info btn-search" @click="found">搜索</button>  
		            </span>  
		 </div>
     <div class="flist_box">
        <ul class="list-group" v-if="history">
        <h4 style="text-align:left;">历史搜索记录<span @click="delall">清空历史记录</span></h4>
        <slist v-for="(item,index) in search" :item="item" :index="index" :key="item" v-on:delthis="delthis" v-on:foundthis="found"></slist>
        </ul>
       <flist v-for="item in find" :item="item" :key="item" v-else ></flist>
     </div> 
  </div>
</template>

<script>

export default {
  name: 'found',
  data(){
    return {
      find : [],
      search:[],
      history:true,
    }
  },
  mounted(){
  	this.$store.commit('setactive',false);
    this.find = [];
    localStorage.search =  localStorage.search?localStorage.search:'[]';
    this.search = JSON.parse(localStorage.search);
  },
  methods:{
  	found(key){  
      var keyword = (typeof key == "string")?key:$('#keyword').get(0).value.trim();
      if(!keyword || keyword=='')return;
      var _this = this;
      this.axios.get('/api/search/20/'+keyword)
      .then(res => res.data.data.song.list,()=>{this.$store.commit('seterrshow',true);this.history = true;})
      .then(list => {
        this.find = list;
        $(this.find).map(function(){
          let num = parseInt(this.f.split('|')[4]) || 0;
          this.num = this.f.split('|')[0];
          this.albumName_hilight = this.f.split('|')[5]&&_this.strDecode(this.f.split('|')[5].replace(/amp\;/g, '')).replace(/\;/g, '/') || '未知专辑';          
          this.fsinger = this.fsinger&&_this.strDecode(this.fsinger.replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名';  
          this.fsong = this.fsong&&_this.strDecode(this.fsong.replace(/amp\;/g, '')).replace(/\;/g, '/') || '未知曲目';      
          this.f = (num==0?'http://imgcache.qq.com/music/photo/album_300/23/300_albumpic_8623_0.jpg':'http://imgcache.qq.com/music/photo/album_300/'+num%100+'/300_albumpic_'+num+'_0.jpg');
        });
      });     
       this.search.unshift(keyword);
       localStorage.search = JSON.stringify(this.search);
       this.history = false;
    },
    strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
    delthis(index){
      this.search.splice(index,1);
      localStorage.search = JSON.stringify(this.search);
    },
    delall(){
      this.search = [];
      localStorage.search = '[]';
    },
  },
  components:{
    flist : {
      template :`
      <div class="flist" @click="playthis">
        <img :src="item.f" class="img-responsive"  width="60" height="60" style="float:left;margin: 5px;">
        <dl>
            <dt>{{item.fsong}}</dt>
            <dd>{{item.fsinger}} - {{item.albumName_hilight}}</dd>
        </dl>
      </div>
      `,
      props:['item'],
      methods:{
        playthis(){
          this.$store.dispatch('addmusic',{
          "name": this.item.fsinger,
          "musicname": this.item.fsong,
          "src":'http://ws.stream.qqmusic.qq.com/'+this.item.num+'.m4a?fromtag=46',
          "musicImgSrc": this.item.f            
          });
          this.$store.state.dom.audio.play();
        },
      },
    },
    slist :{
      template :`
      <li class="list-group-item" @click="foundthis(item)">
      <span class="glyphicon glyphicon-remove thisspan" @click.stop="delthis(index)"></span>
      {{item}}
      </li>
      `,
      props:['item','index'],
      methods:{
        delthis(index){
          this.$emit('delthis',index);
        },
        foundthis(keyword){
          this.$emit('foundthis',keyword);
        }
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.found:before{
	content: "";
	display: block;
	clear: both;
}
.input-group-btn:last-child>.btn{
  outline: none;
}
.flist:after{
  content: "";
  display: block;
  clear: both;
}
.flist dl{
  padding-top: 5px;
  margin-bottom: 0;
}
.flist dd,.flist dt{
  text-align: left;
  text-indent: 10px;
  line-height: 30px;
  height: 30px;
  overflow: hidden;
}
.flist_box{
  margin-top: 20px; 
  padding: 10px 0;
  height: 360px;
  overflow: auto;
}
.flist:hover{
  background: #f1f1f1;
}
.btn-info:focus{
  border-color: #46b8da;
}
.thisspan{
    float: right;
    font-size: 18px;
    cursor: pointer;
}
.flist_box .list-group-item{
  text-align: left;
}
.list-group h4 span{
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
  position: relative;
  color: #aaa;
  cursor: pointer;
}
.list-group h4 span:hover{
  text-decoration: underline;
}
</style>
