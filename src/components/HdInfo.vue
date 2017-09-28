<template>
  <div class="hdbg">
    <HdInfoHeader v-bind="{'eaction':recover.action,'id':recover.id,'index':recover.index}" v-on:cb="hcb"
                  @switch="rswitch"></HdInfoHeader>
    <router-view v-bind="{'id':recover.id,'action':recover.action,'index':recover.index,'page':recover.page}" @cb="ecb"
                 @switch="rswitch"></router-view>

  </div>
</template>

<script>
  import HdInfoHeader from './public/HdInfoHeader.vue' ;

  export default {
    name: 'hdInfo',
    data () {
      return {
        item: {},
        recover: {
          id: "",
          action: "btn",
          index: 0,
          page: 1,
          situationid:""

        }

      }
    },
    mounted: function () {
      this.pageEve();
    },
    computed: {
      queryId() {
          return this.$route.query.id;
      }
    },
    watch: {
      queryId(v) {
        this.recover.id = v;
      }
    },
    methods: {
      rswitch(_kcode, _f){
        switch (_f) {
          case "btn":
            switch (_kcode) {
              case KEY.DOWN:
                this.upAct("rec");
                break;
              case KEY.ENTER:
                this.upAct("epi");
                break
            }
            break;
          case "collect":
            this.$emit("collect", this.item.id, this.item.name)
            break;
          case "vod":
            this.play();
            break;
          case"epi":
          case "rec":
            this.upAct("btn");
            break;
          case "arts":
            switch (_kcode) {
              case KEY.DOWN:
                this.upAct("arts");
                break;
              case KEY.UP:
                this.upAct("btn");
                break
            }
            break
        }

      },
      hcb(_inx, _item){
        this.recover.index = _inx;
        if (_item) {
          this.item = _item;
        }
      },

      ecb(_inx, _item, _page,_maxEpi){
        this.recover.index = _inx;
        this.recover.page = _page;
        this.item = _item;
        this.recover.maxEpi=_maxEpi;
      },
      upAct(v){
        keyAction.focus = this.recover.action = v;
      },
      play(){

        var _f={category_type:this.item.category_type,recover:this.recover};
        if(this.recover.situationid!=""){
          _f.situationid=this.recover.situationid;
        }
        //console.log(_f);  //如果是cep的影片播放时多传一个situationid
        this.$emit("play",this.item.id,this.item.name,_f);
      },
      pageEve(){
        var _vue = this;

        keyAction.add(function () {
          switch (this.focus) {
            case"btn":
              _vue.$children[0].left();
              break
            case "epi":
            case "rec":
            case "arts":
              _vue.$children[1].left();
              break
          }
        }, KEY.LEFT);

        keyAction.add(function () {
          switch (this.focus) {
            case"btn":
              _vue.$children[0].right();
              break
            case "epi":
            case "rec":
            case "arts":
              _vue.$children[1].right();
              break
          }
        }, KEY.RIGHT);


        keyAction.add(function () {
          switch (this.focus) {
            case"btn":
              _vue.$children[0].down();
              break
            case "epi":
            case "arts":
              _vue.$children[1].down();
              break
          }
        }, KEY.DOWN);
        keyAction.add(function () {
          switch (this.focus) {
            case"epi":
            case"rec":
            case "arts":
              _vue.$children[1].up();
              break
          }
        }, KEY.UP);


        keyAction.add(function () {
              _vue.$children[0].enter();
        }, KEY.ENTER, "btn");

        keyAction.add(function () {
          _vue.play();
        }, KEY.ENTER, "epi");

        keyAction.add(function () {
          _vue.play();
        }, KEY.ENTER, "arts");
        keyAction.add(function () {
          //console.log(_vue.$children[1].$children[0])
          _vue.$children[1].$children[0].cb();
          //console.log(_vue.item)
          var _cid=_vue.item.id;
          if(!_cid){
            _cid=_vue.item.category_id.split(",")[0].trim()+"_"+ _vue.item.contid
          }
          _vue.recover.situationid=_vue.item.situationid;
          _vue.recover.id=_cid;

        }, KEY.ENTER, "rec");

        keyAction.add(function () {

          _vue.$children[1].pageUp();

        }, KEY.PAGEUP, "epi");
        keyAction.add(function () {

          _vue.$children[1].pageDown();

        }, KEY.PAGEDOWN, "epi");
        keyAction.add(function () {
          _vue.back();
        }, KEY.BACK);

      }

    },
    components: {HdInfoHeader}

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hdbg {
    font-size: 24px;
    color: #958c96;
    width: 1280px;
    height: 720px;
    background: url(../assets/img/hd/common_bg.png) no-repeat left top;
  }


</style>
