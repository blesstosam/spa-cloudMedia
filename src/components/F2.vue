<template>
    <div class="Collect">
        <div class="menuFocus" :style="MenuFocusPos">
            <img src="../assets/img/collect/categoryfocus.png" />
        </div>
        <div class="menu" id="recent" :class="{menuColor:recover.menuIndex==1}">
            最近收看</div>
        <div class="menu" id="myCollect" :class="{menuColor:recover.menuIndex==0}">
            我的收藏</div>

        <!--节目-->
        <div :style="ProListFocus" class="proListFocus"
             v-show="recover.action=='PROGRAM'&&recover.proIndex<proListLength"></div>
        <div class="xuXiaoFocus" v-show="recover.action=='PROGRAM'&&recover.proIndex<proListLength+20&&
             recover.proIndex>=20" :style="RightBar"></div>
        <div class="proList">
            <ul>
                <li v-for="(item,index) in proList" >
                    <span>{{index+1}}&nbsp;&nbsp;{{item.title|fTime(20)}}</span>
                    <span id="type">&nbsp;{{item.type|fType}}</span>
                    <span id="date">{{item.categoryDate|fTime(10)}}</span>
                    <span :class="{menuColor:recover.proIndex==index+20&&
                        recover.action=='PROGRAM'}"
                        v-show="recover.menuIndex==0">取消收藏</span>
                </li>
            </ul>
        </div>


        <!--页数-->
        <div class="pageFocus" v-show="recover.action=='PROGRAM'&&(recover.proIndex==8||
        recover.proIndex==9)" :style="PageFocus"></div>
        <div class="lastPage" >上一页</div>
        <div class="nextPage" >下一页</div>
        <div class="pageInfo">
            <input type="text" v-show='recover.proIndex==10' id="input" autofocus class="inputFocus"/>
            <span>{{recover.page}}/{{totalPage}}</span>
        </div>


    </div>
</template>

<script>
import {MYCOLLECT} from '../store/mutation-types.js';
import {RECENT} from '../store/mutation-types.js';
import Service  from '../service'

export default {
    name:'Collect',
    data: function () {
        return {
            name:'Collect',
            isInit:true,
            proList:[],
            proListLength:0,
            totalPage:0,
            recover:{
                menuIndex:0,
                proIndex:0,
                page:1,
                action:'MENU'
            }
        }
    },
    created() {

    },
    filters:{
        fTime(val, num){
            if(val==null) return '';
            return val.substr(0,num);
        },
        fType(val){
            if(val==null) return '';
            if(val=='1'){
                return '[电影]';
            }else{
                return val=='2'?'[电视剧]':'[综艺]';
            }
        }
    },
    computed:{
        MenuFocusPos(){
            return {left:(462-this.recover.menuIndex*365)+'px'}
        },
        ProListFocus(){
            return {top:(232+this.recover.proIndex*50)+'px'};
        },
        PageFocus(){
            return {left:(365+(this.recover.proIndex-8)*165)+'px'};
        },
        RightBar(){
            return {top:(229+(this.recover.proIndex-20)*49)+'px'};
        },
        statusInfo() {
            return this.$store.state.streamData.statusInfo || {};
        }
    },
    mounted(){
        keyAction.focus=this.recover.action;
        this.reqData();
        this.pageEve();
    },
    methods: {
        toOtherPage(){
            var _page=document.getElementById('input').value;
            if(_page!=''&&Number(_page)<=this.totalPage&&Number(_page)>0){
                this.recover.page=Number(_page);
                if(this.recover.menuIndex==0){
                    this.reqData();
                }else{
                    this.reqData();
                }
                document.getElementById('input').value='';
            }else{
                document.getElementById('input').value='';
                return;
            }
        },
        pageUp(){
            if(this.recover.page>1){
                --this.recover.page;
                this.reqData();
            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                ++this.recover.page;
                this.reqData();
            }
        },
        reqData(){
            var _vue = this;
            var _stbNo=this.statusInfo.stbId || '99616612190002281';
            _vue.proListLength=0;
            _vue.proList=[];
            var _url=_vue.recover.menuIndex==0?MYCOLLECT:RECENT;
            Service.req(_url,{stbNo: _stbNo, pageSize:8, pageNum: _vue.recover.page},
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
                    _vue.recover.page=1;
                    _vue.reqData();
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==1){
                    _vue.recover.menuIndex = 0;
                    _vue.recover.page=1;
                    _vue.reqData();
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.recover.action=this.focus='PROGRAM';
            }, KEY.DOWN, "MENU");


            keyAction.add(function () {
                if(_vue.recover.menuIndex==0){
                    switch (_vue.recover.proIndex){
                        case 8:
                        case 9:
                            ++_vue.recover.proIndex;
                            break;
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            _vue.recover.proIndex+=20;
                            break;
                    }
                }else{
                    switch (_vue.recover.proIndex){
                        case 8:
                            ++_vue.recover.proIndex;
                            break;
                        case 9:
                            ++_vue.recover.proIndex;
                            _vue.$nextTick(function () {
                                document.getElementById('input').focus();
                            });
                            break;
                    }
                }
            }, KEY.RIGHT, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==0){
                    switch (_vue.recover.proIndex){
                        case 9:
                        case 10:
                            --_vue.recover.proIndex;
                            break;
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                            _vue.recover.proIndex-=20;
                            break;
                    }
                }else{
                    switch (_vue.recover.proIndex){
                        case 9:
                        case 10:
                            --_vue.recover.proIndex;
                            break;
                    }
                }
            }, KEY.LEFT, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.proIndex>=20){
                    if(_vue.recover.proIndex==20){
                        _vue.recover.action=this.focus='MENU';
                    }else{
                        --_vue.recover.proIndex;
                    }
                }else{
                    if(_vue.recover.proIndex==0){
                        _vue.recover.action=this.focus='MENU';
                    }
                    if(_vue.recover.proIndex>7){
                        _vue.recover.proIndex=_vue.proListLength-1;
                    }else {
                        --_vue.recover.proIndex;
                    }
                }
            }, KEY.UP, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.proIndex>=20){
                    if(_vue.proListLength<28&&_vue.recover.proIndex==(_vue.proListLength-1+20)){
                        _vue.recover.proIndex=8;
                    }
                    if(_vue.recover.proIndex<_vue.proListLength+20&&_vue.recover.proIndex!=8){
                        ++_vue.recover.proIndex;
                    }
                }else{
                    if(_vue.proListLength<8&&_vue.recover.proIndex==(_vue.proListLength-1)){
                        _vue.recover.proIndex=8;
                    }//这个判断放前面
                    if(_vue.recover.proIndex<_vue.proListLength){
                        ++_vue.recover.proIndex;
                    }

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
                    case 7:
                        var _d=_vue.proList[_vue.recover.proIndex];
                        var _type=Number(_d.type);
                        var _f={};
                        if(_vue.recover.menuIndex==0){
                            //接口返回的数据部分类型，只分1,3是直接点播，2是进入选集
                            switch (_type){
                                case 1://电影
                                case 3://综艺,动画也算综艺，超清里面有收藏综艺的地方
                                    _f={category_type:'0',recover:_vue.recover};
                                    _vue.$emit('play',_d.id,_d.title,_f);
                                    break;
                                case 2://电视剧，动画片有剧集的也算电视剧
                                    _vue.push({path:'/sd/episode/tv',query:{cid:_d.id}});
                                    break;
                            }
                        }else{   //最近收看直接调方法播放
                            _f={category_type:'0',recover:_vue.recover};
                            _vue.$emit('play',_d.id,_d.title,_f);
                        }

                        break;
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                        var _data=_vue.proList[_vue.recover.proIndex-20];
                        //窗口关闭之后需要通知该组件
                        var _id=_data.categoryId+'_'+_data.assetId;
                        _vue.$emit('collect',_id,_data.title);

                    case 8:
                        _vue.pageUp();
                        break;
                    case 9:
                        _vue.pageDown();
                        break;
                    case 10:
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
div ul li{
    box-sizing:border-box;
}
.Collect{
    background: url('../assets/img/collect/mycollection_bg.jpg');
    position: absolute;
    width:1280px;
    height:720px;
}
.menu{
    position: absolute;
    width: 200px;
    height: 51px;
    top: 130px;
    font-size:30px;
    font-weight: bold;
    line-height: 51px;
    color:white;
    padding-left:137px;
}
#recent{
    left: 110px;
}
#myCollect{
    left: 458px;
}
.menuFocus{
    position: absolute;
    /*left: 462px;*/
    top: 130px;
}
.menuFocus img{
    width: 330px;
    height: 51px;
}
.menuColor{
    color:black !important;
}
.proList{
    position: absolute;
    width: 1055px;
    /*height: 360px;*/
    left: 120px;
    top: 232px;
}
.proList ul li{
    height:45px;
    line-height: 45px;
    color:#696969;
    font-size: 22px;
    margin-bottom: 4px;
}
.proList ul li span:last-child{
    position: absolute;
    left:890px;
    width:156px;
    text-align:center;
    background-color: #3a384e;
    border-radius: 48px;
    color:white;
}
.proListFocus{
    position: absolute;
    left:110px;
    background-color: #274b87;
    height:45px;
    width:880px;
}
.xuXiaoFocus{
    position: absolute;
    left:1006px;
    width:156px;
    height:44px;
    border-radius: 44px;
    border:3px solid #3bcdee;
    color:black !important;
}
#type{
    color:red;
}
#date{
    position: absolute;
    left:707px;
}
.lastPage{
    position: absolute;
    width: 156px;
    height: 44px;
    left: 368px;
    top: 635px;
    font-size: 20px;
    line-height: 44px;
    background-color: #5b5a6d;
    opacity: 0.6;
    border-radius: 44px;
    text-align:center;
}
.nextPage{
    position: absolute;
    width: 156px;
    height: 44px;
    left: 533px;
    top: 635px;
    font-size: 20px;
    line-height: 44px;
    background-color: #5b5a6d;
    opacity: 0.6;
    border-radius: 44px;
    text-align:center;
}
.pageInfo{
    position: absolute;
    width: 220px;
    height: 44px;
    left: 705px;
    top: 635px;
    line-height: 44px;
    background-color: #5b5a6d;
    opacity: 0.6;
    border-radius: 10px;
}
.pageInfo input{
    position: absolute;
    left:55px;
    top:5px;
    border-radius: 10px;
    width:50px;
    height:30px;
    background-color: #ffffff;
}
.pageInfo span{
    position: absolute;
    left:160px;
    font-weight: bold;
    font-size: 25px;
}
.pageFocus{
    position: absolute;
    top:632px;
    width:156px;
    height:44px;
    border:3px solid #3bcdee;
    border-radius: 44px;
}
.inputFocus{
    border:1px solid #3bcdee;
    border-radius: 3px;
}
</style>

