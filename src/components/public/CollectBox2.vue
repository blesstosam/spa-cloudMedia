<template>
  <div>
    <div class="CollectBox" v-show="show">
      <div class="desc">

        <template v-if="favorited">
          <div>节目：{{name}}</div>
          <br/>
          您已收藏过，是否取消收藏！
        </template>
        <template v-else-if="!favorited">
          <div>您将收藏节目:{{name}}</div>
          <br/>
          <p>按确认键收藏，否则请取消。</p>
        </template>
        <template v-else>
          查询中....
        </template>
      </div>
      <div class="buts">
        <div :class="okCss">确认</div>
        <div :class="cancelCss">取消</div>
      </div>
    </div>
    <div id="toast" class="CollectBox" v-show="show==false">
      <div class="desc">{{text}}</div>
    </div>
  </div>
</template>

<script>

  import Service from '../../service';

  export default {
    name: 'CollectBox',

    data: function () {
      return {

        show: true,
        favorited: "",
        text: "",
        id: "",
        name: "",
        action: ""

      }
    },
    computed: {
      okCss(){
        return {"but": true, 'act': this.action == 'COLLECT_OK'}
      },
      cancelCss(){
        return {"but": true, 'act': this.action == 'COLLECT_CANCEL'}
      },
      statusInfo() {
          return this.$store.state.streamData.statusInfo || {};
      }
    },
    mounted(){

    },
    methods: {
      upAct(v){
        this.action = keyAction.focus = v;
      },
      open(_id, _name){
        if(!keyAction.actions[KEY.ENTER]['COLLECT_OK']){
          this.pageEve();
        }
        keyAction.oldFocus = keyAction.focus;
        this.id = _id;
        this.name = _name;
        this.collect();
        this.upAct("COLLECT_OK");
      },
      close(){
        keyAction.focus = keyAction.oldFocus;
        this.action = "";
        this.show = true;
        this.text = "";
        this.$emit("collect-close")
      },
      pageEve(){
          var _vue = this;

          keyAction.add(function () {

            _vue.upAct("COLLECT_OK");
          }, KEY.LEFT, 'COLLECT_CANCEL');

          keyAction.add(function () {

            _vue.upAct("COLLECT_CANCEL");
          }, KEY.RIGHT, 'COLLECT_OK');

          keyAction.add(function () {
            _vue.close();
          }, KEY.ENTER, 'COLLECT_CANCEL');

          keyAction.add(function () {
            _vue.collect(_vue.favorited == true ? "no" : "yes");

          }, KEY.ENTER, 'COLLECT_OK');


        keyAction.add(function () {
          _vue.close();
        }, KEY.BACK, 'COLLECT_CANCEL');

        keyAction.add(function () {
          _vue.close();
        }, KEY.BACK, 'COLLECT_OK');


      },

      collect(status){
        var _stbId = this.statusInfo.stbId || '99616612190002281';
        var _p = {stbNo: _stbId, id: this.id};
        switch (status) {
          case "no":
          case "yes":
            _p.status = status;
            break

        }
        Service.favorites(_p, (s, v) => {
          if (s == "success") {
            if(_p.status) {
              if(this.favorited == false) {
                this.text = v.info.status == "success" ? "您已成功收藏节目：" + this.name : "您收藏节目:"+this.name+",失败。请稍候在试";
              } else {
                this.text = v.info.status == "success" ? "您已成功取消节目：" + this.name+",的收藏" : "您取消节目:"+this.name+",的收藏失败。请稍候在试";
              }
              this.show=false;
              window.setTimeout(()=>{
                  //告诉父组件f2取消收藏成功了,需要重新刷新数据
                  this.$emit('enterOk');
                  this.close()
              },3500);
            } else {

              this.favorited = v.info.status == "success" ? true : false;
              if(this.favorited){
                  this.id=v.info.collectid;
              }
            }

          }
        });
      }
    }
  }
  ;

</script>

<style scoped>
  .CollectBox {
    position: absolute;
    top: 210px;
    left: 390px;
    width: 500px;
    height: 300px;

    background-color: #363439;
    border-radius: 5px;
    opacity: 0.9;
    font-size: 26px;

    color: #fff;
    z-index: 9999;
  }

  .desc {

    padding: 15px;
  }

  .but {

    background-color: #999;
    border-radius: 5px;
    opacity: 0.7;
    width: 136px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin-left: 90px;
    float: left;
    -webkit-transition-duration:0ms;

  }

  .buts {
    position: absolute;
    top: 220px;
    left: 0px;
  }

  .act {
    background-color: transparent;

    border: 2px solid #0a9ad2;
  }


</style>

