<template>
  <div class="epi">
    <div class="vleft">
      <img class="poster" :src="info.poster|fposter "/>
      <div class="right">
        <div class="desc" v-html="infoDesc"></div>
        <div class="tip">第{{page}}页/共{{totalPage}}页</div>
      </div>
    </div>
    <ul id="list" class="list">
      <li v-for="(item, i) in items" :class="item.movassetid|beenPlayed(remember)">
        {{item.chapter}}
      </li>
    </ul>

    <div id="list_f" class="list_f" v-show="focus" v-bind:style="cfocus">{{cfval}}</div>
  </div>
</template>

<script>
  //电视剧 剧集
  import {EPISODE,INFO,EPISODE_REMEMBER_LIST} from '../../store/mutation-types';
  import Service from '../../service';
  export default {

    props: [  'cid', 'rpage', 'rinx','focus'],
    created(){

    },
    data(){
      return {info: {}, page: 1, totalPage: 1, items: [], index: 0 ,remember:[],categoryId:'',maxEpi:0}
    },
    mounted(){
      this.categoryId=this.cid.substr(0,this.cid.indexOf('_'));
      this.index = Number(this.rinx || 0);
      this.page = Number(this.rpage || 1);
      this.loadInfo();
      this.loadEpi();
      this.loadRem();
    },
    filters:{
        beenPlayed(val,remember){
          if(val&&remember.length!=0){
              if(remember.indexOf(val)!=-1){
                  return {colorGreen:true};
              }
          }else{
              return '';
          }
        }
    },
    watch:{
        index(){
          this.cb();
        },
        cid(){
          console.log("episode.vue  cid  watch.................")

          this.page=1;
          this.index=0;
          this.loadInfo();
          this.loadEpi();

          this.categoryId=this.cid.substr(0,this.cid.indexOf('_'));
          this.loadRem();
        }
    },
    methods: {
      loadRem(){
        var _vue=this;
        var _stbNo=this.statusInfo.stbId || '99616612190002281';
        Service.req(EPISODE_REMEMBER_LIST,{stbNo:_stbNo,categoryId:_vue.categoryId},
          function (s,v) {
            if(s=='success'){
              _vue.remember=v.assetId.split(',');
            }else if(s=='error'){
                console.log('error:',v)
            }
        })
      },
      loadInfo(){
        var _vue = this;
        Service.req(INFO,{id:this.cid},function (s,v) {
            _vue.isInit = false;
            if (s == "success") {
                _vue.info=v.response[0];
            }else if(s=='error'){
                console.log('error:',v);
            }
        });
      },
      loadEpi(){
        var _vue = this;
        Service.req(EPISODE,{id:this.cid, pageSize: 30, pageNum: this.page},
          function (s,v) {
            _vue.isInit = false;
            if (s == "success") {
                var _f = _vue.items;
                _f.splice(0, _f.length);
                _vue.maxEpi=0;

                var _v = v.response;
                _v.forEach(function (_e) {
                    _f.push(_e);
                });
                _vue.totalPage = Number(v.pageInfo.totalPage);
                //console.log(v.pageInfo.totalNum)
                _vue.maxEpi=Number(v.pageInfo.totalNum);
                _vue.cb();
            }else if(s=='error'){
                console.log('error:',v);
            }
        });
      },
      up:function () {

        if(this.index - 10 < 0 && this.page > 1) {
          this.pageUp();
        } else if (this.index - 10 >= 0) {
          this.index-=10;
        }
      },
      down:function () {
        if (this.index + 11 > this.items.length) {
          if (this.page < this.totalPage) {
            this.pageDown();
          } else {
            this.page = 1;
            this.index=0;
            this.loadEpi();
          }
        } else {
          this.index+=10;
        }
      },
      left(){
        this.index=this.index>0?--this.index:this.items.length-1;
      },
      right(){

        this.index=this.index<this.items.length-1?++this.index:0;
      },
      pageDown() {

        if(this.page < this.totalPage){
          this.page++;
          this.index=0;
          this.loadEpi();
        }
      },
      pageUp(){

        if(this.page >1){

          this.page--;
          this.index=0;
          this.loadEpi();
        }
      },
      cb(){

          if(this.items.length>0){
             var _i=this.items[this.index];

             this.$emit("cb",_i,this.index,this.items.length,this.maxEpi)
          }
      }

    },
    computed: {
      statusInfo() {
        return this.$store.state.streamData.statusInfo || {};
      },
      infoDesc(){
        var _p = this.info;
        var pd = _p.director;
        var info = "";
        if (pd && pd != undefined && pd != null)
          info += "导演：" + cutStr(pd, 12) + "<br/>";

        var pa = _p.actor;
        if (pa){
          info += "主演：" + cutStr(pa, 26) + "<br/>";
        }

        info += "下片时间：" + (_p.downtime||"暂无") + "<br/>";
        if (pd || pa)
          info += "<br/>";
        info += "简介：" + cutStr(_p.short_desc, 140);

        return info;
      },
      cfocus(){
        var x = Math.ceil(this.index % 10);
        var y = Math.floor(this.index / 10);
        var _movassetid=this.items.length!=0?this.items[this.index].movassetid:'';
        if(this.remember.indexOf(_movassetid)==-1){
            return {top: 448 + y * 76 + 'px', left: 58 + x * 82 + 'px'}
        }else{
            return {top: 448 + y * 76 + 'px', left: 58 + x * 82 + 'px', color:'#0f0'}
        }
      },
      cfval(){
        return (this.page - 1) * 30 + this.index + 1;
      }

    }
  }
</script>
<style scoped>
  .epi {
    color: #fff;
    position: relative;
  }

  .vleft {
    position: absolute;
    left: 58px;
    top: 104px;
    width: 820px;
    height: 340px;

  }

  .poster {
    margin-left: 4px;
    margin-top: 4px;
    width: 200px;
    height: 300px;
    float: left;
  }

  .right {
    float: right;
    width: 600px;
    font-size: 28px;
    font-weight: bold;

  }

  .desc {
    height: 300px;
    overflow: hidden;
  }

  .tip {
    position: relative;
    bottom: 0px;
    background: url(../../assets/img/public/tip.png) 10px no-repeat;
    width: 600px;
    height: 37px;
    text-align: right;
    font-size: 22px;
  }

  .list {
    position: absolute;
    left: 58px;
    top: 450px;
    width: 820px;
    height: 230px;

  }

  .list li {
    list-style: none;
    float: left;
    width: 82px;
    height: 76px;
    text-align: center;
    line-height: 76px;

    font-size: 30px;
  }

  .list_f {
    position: absolute;
    left: 58px;
    top: 450px;
    width: 82px;
    height: 76px;
    text-align: center;
    line-height: 76px;
    font-size: 30px;
    background-color: #f0b101;
    border-radius: 2px;
    color: #000;

  }
  .colorGreen{
    color:#0f0 !important;
  }

</style>
