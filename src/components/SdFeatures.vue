<template>
  <div :class="colCss">
    <div class="logo"></div>
    <div class="name">{{featureName}}</div>

    <router-view
      v-bind="{'menu':{id:recover.cid},'action':recover.action,lindex:recover.lindex,lpage:recover.page}"
      @cb="mlcb"
      @switch="rswitch"></router-view>

  </div>
</template>

<script>

  export default {

    name: 'sdFeatures',
    data () {
      return {

        column: "",
        litem: {},
        recover: {
          action: "LIST",
          lindex: 0,
          page: 1,
          cid: "",
          //name: "",
          poster:""
        }

      }
    },
    computed: {
        featureName() {
            return this.$store.state.featureName;
        },
      colCss(){
        var _r = {bg: true};
        _r[this.column] = true;
        return _r;
      }
    },
    created: function () {
      this.column = this.$route.params.column || "movie";
    },
    mounted: function () {
      this.pageEve();
    },
    methods: {
      rswitch(_kcode, _f){
        switch (_f) {
          case "LIST":
            switch (_kcode) {
              case KEY.RIGHT:
                this.upAct("COLLECT");
                break;
              default:
                this.upAct("LIST");
                break
            }
            break
        }

      },
      mlcb(_inx, _len, _item, _lpage){
        this.recover.lindex = _inx;
        this.recover.page = _lpage;
        this.litem = _item;

      },
      upAct(v){
        keyAction.focus = this.recover.action = v;
      },
      pageEve(){
        var _vue = this;


        keyAction.add(function () {

          _vue.$children[0].down();

        }, KEY.DOWN, "LIST");


        keyAction.add(function () {

          if (_vue.recover.lindex == 0 && _vue.recover.page > 1) {
            _vue.$children[0].pageUp();
          } else {
            _vue.$children[0].up();
          }

        }, KEY.UP, "LIST");

        keyAction.add(function () {

          _vue.$children[0].right();

        }, KEY.RIGHT, "LIST");
        keyAction.add(function () {

          _vue.$children[0].left();

        }, KEY.LEFT, "COLLECT");


        keyAction.add(function () {
          _vue.$children[0].pageUp();
        }, KEY.PAGEUP);
        keyAction.add(function () {
          _vue.$children[0].pageDown();
        }, KEY.PAGEDOWN);


        keyAction.add(function () {
          var _c = _vue.litem;
          switch (_c.category_type) {
            case"1":
              _vue.push({path: "/sd/episode/" + _vue.column, query: {cid: (_c.id)}});
              break;
            case "0":
              var _f={category_type:_c.category_type,recover:_vue.recover};
              _vue.$emit("play",_c.id,_c.secondname,_f);
              break;
          }

        }, KEY.ENTER, "LIST");



        keyAction.add(function () {

          _vue.$emit("collect",_vue.litem.id,_vue.litem.name)

        }, KEY.ENTER, "COLLECT");

        keyAction.add(function () {
          _vue.back();
        }, KEY.BACK);

      }
    },

    destroyed: function () {


    },
    components: {},

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .name {
    position: absolute;
    left: 120px;
    top: 120px;
    width: 800px;
    height: 50px;
    color: #f1e800;
    font-size: 32px;
  }

</style>
