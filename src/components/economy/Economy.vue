<template>
    <div class="Economy" :class="{changeBg:recover.menuIndex==4}">

        <div class="showTime">{{time}}</div>

        <!--菜单选中框-->
        <div class="menuFocus selected" :style="getMenuFocusOnPos"
             v-show="recover.action=='MENU'"></div>
        <!--菜单-->
        <div class="menus">
            <ul>
                <li v-for="(item,index) in menus"
                    :class="{menuRed:recover.menuIndex==index}">
                    {{item.name}}</li>
            </ul>
        </div>


        <!--1~4个栏目-->
        <div id="firstColumn" v-show="recover.menuIndex!=4">
            <!--节目列表-->
            <div class="ProFocus selected" :style="getProgramFocusPos"
            v-show="recover.action=='PROGRAM'&&recover.subIndex<RecOrProListLength"></div>
            <div class="program" v-show="recover.menuIndex!=0">
                <ul>
                    <li v-for="(item,index) in proList">
                        {{item.name|cutString }}</li>
                </ul>
            </div>
            <!--推荐位节目表，接口和其他几个不一样-->
            <div class="program" v-show="recover.menuIndex==0">
                <ul>
                    <li v-for="(item,index) in recommendList">
                        {{item.name | cutString}}</li>
                </ul>
            </div>


            <!--页数信息-->
            <div class="pageFocus" :style="getProgramFocusPos"
                 v-show="(recover.subIndex==7)||(recover.subIndex==8)">
                <img src="../../assets/img/economy/economicsPageFocus.png" />
            </div>
            <div class="pageInfo">
                第<span>{{recover.page}}</span>页/
                共<span>{{totalPage}}</span>页
            </div>

            <!--海报-->
            <div class="posterFocus selected" :style="getProgramFocusPos"
                 v-show="recover.subIndex==9||recover.subIndex==10||recover.subIndex==11"></div>
            <div class="poster">
                <div id="poster1">
                    <img :src="recommendPoster[0]|fposter('HD_HUNPAI')" /></div>
                <div id="poster2">
                    <img :src="recommendPoster[1]|fposter('HD_HUNPAI')" /></div>
                <div id="poster3">
                    <img :src="gerPoster3Url" />
                </div>
            </div>
        </div>



        <!--第五个栏目-->
        <div id="fifthColumn" v-show="recover.menuIndex==4">
            <!--节目-->
            <div class="programFocus selected" v-show="recover.action=='PROGRAM'
                &&recover.subIndex<RecOrProListLength" :style="getFifthProFocus">
            </div>
            <div class="program">
                <ul>
                    <li v-for="item in proList">{{item.name|cutString}}</li>
                </ul>
            </div>

            <!--海报-->
            <div class="poster">
                <img :src="gerPoster4Url"/>
            </div>

            <!--页数和页数选中框-->
            <div class="pageFocus" :style="getFifthProFocus"
                 v-show="recover.subIndex>6">
                <img src="../../assets/img/economy/economicsPageFocus.png" />
            </div>
            <div class="pageInfo">
                <span>第{{recover.page}}页/</span>
                <span>共{{totalPage}}页</span>
            </div>
        </div>

    </div>

</template>

<script>
import {FEATURES} from '../../store/mutation-types.js';
import {RECOMMEND} from '../../store/mutation-types.js';
import {DEFAULT} from '../../store/mutation-types.js';
import Service  from '../../service';

export default {
    name:'Economy',
    data: function () {
        return {
            menus:[],
            totalPage:1,
            isInit:true,
            isSubInit:true,        //子栏目是否为第一次

            proList:[],            //除了推荐的节目列表
            RecOrProListLength:0,    //每次返回的节目的个数

            recommendList:[],      //推荐节目表

            temSubIndex:null,
            recommendPoster:[],       //推荐海报
            portalRec:[],

            poster3_4UrlForP:[],     //节目海报

            time:'',
            recover:{
                menuIndex:0,
                subIndex:0,
                action:'MENU',
                page:1,
                groupid:'normal',
                clientid:'test'
            }
        }
    },
    created() {},
    mounted(){
        this.menus=this.$store.state.columns.economy; //从state拿数据
        keyAction.focus = this.recover.action;
        this.pageEve();
        this.loadRecommendPic();
        this.reqData();
        this.getTime();
        var _vue=this;
        setInterval(function () {
            _vue.getTime();
        },60000)
    },
    watch:{
        'recover.menuIndex'(){
            if(!this.isInit){
                this.recover.page=1;  //每次进下个栏目之前page重置
                this.reqData();
            }
        }
    },
    filters:{
        cutString(str){
            if (str) return  str.length>22?str.substr(0,22)+'...':str;
            return '';
        }
    },
    computed:{
        getMenuFocusOnPos(){
            var _pos={};
            switch (this.recover.menuIndex){
                case 0:
                    _pos.left='48px';
                    break;
                case 1:
                    _pos.left='228.5px';
                    break;
                case 2:
                    _pos.left='408.5px';
                    break;
                case 3:
                    _pos.left='588.5px';
                    break;
                case 4:
                    _pos.left='768.5px';
                    break;
            }
            return _pos;
        },
        getProgramFocusPos(){
            switch (this.recover.subIndex){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    return {top:this.recover.subIndex*46+299+'px'};
                    break;
                case 7:
                case 8:
                    return {left:340-(this.recover.subIndex-8)*330+'px'};
                    break;
                case 9:
                case 10:
                    return {
                        top:(this.recover.subIndex-9)*201+290+'px',
                        left:'43px',
                        width:'225px',
                        height:'176px'
                    };
                    break;
                case 11:
                    return {
                        top: '294px',
                        left: '870px',
                        width: '362px',
                        height: '375px'
                    };
                    break;
            }

        },
        gerPoster3Url(){
            //分为首页和其他页面
            var _vue=this;
            if(_vue.recommendPoster.length!=0&&_vue.poster3_4UrlForP.length!=0){
                if(_vue.recover.action=='MENU'){
                    if(_vue.recover.menuIndex==0){
                        return poster(_vue.recommendPoster[2],'HD_HUNPAI');
                    }else{
                        return poster(_vue.poster3_4UrlForP[0],'BIG');
                    }
                }else if(_vue.recover.action=='PROGRAM'&&_vue.recover.menuIndex!=4){ //还要确保不在第5个栏目
                    if(_vue.recover.menuIndex==0){
                        return poster(_vue.recommendPoster[2],'HD_HUNPAI');
                    }else{
                        var _index=_vue.recover.subIndex;
                        var _length=_vue.RecOrProListLength;
                        return _index<_length?poster(_vue.poster3_4UrlForP[_index],'BIG'):
                            poster(_vue.poster3_4UrlForP[_length-1],'BIG');
                    }
                }
            }
        },
        gerPoster4Url(){
            var _vue=this;
            if(_vue.poster3_4UrlForP.length!=0&&_vue.recover.menuIndex==4){
                if(_vue.recover.action=='MENU'){
                    return poster(_vue.poster3_4UrlForP[0],'BIG');
                }else if(_vue.recover.action=='PROGRAM'){
                    var _index=_vue.recover.subIndex;
                    var _length=_vue.RecOrProListLength;
                    return _index<_length?poster(_vue.poster3_4UrlForP[_index],'BIG'):
                        poster(_vue.poster3_4UrlForP[_length-1],'BIG');
                }
            }
        },
        getFifthProFocus(){
            if(this.recover.subIndex<7){
                return {top:this.recover.subIndex*46+303+'px'};
            }else if(this.recover.subIndex>8){
                return {left:'156px'} ;        //第5个栏目的8和9是固定的
            }else{
                return {left:156-(this.recover.subIndex-8)*371+'px'}
            }
        }
    },
    methods: {
        resetData() {
            this.recover.action =keyAction.focus= "MENU";
            this.recover.page = 1;
            this.recover.subIndex = 0;
            this.temSubIndex = null;
        },
        getTime(){
            var date = new Date();
            var year=date.getFullYear();
            var month = date.getMonth()+1;
            var hours = date.getHours();
            var minute = date.getMinutes();
            var datereal = date.getDate();

            hours = hours<10? "0"+hours:hours;
            minute = minute < 10?"0"+minute:minute;
            month = month < 10? "0"+month:month;
            datereal =datereal<10? "0"+datereal:datereal;
            this.time= year+"-"+ month +"-"+datereal+" "+hours+":"+minute;
        },
        pageUp(){
            if(this.recover.page>1){
                this.recover.subIndex=0;
                --this.recover.page;

                //如果为专题子栏目
                if(!this.isSubInit){
                    this.reqSub();
                }else{
                    this.reqData();
                }

            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                this.recover.subIndex=0;
                ++this.recover.page;

                if(!this.isSubInit) {
                    this.reqSub();
                }else{
                    this.reqData();
                }
            }
        },
        loadRecommendPic(){
            var _vue = this;
            var _cid=184783;
            Service.req(RECOMMEND,{categoryId: _cid, pageSize:3, pageNum: this.recover.page, flag:0},
                function (s, v) {
                    if (s == "success") {
                        _vue.recommendPoster=[];
                        _vue.portalRec=[];

                        _vue.portalRec=v.response;
                        v.response.forEach(function (v) {
                            _vue.recommendPoster.push(v.img_url);   //推荐位海报
                        });
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });
        },
        reqSub(){
            var _vue=this;
            if(this.proList.length!=0){
                var _cid='';
                if(this.isSubInit){
                    this.recover.page=1;
                    _cid=_vue.proList[_vue.recover.subIndex].id;
                }else{
                    _cid=_vue.proList[0].category_id;
                }
                Service.req(DEFAULT,{categoryId: _cid, pageSize:7, pageNum: _vue.recover.page},
                    function (s,v) {
                        if (s == "success") {
                            _vue.proList=[];
                            _vue.totalPage=1;

                            _vue.RecOrProListLength=0;

                            _vue.RecOrProListLength=v.response.length; //这个要先赋值
                            _vue.proList=v.response;
                            _vue.totalPage=Number(v.pageInfo.totalPage);

                            var _poster=_vue.poster3_4UrlForP[_vue.recover.subIndex];
                            _vue.poster3_4UrlForP=[];
                            v.response.forEach(function (v,i) {
                                _vue.poster3_4UrlForP.push(_poster);
                            });

                            _vue.isSubInit=false;
                        }else if(s =='error'){
                            console.log('err:',v);
                        }
                    });
            }
        },
        reqData(){
            var _vue = this;
            var _cid=_vue.menus[_vue.recover.menuIndex].categoryId;
            this.isSubInit=true;
            if(_vue.recover.menuIndex==0){
            //推荐位地址为video/list
            Service.req(DEFAULT,{categoryId: _cid, pageSize:7, pageNum: this.recover.page},
                function (s,v) {
                    _vue.isInit = false;
                    if (s == "success") {
                        _vue.recommendList=[];
                        _vue.totalPage=1;
                        _vue.poster3_4UrlForP=[];
                        _vue.RecOrProListLength=0;

                        _vue.RecOrProListLength=v.response.length; //这个要先赋值
                        _vue.recommendList=v.response;
                        _vue.totalPage=Number(v.pageInfo.totalPage);
                        v.response.forEach(function (v,i) {
                            _vue.poster3_4UrlForP.push(v.poster);
                        });
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });
            }else{
                //其他为subject/list
                Service.req(FEATURES,{categoryId: _cid, pageSize:7, pageNum: this.recover.page},
                    function (s,v) {
                        _vue.isInit = false;
                        if (s == "success") {
                            _vue.proList=[];
                            _vue.totalPage=1;
                            _vue.poster3_4UrlForP=[];
                            _vue.RecOrProListLength=0;

                            _vue.RecOrProListLength=v.response.length;
                            _vue.proList=v.response;
                            _vue.totalPage=Number(v.pageInfo.totalPage);
                            v.response.forEach(function (v,i) {
                                _vue.poster3_4UrlForP.push(v.poster);
                            });
                        }else if(s =='error'){
                            console.log('err:',v);
                        }
                    });
            }

        },
        getQuery(_str) {
            var obj={};
            var items=_str.length? _str.split("&"):[];
            items.forEach(function(value){
                var left=value.split("=")[0];
                var right=value.split("=")[1];
                obj[left]=right;
            });
            return obj;
        },
        pageEve(){
            var _vue = this;
            keyAction.add(function () {
                switch (_vue.recover.menuIndex) {
                    case 0:
                        _vue.recover.menuIndex = 4;
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        --_vue.recover.menuIndex;
                        break;
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                switch (_vue.recover.menuIndex) {
                    case 4:
                        _vue.recover.menuIndex=0;
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        ++_vue.recover.menuIndex;
                        break;
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                _vue.recover.subIndex=0;
                _vue.recover.action =this.focus= "PROGRAM";
            }, KEY.DOWN, "MENU");

            keyAction.add(function () {
                switch (_vue.recover.subIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        if(_vue.recover.menuIndex==0){
                            _vue.temSubIndex=_vue.recover.subIndex;
                            _vue.recover.subIndex=11;
                        }
                        break;
                    case 8:
                        _vue.recover.subIndex=7;
                        break;
                    case 9:
                    case 10:
                        _vue.recover.subIndex=_vue.temSubIndex;
                        break;
                }
            }, KEY.RIGHT, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==4){
                    if(_vue.recover.subIndex==7){
                        _vue.recover.subIndex=8;
                    }
                }else{
                    switch (_vue.recover.subIndex){
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            _vue.temSubIndex=_vue.recover.subIndex;  //将之前的位置记下来
                            _vue.recover.subIndex=9;
                            break;
                        case 7:
                            _vue.recover.subIndex=8;
                            break;
                        case 8:
                            _vue.temSubIndex=6;
                            _vue.recover.subIndex=9;
                            break;
                        case 11:
                            _vue.recover.subIndex=_vue.temSubIndex;
                            break;
                    }
                }
            }, KEY.LEFT, "PROGRAM");
            keyAction.add(function () {
                if((_vue.recover.subIndex>0) && (_vue.recover.subIndex<_vue.RecOrProListLength)){
                    --_vue.recover.subIndex;
                }else if(_vue.recover.subIndex==8||_vue.recover.subIndex==7){
                    _vue.recover.subIndex=_vue.RecOrProListLength-1;
                }else if(_vue.recover.subIndex==10){
                    _vue.recover.subIndex=9;
                }else if((_vue.recover.subIndex==0)||(_vue.recover.subIndex==9)){
                    _vue.recover.subIndex=0;
                    _vue.recover.action =this.focus= "MENU";
                }
            }, KEY.UP, "PROGRAM");
            keyAction.add(function () {
                if((_vue.recover.subIndex<_vue.RecOrProListLength) || (_vue.recover.subIndex==9)){
                    ++_vue.recover.subIndex;
                }if(_vue.RecOrProListLength<7&&_vue.recover.subIndex==_vue.RecOrProListLength){
                    _vue.recover.subIndex=7;   //如果节目个数小于7直接到下一页
                }
            }, KEY.DOWN, "PROGRAM");

            keyAction.add(function () {
                switch (_vue.recover.subIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        if(_vue.recover.menuIndex!=0&&_vue.isSubInit){
                            _vue.reqSub();
                        }else if(_vue.recover.menuIndex==0){
                            var _data1=_vue.recommendList[_vue.recover.subIndex];
                            var _f1={category_type:_data1.category_type,recover:_vue.recover};
                            _vue.$emit('play',_data1.id,_data1.name,_f1);
                        }else{
                            var _data2=_vue.proList[_vue.recover.subIndex];
                            var _f2={category_type:_data2.category_type,recover:_vue.recover};
                            _vue.$emit('play',_data2.id,_data2.name,_f2);
                        }
                        break;
                    case 7:
                        _vue.pageDown();
                        break;
                    case 8:
                        _vue.pageUp();
                        break;
                    case 9:
                    case 10:
                        //通过返回的url来跳转
                        if(_vue.portalRec[_vue.recover.subIndex-9].categoryId!=null){
                            let _d=_vue.portalRec[_vue.recover.subIndex-9];
                            let _url=_d.url;
                            let _path= _url.substring(_url.indexOf('#')+1,_url.indexOf('?'));
                            let _str= _url.substr(_url.indexOf('?')+1);
                            let _query= _vue.getQuery(_str);
                            _vue.push({path:_path, query:_query});
                        }else {
                            alert('该影片不存在');
                        }
                        break;
                    case 11:
                        _vue.resetData();
                        _vue.recover.menuIndex = 4;   //跳转到第5个栏目
                        break;
                }
            }, KEY.ENTER, "PROGRAM");


            keyAction.add(function () {
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
                _vue.pageDown();
            },KEY.PAGEDOWN);
            keyAction.add(function () {
                if (!_vue.isSubInit) {
                    _vue.reqData();
                    return;
                }
                _vue.back();
            },KEY.BACK);

        }
    }
};

</script>

<style scoped>
/*公共*/
.Economy{
    position:absolute;
    left:0;
    top:0;
    width:1280px;
    height:720px;
    background: url('../../assets/img/economy/economics_bg.png') no-repeat;
}
.changeBg{
    background-image: url('../../assets/img/economy/economicsSubject_bg.jpg') !important;
}
.selected{
    border:3px solid #ffba00;
}
.menuRed{
    background-color: red;
}
.helpButton{
    position: absolute;
    width: 126px;
    height: 39px;
    left: 1060px;
    top: 11px;
}
.showTime{
    position: absolute;
    width: 263px;
    height: 32px;
    left: 751px;
    top: 84px;
    font-family: '黑体';
    font-size: 26px;
    color: #FFFFFF;
}
.menus ul{
    position: relative;
}
.menus ul li{
    position: absolute;
    top:186px;
    width: 135px;
    height: 39px;
    line-height:34px;
    font-size: 28px;
    color: #FFFFFF;
    margin-right:45px;
    text-align:center;
}
.menus ul li:nth-child(1){
    position: absolute;
    left:52px;
}
.menus ul li:nth-child(2){
    position: absolute;
    left:232px;
}
.menus ul li:nth-child(3){
    position: absolute;
    left:412px;
}
.menus ul li:nth-child(4){
    position: absolute;
    left:592px;
}
.menus ul li:nth-child(5){
    position: absolute;
    left:772px;
}
.menuFocus{
    position: absolute;
    width: 135.5px;
    height: 38.5px;
    top: 183.5px;
}

/*1~4栏目*/
#firstColumn .program{
    position: absolute;
    width: 563px;
    height: 322px;
    left: 290px;
    top: 302px
}
#firstColumn .program ul li{
    height:46px;
    font-size:26px;
    vertical-align:center;
    line-height:46px;
}
.ProFocus{
    position: absolute;
    left:280px;
    height:46px;
    width: 563px;
}
#firstColumn .pageInfo{
    position: absolute;
    width: 172px;
    height: 30px;
    left: 500px;
    top: 643px;
    font-size:22px;
}
#firstColumn .posterFocus{
    position: absolute;
    /*left: 42px;*/
    /*width:225px;*/
    /*height:176px;*/
}
#firstColumn .pageFocus{
    position: absolute;
    top: 639px;
}
#firstColumn #poster3{
    position: absolute;
    left: 873px;
    /*top: 510px;*/
    top: 297px;
}
#firstColumn #poster3 img{
    width: 362px;
    /*height: 164px;*/
    height: 375px;
 }
#firstColumn #poster1{
    position: absolute;
    left: 45px;
    top: 294px;
}
#firstColumn #poster1 img{
    width: 225px;
    height: 175px;
}
#firstColumn #poster2{
    position: absolute;
    left: 45px;
    top: 496px;
}
#firstColumn #poster2 img{
    width: 225px;
    height: 175px;
}

/*第5个栏目*/
#fifthColumn .program{
    position: absolute;
    width: 673px;
    height: 322px;
    left: 100px;
    top: 302px;
}
#fifthColumn .program ul li{
    font-size: 26px;
    height:46px;
    line-height: 46px;
}
#fifthColumn .poster{
    position: absolute;
    left: 731px;
    top: 296px;
}
#fifthColumn .poster img{
    width: 543px;
    height: 373px;
}
#fifthColumn .pageInfo{
    position: absolute;
    width: 172px;
    height: 30px;
    left: 327px;
    top: 643px;
    font-size:22px;
}
#fifthColumn .programFocus{
    position: absolute;
    left: 70px;
    top: 571px;
    width:630px;
    height:35px;
}
#fifthColumn .programFocus img{
    width: 640px;
    height: 40px;
}
#fifthColumn .pageFocus{
    position: absolute;
    top: 640px;
}
</style>

