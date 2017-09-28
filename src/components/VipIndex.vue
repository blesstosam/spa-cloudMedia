<template>
  <div class="bg">
    <div :class="cfocus"></div>
    <div class="check" v-show="show">
      <span>尊敬的用户，请确认您是否订购该产品包或账户余额是否充足。如有疑问，详询96296。</span>
      <span class="back">确认</span>
    </div>
  </div>
</template>

<script>
  import {CHECKVIP} from '../store/mutation-types';
  import Service from '../service/index.js';

  export default {
    name: 'app',
    data(){
      return {
        links:['/sd/home/vip-hollywood','/sd/home/vip-latale'],
        offId:['4015','4016'],
        show:false,
        recover: {
          index: 0
        }
      }
    },

    mounted: function () {
     this.pageEve();
    },
    computed: {
      cfocus(){
        return {'focus': true, 'focus2': this.recover.index != 0}
      },
      statusInfo() {
          return this.$store.state.streamData.statusInfo || {};
      }
    },
    methods: {
      pageEve(){
        var _vue=this;
        keyAction.add(function () {
            if(!_vue.show){
                _vue.recover.index=0;
            }
        }, KEY.LEFT);
        keyAction.add(function () {
            if(!_vue.show){
                _vue.recover.index=1;
            }
        }, KEY.RIGHT);
        keyAction.add(function () {
            if(!_vue.show){
                _vue.checkVip();
            }else{
              _vue.show=false;
            }
        }, KEY.ENTER)
      },
      checkVip(){
        var _vue=this;
        var _stbNo = this.statusInfo.stbId || '99616612190002281';
        var _offerId=this.offId[this.recover.index];
        Service.req(CHECKVIP,{stbNo: _stbNo,offerId: _offerId},function (s, v) {
          if(s=='success'){
            //v.result='true';
            if(v.result=='true'){
                var _path=_vue.links[_vue.recover.index];
                _vue.push({path:_path});
            }else{
                _vue.show=true;
            }
          }else if(s=='error'){
            console.log('error:',v);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 1280px;
    height: 720px;
    background: url(../assets/img/vip/vipIndex_bg.jpg) no-repeat;
  }

  .focus {
    position: absolute;
    left: 140px;
    top: 395px;
    width: 366px;
    height: 303px;

    border: 4px solid yellow;
    border-radius: 4px;
  }

  .focus2 {
    left: 793px;
    top: 395px;
  }
  .check{
    position: absolute;
    top: 210px;
    left: 390px;
    width: 500px;
    height: 270px;
    background-color: #000;
    border-radius: 30px;
    opacity: 0.8;
    font-size: 26px;
    color: #fff;
    z-index: 9999;
    padding:30px 5px 0 5px;

  }
  .check .back{
    position: absolute;
    left:195px;
    top:235px;
    width:120px;
    height:40px;
    line-height:40px;
    text-align: center;
    border-radius: 5px;
    border:2px solid #0a9ad2;
  }
</style>
