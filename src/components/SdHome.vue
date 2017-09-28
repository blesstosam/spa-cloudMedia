<template>
  <div :class="colCss">
    <div class="logo"></div>
    <Mnav v-bind="{'focus':mfocus,'index':recover.mindex,'ctype':column}" @cb="mcb" @switch="rswitch"></Mnav>

    <router-view ref="child2" v-bind="{'menu':mitem,'action':recover.action,lindex:recover.lindex,lpage:recover.page}" @cb="mlcb"
                 @switch="rswitch"></router-view>

  </div>
</template>

<script>
  import Mnav from './public/Nav.vue' ;
  import {DEFAULT, FEATURES, RECOMMEND} from '../store/mutation-types'


  export default {

    name: 'SdHome',
    data () {
      return {
        msg: '尊敬的用户：您无法点播高清节目，请确定您的机顶盒是否为高清，或是否开通互动点播服务，账户余额是否充足等，如有疑问，详询96296。',
        column: "",

        mitem: {},
        litem: {},
        recover: {
          action: "MENU",
          mindex: 0,
          lindex: 0,
          page: 1
        }

      }
    },
    computed: {
      colCss(){
        var _r = {bg: true};
        _r[this.column] = true;
        return _r;
      },
      mfocus(){
        return this.recover.action == "MENU";
      }

    },
    created: function () {
      this.column = this.$route.params.column || "movie";
      this.$store.commit("upstate", {column: this.column});
      this.$store.commit("upmenus");
    },
    mounted: function () {
      this.pageEve();

    },

    methods: {
      mcb(_i){

        this.mitem = _i;

        this.recover.mindex = _i.inx;

      },
      mlcb(_inx, _len, _item, _page, _rec){
        this.recover.lindex = _inx;
        this.recover.page = _page;

        if (_rec) {    //如果是新闻板块发过来的推荐位
            this.litem = _rec;
        } else {
            this.litem = _item;
        }
      },
      upAct(v){
        keyAction.focus = this.recover.action = v;
      },
      rswitch(_kcode, _f){
        switch (_f) {
          case "MENU":
            this.upAct("LIST");
            break;
          case "LIST":
            switch (_kcode) {
              case KEY.UP:
                this.upAct("MENU");
                break;
              case KEY.RIGHT :
                this.upAct("COLLECT");
                  break;
              case KEY.LEFT:
                this.upAct("LIST");
                  break;
            }
            break
        }
      },
      getQuery(_str) {
          var obj={};
          var items=_str.length? _str.split("&"):[];
          items.forEach(function(value){
              var left=value.split("=")[0];
              var right=value.split("=")[1];
              obj[left]=right;
          });
          return obj;
      },
      pageEve(){
        var _vue = this;

        keyAction.add(function () {

            //要加鉴权
            var _isHd = _vue.$store.state.streamData.HD;
            if (_isHd) {
                _vue.push({path: "/hd/home"});
            } else {
                //弹框 _vue 为当前路由的组件
                _vue.$parent.$refs.alert.show();
            }

        }, KEY.NUMBER5);

        keyAction.add(function () {
          switch (this.focus) {
            case "MENU":
              _vue.$children[0].left();
              break;
            case "COLLECT":
              _vue.$children[1].left();
              break;
            case 'LIST':
               _vue.$refs.child2.left();
          }
        }, KEY.LEFT);
        keyAction.add(function () {
          switch (this.focus) {
            case "MENU":
              _vue.$children[0].right();
              break;
            case "LIST":
              _vue.$children[1].right();
              break
          }
        }, KEY.RIGHT);

        keyAction.add(function () {
          _vue.$children[0].down();
        }, KEY.DOWN, "MENU");

        keyAction.add(function () {

          _vue.$children[1].down();
        }, KEY.DOWN, "LIST");

        keyAction.add(function () {

          _vue.$children[1].up();

        }, KEY.UP, "LIST");


        keyAction.add(function () {


          var _m = _vue.mitem;
          var _col = _vue.column;
          var _c = _vue.litem;

          if (_c.url) {    //如果是新闻板块的推荐位就跳转到标清详情页
              let _url=_c.url;
              let _path= _url.substring(_url.indexOf('#')+1,_url.indexOf('?'));
              let _str= _url.substr(_url.indexOf('?')+1);
              let _query= _vue.getQuery(_str);

              //将图片放到state里存起来
              _vue.$store.commit('saveNewsPic', _c.img_url)
              _vue.push({path:_path, query:_query});
          }

          if(_vue.recover.lindex==0 && _vue.$route.path=='/sd/home/hot/list'){
              //高清鉴权
              var _isHd = _vue.$store.state.streamData.HD;
              if (_isHd) {
                  _vue.push("/hd/home");
              } else {
                  //弹框
                  _vue.$parent.$refs.alert.show();
              }


          }else if (_m.type && _m.type == FEATURES) {
            var _s = _vue.$route.path.replace("/sd/home/","");
            _vue.$store.commit('feature', _c.name);     //用state存储专题名称
              console.log(_c.poster);
            _vue.$store.commit('saveFeaturePic', _c.poster);
            _vue.push({path: "/sd/features/" + _s, query:{cid: _c.id} })
          } else if (_m.type && _m.type == RECOMMEND){
            let _url=_vue.litem.url;
            let _path= _url.substring(_url.indexOf('#')+1,_url.indexOf('?'));
            let _str= _url.substr(_url.indexOf('?')+1);
            let _query= _vue.getQuery(_str);
            _vue.push({path:_path, query:_query})
          }
          else if (_c && _c.category_type == "1") {
            _vue.push({path: "/sd/episode/" + _col, query: {cid: _c.id}})
          } else if (_c && _c.category_type == "0") {
            //将recover传到询价组件里
            var _f={category_type:_c.category_type,recover:_vue.recover};
            _vue.$emit("play", _c.id, _c.secondname, _f);
          }

        }, KEY.ENTER, "LIST");

        keyAction.add(function () {
            console.log(_vue.litem);
          _vue.$emit("collect",_vue.litem.id,_vue.litem.name)
        }, KEY.ENTER, "COLLECT");


        keyAction.add(function () {
          _vue.$children[1].pageUp();
        }, KEY.PAGEUP);
        keyAction.add(function () {
          _vue.$children[1].pageDown();
        }, KEY.PAGEDOWN);

        keyAction.add(function () {
          _vue.back();
        }, KEY.BACK);


      }
    },
    components: {Mnav}

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
