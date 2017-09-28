<template>
  <div class="bg">
    <div id="news">
      <img src="../assets/img/hd/chaoqing_news.gif">
    </div>
    <div id="menu">
      <div v-for="(m, i) in menus" :class="i|fmenu(recover.mIndex)"></div>
    </div>
    <div id="placeholder" >
      <div v-for="index in 11" :class="index-1|fPosterClass(recover.pIndex)">
        <div class="mask"></div>
      </div>
    </div>
    <div id="poster">
      <div v-for="(p, i) in pList" :class="i|fPosterClass(recover.pIndex)">
        <img :src="p.img_url|fposter('REC')" />
        <div class="mask">
          <p class="title">{{p.title}}</p>
          <p class="desc">{{p.descs}}</p>
        </div>
      </div>
    </div>
    <img id="code" width="74" src="../assets/img/hd/twoCode.png">
  </div>
</template>
<script>
  import Service  from '../service';
  import {RECOMMEND} from '../store/mutation-types.js';

  export default{
    name: "HdHome",
    mounted: function () {
      this.pageEve();
      this.reqData();
    },
    filters: {
      fmenu(v0, v1){
        if (v0 == v1) return "m-" + v0 + " m_f";
        return "m-" + v0;
      },
      fPosterClass(v0, v1){
        if (v0 == v1) return "p-" + v0 + " p_f";
        return "p-" + v0;
      }
    },
    data(){
      return {
        recover:{
            mIndex: 0,
            pIndex: -1,
            mlast:0,
            plast:0
        },
       /* menus: ["高清电影", "高清电视剧", "综合高清", "精品策划", "限时免费", "4K专区", "体验区", "H好莱坞", "彩虹岛", "3D专区"],*/
        pList:[],
        cid:'566524',
        isInit:true
      }
    },
    computed:{
      menus(){
         var t=this.$store.state.columns.hd;
         var f=[];
         for(var i in t){
            if(i>0){
              f.push(t[i])
            }
         }
         return f;
      }
    },
    methods: {
      getQuery(_str) {
          var obj={};
          var items=_str.length? _str.split("&"):[];
          items.forEach(function(value,index){
              var left=value.split("=")[0];
              var right=value.split("=")[1];
              obj[left]=right;
          });
          return obj;
      },
      reqData(){
          var _vue = this;
          //_vue.$store.commit('debug', 'cid:'+this.cid)
          Service.req(RECOMMEND,{categoryId: this.cid, pageSize:11, pageNum: 1, groupId:'normal', flag:0},
              function (s, v) {
                  _vue.isInit = false;
                  if (s == "success") {
                      if(v.response.length!=0){
                          _vue.pList=[];
                          _vue.pList=v.response;
                          _vue.pList.unshift(_vue.pList.pop());
                          //_vue.$store.commit('debug', JSON.stringify(_vue.pList))
                      }
                  }else if(s =='error'){
                      console.log('err:',v);
                  }
              });
      },
      mleft(){
        if (this.recover.mIndex <= 0) return;
        this.recover.mIndex--;
      },
      mright(){
        if (this.recover.mIndex >= 9) return;
        this.recover.mIndex++;
      },
      mup(){
        if (this.recover.mIndex <= 4) return;
        this.recover.mIndex -= 5;
      },
      mdown(){
        if (this.recover.mIndex >= 5){
          keyAction.focus = "POSTER";
          this.recover.mlast = this.recover.mIndex;
          this.recover.mIndex = -1;
          this.recover.pIndex =  this.recover.plast;
          return;
        }
        this.recover.mIndex += 5;
      },
      pleft(){

        switch (this.recover.pIndex) {
          case 0:
          case 4:
            this.push("/hd/search");
            break;
          case 1:
          case 2:
          case 5:
          case 6:
          case 7:
          case 9:
          case 10:
            this.recover.pIndex--;
            break;
          case 3:
            this.recover.pIndex = 1;
            break;
          case 8:
            this.recover.pIndex = 4;
            break;
          default:
            break;
        }

      },
      pright(){
        if (this.recover.pIndex == 2 || this.recover.pIndex == 7 || this.recover.pIndex == 10) return;
        this.recover.pIndex++;
      },
      pup(){
        switch (this.recover.pIndex) {
          case 3:
            this.recover.pIndex = 2;
            break;
          case 4:
            this.recover.pIndex = 0;
            break;
          case 5:
          case 6:
            this.recover.pIndex = 1;
            break;
          case 7:
            this.recover.pIndex = 3;
            break;
          case 8:
          case 9:
          case 10:
            this.recover.pIndex -= 3;
            break;
          case 0:
          case 1:
          case 2:
            keyAction.focus = "MENU";
            this.recover.plast = this.recover.pIndex;
            this.recover.pIndex = -1;
            this.recover.mIndex =  this.recover.mlast;
            break;
          default:
            break;
        }
      },

      pdown(){
        switch (this.recover.pIndex) {
          case 0:
            this.recover.pIndex = 4;
            break;
          case 1:
            this.recover.pIndex = 5;
            break;
          case 2:
            this.recover.pIndex = 3;
            break;
          case 3:
            this.recover.pIndex = 7;
            break;
          case 5:
          case 6:
          case 7:
            this.recover.pIndex += 3;
            break;
          case 4:
          case 8:
          case 9:
          case 10:
          default:
            break;
        }
      },
      pageEve(){
        var _vue = this;

        keyAction.focus = this.$route.query.action?this.$route.query.action:'MENU';


        keyAction.add(function () {
          _vue.mleft();
        }, KEY.LEFT,"MENU");
        keyAction.add(function () {
          _vue.mright();
        }, KEY.RIGHT,"MENU");
        keyAction.add(function () {
          _vue.mup();
        }, KEY.UP,"MENU");
        keyAction.add(function () {
          _vue.mdown();
        }, KEY.DOWN,"MENU");

        keyAction.add(function () {

          _vue.push("/hd/"+_vue.menus[_vue.recover.mIndex].column);
        }, KEY.ENTER,"MENU");

        keyAction.add(function () {
          _vue.pleft();
        }, KEY.LEFT,"POSTER");
        keyAction.add(function () {
          _vue.pright();
        }, KEY.RIGHT,"POSTER");
        keyAction.add(function () {
          _vue.pup();
        }, KEY.UP,"POSTER");
        keyAction.add(function () {
          _vue.pdown();
        }, KEY.DOWN,"POSTER");

        keyAction.add(function () {
            let _url=_vue.pList[_vue.recover.pIndex].url;
            let _path= _url.substring(_url.indexOf('#')+1,_url.indexOf('?'));
            let _str= _url.substr(_url.indexOf('?')+1);
            let _query= _vue.getQuery(_str);
            console.log(111, _url);
            _vue.push({path:_path, query:_query})
        }, KEY.ENTER,"POSTER");

        keyAction.add(function () {
            _vue.back();
        },KEY.BACK);
      }
    }
  }

</script>
<style scoped>
  .bg {
    width: 1280px;
    height: 720px;
    background-image: url("../assets/img/hd/chaoqing_index.png");
    position: absolute;
    left:0;
    top:0;
  }
  #news{
    position:absolute;
    left:100px;
    top:35px;
  }
  #menu {
    position: absolute;
    left: 96px;
    top: 69px;
  }

  #menu div {
    position: absolute;
    height: 35px;
  }

  .m-0 {
    width: 127px;
    left: 22px;
    top: 0;
  }

  .m-1 {
    width: 155px;
    left: 232px;
    top: 0;
  }

  .m-2 {
    width: 129px;
    left: 489px;
    top: 0;
  }

  .m-3 {
    width: 154px;
    left: 705px;
    top: 0;
  }

  .m-4 {
    width: 129px;
    left: 936px;
    top: 0;
  }

  .m-5 {
    width: 113px;
    left: 22px;
    top: 42px;
  }

  .m-6 {
    width: 172px;
    left: 231px;
    top: 42px;
  }

  .m-7 {
    width: 129px;
    left: 487px;
    top: 42px;
  }

  .m-8 {
    width: 138px;
    left: 705px;
    top: 42px;
  }

  .m-9 {
    width: 125px;
    left: 935px;
    top: 42px;
  }

  .m_f {
    border: 3px solid #00A0E9;
    border-radius: 30px;
  }

  #poster {
    width: 1030px;
    height: 525px;
    position: absolute;
    left: 125px;
    top: 158px;
  }

  #poster > div {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
  }
  #placeholder {
    width: 1030px;
    height: 525px;
    position: absolute;
    left: 125px;
    top: 158px;
  }
  #placeholder > div {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
  }

  .p-0 {
    background-color: #999;
    width: 361px;
    height: 254px;
    left: 2px;
    top: 0;
  }

  .p-1 {
    background-color: #999;
    width: 430px;
    height: 254px;
    left: 380px;
    top: 0;
  }

  .p-2 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 820px;
    top: 0;
  }

  .p-3 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 820px;
    top: 135px;
  }

  .p-4 {
    background-color: #999;
    width: 361px;
    height: 254px;
    left: 2px;
    top: 270px;
  }

  .p-5 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 380px;
    top: 270px;
  }

  .p-6 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 600px;
    top: 270px;
  }

  .p-7 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 820px;
    top: 270px;
  }

  .p-8 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 380px;
    top: 405px;
  }

  .p-9 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 600px;
    top: 405px;
  }

  .p-10 {
    background-color: #999;
    width: 210px;
    height: 120px;
    left: 820px;
    top: 405px;
  }

  .mask {
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(23,93,227,0.5);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    z-index:100;
  }
  .p_f .mask{
    display: flex;
  }
  .mask > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align:center;
  }

  .mask .title {
    width: 60%;
    font-size: 24px;
    font-weight: bold;

  }

  .mask .desc {
    width: 70%;
    margin-top: 10px;
    font-size: 19px;
  }

  #poster>div:nth-child(1) .desc {
    font-size: 23px;
  }
  #poster>div:nth-child(2) .desc {
    font-size: 23px;
  }
  #poster>div:nth-child(5) .desc {
    font-size: 23px;
  }

  #code {
    position: absolute;
    left: 1072px;
    top: 585px;
  }

</style>

