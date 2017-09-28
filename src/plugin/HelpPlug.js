
export default function install(Vue, options) {


  Vue.prototype.$chistory = new Array();
  Vue.mixin({

    beforeMount() {
      //recover copy  url query values;
      if (this.$data.recover) {

        keyAction.remove();

        var _vue = this;
        keyAction.add(function () { _vue.push({path: "/f1"}); }, KEY.F1);
        keyAction.add(function () { _vue.push({path: "/f2"}); }, KEY.F2);
        keyAction.add(function () { _vue.push({path: "/f3"}); }, KEY.F3);

        //menu和F4回到首页
        keyAction.add(function () {

            _vue.toStreamApp();

        }, [KEY.F4, KEY.MENU]);




        var _v = this.$data.recover;
        var _q = this.$route.query;

        Object.keys(_v).forEach(function (_k) {

          if (_q[_k] && (_v[_k] != undefined)) {
            var _t = _q[_k];
            switch (_q[_k]) {
              case "true":
                _t = Boolean(1);
                break;
              case "false":
                _t = Boolean(0);
                break;
              default:
                if (!isNaN(_q[_k])) {
                  _t = Number(_q[_k])
                }
                break
            }
            _v[_k] = _t;


          }
        });


        if (this.recover.action && this.recover.action != "") {
            keyAction.focus = this.recover.action;
            //_vue.$store.commit('debug', 'in changeAciton: '+keyAction.focus);
        }

        /*if(this.$store.state.vid!="null"){
           this.$store.commit("upstate",{eve:"VOD_EXIT"});
        }*/

      }


    },

    methods: {
      toStreamApp() {
        //去首页,将assetid设为空，避免重复弹框和续播
        let _d = this.$store.state.streamData;
        if (_d.statusInfo && _d.statusInfo.assetid != '') {
          _d.statusInfo.assetid = '';
        }

        //这里没有记忆功能
        let _t = _d.recover.toIndex || '/stream/#/';
        this.pushData("statusInfo", this.$store.state.streamData.statusInfo);
        this.pushData("groupId", this.$store.state.streamData.groupId);
        this.pushData("HD", this.$store.state.streamData.HD);
        this.pushData("isLocakPack", this.$store.state.streamData.isLocakPack);
        this.pushData("recover", {link: _t});
      },
      pushData(k, v){
        this.streamData = this.streamData || {};
        this.streamData[k] = v;
        var _k = Object.keys(this.streamData);
        if (_k.length >= 2) {
            if (this.streamData['statusInfo'] && this.streamData['statusInfo'].stbId) {
                var stbId=this.streamData['statusInfo'].stbId;
                var u = "/opa/store?key=" +stbId ;
                var _vue=this;
                this.$http.put(u, this.streamData).then(function (r) {
                    switch (r.status) {
                        case 200:
                        case 201:
                            if(r.data.indexOf("STORED")!=-1&&_vue.streamData['recover']&&_vue.streamData['recover'].link){
                                var _link=_vue.streamData['recover'].link;
                                window.location.href=_link+(_link.indexOf("?")!=-1?"&":"?")+"key="+stbId;
                            }
                    }
                });
            }
        }
      },
      push(_v){

        if (this.$data.recover) {

          var _r = {action: keyAction.focus};
          Object.keys(this.$data.recover).forEach((v, i) => {
            _r[v] = this.$data.recover[v];
          });

          this.$store.commit("chistory", {path: this.$route.path, query: _r});
          this.$router.replace({path: this.$route.path, query: _r});
        }

        if (_v) {
          var _vue = this;
          console.log("helpplug.js-push", _v);
          window.setTimeout(function () {
            _vue.$router.push(_v);
          }, 50);

        }

      },
      back(){
        if (this.$router) {
          event.preventDefault();
          let history = this.$store.state.chistory;

          if (keyAction.focus == 'ALERT') {
            return;
          }

          //如果history为空，则回到首页
          if (history.length == 0 && keyAction.focus != 'OVERREC') {
            this.toStreamApp();
          }

          if (history.length > 0 && keyAction.focus != 'OVERREC') {
              this.$router.push(history[history.length-1]);
              this.$store.commit("chistory");
          }
        }
      }
    }
  });


  Vue.filter("fposter", function (val, ctype) {
    if (!val) return '';
    return poster(val, ctype);
  });

  Vue.filter("fstr", function (val, len) {
    if (!val && val != "") return '暂无';
    if (!len || val.length <= len)  return val;
    if (val.length > len) return val.substr(0, len) + "..."
  });

  Vue.filter("fgenres", function (v) {
    var _a = (v + "").split(",");
    var _r = "";
    _a.forEach(function (_v) {
      if (_v.trim() != "") {
        _r += genres(_v) + ",";
      }
    });
    return _r != "" ? _r.substr(0, _r.length - 1) : "其它"
  });

  Vue.filter("fregion", function (v) {
    return region(v + "")
  })


}

