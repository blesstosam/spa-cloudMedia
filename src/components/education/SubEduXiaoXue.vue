<template>
    <div :class="bgImg">
        <div class="leftArrow"></div>
        <div class="nav">
            <ul>
                <li v-for="(item,index) in menus" :class="{menuFirst:index==0&&recover.action=='MENU',
                menuOn:index==0&&recover.action=='PROGRAM'}">{{item.name}}</li>
            </ul>
            <div class="rightArrow"></div>
        </div>


        <div class="proList">
            <ul>
                <li v-for="(item,index) in proList" :class="{proFocus:recover.subIndex==index&&
                    recover.action=='PROGRAM'}">
                    <span>{{index+1}}</span>{{item.name|cutString}}</li>
            </ul>
        </div>
        <div class="inputDiv">
            <div class="blank"></div>
            至 <input type="text" id="input" v-show="recover.subIndex==8" autofocus class="inputFocus" />
            <span>页</span>
        </div>
        <div class="pageInfo">
            第<span>{{recover.page}}</span>页/共<span>{{totalPage}}</span>页
        </div>
        <div id="lastPage" class="toPage" :class="{proFocus:recover.subIndex==6}">上一页</div>
        <div id="nextPage" class="toPage" :class="{proFocus:recover.subIndex==7}">下一页</div>
    </div>

</template>

<script>
import {FEATURES} from '../../store/mutation-types.js';
import {RECOMMEND} from '../../store/mutation-types.js';
import {DEFAULT} from '../../store/mutation-types.js';
import Service  from '../../service'

export default {
    name:'SubEduXiaoXue',
    data: function () {
        return {
            proList:[],
            proListLength:0,
            isInit:true,
            cid:'460685',      //id由上一级页面传过来
            parentId:'185420',  //固定的
            totalPage:0,
            menus:[],
            recover:{
                menuIndex:0,
                action:'MENU',
                subIndex:0,
                page:1
            }
        }
    },
    created() {
        this.getUrlParam();
    },
    mounted(){
        keyAction.focus=this.recover.action;
        this.pageEve();
        this.loadMenu();
    },
    filters:{
        cutString(str){
            return str.substr(0,22);
        }
    },
    watch:{
        menus(){
            if(!this.isInit){
                this.recover.page=1;
                this.reqData();
            }
        }
    },
    computed:{
        bgImg(){
            var _bg={};
            _bg['XiaoXue']=true;
            _bg['xxly_'+this.cid]=true;
            return _bg;
        }
    },
    methods: {
        toOtherPage(){
            var _page=document.getElementById('input').value;
            if(_page!=''&&Number(_page)<=this.totalPage&&Number(_page)>0){
                this.recover.page=Number(_page);
                this.reqData();
                document.getElementById('input').value='';
            }else{
                document.getElementById('input').value='';
                return;
            }
        },
        pageUp(){
            if(this.recover.page>1){
                this.recover.subIndex=0;
                --this.recover.page;
                this.reqData();
            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                this.recover.subIndex=0;
                ++this.recover.page;
                this.reqData();
            }
        },
        getUrlParam(){
            this.cid=this.$route.query.categoryId || this.cid;
        },
        loadMenu(){
            var _vue=this;
            var _cid=_vue.cid;
            _vue.menus=[];
            Service.req(DEFAULT,{categoryId: _cid, pageSize:6, pageNum: this.recover.page},
                function (s,v) {
                    if (s == "success") {
                        _vue.menus=v.response;
                        _vue.reqData();
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });
        },
        reqData(){
            var _vue=this;
            var _cid=_vue.menus[0].category_id;
            _vue.proList=[];
            _vue.proListLength=0;
            Service.req(DEFAULT,{categoryId: _cid, pageSize:6, pageNum: this.recover.page},
            function (s,v) {
                _vue.isInit=false;
                if (s == "success") {
                    _vue.proListLength=v.response.length;
                    _vue.proList=v.response;
                    _vue.totalPage=Number(v.pageInfo.totalPage);
                }else if(s =='error'){
                    console.log('err:',v);
                }
            });
        },
        pageEve(){
            var _vue = this;
            keyAction.add(function () {
                var _first=_vue.menus.shift();
                _vue.menus.push(_first);
            }, KEY.RIGHT,'MENU');
            keyAction.add(function () {
                var _last=_vue.menus.pop();
                _vue.menus.unshift(_last);
            }, KEY.LEFT,'MENU');
            keyAction.add(function () {
                _vue.recover.action=this.focus='PROGRAM';
            }, KEY.DOWN,'MENU');


            keyAction.add(function () {
                if(_vue.recover.subIndex<8&&_vue.recover.subIndex>5){
                    ++_vue.recover.subIndex;
                    _vue.$nextTick(function () {
                        document.getElementById('input').focus();
                    });
                }
            }, KEY.RIGHT,'PROGRAM');
            keyAction.add(function () {
                if(_vue.recover.subIndex>6){
                    --_vue.recover.subIndex;
                }
            }, KEY.LEFT,'PROGRAM');
            keyAction.add(function () {
                if(_vue.proListLength<6&&_vue.recover.subIndex==_vue.proListLength-1){
                    _vue.recover.subIndex=6;
                }
                if(_vue.recover.subIndex<_vue.proListLength){
                    ++_vue.recover.subIndex;
                }
            }, KEY.DOWN,'PROGRAM');
            keyAction.add(function () {
                if(_vue.recover.subIndex==0){
                    _vue.recover.action=this.focus='MENU';
                }
                if(_vue.recover.subIndex>0&&_vue.recover.subIndex<_vue.proListLength){
                    --_vue.recover.subIndex;
                }
                if(_vue.recover.subIndex==6||_vue.recover.subIndex==7||_vue.recover.subIndex==8){
                    _vue.recover.subIndex=_vue.proListLength-1;
                }
            }, KEY.UP,'PROGRAM');


            keyAction.add(function () {
                switch (_vue.recover.subIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        var _data=_vue.proList[_vue.recover.subIndex];
                        var _f={category_type:_data.category_type,recover:_vue.recover};
                        _vue.$emit('play',_data.id,_data.name,_f);
                        break;
                    case 6:
                        _vue.pageUp();
                        break;
                    case 7:
                        _vue.pageDown();
                        break;
                    case 8:
                        _vue.toOtherPage();
                        break;
                }
            }, KEY.ENTER,'PROGRAM');



            keyAction.add(function () {
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
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
.XiaoXue{
    position: absolute;
    left:0;
    top:0;
    width:1280px;
    height:720px;
}
.proFocus{
    background-color: #f0af02 !important;
}
/* 背景图片url */
.xxly_460685{background:url('../../assets/img/education/460685.jpg') no-repeat left top}
.xxly_460686{background:url('../../assets/img/education/460686.jpg') no-repeat left top}
.xxly_460687{background:url('../../assets/img/education/460687.jpg') no-repeat left top}

.leftArrow{
    position: absolute;
    top:116px;
    left:50px;
    width:50px;
    height:48px;
    background: url('../../assets/img/education/to_left.png') no-repeat;
}
.rightArrow{
    float: right;
    width:50px;
    height:48px;
    background: url('../../assets/img/education/to_right.png') no-repeat;
}
.nav{
    position: absolute;
    left:105px;
    top:116px;
}
.nav ul{
    float: left;
}
.nav ul li{
    float: left;
    height:48px;
    width:145px;
    font-size:30px;
    text-align:center;
    color:white;
    line-height:41px;
    border-radius: 24px;
    box-sizing: border-box;
}
.menuFirst{
    border:4px solid #ffffff;
    color:black !important;
    background-color:#f0af02 ;
}
.menuOn{
    border:4px solid #f0af02;
    color:#f0af02 !important;
}

.proList{
    position: absolute;
    left: 65px;
    top: 182px;
}
.proList ul li{
    width:650px;
    height:55px;
    line-height: 55px;
    font-size: 28px;
    font-family: '黑体';
    color:white;
}
.proList ul li span{
    width:30px;
    display: inline-block;
}
.pageInfo{
    position: absolute;
    width: 170px;
    height: 40px;
    left: 527px;
    top: 605px;
    font-size:22px;
    font-weight: bold;
    font-family: '黑体';
    background-color: #629702;
    line-height: 40px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
}
.toPage{
    position: absolute;
    width:120px;
    height:40px;
    top: 605px;
    background-color: #629702;
    font-size:22px;
    border-radius: 20px;
    text-align: center;
    line-height:42px;
}
#lastPage{
    left: 78px;
}
#nextPage{
    left: 220px;
}
.inputDiv{
    position: absolute;
    top:605px;
    left:365px;
    height:40px;
    width:150px;
    background-color: #629702;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    font-size:22px;
    line-height: 40px;
    padding-left:10px;
}
.inputDiv span{
    margin-left:86px;
}
.blank{
    position: absolute;
    left:37px;
    top:5px;
    width:80px;
    height:30px;
    background-color: white;
    border-radius:15px;
    vertical-align: text-bottom;
}
#input{
    position: absolute;
    left:37px;
    top:5px;
    width:75px;
    height:30px;
    background-color: white;
    border-radius:15px;
    vertical-align: text-bottom;
    font-size:20px;
    padding-left:5px;
}
.inputFocus{
    border:1px solid #3bcdee;
}
</style>

