<template>
  <div>
    <ul class="list">
      <li v-for="(item, i) in items" >
        <img class="poster" :src="item.poster|fposter('HD')"/>
        <div class="title">{{item.name|fstr(15) }}</div>
        <div class="focus" v-if="focus&&index==i">
          <div class="fdesc">{{item.name|fstr(15) }}</div>
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
      return {
        items:[],//测试
        index:0,
        page:1,
        isInit:true,
        totalPage:1,
        pageSize:6,
        reback:false,
      }
    },
    mounted(){

      this.index=Number(this.lindex||0);
      this.page=Number(this.lpage||1);
      console.log("hdList6.vue................mounted",this.$route.path,this.menu.name);
      //this.load();

    } ,

    watch:{
      loadEve(){
        console.log("hdList.vue................loadEve",this.$route.path);
        this.load();
      },
     /* menu(n,o){
        console.log("hdList6.vue................menu-change",this.$route.path,this.menu.name);
        if(!this.isInit){
          this.index=0;
          this.page=1;
          this.isInit=false;
        }
        console.log("hdlist6.vue menu-watch",this.menu)
        switch (this.menu.column){
          case"jp":
            this.load();
            break
        }

      },
      "$route"(o,n){
        console.log("hdList6.vue................$route",this.$route.path,this.menu.name);
        if(this.reback){

           this.load();
           this.reback=false;
        }
      },

      kback(){
        this.reback=true;
      },*/
      index(n,o){
        this.cb();
      }
    },
    methods: {
      load(){
        if(this.menu&&this.menu.id) {
        Service.videoList(this.menu.type,{categoryId: this.menu.id, pageSize:this.pageSize, pageNum: this.page},
          (s,v)=>{
            this.isInit = false;
            if (s == "success") {
              var _f= this.items;
              if(_f.length!=0){
                _f.splice(0,_f.length);
              }
              var _d=v.response;
              _d.forEach(function (_v) {
                _f.push(_v);
              })
              this.totalPage=Number(v.pageInfo.totalPage);
              this.cb();
            }
          });
       }

      },
      cb(){
        if(this.items.length>0){
          this.$emit("cb",this.index,this.page,this.items[this.index],this.pageSize);
        }
      },
      left(){
        this.index=(this.index > 0 ? --this.index : this.items.length-1);
      },
      right(){
        this.index=(this.index < this.items.length-1 ? ++this.index : 0);
      },
      up(){


        if(this.index<3){
         this.$emit("switch",KEY.UP,"jp")
        }else if(this.index >= 3){
          this.index -= 3;
        }else if(this.index-3 < 0 && this.page > 1){
          this.pageUp();
        }
      },
      down(){
        if(this.index+3<=this.items.length-1){
          this.index+=3;
        }else{
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
      },


    },

  }
</script>

<style scoped>

  .list  {
    position: absolute;
    left: 75px;
    top: 130px;
    width: 1160px;
    height: 580px;
    font-size: 23px;
    font-weight: bold;
    text-align:center;
    display: flex;
    flex-wrap:wrap;
  }
  .list  li {
    width: 345px;
    height: 200px;
    margin-right: 40px;
    position: relative;
  }

  .poster{
    width:100%;
    height: 100%;
  }
  .title{
    line-height:40px;
    overflow: hidden;
  }

  .qrcode{
    position:absolute; left:1110px; top:510px;
    width:74px;
    height:90px;
    background:url('../../assets/img/hd/twoCode.png') no-repeat;
  }

  .focus{
    position: absolute;
    left:0;
    top:0;
    width: 345px;
    height: 200px;
    color:#fff;
    z-index:1;
    background-color:#395582;
    opacity:0.9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fdesc{

    font-size:35px;
  }

  .page{
    position:absolute;left:1210px;top:305px;width:45px;height:13px;
    text-align: center;
  }
  .pnum{
    height:80px;
    line-height: 80px;
  }
</style>

