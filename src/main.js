// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from  './store'
import vueResource  from 'vue-resource'
import Service  from './service'

import HelpPlug from './plugin/HelpPlug'


import './assets/css/common.css'


import './assets/js/stream-api'
import './assets/js/action'
import './assets/js/util'


Vue.use(vueResource);
Vue.use(HelpPlug);


Vue.config.productionTip = false;



function StreamEve(_vue) {
    _vue.$store.commit('debug', window.location.href+'///');
    if(getVueParam('key')&&!_vue.$store.state.streamData.statusInfo){
        _vue.$http.get("/opa/store?key="+getVueParam('key')).then(function (r) {
            switch (r.status){
                case 200:
                case 201:
                    _vue.$store.commit("streamData",r.data);
                    _vue.$store.commit('debug', JSON.stringify(r.data))
                    //写死盒子号
                    //_vue.$store.state.streamData.statusInfo.stbId = '99616612190002281'

                    _vue.recover();    //历史恢复
                    let _d = r.data.statusInfo;
                    if(_d.stbId!="" && _d.assetid!="" && _d.num!=""){

                        //新闻，视赢家，智学堂没有点播后推荐
                        let href = window.location.href;
                        if (href.indexOf('economy')==-1 && href.indexOf('education')==-1 && href.indexOf('news')==-1) {
                            _vue.$store.commit('upstate', {"vid": _d.assetid});
                            setTimeout(() => {
                                _vue.$store.commit("upstate",{eve:"VOD_EXIT"});
                            }, 100)
                        }
                        Service.vodExitPoint({id: _d.assetid, point: _d.num, stbNo: _d.stbId});

                    }
                    break;
            }
        });
    }

    // setTimeout(() => {
    //     _vue.$store.commit('upstate', {"vid": '1013131_2427338OOOOOOOOOOOO3'});
    //     _vue.$store.commit("upstate",{eve:"VOD_EXIT"});
    // }, 100)

}




/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  vueResource,
  template: '<App/>',
  components: { App },
  created() {
    //全局注册
    // keyAction.add(function () {
    //   console.log("THIS IS main.js")
    // },KEY.LEFT)

    Vue.http.options.timeout=3000*10;

  },
  mounted(){
    StreamEve(this);
  },
  methods: {
      recover() {

        if( this.$store.state.streamData.recover &&
            this.$store.state.streamData.recover.chistory &&
            this.$store.state.streamData.recover.chistory.length >0){

            let _chistory = this.$store.state.streamData.recover.chistory;

            //保存最后一条历史
            this.$store.commit('lastHistory', _chistory[_chistory.length-1]);

            _chistory.forEach((v) => {
                this.$store.commit("chistory", v);
            });

            this.$store.commit("chistory");
        }

      }
  }
});
