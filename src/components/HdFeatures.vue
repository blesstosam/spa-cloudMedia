<template>
  <div class="bg">
    <HdNav v-bind="{'focus':mfocus,'init':recover.minit,'kback':kback}"
           @cb="navCb" @switch="rswitch" @route-eve="update=true" ></HdNav>
    <router-view
      v-bind="{'menu':mitem,'focus':lfocus,'lpage':recover.lpage,'lindex':recover.lindex,'kback':kback,'loadEve':loadEve }"
      @cb="lcb"
      @switch="rswitch"
    ></router-view>

    <div class="alert-wrapper">
      <Alert :msg="msg" ref="alert"></Alert>
    </div>
  </div>
</template>
<script>
  import HdNav from './public/HdNav' ;
  import Service from '../service/index';
  import Alert from './public/Alert.vue';
  import {CHECKVIP} from '../store/mutation-types';

  export default {
    name: 'HdFeatures',
    data () {
      return {
        msg: '尊敬的用户，请确认您是否订购该产品包或账户余额是否充足。如有疑问，详询96296。',
        litem: {},
        mitem: {},
        pageSize: 12,
        kback:"",

        loadEve:"",
        update:true,
        recover: {
          action: "MENU",
          minit: 1,
          lpage: 1,
          lindex: 0,
          sid:""
        }

      }
    },
    computed: {
      mfocus(){
        return this.recover.action == "MENU";
      },
      lfocus(){
        return this.recover.action == "LIST";
      },
      statusInfo() {
          return this.$store.state.streamData.statusInfo || {};
      }
    },

    mounted() {
      //this.update=true;
      this.pageEve();
    },
    updated(){

      if(this.update){
        this.loadEve=Math.random();
        this.update=false;
      }
    },
    watch: {
      '$route'(){

        if (this.$route.query.lindex) {
          var _q = this.$route.query;
          this.recover.lindex = Number(_q.lindex);
          this.recover.lpage = Number(_q.lpage);
        } else {
          this.recover.lindex = 0;
          this.recover.lpage = 1;
        }

      }

    },
    methods: {
      navCb(_inx, _m){
        this.recover.minit = Number(_inx);
        this.mitem = _m;
      },
      upAct(v){
        keyAction.focus = this.recover.action = v;
      },
      lcb(v1, v2, v3, v4){
        this.recover.lindex = v1;
        this.recover.lpage = v2;
        this.litem = v3;
        this.pageSize = v4;
      },
      rswitch(_kcode,_f){
         switch (_f){
           case "dolby":
           case "free":
           case "jp":
           case "list":
               this.upAct("MENU");
               break;
           case "nav":
              this.upAct("LIST");
               break

         }
      },
      checkVip(){
          var _vue=this;
          var _stbNo = this.statusInfo.stbId || '99616612190002281';
          var _offerId=this.mitem.id;
          console.log(_offerId);
          Service.req(CHECKVIP,{stbNo: _stbNo,offerId: _offerId},function (s, v) {
              if(s=='success'){
                  //v.result='true';
                  if(v.result=='true'){
                      _vue.push({path: "/hd/info", query: {id: _vue.litem.id}});
                  }else{
                      _vue.$refs.alert.show();
                  }
              }else if(s=='error'){
                  console.log('error:',v);
              }
          })
      },
      pageEve(){
//      keyAction:MENU、LIST、FREE
        var _vue = this;


        keyAction.add(function () {
          switch (this.focus) {
            case "MENU":
              _vue.$children[0].left();
              break;
            case "LIST":
            case "FREE":
            case "DOLBY":
              _vue.$children[1].left();
              break;
            default:
              break
          }
        }, KEY.LEFT);
        keyAction.add(function () {

          switch (this.focus) {
            case "MENU":
              _vue.$children[0].right();
              break;
            case "LIST":

              _vue.$children[1].right();
              break;
            default:
              break
          }

        }, KEY.RIGHT);
        keyAction.add(function () {

          switch (this.focus) {
            case "MENU":
              _vue.$children[0].down();
              break;
            case "LIST":
              _vue.$children[1].down();
              break;
            default:
              break
          }
        }, KEY.DOWN);
        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              _vue.$children[1].up();

              break
          }
        }, KEY.UP);


        keyAction.add(function () {
          if (_vue.$children[1].pageDown) {
            _vue.$children[1].pageDown();
          }
        }, KEY.PAGEDOWN);
        keyAction.add(function () {
          if (_vue.$children[1].pageUp) {
            _vue.$children[1].pageUp();
          }
        }, KEY.PAGEUP);


        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              switch (_vue.mitem.column) {
                case 'chd':
                case 'hlw':
                    //好莱坞和彩虹岛需要鉴权
                    _vue.checkVip();
                    break;
                case "dolby":
                case "jp":
                  if (_vue.$route.name == "movie") {
                    _vue.push({path: "/hd/info", query: {id: _vue.litem.id}});
                  } else {
                    _vue.push({path: "/hd/movie", query: {sid: _vue.litem.id, minit: _vue.mitem.inx}});
                  }
                  break;
                case"all":
                  _vue.push({path: "/hd/info/arts", query: {id: _vue.litem.id}});
                  break;
                default:
                  _vue.push({path: "/hd/info", query: {id: _vue.litem.id}});
                  break
              }
              break;
            default:
              break
          }

        }, KEY.ENTER);

        keyAction.add(function () {
           console.log("hdFeatures.vue >back");
          _vue.back();
          _vue.kback=Math.random();
        }, KEY.BACK);


      }

    },

    components: {HdNav, Alert}

  }
</script>
<style scoped>
  .alert-wrapper {
    position: relative;
    top: 120px;
    right: 100px;
  }
  .bg {
    font-size: 24px;
    color: #958c96;
    width: 1280px;
    height: 720px;
    background: #3C3951;
  }

</style>
