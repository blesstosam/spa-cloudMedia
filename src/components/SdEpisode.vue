<template>
  <div :class="colCss">
    <div class="logo"></div>
    <Episode ref="epi" v-bind="{ 'cid':recover.cid, 'rpage':recover.rpage, 'rinx':recover.rinx,'focus':recover.efocus}"
             v-on:cb="epicb"></Episode>

    <CepList ref="cep" v-bind="{rfcous:recover.rfcous,rindex:recover.rcinx,id:recover.cid,wColumn:column}" v-on:cb="cepcb"></CepList>
  </div>
</template>

<script>
  import Episode from './public/Episode.vue' ;
  import CepList from './public/Cep4.vue' ;

  export default {
    name: 'TvEpisode',
    created: function () {
      this.column = this.$route.params.column || "movie";
      this.$store.commit("upstate", {column: this.column});
    },
    mounted: function () {
      this.pageEve();
    },
    data () {
      return {
        eitem: {},
        elen: 0,
        cep: {},
        column: "",

        recover: {
          action: "LIST",
          rpage: 1,
          rinx: 0,
          cid: "",
          efocus: true,
          rfcous: false,
          rcinx: 0,
          situationid:'',
          maxEpi:0

        }
      }
    },
    computed: {
      colCss(){
        var _r = {bg: true};
        _r[this.column + "-episode"] = true;
        return _r;
      },
      //监听路由参数变化
      queryCid() {
          return this.$route.query.cid;
      }
    },
    watch: {
      queryCid(v){
          this.recover.cid = v;
      }
    },
    methods: {
      pageEve(){
        var _vue = this;
        var _epi = this.$refs.epi;
        var _cep = this.$refs.cep;

        /* keyAction.add(function () {
         _vue.push({path: '/sd/episode/tv', query: {cid : '1013130_2384696OOOOOOOOOOOO3'}})
         }, KEY.NUMBER1);*/
        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              _epi.down();
              break;
            case "CEP":
              _cep.down();
              break;
          }

        }, KEY.DOWN);
        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              _epi.up();
              break;
            case "CEP":
              _cep.up();
              break
          }

        }, KEY.UP);

        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              _epi.left();
              break;
            case "CEP":
              switch (_vue.recover.rcinx) {
                case 0:
                case 2:
                  keyAction.focus = "LIST";
                  _vue.recover.efocus = true;
                  _vue.recover.rfcous = false;
                  break;
                default:
                  _cep.left();
                  break
              }

              break
          }

        }, KEY.LEFT);
        keyAction.add(function () {
          switch (this.focus) {
            case "LIST":
              if (_vue.recover.rinx == _vue.elen - 1 || (_vue.recover.rinx != 0 && (_vue.recover.rinx + 1) % 10 == 0)) {
                keyAction.focus = "CEP";
                _cep.callback();   //第一次手动触发Cep4组件的callback
                _vue.recover.efocus = false;
                _vue.recover.rfcous = true;
              } else {
                _epi.right();
              }
              break;
            case "CEP":
              _cep.right();
              break
          }
        }, KEY.RIGHT);


        keyAction.add(function () {
          _epi.pageDown();
        }, KEY.PAGEDOWN, "LIST");

        keyAction.add(function () {
          _epi.pageUp();
        }, KEY.PAGEUP, "LIST");

        keyAction.add(function () {
            var _a = _vue.eitem;
            var _f={category_type:_a.category_type,recover:_vue.recover};
            //如果是cep的影片要多传一个参数
            if(_vue.recover.situationid!=""){
                _f.situationid=_vue.recover.situationid;
            }
            _vue.$emit('play',_a.id,_a.name,_f)
        }, KEY.ENTER,'LIST');

        keyAction.add(function () {
            //如果CEP4的index没变，要手动触发callback()
            _cep.callback();
            console.log(_vue.cep);

            //先判断该推荐影片是否是单剧集
            var _isSingle=_vue.cep.is_series=='Y';
            var _cid=_vue.cep.id;
            if(!_cid){
                _cid=_vue.cep.category_id.split(",")[0].trim()+"_"+ _vue.cep.contid;
                _isSingle=_vue.cep.category_type=='1';
            }

            if(_isSingle){
                //传递一个唯一id
                if(_vue.recover.situationid){
                  _vue.push({path:'/sd/info',query:{id:_cid,situationid:_vue.recover.situationid}})
                }else{
                    _vue.push({path:'/sd/info',query:{id:_cid}});
                }
            }else{
                //改变recover.cid
                _vue.recover.situationid=_vue.cep.situationid;
                _vue.recover.cid=_cid;
            }
        }, KEY.ENTER,'CEP');

        keyAction.add(function () {
          _vue.back();
        }, KEY.BACK)

      },
      epicb(_item, _inx, _len, _maxEpi){
        this.eitem = _item;
        this.elen = _len;
        this.recover.rinx = _inx;
        this.recover.maxEpi=_maxEpi;         //拿到电视剧的最大集数
      },
      cepcb(_item, _inx){
        console.log("cepcb..",_item,_inx);
        this.cep = _item;
        this.recover.rcinx = _inx;
      }
    },
    components: {Episode, CepList}
  }


</script>


<style scoped>


</style>
