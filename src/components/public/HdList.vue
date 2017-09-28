<template>
 <div>
  <ul class="list">
    <li v-for="(item, i) in items" >
      <img class="poster" :src="item.poster|fposter('HD')"/>
      <div :class="icoCss(item.tag)"></div>
      <div class="title">{{(item.name||item.secondname)|fstr(6)}}</div>
      <div class="focus" v-if="focus&&index==i">
        <div class="fdesc">{{item.short_desc|fstr(16) }}</div>
        <div class="fprice">{{item.price}}元</div>
      </div>
    </li>

  </ul>
   <div class="qrcode"></div>
   <div class="page">
      <img src="../../assets/img/hd/upicon.png" />
      <div class="pnum">{{page}}</div>
     <img src="../../assets/img/hd/nexticon.png" />
   </div>
 </div>
</template>

<script>

import Service from '../../service'

export default {

    props:['focus','lindex','lpage','menu','loadEve'],
    data(){
      return {items:[],index:0,page:1,totalPage:1,isInit:true,pageSize:12,isInit:true}
    },

    mounted(){
      this.index=Number(this.lindex||0);
      this.page=Number(this.lpage||1);
      this.isInit=true;

      console.log("hdList.vue................mounted",this.$route.path,this.menu.name);
      //this.load();

    },

    watch:{
      loadEve(){
        console.log("hdList.vue................loadEve",this.$route.path,this.menu.name);
        this.load();
      },

      index(n,o){
        this.cb();
      }
    },
    methods: {
      load(){
        var _sid=this.$route.query.sid;
        var _uri=this.menu.type;
        var _id=this.menu.id;

        if(_sid&&_sid!=""){
          _uri=null;
          _id=_sid;
        }
        if(_id) {
          //console.log("hdlist.vue>load,",_id)
          Service.videoList(_uri, {categoryId:_id , pageSize: this.pageSize, pageNum: this.page},
            (s, v) => {
              this.isInit = false;
              if (s == "success") {
                var _f = this.items;
                if (_f.length != 0) {
                  _f.splice(0, _f.length);
                }
                var _d = v.response;
                _d.forEach(function (_v) {
                  _f.push(_v);
                })

                this.totalPage = Number(v.pageInfo.totalPage);
                this.cb();

              }
            });
        }

      },
      icoCss(t){

        var r={ico:true} ;
        if(t&&t!=""){
            r[t]=true;
        }
        return r;
      },
      cb(){
        if(this.items.length>0){
          this.$emit("cb",this.index,this.page,this.items[this.index],this.pageSize);
        }
      },
      left(){
        this.index=(this.index>0?--this.index:this.items.length-1);
      },
      right(){
        this.index=(this.index<this.items.length-1?++this.index:0);
      },
      up(){
        if(this.index<6){
          this.$emit("switch",KEY.UP,"list");

        }else if(this.index-6>=0){
            this.index-=6;
        }else if(this.index-6<0&&this.page>1){
            this.pageUp();
        }

      },
      down(){
        if(this.index+6<=this.items.length-1){
          this.index+=6;
        }else if(this.index+6>this.items.length-1&&this.page<this.totalPage){
          this.pageDown();
        }
      },
      pageUp(){
        if(this.page>1){
         this.page--;
         this.index=0;
         this.load();
        }
      },
      pageDown(){
       if(this.page<this.totalPage){
        this.page++;
         this.index=0;
         this.load();
       }
      }



    },
    computed:{
      mleft:function () {
        return{left:this.focus};
      },
      mright:function () {
        return{right:this.focus};
      }
    }
  }
</script>

<style scoped>


  .list  {
    position: absolute;
    left: 75px;
    top: 110px;
    width: 1160px;
    height: 580px;
    font-size: 23px;
    font-weight: bold;
    text-align:center;
    display: flex;
    flex-wrap: wrap;
  }
  .list  li {
    width: 181px;
    height: 290px;
    margin-right:10px;
    position: relative;
  }
  .poster{
     width:180px;
     height: 240px;
  }

  .ico{
    position: absolute;
    left:2px;
    top:0px;
    width:53px;
    height: 54px;
  }
  .hot{
    background: url("../../assets/img/hd/icoHot.png") no-repeat;
  }
  .new{
    background: url("../../assets/img/hd/icoNew.png") no-repeat;
  }
  .free{
    background: url("../../assets/img/hd/icoFree.png") no-repeat;
  }
  .title{
    line-height:40px;
    overflow: hidden;
  }
  .qrcode{
    position:absolute; left:1120px; top:540px;
    width:74px;
    height:90px;
    background:url('../../assets/img/hd/twoCode.png') no-repeat;
  }
  .page{
    position:absolute;left:1210px;top:305px;width:45px;height:13px;
    text-align: center;
  }
  .pnum{
   height:80px;
   line-height: 80px;
  }
  .focus{
    position: absolute;
    left:0px;
    top:0px;
    width: 181px;
    height: 240px;
    color:#fff;
    z-index:1;
    background:url(../../assets/img/hd/movie_4star.png) no-repeat;
  }
  .fdesc{
    margin-top:110px;margin-left:10px;width:160px;height:60px; font-size:20px;
  }
  .fprice{
    margin-top:20px; font-size:24px;color: #999 ;
  }

</style>
