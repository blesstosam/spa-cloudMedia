<template>
  <ul class="list">
    <li v-for="(v, i) in list">
      <img :src="v.poster|forPoster(v.assetId)" width="120" height="175"/>
      <div class="focus" v-if="focus&&i==index">
        <div class="name">{{v.name|fstr(8)}}</div>
      </div>
    </li>
  </ul>
</template>
<script>
  import Service from '../../service/index.js';

  export default {
    name: '',
    desc:'recommend list 10',
    props:["focus",'rindex', 'id'],
    data () {
      return {
        situationid:'2c9461bb44b9d48b0144ba21fbfd06b1',
        index:0,
        list:[],
        //id:'',          //cep接口需要的id
        cid:'',         //ie接口需要的资产id
        cate: ''
      }
    },
    created(){},
    mounted:function () {
      this.cid = this.id ? this.id.substr(this.id.indexOf('_') + 1) : '';
      this.cate = this.id ? this.id.substr(0, this.id.indexOf('_')) : '';
      this.index = this.rindex;
      this.reqPoster();
    },
    watch:{
      id(){
        this.cid = this.id ? this.id.substr(this.id.indexOf('_') + 1) : '';
        this.cate = this.id ? this.id.substr(0, this.id.indexOf('_')) : '';
        this.reqPoster();
      },
      focus(n){
          if(n){
              this.cb();
          }
      },
      index(){
        this.cb();
      }
    },
    filters:{
      forPoster (val,assetId) {
          if (!val) return '';
          if(assetId){
              return poster(val, 'CEP');
          }
          return poster(val, 'HD');
      }
    },
    computed: {
      statusInfo() {
        return this.$store.state.streamData.statusInfo || {};
      }
    },
    methods:{
      reqCep(_count){
        var _vue=this;
        Service.cepBakData({id: this.id,count: _count},
          function (s,v) {
            if (s == "success") {
                if(v.info.length!=0){
                    v.info.forEach(function (item) {
                        _vue.list.push(item);
                    })
                }
            }else if(s =='error'){
                console.log('err:',v);
            }
          });
      },
      reqPoster(){
        var _vue=this;
        var _uid=this.statusInfo.stbId||'99616612190002281';

        //调高清的影片
        Service.IeCep({
          accesskey:'stream31a936a111e611e69cb7ed607f',
          service:'ie.v2',
          operation:'GetRecommendList',
          rtype:'recommend.situation.v1',
          ctype:'vod',
          count:7,
          filter:"CABLEVOD='Y' and  video_poster!='morenhaibao.gif'  and  video_poster!='morenhaibao.jpg'  and  video_poster!=''   and  hd_content=1  and video_price<>'0' ",
          uid:_uid,
          situationid:this.situationid,
          postertype:2,
          urltype:1,
          backurl:'none',
          period:'weekly',
          user_weight:0.5,
          optr_weight:0.5,
          cid: this.cid,    //资产id
          CategoryID: this.cate
        },function (s, v) {
          if (s == "success") {
              _vue.list=[];
            if(v.recommend.length!=0){
              _vue.list=v.recommend;
              _vue.list.forEach(function (v,i) {
                v.name=v.title;
              });
            }
          }else{
              _vue.reqCep(7);
          }
        });

      },
      left(){
        this.index=(this.index>0?--this.index:this.list.length-1);
      },
      right(){
        this.index=(this.index<this.list.length-1?++this.index:0);
      },
      up(){
        this.$emit("switch",KEY.UP,"rec");
      },
      down(){

      },
      cb(){
        console.log('hdrec..')
        var _v=this.list[this.index];
        this.$set(_v,'situationid',this.situationid)
        this.$emit("cb",this.index,_v) ;
      }
    }
  }

</script>
<style scoped>
  .list{
    width:1130px; height:175px;
  }
  .list li{
    width:120px;height:175px;
    float:left;
    margin-right:40px;
    position: relative;
  }
  .focus{
    position: absolute;
    left:0px;
    top: 0px;
    width:120px;
    height: 175px;
    background:url(../../assets/img/hd/infoMovieFocus.png) no-repeat;
    text-align: center;
  }
  .name{margin-top:40px;}
</style>
