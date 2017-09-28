<template>
    <div class="Top">
        <div class="logo">
            <img src="../assets/img/top/logo.png" />
        </div>

        <!--左边3个菜单-->
        <div id="leftBar" v-show="recover.menuIndex==1">
            <div class="totalTop" :class="{leftFocus:(recover.action!='PROGRAM')&&
            recover.leftIndex==0}">总排行</div>
            <div class="monthTop" :class="{leftFocus:recover.leftIndex==1}">月排行</div>
            <div class="weekTop" :class="{leftFocus:recover.leftIndex==2}">周排行</div>
        </div>


        <!--两大菜单-->
        <div class="dianBo" :class="{yellowFocus:recover.menuIndex==1}">点播榜</div>
        <div class="shouChang" :class="{yellowFocus:recover.menuIndex==0}">收藏榜</div>


        <!--节目名称和点播收藏次数-->
        <div id="proInfo">
            <span>节目名称</span>
            <span class="secondText" v-show="recover.menuIndex==1">点播次数</span>
            <span class="secondText" v-show="recover.menuIndex==0">收藏次数</span>
        </div>


        <!--节目列表-->
        <div class="proList">
            <ul>
                <li v-for="(item,index) in proList"
                :class="{proListFocus:index==recover.proIndex&&recover.action=='PROGRAM'}">
                {{item.name}}
                <span>{{item.total}}</span>
                </li>
            </ul>
        </div>


        <!--上下页-->
        <div class="pageFocus1" v-show="recover.proIndex==7&&recover.action=='PROGRAM'"></div>
        <div class="pageFocus2" v-show="recover.proIndex==8&&recover.action=='PROGRAM'"></div>
        <div class="lastNextPage">
            <span>上一页</span>
            <span>下一页</span>
        </div>

        <!--输入框-->
        <div class="inputDiv">
            <input type="text" id="input" autofocus class="inputFocus" v-show="recover.proIndex==9"/>
        </div>

        <!--页数信息-->
        <div class="pageInfo">
            {{recover.page}}/{{totalPage}}
        </div>

    </div>
</template>

<script>
import {COLLECTTOP} from '../store/mutation-types.js';
import {TOP} from '../store/mutation-types.js';
import Service  from '../service/index'

export default {
    name:'Top',
    data: function () {
        return {
            proList:[],
            proListLength:0,
            totalPage:0,
            isInit:true,
            recover:{
                action:'MENU',
                menuIndex:0,
                leftIndex:0,
                proIndex:0,
                page:1,
                temProIndex:null,
                whichTop:''
            }
        }
    },
    created() {},
    mounted(){
        keyAction.focus = this.recover.action;
        this.pageEve();
        this.reqCollectTop();
    },
    methods: {
        toOtherPage(){
            var _page=document.getElementById('input').value;
            if(_page!=''&&Number(_page)<=this.totalPage&&Number(_page)>0){
                this.recover.page=Number(_page);
                if(this.recover.menuIndex==0){
                    this.reqCollectTop();
                }else{
                    this.reqTop();
                }
                document.getElementById('input').value='';
            }else{
                document.getElementById('input').value='';
                return;
            }
        },
        pageUp(){
            if(this.recover.menuIndex==0){
                if(this.recover.page>1){
                    --this.recover.page;
                    this.reqCollectTop();   //收藏
                }
            }else{
                if(this.recover.page>1){
                    --this.recover.page;
                    this.reqTop();    //点播
                }
            }
        },
        pageDown(){
            if(this.recover.menuIndex==0){
                if(this.recover.page<this.totalPage){
                    ++this.recover.page;
                    this.reqCollectTop();   //点播
                }
            }else{
                if(this.recover.page<this.totalPage){
                    ++this.recover.page;
                    this.reqTop();
                }
            }
        },
        reqTop(){
            var _vue = this;
            _vue.proListLength=0;
            Service.req(TOP,{type:_vue.recover.whichTop, pageSize:7, pageNum: _vue.recover.page},
                function (s, v) {
                    _vue.isInit = false;
                    if (s == "success") {
                        if(v.Info.length!=0){
                            _vue.proList=v.Info;
                            _vue.proListLength=_vue.proList.length;
                            _vue.totalPage=Number(v.pageInfo.totalPage);
                        }
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });
        },
        reqCollectTop(){
            var _vue = this;
            _vue.proListLength=0;
            _vue.proList=[];
            Service.req(COLLECTTOP,{top: 0, pageSize:7, pageNum: _vue.recover.page},
                function (s, v) {
                    _vue.isInit = false;
                    if (s == "success") {
                        if(v.Info.length!=0){
                            _vue.proList=v.Info;
                            _vue.proListLength=_vue.proList.length;
                            _vue.totalPage=Number(v.pageInfo.totalPage);
                        }
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });

            },
        pageEve(){
            var _vue = this;
            keyAction.add(function () {
                if(_vue.recover.menuIndex==0){
                    _vue.recover.menuIndex = 1;
                    _vue.recover.action=this.focus='LEFT';
                    _vue.recover.whichTop='total';
                    _vue.recover.page=1;
                    _vue.reqTop();
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==1){
                    _vue.recover.menuIndex = 0;
                    _vue.recover.page=1;
                    _vue.reqCollectTop();
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==0){
                    _vue.recover.proIndex=0;
                    _vue.recover.action=this.focus='PROGRAM';
                }
            }, KEY.DOWN, "MENU");


            keyAction.add(function () {
                switch (_vue.recover.leftIndex){
                    case 0:
                        ++_vue.recover.leftIndex;
                        _vue.recover.whichTop='month';
                        _vue.recover.page=1;
                        _vue.reqTop();
                        break;
                    case 1:
                        ++_vue.recover.leftIndex;
                        _vue.recover.whichTop='week';
                        _vue.recover.page=1;
                        _vue.reqTop();
                        break;
                }
            }, KEY.DOWN, "LEFT");
            keyAction.add(function () {
                switch (_vue.recover.leftIndex){
                    case 2:
                        --_vue.recover.leftIndex;
                        _vue.recover.whichTop='month';
                        _vue.recover.page=1;
                        _vue.reqTop();
                        break;
                    case 1:
                        --_vue.recover.leftIndex;
                        _vue.recover.whichTop='total';
                        _vue.recover.page=1;
                        _vue.reqTop();
                        break;
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                }
            }, KEY.UP, "LEFT");
            keyAction.add(function () {
                _vue.recover.action=this.focus='PROGRAM';
                _vue.recover.proIndex=_vue.recover.temProIndex||0;   //由pro操作时赋值出来
            }, KEY.RIGHT, "LEFT");


            keyAction.add(function () {
                switch (_vue.recover.proIndex){
                    case 7:
                        ++_vue.recover.proIndex;
                        break;
                    case 8:
                        ++_vue.recover.proIndex;
                        _vue.$nextTick(function () {
                            document.getElementById('input').focus();
                        });
                        break;
                }
            }, KEY.RIGHT, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.proIndex>7){
                    --_vue.recover.proIndex;
                }
                if(_vue.recover.menuIndex==1){
                    if(_vue.recover.proIndex<_vue.proListLength){
                        _vue.recover.temProIndex=_vue.recover.proIndex;
                        _vue.recover.action=this.focus='LEFT';

                    }
                }
            }, KEY.LEFT, "PROGRAM");
            keyAction.add(function () {
                switch (_vue.recover.proIndex){
                    case 7:
                    case 8:
                    case 9:
                        _vue.recover.proIndex=_vue.proListLength-1;
                        break;
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        --_vue.recover.proIndex;
                        break;
                }
            }, KEY.UP, "PROGRAM");
            keyAction.add(function () {
                if(_vue.proListLength<7&&_vue.recover.proIndex==(_vue.proListLength-1)){
                    _vue.recover.proIndex=7;
                }
                if(_vue.recover.proIndex<_vue.proListLength){
                    ++_vue.recover.proIndex;
                }
            }, KEY.DOWN, "PROGRAM");


            keyAction.add(function () {
                switch (_vue.recover.proIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        //type=1->电影，2->电视剧，3->综艺
                        var _d=_vue.proList[_vue.recover.proIndex];
                        var _f={category_type:'0',recover:_vue.recover};
                        var _type=Number(_d.type);
                        if(_type!=2){
                            _vue.$emit("play",_d.id,_d.name,_f);
                        }else{
                            _vue.push({path:'/sd/episode/tv',query:{cid:_d.id}})
                        }
                        break;

                    case 7:
                        _vue.pageUp();
                        break;
                    case 8:
                        _vue.pageDown();
                        break;
                    case 9:
                        _vue.toOtherPage();
                        break;
                }


            }, KEY.ENTER, "PROGRAM");

            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.pageDown();
            },KEY.PAGEDOWN);

            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);

        }
    }
};

</script>

<style scoped>
.Top{
    position: absolute;
    width:1280px;
    height:720px;
    background: url('../assets/img/top/topbg.jpg');
}
.logo{
    position: absolute;
    width: 187px;
    height: 56px;
    left: 54px;
    top: 31px;
}
.helpBtn{
    position: absolute;
    width: 126px;
    height: 39px;
    left: 1060px;
    top: 41px;
}
#leftBar div{
    position: absolute;
    width: 132px;
    height: 47px;
    left: 100px;
    color: #FFFFFF;
    font-size: 27px;
    line-height: 47px;
    text-align: center;
}
#leftBar:after{
    height:0;
    content:'.';
    display:block;
    clear:both;
    visibility: hidden;
}
#leftBar .totalTop{
    top: 300px;
}
#leftBar .monthTop{
    top: 360px;
}
#leftBar .weekTop{
    top: 420px;
}
.leftFocus{
    border:2px solid #f9c700;
}
.dianBo{
    position: absolute;
    width: 335px;
    height: 56px;
    left: 235px;
    top: 128px;
    font-size:30px;
    color:white;
    line-height: 56px;
    text-align: center;
    font-weight: bold;
}
.shouChang{
    position: absolute;
    width: 333px;
    height: 56px;
    left: 576px;
    top: 128px;
    font-size:30px;
    color:white;
    line-height: 56px;
    text-align: center;
    font-weight: bold;
}
.yellowFocus{
    background: url('../assets/img/top/topcategoryfocus.png') no-repeat;
    color:black !important;
}
.lastNextPage{
    position: absolute;
    width: 500px;
    height: 35px;
    left: 360px;
    top: 605px;
    color: #000000;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
}
.lastNextPage span{
    display: inline-block;
    width:130px;
}
.lastNextPage span:last-child{
    margin-left:70px;
}
.pageFocus1{
    position: absolute;
    top:602px;
    left:440px;
    width:130px;
    height:35px;
    border:3px solid #00a0e9;
    border-radius: 35px;
}
.pageFocus2{
    position: absolute;
    top:602px;
    left:646px;
    width:130px;
    height:35px;
    border:3px solid #00a0e9;
    border-radius: 35px;
}
.inputDiv{
    position: absolute;
    width: 53px;
    height: 26px;
    left: 803px;
    top: 610px;
}
.inputDiv input{
    width:44px;
    height:22px;
    font-size:18px;
}
.inputFocus{
    border:1px solid #00a0e9;
}
#proInfo{
    position: absolute;
    width: 900px;
    left: 280px;
    top: 188px;
    font-size:24px;
    color:white;
    height:44px;
    line-height:44px;
}
#proInfo .secondText{
    margin-left:635px;
}
.proList{
    position: absolute;
    width: 942px;
    height: 260px;
    left: 237px;
    top: 235px;
}
.proList ul li{
    font-size:22px;
    line-height:51px;
    height:51px;
    color:#808080;
    padding-left:45px;
}
.proList ul li span{
    position: absolute;
    left:800px;
}
.proListFocus{
    background-color: #274b87;
}
.proListFocus img{
    width: 945px;
    height: 51px;
}
.pageInfo{
    position: absolute;
    width: 122px;
    height: 60px;
    left: 900px;
    top: 605px;
    font-size:25px;
    font-weight: bold;
}
</style>

