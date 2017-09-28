<template>
  <div class="index">
    <div class="header-before"></div>
    <ul class="header">
      <li v-for="(k,index) in menus" :class="{on:mindex==index}">
        <div :class="{home:k.flag=='home'}" style="webkit-transition-duration: 0ms;">{{k.name }}</div>
      </li>
    </ul>

    <div class="header-after"></div>

    <div class="focus" :style="pfocus"></div>

    <div class="wap">
      <ul class="container">
        <!-- 首页 -->
        <li id="menu0-container" :class="{on:smenuCss('home')}">
          <ul>
            <!-- 首页1 -->
            <li style="left: 0px;">
              <div id="home0" :class="{'home-poster':true, 'cell0':true ,'cellFocus':itemCss('home',0)}">
                <img src="../assets/img/index/vod-poster.jpg">
              </div>
              <ul class="home-nav">
                <li id="home1" :class="{'huikan':true, 'cell1':true ,'cellFocus':itemCss('home',1)}">回看</li>
                <li id="home2" :class="{'myorder':true, 'cell2':true ,'cellFocus':itemCss('home',2)}">我的订购</li>
                <li id="home3" :class="{'shequ':true,'cell3':true , 'cellFocus':itemCss('home',3)}">智慧社区</li>
              </ul>
              <div id="home4" :class="{'home-poster1':true,'cell4':true,'cellFocus':itemCss('home',4)}">
                <img src="../assets/img/index/11.jpg">
              </div>
              <div id="home5" :class="{'home-poster2':true,'cell5':true,'cellFocus':itemCss('home',5)}">
                <img src="../assets/img/index/22.jpg">
              </div>
              <div id="home6" :class="{'home-hot':true,'cell6':true,'cellFocus':itemCss('home',6)}">
                <img src="../assets/img/index/33.jpg">
              </div>

            </li>
            <!-- 首页2 -->
            <li style="left: 1280px;">
              <div id="home7" :class="{'home-poster3':true,'cell7':true,'cellFocus':itemCss('home',7)}">
                <img src="../assets/img/index/11-1.jpg">
              </div>
              <div id="home8" :class="{'home-poster4':true,'cell8':true,'cellFocus':itemCss('home',8)}">
                <img src="../assets/img/index/11-2.jpg">
              </div>
              <div id="home9" :class="{'home-poster5':true,'cell9':true,'cellFocus':itemCss('home',9)} ">
                <img src="../assets/img/index/11-3.jpg">
              </div>
              <div id="home10" :class="{'home-poster6':true,'cell10':true,'cellFocus':itemCss('home',10)}">
                <img src="../assets/img/index/11-4.jpg">
              </div>
              <div id="home11" :class="{'home-poster7':true,'cell11':true,'cellFocus':itemCss('home',11)}">
                <img src="../assets/img/index/11-5.jpg">
              </div>
              <div id="home12" :class="{'home-poster8':true,'cell12':true,'cellFocus':itemCss('home',12)}">
                <img src="../assets/img/index/11-6.jpg">
              </div>
            </li>
          </ul>
        </li>

        <!-- 频道 -->
        <li id="menu1-container" :class="{on:smenuCss('pd')}">
          <div class="channel-c1">
            <div id="pd0" :class="{'more-channel':true,'cell0':true,'cellFocus':itemCss('pd',0)}"></div>
            <div id="pd1" :class="{'huikan-channel':true,'cell1':true,'cellFocus':itemCss('pd',1)}"></div>
            <div id="pd2" :class="{'hd-channel':true,'cell2':true,'cellFocus':itemCss('pd',2)}"></div>
          </div>
          <div id="pd3" :class="{'channel-c2':true,'cell3':true,'cellFocus':itemCss('pd',3)}">
            <img src="../assets/img/index/2-1.png">
          </div>
          <div class="channel-c3">
            <div id="pd4" :class="{'channel1':true,'cell4':true,'cellFocus':itemCss('pd',4)}">
              <img src="../assets/img/index/2-2.png" width="429" height="208">
            </div>
            <div id="pd5" :class="{'channel2':true,'cell5':true,'cellFocus':itemCss('pd',5)}">
              <img src="../assets/img/index/2-3.png" width="206" height="208">
            </div>
            <div id="pd6" :class="{'channel3':true,'cell6':true,'cellFocus':itemCss('pd',6)}">
              <img src="../assets/img/index/2-4.png" width="206" height="208">
            </div>
          </div>
          <div id="pd7" :class="{'channel-c4':true,'cell7':true,'cellFocus':itemCss('pd',6)}  ">
            <img src="../assets/img/index/2-5.png" width="244" height="425">
          </div>
        </li>

        <!-- 点播 -->
        <li id="menu2-container" :class="{on:smenuCss('db')}">
          <div class="vod-c1">
            <div id="db0" class="vod-hd cell0"></div>
            <div id="db1" class="vod-sd cell1"></div>
            <div id="db2" class="vod-record cell2"></div>
          </div>
          <div id="db3" class="vod-c2 cell3">
            <img src="../assets/img/index/3-1.jpg" width="244" height="425">
          </div>
          <div class="vod-c3">
            <div id="db4" class="vod-cell cell4">
              <img src="../assets/img/index/3-2.jpg" width="206" height="208">
            </div>
            <div id="db5" class="vod-cell cell5">
              <img src="../assets/img/index/3-3.jpg" width="206" height="208">
            </div>
            <div id="db6" class="vod-cell cell6">
              <img src="../assets/img/index/3-4.jpg" width="206" height="208">
            </div>
            <div id="db7" class="vod-cell cell7">
              <img src="../assets/img/index/3-5.jpg" width="206" height="208">
            </div>
          </div>
          <div id="db8" class="vod-c4 cell8">
            <img src="../assets/img/index/3-6.jpg" width="244" height="425">
          </div>
        </li>

        <!-- 大片 -->
        <li id="menu3-container" :class="{on:smenuCss('dp')}">
          <div class="movie-c1">
            <div class="btn-movie-more  cell0"></div>
            <div class="btn-movie-classic  cell1"></div>
          </div>
          <ul class="movie-c2">
            <li class=" cell2">
              <img src="../assets/img/index/4-1.jpg" width="297" height="425">
            </li>
            <li class=" cell3">
              <img src="../assets/img/index/4-2.jpg" width="297" height="425">
            </li>
            <li class=" cell4">
              <img src="../assets/img/index/4-3.jpg" width="297" height="425">
            </li>
          </ul>
        </li>

        <li id="menu4-container" :class="{on:smenuCss('yl')}">
          <div class="yule-c1">
            <div class="btn-yule-more cell0"></div>
            <div class="btn-yule-game cell1"></div>
          </div>
          <div class="yule-c2 cell2">
            <img src="../assets/img/index/5-1.jpg" width="556" height="419">
          </div>
          <div class="yule-c3">
            <div class="yule-cell cell3">
              <img src="../assets/img/index/5-2.jpg" width="292" height="203">
            </div>
            <div class="yule-cell cell4">
              <img src="../assets/img/index/5-3.jpg" width="292" height="203">
            </div>
          </div>
        </li>

        <!-- 教育 -->
        <li id="menu5-container" :class="{on:smenuCss('jy')}">
          <div class="edu-c1">
            <div class="btn-edu-more cell0"></div>
            <div class="btn-edu-game cell1"></div>
          </div>
          <div class="edu-c2 cell2">
            <img src="../assets/img/index/6-1.jpg" width="556" height="419">
          </div>
          <div class="edu-c3">
            <div class="edu-cell cell3">
              <img src="../assets/img/index/6-2.jpg" width="292" height="203">
            </div>
            <div class="edu-cell cell4">
              <img src="../assets/img/index/6-3.jpg" width="292" height="203">
            </div>
          </div>
        </li>
        <!-- 专区 -->
        <li id="menu6-container" :class="{on:smenuCss('zq')}">
          <ul>
            <li class="cell0">
              <img src="../assets/img/index/7-1-1.jpg" width="135" height="135">
              永乐社区
            </li>
            <li class="cell1">
              <img src="../assets/img/index/7-2.jpg" width="135" height="135">
              ICNTV
            </li>
            <li class="cell2">
              <img src="../assets/img/index/7-1.jpg" width="135" height="135">
              爱奇艺
            </li>
            <li class="cell3">
              <img src="../assets/img/index/7-2.jpg" width="135" height="135">
              社交电视
            </li>
            <li class="cell4">
              <img src="../assets/img/index/7-1.jpg" width="135" height="135">
              娱乐导航
            </li>
            <li class="cell5">
              <img src="../assets/img/index/7-2.jpg" width="135" height="135">
              彩票
            </li>
            <li class="cell6">
              <img src="../assets/img/index/dianbovpg.png" width="135" height="135">
              云媒体流化
            </li>
            <li class="cell7">
              <img src="../assets/img/index/7-2.jpg" width="135" height="135">
            </li>
          </ul>
        </li>

        <!-- 万事通 -->
        <li id="menu7-container" :class="{on:smenuCss('wst')}">
          <div class="know-c1">
            <div class="btn-know-more cell0"></div>
            <div class="btn-know-hongdun cell1"></div>
          </div>
          <div class="know-c2 cell2">
            <img src="../assets/img/index/8-1.jpg" width="262" height="425">
          </div>
          <div class="know-c3">
            <div class="know1 cell3">
              <img src="../assets/img/index/8-2.jpg" width="395" height="204">
            </div>
            <div class="know2 cell4">
              <img src="../assets/img/index/8-3.jpg" width="192" height="203">
            </div>
            <div class="know3 cell5">
              <img src="../assets/img/index/8-4.jpg" width="192" height="203">
            </div>
          </div>
          <div class="know-c4 cell6">
            <img src="../assets/img/index/8-5.jpg" width="262" height="425">
          </div>
        </li>

        <!-- 应用 -->
        <li id="menu8-container" :class="{on:smenuCss('yy')}">
          <div class="app-c1">
            <div class="btn-app-more cell0"></div>
            <div class="btn-app-hongdun cell1"></div>
          </div>
          <div class="app-c2 cell2">
            <img src="../assets/img/index/9-1.jpg" width="262" height="425">
          </div>
          <div class="app-c3">
            <div class="app1 cell3">
              <img src="../assets/img/index/9-2.jpg" width="395" height="204">
            </div>
            <div class="app2 cell4">
              <img src="../assets/img/index/9-3.jpg" width="192" height="203">
            </div>
            <div class="app3 cell5">
              <img src="../assets/img/index/9-4.jpg" width="192" height="203">
            </div>
          </div>
          <div class="app-c4 cell6">
            <img src="../assets/img/index/9-5.jpg" width="262" height="425">
          </div>
        </li>

        <!-- 营业厅 -->
        <li id="menu9-container" :class="{on:smenuCss('end')}">
          <ul class="yyt-c1">
            <li class="cell0">
              <img src="../assets/img/index/btn-yyt-yingyeting.jpg">
            </li>
            <li class="cell1">
              <img src="../assets/img/index/btn-yyt-cuxiao.jpg">
            </li>
            <li class="cell2">
              <img src="../assets/img/index/btn-yyt-tuijian.jpg">
            </li>
            <li class="cell3">
              <img src="../assets/img/index/btn-yyt-chongzhi.jpg">
            </li>
            <li class="cell4">
              <img src="../assets/img/index/btn-yyt-gongchengshi.jpg">
            </li>

            <li class="cell5">
              <img src="../assets/img/index/btn-yyt-help.jpg">
            </li>

            <li class="cell6">
              <img src="../assets/img/index/btn-yyt-free.jpg">
            </li>
            <li class="cell7">
              <img src="../assets/img/index/btn-yyt-service.jpg">
            </li>

            <li class="cell8">
              <img src="../assets/img/index/btn-yyt-vodpay.jpg">
            </li>
            <li class="cell9">
              <img src="../assets/img/index/btn-yyt-kuandai.jpg">
            </li>
          </ul>
          <div class="yyt-c2">
            <img src="../assets/img/index/10-1.jpg">
          </div>
        </li>


      </ul>
    </div>

    <div class="left-more">更多</div>
    <div class="right-more">更多</div>
  </div>
</template>

<script>
  import Service from '../service/index'
  export default {
    name: 'Index',
    created() {
      keyAction.focus = "MENU";
    },
    mounted: function () {
      this.pageEve();
    },
    updated: function () {
      console.log("updated")
    },
    activated: function () {
      console.log("activated")
    },
    deactivated: function () {
      console.log("deactivated")
    },
    destroyed: function () {

    },
    filters: {},
    computed: {
      pfocus(){


        var _d = {left: (70 + 141 * this.mindex) + 'px', top: '112px', width: '128px', height: '60px'};
        if (this.kfocus == "SMENU") {
          var _b = this.getVideoSize(this.menus[this.mindex].flag + this.sindex);
          _d = {left: (_b.left - 2) + 'px', top: (_b.top - 2) + 'px', width: _b.width + 'px', height: _b.height + 'px'}

        }

        return _d;
      }
    },
    methods: {
      pageEve(){
        var _vue = this;
        keyAction.add(function () {
          if (_vue.menus[_vue.mindex].flag == "home") {
            return false;
          } else if (_vue.mindex == 0) {
            var _t = _vue.menus;
            var _f = _t.pop();
            _t.splice(0, 0, _f);
          } else {
            _vue.mindex -= 1;
          }
          _vue.sindex = 0;

        }, KEY.LEFT, "MENU");
        keyAction.add(function () {
          if (_vue.menus[_vue.mindex].flag == "end") {
            return false;
          } else if (_vue.mindex == _vue.mshowMaxIndex) {
            var _t = _vue.menus;
            var _v = _t.splice(0, 1);
            _t.push(_v[0]);
          } else {
            _vue.mindex++;
          }
          _vue.sindex = 0;
        }, KEY.RIGHT, "MENU");
        keyAction.add(function () {
          if (_vue.mindex == 0 || _vue.mindex == 1 || _vue.mindex == 2) {
            _vue.kfocus = "SMENU";
            keyAction.focus = "SMENU";
          }

        }, KEY.DOWN, "MENU");

        keyAction.add(function () {
          switch (_vue.mindex) {
            case 0:
              switch (_vue.sindex) {
                case 0:
                case 3:
                  _vue.sindex = 4;
                  break;
                case 1:
                  _vue.sindex = 2;
                  break;
                case 2:
                  _vue.sindex = 3;
                  break;
                case 4:
                  _vue.sindex = 5;
                  break;
              }
              break;
            case 1:
              switch  (_vue.sindex) {
                case 0:
                case 1:
                case 2:
                  _vue.sindex = 3;
                  break;
                case 3:
                    _vue.sindex = 4;
                    break;
                case 4:
                case 6:
                    _vue.sindex = 7;
                    break;
                case 5:
                    _vue.sindex = 6;
                    break;
              }
              break;
          }
        }, KEY.RIGHT, "SMENU");

        keyAction.add(function () {
          switch (_vue.mindex) {
            case 0:
              switch (_vue.sindex) {
                case 5:
                case 6:
                  _vue.sindex = 4;
                  break;
                case 4:
                  _vue.sindex = 0;
                  break;
                case 2:
                case 3:
                  _vue.sindex -= 1;
                  break;
              }
              break;
            case 1:
              switch (_vue.sindex) {
                case 3:
                  _vue.sindex = 0;
                  break;
                case 4:
                case 5:
                  _vue.sindex = 3;
                  break;
                case 6:
                  _vue.sindex = 5;
                  break;
                case 7:
                  _vue.sindex = 6;
                  break;
              }
              break;
          }
        }, KEY.LEFT, "SMENU");

        keyAction.add(function () {
          switch (_vue.mindex) {
            case 0:
              switch (_vue.sindex) {
                case 1:
                case 2:
                case 3:
                  _vue.sindex = 0;
                  break;
                case 0:
                case 4:
                case 5:
                  keyAction.focus = "MENU";
                  _vue.kfocus = "MENU";
                  break;
                case 6:
                  _vue.sindex = 5;
                  break;
              }
              break;
            case 1:
              switch (_vue.sindex) {
                case 1:
                case 2:
                  _vue.sindex -= 1;
                  break;
                case 0:
                case 3:
                case 4:
                case 7:
                  keyAction.focus = "MENU";
                  _vue.kfocus = "MENU";
                  break;
                case 5:
                case 6:
                  _vue.sindex = 4;
                  break;
              }
              break;
            case 2:
              switch  (_vue.sindex) {
                case 0:
                  keyAction.focus = "MENU";
                  _vue.kfocus = "MENU";
                  break;
                case 1:
                  _vue.sindex = 0;
                  break;
              }
              break;
          }
        }, KEY.UP, "SMENU");

        keyAction.add(function () {
          switch (_vue.mindex) {
            case 0:
              switch (_vue.sindex) {
                case 0:
                case 5:
                  _vue.sindex += 1;
                  break;
              }
              break;
            case 1:
              switch (_vue.sindex) {
                case 0:
                case 1:
                  _vue.sindex += 1;
                  break;
                case 4:
                  _vue.sindex = 5;
                  break;
              }
              break;
            case 2:
              switch  (_vue.sindex) {
                case 0:
                  _vue.sindex += 1;
                  break;
              }
              break;
          }
        }, KEY.DOWN, "SMENU");

        keyAction.add(function () {
          switch (_vue.mindex) {
            case 0:
              switch (_vue.sindex) {
                case 0:
                  _vue.push({path: "/vod/home"});
                  break;
                case 1:
                  break;
                /*  case 2:
                  _vue.push({path: "/sd/home/arts/s2"});
                  break
                case 2:
                  _vue.push({path: "/sd/home/sports/s2"});
                  break
                case 3:
                  _vue.push({path: "/sd/home/culture/s2"});
                  break
                case 4:
                  _vue.push({path: "/sd/home/hot/list"});
                  break
                case 5:
                  _vue.push({path: "/hd/home/movie"});
                  break
                case 6:
                  _vue.push({path: "/hd/home/tv"});
                  break*/
                default:
                    //_vue.push({path: "/hd/movie"});
                    break;
              }
              break;
            case 1:
              switch (_vue.sindex) {
                case 0:
                  //直播
                  let _obj = {'URL': 'http://changeToLive', 'stopService': '0'};
                  entrix.changeServiceURL(_obj);
                  break;
                case 1:
                  //频道回看
                  break;
                case 2:
                  break;
              }
              break;
            case 2:
              switch (_vue.sindex) {
                case 0:
                  //高清导航
                  _vue.push({path: '/hd/home'});
                  break;
                case 1:
                  //标清导航
                  _vue.push({path: '/vod/home'});
                  break;
              }
              break;

          }


        }, KEY.ENTER, "SMENU");

      },

      getVideoSize(el){
        var vs = {};
        var vb = document.getElementById(el);

        if (vb != null) {
          vs.left = (function (v) {
            var l = v.offsetLeft;
            while (v.offsetParent != null) {
              v = v.offsetParent;
              l += v.offsetLeft;
            }
            return l;
          })(vb);
          vs.top = (function (v) {
            var l = v.offsetTop;
            while (v.offsetParent != null) {
              v = v.offsetParent;
              l += v.offsetTop;
            }
            return l;
          })(vb);
          vs.width = vb.offsetWidth;
          vs.height = vb.offsetHeight;
        }
        return vs;
      },
      smenuCss(v){
        return v == this.menus[this.mindex].flag;
      },
      itemCss(s, i){
        return this.kfocus == "SMENU" && s == this.menus[this.mindex].flag && this.sindex == i;

      }
    },
    data () {
      return {
        menus: [{name: '', flag: "home"},
          {name: "频道", flag: 'pd'},
          {name: "点播", flag: 'db'},
          {name: "大片", flag: 'dp'},
          {name: "娱乐", flag: 'yl'},
          {name: "教育", flag: 'jy'},
          {name: "专区", flag: 'zq'},
          {name: "万事通", flag: 'wst'},
          {name: "应用", flag: 'yy'},
          {name: "营业厅", flag: "end"}],
        mindex: 0,
        mshowMaxIndex: 7,

        sindex: 0,
        kfocus: "MENU",
        recover:{

        }

      }
    },
    components: {}

  }

</script>

<style scoped>
  .index {
    margin: 0;
    padding: 0;
    background: url("../assets/img/index/bg-index.jpg") no-repeat;
    position: relative;
    width: 1280px;
    height: 720px;
    font-size: 24px;
    color: #e1eaeb;

  }

  .header-before {
    position: absolute;
    left: 38px;
    top: 133px;
    width: 18px;
    height: 22px;
    background: url(../assets/img/index/icon.png) no-repeat;
    background-position: -292px -134px;
  }

  .header-after {
    position: absolute;
    left: 1230px;
    top: 133px;
    width: 18px;
    height: 22px;
    background: url(../assets/img/index/icon.png) no-repeat;
    background-position: -329px -134px;
  }

  .header {
    position: absolute;
    left: 65px;
    top: 110px;
    width: 1200px;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    overflow: hidden;
  }

  .header > li {
    list-style: none;
    float: left;
    width: 141px;
    height: 70px;
    text-align: center;
    -webkit-transition-duration: 0ms;
  }

  .header .home {
    background: url("../assets/img/index/icon.png") -220px -60px no-repeat;
    width: 35px;
    height: 28px;
    margin: 21px 0px 0px 53px;

  }

  .header > li.on {
    -webkit-transform: scale(1.1, 1.1);
  }

  .header > li.off {
    opacity: 0.4;
  }

  .cellFocus {
    z-index: 998;
    -webkit-transform: scale(1.05, 1.05);
  }

  .wap {
    position: absolute;
    left: 0px;
    top: 182px;
    width: 1280px;
    height: 445px;
    overflow: hidden;
  }

  .container > li {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 1280px;
    height: 445px;
    display: none;
  }

  .container > li.on {
    display: block;
  }

  .container > li > ul {
    width: 2560px;
    height: 445px;
  }

  .container > li > ul > li {
    /*float: left;*/
    /*position: relative;*/
    position: absolute;
    width: 1280px;
    height: 445px;
  }

  .home-poster {
    position: absolute;
    left: 62px;
    top: 10px;
    width: 643px;
    height: 359px;
  }

  .home-poster > img {
    width: 643px;
    height: 359px;
  }

  .home-nav {
    position: absolute;
    left: 62px;
    top: 373px;
    background: url("../assets/img/index/nav-bar-bg.png") no-repeat;
    width: 643px;
    height: 63px;
    line-height: 63px;
  }

  .home-nav > li {
    margin: 10px 40px;
    float: left;
    width: 134px;
    height: 43px;
    line-height: 43px;
    font-size: 24px;
    color: #3a7ba9;
    text-align: center;
  }

  .home-nav > li.huikan:before {
    position: relative;
    top: 6px;
    left: -5px;
    content: url("../assets/img/index/huikan-icon.png");
  }

  .home-nav > li.myorder:before {
    position: relative;
    top: 6px;
    left: -5px;
    content: url("../assets/img/index/myorder-icon.png");
  }

  .home-nav > li.shequ:before {
    position: relative;
    top: 8px;
    left: -5px;
    content: url("../assets/img/index/shequ-icon.png");
  }

  .home-poster1 {
    position: absolute;
    left: 711px;
    top: 10px;
    width: 244px;
    height: 425px;
  }

  .home-poster2 {
    position: absolute;
    left: 978px;
    top: 10px;
    width: 244px;
    height: 271px;
  }

  .home-hot {
    position: absolute;
    left: 978px;
    top: 290px;
    width: 244px;
    height: 145px;
  }

  .home-poster3 {
    position: absolute;
    left: 77px;
    top: 10px;
    width: 244px;
    height: 425px;
  }

  .home-poster4 {
    position: absolute;
    left: 335px;
    top: 10px;
    width: 373px;
    height: 208px;
  }

  .home-poster5 {
    position: absolute;
    left: 335px;
    top: 227px;
    width: 373px;
    height: 208px;
  }

  .home-poster6 {
    position: absolute;
    left: 721px;
    top: 10px;
    width: 244px;
    height: 208px;
  }

  .home-poster7 {
    position: absolute;
    left: 721px;
    top: 227px;
    width: 244px;
    height: 208px;
  }

  .home-poster8 {
    position: absolute;
    left: 978px;
    top: 10px;
    width: 244px;
    height: 425px;
  }

  li img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
  }

  #menu1-container > .channel-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    height: 445px;
    width: 195px;
  }

  #menu1-container > .channel-c1 > .more-channel {
    background: url("../assets/img/index/channel-more.png") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu1-container > .channel-c1 > .huikan-channel {
    margin-top: 18px;
    background: url("../assets/img/index/channel-huikan.png") no-repeat;
    width: 194px;
    height: 93px;
  }

  #menu1-container > .channel-c1 > .hd-channel {
    margin-top: 18px;
    background: url("../assets/img/index/channel-hd.png") no-repeat;
    width: 194px;
    height: 93px;
  }

  #menu1-container > .channel-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 17px;
    width: 244px;
    height: 425px;
  }

  #menu1-container > .channel-c3 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 429px;
    height: 445px;
  }

  #menu1-container > .channel-c3 > .channel1 {
    width: 429px;
    height: 208px;
  }

  #menu1-container > .channel-c3 > .channel2 {
    float: left;
    margin-top: 10px;
    width: 206px;
    height: 208px;
  }

  #menu1-container > .channel-c3 > .channel3 {
    float: left;
    margin-top: 10px;
    margin-left: 17px;
    width: 206px;
    height: 208px;
  }

  #menu1-container > .channel-c4 {
    float: left;
    margin-top: 10px;
    margin-left: 17px;
    width: 244px;
    height: 425px;
  }

  #menu2-container > .vod-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    height: 445px;
    width: 195px;
  }

  #menu2-container > .vod-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 16px;
    width: 244px;
    height: 425px;
  }

  #menu2-container > .vod-c3 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 446px;
    height: 445px;
  }

  #menu2-container > .vod-c4 {
    float: left;
    margin-top: 10px;
    width: 244px;
    height: 425px;
  }

  #menu2-container > .vod-c1 > .vod-hd {
    background: url("../assets/img/index/vod-hd.png") no-repeat;
    width: 194px;
    height: 148px;
  }

  #menu2-container > .vod-c1 > .vod-sd {
    margin-top: 13px;
    background: url("../assets/img/index/vod-sd.png") no-repeat;
    width: 194px;
    height: 148px;
  }

  #menu2-container > .vod-c1 > .vod-record {
    margin-top: 13px;
    background: url("../assets/img/index/vod-record.png") no-repeat;
    width: 194px;
    height: 104px;
  }

  #menu2-container > .vod-c3 > .vod-cell {
    float: left;
    width: 206px;
    height: 208px;
    margin-right: 17px;
    margin-bottom: 10px;
  }

  #menu3-container > .movie-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    width: 194px;
    height: 445px;
  }

  #menu3-container > .movie-c1 > .btn-movie-more {
    background: url("../assets/img/index/btn-movie-more.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu3-container > .movie-c1 > .btn-movie-classic {
    margin-top: 18px;
    background: url("../assets/img/index/btn-movie-classic.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu3-container > ul {
    float: left;
    margin-left: 27px;
    margin-top: 10px;
    width: 980px;
    height: 445px;
  }

  #menu3-container > ul > li {
    float: left;
    margin-right: 22px;
    width: 297px;
    height: 425px;
    position: relative;
  }

  #menu4-container > .yule-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    width: 293px;
    height: 445px;
  }

  #menu4-container > .yule-c1 > .btn-yule-more {
    background: url("../assets/img/index/btn-yule-more.jpg") no-repeat;
    width: 293px;
    height: 203px;
  }

  #menu4-container > .yule-c1 > .btn-yule-game {
    margin-top: 12px;
    background: url("../assets/img/index/btn-yule-game.jpg") no-repeat;
    width: 293px;
    height: 203px;
  }

  #menu4-container > .yule-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    width: 556px;
    height: 419px;
  }

  #menu4-container > .yule-c3 {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    width: 292px;
    height: 445px;
  }

  #menu4-container > .yule-c3 > .yule-cell {
    float: left;
    margin-bottom: 12px;
    width: 292px;
    height: 203px;
  }

  #menu5-container > .edu-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    width: 293px;
    height: 445px;
  }

  #menu5-container > .edu-c1 > .btn-edu-more {
    background: url("../assets/img/index/btn-edu-more.jpg") no-repeat;
    width: 293px;
    height: 203px;
  }

  #menu5-container > .edu-c1 > .btn-edu-game {
    margin-top: 12px;
    background: url("../assets/img/index/btn-edu-game.jpg") no-repeat;
    width: 293px;
    height: 203px;
  }

  #menu5-container > .edu-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    width: 556px;
    height: 419px;
  }

  #menu5-container > .edu-c3 {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    width: 292px;
    height: 445px;
  }

  #menu5-container > .edu-c3 > .edu-cell {
    float: left;
    margin-bottom: 12px;
    width: 292px;
    height: 203px;
  }

  #menu6-container > ul {
    float: left;
    margin-left: 75px;
    margin-top: 42px;
    width: 1150px;
    height: 445px;
  }

  #menu6-container > ul > li {
    float: left;
    position: relative;
    margin-right: 50px;
    margin-bottom: 15px;
    width: 135px;
    height: 180px;
    text-align: center;
    font-size: 22px;
    color: #dce2e5;
    line-height: 32px;
  }

  #menu6-container > ul > li > img {
    width: 135px;
    height: 135px;
  }

  #menu7-container > .know-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    width: 194px;
    height: 445px;
  }

  #menu7-container > .know-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 262px;
    height: 425px;
  }

  #menu7-container > .know-c3 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 395px;
    height: 445px;
  }

  #menu7-container > .know-c4 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 262px;
    height: 425px;
  }

  #menu7-container > .know-c1 > .btn-know-more {
    background: url("../assets/img/index/btn-know-more.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu7-container > .know-c1 > .btn-know-hongdun {
    margin-top: 17px;
    background: url("../assets/img/index/btn-know-hongdun.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu7-container > .know-c3 > .know1 {
    float: left;
    width: 395px;
    height: 204px;
  }

  #menu7-container > .know-c3 > .know2 {
    float: left;
    margin-top: 19px;
    width: 192px;
    height: 203px;
  }

  #menu7-container > .know-c3 > .know3 {
    float: left;
    margin-left: 10px;
    margin-top: 19px;
    width: 192px;
    height: 203px;
  }

  #menu8-container > .app-c1 {
    float: left;
    margin-top: 10px;
    margin-left: 62px;
    width: 194px;
    height: 445px;
  }

  #menu8-container > .app-c2 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 262px;
    height: 425px;
  }

  #menu8-container > .app-c3 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 395px;
    height: 445px;
  }

  #menu8-container > .app-c4 {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    width: 262px;
    height: 425px;
  }

  #menu8-container > .app-c1 > .btn-app-more {
    background: url("../assets/img/index/btn-app-more.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu8-container > .app-c1 > .btn-app-hongdun {
    margin-top: 17px;
    background: url("../assets/img/index/btn-app-hongdun.jpg") no-repeat;
    width: 194px;
    height: 203px;
  }

  #menu8-container > .app-c3 > .app1 {
    float: left;
    width: 395px;
    height: 204px;
  }

  #menu8-container > .app-c3 > .app2 {
    float: left;
    margin-top: 19px;
    width: 192px;
    height: 203px;
  }

  #menu8-container > .app-c3 > .app3 {
    float: left;
    margin-left: 10px;
    margin-top: 19px;
    width: 192px;
    height: 203px;
  }

  #menu9-container > .yyt-c1 {
    float: left;
    margin-top: 30px;
    margin-left: 62px;
    width: 975px;
    height: 400px;
  }

  #menu9-container > .yyt-c1 > li {
    float: left;
    position: relative;
    width: 174px;
    height: 182px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  #menu9-container > .yyt-c2 {
    float: left;
    margin-top: 30px;
    width: 184px;
    height: 378px;
  }

  .left-more {
    z-index: 100;
    position: absolute;
    left: 30px;
    top: 370px;
    width: 23px;
    height: 50px;
    padding-top: 33px;
    background: url(../assets/img/index/icon.png) no-repeat;
    background-position: -288px -134px;
    line-height: 26px;
    font-size: 22px;
    display: none;
  }

  .right-more {
    z-index: 100;
    position: absolute;
    right: 30px;
    top: 370px;
    width: 23px;
    height: 50px;
    padding-top: 33px;
    background: url(../assets/img/index/icon.png) no-repeat;
    background-position: -323px -134px;
    line-height: 26px;
    font-size: 22px;
    display: none;
  }

  .focus {
    z-index: 999;
    position: absolute;
    left: 70px;
    top: 112px;
    width: 128px;
    height: 60px;
    border: solid #ffffff 2px;
    border-radius: 7px;
    /* Safari and Chrome */
    /*-webkit-transition-property: all;
    -webkit-transition-duration: 150ms;*/
    -webkit-transform: scale(1.05, 1.05);
    box-shadow: 5px 5px 10px #000000;
  }

  .menufocus {
    left: 70px;
    top: 112px;
    width: 128px;
    height: 60px;
  }
</style>
