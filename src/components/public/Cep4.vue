<template>
  <div>
      <ul class="c4">
        <li  v-for="(item, _inx) in list"  :class="_inx|ffs(index,rfcous)">
            <img :src="item.poster|fposter" width="142" height="212"/>
            <p>{{item.name|fstr(7)}}</p>
        </li>
      </ul>
  </div>

</template>

<script>
  import Service from '../../service/index.js';
  import {SEARCH} from '../../store/mutation-types';

  export default {
    props:['rfcous','rindex','id','rtype','wColumn'],
    data(){
      return {
          list:[],
          index:0,
          cid:'',     //资产id
          cate: '',
          situationid:'2c9461bb44b9d48b0144ba21fbfd06b1'
      }
    },
    created(){
     this.index=this.rindex || 0;
    },
    mounted(){
      this.cid = this.id ? this.id.substr(this.id.indexOf('_') + 1) : '';
      this.cate = this.id ? this.id.substr(0,this.id.indexOf('_')) : '';
      this.reqPoster();
    } ,
    watch:{
      index(){
        this.callback();
      },
      id(){
        this.cid = this.id ? this.id.substr(this.id.indexOf('_') + 1) : '';
        this.cate = this.id ? this.id.substr(0,this.id.indexOf('_')) : '';
        this.reqPoster();
      }
    },
    computed:{
      focus() {
        return this.$store.state.menus;
      },
      statusInfo() {
        return this.$store.state.streamData.statusInfo || {};
      }

    },
    methods: {
      load(_count){
        var _vue=this;
        Service.cepBakData({id: this.id,count: _count},function (s,v) {
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
            var _uid=this.statusInfo.stbId || '99616612190002281';

           /* var _CategoryID='';
            if(this.wColumn=='tv'){
                _CategoryID='3500';
            }else if(this.wColumn=='animation'){
                _CategoryID='4815';
            }else{

            }*/

            //调标清的影片
            Service.IeCep({
                accesskey:'stream31a936a111e611e69cb7ed607f',
                service:'ie.v2',
                operation:'GetRecommendList',
                rtype:'recommend.situation.v1',
                ctype:'vod',
                count:4,
                filter:"CABLEVOD='Y' and video_poster!='morenhaibao.gif' and video_poster!='morenhaibao.jpg' and video_poster!='' and hd_content=0 and video_price<>'0' and is_series='Y'",
                uid: _uid,
                situationid: this.situationid,
                postertype:2,
                urltype:1,
                backurl:'none',
                period:'weekly',
                user_weight:0.5,
                optr_weight:0.5,
                cid: this.cid,   //资产id
                CategoryID: this.cate   //需要判断栏目传入不同id
            },function (s,v) {
                if (s == "success") {
                    _vue.list=[];
                    if(v.recommend.length!=0){
                        _vue.list=v.recommend;
                        _vue.list.forEach(function (v) {
                            v.name=v.title;
                        });
                    }
                } else {
                    _vue.load(4);
                }
            });

        },
      recover(){

      },
      left(){
        this.index=(this.index>0?--this.index:this.list.length-1);
      },
      right(){
        this.index=(this.index<this.list.length-1?++this.index:0);
      },
      up(){
        if(this.rtype&&this.rtype==1){

        }else{
          this.index=(this.index-2>=0?this.index-2:this.index);
        }

      },
      down(){
        if(this.rtype&&this.rtype==1){

        }else{
          this.index=(this.index+2<=(this.list.length-1)?this.index+2:this.index);
        }
      },
      enter(){

      },
      callback(){
        var _t=this.list[this.index];
        this.$set(_t, 'situationid', this.situationid);
        this.$emit("cb", _t, this.index);
      }

    },
    filters:{
        ffs(v1,v2,v3){
            return {'focus4':(v1==v2&&v3) }
        }
    }

  }
</script>

<style scoped>
   .c4{
     position: absolute;
     width: 340px;
     height: 504px;
     left: 920px;
     top: 168px;
     color: #fff;
     font-size:18px;

   }
   .c4 li{ float:left;text-align: center; width:155px;
     height: 255px; }
   .c4 li  img {
     margin-top: 4px;
   }
   .focus4{
     color:#000;
     background:url(../../assets/img/cep/focus.png) center no-repeat;
   }
</style>
