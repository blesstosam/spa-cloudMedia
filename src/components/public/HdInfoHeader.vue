<template>
  <div>
    <div :class="infoCss">
      <div class="vleft">
        <img class="poster" :src="info.poster|fposter('HD_BIG') "/>
        <div v-if="ftype!='arts'">定价：{{info.price}}元</div>
      </div>
      <div class="right">

          <div class="name">
            <div class="cell7">{{info.name | fstr(12)}}&nbsp;&nbsp;{{info.year}}</div>
            <div class="cell3">{{info.duration}}分钟</div>
          </div>
          <div>
            <div class="cell7">导演：{{info.director | fstr(15)}}</div>
            <div class="cell3">类型：{{info.genre | fgenres | fstr(5)}}</div>
          </div>
          <div>
            <div class="cell7">演员：{{info.actor | fstr(12)}}</div>
            <div class="cell3">地区：{{info.country_of_origin | fregion}}</div>
          </div>

        <div>下片时间：{{info.downtime | isNull}}</div>
        <div>简介：{{info.short_desc | fstr(45)}}</div>
        <div :class="leftBtn"></div>
        <div :class="rightBtn"></div>
      </div>
      <div class="qrcode"></div>
    </div>
    <div class="qtip" v-if="ftype!='arts'">相关推荐</div>
    <div :class="hrCss"></div>
  </div>
</template>

<script>
  //电视剧 剧集
  import  Service from '../../service'
  export default {
    props: ['eaction', 'id', 'index'],

    mounted(){
      //566542_11333155
      this.load();
    },
    data(){
      return {hindex: 0,  info: {}}
    },
    watch:{
       id(){
         this.load();
       },
      eaction(n,o){
        if(n=="btn"){
          this.cb();
        }
      }
    },
    filters: {

      isNull(v){
        return v || "暂无"
      }
    },

    methods: {
      load(){
        Service.videoInfo({id: this.id}, (s, v) => {
          if (s == "success") {
              if(v.response.length!=0){
                  this.info = v.response[0];
                  this.cb();
              }
          }
        });


      },
      cb(){
        this.$emit("cb",  this.hindex,this.info);
      },
      left(){
        this.hindex=0;
        this.$emit("cb",  this.hindex);
      },
      right(){
        this.hindex=1;
        this.$emit("cb",  this.hindex);
      },
      down(){
        var _t="btn" ;
        if(this.$route.path.indexOf("arts")!=-1){
          _t="arts";
        }
        this.$emit("switch",KEY.DOWN,_t)
      },
      enter(){
          var _f="btn";
          if(this.hindex==0){

            _f=this.ftype=="tv"?"btn":"vod";
          }else{
            _f="collect";
          }
        this.$emit("switch",KEY.ENTER,_f)
      }

    },

    computed: {
      infoCss(){
        return {'info': true, "info-arts": this.ftype == 'arts'}
      },
      hrCss(){
        return {'hr': true, "hr-arts": this.ftype == 'arts'}
      },
      focus(){
         var _t="other";
         if(this.eaction=="btn"){
            _t=this.hindex==0?"left":"right";
         }
         return _t;
      },
      ftype(){
        var _f = "movie"
        switch (this.info.category_type) {
          case "0":
            _f = "movie"
            break
          case "1":
            _f = "tv";
            break
          default:
            _f = "arts";
            break
        }
        if(this.$route.path.indexOf("arts")!=-1){
          _f = "arts";
        }

        return _f;
      },

      leftBtn() {
        var v = {"btn": true};
        switch (this.focus) {
          case "left":
            if (this.ftype == "tv") {
              v["tv_btn_f"] = true;
            } else {
              v["play_btn_f"] = true;
            }
            break
          default :
            if (this.ftype == "tv") {
              v["tv_btn"] = true;
            } else {
              v["play_btn"] = true;
            }
            break
        }

        return v;
      },
      rightBtn(){
        var v = {"btn": true};
        switch (this.focus) {
          case "right":
            v["collect_btn_f"] = true;
            break
          default :
            v["collect_btn"] = true;
            break
        }
        return v;
      }


    }
  }
</script>
<style scoped>
    *{
        -webkit-transition-duration: 0ms;
        transition-duration:0ms;
    }
  .info {
    color: #999;
    text-align: center;
    font-size: 24px;
    position: absolute;
    left: 100px;
    top: 85px;


  }
  .info-arts{
    top: 45px;
  }

  .vleft {
    float: left;
    width: 240px;
    height: 340px;
  }

  .poster {
    width: 240px;
    height: 340px;
  }

  .price {

  }

  .right {
    text-align: left;
    margin-left: 300px;

    width: 780px;
    font-size: 28px;
    font-weight: bold;

  }

  .name {
    color: #FABD00;
    width: 100%;
  }

  .cell7 {
    width: 60%;
    float: left;
  }

  .cell3 {
    width: 40%;
    text-align: right;
    float: left;
  }

  .qrcode {
    position: absolute;
    left: 1000px;
    top: 240px;
    width: 74px;
    text-align: right;
    height: 90px;

    background: url(../../assets/img/hd/twoCode.png) no-repeat;
  }

  .qtip {
    position: absolute;
    left: 1020px;
    top: 450px;
    width: 156px;
    text-align: right;
    height: 36px;
    font-weight: bold;
    color: #cccccc;
    font-size: 28px;
  }

  .hr {
    position: absolute;
    left: 0px;
    top: 485px;
    width: 1241px;
    text-align: right;
    height: 3px;
    background: url(../../assets/img/hd/hr.png) no-repeat;
  }

  .hr-arts {
    top: 420px;
  }

  .btn {
    margin-top: 55px;
    margin-right: 50px;
    float: left;
    width: 156px;
    height: 65px;
  }

  .tv_btn {
    background: url(../../assets/img/hd/select.png) no-repeat;
  }

  .tv_btn_f {
    background: url(../../assets/img/hd/selectfocus.png) no-repeat;
  }

  .collect_btn {
    background: url(../../assets/img/hd/collect.png) no-repeat;
  }

  .collect_btn_f {
    background: url(../../assets/img/hd/collectfocus.png) no-repeat;
  }

  .play_btn_f {
    background: url(../../assets/img/hd/playFocus.png) no-repeat;
  }

  .play_btn {
    background: url(../../assets/img/hd/play.png) no-repeat;
  }


</style>
