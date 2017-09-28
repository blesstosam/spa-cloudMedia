<template>
  <div class="Ask">
    <div v-show="boxShow" class="bg">
      <!--<div class="ad"><img src="../../assets/img/auth/ad.gif" width="100%" height="100%"/></div>-->
      <Ad class="ad" ref="ad"></Ad>
      <div class="info">
        <div v-show="action!='load'">
          <div class="video-name" v-html="pname"></div>
          <div class="video-price" v-html="price"></div>
          <div class="buts">
            <div :class="leftBtnCss">{{leftBtnTxt}}</div>
            <div :class="midBtnCss">{{midBtnTxt}}</div>
            <div :class="rightBtnCss">取消</div>
          </div>
        </div>
        <div v-show="action=='load'">{{tip}}</div>
      </div>
    </div>
    <div class="toast" v-show="toastShow">{{text}}</div>
  </div>

</template>
<script>
  import Ad  from './AdPic.vue';
  import Service from '../../service'
  export default {
    name: 'Auth',
    data () {
      return {
        id: "",
        pname: "",
        price: "",
        tip: "数据加载中....",
        leftBtnTxt: "确认",
        midBtnTxt: "续看",
        midBtnShow: false,

        action: "load",
        boxShow: true,
        toastShow: false,
        text: "",
        ctype:"",
        options:"",
        askInfo: {},
        saveData:{}

      }
    },
    mounted: function () {
      console.log("askprice.vue mounted....................")
      //this.open("567720_11287573", "加勒比海盗5：死无对证");
    },
    computed: {
      leftBtnCss(){
        return {'but': true, 'act': this.action == "PLAY_LEFT"}
      },
      midBtnCss(){
        return {'but': true, "hide": !this.midBtnShow, 'act': this.action == "PLAY_MID"}
      },
      rightBtnCss(){
        return {'but': true, 'act': this.action == "PLAY_RIGHT"}
      },
      statusInfo() {
        return this.$store.state.streamData.statusInfo || {};
      }

    },
    methods: {
      open(_id, _name, _f){
        if (_id != "") {

          keyAction.oldFocus = keyAction.focus;
          this.pname = "节目名称：" + _name;
          this.id = _id;
          if(_f.situationid){
              this.options=_f;
          }
          this.ctype=_f.category_type;
          this.saveData=_f.recover;


          this.upAct('load');

          this.askPrice();
          this.boxShow = true;
          this.toastShow = false;
          this.$refs.ad.reqPic(_id.split("_")[1]);
        }
        if (!keyAction.actions[KEY.LEFT]['PLAY_MID']) {

          this.pageEve();

        }
      },
      upAct(v){
        keyAction.focus = this.action = v;
      },
      askPrice(){
        let _stbId = this.statusInfo.stbId || '99616612190002281'; // '99616612190002281'; '99810510140023379'
        Service.askPrice({stbNo: _stbId, id: this.id}, (s, v) => {
          this.askInfo = v;
          if (s == "success") {
            switch (v.info.status) {
              case 'error':              //表示超时
                this.upAct('PLAY_LEFT');
                break;
              case "failure":            //表示询价异常
                this.upAct('PLAY_LEFT');
                //this.tip = "您没有权限观看此影片";
//                window.setTimeout(() => {
//                  this.close();
//                }, 3000);
                break;
              case "vod":
                this.upAct('PLAY_LEFT');
                break;
              case "package":
                this.leftBtnTxt = "包订购";
                this.upAct('PLAY_LEFT');
                break;
              default:
                this.midBtnShow = true;
                this.upAct('PLAY_MID');
                break;
            }
            var _unit = v.info.status == "package" || this.ctype != '1' ? "部" : "集";
            this.price = (v.info.status != "package" ? "价格:" : "包价格:" ) + (v.info.price || '0') + "元/" + _unit;
          }else{
            this.tip = "影片信息查询出错，鉴权失败";
            window.setTimeout(() => {
              this.close();
            }, 3000)
          }
        });
      },
      videoAuth(){
        var _f = this.action;
        this.upAct("authing");

        this.toast("影片鉴权中....", 4500);
        Service.videoAuth({'token': this.askInfo.token}, (_s, v) => {

          if (_s == "success" && v.info.status == 'failure') {
            this.toast("用户未注册或余额不足", 3000);
            setTimeout(() => {
                this.close();
            }, 3000);

          } else {
            let _stbId = this.statusInfo.stbId || '99616612190002281';
            if(this.ctype=='1'){
                let _s=this.id.split("_");
                Service.episodeRemember({'stbNo': _stbId, categoryId: _s[0], assetId: _s[1]})
            }
            if(this.options!=""&&this.options.situationid){
              let _s=this.id.split("_");
              Service.feedBack(_stbId,this.options.situationid,_s[1]);
            }

            console.log('续看:'+this.askInfo.info.desc);
            var _p = (_f == "PLAY_MID" && this.askInfo.info.status == 'continue' ? Number(this.askInfo.info.desc) : 0);
            var _id=this.id;
            var _name=this.pname;

            this.close();

            var _r = {action: keyAction.focus};
            Object.keys(this.saveData).forEach((v, i) => {
              _r[v] = this.saveData[v];
            });


            this.$store.commit("chistory", {path: this.$route.path, query: _r});

            //this.$store.commit('debug', '最后的路由：'+this.$route.path + JSON.stringify(_r));
            startVod(_id, _name, _p);

          }

        });

      },

      toast(_txt, dur){
        this.boxShow = false;
        this.toastShow = true;
        this.text = _txt;
        window.setTimeout(() => {
          this.toastShow = false;
        }, dur || 3000)

      },
      pageEve(){

        keyAction.add(() => {
          this.upAct("PLAY_LEFT");
        }, KEY.LEFT, 'PLAY_MID');

        keyAction.add(() => {

          this.upAct(this.midBtnShow ? "PLAY_MID" : "PLAY_LEFT");

        }, KEY.LEFT, 'PLAY_RIGHT');


        keyAction.add(() => {
          this.upAct(this.midBtnShow ? "PLAY_MID" : "PLAY_RIGHT");
        }, KEY.RIGHT, 'PLAY_LEFT');

        keyAction.add(() => {
          this.upAct("PLAY_RIGHT");

        }, KEY.RIGHT, 'PLAY_MID');


        keyAction.add(() => {
          this.videoAuth();

        }, KEY.ENTER, 'PLAY_MID');


        keyAction.add(() => {

          this.close();

        }, KEY.ENTER, 'PLAY_RIGHT');

        keyAction.add(() => {

          this.videoAuth();
        }, KEY.ENTER, 'PLAY_LEFT');


        keyAction.add(() => {
          this.close();

        }, KEY.BACK, 'PLAY_MID');


        keyAction.add(() => {

          this.close();

        }, KEY.BACK, 'PLAY_RIGHT');

        keyAction.add(() => {

          this.close();
        }, KEY.BACK, 'PLAY_LEFT');


      },
      close(){
        this.pname = "";
        this.price = "";
        this.boxShow = false;
        this.toastShow = false;
        this.midBtnShow = false;
        this.leftBtnTxt = "确认";
        keyAction.focus = keyAction.oldFocus;
        this.$emit('play-close');
      }

    },

    components: {Ad}

  }
</script>

<style scoped>
  .bg {

    position: absolute;
    left: 262px;
    top: 144px;

    width: 755px;
    height: 422px;
    background: url("../../assets/img/auth/ask_price_bg.png") no-repeat;

    color: #fff;
    font-size: 24px;
    /*  z-index: 201;
        background: url("img/ask_price_bg.png") left top no-repeat;
        font-size: 22px;
        display: none;
        color: #000;*/
  }

  .info {
    margin-top: 10px;
  }

  .ad {
    margin-left: 270px;
    margin-top: 60px;
    width: 455px;
    height: 270px;
  }

  .ad img {
    border-radius: 4px;
  }

  .video-name {
    margin-top: 10px;
    margin-left: 20px;
  }

  .video-price {
    width: 245px;
    height: 43px;
    float: left;
    margin-left: 20px;
  }

  .buts {
    float: left;
  }

  .but {

    background-color: #999;
    border-radius: 5px;
    opacity: 0.7;
    width: 136px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin-right: 25px;
    float: left;
    -webkit-transition-duration: 0ms;

  }

  .act {
    background-color: transparent;
    width: 134px;
    height: 43px;
    border: 2px solid #0a9ad2;
  }

  .hide {
    visibility: hidden;
  }

  .toast {
    position: absolute;
    left: 328px;
    top: 180px;
    width: 615px;
    height: 255px;
    padding-top: 10px;
    color: #fff;
    font-size: 26px;
    text-align: center;

    background-color: #363439;
    opacity: 0.9;
    border-radius: 20px;
  }


</style>
