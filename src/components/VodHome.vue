<template>
  <div class="bg">
    <div class="focus" :style="{ left: fLeft + 'px',top: fTop + 'px'}"></div>
  </div>
</template>

<script>
  export default {

    name: 'VodHome',
    mounted: function () {
      this.eff();
      this.pageEve();
    },
    data(){
      return {
        links: [
          {name: "点播推荐", link: '/sd/home/hot/list'},
          {name: "视赢家", link: '/economy'},
          {name: "智学堂", link: '/education'},
          {name: "电影", link: '/sd/home/movie'},
          {name: '电视剧', link: '/sd/home/tv'},
          {name: '动漫', link: '/sd/home/animation'},
          {name: '综艺', link: '/sd/home/arts/s2'},
          {name: '体育', link: '/sd/home/sports/s2'},
          {name: '文化', link: '/sd/home/culture/s2'},
          {name: '新闻', link: '/sd/home/news/s2'},
          {name: '生活', link: '/sd/home/life/s2'},
          {name: 'VIP', link: '/vip'}
        ],

        fLeft: 364,
        fTop: 184,
        recover:{
            index:0
        }
      }
    },

    methods: {
      left(){

        this.recover.index=(this.recover.index>0?--this.recover.index:this.links.length-1);
        this.eff();
      },
      right(){
        this.recover.index=(this.recover.index<this.links.length-1?++this.recover.index:0);
        this.eff();
      },
      up(){
        this.recover.index=(this.recover.index-4>=0?this.recover.index-4:this.recover.index);
        this.eff();

      },
      down(){
        this.recover.index=(this.recover.index+4<=this.links.length-1?this.recover.index+4:this.recover.index);
        this.eff();
      },
      eff(){
        var _x=this.recover.index%4;
        var _y=Math.floor(this.recover.index/4);

        this.fLeft=364+_x*210;
        this.fTop=184+_y*158;
      },
      pageEve(){
        var _vue = this;
        keyAction.add(function () {
          _vue.right();
        }, KEY.RIGHT);
        keyAction.add(function () {
          _vue.left();
        }, KEY.LEFT);
        keyAction.add(function () {
          _vue.up();
        }, KEY.UP);
        keyAction.add(function () {
          _vue.down();
        }, KEY.DOWN);
        keyAction.add(function () {
          var _p=_vue.links[_vue.recover.index].link.toString();
          _vue.push({path:_p});
        }, KEY.ENTER);

        keyAction.add(function () {
           _vue.back();
        },KEY.BACK);

      }
    }

  }
</script>

<style scoped>
  .bg {
    width: 1280px;
    height: 720px;
    background-image: url("../assets/img/vod/vod_navigate_bg.jpg");
    position: relative;
  }

  .focus {
    width: 220px;
    height: 155px;
    background-image: url("../assets/img/vod/posterfocus2.png");
    background-size: 217px 153px;
    position: absolute;

  }

</style>
