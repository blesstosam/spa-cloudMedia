<template>
    <div class="Education">

        <!--logo图标等-->
        <div class="logo">
            <img src="../../assets/img/education/logo.png" />
        </div>
        <div class="leftArrow" v-show="recover.action=='MENU'">
            <img src="../../assets/img/education/to_left.png" />
        </div>
        <div class="rightArrow" v-show="recover.action=='MENU'">
            <img src="../../assets/img/education/to_right.png" />
        </div>

        <!--菜单-->
        <div class="menu">
            <ul>
                <li v-for="(item,index) in menus" v-show="index!=5"
                :class="{blackFont:index==0&&recover.action=='MENU',
                yellowFont:index==0&&recover.action=='POSTER'}">{{item.name}}</li>
            </ul>
        </div>
        <!--菜单选中框-->
        <div class="menuFocus">
            <img src="../../assets/img/education/menu.png"/>
        </div>
        <div class="menuFocus">
            <img src="../../assets/img/education/menufocus.png"
                 v-show="recover.action=='MENU'" />
        </div>


        <!--海报选中-->
        <div class="posterFocus" v-show="recover.action=='POSTER'">
            <img src="../../assets/img/education/posterfocus2.png" />
        </div>
        <!--海报-->
        <div class="poster">
            <ul v-for="(item,_inx) in subMenuData" v-if="_inx==0">
                <li v-for="(subData,index) in item" v-if="index<6">
                    <img :class="{posterFocusStyle:recover.action=='POSTER'&&index==0}"
                         :src="subData.poster|fposter('EDUCATE')" />
                </li>
            </ul>
        </div>

        <!--下面3个海报是推荐位-->
        <div class="recPoster">
            <ul>
                <li v-for="(item,index) in recUrlList" :id="'poster'+(index+7)">
                    <img :src="item|fposter('REC')" />
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
import {FEATURES} from '../../store/mutation-types.js';
import {RECOMMEND} from '../../store/mutation-types.js';
import {DEFAULT} from '../../store/mutation-types.js';
import Service  from '../../service'

export default {
    name:'Education',
    data: function () {
        return {
            menus:[],      //从state.js里拿6个栏目的总数据
            subMenuData:[],
            isInit:true,

            recList:[],
            recUrlList:[],    //下面3个

            recover:{
                menuIndex:0,
                subIndex:0,
                action:'MENU'
            }
        }
    },
    created() {
        this.menus = this.$store.state.columns.education; //这样改menus会改掉state里的数据
    },
    mounted() {
		keyAction.focus=this.recover.action;
        this.getSubMenuData();
        this.loadRecPic();
        this.pageEve();
    },
    watch:{},
    computed:{},
    components: {},
    methods: {
        getCid(beforestr,afterstr,url){
            if(url=='') return '';
            var _pos1=url.indexOf(beforestr);
            var _pos2=url.indexOf(afterstr);
            var _len1=beforestr.length;
            var _length=_pos2-_len1-_pos1;
            return url.substr(_pos1+_len1,_length);
        },
        getQuery(_str) {
            var obj={};
            var items=_str.length? _str.split("&"):[];
            items.forEach(function(value,index){
                var left=value.split("=")[0];
                var right=value.split("=")[1];
                obj[left]=right;
            });
            return obj;
        },
        getSubMenuData(){
            var _vue=this;
            this.menus.forEach(function (v,i) {
                _vue.subMenuData.push(v.sub);
            });
        },
        loadRecPic(){
            var _vue=this;
            var _cid=185381;
            Service.req(RECOMMEND,{categoryId: _cid, pageSize:3, pageNum: 1, flag:0},
            function (s,v) {
                if (s == "success") {
                    _vue.recList=[];

                    _vue.recList=v.response;
                    v.response.forEach(function (val,i) {
                        _vue.recUrlList.push(val.img_url);
                    });
                }else if(s =='error'){
                    console.log('err:',v);
                }
            })
        },
        pageEve(){
            var _vue = this;
            keyAction.add(function () {
                var _last1=_vue.menus.pop();
                _vue.menus.unshift(_last1);

                var _last2=_vue.subMenuData.pop();   //???
                _vue.subMenuData.unshift(_last2);

                if(_vue.recover.menuIndex>0){
                    --_vue.recover.menuIndex;
                }else if(_vue.recover.menuIndex==0){
                    _vue.recover.menuIndex=5;
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                var _first1=_vue.menus.shift();
                _vue.menus.push(_first1);

                var _first2=_vue.subMenuData.shift();
                _vue.subMenuData.push(_first2);

                if(_vue.recover.menuIndex<5){
                    ++_vue.recover.menuIndex;
                }else if(_vue.recover.menuIndex==5){
                    _vue.recover.menuIndex=0;
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                _vue.recover.action =this.focus= "POSTER";
            }, KEY.DOWN, "MENU");


            keyAction.add(function () {
                var j=0;
                var _pos=0;
                if(_vue.subMenuData[0].length<=6){

                    for(let i=0;i<_vue.subMenuData[0].length;i++){
                        if(_vue.subMenuData[0][i].poster=='morenhaibao.gif'){
                            j++;
                        }
                    }
                    _pos=_vue.subMenuData[0].length-j-1;
                }
                if(_pos!=0){
                    var _first=_vue.subMenuData[0].shift();
                    _vue.subMenuData[0].splice(_pos,0,_first);
                }else{
                    var _first=_vue.subMenuData[0].shift();
                    _vue.subMenuData[0].push(_first);
                }

                var _len=_pos==0?_vue.subMenuData[0].length:_pos;

                if(_vue.recover.subIndex<_len-1){
                    ++_vue.recover.subIndex;
                }else if(_vue.recover.subIndex==_len-1){
                    _vue.recover.subIndex=0;
                }
            }, KEY.RIGHT, "POSTER");
            keyAction.add(function () {
                var j=0;
                var _pos=0;
                if(_vue.subMenuData[0].length<=6){

                    for(let i=0;i<_vue.subMenuData[0].length;i++){
                        if(_vue.subMenuData[0][i].poster=='morenhaibao.gif'){
                            j++;
                        }
                    }
                    _pos=_vue.subMenuData[0].length-j-1;
                }

                if(_pos!=0){
                    var _last=_vue.subMenuData[0].splice(_pos,1)[0];
                    _vue.subMenuData[0].unshift(_last);
                }else{
                    var _last=_vue.subMenuData[0].pop();
                    _vue.subMenuData[0].unshift(_last);
                }


                var _len=_pos==0?_vue.subMenuData[0].length:_pos;

                if(_vue.recover.subIndex>0){
                    --_vue.recover.subIndex;
                }else if(_vue.recover.subIndex==0){
                    _vue.recover.subIndex=_len-1;
                }
            }, KEY.LEFT, "POSTER");
            keyAction.add(function () {
                _vue.recover.action =this.focus= "MENU";
            }, KEY.UP, "POSTER");

            //点击进入专题子栏目
            keyAction.add(function () {
                var _subCid=_vue.subMenuData[0][0].subCategoryId;
                var _parentId=_vue.menus[0].categoryId;
                if(_parentId==185420){
                    _vue.push({path: "/education/subxiaoxue",query:{categoryId:_subCid}});
                }else{
                    _vue.push({path: "/education/sub",query:{categoryId:_subCid,parentId:_parentId}});
                }
            }, KEY.ENTER, "POSTER");

            keyAction.add(function () {
                if(_vue.recList.length!=0){
                    let _url= _vue.recList[event.keyCode-49].url;
                    let _path= _url.substring(_url.indexOf('#')+1,_url.indexOf('?'));
                    let _str= _url.substr(_url.indexOf('?')+1);
                    let _query= _vue.getQuery(_str);
                    _vue.push({path: _path, query: _query});
                }
            }, [KEY.NUMBER1,KEY.NUMBER2,KEY.NUMBER3]);

            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);

        }
    }
};

</script>

<style scoped>
.Education{
    background: url('../../assets/img/education/educate_bg.jpg');
    position: absolute;
    left:0;
    top:0;
    width:1280px;
    height:720px;
    z-index:-99;
    overflow:hidden;
}
.logo{
    position: absolute;
    left: 54px;
    top: 61px
}
.logo img{
    width: 187px;
    height: 56px;
}
.leftArrow{
    position: absolute;
    width: 56px;
    height: 51px;
    left: 47px;
    top: 163px;
}
.rightArrow{
    position: absolute;
    width: 56px;
    height: 51px;
    left: 950px;
    top: 163px;
}
.menu{
    position: absolute;
    height: 56px;
    left: 135px;
    top: 160px;
    z-index:1;
}
.menu ul:after{
    height:0;
    content:'.';
    display:block;
    clear:both;
    visibility: hidden;
}
.blackFont{
    color:black !important;
}
.yellowFont{
    color:#f1e800 !important;
}
.menu ul li{
    margin-right:45px;
    float: left;
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
    line-height: 56px;

}
.menuFocus{
    position: absolute;
    width: 173px;
    height: 56px;
    left: 112px;
    top: 159px;
    background: transparent;
    z-index:0;
}
.menuFocus img {
    width: 173px;
    height: 56px;
}
/*.poster{*/
    /*!*z-index: 5;*!*/
    /*position: relative;*/

/*}*/
.poster ul li{

    top: 223px;
    width: 192px;
    height: 128px;
}
.poster ul li:nth-child(1){
    position: absolute;
    left: 129px;
}
.poster ul li:nth-child(2){
    position: absolute;
    left: 328px;
}
.poster ul li:nth-child(3){
    position: absolute;
    left: 526px;
}
.poster ul li:nth-child(4){
    position: absolute;
    left: 723px
}
.poster ul li:nth-child(5){
    position: absolute;
    left: 922px;
}
.poster ul li:nth-child(6){
    position: absolute;
    left: 1120px;
}
/*.poster ul:after{*/
    /*height:0;*/
    /*content:'.';*/
    /*display:block;*/
    /*clear:both;*/
    /*visibility: hidden;*/
/*}*/
.poster ul img{
    width: 193px;
    height: 128px;
}
.posterFocus{
    z-index:5;
    position: absolute;
    left: 92px;
    top: 209px;
}
.posterFocus img{
    width: 260px;
    height: 156px;
}
.posterFocusStyle{
    position: absolute;
    left:-22px !important;
    top:-6px !important;
    width:231px !important;
    height:141px !important;
}

/*下面3个推荐位海报*/
#poster7{
    position: absolute;
    left: 73px;
    top: 505px;
}
#poster7 img{
    width: 217px;
    height: 128px;
}
#poster8{
    position: absolute;
    left: 323px;
    top: 384px;
}
#poster8 img{
    width: 346px;
    height: 265px;
}
#poster9{
    position: absolute;
    left: 693px;
    top: 505px;
}
#poster9 img{
    width: 217px;
    height: 128px;
}
</style>

