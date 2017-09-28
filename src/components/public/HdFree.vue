<template>
  <div class="free">
    <template v-if="items.length>0">
      <div class="fl">
        <div class="h1">今日限免</div>

        <div class="detail">
          <img :src="items[0].poster|fposter('HD')" alt="poster">
          <div class="info">
            <p class="title">{{items[0].name}}</p>
            <p class="director">导演：{{items[0].director}}</p>
            <p class="actor">演员：{{items[0].actor}}</p>
            <p class="desc">{{items[0].shortDesc | fstr(25)}}</p>
          </div>
        </div>
      </div>
      <div class="price">原价{{items[0].price}}元</div>
      <div :class="{play:true,bfocus:focus&&index==0}"><i class="arrow"></i>&nbsp;播放</div>
    </template>
    <div class="fr">
      <div class="h1">下期预告</div>
      <div class="poster">

        <div class="pitem" v-for="(item, i) in items" v-if="i>0">

          <img :src="item.poster|fposter('HD')">

          <div class="pfocus" v-if="focus&&index==i">
            <div class="ftitle">{{item.name | fstr(4)}}</div>
            <div class="fdesc">{{item.shortDesc | fstr(18) }}</div>
          </div>
          <div class="bom">
            <div class="price">{{item.price}}元</div>
            <div :class="{but:true,b2focus:focus&&index==i+4}">提前收看</div>
          </div>

        </div>
      </div>

    </div>
    <div class="qrcode"></div>

  </div>
</template>
<script>
  import Service from '../../service/index';
  export default {
    props: ['focus', 'lindex', 'lpage', 'menu','loadEve'],
    data(){
      return {

        items: [],
        index: 0,
        max: 0,
        isInit: true
      }
    },
    mounted(){
       this.index=Number(this.lindex);
       console.log("hdFree.vue mounted...................",this.menu.id,this.$route.path)
       //this.load();
    },
    watch: {
      loadEve(){
        console.log("hdFree.vue loadEve...................",this.$route.path) ;
        this.load();
      },

      index(){
        this.cb();
      }
    },
    methods: {
      load(){
        if (this.menu.id) {
          Service.videoList(this.menu.type, {pageSize: 5, categoryId: this.menu.id, starttime: this.today2str()}, (s, v) => {
            this.isInit = false;
            if (s == "success") {
              var _f = this.items;
              if (_f.length != 0) {
                _f.splice(0, _f.length);
              }
              var _d = v.list || v.response;
              _d.forEach(function (_v) {
                _f.push(_v);
              })
              this.max = (_d.length - 1) * 2 + 1;
              this.cb();
            }
          });
        }
      },
      today2str(){
        var d = new Date();
        return d.getUTCFullYear() + "-" + (Number(d.getUTCMonth()) + 1) + "-" + d.getDate();
      },

      //index -> 0:but0 1:p0 2:p1 3:p2 4:p3 5：but1 6:but2 7:but3 8:but4
      left(){
        switch (this.index) {
          case 1:
          case 5:
          case 3:
          case 7:
            this.index = 0;
            break
          default:
            if (this.index != 0) {
              this.index--;
            }
            break
        }
      },
      right(){
        var v = Math.ceil(this.max / 2);

        if (this.index < v) {
          this.index = (this.index != v - 1 ? ++this.index : 1)
        } else {
          this.index = (this.index != this.max - 1 ? ++this.index : v)
        }

     },
      up(){
        switch (this.index) {
          case 0:
          case 1:
          case 2:
              this.$emit("switch",KEY.UP,"free")
              break
          case 3:
          case 4:
            this.index+=2;
              break
          case 5:
          case 6:
          case 7:
          case 8:
            this.index-=4;
            break;
        }

      },
      down(){
        switch (this.index) {

          case 1:
          case 2:
          case 3:
          case 4:
              this.index+=4;
              break
          case 5:
          case 6:
            this.index-=2;
              break

        }
      },
      cb(){

        var _dataInx=this.index>4?this.index-4:this.index;
        this.$emit("cb",this.index,1,this.items[_dataInx],0);
      }

    },


  }
</script>
<style scoped>
  .free {
    width: 1160px;
    height: 580px;
    position: absolute;
    left: 75px;
    top: 120px;
    border-top: 1px solid #206897;
    display: flex;
    font-weight: bold;
    font-size: 26px;
    color: #958c96;
  }

  .but, .play {
    box-sizing: border-box;
  }

  .bfocus {
    border: 3px solid #206897;
    background: #3C3951 !important;
  }

  .b2focus {

    border: 2px solid #206897;
  }

  .pfocus {
    width: 135px;
    height: 175px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(23, 93, 227, 0.5);
    z-index: 1000;
    color: #fff;
    text-align: center;
    padding: 0 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ftitle {
    font-size: 22px;
    line-height: 50px;
  }

  .fdesc {
    height: 75px;
    font-size: 18px;
    overflow: hidden;
    font-weight: normal;

  }

  .arrow {
    display: inline-block;
    width: 0;
    height: 0;
    font-style: normal;
    border: 12px solid transparent;
    border-left: 18px solid #B8B7C0;

  }

  .h1 {
    line-height: 60px;
  }

  .fl {
    width: 65%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-left: 30px;
  }

  .fr {
    width: 35%;
  }

  .fl .detail {
    display: flex;
  }

  .fl .info {
    flex: 1;
  }

  .free > .price {
    position: absolute;
    left: 49px;
    top: 420px;
    width: 141px;
    height: 67px;
    color: #00a0e9;
    line-height: 58px;
    background: url('../../assets/img/hd/price_gbr.png') no-repeat;
    background-size: 100% 100%;
    padding: 0 18px;
  }

  .free > .play {
    position: absolute;
    left: 278px;
    top: 421px;
    width: 140px;
    height: 55px;
    border-radius: 40px;
    background: #636073;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #B8B7C0;
  }

  .fl img {
    width: 230px;
    height: 312px;
    margin-right: 15px;
  }

  .fl .title {
    font-size: 28px;
    color: #FABD00;
  }

  .fl p {
    font-size: 26px;
  }

  .fl p:last-child {
    margin-top: 15px;
  }

  .fr .poster {
    width: 310px;
    height: 480px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }

  .fr .pitem {
    /* margin-top:15px;
     margin-right:10px;
     float:left;*/
    position: relative;

  }

  .fr img {
    width: 135px;
    height: 175px;
  }

  .fr .bom {
    display: flex;
    margin-top: 5px;
  }

  .fr .price {
    width: 53px;
    height: 38px;
    font-size: 15px;
    line-height: 39px;
    text-align: center;
    border-radius: 50px;
    color: #fff;
    border: 2px solid #59566A;

  }

  .fr .but {
    width: 80px;
    height: 38px;
    border-radius: 40px;
    background: #636073;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: normal;
  }

  .qrcode {
    position: absolute;
    left: 600px;
    top: 380px;
    width: 74px;
    height: 90px;
    background: url('../../assets/img/hd/twoCode.png') no-repeat;
  }
</style>
