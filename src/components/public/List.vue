<template>
  <div>
    <div class="list">
      <div id="list_f" class="list_f" v-show="focus" v-bind:style="{top:(index*59)+'px'}">&nbsp;&nbsp;{{cfocus}}</div>
      <ul>
        <li v-for="(item, index) in items">
          &nbsp;&nbsp; {{index + 1 }}.  {{ item.name || item.cat_name || item.category_caption }}
        </li>
      </ul>
      <div id="page_info" class="pageinfo">&nbsp;第{{page}}页/共{{totalPage}}页</div>
    </div>


    <div id="big_poser" class="big_poster" v-if="isBigPoster">
      <img :src="cont.poster|fposter('BIG')"/>
    </div>
    <div class="video_info" v-else>
      <div class="vleft">
        <div id="smallbg" class="smallbg">
          <img id="small_poster" :src="cont.poster|fposter"/>
        </div>
        <div class="vprice">下片时间：{{cont.downtime | fdowntime}} <br> 原价：{{cont.price}}元/{{cont.category_type=='1'?'集':'部'}} </div>
      </div>
      <div class="vright">
        <div>
          <div id="collect_btn" :class="collectCss">收藏</div>
          <!--<div id="preview_btn" class="vbtn" >预览</div>-->
        </div>
        <div class="clearfix"></div>
        <div id="desc" class="vdesc">
          导演：{{(cont.director || cont.video_director) | fstr(12)}}<br/>
          主演：{{(cont.actor || cont.video_actor) | fstr(16)}}<br/><br/>
          简介：{{(cont.short_desc || cont.video_short_desc) | fstr(60)}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>


  import {FEATURES} from '../../store/mutation-types'
  import Service  from '../../service'
  export default {
    props: ['poster', 'lindex', 'lpage', 'menu', 'action'],
    data(){
      return {

        totalPage: 1,
        items: [],
        index: -1,
        page: 1,
        isBigPoster: true,

        isInit: true,

        cont: {poster: ""},
        pageSize: 7
      }
    },

    mounted(){
      this.isInit = true;
      this.index = Number(this.lindex || 0);
      this.page = Number(this.lpage || 1);
      this.load();
      console.log("List.vue  mounted ...........")
    },

    watch: {
      "menu.id"(n, o){
        if (!this.isInit) {
          this.index = 0;
          this.page = 1;
        }
        this.load();

      },
      index(n, o){
        this.cb();
      }
    },
    computed: {
      cfocus(){
        if (this.items.length == 0) return "";
        var _v = this.items[this.index];

        return (this.index + 1) + "." + (_v.name || _v.cat_name || _v.category_caption);
      },
      focus(){
        return this.action == "LIST";
      },
      collectCss(){
         return {'vbtn':true,'vbtn-focus':this.action == "COLLECT"}
      }

    },
    methods: {
      load(){
        if (this.menu.id) {

          Service.videoList(this.menu.type, {categoryId: this.menu.id, pageSize: this.pageSize, pageNum: this.page},
            (s, v) => {
              this.isInit = false;
              if (s == "success") {
                this.show(v.response, Number(v.pageInfo.totalPage))
              }
            });
        }
      },
      cb(){
        if (this.items.length > 0) {
          this.$emit("cb", this.index, this.items.length, this.items[this.index], this.page)
        }
      },
      show(v1, v2){
        var _f = this.items;
        if (_f.length != 0) {
          _f.splice(0, _f.length);
        }

        var _vue = this;
        v1.forEach(function (d) {
          _vue.items.push(d);
        });
        this.totalPage = v2;
        this.cb();
        this.info();
      },
      info(){

        var _r = true;
        var _cont = {};
        switch (this.menu.type) {
          case FEATURES:
            _cont = {poster: this.items[this.index].poster};
            break
          default:
            if (this.menu.poster) {
              _cont = {poster: this.menu.poster};
            } else {
              _cont = this.items[this.index];
              _r = false;
            }
            break
        }
        this.isBigPoster = _r;
        Object.keys(_cont).forEach((v) => {
          this.$set(this.cont, v, _cont[v]);
        })


      },
      up(){
        if (this.index > 0) {
          this.index--;
          this.info();
        } else {
          this.$emit("switch", KEY.UP, "LIST");
        }
      },
      down(){

        if (this.index == this.items.length - 1 && this.page < this.totalPage) {
          this.pageDown();
        } else if (this.index < this.items.length - 1) {
          this.index++;
          this.info();
        }

      },
      right(){
       if(!this.isBigPoster){
       this.$emit("switch",KEY.RIGHT,"LIST")
       }
      },
      left(){
        this.$emit("switch",KEY.LEFT,"LIST")
      },
      pageDown(){
        if (this.page < this.totalPage) {
          this.page++;
          this.index = 0;
          this.load();
        }
      },
      pageUp(){
        if (this.page > 1) {
          this.page--;
          this.index = 0;
          this.load();
        }
      }

    },
    filters: {

      fdowntime(val) {

        if (!val && val != "") return '暂无';
        return val.substr(3, 4);
      }


    },
    components: {}
  }
</script>

<style scoped>
  *{
    -webkit-transition-duration: 0ms;
    transition-duration:0ms;
  }
  .list {
    position: absolute;
    width: 544px;
    height: 420px;
    left: 58px;
    top: 194px;
    color: #fff;
    font-size: 28px;
    font-weight: bold;
  }

  .list > ul {
    /*position: relative;*/
    list-style: none;
    height: 413px;
  }

  .list > ul li {
    width: 545px;
    height: 59px;
    line-height: 59px;
  }

  #page_info {
    width: 545px;
    height: 59px;
    line-height: 59px;
  }

  .list_f {
    background-color: #f0b101;
    border-radius: 2px;
    color: #000;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 545px;
    height: 59px;
    line-height: 59px;
  }

  .big_poster {
    position: absolute;
    left: 618px;
    top: 194px;
    width: 604px;
    height: 413px;
    background-image: url("../../assets/img/public/movie_bigpicframe.png");
  }

  .big_poster img {
    margin-left: 37px;
    margin-top: 10px;
    width: 551px;
    height: 390px;
  }

  .video_info {
    position: absolute;
    left: 618px;
    top: 194px;
    width: 600px;
    font-size: 26px;
    color: #ffffff;
    font-weight: bold;

  }

  .vleft {
    float: left;
    width: 262px;

  }

  .vright {
    float: left;
    width: 300px;
  }

  .smallbg {
    height: 331px;
    width: 262px;
    background: url(../../assets/img/public/movie_picframe.png) no-repeat;
  }

  .smallbg > img {
    margin-left: 35px;
    margin-top: 10px;
    width: 206px;
    height: 309px;
  }

  .vprice {
    margin-top: 74px;
    text-align: center;
  }

  .vbtn {
    width: 117px;
    height: 39px;
    line-height: 39px;
    text-align: center;
    float: left;
    color: #000;
    margin-right: 15px;
    background: url("../../assets/img/public/but_bg.png") no-repeat;
    font-weight: normal !important;
  }

  .vbtn-focus {
    background: url("../../assets/img/public/but_focus.png") no-repeat;
  }

  .vdesc {
    margin-top: 80px;
  }

  .hide {
    visibility: hidden;
  }


</style>
