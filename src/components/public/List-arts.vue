<template>
  <div :class="{s3:s3}">
    <div class="list">
      <div id="list_f" class="list_f" v-show="focus" v-bind:style="{top:(index*focusStep)+'px'}">&nbsp;&nbsp;{{cfocus|fstr(22)}}</div>
      <ul>
        <li v-for="(item, index) in items">
          &nbsp;&nbsp; {{index + 1 }}.  {{ (item.name || item.cat_name || item.category_caption)|fstr(22)  }}
        </li>
      </ul>
      <div id="page_info" class="pageinfo">&nbsp;第{{page}}页/共{{totalPage}}页</div>
    </div>
    <div class="poster" v-if="!recList.length">
      <img :src="s2poster|fposter('BIG')"     width="432px" height="444px"/>
      <div class="icon5" v-show="icon5_show"></div>
    </div>

    <!--新闻推荐位-->
    <div class="poster" v-if="recList.length">
      <img :src="recList[0].img_url|fposter('HD_HUNPAI')"  width="432px" height="444px"/>
      <div class="recFocus" v-show="recShow"></div>
    </div>

  </div>
</template>

<script>
  //综艺，体育,生活专用模板
  import { FEATURES} from '../../store/mutation-types'

  import Service  from '../../service'
  export default {
    props: ['lindex', 'lpage','menu','action','poster'],
    data(){
      return {
        totalPage: 1,
        items: [],
        index: -1,
        page: 1,

        isInit: true,

        pageSize: 8,
        s3:false,
        focusStep:58.5,
        icon5_show: true,
        recList: [],
        recShow: false
      }
    },
    created(){
      this.isInit = true;
      switch (this.$store.state.column){
        case "culture":
             this.pageSize=7;
             this.s3=true;
             this.focusStep=59;
            break;
        case "news":
          this.pageSize=7;
          this.focusStep=60;
            break;
        case "life":
            this.icon5_show=false;
            break
      }


    },
    mounted(){
      this.index = Number(this.lindex || 0);
      this.page = Number(this.lpage || 1);
      this.isInit = true;
      this.load();

      //表示news板块
      if (this.$route.path.indexOf('news') != -1) {
          this.reqRec();
      }
    },

    destroyed(){
      console.log("list.vue destoryed................")
    },

    watch: {
      'menu.id'(n, o){
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
        if (this.index == 7) return "";
        var _v = this.items[this.index];

        return (this.index + 1) + "." + (_v.name || _v.cat_name || _v.category_caption);
      },
      focus(){
        return this.action == "LIST" && !this.recShow;
      },
      s2poster(){
        if (this.items.length == 0) return "";
        var _p='';
        if(this.$store.state.featurePic){
            _p=this.$store.state.featurePic;
        }else{
           _p=this.$store.state.menus[0].poster||this.items[this.index].poster;
        }
        return _p ;
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
      reqRec() {
        Service.Recommend({categoryId: '1084028', pageSize:1, pageNum: 1}, (s, v) => {
            if (s == "success") {
                if (v.response.length) {
                  this.recList = v.response;
                }
                console.log(this.recList)
            }
        })
      },
      cb(){
        if (this.items.length > 0 &&  !this.recShow) {
          this.$emit("cb", this.index, this.items.length, this.items[this.index], this.page)
        } else {
            this.$emit('cb', this.index, this.items.length,this.items[this.index], this.page, this.recList[0])
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

      },
      up(){
        if (this.index > 0) {
          this.index--;
        }else {
          this.$emit("switch", KEY.UP, "LIST");
        }
      },
      down(){

        if (this.index == this.items.length - 1 && this.page < this.totalPage) {
          this.pageDown();
        } else if (this.index < this.items.length - 1) {
          this.index++;

        }

      },
      left(){
        if (this.recShow) {
            this.recShow = false;
            this.cb();
        }
      },
      right(){
          //表示news板块
          if (this.recList.length) {
              this.recShow = true;
              this.cb();
          }
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
    left: 52px;
    top: 167px;

    width: 544px;
    height: 420px;

    color: #fff;
    font-size: 28px;
    font-weight: bold;
  }

  .list > ul {

    list-style: none;
    height: 413px;
  }

  .list > ul li {
    width: 700px;
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
    width: 710px;
    height: 59px;
    line-height: 59px;
  }
  .pageinfo {
    position: absolute;
    left: 710px;
    top: 460px;
    width: 470px;
    height: 59px;
    line-height: 59px;
    text-align: center;

  }
  .icon5 {
    position: absolute;
    width: 432px;
    height: 43px;
    left: 0px;
    top: 0px;
    background:url(../../assets/img/5icon.png) no-repeat;
    background-size:contain;
  }
  .recFocus{
    position: absolute;
    width: 432px;
    height: 445px;
    left: -6px;
    top: -6px;
    border: 5px solid darkorange;
    background-size:contain;
  }
  .poster{
    position: absolute;
    left: 778px;
    top: 178px;
  }




  .s3 .list{
    top: 190px;
  }
  .s3 .list_f{
    width: 695px;
    left:8px;
    height:61px;
  }
  .s3 .pageinfo{
    left: 380px;
    top: 420px;
    width: 320px;
  }
  .s3 .poster{
    position: absolute;
    left: 796px;
    top: 200px;
  }
  .s3 .poster img{
    width:435px;
  }





</style>
