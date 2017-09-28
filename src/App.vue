<template>
  <div id="app">
    <router-view ref="sub" @collect="collect" @play="play"></router-view>

    <CollectBox2 @enterOk="collectOk" ref="collect" v-show="eve=='collect'" @collect-close="close"></CollectBox2>
    <AskPrice ref="play" v-show="eve=='play'" @play-close="close"></AskPrice>
    <OverRec v-show="eve=='overrec'" @over-close="close" ref="overrec" @play="play"></OverRec>

    <Alert :msg="msg" ref="alert"></Alert>

    <div id="debug" v-show="$store.state.debug" v-html="$store.state.msg"></div>
  </div>
</template>

<script>

  import CollectBox2 from './components/public/CollectBox2.vue' ;
  import AskPrice from './components/public/AskPrice.vue' ;
  import OverRec from './components/public/OverRec.vue' ;
  import Alert from './components/public/Alert.vue';

  export default {
    name: 'app',
    data () {
      return {
        msg: '尊敬的用户：您无法点播高清节目，请确定您的机顶盒是否为高清，或是否开通互动点播服务，账户余额是否充足等，如有疑问，详询96296。',
        eve: "",
        enterOk: false
      }
    },
    created: function () {

    },
    computed: {},
    watch: {
      "$store.state.eve"(n, o){
        if(n == "VOD_EXIT") {
           this.overrec(this.$store.state.vid);
        }
      }
    },
    mounted(){
      console.log("app.mounted..")
    },
    methods: {
      overrec(_id){
        this.eve = 'overrec';

        this.$refs.overrec.open(_id);
      },
      collect(_id, _name){
        this.eve = "collect";

        this.$refs.collect.open(_id, _name);

      },
      collectOk() {
          this.enterOk =true;
      },
      close(){
        this.eve = "";
        //如果是取消收藏成功重新加载数据
        if (this.$refs.sub.name == 'Collect' && this.enterOk == true) {
          this.$refs.sub.reqData();
        }
      },
      play(_id, _name, _f){
        this.eve = "play";
        this.$refs.play.open(_id, _name, _f);
      }
    },
    components: {CollectBox2, AskPrice, OverRec, Alert}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

  }

  #debug {
    position: absolute;
    left: 90px;
    top: 90px;
    width: 1000px;
    word-break: break-all;

    background-color: #fff;
    color: #000;
    z-index: 6000;

  }
</style>
